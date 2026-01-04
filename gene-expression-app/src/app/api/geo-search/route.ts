import { NextResponse } from "next/server"
import { searchGEOBySpecies } from "@/lib/geoParser"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { speciesName, maxResults } = body

    if (!speciesName || typeof speciesName !== 'string' || speciesName.trim().length === 0) {
      return NextResponse.json(
        { error: "Species name is required" },
        { status: 400 }
      )
    }

    const limit = Math.min(Math.max(parseInt(maxResults || '20', 10), 1), 50) // Limit between 1-50

    try {
      const datasets = await searchGEOBySpecies(speciesName.trim(), limit)

      if (datasets.length === 0) {
        return NextResponse.json({
          success: true,
          datasets: [],
          message: `No gene expression datasets found for "${speciesName}". Try a different species name or check the spelling.`
        })
      }

      return NextResponse.json({
        success: true,
        datasets: datasets,
        count: datasets.length
      })

    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Failed to search NCBI GEO. Please try again." },
        { status: 400 }
      )
    }

  } catch (error: any) {
    console.error("GEO search API error:", error)
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during GEO search" },
      { status: 500 }
    )
  }
}

