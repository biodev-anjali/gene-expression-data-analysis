import Link from "next/link"
import BioBackground from "./components/BioBackground"

export default function Home() {
  return (
    <main style={{
      position: "relative",
      zIndex: 10,
      minHeight: "100vh",
      padding: "60px 40px",
      maxWidth: "900px",
      margin: "0 auto"
    }}>
      <BioBackground />
      
      <div className="fade-in" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="text-glow" style={{
          fontSize: "48px",
          fontWeight: 700,
          marginBottom: "20px",
          color: "#e0f2fe",
          letterSpacing: "-0.03em"
        }}>
          GENEX
        </h1>
        
        <h2 style={{
          fontSize: "24px",
          fontWeight: 500,
          marginBottom: "30px",
          color: "#cbd5e1"
        }}>
          Gene Expression Analyzer
        </h2>

        <div className="scifi-card" style={{
          padding: "30px",
          marginBottom: "40px"
        }}>
          <p className="info-text" style={{
            fontSize: "16px",
            lineHeight: "1.8",
            marginBottom: "20px"
          }}>
            A shared bioinformatics platform designed to analyze, visualize,
            and reuse gene expression results without redundant computation.
          </p>

          <div style={{
            paddingTop: "20px",
            borderTop: "1px solid rgba(0, 240, 255, 0.2)"
          }}>
            <p style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#94a3b8",
              lineHeight: "1.8"
            }}>
              Developed by <span style={{ color: "#00f0ff" }}>Anjali Yadav</span>
              <br />
              <span style={{ fontSize: "13px", fontWeight: 400 }}>
                M.Sc. Zoology | Bioinformatics
              </span>
            </p>
          </div>
        </div>

        <nav style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginTop: "40px"
        }}>
          <Link href="/analyze" className="nav-link">
            Analyzer
          </Link>
          <Link href="/charts" className="nav-link">
            Charts
          </Link>
          <Link href="/csv-parser" className="nav-link">
            CSV Parser
          </Link>
          <Link href="/history" className="nav-link">
            History
          </Link>
        </nav>
      </div>
    </main>
  )
}
