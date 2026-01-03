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
            Getting Started
          </h2>
          <p className="info-text" style={{ marginBottom: "20px" }}>
            Welcome to the Gene Expression Analyzer documentation. This platform provides 
            tools for analyzing, visualizing, and managing gene expression data.
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
            Features
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
              <strong style={{ color: "#00f0ff" }}>Analyzer:</strong> Upload CSV files containing 
              gene expression data for automated analysis and statistical computation.
            </li>
            <li style={{
              padding: "15px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <strong style={{ color: "#00f0ff" }}>Charts:</strong> Create visual comparisons 
              between multiple gene expression datasets with interactive charts.
            </li>
            <li style={{
              padding: "15px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <strong style={{ color: "#00f0ff" }}>History:</strong> View all previously analyzed 
              datasets with complete metadata and analysis results.
            </li>
          </ul>
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
            File Format
          </h2>
          <p className="info-text" style={{ marginBottom: "15px" }}>
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
              <li>First column: Gene names/identifiers</li>
              <li>Remaining columns: Expression values per sample</li>
              <li>Header row: Column names (first column = "Gene", others = sample names)</li>
            </ul>
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
            API Endpoints
          </h2>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            <div style={{
              padding: "15px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "6px"
            }}>
              <code style={{
                color: "#c4b5fd",
                fontSize: "14px",
                fontWeight: 600
              }}>
                POST /api/analyze
              </code>
              <p className="info-text" style={{ marginTop: "8px", marginBottom: 0 }}>
                Upload and analyze a gene expression CSV file.
              </p>
            </div>
            <div style={{
              padding: "15px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "6px"
            }}>
              <code style={{
                color: "#c4b5fd",
                fontSize: "14px",
                fontWeight: 600
              }}>
                GET /api/history
              </code>
              <p className="info-text" style={{ marginTop: "8px", marginBottom: 0 }}>
                Retrieve all previous analysis results.
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
            Technology Stack
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px"
          }}>
            <div style={{
              padding: "15px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <strong style={{ color: "#00f0ff" }}>Frontend:</strong>
              <p className="info-text" style={{ marginTop: "5px", marginBottom: 0 }}>
                Next.js 16, React 19, TypeScript
              </p>
            </div>
            <div style={{
              padding: "15px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <strong style={{ color: "#00f0ff" }}>Database:</strong>
              <p className="info-text" style={{ marginTop: "5px", marginBottom: 0 }}>
                Prisma ORM, SQLite/PostgreSQL
              </p>
            </div>
            <div style={{
              padding: "15px",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "6px"
            }}>
              <strong style={{ color: "#00f0ff" }}>Visualization:</strong>
              <p className="info-text" style={{ marginTop: "5px", marginBottom: 0 }}>
                Recharts
              </p>
            </div>
          </div>
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
            Support
          </h2>
          <p className="info-text">
            For questions, issues, or contributions, please refer to the project repository 
            or contact the development team.
          </p>
          <p style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#94a3b8"
          }}>
            Developed by <span style={{ color: "#00f0ff" }}>Anjali Yadav</span>
          </p>
        </div>
      </div>
    </main>
  )
}

