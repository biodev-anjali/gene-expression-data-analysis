"use client"
import { useState } from "react"
import BioBackground from "../components/BioBackground"

/**
 * GEO Dataset Downloader Page
 * 
 * PURPOSE: This page is ONLY responsible for discovering and downloading datasets
 * from NCBI GEO. No analysis happens here - users download CSV files and then
 * analyze them separately using the Analyzer page.
 * 
 * SEPARATION OF CONCERNS:
 * - Download logic is isolated from analysis logic
 * - This ensures reliable CSV downloads without mixing concerns
 * - Users can download datasets and analyze them at their convenience
 */
export default function GEODownloader() {
  const [speciesName, setSpeciesName] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null)
  const [msg, setMsg] = useState("")

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
        setMsg(`✅ Found ${data.datasets.length} dataset(s) for "${speciesName}"`)
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

  /**
   * Download dataset as CSV
   * This function handles server-side download and conversion to CSV format.
   * The downloaded file is ready for analysis in the Analyzer page.
   */
  async function handleDatasetDownload(dataset: any) {
    setDownloadLoading(dataset.gseId)
    setMsg(`Downloading ${dataset.gseId}...`)

    try {
      // Download and convert GEO file using the dataset's download URL
      // This is handled server-side to ensure reliable CSV conversion
      const downloadResponse = await fetch("/api/geo-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: dataset.downloadUrl })
      })

      const downloadData = await downloadResponse.json()

      if (downloadData.error) {
        setMsg(`Error: ${downloadData.error}`)
        setDownloadLoading(null)
        return
      }

      if (!downloadData.csvData) {
        setMsg("Error: Failed to convert GEO file to CSV format")
        setDownloadLoading(null)
        return
      }

      // Create a File object from the CSV data and trigger browser download
      // This ensures the file is saved to user's computer
      const csvBlob = new Blob([downloadData.csvData], { type: 'text/csv' })
      const url = window.URL.createObjectURL(csvBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = downloadData.fileName || `${dataset.gseId}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      setMsg(`✅ Dataset ${dataset.gseId} downloaded successfully as CSV. You can now upload it in the Analyzer page for analysis.`)
    } catch (error) {
      console.error("Dataset download error:", error)
      setMsg("Error downloading dataset. Please try again.")
    } finally {
      setDownloadLoading(null)
    }
  }

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
          GEO Dataset Downloader
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
            Search NCBI GEO for gene expression datasets by species name. Download datasets 
            as CSV files for analysis in the Analyzer page. This page handles only dataset 
            discovery and download - analysis is performed separately.
          </p>

          {/* Species Search Section */}
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
                🔬 Search NCBI GEO Datasets
              </span>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p className="info-text" style={{
                fontSize: "14px",
                lineHeight: "1.8",
                marginBottom: "16px"
              }}>
                Enter a species name (e.g., "Homo sapiens", "Mus musculus", "human", "mouse") 
                to search NCBI GEO for available gene expression datasets. Select a dataset 
                to download it as a CSV file.
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
                  maxHeight: "600px",
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
                  
                  {/* Dataset Table */}
                  <div style={{
                    overflowX: "auto"
                  }}>
                    <table style={{
                      width: "100%",
                      borderCollapse: "collapse"
                    }}>
                      <thead>
                        <tr style={{
                          background: "rgba(139, 92, 246, 0.2)",
                          borderBottom: "2px solid rgba(139, 92, 246, 0.4)"
                        }}>
                          <th style={{
                            padding: "12px",
                            textAlign: "left",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#c4b5fd"
                          }}>Dataset ID</th>
                          <th style={{
                            padding: "12px",
                            textAlign: "left",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#c4b5fd"
                          }}>Title</th>
                          <th style={{
                            padding: "12px",
                            textAlign: "center",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#c4b5fd"
                          }}>Samples</th>
                          <th style={{
                            padding: "12px",
                            textAlign: "center",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#c4b5fd"
                          }}>Platform</th>
                          <th style={{
                            padding: "12px",
                            textAlign: "center",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#c4b5fd"
                          }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((dataset, idx) => (
                          <tr
                            key={idx}
                            style={{
                              borderBottom: "1px solid rgba(139, 92, 246, 0.1)",
                              transition: "all 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent"
                            }}
                          >
                            <td style={{
                              padding: "12px",
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#e0f2fe"
                            }}>{dataset.gseId}</td>
                            <td style={{
                              padding: "12px",
                              fontSize: "14px",
                              color: "#cbd5e1",
                              maxWidth: "400px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap"
                            }} title={dataset.title}>{dataset.title}</td>
                            <td style={{
                              padding: "12px",
                              textAlign: "center",
                              fontSize: "14px",
                              color: "#00f0ff"
                            }}>{dataset.samples}</td>
                            <td style={{
                              padding: "12px",
                              textAlign: "center",
                              fontSize: "13px",
                              color: "#94a3b8"
                            }}>{dataset.platform}</td>
                            <td style={{
                              padding: "12px",
                              textAlign: "center"
                            }}>
                              <button
                                type="button"
                                onClick={() => handleDatasetDownload(dataset)}
                                className="scifi-button"
                                disabled={downloadLoading === dataset.gseId || !!downloadLoading}
                                style={{
                                  padding: "8px 16px",
                                  fontSize: "13px",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                {downloadLoading === dataset.gseId ? "Downloading..." : "Download CSV"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
          </div>

          {/* Information Section */}
          <div style={{
            padding: "20px",
            background: "rgba(0, 240, 255, 0.05)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            borderRadius: "8px",
            marginTop: "24px"
          }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#00f0ff",
              marginBottom: "12px"
            }}>
              How to Use This Page
            </h3>
            <ol className="info-text" style={{
              paddingLeft: "24px",
              lineHeight: "2",
              fontSize: "14px"
            }}>
              <li>Enter a species name and click "Search GEO Datasets"</li>
              <li>Browse the available datasets in the table</li>
              <li>Click "Download CSV" to download a dataset as a CSV file</li>
              <li>Go to the <strong style={{ color: "#00f0ff" }}>Analyzer</strong> page to upload and analyze your downloaded CSV file</li>
            </ol>
          </div>
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
      </div>
    </main>
  )
}

