"use client"
import { useState } from "react"
import Papa from "papaparse"
import BioBackground from "../components/BioBackground"
import Link from "next/link"

export default function CSVParser() {
  const [info, setInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  function parseCSV(file: File) {
    setLoading(true)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rows = res.data as any[]
        const validRows = rows.filter(row => row && Object.keys(row).length > 0)
        if (validRows.length > 0) {
          setInfo({
            genes: validRows.length,
            samples: Object.keys(validRows[0] || {}).filter(key => key && key.trim() !== '').length - 1,
          })
        } else {
          setInfo({ genes: 0, samples: 0 })
        }
        setLoading(false)
      },
      error: (error) => {
        console.error("Error parsing CSV:", error)
        setLoading(false)
      }
    })
  }

  return (
    <main style={{
      position: "relative",
      zIndex: 10,
      minHeight: "100vh",
      padding: "40px",
      maxWidth: "900px",
      margin: "0 auto"
    }}>
      <BioBackground />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <Link href="/" style={{
          display: "inline-block",
          marginBottom: "30px",
          color: "#60a5fa",
          fontSize: "14px"
        }}>
          ← Back to Home
        </Link>

        <h1 className="text-glow" style={{
          fontSize: "36px",
          fontWeight: 700,
          marginBottom: "20px",
          color: "#e0f2fe"
        }}>
          CSV Parsing Demo
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <p className="info-text" style={{ marginBottom: "20px" }}>
            This page demonstrates real CSV parsing. Upload a CSV file to see how the data is read and interpreted.
            This is an educational demonstration - no backend storage is required.
          </p>

          <div style={{
            padding: "20px",
            backgroundColor: "rgba(139, 92, 246, 0.05)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "4px",
            marginBottom: "30px"
          }}>
            <p style={{
              fontSize: "13px",
              color: "#c4b5fd",
              lineHeight: "1.8"
            }}>
              The parser reads the CSV structure and extracts metadata about genes and samples
              without storing the data. This shows the parsing mechanism used in the Analyzer.
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="file"
              accept=".csv"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  parseCSV(e.target.files[0])
                }
              }}
              className="scifi-input"
            />
          </div>

          {loading && (
            <p className="info-text">Parsing CSV file...</p>
          )}

          {info && (
            <div className="scifi-card fade-in" style={{
              padding: "30px",
              marginTop: "30px"
            }}>
              <h2 style={{
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "20px",
                color: "#cbd5e1"
              }}>
                Parsing Results
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
                  <span className="info-text">Gene Count:</span>
                  <span style={{ color: "#00f0ff", fontWeight: 600 }}>
                    {info.genes.toLocaleString()}
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span className="info-text">Sample Count:</span>
                  <span style={{ color: "#00f0ff", fontWeight: 600 }}>
                    {info.samples.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
