"use client"
import { useState } from "react"
import BioBackground from "../components/BioBackground"
import { useAnalysis } from "@/contexts/AnalysisContext"

export default function Analyze() {
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [speciesName, setSpeciesName] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [showSpeciesSearch, setShowSpeciesSearch] = useState(true) // Default to open
  const { setLatestAnalysis } = useAnalysis()

  // Helper function to analyze a file with optional metadata
  async function analyzeFile(file: File, metadata?: { species?: string, datasetSource?: string, datasetId?: string }) {
    setLoading(true)
    setMsg("")
    setRes(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      if (metadata?.species) formData.append('species', metadata.species)
      if (metadata?.datasetSource) formData.append('datasetSource', metadata.datasetSource)
      if (metadata?.datasetId) formData.append('datasetId', metadata.datasetId)

      const r = await fetch("/api/analyze", { method: "POST", body: formData })
      const d = await r.json()

      if (d.error) {
        setMsg(`Error: ${d.error}`)
        return
      }

      // Store in context for Charts and History pages
      if (d.data) {
        setLatestAnalysis(d.data)
      }

      if (d.alreadyAnalyzed) {
        setMsg("✅ Dataset already analyzed. Showing previous results.")
        setRes(d.data)
      } else {
        setMsg("✅ Analysis completed successfully!")
        setRes(d.data)
      }
    } catch (error) {
      console.error("Analysis error:", error)
      setMsg("Error analyzing file. Please check the file format and try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleSpeciesSearch() {
    if (!speciesName.trim()) {
      setMsg("Error: Please enter a species name")
      return
    }

    setSearchLoading(true)
    setMsg("")
    setSearchResults([])

    try {
      const response = await fetch("/api/geo-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ speciesName: speciesName.trim(), maxResults: 20 })
      })

      const data = await response.json()

      if (data.error) {
        setMsg(`Error: ${data.error}`)
        return
      }

      if (data.datasets && data.datasets.length > 0) {
        setSearchResults(data.datasets)
        setMsg(`Found ${data.datasets.length} dataset(s) for "${speciesName}"`)
      } else {
        setSearchResults([])
        setMsg(data.message || `No datasets found for "${speciesName}". Try a different species name.`)
      }
    } catch (error) {
      console.error("Species search error:", error)
      setMsg("Error searching for datasets. Please try again.")
    } finally {
      setSearchLoading(false)
    }
  }

  async function handleDatasetDownload(dataset: any) {
    setLoading(true)
    setMsg("Downloading dataset...")
    setRes(null)

    try {
      // Download and convert GEO file using the dataset's download URL
      const downloadResponse = await fetch("/api/geo-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: dataset.downloadUrl })
      })

      const downloadData = await downloadResponse.json()

      if (downloadData.error) {
        setMsg(`Error: ${downloadData.error}`)
        setLoading(false)
        return
      }

      if (!downloadData.csvData) {
        setMsg("Error: Failed to convert GEO file to CSV format")
        setLoading(false)
        return
      }

      // Create a File object from the CSV data and trigger download
      const csvBlob = new Blob([downloadData.csvData], { type: 'text/csv' })
      const url = window.URL.createObjectURL(csvBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = downloadData.fileName || `${dataset.gseId}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      setMsg(`✅ Dataset ${dataset.gseId} downloaded successfully. You can now upload it using the form below.`)
      setLoading(false)
    } catch (error) {
      console.error("Dataset download error:", error)
      setMsg("Error downloading dataset. Please try again.")
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
            Upload your gene expression data file or search for datasets by species name. 
            After downloading a dataset, you can analyze it using the manual upload form below.
          </p>

          {/* Species Search Section - Primary Workflow */}
          <div style={{
            padding: "24px",
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            border: "2px solid rgba(139, 92, 246, 0.5)",
            borderRadius: "8px",
            marginBottom: "24px",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px"
            }}>
              <span style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#c4b5fd"
              }}>
                🔬 Species-Based Data Discovery
              </span>
              <span style={{
                fontSize: "12px",
                color: "#94a3b8",
                padding: "4px 8px",
                background: "rgba(139, 92, 246, 0.2)",
                borderRadius: "4px"
              }}>
                Download Only
              </span>
            </div>

            {/* Always show species search - it's the primary workflow */}
            {(
              <div style={{ marginTop: "20px" }}>
                <p className="info-text" style={{
                  fontSize: "14px",
                  lineHeight: "1.8",
                  marginBottom: "16px"
                }}>
                  Enter a species name (e.g., "Homo sapiens", "Mus musculus", "human", "mouse") 
                  to search NCBI GEO for available gene expression datasets. Select a dataset 
                  to download it as CSV. You can then upload and analyze it using the form below.
                </p>

                <div style={{ marginBottom: "16px" }}>
                  <input
                    type="text"
                    value={speciesName}
                    onChange={(e) => setSpeciesName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !searchLoading) {
                        handleSpeciesSearch()
                      }
                    }}
                    placeholder="Enter species name (e.g., Homo sapiens, human, mouse)"
                    className="scifi-input"
                    style={{
                      width: "100%",
                      marginBottom: "12px"
                    }}
                    disabled={searchLoading}
                  />
                  <button
                    type="button"
                    onClick={handleSpeciesSearch}
                    className="scifi-button"
                    disabled={searchLoading || !speciesName.trim()}
                    style={{
                      width: "100%"
                    }}
                  >
                    {searchLoading ? "Searching NCBI GEO..." : "Search GEO Datasets"}
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div style={{
                    marginTop: "20px",
                    maxHeight: "500px",
                    overflowY: "auto",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "8px",
                    padding: "16px"
                  }}>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#c4b5fd",
                      marginBottom: "16px"
                    }}>
                      Available Datasets ({searchResults.length})
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {searchResults.map((dataset, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: "16px",
                            background: "rgba(15, 23, 42, 0.6)",
                            border: "1px solid rgba(139, 92, 246, 0.2)",
                            borderRadius: "8px",
                            transition: "all 0.3s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)"
                            e.currentTarget.style.background = "rgba(15, 23, 42, 0.8)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.2)"
                            e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)"
                          }}
                        >
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            marginBottom: "12px",
                            gap: "16px"
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#e0f2fe",
                                marginBottom: "8px"
                              }}>
                                {dataset.gseId}
                              </div>
                              <div style={{
                                fontSize: "14px",
                                color: "#cbd5e1",
                                marginBottom: "8px",
                                lineHeight: "1.6"
                              }}>
                                {dataset.title}
                              </div>
                              <div style={{
                                display: "flex",
                                gap: "16px",
                                fontSize: "12px",
                                color: "#94a3b8",
                                flexWrap: "wrap"
                              }}>
                                <span>Samples: <span style={{ color: "#00f0ff" }}>{dataset.samples}</span></span>
                                <span>Platform: <span style={{ color: "#00f0ff" }}>{dataset.platform}</span></span>
                                {dataset.pubDate && (
                                  <span>Date: <span style={{ color: "#00f0ff" }}>{dataset.pubDate}</span></span>
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDatasetDownload(dataset)}
                              className="scifi-button"
                              disabled={loading}
                              style={{
                                padding: "8px 16px",
                                fontSize: "13px",
                                whiteSpace: "nowrap"
                              }}
                            >
                              {loading ? "Downloading..." : "Download CSV"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{
                  marginTop: "16px",
                  padding: "12px",
                  background: "rgba(15, 23, 42, 0.6)",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "#94a3b8"
                }}>
                  <p style={{ marginBottom: "8px", fontWeight: 600, color: "#c4b5fd" }}>
                    Examples:
                  </p>
                  <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                    <li>Scientific names: "Homo sapiens", "Mus musculus", "Drosophila melanogaster"</li>
                    <li>Common names: "human", "mouse", "fruit fly", "yeast"</li>
                    <li>Other: "Arabidopsis thaliana", "Escherichia coli"</li>
                  </ul>
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

          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const file = formData.get("file") as File
            if (file) {
              analyzeFile(file)
            }
          }} style={{ marginTop: "30px" }}>
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
