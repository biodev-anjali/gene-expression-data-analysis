"use client"

export default function BioBackground() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: 0,
      pointerEvents: "none"
    }}>
      {/* Animated DNA Strands */}
      <div className="dna-strand" style={{
        position: "absolute",
        left: "10%",
        top: "-100px",
        width: "4px",
        height: "400px",
        background: "linear-gradient(to bottom, transparent, rgba(0, 240, 255, 0.3), transparent)",
        animation: "float-dna 8s ease-in-out infinite",
        animationDelay: "0s"
      }}>
        <div style={{
          position: "absolute",
          left: "-2px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(0, 240, 255, 0.6)",
          boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
          animation: "move-dna 3s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          right: "-2px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.6)",
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.8)",
          top: "50px",
          animation: "move-dna 3s ease-in-out infinite",
          animationDelay: "0.5s"
        }}></div>
      </div>

      <div className="dna-strand" style={{
        position: "absolute",
        left: "30%",
        top: "-150px",
        width: "4px",
        height: "400px",
        background: "linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.3), transparent)",
        animation: "float-dna 10s ease-in-out infinite",
        animationDelay: "2s"
      }}>
        <div style={{
          position: "absolute",
          left: "-2px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(236, 72, 153, 0.6)",
          boxShadow: "0 0 10px rgba(236, 72, 153, 0.8)",
          animation: "move-dna 4s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          right: "-2px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(0, 240, 255, 0.6)",
          boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
          top: "80px",
          animation: "move-dna 4s ease-in-out infinite",
          animationDelay: "0.8s"
        }}></div>
      </div>

      <div className="dna-strand" style={{
        position: "absolute",
        right: "15%",
        top: "-100px",
        width: "4px",
        height: "400px",
        background: "linear-gradient(to bottom, transparent, rgba(236, 72, 153, 0.3), transparent)",
        animation: "float-dna 9s ease-in-out infinite",
        animationDelay: "4s"
      }}>
        <div style={{
          position: "absolute",
          left: "-2px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.6)",
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.8)",
          animation: "move-dna 3.5s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          right: "-2px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(0, 240, 255, 0.6)",
          boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
          top: "60px",
          animation: "move-dna 3.5s ease-in-out infinite",
          animationDelay: "0.6s"
        }}></div>
      </div>

      {/* Molecular Structures */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="molecule"
          style={{
            position: "absolute",
            width: "60px",
            height: "60px",
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
            animation: `float-molecule ${8 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            opacity: 0.2
          }}
        >
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "2px solid rgba(0, 240, 255, 0.4)",
            borderRadius: "50%",
            animation: `rotate-slow ${15 + i * 2}s linear infinite`
          }}></div>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgba(0, 240, 255, 0.6)",
            boxShadow: "0 0 15px rgba(0, 240, 255, 0.8)"
          }}></div>
          {[0, 60, 120, 180, 240, 300].map((angle, j) => (
            <div
              key={j}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "rgba(139, 92, 246, 0.5)",
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-25px)`,
                boxShadow: "0 0 8px rgba(139, 92, 246, 0.6)"
              }}
            ></div>
          ))}
        </div>
      ))}

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: "absolute",
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: `rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '139, 92, 246' : '236, 72, 153'}, 0.6)`,
            left: `${(i * 7) % 100}%`,
            top: `${(i * 13) % 100}%`,
            animation: `float-particle ${10 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
            boxShadow: `0 0 6px rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '139, 92, 246' : '236, 72, 153'}, 0.8)`
          }}
        ></div>
      ))}
    </div>
  )
}

