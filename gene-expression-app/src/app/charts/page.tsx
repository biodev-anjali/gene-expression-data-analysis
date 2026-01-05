"use client"
import { useEffect, useState } from "react"
import ExpressionChart from "@/components/ExpressionChart"
import BioBackground from "../components/BioBackground"
import { useAnalysis } from "@/contexts/AnalysisContext"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  Legend,
} from "recharts"

export default function Charts() {
  const [selected, setSelected] = useState<any[]>([])
  const { latestAnalysis } = useAnalysis()

  // Use latest analysis from context for charts
  const runs = latestAnalysis ? [latestAnalysis] : []

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
          Charts
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <p className="info-text" style={{ 
            fontSize: "16px", 
            lineHeight: "1.8",
            marginBottom: "24px"
          }}>
            Visualize your gene expression analysis results. The charts below help you understand 
            expression patterns, fold changes, and distribution of values across your dataset.
          </p>

          <div style={{
            padding: "24px",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            border: "2px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px"
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
                Data Source Information
              </span>
            </div>
            <p style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#c4b5fd",
              marginBottom: "16px"
            }}>
              Charts are generated from previously analyzed CSV files
            </p>
            <div style={{
              padding: "16px",
              background: "rgba(15, 23, 42, 0.4)",
              borderRadius: "6px"
            }}>
              <p style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "12px"
              }}>
                Original File Format Requirements:
              </p>
              <ul className="info-text" style={{
                fontSize: "14px",
                paddingLeft: "24px",
                lineHeight: "2",
                color: "#cbd5e1"
              }}>
                <li><strong style={{ color: "#00f0ff" }}>File Type:</strong> CSV (Comma-Separated Values) only</li>
                <li><strong style={{ color: "#00f0ff" }}>First column:</strong> Gene names or identifiers</li>
                <li><strong style={{ color: "#00f0ff" }}>Remaining columns:</strong> Expression values per sample</li>
                <li><strong style={{ color: "#00f0ff" }}>Header row:</strong> Required with column names</li>
              </ul>
            </div>
            <p style={{
              fontSize: "13px",
              color: "#94a3b8",
              fontStyle: "italic",
              marginTop: "16px",
              marginBottom: 0
            }}>
              To add new datasets for comparison, upload CSV files through the Analyzer page first.
            </p>
          </div>
        </div>

        {runs.length === 0 && (
          <div className="scifi-card" style={{ padding: "40px", textAlign: "center" }}>
            <p className="info-text">No analysis data available. Upload a CSV file in the Analyzer page to generate charts.</p>
          </div>
        )}

        {runs.length > 0 && (
          <div className="scifi-card" style={{ padding: "30px", marginBottom: "30px" }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "24px",
              color: "#cbd5e1"
            }}>
              Analysis Dataset
            </h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {runs.map(r => (
                <label
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    background: selected.some(s => s.id === r.id)
                      ? "rgba(139, 92, 246, 0.15)"
                      : "rgba(15, 23, 42, 0.4)",
                    border: selected.some(s => s.id === r.id)
                      ? "2px solid rgba(139, 92, 246, 0.5)"
                      : "1px solid rgba(0, 240, 255, 0.2)"
                  }}
                  onMouseEnter={(e) => {
                    if (!selected.some(s => s.id === r.id)) {
                      e.currentTarget.style.background = "rgba(0, 240, 255, 0.08)"
                      e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.4)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected.some(s => s.id === r.id)) {
                      e.currentTarget.style.background = "rgba(15, 23, 42, 0.4)"
                      e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.2)"
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selected.some(s => s.id === r.id)}
                    onChange={e =>
                      setSelected(p =>
                        e.target.checked
                          ? [...p, r]
                          : p.filter(x => x.id !== r.id)
                      )
                    }
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      accentColor: "#8b5cf6"
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      color: "#e0f2fe", 
                      fontWeight: 600,
                      marginBottom: "4px",
                      fontSize: "15px"
                    }}>
                      {r.fileName || "Unknown"}
                    </div>
                    <div style={{ 
                      display: "flex", 
                      gap: "16px",
                      fontSize: "13px",
                      color: "#94a3b8"
                    }}>
                      <span>Genes: <span style={{ color: "#00f0ff" }}>{r.genes.toLocaleString()}</span></span>
                      <span>Samples: <span style={{ color: "#00f0ff" }}>{r.samples.toLocaleString()}</span></span>
                      <span>Mean: <span style={{ color: "#00f0ff" }}>{r.meanExpr?.toFixed(3) || "N/A"}</span></span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {selected.length > 0 && (
              <div style={{
                marginTop: "24px",
                padding: "16px",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#c4b5fd"
              }}>
                {selected.length} dataset{selected.length > 1 ? 's' : ''} selected for comparison
              </div>
            )}
          </div>
        )}

        {selected.length > 0 && (
          <div className="scifi-card fade-in" style={{ padding: "30px" }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "24px",
              color: "#cbd5e1"
            }}>
              Comparison Visualization
            </h2>

            <div style={{
              padding: "20px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "8px",
              marginBottom: "24px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "12px"
              }}>
                What This Chart Shows
              </h3>
              <p className="info-text" style={{
                fontSize: "15px",
                lineHeight: "1.8",
                marginBottom: "12px"
              }}>
                This bar chart displays the mean expression values across all genes for each 
                selected dataset. The height of each bar represents the average gene expression 
                level in that dataset, providing a quick visual comparison of overall expression 
                levels between different experiments or conditions.
              </p>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "12px",
                marginTop: "20px"
              }}>
                Biological Interpretation
              </h3>
              <p className="info-text" style={{
                fontSize: "15px",
                lineHeight: "1.8"
              }}>
                Higher bars indicate datasets with higher average gene expression, which may suggest 
                more active transcription or higher mRNA abundance in those samples. This comparison 
                helps identify which experimental conditions or time points show increased or 
                decreased overall gene activity. However, remember that this is a simple average - 
                individual genes may show different patterns that require more detailed analysis.
              </p>
            </div>

            <div style={{
              padding: "20px",
              background: "rgba(0, 240, 255, 0.03)",
              borderRadius: "8px",
              border: "1px solid rgba(0, 240, 255, 0.1)"
            }}>
              <ExpressionChart 
                data={selected.map(r => ({
                  fileName: r.fileName || "Unknown",
                  meanExpr: r.meanExpr || 0
                }))} 
              />
            </div>

            {/* Fold Change Analysis Chart */}
            {selected.some(r => r.foldChangeData || r.chartData?.foldChangeData?.length > 0) && (
              <div style={{
                marginTop: "30px",
                padding: "20px",
                background: "rgba(139, 92, 246, 0.05)",
                borderRadius: "8px",
                border: "1px solid rgba(139, 92, 246, 0.2)"
              }}>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#c4b5fd",
                  marginBottom: "16px"
                }}>
                  Fold Change Analysis
                </h3>
                <p className="info-text" style={{
                  fontSize: "14px",
                  marginBottom: "20px",
                  lineHeight: "1.6"
                }}>
                  Fold change values comparing Condition B vs Condition A. Points above y=x line 
                  indicate upregulated genes (fold change &gt; 1), points below indicate downregulated genes.
                </p>
                <div style={{ width: "100%", height: "400px", marginTop: "20px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.15)" />
                      <XAxis 
                        type="number" 
                        dataKey="conditionA" 
                        name="Condition A"
                        label={{ value: "Condition A Expression", position: "insideBottom", offset: -10, style: { fill: "#94a3b8" } }}
                        stroke="#60a5fa"
                        tick={{ fill: "#94a3b8" }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="conditionB" 
                        name="Condition B"
                        label={{ value: "Condition B Expression", angle: -90, position: "insideLeft", style: { fill: "#94a3b8" } }}
                        stroke="#60a5fa"
                        tick={{ fill: "#94a3b8" }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.98)",
                          border: "1px solid rgba(0, 240, 255, 0.4)",
                          borderRadius: "4px",
                          color: "#e0f2fe"
                        }}
                        cursor={{ strokeDasharray: "3 3" }}
                      />
                      <Scatter 
                        name="Genes" 
                        data={(() => {
                          const firstWithFoldChange = selected.find(r => r.foldChangeData || r.chartData?.foldChangeData?.length > 0)
                          if (!firstWithFoldChange) return []
                          try {
                            const foldData = firstWithFoldChange.chartData?.foldChangeData || 
                                            JSON.parse(firstWithFoldChange.foldChangeData || '[]')
                            return foldData.slice(0, 100).map((fc: any) => ({
                              conditionA: fc.conditionA,
                              conditionB: fc.conditionB,
                              foldChange: fc.foldChange,
                              gene: fc.gene,
                              classification: fc.classification
                            }))
                          } catch {
                            return []
                          }
                        })()}
                        fill="#00f0ff"
                      />
                      {/* Reference line y=x */}
                      <Line 
                        type="linear" 
                        dataKey="ref" 
                        stroke="#8b5cf6" 
                        strokeDasharray="5 5"
                        dot={false}
                        data={[{ conditionA: 0, conditionB: 0 }, { conditionA: 100, conditionB: 100 }]}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Expression Distribution Chart */}
            {selected.some(r => r.chartData?.distributionData?.length > 0) && (
              <div style={{
                marginTop: "30px",
                padding: "20px",
                background: "rgba(0, 240, 255, 0.05)",
                borderRadius: "8px",
                border: "1px solid rgba(0, 240, 255, 0.2)"
              }}>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#00f0ff",
                  marginBottom: "16px"
                }}>
                  Expression Distribution
                </h3>
                <p className="info-text" style={{
                  fontSize: "14px",
                  marginBottom: "20px",
                  lineHeight: "1.6"
                }}>
                  Histogram showing the distribution of expression values across all genes and samples.
                </p>
                <div style={{ width: "100%", height: "350px", marginTop: "20px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={(() => {
                      const firstWithDist = selected.find(r => r.chartData?.distributionData?.length > 0)
                      if (!firstWithDist) return []
                      return firstWithDist.chartData.distributionData.map((bin: any) => ({
                        range: bin.range,
                        count: bin.count,
                        midpoint: bin.midpoint
                      }))
                    })()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.15)" />
                      <XAxis 
                        dataKey="range" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        stroke="#60a5fa"
                        tick={{ fill: "#94a3b8", fontSize: "10px" }}
                        label={{ value: "Expression Range", position: "insideBottom", offset: -5, style: { fill: "#94a3b8" } }}
                      />
                      <YAxis 
                        stroke="#60a5fa"
                        tick={{ fill: "#94a3b8" }}
                        label={{ value: "Gene Count", angle: -90, position: "insideLeft", style: { fill: "#94a3b8" } }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.98)",
                          border: "1px solid rgba(0, 240, 255, 0.4)",
                          borderRadius: "4px",
                          color: "#e0f2fe"
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="url(#distributionGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="distributionGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  )
}
