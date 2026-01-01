import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const runs = await prisma.geneExpressionRun.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(runs)
}

