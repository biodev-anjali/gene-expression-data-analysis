"use client"
import { createContext, useContext, useState, ReactNode } from "react"

/**
 * Analysis Context for sharing analysis results across components
 * 
 * This context stores the latest analysis result so that:
 * - Charts page can immediately display results without reload
 * - History page can show newly completed analyses
 * - Analysis state persists across navigation
 */
interface AnalysisResult {
  id: string
  fileName?: string | null
  fileHash: string
  genes: number
  samples: number
  meanExpr?: number | null
  upregulatedGenes?: number | null
  downregulatedGenes?: number | null
  foldChangeData?: string | null
  species?: string | null
  datasetSource?: string | null
  datasetId?: string | null
  chartData?: {
    foldChangeData: any[]
    distributionData: any[]
    expressionValues: number[]
  }
  createdAt: Date | string
  savedToDatabase?: boolean
}

interface AnalysisContextType {
  latestAnalysis: AnalysisResult | null
  setLatestAnalysis: (analysis: AnalysisResult | null) => void
  clearAnalysis: () => void
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisResult | null>(null)

  const clearAnalysis = () => {
    setLatestAnalysis(null)
  }

  return (
    <AnalysisContext.Provider value={{ latestAnalysis, setLatestAnalysis, clearAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider")
  }
  return context
}

