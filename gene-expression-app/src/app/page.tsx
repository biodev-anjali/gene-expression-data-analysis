"use client"
import { useState } from "react"
import Link from "next/link"

export default function Home() {
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMsg("")
    
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const r = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })
      const d = await r.json()

      setMsg(d.alreadyAnalyzed
        ? "⚠️ Sample already analyzed. Showing previous result."
        : "✅ New analysis completed."
      )
      setRes(d.data)
    } catch (error) {
      setMsg("❌ Error analyzing file. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ 
      padding: 20, 
      maxWidth: 800, 
      margin: "0 auto",
      minHeight: "100vh",
      position: "relative",
      zIndex: 10,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      textRendering: "optimizeLegibility"
    }}>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ 
          fontSize: 28, 
          marginBottom: 10,
          fontWeight: 700,
          color: "#e0f2fe",
          letterSpacing: "-0.02em"
        }}>
          Gene Expression Analyzer
        </h1>
        <p style={{ 
          color: "#94a3b8", 
          marginBottom: 20,
          fontSize: 16,
          lineHeight: 1.5
        }}>
          App is live on Vercel 🚀
        </p>
        <Link 
          href="/history" 
          style={{ 
            color: "#60a5fa", 
            textDecoration: "underline",
            marginBottom: 30,
            display: "inline-block",
            fontSize: 16,
            fontWeight: 500
          }}
        >
          Go to History
        </Link>
      </div>

      <div className="scifi-card" style={{ 
        borderRadius: 8, 
        padding: 24,
        marginBottom: 20
      }}>
        <h2 style={{ 
          fontSize: 20, 
          marginBottom: 16,
          fontWeight: 600,
          color: "#e0f2fe",
          letterSpacing: "-0.01em"
        }}>
          Upload File
        </h2>
        
        <form onSubmit={submit} style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <input 
              type="file" 
              name="file" 
              required 
              className="scifi-input"
              style={{
                padding: 10,
                width: "100%",
                borderRadius: 4,
                fontSize: 14,
                color: "#e0f2fe"
              }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="scifi-button"
            style={{
              padding: "12px 24px",
              borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.01em",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Processing..." : "Analyze File"}
          </button>
        </form>

        {msg && (
          <div style={{
            padding: 14,
            marginBottom: 16,
            borderRadius: 4,
            backgroundColor: msg.includes("✅") ? "rgba(34, 197, 94, 0.2)" : 
                           msg.includes("⚠️") ? "rgba(234, 179, 8, 0.2)" : "rgba(239, 68, 68, 0.2)",
            color: msg.includes("✅") ? "#86efac" : 
                   msg.includes("⚠️") ? "#fde047" : "#fca5a5",
            border: `1px solid ${msg.includes("✅") ? "rgba(34, 197, 94, 0.5)" : 
                              msg.includes("⚠️") ? "rgba(234, 179, 8, 0.5)" : "rgba(239, 68, 68, 0.5)"}`,
            fontSize: 14,
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            {msg}
          </div>
        )}

        {res && (
          <div className="scifi-card" style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 4
          }}>
            <h3 style={{ 
              fontSize: 18, 
              marginBottom: 16,
              fontWeight: 600,
              color: "#e0f2fe",
              letterSpacing: "-0.01em"
            }}>
              Analysis Results
            </h3>
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6 }}>
                <strong style={{ fontWeight: 600, color: "#e0f2fe" }}>File:</strong> {res.fileName || "Unknown"}
              </div>
              <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6 }}>
                <strong style={{ fontWeight: 600, color: "#e0f2fe" }}>Genes:</strong> {res.genes.toLocaleString()}
              </div>
              <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6 }}>
                <strong style={{ fontWeight: 600, color: "#e0f2fe" }}>Samples:</strong> {res.samples.toLocaleString()}
              </div>
              <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6 }}>
                <strong style={{ fontWeight: 600, color: "#e0f2fe" }}>Mean Expression:</strong> {res.meanExpr?.toFixed(2) || "N/A"}
              </div>
              <div style={{ 
                fontSize: 13, 
                color: "#94a3b8", 
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid rgba(0, 240, 255, 0.2)",
                lineHeight: 1.5
              }}>
                <strong style={{ fontWeight: 600 }}>Date:</strong> {new Date(res.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
