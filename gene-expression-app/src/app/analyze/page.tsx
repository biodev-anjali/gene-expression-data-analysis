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
      paddingTop: "100px",
      padding: "100px 40px 40px",
      maxWidth: "1000px",
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
          Analyzer
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <p className="info-text" style={{ 
            marginBottom: "24px",
            fontSize: "16px",
            lineHeight: "1.8"
          }}>
            Upload your gene expression data file to perform automated analysis and compute 
            comprehensive summary statistics including gene count, sample count, and mean expression values.
          </p>

          <div style={{
            padding: "24px",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            border: "2px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            marginBottom: "24px"
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
                Accepted File Types
              </span>
            </div>
            <p style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#c4b5fd",
              marginBottom: "16px"
            }}>
              Only CSV (Comma-Separated Values) files are accepted
            </p>
            <div style={{
              padding: "16px",
              background: "rgba(15, 23, 42, 0.4)",
              borderRadius: "6px",
              marginBottom: "16px"
            }}>
              <p style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                Required CSV Structure:
              </p>
              <ul className="info-text" style={{
                fontSize: "14px",
                paddingLeft: "24px",
                lineHeight: "2",
                color: "#cbd5e1"
              }}>
                <li><strong style={{ color: "#00f0ff" }}>First column:</strong> Gene names or identifiers</li>
                <li><strong style={{ color: "#00f0ff" }}>Remaining columns:</strong> Expression values per sample</li>
                <li><strong style={{ color: "#00f0ff" }}>Header row:</strong> Column names (first = "Gene", others = sample names)</li>
              </ul>
            </div>
            <p style={{
              fontSize: "13px",
              color: "#94a3b8",
              fontStyle: "italic",
              marginBottom: 0
            }}>
              Note: Other file formats (XLSX, TSV, TXT, etc.) are not supported. Please convert 
              your data to CSV format before uploading.
            </p>
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
