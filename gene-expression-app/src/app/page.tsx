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
    <div className="min-h-screen relative z-10">
      {/* Navigation */}
      <nav className="border-b border-cyan-500/30 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold glow-text">GENEX</h1>
          <Link 
            href="/history" 
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm"
          >
            [ HISTORY ]
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold glow-text">
            GENE EXPRESSION ANALYZER
          </h1>
          <p className="text-cyan-300/80 font-mono text-lg">
            // Advanced Molecular Data Processing System
          </p>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        {/* Upload Section */}
        <div className="scifi-card rounded-lg p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-cyan-400 font-mono">
              [ UPLOAD SEQUENCE FILE ]
            </h2>
            <p className="text-slate-400 text-sm">
              Select a gene expression data file for analysis
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm text-cyan-300 font-mono">
                FILE SELECTION
              </label>
              <input 
                type="file" 
                name="file" 
                required 
                className="scifi-input w-full rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 file:cursor-pointer hover:file:bg-cyan-500/30 file:transition-colors"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="scifi-button w-full py-4 rounded-md font-mono text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "[ PROCESSING... ]" : "[ INITIATE ANALYSIS ]"}
            </button>
          </form>
        </div>

        {/* Status Message */}
        {msg && (
          <div className={`scifi-card rounded-lg p-4 border-l-4 ${
            msg.includes("✅") ? "border-green-500" : 
            msg.includes("⚠️") ? "border-yellow-500" : 
            "border-red-500"
          }`}>
            <p className="text-sm font-mono">{msg}</p>
          </div>
        )}

        {/* Results Display */}
        {res && (
          <div className="scifi-card rounded-lg p-8 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
              <h2 className="text-2xl font-bold text-cyan-400 font-mono">
                [ ANALYSIS RESULTS ]
              </h2>
              <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="data-point flex-col items-start">
                  <span className="data-label mb-2">FILE NAME</span>
                  <span className="data-value text-lg break-all">{res.fileName || "Unknown"}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="data-point flex-col items-start">
                  <span className="data-label mb-2">GENE COUNT</span>
                  <span className="data-value text-3xl">{res.genes.toLocaleString()}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="data-point flex-col items-start">
                  <span className="data-label mb-2">SAMPLE COUNT</span>
                  <span className="data-value text-3xl">{res.samples.toLocaleString()}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="data-point flex-col items-start">
                  <span className="data-label mb-2">MEAN EXPRESSION</span>
                  <span className="data-value text-3xl">{res.meanExpr?.toFixed(2) || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="scifi-card rounded-md p-4 bg-slate-900/50">
              <div className="space-y-3">
                <div className="data-point">
                  <span className="data-label">ANALYSIS ID</span>
                  <span className="data-value text-xs font-mono">{res.id}</span>
                </div>
                <div className="data-point">
                  <span className="data-label">TIMESTAMP</span>
                  <span className="data-value text-xs font-mono">
                    {new Date(res.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="data-point">
                  <span className="data-label">FILE HASH</span>
                  <span className="data-value text-xs font-mono break-all">
                    {res.fileHash.substring(0, 32)}...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm font-mono pt-8">
          <p>// System Ready | Status: OPERATIONAL</p>
        </div>
      </main>
    </div>
  )
}
