"use client"
import { useState } from "react"

export default function Analyze() {
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState<any>(null)

  async function submit(e: any) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const r = await fetch("/api/analyze", { method: "POST", body: formData })
    const d = await r.json()
    setMsg(d.alreadyAnalyzed ? "Already analyzed sample" : "Analysis completed")
    setRes(d.data)
  }

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Analyzer</h1>

      <form onSubmit={submit}>
        <input type="file" name="file" required />
        <button className="ml-2 px-3 py-1 bg-black text-white">
          Analyze
        </button>
      </form>

      {msg && <p>{msg}</p>}
      {res && (
        <div className="border p-3">
          <p>Genes: {res.genes}</p>
          <p>Samples: {res.samples}</p>
          <p>Mean Expression: {res.meanExpr}</p>
        </div>
      )}
    </main>
  )
}

