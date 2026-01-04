/**
 * GEO File Parser Utility
 * Parses NCBI GEO Series Matrix File format and converts to CSV
 */

import zlib from 'zlib'
import { promisify } from 'util'

const gunzip = promisify(zlib.gunzip)

export interface ParsedGEOData {
  csvData: string
  metadata: {
    seriesTitle?: string
    platformTitle?: string
    sampleCount: number
    geneCount: number
  }
}

export interface GEODataset {
  gseId: string          // e.g., "GSE12345"
  title: string          // Dataset title
  samples: number        // Number of samples
  platform: string       // Platform type
  organism: string       // Species name
  downloadUrl: string    // Direct URL to Series Matrix File
  summary?: string        // Dataset summary
  pubDate?: string        // Publication date
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
  
  // Check for common GEO metadata markers (more lenient)
  const hasMetadata = fileContent.includes('!Series') || 
                     fileContent.includes('!Sample') || 
                     fileContent.includes('!Platform') ||
                     fileContent.includes('^') ||
                     fileContent.includes('ID_REF') ||
                     fileContent.includes('GSM') ||
                     fileContent.includes('GSE')
  
  // Check for tab-delimited or comma-delimited data
  const hasDelimited = fileContent.includes('\t') || fileContent.includes(',')
  
  // Check for data rows with numeric values (verify it's actual data, not just metadata)
  const lines = fileContent.split('\n').slice(0, 100) // Check first 100 lines
  let hasDataRows = false
  
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('!') || line.trim().startsWith('^')) {
      continue // Skip metadata lines
    }
    
    // Try to parse as tab-delimited or comma-delimited
    const values = line.split(/\t|,/).map(v => v.trim()).filter(v => v)
    if (values.length >= 2) {
      // Check if at least one value (after first column) is numeric
      const hasNumeric = values.slice(1).some(v => {
        const num = Number(v)
        return !isNaN(num) && isFinite(num) && v.trim() !== ''
      })
      if (hasNumeric) {
        hasDataRows = true
        break
      }
    }
  }
  
  return hasMetadata && hasDelimited && hasDataRows
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
    
    // Check if file is gzipped
    const contentType = response.headers.get('content-type') || ''
    const contentEncoding = response.headers.get('content-encoding') || ''
    const isGzipped = url.endsWith('.gz') || 
                     contentType.includes('gzip') || 
                     contentType.includes('application/x-gzip') ||
                     contentEncoding.includes('gzip')
    
    if (isGzipped) {
      // Download as ArrayBuffer for gzip decompression
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      // Check for gzip magic bytes (0x1f 0x8b) as additional verification
      const isGzipMagic = buffer.length >= 2 && buffer[0] === 0x1f && buffer[1] === 0x8b
      
      if (isGzipMagic || isGzipped) {
        try {
          // Decompress gzip file
          const decompressed = await gunzip(buffer)
          const content = decompressed.toString('utf-8')
          
          if (!content || content.trim().length === 0) {
            throw new Error('Downloaded file is empty after decompression')
          }
          
          return content
        } catch (decompressError: any) {
          if (decompressError.code === 'Z_DATA_ERROR' || decompressError.code === 'Z_BUF_ERROR') {
            throw new Error('File appears to be corrupted or not a valid gzip file')
          }
          throw new Error(`Failed to decompress gzip file: ${decompressError.message}`)
        }
      }
    }
    
    // Not gzipped or decompression not needed - read as text
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

/**
 * Search NCBI GEO for datasets by species name
 * @param speciesName - Species name (e.g., "Homo sapiens", "Mus musculus")
 * @param maxResults - Maximum number of results to return (default: 20)
 * @returns Array of GEO dataset information
 */
