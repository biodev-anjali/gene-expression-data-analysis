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
      paddingTop: "100px",
      padding: "100px 40px 40px",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      <BioBackground />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 className="text-glow" style={{
          fontSize: "48px",
          fontWeight: 700,
          marginBottom: "30px",
          color: "#e0f2fe"
        }}>
          Charts
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <p className="info-text" style={{ 
            fontSize: "16px", 
            lineHeight: "1.8",
            marginBottom: "24px"
          }}>
            Select multiple datasets from your analysis history to generate visual comparisons. 
            Compare mean expression values across different experiments, conditions, or time points 
            to identify patterns and trends in your gene expression data.
          </p>

          <div style={{
            padding: "24px",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            border: "2px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px"
            }}>
              <span style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#c4b5fd"
              }}>
                Data Source Information
              </span>
            </div>
            <p style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#c4b5fd",
              marginBottom: "16px"
            }}>
              Charts are generated from previously analyzed CSV files
            </p>
            <div style={{
              padding: "16px",
              background: "rgba(15, 23, 42, 0.4)",
              borderRadius: "6px"
            }}>
              <p style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                Original File Format Requirements:
              </p>
              <ul className="info-text" style={{
                fontSize: "14px",
                paddingLeft: "24px",
                lineHeight: "2",
                color: "#cbd5e1"
              }}>
                <li><strong style={{ color: "#00f0ff" }}>File Type:</strong> CSV (Comma-Separated Values) only</li>
                <li><strong style={{ color: "#00f0ff" }}>First column:</strong> Gene names or identifiers</li>
                <li><strong style={{ color: "#00f0ff" }}>Remaining columns:</strong> Expression values per sample</li>
                <li><strong style={{ color: "#00f0ff" }}>Header row:</strong> Required with column names</li>
              </ul>
            </div>
            <p style={{
              fontSize: "13px",
              color: "#94a3b8",
              fontStyle: "italic",
              marginTop: "16px",
              marginBottom: 0
            }}>
              To add new datasets for comparison, upload CSV files through the Analyzer page first.
            </p>
          </div>
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
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "24px",
              color: "#cbd5e1"
            }}>
              Available Datasets
            </h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {runs.map(r => (
                <label
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    background: selected.some(s => s.id === r.id)
                      ? "rgba(139, 92, 246, 0.15)"
                      : "rgba(15, 23, 42, 0.4)",
                    border: selected.some(s => s.id === r.id)
                      ? "2px solid rgba(139, 92, 246, 0.5)"
                      : "1px solid rgba(0, 240, 255, 0.2)"
                  }}
                  onMouseEnter={(e) => {
                    if (!selected.some(s => s.id === r.id)) {
                      e.currentTarget.style.background = "rgba(0, 240, 255, 0.08)"
                      e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.4)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected.some(s => s.id === r.id)) {
                      e.currentTarget.style.background = "rgba(15, 23, 42, 0.4)"
                      e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.2)"
                    }
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
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      accentColor: "#8b5cf6"
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      color: "#e0f2fe", 
                      fontWeight: 600,
                      marginBottom: "4px",
                      fontSize: "15px"
                    }}>
                      {r.fileName || "Unknown"}
                    </div>
                    <div style={{ 
                      display: "flex", 
                      gap: "16px",
                      fontSize: "13px",
                      color: "#94a3b8"
                    }}>
                      <span>Genes: <span style={{ color: "#00f0ff" }}>{r.genes.toLocaleString()}</span></span>
                      <span>Samples: <span style={{ color: "#00f0ff" }}>{r.samples.toLocaleString()}</span></span>
                      <span>Mean: <span style={{ color: "#00f0ff" }}>{r.meanExpr?.toFixed(3) || "N/A"}</span></span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {selected.length > 0 && (
              <div style={{
                marginTop: "24px",
                padding: "16px",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#c4b5fd"
              }}>
                {selected.length} dataset{selected.length > 1 ? 's' : ''} selected for comparison
              </div>
            )}
          </div>
        )}

        {selected.length > 0 && (
          <div className="scifi-card fade-in" style={{ padding: "30px" }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "24px",
              color: "#cbd5e1"
            }}>
              Comparison Visualization
            </h2>
            <div style={{
              padding: "20px",
              background: "rgba(0, 240, 255, 0.03)",
              borderRadius: "8px",
              border: "1px solid rgba(0, 240, 255, 0.1)"
            }}>
              <ExpressionChart 
                data={selected.map(r => ({
                  fileName: r.fileName || "Unknown",
                  meanExpr: r.meanExpr || 0
                }))} 
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
