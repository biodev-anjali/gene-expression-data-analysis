"use client"
import { useState } from "react"
import Papa from "papaparse"

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
    <main className="p-8 space-y-4">
      <h1 className="text-xl font-bold">CSV Parsing Demo</h1>

      <input
        type="file"
        accept=".csv"
        onChange={e => {
          if (e.target.files && e.target.files[0]) {
            parseCSV(e.target.files[0])
          }
        }}
      />

      {loading && <p>Parsing CSV...</p>}

      {info && (
        <div className="border p-3">
          <p>Genes: {info.genes}</p>
          <p>Samples: {info.samples}</p>
        </div>
      )}
    </main>
  )
}

