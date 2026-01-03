import BioBackground from "./components/BioBackground"

export default function Home() {
  return (
    <main style={{
      position: "relative",
      zIndex: 10,
      minHeight: "100vh",
      paddingTop: "100px",
      padding: "100px 40px 40px",
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) 400px",
      gap: "40px",
      maxWidth: "1400px",
      margin: "0 auto"
    }}
    className="home-layout"
    >
      <BioBackground />
      
      {/* Left Content Area */}
      <div className="fade-in" style={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 16px",
          background: "rgba(139, 92, 246, 0.15)",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          borderRadius: "20px",
          marginBottom: "30px",
          fontSize: "12px",
          fontWeight: 600,
          color: "#c4b5fd",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
        }}>
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#8b5cf6",
            boxShadow: "0 0 8px #8b5cf6"
          }}></span>
          BIOINFORMATICS PLATFORM
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "72px",
          fontWeight: 700,
          marginBottom: "20px",
          lineHeight: "1.1",
          letterSpacing: "-0.03em"
        }}>
          <span style={{ color: "#fff" }}>Gene</span>
          <span style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #00f0ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}> Expression</span>
        </h1>

        {/* Subtitle */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "30px"
        }}>
          <span style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#94a3b8",
            letterSpacing: "0.1em",
            textTransform: "uppercase"
          }}>
            DATA ANALYSIS SYSTEM
          </span>
          <div style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, transparent 100%)"
          }}></div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: "18px",
          lineHeight: "1.8",
          color: "#cbd5e1",
          marginBottom: "40px",
          maxWidth: "600px"
        }}>
          Building advanced bioinformatics systems with a focus on gene expression analysis, 
          data visualization, and efficient computational workflows for molecular research.
        </p>

        {/* Statistics */}
        <div style={{
          display: "flex",
          gap: "40px",
          marginBottom: "50px",
          flexWrap: "wrap"
        }}>
          <div>
            <div style={{
              fontSize: "32px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #8b5cf6 0%, #00f0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "4px"
            }}>
              10+
            </div>
            <div style={{
              fontSize: "14px",
              color: "#94a3b8"
            }}>
              Analyses
            </div>
          </div>
          <div>
            <div style={{
              fontSize: "32px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #8b5cf6 0%, #00f0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "4px"
            }}>
              5+
            </div>
            <div style={{
              fontSize: "14px",
              color: "#94a3b8"
            }}>
              Visualizations
            </div>
          </div>
          <div>
            <div style={{
              fontSize: "32px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #8b5cf6 0%, #00f0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "4px"
            }}>
              3+
            </div>
            <div style={{
              fontSize: "14px",
              color: "#94a3b8"
            }}>
              Years
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 20px",
          background: "rgba(15, 23, 42, 0.6)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          borderRadius: "8px",
          width: "fit-content"
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#10b981",
            boxShadow: "0 0 8px #10b981"
          }}></div>
          <span style={{
            fontSize: "14px",
            color: "#94a3b8"
          }}>
            System Online
          </span>
        </div>
      </div>

      {/* Right Sidebar - System Architecture */}
      <div className="fade-in" style={{
        position: "relative",
        zIndex: 1,
        background: "rgba(30, 20, 50, 0.6)",
        border: "1px solid rgba(139, 92, 246, 0.3)",
        borderRadius: "12px",
        padding: "30px",
        height: "fit-content",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)"
      }}>
        <div style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#c4b5fd",
          marginBottom: "24px",
          letterSpacing: "0.05em"
        }}>
          | System Architecture
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {/* Frontend */}
          <div style={{
            padding: "16px",
            background: "rgba(15, 23, 42, 0.4)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative"
          }}>
            <span style={{ fontSize: "20px" }}>⚡</span>
            <span style={{ color: "#cbd5e1", fontSize: "14px", flex: 1 }}>Frontend</span>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#8b5cf6",
              boxShadow: "0 0 8px #8b5cf6"
            }}></div>
          </div>

          {/* Data Parser */}
          <div style={{
            padding: "16px",
            background: "rgba(15, 23, 42, 0.4)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative"
          }}>
            <span style={{ fontSize: "20px" }}>🔒</span>
            <span style={{ color: "#cbd5e1", fontSize: "14px", flex: 1 }}>Data Parser</span>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#8b5cf6",
              boxShadow: "0 0 8px #8b5cf6"
            }}></div>
          </div>

          {/* Analysis Engine */}
          <div style={{
            padding: "16px",
            background: "rgba(139, 92, 246, 0.15)",
            border: "2px solid rgba(139, 92, 246, 0.5)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
          }}>
            <span style={{ fontSize: "20px" }}>🌐</span>
            <span style={{ color: "#fff", fontSize: "14px", flex: 1, fontWeight: 600 }}>Analysis Engine</span>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#8b5cf6",
              boxShadow: "0 0 12px #8b5cf6",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#8b5cf6",
                boxShadow: "0 0 8px #8b5cf6"
              }}></div>
            </div>
          </div>

          {/* Database */}
          <div style={{
            padding: "16px",
            background: "rgba(15, 23, 42, 0.4)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative"
          }}>
            <span style={{ fontSize: "20px" }}>⚙️</span>
            <span style={{ color: "#cbd5e1", fontSize: "14px", flex: 1 }}>Database</span>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#8b5cf6",
              boxShadow: "0 0 8px #8b5cf6"
            }}></div>
          </div>

          {/* Visualization */}
          <div style={{
            padding: "16px",
            background: "rgba(15, 23, 42, 0.4)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative"
          }}>
            <span style={{ fontSize: "20px" }}>💾</span>
            <span style={{ color: "#cbd5e1", fontSize: "14px", flex: 1 }}>Visualization</span>
          </div>
        </div>
      </div>
    </main>
  )
}
