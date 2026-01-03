"use client"
import BioBackground from "../components/BioBackground"

export default function Documentation() {
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
          marginBottom: "20px",
          color: "#e0f2fe"
        }}>
          Documentation
        </h1>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            What is This System?
          </h2>
          <p className="info-text" style={{ marginBottom: "15px", lineHeight: "1.8" }}>
            The Gene Expression Analyzer is a comprehensive bioinformatics platform designed 
            to process, analyze, and visualize gene expression data from molecular biology experiments. 
            This system enables researchers to upload gene expression datasets in CSV format, perform 
            automated statistical analysis, and generate visual comparisons between different datasets.
          </p>
          <p className="info-text" style={{ lineHeight: "1.8" }}>
            The platform serves as a shared computational resource that eliminates redundant 
            processing by detecting previously analyzed files through content-based hashing. 
            This intelligent caching mechanism ensures that identical datasets are not re-analyzed, 
            saving computational resources and time while maintaining a complete history of all 
            analysis operations.
          </p>
        </div>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            How Does It Work?
          </h2>
          <p className="info-text" style={{ marginBottom: "20px", lineHeight: "1.8" }}>
            The system operates through a streamlined workflow that combines file processing, 
            data analysis, and result storage:
          </p>
          
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            <div style={{
              padding: "20px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "10px"
              }}>
                1. File Upload & Processing
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: 0 }}>
                When a CSV file is uploaded through the Analyzer interface, the system first 
                computes a cryptographic hash of the file content. This hash serves as a unique 
                identifier that allows the system to detect if the same dataset has been analyzed 
                previously. The CSV file is then parsed to extract gene identifiers and expression 
                values across multiple samples.
              </p>
            </div>

            <div style={{
              padding: "20px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "10px"
              }}>
                2. Duplicate Detection
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: 0 }}>
                Before performing any analysis, the system checks the database for existing records 
                with matching file hashes. If a duplicate is found, the system immediately returns 
                the previously computed results without re-processing the data. This intelligent 
                caching mechanism prevents unnecessary computational work and ensures consistency 
                across repeated analyses.
              </p>
            </div>

            <div style={{
              padding: "20px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "10px"
              }}>
                3. Statistical Analysis
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: 0 }}>
                For new files, the system performs comprehensive statistical analysis including: 
                counting the total number of genes, calculating the number of samples, and computing 
                mean expression values across all genes and samples. These metrics provide researchers 
                with immediate insights into the scale and characteristics of their datasets.
              </p>
            </div>

            <div style={{
              padding: "20px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "10px"
              }}>
                4. Data Storage & Retrieval
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: 0 }}>
                Analysis results are stored in a persistent database along with metadata including 
                the original filename, file hash, computed statistics, and timestamp. The History 
                page provides access to all previously analyzed datasets, allowing researchers to 
                review past analyses and track their research workflow.
              </p>
            </div>

            <div style={{
              padding: "20px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#00f0ff",
                marginBottom: "10px"
              }}>
                5. Visualization & Comparison
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: 0 }}>
                The Charts feature enables researchers to select multiple analyzed datasets and 
                generate comparative visualizations. This allows for side-by-side comparison of 
                different experiments, conditions, or time points, facilitating pattern recognition 
                and hypothesis generation in gene expression studies.
              </p>
            </div>
          </div>
        </div>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            Why This System?
          </h2>
          <p className="info-text" style={{ marginBottom: "20px", lineHeight: "1.8" }}>
            Gene expression analysis is a fundamental task in modern molecular biology research, 
            but it often involves repetitive computational work and lacks efficient mechanisms for 
            result reuse. This platform addresses several critical challenges:
          </p>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            <div style={{
              padding: "20px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "6px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "10px"
              }}>
                Eliminates Redundant Computation
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: 0 }}>
                By detecting previously analyzed files through content-based hashing, the system 
                prevents unnecessary re-computation of identical datasets. This saves computational 
                resources, reduces processing time, and ensures consistent results across repeated 
                analyses of the same data.
              </p>
            </div>

            <div style={{
              padding: "20px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "6px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "10px"
              }}>
                Centralized Data Management
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: 0 }}>
                The platform provides a unified interface for managing multiple gene expression 
                datasets. Researchers can easily track their analysis history, compare results 
                across different experiments, and maintain a comprehensive record of their 
                computational work without managing files manually.
              </p>
            </div>

            <div style={{
              padding: "20px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "6px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "10px"
              }}>
                Facilitates Collaborative Research
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: 0 }}>
                As a shared bioinformatics platform, the system enables multiple researchers to 
                benefit from previously analyzed datasets. When one researcher analyzes a dataset, 
                others can immediately access those results, promoting knowledge sharing and 
                reducing duplicate work across research teams.
              </p>
            </div>

            <div style={{
              padding: "20px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "6px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#c4b5fd",
                marginBottom: "10px"
              }}>
                Streamlines Research Workflow
              </h3>
              <p className="info-text" style={{ lineHeight: "1.8", marginBottom: 0 }}>
                The integrated workflow from file upload to visualization eliminates the need for 
                researchers to use multiple disconnected tools. Everything from data processing to 
                result comparison is available in a single, user-friendly interface, reducing the 
                learning curve and increasing research productivity.
              </p>
            </div>
          </div>
        </div>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            File Format Requirements
          </h2>
          <p className="info-text" style={{ marginBottom: "15px", lineHeight: "1.8" }}>
            The platform accepts CSV files with the following structure:
          </p>
          <div style={{
            padding: "20px",
            background: "rgba(0, 240, 255, 0.05)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            borderRadius: "6px",
            marginBottom: "15px"
          }}>
            <ul style={{
              paddingLeft: "20px",
              lineHeight: "2",
              color: "#cbd5e1"
            }}>
              <li><strong style={{ color: "#00f0ff" }}>First column:</strong> Gene names/identifiers</li>
              <li><strong style={{ color: "#00f0ff" }}>Remaining columns:</strong> Expression values per sample</li>
              <li><strong style={{ color: "#00f0ff" }}>Header row:</strong> Column names (first column = "Gene", others = sample names)</li>
            </ul>
          </div>
          <p className="info-text" style={{ lineHeight: "1.8" }}>
            The system automatically parses the CSV structure and extracts the necessary 
            information for analysis. Ensure your file follows this format for optimal results.
          </p>
        </div>

        <div className="scifi-card" style={{
          padding: "30px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "20px",
            color: "#cbd5e1"
          }}>
            Features Overview
          </h2>
          <ul style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            <li style={{
              padding: "15px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <strong style={{ color: "#00f0ff" }}>Analyzer:</strong> Upload and analyze gene 
              expression CSV files with automatic duplicate detection and statistical computation.
            </li>
            <li style={{
              padding: "15px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <strong style={{ color: "#00f0ff" }}>Charts:</strong> Create visual comparisons 
              between multiple gene expression datasets with interactive charts for pattern analysis.
            </li>
            <li style={{
              padding: "15px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <strong style={{ color: "#00f0ff" }}>History:</strong> Access a complete record of 
              all previously analyzed datasets with metadata, statistics, and timestamps.
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
