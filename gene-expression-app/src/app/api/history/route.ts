import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const runs = await prisma.geneExpressionRun.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(runs)
  } catch (error: any) {
    console.error("History API error:", error)
    // Return clean JSON error instead of crashing
    return NextResponse.json(
      { 
        error: "Failed to fetch analysis history. Please check your database connection.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

