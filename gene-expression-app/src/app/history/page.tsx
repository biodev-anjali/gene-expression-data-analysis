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
      padding: "40px",
      maxWidth: "1000px",
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
          Analysis History
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <p className="info-text" style={{ marginBottom: "15px" }}>
            This page shows previously analyzed datasets. Results are reused to avoid
            repeated computation, making analysis more efficient.
          </p>
          <p className="info-text" style={{ fontSize: "13px" }}>
            This is a read-only view - no automatic analysis is performed.
          </p>
        </div>

        {loading && (
          <div className="scifi-card" style={{ padding: "40px", textAlign: "center" }}>
            <p className="info-text">Loading analysis history...</p>
          </div>
        )}

        {!loading && runs.length === 0 && (
          <div className="scifi-card" style={{ padding: "40px", textAlign: "center" }}>
            <p className="info-text">No analysis history found.</p>
            <Link href="/analyze" className="nav-link" style={{ marginTop: "20px", display: "inline-block" }}>
              Start Analysis
            </Link>
          </div>
        )}

        {!loading && runs.length > 0 && (
          <div style={{ display: "grid", gap: "20px" }}>
            {runs.map((r, index) => (
              <div key={r.id} className="scifi-card fade-in" style={{
                padding: "25px",
                animationDelay: `${index * 0.1}s`
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "30px",
                  alignItems: "start"
                }}>
                  <div style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                    fontWeight: 600,
                    minWidth: "60px"
                  }}>
                    #{String(index + 1).padStart(3, '0')}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "12px",
                      color: "#e0f2fe"
                    }}>
                      {r.fileName || "Unknown"}
                    </h3>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "15px",
                      marginTop: "15px"
                    }}>
                      <div>
                        <span className="info-text" style={{ fontSize: "13px", display: "block", marginBottom: "4px" }}>
                          Genes
                        </span>
                        <span style={{ color: "#00f0ff", fontWeight: 600 }}>
                          {r.genes.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="info-text" style={{ fontSize: "13px", display: "block", marginBottom: "4px" }}>
                          Samples
                        </span>
                        <span style={{ color: "#00f0ff", fontWeight: 600 }}>
                          {r.samples.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="info-text" style={{ fontSize: "13px", display: "block", marginBottom: "4px" }}>
                          Mean Expression
                        </span>
                        <span style={{ color: "#00f0ff", fontWeight: 600 }}>
                          {r.meanExpr?.toFixed(3) || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    textAlign: "right",
                    minWidth: "120px"
                  }}>
                    <span className="info-text" style={{ fontSize: "12px", display: "block", marginBottom: "4px" }}>
                      Analyzed
                    </span>
                    <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                      {new Date(r.createdAt).toLocaleDateString()}
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
