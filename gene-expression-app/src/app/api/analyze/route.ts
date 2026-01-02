import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import crypto from "crypto"
import Papa from "papaparse"

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
    return NextResponse.json({ alreadyAnalyzed: true, data: existing })
  }

  const csvText = buffer.toString("utf-8")
  const parsed = Papa.parse(csvText, { header: true })
  const rows = parsed.data as any[]

  const genes = rows.length
  const samples = Object.keys(rows[0] || {}).length - 1

  let sum = 0
  let count = 0

  rows.forEach(row => {
    Object.values(row).slice(1).forEach((v: any) => {
      const n = Number(v)
      if (!isNaN(n)) {
        sum += n
        count++
      }
    })
  })

  const meanExpr = Number((sum / count).toFixed(3))

  const saved = await prisma.geneExpressionRun.create({
    data: {
      fileName: file.name,
      fileHash,
      genes,
      samples,
      meanExpr,
    },
  })

  return NextResponse.json({ alreadyAnalyzed: false, data: saved })
}
