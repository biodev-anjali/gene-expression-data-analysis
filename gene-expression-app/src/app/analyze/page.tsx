"use client"
import { useState } from "react"
import BioBackground from "../components/BioBackground"

export default function Analyze() {
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMsg("")
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
    <main style={{
      position: "relative",
      zIndex: 10,
      minHeight: "100vh",
      padding: "40px",
      maxWidth: "900px",
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
          Analyzer
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <p className="info-text" style={{ marginBottom: "20px" }}>
            This page analyzes uploaded gene expression data and computes summary statistics.
          </p>

          <div style={{
            padding: "20px",
            backgroundColor: "rgba(0, 240, 255, 0.05)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            borderRadius: "4px",
            marginBottom: "20px"
          }}>
            <p style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#00f0ff",
              marginBottom: "12px"
            }}>
              Accepted file format: CSV (gene expression matrix)
            </p>
            <ul className="info-text" style={{
              fontSize: "13px",
              paddingLeft: "20px",
              lineHeight: "1.8"
            }}>
              <li>First column: Gene names</li>
              <li>Remaining columns: Expression values per sample</li>
            </ul>
          </div>

          <form onSubmit={submit} style={{ marginTop: "30px" }}>
            <div style={{ marginBottom: "20px" }}>
              <input 
                type="file" 
                name="file" 
                required 
                accept=".csv"
                className="scifi-input"
              />
            </div>
            <button 
              type="submit"
              className="scifi-button"
              disabled={loading}
            >
              {loading ? "Processing..." : "Analyze"}
            </button>
          </form>
        </div>

        {msg && (
          <div className="scifi-card fade-in" style={{
            padding: "20px",
            marginBottom: "20px",
            borderColor: msg.includes("Error") 
              ? "rgba(239, 68, 68, 0.4)" 
              : "rgba(34, 197, 94, 0.4)",
            backgroundColor: msg.includes("Error")
              ? "rgba(239, 68, 68, 0.1)"
              : "rgba(34, 197, 94, 0.1)"
          }}>
            <p style={{
              color: msg.includes("Error") ? "#fca5a5" : "#86efac"
            }}>
              {msg}
            </p>
          </div>
        )}

        {res && (
          <div className="scifi-card fade-in" style={{ padding: "30px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "20px",
              color: "#cbd5e1"
            }}>
              Analysis Results
            </h2>
            <div style={{
              display: "grid",
              gap: "15px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(0, 240, 255, 0.1)"
              }}>
                <span className="info-text">Genes:</span>
                <span style={{ color: "#00f0ff", fontWeight: 600 }}>
                  {res.genes.toLocaleString()}
                </span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(0, 240, 255, 0.1)"
              }}>
                <span className="info-text">Samples:</span>
                <span style={{ color: "#00f0ff", fontWeight: 600 }}>
                  {res.samples.toLocaleString()}
                </span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <span className="info-text">Mean Expression:</span>
                <span style={{ color: "#00f0ff", fontWeight: 600 }}>
                  {res.meanExpr?.toFixed(3) || "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
