"use client"
import { useEffect, useState } from "react"
import ExpressionChart from "@/components/ExpressionChart"

export default function Charts() {
  const [runs, setRuns] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])
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
      <h1 className="text-xl font-bold">Visual Comparison</h1>

      <p className="text-sm">
        Charts are generated only when you select samples.
      </p>

      {loading && <p>Loading...</p>}

      {runs.map(r => (
        <label key={r.id} className="block">
          <input
            type="checkbox"
            onChange={e =>
              setSelected(p =>
                e.target.checked ? [...p, r] : p.filter(x => x.id !== r.id)
              )
            }
          />{" "}
          {r.fileName}
        </label>
      ))}

      {selected.length > 0 && (
        <ExpressionChart 
          data={selected.map(r => ({
            fileName: r.fileName || "Unknown",
            meanExpr: r.meanExpr || 0
          }))} 
        />
      )}
    </main>
  )
}

