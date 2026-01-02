"use client"
import { useState } from "react"

export default function Analyze() {
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    
    try {
      const r = await fetch("/api/analyze", { method: "POST", body: formData })
      const d = await r.json()
      setMsg(d.alreadyAnalyzed ? "Already analyzed sample" : "Analysis completed")
      setRes(d.data)
    } catch (error) {
      setMsg("Error analyzing file")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Analyzer</h1>

      <form onSubmit={submit}>
        <input type="file" name="file" required />
        <button 
          className="ml-2 px-3 py-1 bg-black text-white"
          disabled={loading}
        >
          {loading ? "Processing..." : "Analyze"}
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

