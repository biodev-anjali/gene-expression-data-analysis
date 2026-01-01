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
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      color: "#333333",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      textRendering: "optimizeLegibility"
    }}>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ 
          fontSize: 28, 
          marginBottom: 10,
          fontWeight: 700,
          color: "#1a1a1a",
          letterSpacing: "-0.02em"
        }}>
          Gene Expression Analyzer
        </h1>
        <p style={{ 
          color: "#555555", 
          marginBottom: 20,
          fontSize: 16,
          lineHeight: 1.5
        }}>
          App is live on Vercel 🚀
        </p>
        <Link 
          href="/history" 
          style={{ 
            color: "#0066cc", 
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

      <div style={{ 
        border: "1px solid #e0e0e0", 
        borderRadius: 8, 
        padding: 24,
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ 
          fontSize: 20, 
          marginBottom: 16,
          fontWeight: 600,
          color: "#1a1a1a",
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
              style={{
                padding: 10,
                width: "100%",
                border: "1px solid #cccccc",
                borderRadius: 4,
                fontSize: 14,
                color: "#333333",
                backgroundColor: "#ffffff"
              }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: "12px 24px",
              backgroundColor: loading ? "#cccccc" : "#0066cc",
              color: "#ffffff",
              border: "none",
              borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.01em"
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
            backgroundColor: msg.includes("✅") ? "#d4edda" : 
                           msg.includes("⚠️") ? "#fff3cd" : "#f8d7da",
            color: msg.includes("✅") ? "#155724" : 
                   msg.includes("⚠️") ? "#856404" : "#721c24",
            border: `1px solid ${msg.includes("✅") ? "#c3e6cb" : 
                              msg.includes("⚠️") ? "#ffeaa7" : "#f5c6cb"}`,
            fontSize: 14,
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            {msg}
          </div>
        )}

        {res && (
          <div style={{
            marginTop: 20,
            padding: 20,
            backgroundColor: "#f8f9fa",
            border: "1px solid #e0e0e0",
            borderRadius: 4
          }}>
            <h3 style={{ 
              fontSize: 18, 
              marginBottom: 16,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.01em"
            }}>
              Analysis Results
            </h3>
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ fontSize: 15, color: "#333333", lineHeight: 1.6 }}>
                <strong style={{ fontWeight: 600, color: "#1a1a1a" }}>File:</strong> {res.fileName || "Unknown"}
              </div>
              <div style={{ fontSize: 15, color: "#333333", lineHeight: 1.6 }}>
                <strong style={{ fontWeight: 600, color: "#1a1a1a" }}>Genes:</strong> {res.genes.toLocaleString()}
              </div>
              <div style={{ fontSize: 15, color: "#333333", lineHeight: 1.6 }}>
                <strong style={{ fontWeight: 600, color: "#1a1a1a" }}>Samples:</strong> {res.samples.toLocaleString()}
              </div>
              <div style={{ fontSize: 15, color: "#333333", lineHeight: 1.6 }}>
                <strong style={{ fontWeight: 600, color: "#1a1a1a" }}>Mean Expression:</strong> {res.meanExpr?.toFixed(2) || "N/A"}
              </div>
              <div style={{ 
                fontSize: 13, 
                color: "#666666", 
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid #e0e0e0",
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
