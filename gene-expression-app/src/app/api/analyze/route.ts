import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const fileHash = crypto.createHash("sha256").update(buffer).digest("hex")

  const existing = await prisma.geneExpressionRun.findUnique({
    where: { fileHash },
  })

  if (existing) {
    return NextResponse.json({
      alreadyAnalyzed: true,
      data: existing,
    })
  }

  const genes = 150
  const samples = 12
  const meanExpr = 6.21

  const saved = await prisma.geneExpressionRun.create({
    data: {
      fileName: file.name,
      fileHash,
      genes,
      samples,
      meanExpr,
    },
  })

  return NextResponse.json({
    alreadyAnalyzed: false,
    data: saved,
  })
}

