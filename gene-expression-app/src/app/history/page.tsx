"use client"
import { useEffect, useState } from "react"
import BioBackground from "../components/BioBackground"
import Link from "next/link"

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
          History
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <p className="info-text" style={{ 
            marginBottom: "15px",
            fontSize: "16px",
            lineHeight: "1.8"
          }}>
            View all previously analyzed gene expression datasets. The system automatically 
            detects and reuses results from identical files, eliminating redundant computation 
            and ensuring efficient data processing.
          </p>
          <p className="info-text" style={{ fontSize: "14px", lineHeight: "1.8" }}>
            Each entry includes complete metadata, statistical summaries, and analysis timestamps 
            for comprehensive research tracking.
          </p>
        </div>

        {loading && (
          <div className="scifi-card" style={{ padding: "40px", textAlign: "center" }}>
            <p className="info-text">Loading analysis history...</p>
          </div>
        )}

        {!loading && runs.length === 0 && (
          <div className="scifi-card" style={{ 
            padding: "60px 40px", 
            textAlign: "center" 
          }}>
            <p className="info-text" style={{ 
              fontSize: "16px",
              marginBottom: "24px"
            }}>
              No analysis history found.
            </p>
            <Link 
              href="/analyze" 
              style={{ 
                display: "inline-block",
                padding: "12px 24px",
                background: "rgba(139, 92, 246, 0.2)",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                borderRadius: "6px",
                color: "#c4b5fd",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.3)"
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.6)"
                e.currentTarget.style.boxShadow = "0 0 15px rgba(139, 92, 246, 0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)"
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.4)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              Start Analysis
            </Link>
          </div>
        )}

        {!loading && runs.length > 0 && (
          <div style={{ display: "grid", gap: "24px" }}>
            {runs.map((r, index) => (
              <div key={r.id} className="scifi-card fade-in" style={{
                padding: "30px",
                animationDelay: `${index * 0.1}s`,
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.4)"
                e.currentTarget.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.2)"
                e.currentTarget.style.boxShadow = "none"
              }}
              >
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "32px",
                  alignItems: "start"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50px",
                    height: "50px",
                    background: "rgba(139, 92, 246, 0.15)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "8px",
                    color: "#c4b5fd",
                    fontSize: "16px",
                    fontWeight: 700
                  }}>
                    #{String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "16px",
                      color: "#e0f2fe"
                    }}>
                      {r.fileName || "Unknown"}
                    </h3>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: "20px",
                      marginTop: "16px"
                    }}>
                      <div style={{
                        padding: "12px",
                        background: "rgba(0, 240, 255, 0.05)",
                        borderRadius: "6px",
                        border: "1px solid rgba(0, 240, 255, 0.1)"
                      }}>
                        <span className="info-text" style={{ 
                          fontSize: "12px", 
                          display: "block", 
                          marginBottom: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          Genes
                        </span>
                        <span style={{ 
                          color: "#00f0ff", 
                          fontWeight: 700,
                          fontSize: "18px"
                        }}>
                          {r.genes.toLocaleString()}
                        </span>
                      </div>
                      <div style={{
                        padding: "12px",
                        background: "rgba(0, 240, 255, 0.05)",
                        borderRadius: "6px",
                        border: "1px solid rgba(0, 240, 255, 0.1)"
                      }}>
                        <span className="info-text" style={{ 
                          fontSize: "12px", 
                          display: "block", 
                          marginBottom: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          Samples
                        </span>
                        <span style={{ 
                          color: "#00f0ff", 
                          fontWeight: 700,
                          fontSize: "18px"
                        }}>
                          {r.samples.toLocaleString()}
                        </span>
                      </div>
                      <div style={{
                        padding: "12px",
                        background: "rgba(0, 240, 255, 0.05)",
                        borderRadius: "6px",
                        border: "1px solid rgba(0, 240, 255, 0.1)"
                      }}>
                        <span className="info-text" style={{ 
                          fontSize: "12px", 
                          display: "block", 
                          marginBottom: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          Mean Expression
                        </span>
                        <span style={{ 
                          color: "#00f0ff", 
                          fontWeight: 700,
                          fontSize: "18px"
                        }}>
                          {r.meanExpr?.toFixed(3) || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    textAlign: "right",
                    minWidth: "140px"
                  }}>
                    <span className="info-text" style={{ 
                      fontSize: "12px", 
                      display: "block", 
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Analyzed
                    </span>
                    <span style={{ 
                      fontSize: "14px", 
                      color: "#94a3b8",
                      display: "block",
                      marginBottom: "4px"
                    }}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                    <span style={{ 
                      fontSize: "12px", 
                      color: "#64748b"
                    }}>
                      {new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
