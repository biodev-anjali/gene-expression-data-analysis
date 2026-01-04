"use client"
import { useState } from "react"
import BioBackground from "../components/BioBackground"

export default function Analyze() {
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [geoUrl, setGeoUrl] = useState("")
  const [geoLoading, setGeoLoading] = useState(false)
  const [showGeoDownload, setShowGeoDownload] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMsg("")
    setRes(null) // Clear previous results
    const formData = new FormData(e.target as HTMLFormElement)
    
    try {
      const r = await fetch("/api/analyze", { method: "POST", body: formData })
      const d = await r.json()
      
      // Check for API errors first
      if (d.error) {
        setMsg(`Error: ${d.error}`)
        return
      }
      
      if (d.alreadyAnalyzed) {
        setMsg("Already analyzed sample")
        setRes(d.data)
      } else {
        setMsg("Analysis completed")
        setRes(d.data)
      }
    } catch (error) {
      console.error("Analysis error:", error)
      setMsg("Error analyzing file. Please check the file format and try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleGeoDownload() {
    if (!geoUrl.trim()) {
      setMsg("Error: Please enter a valid NCBI GEO URL")
      return
    }

    setGeoLoading(true)
    setMsg("")
    setRes(null)

    try {
      // Download and convert GEO file
      const downloadResponse = await fetch("/api/geo-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: geoUrl.trim() })
      })

      const downloadData = await downloadResponse.json()

      if (downloadData.error) {
        setMsg(`Error: ${downloadData.error}`)
        return
      }

      if (!downloadData.csvData) {
        setMsg("Error: Failed to convert GEO file to CSV format")
        return
      }

      // Create a File object from the CSV data
      const csvBlob = new Blob([downloadData.csvData], { type: 'text/csv' })
      const csvFile = new File([csvBlob], downloadData.fileName || 'geo_dataset.csv', { type: 'text/csv' })

      // Create FormData and submit to analyzer
      const formData = new FormData()
      formData.append('file', csvFile)

      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      })

      const analyzeData = await analyzeResponse.json()

      if (analyzeData.error) {
        setMsg(`Error: ${analyzeData.error}`)
        return
      }

      if (analyzeData.alreadyAnalyzed) {
        setMsg("Dataset already analyzed (from GEO download)")
        setRes(analyzeData.data)
      } else {
        setMsg(`Analysis completed for GEO dataset: ${downloadData.metadata.seriesTitle || 'Unknown'}`)
        setRes(analyzeData.data)
      }
    } catch (error) {
      console.error("GEO download error:", error)
      setMsg("Error downloading or analyzing GEO file. Please check the URL and try again.")
    } finally {
      setGeoLoading(false)
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
            Upload your gene expression data file or download directly from NCBI GEO to perform 
            automated analysis and compute comprehensive summary statistics including gene count, 
            sample count, and mean expression values.
          </p>

          {/* NCBI GEO Download Section */}
          <div style={{
            padding: "24px",
            backgroundColor: "rgba(0, 240, 255, 0.1)",
            border: "2px solid rgba(0, 240, 255, 0.3)",
            borderRadius: "8px",
            marginBottom: "24px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
              cursor: "pointer"
            }}
            onClick={() => setShowGeoDownload(!showGeoDownload)}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#00f0ff"
                }}>
                  Download from NCBI GEO
                </span>
                <span style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  padding: "4px 8px",
                  background: "rgba(0, 240, 255, 0.1)",
                  borderRadius: "4px"
                }}>
                  New
                </span>
              </div>
              <span style={{
                fontSize: "20px",
                color: "#00f0ff",
                transform: showGeoDownload ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease"
              }}>
                ▼
              </span>
            </div>

            {showGeoDownload && (
              <div style={{ marginTop: "20px" }}>
                <p className="info-text" style={{
                  fontSize: "14px",
                  lineHeight: "1.8",
                  marginBottom: "16px"
                }}>
                  Paste a direct download URL from NCBI GEO (Series Matrix File format). 
                  The system will automatically download, convert, and analyze the dataset.
                </p>

                <div style={{ marginBottom: "16px" }}>
                  <input
                    type="text"
                    value={geoUrl}
                    onChange={(e) => setGeoUrl(e.target.value)}
                    placeholder="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE12345&targ=gsm&form=text&view=full"
                    className="scifi-input"
                    style={{
                      width: "100%",
                      marginBottom: "12px"
                    }}
                    disabled={geoLoading}
                  />
                  <p style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    marginBottom: "12px"
                  }}>
                    Example: Series Matrix File URL from NCBI GEO dataset page
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGeoDownload}
                  className="scifi-button"
                  disabled={geoLoading || !geoUrl.trim()}
                  style={{
                    width: "100%"
                  }}
                >
                  {geoLoading ? "Downloading & Processing..." : "Download & Analyze from GEO"}
                </button>

                <div style={{
                  marginTop: "16px",
                  padding: "12px",
                  background: "rgba(15, 23, 42, 0.6)",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "#94a3b8"
                }}>
                  <p style={{ marginBottom: "8px", fontWeight: 600, color: "#00f0ff" }}>
                    How to get GEO download URL:
                  </p>
                  <ol style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                    <li>Visit <a href="https://www.ncbi.nlm.nih.gov/geo/" target="_blank" rel="noopener noreferrer" style={{ color: "#60a5fa" }}>NCBI GEO</a></li>
                    <li>Search for a dataset (e.g., GSE12345)</li>
                    <li>Click on the dataset page</li>
                    <li>Find "Series Matrix File(s)" section</li>
                    <li>Right-click "Download" and copy the link address</li>
                    <li>Paste the URL above</li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            marginTop: "24px"
          }}>
            <div style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 50%, transparent 100%)"
            }}></div>
            <span style={{
              fontSize: "12px",
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}>
              Or Upload CSV File
            </span>
            <div style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 50%, transparent 100%)"
            }}></div>
          </div>

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
          <>
            <div className="scifi-card fade-in" style={{ padding: "30px", marginBottom: "20px" }}>
              <h2 style={{
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "20px",
                color: "#cbd5e1"
              }}>
                Basic Statistics
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

            {res.samples >= 2 && res.foldChangeData && (
              <div className="scifi-card fade-in" style={{ padding: "30px", marginBottom: "20px" }}>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  marginBottom: "20px",
                  color: "#cbd5e1"
                }}>
                  Fold Change Analysis
                </h2>
                <p className="info-text" style={{ 
                  marginBottom: "20px",
                  fontSize: "15px",
                  lineHeight: "1.8"
                }}>
                  Fold change compares expression levels between two conditions (Condition B / Condition A). 
                  Genes with fold change &gt; 1 are upregulated (higher in Condition B), while genes with 
                  fold change &lt; 1 are downregulated (lower in Condition B).
                </p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                  marginBottom: "24px"
                }}>
                  <div style={{
                    padding: "16px",
                    background: "rgba(34, 197, 94, 0.1)",
                    border: "2px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      fontSize: "14px",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}>
                      Upregulated Genes
                    </div>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#86efac"
                    }}>
                      {res.upregulatedGenes?.toLocaleString() || 0}
                    </div>
                    <div style={{
                      fontSize: "12px",
                      color: "#86efac",
                      marginTop: "4px"
                    }}>
                      Fold Change &gt; 1
                    </div>
                  </div>

                  <div style={{
                    padding: "16px",
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "2px solid rgba(239, 68, 68, 0.4)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      fontSize: "14px",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}>
                      Downregulated Genes
                    </div>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#fca5a5"
                    }}>
                      {res.downregulatedGenes?.toLocaleString() || 0}
                    </div>
                    <div style={{
                      fontSize: "12px",
                      color: "#fca5a5",
                      marginTop: "4px"
                    }}>
                      Fold Change &lt; 1
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: "16px",
                  background: "rgba(0, 240, 255, 0.05)",
                  border: "1px solid rgba(0, 240, 255, 0.2)",
                  borderRadius: "8px",
                  marginBottom: "20px"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#00f0ff",
                    marginBottom: "12px"
                  }}>
                    Legend
                  </h3>
                  <div style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "20px",
                        height: "20px",
                        background: "#86efac",
                        borderRadius: "4px"
                      }}></div>
                      <span style={{ fontSize: "14px", color: "#cbd5e1" }}>
                        Upregulated (FC &gt; 1)
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "20px",
                        height: "20px",
                        background: "#fca5a5",
                        borderRadius: "4px"
                      }}></div>
                      <span style={{ fontSize: "14px", color: "#cbd5e1" }}>
                        Downregulated (FC &lt; 1)
                      </span>
                    </div>
                  </div>
                </div>

                {(() => {
                  try {
                    const foldChanges = JSON.parse(res.foldChangeData || '[]')
                    if (foldChanges.length > 0) {
                      return (
                        <div>
                          <h3 style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#cbd5e1",
                            marginBottom: "16px"
                          }}>
                            Sample Gene Results (First 20 genes)
                          </h3>
                          <div style={{
                            maxHeight: "400px",
                            overflowY: "auto",
                            border: "1px solid rgba(0, 240, 255, 0.2)",
                            borderRadius: "8px"
                          }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                              <thead>
                                <tr style={{
                                  background: "rgba(0, 240, 255, 0.1)",
                                  borderBottom: "2px solid rgba(0, 240, 255, 0.3)"
                                }}>
                                  <th style={{
                                    padding: "12px",
                                    textAlign: "left",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#00f0ff"
                                  }}>Gene</th>
                                  <th style={{
                                    padding: "12px",
                                    textAlign: "right",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#00f0ff"
                                  }}>Condition A</th>
                                  <th style={{
                                    padding: "12px",
                                    textAlign: "right",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#00f0ff"
                                  }}>Condition B</th>
                                  <th style={{
                                    padding: "12px",
                                    textAlign: "right",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#00f0ff"
                                  }}>Fold Change</th>
                                  <th style={{
                                    padding: "12px",
                                    textAlign: "center",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#00f0ff"
                                  }}>Classification</th>
                                </tr>
                              </thead>
                              <tbody>
                                {foldChanges.slice(0, 20).map((fc: any, idx: number) => (
                                  <tr key={idx} style={{
                                    borderBottom: "1px solid rgba(0, 240, 255, 0.1)",
                                    background: fc.classification === 'upregulated' 
                                      ? "rgba(34, 197, 94, 0.05)"
                                      : fc.classification === 'downregulated'
                                      ? "rgba(239, 68, 68, 0.05)"
                                      : "transparent"
                                  }}>
                                    <td style={{
                                      padding: "10px 12px",
                                      fontSize: "13px",
                                      color: "#cbd5e1"
                                    }}>{fc.gene}</td>
                                    <td style={{
                                      padding: "10px 12px",
                                      fontSize: "13px",
                                      color: "#cbd5e1",
                                      textAlign: "right"
                                    }}>{fc.conditionA.toFixed(2)}</td>
                                    <td style={{
                                      padding: "10px 12px",
                                      fontSize: "13px",
                                      color: "#cbd5e1",
                                      textAlign: "right"
                                    }}>{fc.conditionB.toFixed(2)}</td>
                                    <td style={{
                                      padding: "10px 12px",
                                      fontSize: "13px",
                                      color: "#00f0ff",
                                      fontWeight: 600,
                                      textAlign: "right"
                                    }}>{fc.foldChange}</td>
                                    <td style={{
                                      padding: "10px 12px",
                                      fontSize: "13px",
                                      textAlign: "center"
                                    }}>
                                      <span style={{
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        background: fc.classification === 'upregulated'
                                          ? "rgba(34, 197, 94, 0.2)"
                                          : fc.classification === 'downregulated'
                                          ? "rgba(239, 68, 68, 0.2)"
                                          : "rgba(148, 163, 184, 0.2)",
                                        color: fc.classification === 'upregulated'
                                          ? "#86efac"
                                          : fc.classification === 'downregulated'
                                          ? "#fca5a5"
                                          : "#94a3b8"
                                      }}>
                                        {fc.classification === 'upregulated' ? '↑ Up' : 
                                         fc.classification === 'downregulated' ? '↓ Down' : 'No Change'}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )
                    }
                  } catch (e) {
                    return null
                  }
                })()}
              </div>
            )}

            {res.samples < 2 && (
              <div className="scifi-card fade-in" style={{ 
                padding: "20px",
                background: "rgba(148, 163, 184, 0.1)",
                border: "1px solid rgba(148, 163, 184, 0.3)"
              }}>
                <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                  <strong>Note:</strong> Fold change analysis requires at least 2 samples. 
                  This dataset has {res.samples} sample(s). Upload a file with multiple samples 
                  to perform comparative analysis.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
