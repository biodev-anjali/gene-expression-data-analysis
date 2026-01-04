/**
 * GEO File Parser Utility
 * Parses NCBI GEO Series Matrix File format and converts to CSV
 */

export interface ParsedGEOData {
  csvData: string
  metadata: {
    seriesTitle?: string
    platformTitle?: string
    sampleCount: number
    geneCount: number
  }
}

/**
 * Parse Series Matrix File format from NCBI GEO
 * @param fileContent - Raw file content as string
 * @returns Parsed data in CSV format with metadata
 */
export function parseSeriesMatrixFile(fileContent: string): ParsedGEOData {
  const lines = fileContent.split('\n')
  const metadata: Record<string, string> = {}
  let dataStartIndex = -1
  let headers: string[] = []
  
  // Find where data section starts and collect metadata
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines
    if (!line) continue
    
    // Collect metadata (lines starting with ! or ^)
    if (line.startsWith('!') || line.startsWith('^')) {
      const match = line.match(/^[!^]([^=]+)\s*=\s*(.+)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim()
        metadata[key] = value
      }
      continue
    }
    
    // Find first non-metadata line (this should be the header)
    if (dataStartIndex === -1 && line && !line.startsWith('!') && !line.startsWith('^')) {
      dataStartIndex = i
      // Parse header line (tab-delimited)
      headers = line.split('\t').map(h => h.trim()).filter(h => h)
      break
    }
  }
  
  if (dataStartIndex === -1 || headers.length === 0) {
    throw new Error('Could not find data section in GEO file. Invalid file format.')
  }
  
  // Extract data rows
  const dataRows: string[][] = []
  for (let i = dataStartIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    const values = line.split('\t').map(v => v.trim())
    if (values.length === headers.length && values[0]) {
      // Only include rows with gene identifier in first column
      dataRows.push(values)
    }
  }
  
  if (dataRows.length === 0) {
    throw new Error('No valid data rows found in GEO file.')
  }
  
  // Convert to CSV format
  // First column is gene identifier, rest are expression values
  const csvLines: string[] = []
  
  // CSV header: Gene, Sample1, Sample2, ...
  const csvHeaders = ['Gene', ...headers.slice(1)]
  csvLines.push(csvHeaders.join(','))
  
  // CSV data rows
  dataRows.forEach(row => {
    // Escape values that contain commas or quotes
    const escapedRow = row.map(val => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val
    })
    csvLines.push(escapedRow.join(','))
  })
  
  const csvData = csvLines.join('\n')
  
  return {
    csvData,
    metadata: {
      seriesTitle: metadata['Series_title'] || metadata['Series_title'],
      platformTitle: metadata['Platform_title'] || metadata['Platform_title'],
      sampleCount: headers.length - 1, // Exclude gene identifier column
      geneCount: dataRows.length
    }
  }
}

/**
 * Validate GEO file format
 * @param fileContent - Raw file content as string
 * @returns true if file appears to be a valid GEO Series Matrix File
 */
export function validateGEOFile(fileContent: string): boolean {
  if (!fileContent || fileContent.trim().length === 0) {
    return false
  }
  
  // Check for common GEO markers
  const hasMetadata = fileContent.includes('!Series') || fileContent.includes('!Sample') || fileContent.includes('!Platform')
  const hasTabDelimited = fileContent.includes('\t')
  
  return hasMetadata && hasTabDelimited
}

/**
 * Download file from URL
 * @param url - URL to download from
 * @returns File content as string
 */
export async function downloadGEOFile(url: string): Promise<string> {
  // Validate URL is from NCBI GEO
  if (!url.includes('ncbi.nlm.nih.gov/geo') && !url.includes('ftp.ncbi.nlm.nih.gov/geo')) {
    throw new Error('URL must be from NCBI GEO (ncbi.nlm.nih.gov/geo)')
  }
  
  try {
    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GeneExpressionAnalyzer/1.0)'
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status} ${response.statusText}`)
    }
    
    const content = await response.text()
    
    if (!content || content.trim().length === 0) {
      throw new Error('Downloaded file is empty')
    }
    
    return content
  } catch (error: any) {
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      throw new Error('Download timeout. The file may be too large or the server is slow.')
    }
    if (error.message) {
      throw error
    }
    throw new Error(`Network error: ${error.message || 'Unknown error'}`)
  }
}

