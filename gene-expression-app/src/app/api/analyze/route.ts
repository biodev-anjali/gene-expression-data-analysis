import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import crypto from "crypto"
import Papa from "papaparse"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    // Optional metadata for species-based discovery
    const species = formData.get("species") as string | null
    const datasetSource = formData.get("datasetSource") as string | null
    const datasetId = formData.get("datasetId") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileHash = crypto.createHash("sha256").update(buffer).digest("hex")

    // Check for existing analysis with graceful error handling
    // If database is unavailable, we'll still perform the analysis but won't save it
    let existing = null
    let dbAvailable = true
    try {
      existing = await prisma.geneExpressionRun.findUnique({
        where: { fileHash },
      })
    } catch (dbError: any) {
      // Database connection failed - log but continue with analysis
      // This ensures the app remains functional even if database is temporarily unavailable
      console.error("Database connection error (continuing without DB):", dbError.message)
      dbAvailable = false
      // Don't return error - allow analysis to proceed without database
    }

    // If we found existing analysis, return it (only if DB was available)
    if (existing) {
      return NextResponse.json({ alreadyAnalyzed: true, data: existing })
    }

    const csvText = buffer.toString("utf-8")
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true })
    
    // Check for parsing errors
    if (parsed.errors && parsed.errors.length > 0) {
      return NextResponse.json({ 
        error: `CSV parsing error: ${parsed.errors[0].message}` 
      }, { status: 400 })
    }
    
    const rows = parsed.data as any[]

    // Filter out empty rows
    const validRows = rows.filter(row => row && Object.keys(row).length > 0)
    
    if (validRows.length === 0) {
      return NextResponse.json({ error: "CSV file is empty or invalid" }, { status: 400 })
    }

    const genes = validRows.length
    const firstRow = validRows[0]
    
    // Validate that we have at least one data column
    const allKeys = Object.keys(firstRow).filter(key => key && key.trim() !== '')
    if (allKeys.length < 2) {
      return NextResponse.json({ 
        error: "CSV must have at least one gene column and one sample column" 
      }, { status: 400 })
    }
    
    const samples = allKeys.length - 1

  let sum = 0
  let count = 0

  validRows.forEach(row => {
    if (!row) return
    Object.values(row).forEach((v: any, idx) => {
      // Skip first column (gene name)
      if (idx === 0) return
      const n = Number(v)
      if (!isNaN(n) && isFinite(n)) {
        sum += n
        count++
      }
    })
  })

  const meanExpr = count > 0 ? Number((sum / count).toFixed(3)) : 0

  // Calculate fold change analysis if we have at least 2 samples
  let upregulatedGenes = null
  let downregulatedGenes = null
  let foldChangeData = null

  if (samples >= 2) {
    const geneNames = Object.keys(firstRow).filter(key => key && key.trim() !== '')
    const conditionAKey = geneNames[1] // First sample column (after gene name)
    const conditionBKey = geneNames[2] // Second sample column

    if (conditionAKey && conditionBKey) {
      const foldChanges: Array<{
        gene: string
        conditionA: number
        conditionB: number
        foldChange: number
        classification: 'upregulated' | 'downregulated' | 'no_change'
      }> = []

      let upregulated = 0
      let downregulated = 0

      validRows.forEach(row => {
        if (!row) return
        const geneName = row[geneNames[0]] || 'Unknown'
        const valA = Number(row[conditionAKey])
        const valB = Number(row[conditionBKey])

        if (!isNaN(valA) && !isNaN(valB) && isFinite(valA) && isFinite(valB) && valA > 0) {
          const foldChange = valB / valA
          let classification: 'upregulated' | 'downregulated' | 'no_change' = 'no_change'
          
          if (foldChange > 1) {
            classification = 'upregulated'
            upregulated++
          } else if (foldChange < 1) {
            classification = 'downregulated'
            downregulated++
          }

          foldChanges.push({
            gene: geneName,
            conditionA: valA,
            conditionB: valB,
            foldChange: Number(foldChange.toFixed(3)),
            classification
          })
        }
      })

      upregulatedGenes = upregulated
      downregulatedGenes = downregulated
      foldChangeData = JSON.stringify(foldChanges.slice(0, 100)) // Store first 100 genes for display
    }
  }

  // Calculate expression distribution for chart visualization
  // This creates bins for histogram/distribution charts
  const expressionValues: number[] = []
  validRows.forEach(row => {
    if (!row) return
    Object.values(row).forEach((v: any, idx) => {
      if (idx === 0) return // Skip gene name column
      const n = Number(v)
      if (!isNaN(n) && isFinite(n)) {
        expressionValues.push(n)
      }
    })
  })

  // Create distribution bins for chart visualization
  const distributionData = (() => {
    if (expressionValues.length === 0) return []
    const min = Math.min(...expressionValues)
    const max = Math.max(...expressionValues)
    const binCount = 20
    const binSize = (max - min) / binCount
    const bins = Array(binCount).fill(0).map((_, i) => ({
      bin: i,
      range: `${(min + i * binSize).toFixed(2)}-${(min + (i + 1) * binSize).toFixed(2)}`,
      count: 0,
      midpoint: min + (i + 0.5) * binSize
    }))
    
    expressionValues.forEach(val => {
      const binIndex = Math.min(Math.floor((val - min) / binSize), binCount - 1)
      bins[binIndex].count++
    })
    
    return bins
  })()

    // Prepare analysis result object (used whether saved to DB or not)
    // Includes chart-ready data for immediate visualization
    const analysisResult = {
      id: crypto.randomUUID(), // Generate ID even if not saving to DB
      fileName: file.name,
      fileHash,
      genes,
      samples,
      meanExpr,
      upregulatedGenes,
      downregulatedGenes,
      foldChangeData,
      species: species || null,
      datasetSource: datasetSource || null,
      datasetId: datasetId || null,
      // Chart-ready data for immediate visualization
      chartData: {
        foldChangeData: foldChangeData ? JSON.parse(foldChangeData) : [],
        distributionData: distributionData,
        expressionValues: expressionValues.slice(0, 1000), // Limit for performance
      },
      createdAt: new Date(),
      // Flag to indicate if this was saved to database
      savedToDatabase: false,
    }

    // Save analysis results to database (if available)
    // If database save fails, we still return the analysis results
    // This ensures the app remains functional even if database is temporarily unavailable
    if (dbAvailable) {
      try {
        const saved = await prisma.geneExpressionRun.create({
          data: {
            fileName: file.name,
            fileHash,
            genes,
            samples,
            meanExpr,
            upregulatedGenes,
            downregulatedGenes,
            foldChangeData,
            species: species || null,
            datasetSource: datasetSource || null,
            datasetId: datasetId || null,
          },
        })
        
        // Log successful save for debugging
        console.log(`✅ Analysis saved to database: ${saved.id} (${saved.fileName})`)
        
        // Add chart-ready data to saved result
        const savedWithCharts = {
          ...saved,
          chartData: analysisResult.chartData,
          savedToDatabase: true, // Explicitly mark as saved
        }
        
        // Successfully saved - return with database ID and chart data
        return NextResponse.json({ 
          alreadyAnalyzed: false, 
          data: savedWithCharts,
          savedToDatabase: true,
        })
      } catch (dbError: any) {
        console.error("❌ Database save error (returning analysis anyway):", {
          message: dbError.message,
          code: dbError.code,
          meta: dbError.meta
        })
        
        // Handle unique constraint violations (duplicate fileHash - race condition)
        if (dbError.code === "P2002") {
          try {
            // Race condition: file was analyzed between check and save
            const existingRun = await prisma.geneExpressionRun.findUnique({
              where: { fileHash },
            })
            if (existingRun) {
              console.log(`✅ Found existing analysis (race condition): ${existingRun.id}`)
              // Add chart-ready data to existing result
              const existingWithCharts = {
                ...existingRun,
                chartData: {
                  foldChangeData: existingRun.foldChangeData ? JSON.parse(existingRun.foldChangeData) : [],
                  distributionData: [], // Will be calculated if needed
                  expressionValues: [],
                },
                savedToDatabase: true,
              }
              return NextResponse.json({ 
                alreadyAnalyzed: true, 
                data: existingWithCharts,
                savedToDatabase: true,
              })
            }
          } catch (retryError: any) {
            console.error("❌ Error fetching existing run:", retryError.message)
            // Fall through to return analysis without DB save
          }
        }
        
        // Database save failed, but return analysis results anyway
        // This ensures users can still see their analysis even if DB is down
        console.warn("⚠️ Analysis completed but NOT saved to database. Results are temporary.")
        return NextResponse.json({ 
          alreadyAnalyzed: false, 
          data: {
            ...analysisResult,
            savedToDatabase: false,
          },
          savedToDatabase: false,
          warning: "Analysis completed but could not be saved to database. Results are temporary.",
        })
      }
    } else {
      // Database was unavailable from the start - return analysis without saving
      return NextResponse.json({ 
        alreadyAnalyzed: false, 
        data: analysisResult,
        savedToDatabase: false,
        warning: "Database unavailable. Analysis completed but results are temporary.",
      })
    }
    
  } catch (error: any) {
    console.error("Analysis API error:", error)
    // Ensure we return clean JSON errors instead of crashing
    return NextResponse.json({ 
      error: error.message || "An error occurred during analysis. Please check your file format.",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 })
  }
}
