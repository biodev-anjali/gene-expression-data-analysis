import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

/**
 * History API Route
 * 
 * Fetches all gene expression analysis runs from the database.
 * 
 * ERROR HANDLING:
 * - Returns empty array if database is unavailable (graceful degradation)
 * - Logs errors for debugging but doesn't crash the app
 * - Provides detailed error messages in development mode
 */
export async function GET() {
  try {
    const runs = await prisma.geneExpressionRun.findMany({
      orderBy: { createdAt: "desc" },
    })

    console.log(`✅ History API: Fetched ${runs.length} analysis runs`)
    return NextResponse.json(runs)
  } catch (error: any) {
    console.error("❌ History API error:", {
      message: error.message,
      code: error.code,
      meta: error.meta
    })
    
    // Check for specific Prisma error codes
    const errorCode = error.code || error.meta?.code
    let errorMessage = "Failed to fetch analysis history."
    
    // Provide more specific error messages based on error type
    if (errorCode === "P1001" || error.message?.includes("Can't reach database server")) {
      errorMessage = "Database server is unreachable. Please check your database connection."
    } else if (errorCode === "P1000" || error.message?.includes("Authentication failed")) {
      errorMessage = "Database authentication failed. Please check your DATABASE_URL credentials."
    } else if (errorCode === "P1017" || error.message?.includes("Connection closed")) {
      errorMessage = "Database connection was closed. Please try again."
    }
    
    // Always return an array for graceful degradation
    // Frontend can handle empty history gracefully
    // Log error details in development mode
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ History API: Returning empty array due to error:", errorMessage)
    }
    
    // Return empty array so frontend doesn't break
    // This ensures the app remains functional even if database is unavailable
    return NextResponse.json([])
  }
}