export async function searchGEOBySpecies(speciesName: string, maxResults: number = 20): Promise<GEODataset[]> {
  if (!speciesName || speciesName.trim().length === 0) {
    throw new Error('Species name is required')
  }

  try {
    // Normalize species name - handle common variations
    const normalizedSpecies = normalizeSpeciesName(speciesName.trim())
    
    // Build search query for NCBI E-utilities
    // Search for expression profiling datasets for the species
    const query = `"${normalizedSpecies}"[Organism] AND ("Expression profiling by array"[DataSet Type] OR "Expression profiling by high throughput sequencing"[DataSet Type])`
    
    // Step 1: Search for GSE IDs using esearch
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gds&term=${encodeURIComponent(query)}&retmax=${maxResults}&retmode=json`
    
    // Create abort controller for timeout
    const searchController = new AbortController()
    const searchTimeoutId = setTimeout(() => searchController.abort(), 30000) // 30 second timeout

    const searchResponse = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GeneExpressionAnalyzer/1.0)'
      },
      signal: searchController.signal
    })

    clearTimeout(searchTimeoutId)

    if (!searchResponse.ok) {
      throw new Error(`NCBI search failed: ${searchResponse.status}`)
    }

    const searchData = await searchResponse.json()
    const gseIds = searchData.esearchresult?.idlist || []

    if (gseIds.length === 0) {
      return []
    }

    // Step 2: Get detailed information using esummary
    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gds&id=${gseIds.join(',')}&retmode=json`
    
    // Add delay to respect rate limits (3 requests/second)
    await new Promise(resolve => setTimeout(resolve, 350))
    
    // Create abort controller for timeout
    const summaryController = new AbortController()
    const summaryTimeoutId = setTimeout(() => summaryController.abort(), 30000) // 30 second timeout

    const summaryResponse = await fetch(summaryUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GeneExpressionAnalyzer/1.0)'
      },
      signal: summaryController.signal
    })

    clearTimeout(summaryTimeoutId)

    if (!summaryResponse.ok) {
      throw new Error(`NCBI summary failed: ${summaryResponse.status}`)
    }

    const summaryData = await summaryResponse.json()
    const results = summaryData.result || {}

    // Parse results into GEODataset format
    const datasets: GEODataset[] = []
    
    for (const id of gseIds) {
      const dataset = results[id]
      if (!dataset) continue

      // Extract GSE ID - try multiple possible fields
      let gseId = dataset.accession || dataset.gse || dataset.id || id
      
      // If it's a GDS ID, we need to extract GSE from it or skip
      // GDS IDs are like "200012345" and we need to find the corresponding GSE
      // For now, if it doesn't start with GSE, try to construct from accession
      if (!gseId.startsWith('GSE')) {
        // Try to find GSE in accession or other fields
        const gseMatch = (dataset.accession || dataset.title || '').match(/GSE\d+/)
        if (gseMatch) {
          gseId = gseMatch[0]
        } else {
          // Skip if we can't find a valid GSE ID
          continue
        }
      }

      // Build download URL for Series Matrix File
      const downloadUrl = constructSeriesMatrixUrl(gseId)

      // Extract dataset information with fallbacks
      const title = dataset.title || dataset.summary || dataset['dataset_title'] || 'Untitled Dataset'
      const samples = parseInt(dataset.samples || dataset['sample_count'] || '0', 10)
      const platform = dataset.platform || dataset['platform_id'] || dataset['platform_name'] || 'Unknown'
      const organism = dataset.organism || dataset['organism_name'] || normalizedSpecies
      const summary = dataset.summary || dataset['dataset_description'] || undefined
      const pubDate = dataset.pubdate || dataset['pub_date'] || dataset['publication_date'] || undefined

      datasets.push({
        gseId: gseId,
        title: title,
        samples: samples,
        platform: platform,
        organism: organism,
        downloadUrl: downloadUrl,
        summary: summary,
        pubDate: pubDate
      })
    }

    return datasets

  } catch (error: any) {
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      throw new Error('Search timeout. Please try again.')
    }
    if (error.message) {
      throw error
    }
    throw new Error(`Search error: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Normalize species name to handle common variations
 */
function normalizeSpeciesName(speciesName: string): string {
  const lower = speciesName.toLowerCase()
  
  // Common species name mappings
  const mappings: Record<string, string> = {
    'human': 'Homo sapiens',
    'humans': 'Homo sapiens',
    'mouse': 'Mus musculus',
    'mice': 'Mus musculus',
    'rat': 'Rattus norvegicus',
    'rats': 'Rattus norvegicus',
    'fruit fly': 'Drosophila melanogaster',
    'drosophila': 'Drosophila melanogaster',
    'c. elegans': 'Caenorhabditis elegans',
    'celegans': 'Caenorhabditis elegans',
    'zebrafish': 'Danio rerio',
    'yeast': 'Saccharomyces cerevisiae',
    'e. coli': 'Escherichia coli',
    'ecoli': 'Escherichia coli',
    'arabidopsis': 'Arabidopsis thaliana'
  }

  if (mappings[lower]) {
    return mappings[lower]
  }

  // If it looks like a scientific name (two words), return as-is
  if (speciesName.split(/\s+/).length >= 2) {
    return speciesName
  }

  // Otherwise, try to capitalize properly
  return speciesName.split(/\s+/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

/**
 * Construct Series Matrix File download URL from GSE ID
 * NCBI GEO stores files in directories like: GSE12nnn/GSE12345/matrix/
 */
function constructSeriesMatrixUrl(gseId: string): string {
  // Extract number from GSE ID (e.g., GSE12345 -> 12345)
  const match = gseId.match(/GSE(\d+)/)
  if (!match) {
    throw new Error(`Invalid GSE ID format: ${gseId}`)
  }

  const number = match[1]
  // Construct path: GSE12nnn for GSE12345 (last 3 digits replaced with nnn)
  // For GSE12345, number = "12345", slice(0, -3) = "12", so seriesPath = "GSE12nnn"
  const seriesPath = `GSE${number.slice(0, -3)}nnn`
  
  // Primary URL: FTP path to Series Matrix File
  // Format: https://ftp.ncbi.nlm.nih.gov/geo/series/GSE12nnn/GSE12345/matrix/GSE12345_series_matrix.txt.gz
  return `https://ftp.ncbi.nlm.nih.gov/geo/series/${seriesPath}/${gseId}/matrix/${gseId}_series_matrix.txt.gz`
}

