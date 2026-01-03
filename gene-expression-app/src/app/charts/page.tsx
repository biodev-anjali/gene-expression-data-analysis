"use client"
import { useEffect, useState } from "react"
import ExpressionChart from "@/components/ExpressionChart"
import BioBackground from "../components/BioBackground"

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
    <main style={{
      position: "relative",
      zIndex: 10,
      minHeight: "100vh",
      padding: "40px",
      maxWidth: "1100px",
      margin: "0 auto"
    }}>
      <BioBackground />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 className="text-glow" style={{
          fontSize: "36px",
          fontWeight: 700,
          marginBottom: "20px",
          color: "#e0f2fe"
        }}>
          Visual Comparison & Insights
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <p className="info-text">
            Select samples to generate visual comparisons. Charts are optional and user-driven.
          </p>
        </div>

        {loading && (
          <div className="scifi-card" style={{ padding: "40px", textAlign: "center" }}>
            <p className="info-text">Loading analysis history...</p>
          </div>
        )}

        {!loading && runs.length === 0 && (
          <div className="scifi-card" style={{ padding: "40px", textAlign: "center" }}>
            <p className="info-text">No analysis history found. Upload files in the Analyzer page first.</p>
          </div>
        )}

        {!loading && runs.length > 0 && (
          <div className="scifi-card" style={{ padding: "30px", marginBottom: "30px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "20px",
              color: "#cbd5e1"
            }}>
              Available Samples
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {runs.map(r => (
                <label
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transition: "background 0.2s ease",
                    border: selected.some(s => s.id === r.id)
                      ? "1px solid rgba(0, 240, 255, 0.5)"
                      : "1px solid rgba(0, 240, 255, 0.1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 240, 255, 0.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selected.some(s => s.id === r.id)}
                    onChange={e =>
                      setSelected(p =>
                        e.target.checked
                          ? [...p, r]
                          : p.filter(x => x.id !== r.id)
                      )
                    }
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                      accentColor: "#00f0ff"
                    }}
                  />
                  <span style={{ color: "#cbd5e1", flex: 1 }}>
                    {r.fileName || "Unknown"}
                  </span>
                  <span className="info-text" style={{ fontSize: "13px" }}>
                    Genes: {r.genes} | Mean: {r.meanExpr?.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {selected.length > 0 && (
          <div className="scifi-card fade-in" style={{ padding: "30px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "20px",
              color: "#cbd5e1"
            }}>
              Comparison Chart
            </h2>
            <ExpressionChart 
              data={selected.map(r => ({
                fileName: r.fileName || "Unknown",
                meanExpr: r.meanExpr || 0
              }))} 
            />
          </div>
        )}
      </div>
    </main>
  )
}
