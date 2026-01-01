"use client"
import { useState } from "react"
import Link from "next/link"
import BioBackground from "./components/BioBackground"

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
      <BioBackground />
      <div className="animate-slide-up" style={{ marginBottom: 30, position: "relative", zIndex: 1 }}>
        <h1 style={{ 
          fontSize: 36, 
          marginBottom: 15,
          fontWeight: 800,
          background: "linear-gradient(135deg, #00f0ff 0%, #8b5cf6 50%, #ec4899 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
          textAlign: "center",
          position: "relative"
        }}>
          <span style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent)",
            top: "-10px",
            animation: "pulse-border 3s ease-in-out infinite"
          }}></span>
          GENE EXPRESSION ANALYZER
          <span style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)",
            bottom: "-10px",
            animation: "pulse-border 3s ease-in-out infinite",
            animationDelay: "1.5s"
          }}></span>
        </h1>
        <p className="floating" style={{ 
          color: "#60a5fa", 
          marginBottom: 20,
          fontSize: 18,
          lineHeight: 1.5,
          textAlign: "center",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "2px"
        }}>
          ⚡ Molecular Data Processing System ⚡
        </p>
        <Link 
          href="/history" 
          style={{ 
            color: "#60a5fa", 
            textDecoration: "underline",
            marginBottom: 30,
            display: "inline-block",
            fontSize: 16,
            fontWeight: 500,
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(5px)";
            e.currentTarget.style.color = "#93c5fd";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
            e.currentTarget.style.color = "#60a5fa";
          }}
        >
          Go to History
        </Link>
      </div>

      <div className="scifi-card animate-slide-up" style={{ 
        borderRadius: 12, 
        padding: 32,
        marginBottom: 20,
        animationDelay: "0.2s",
        animationFillMode: "backwards",
        position: "relative",
        zIndex: 1,
        border: "2px solid rgba(0, 240, 255, 0.4)",
        boxShadow: `
          0 0 30px rgba(0, 240, 255, 0.2),
          0 0 60px rgba(139, 92, 246, 0.1),
          inset 0 0 30px rgba(0, 240, 255, 0.05)
        `
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
              opacity: loading ? 0.6 : 1,
              position: "relative"
            }}
          >
            {loading && (
              <span style={{
                display: "inline-block",
                marginRight: 8,
                animation: "spin 1s linear infinite"
              }}>⟳</span>
            )}
            {loading ? "Processing..." : "Analyze File"}
          </button>
        </form>

        {msg && (
          <div className="animate-scale-in" style={{
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
          <div className="scifi-card animate-fade-in" style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 4
          }}>
            <h3 style={{ 
              fontSize: 18, 
              marginBottom: 16,
              fontWeight: 600,
              color: "#e0f2fe",
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#00f0ff",
                boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
                animation: "pulse-glow 2s ease-in-out infinite"
              }}></span>
              Analysis Results
            </h3>
            <div style={{ display: "grid", gap: 14 }}>
              <div className="animate-slide-left" style={{ 
                fontSize: 15, 
                color: "#cbd5e1", 
                lineHeight: 1.6,
                animationDelay: "0.1s",
                animationFillMode: "backwards"
              }}>
                <strong style={{ fontWeight: 600, color: "#e0f2fe" }}>File:</strong> {res.fileName || "Unknown"}
              </div>
              <div className="animate-slide-left" style={{ 
                fontSize: 15, 
                color: "#cbd5e1", 
                lineHeight: 1.6,
                animationDelay: "0.2s",
                animationFillMode: "backwards"
              }}>
                <strong style={{ fontWeight: 600, color: "#e0f2fe" }}>Genes:</strong> {res.genes.toLocaleString()}
              </div>
              <div className="animate-slide-left" style={{ 
                fontSize: 15, 
                color: "#cbd5e1", 
                lineHeight: 1.6,
                animationDelay: "0.3s",
                animationFillMode: "backwards"
              }}>
                <strong style={{ fontWeight: 600, color: "#e0f2fe" }}>Samples:</strong> {res.samples.toLocaleString()}
              </div>
              <div className="animate-slide-left" style={{ 
                fontSize: 15, 
                color: "#cbd5e1", 
                lineHeight: 1.6,
                animationDelay: "0.4s",
                animationFillMode: "backwards"
              }}>
                <strong style={{ fontWeight: 600, color: "#e0f2fe" }}>Mean Expression:</strong> {res.meanExpr?.toFixed(2) || "N/A"}
              </div>
              <div className="animate-slide-left" style={{ 
                fontSize: 13, 
                color: "#94a3b8", 
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid rgba(0, 240, 255, 0.2)",
                lineHeight: 1.5,
                animationDelay: "0.5s",
                animationFillMode: "backwards"
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
