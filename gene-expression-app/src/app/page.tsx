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
    <main style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>Gene Expression Analyzer</h1>
        <p style={{ color: "#666", marginBottom: 20 }}>
          App is live on Vercel 🚀
        </p>
        <Link 
          href="/history" 
          style={{ 
            color: "#0066cc", 
            textDecoration: "underline",
            marginBottom: 30,
            display: "inline-block"
          }}
        >
          Go to History
        </Link>
      </div>

      <div style={{ 
        border: "1px solid #ddd", 
        borderRadius: 8, 
        padding: 24,
        backgroundColor: "#f9f9f9"
      }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Upload File</h2>
        
        <form onSubmit={submit} style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <input 
              type="file" 
              name="file" 
              required 
              style={{
                padding: 8,
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: 4
              }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: loading ? "#ccc" : "#0066cc",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 16
            }}
          >
            {loading ? "Processing..." : "Analyze File"}
          </button>
        </form>

        {msg && (
          <div style={{
            padding: 12,
            marginBottom: 16,
            borderRadius: 4,
            backgroundColor: msg.includes("✅") ? "#d4edda" : 
                           msg.includes("⚠️") ? "#fff3cd" : "#f8d7da",
            color: msg.includes("✅") ? "#155724" : 
                   msg.includes("⚠️") ? "#856404" : "#721c24",
            border: `1px solid ${msg.includes("✅") ? "#c3e6cb" : 
                              msg.includes("⚠️") ? "#ffeaa7" : "#f5c6cb"}`
          }}>
            {msg}
          </div>
        )}

        {res && (
          <div style={{
            marginTop: 20,
            padding: 16,
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: 4
          }}>
            <h3 style={{ fontSize: 18, marginBottom: 12 }}>Analysis Results</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div>
                <strong>File:</strong> {res.fileName || "Unknown"}
              </div>
              <div>
                <strong>Genes:</strong> {res.genes.toLocaleString()}
              </div>
              <div>
                <strong>Samples:</strong> {res.samples.toLocaleString()}
              </div>
              <div>
                <strong>Mean Expression:</strong> {res.meanExpr?.toFixed(2) || "N/A"}
              </div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
                <strong>Date:</strong> {new Date(res.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
