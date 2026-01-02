"use client"
import { useEffect, useState } from "react"

export default function History() {
  const [runs, setRuns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/history")
      .then(r => r.json())
      .then(data => {
        setRuns(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Analysis History</h1>

      {loading && <p>Loading...</p>}

      {!loading && runs.length === 0 && (
        <p>No analysis history found.</p>
      )}

      {runs.map(r => (
        <div key={r.id} className="border p-3">
          <p>{r.fileName}</p>
          <p>Genes: {r.genes} | Mean: {r.meanExpr}</p>
        </div>
      ))}
    </main>
  )
}
