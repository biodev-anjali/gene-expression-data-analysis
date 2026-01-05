import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import crypto from "crypto"
import Papa from "papaparse"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileHash = crypto.createHash("sha256").update(buffer).digest("hex")

    // Check for existing analysis with proper error handling
    let existing
    try {
      existing = await prisma.geneExpressionRun.findUnique({
        where: { fileHash },
      })
    } catch (dbError: any) {
      console.error("Database query error:", dbError)
      return NextResponse.json(
        { 
          error: "Database connection failed. Please check your database configuration.",
          details: process.env.NODE_ENV === "development" ? dbError.message : undefined
        },
        { status: 500 }
      )
    }

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

    // Save analysis results with proper error handling
    let saved
    try {
      saved = await prisma.geneExpressionRun.create({
        data: {
          fileName: file.name,
          fileHash,
          genes,
          samples,
          meanExpr,
          upregulatedGenes,
          downregulatedGenes,
          foldChangeData,
        },
      })
    } catch (dbError: any) {
      console.error("Database save error:", dbError)
      // Handle unique constraint violations (duplicate fileHash)
      if (dbError.code === "P2002") {
        // Race condition: file was analyzed between check and save
        const existingRun = await prisma.geneExpressionRun.findUnique({
          where: { fileHash },
        })
        if (existingRun) {
          return NextResponse.json({ alreadyAnalyzed: true, data: existingRun })
        }
      }
      return NextResponse.json(
        { 
          error: "Failed to save analysis results. Please try again.",
          details: process.env.NODE_ENV === "development" ? dbError.message : undefined
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ alreadyAnalyzed: false, data: saved })
    
  } catch (error: any) {
    console.error("Analysis API error:", error)
    // Ensure we return clean JSON errors instead of crashing
    return NextResponse.json({ 
      error: error.message || "An error occurred during analysis. Please check your file format.",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 })
  }
}
