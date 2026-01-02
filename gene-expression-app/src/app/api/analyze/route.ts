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
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true })
  const rows = parsed.data as any[]

  // Filter out empty rows
  const validRows = rows.filter(row => row && Object.keys(row).length > 0)
  
  if (validRows.length === 0) {
    return NextResponse.json({ error: "CSV file is empty or invalid" }, { status: 400 })
  }

  const genes = validRows.length
  const firstRow = validRows[0]
  const samples = Object.keys(firstRow).filter(key => key && key.trim() !== '').length - 1

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
