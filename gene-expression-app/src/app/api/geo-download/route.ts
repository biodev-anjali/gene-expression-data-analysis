import { NextResponse } from "next/server"
import { downloadGEOFile, parseSeriesMatrixFile, validateGEOFile } from "@/lib/geoParser"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      )
    }

    // Validate URL format
    if (!url.includes('ncbi.nlm.nih.gov/geo') && !url.includes('ftp.ncbi.nlm.nih.gov/geo')) {
      return NextResponse.json(
        { error: "URL must be from NCBI GEO (ncbi.nlm.nih.gov/geo)" },
        { status: 400 }
      )
    }

    // Download file
    let fileContent: string
    try {
      fileContent = await downloadGEOFile(url)
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Failed to download file from NCBI GEO" },
        { status: 400 }
      )
    }

    // Validate file format
    if (!validateGEOFile(fileContent)) {
      return NextResponse.json(
        { error: "File does not appear to be a valid GEO Series Matrix File format" },
        { status: 400 }
      )
    }

    // Parse and convert to CSV
    let parsedData
    try {
      parsedData = parseSeriesMatrixFile(fileContent)
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Failed to parse GEO file. Please ensure it's a Series Matrix File format." },
        { status: 400 }
      )
    }

    // Return CSV data and metadata
    return NextResponse.json({
      success: true,
      csvData: parsedData.csvData,
      metadata: parsedData.metadata,
      fileName: `GEO_${parsedData.metadata.seriesTitle?.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50) || 'dataset'}.csv`
    })

  } catch (error: any) {
    console.error("GEO download API error:", error)
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during GEO file download" },
      { status: 500 }
    )
  }
}

