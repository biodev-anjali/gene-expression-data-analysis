"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import ExpressionChart from "@/components/ExpressionChart"

export default function History() {
  const [runs, setRuns] = useState<any[]>([])
  const [selected, setSelected] = useState<string[]>([])
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

  function toggle(id: string) {
    setSelected(p =>
      p.includes(id) ? p.filter(x => x !== id) : [...p, id]
    )
  }

  const compare = runs.filter(r => selected.includes(r.id))

  return (
    <div className="min-h-screen relative z-10">
      {/* Navigation */}
      <nav className="border-b border-cyan-500/30 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link 
            href="/" 
            className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            GENEX
          </Link>
          <Link 
            href="/" 
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm"
          >
            [ ANALYZER ]
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-cyan-400">
            ANALYSIS HISTORY
          </h1>
          <p className="text-cyan-300/80 font-mono text-lg">
            // Historical Data Repository | {runs.length} Records Found
          </p>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="scifi-card rounded-lg p-12 text-center">
            <div className="inline-block animate-spin text-cyan-500 text-4xl mb-4">⟳</div>
            <p className="font-mono text-cyan-400">[ LOADING DATA ]</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && runs.length === 0 && (
          <div className="scifi-card rounded-lg p-12 text-center">
            <p className="text-2xl text-slate-400 font-mono mb-4">[ NO RECORDS FOUND ]</p>
            <Link 
              href="/" 
              className="scifi-button inline-block px-6 py-3 rounded-md"
            >
              [ START ANALYSIS ]
            </Link>
          </div>
        )}

        {/* History List */}
        {!loading && runs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-cyan-400 font-mono">
                [ ANALYSIS RECORDS ]
              </h2>
              {selected.length > 0 && (
                <span className="text-cyan-300 font-mono text-sm">
                  {selected.length} SELECTED
                </span>
              )}
            </div>

            <div className="grid gap-4">
              {runs.map((r, index) => (
                <div 
                  key={r.id} 
                  className={`scifi-card rounded-lg p-6 transition-all cursor-pointer ${
                    selected.includes(r.id) ? 'border-cyan-500 bg-cyan-500/10' : ''
                  }`}
                  onClick={() => toggle(r.id)}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className={`relative w-6 h-6 border-2 rounded transition-all ${
                        selected.includes(r.id) 
                          ? 'border-cyan-500 bg-cyan-500/20' 
                          : 'border-cyan-500/50'
                      }`}>
                        {selected.includes(r.id) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <span className="text-cyan-500/50 font-mono text-xs">
                        #{String(index + 1).padStart(3, '0')}
                      </span>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <span className="data-label block mb-1">FILE NAME</span>
                        <span className="data-value block truncate">{r.fileName || "Unknown"}</span>
                      </div>
                      <div>
                        <span className="data-label block mb-1">GENES</span>
                        <span className="data-value">{r.genes.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="data-label block mb-1">SAMPLES</span>
                        <span className="data-value">{r.samples.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="data-label block mb-1">MEAN EXPR</span>
                        <span className="data-value">{r.meanExpr?.toFixed(2) || "N/A"}</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="data-label block mb-1 text-xs">TIMESTAMP</span>
                      <span className="data-value text-xs font-mono">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison View with Chart */}
        {compare.length > 0 && (
          <div className="space-y-6 mt-12">
            <div className="flex items-center justify-between border-t border-cyan-500/30 pt-8">
              <h2 className="text-2xl font-bold text-cyan-400 font-mono">
                [ COMPARISON MODE ]
              </h2>
              <button
                onClick={() => setSelected([])}
                className="scifi-button px-4 py-2 rounded-md text-sm"
              >
                [ CLEAR SELECTION ]
              </button>
            </div>

            <div className="scifi-card rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 font-mono mb-4">
                Mean Expression Comparison
              </h3>
              <ExpressionChart data={compare.map(r => ({
                fileName: r.fileName || "Unknown",
                meanExpr: r.meanExpr || 0
              }))} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {compare.map(r => (
                <div key={r.id} className="stat-card">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400 font-mono mb-2 truncate">
                        {r.fileName || "Unknown"}
                      </h3>
                      <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                    </div>

                    <div className="space-y-3">
                      <div className="data-point">
                        <span className="data-label">GENES</span>
                        <span className="data-value">{r.genes.toLocaleString()}</span>
                      </div>
                      <div className="data-point">
                        <span className="data-label">SAMPLES</span>
                        <span className="data-value">{r.samples.toLocaleString()}</span>
                      </div>
                      <div className="data-point">
                        <span className="data-label">MEAN EXPR</span>
                        <span className="data-value">{r.meanExpr?.toFixed(2) || "N/A"}</span>
                      </div>
                      <div className="data-point">
                        <span className="data-label">DATE</span>
                        <span className="data-value text-xs font-mono">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm font-mono pt-8">
          <p>// Repository Status: ACTIVE | Total Records: {runs.length}</p>
        </div>
      </main>
    </div>
  )
}
