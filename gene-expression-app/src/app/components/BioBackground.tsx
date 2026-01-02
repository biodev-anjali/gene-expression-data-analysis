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
      pointerEvents: "none",
      opacity: 0.6
    }}>
      {/* DNA Double Helix Strands */}
      {[0, 1, 2].map((i) => (
        <div
          key={`dna-${i}`}
          style={{
            position: "absolute",
            left: `${15 + i * 30}%`,
            top: "-100px",
            width: "3px",
            height: "500px",
            background: `linear-gradient(to bottom, 
              transparent,
              rgba(${i === 0 ? '0, 240, 255' : i === 1 ? '139, 92, 246' : '20, 184, 166'}, 0.2),
              transparent)`,
            animation: `float-slow ${12 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`
          }}
        >
          {/* Left strand nodes */}
          {[...Array(8)].map((_, j) => (
            <div
              key={`node-l-${j}`}
              style={{
                position: "absolute",
                left: "-4px",
                top: `${50 + j * 60}px`,
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: `rgba(${i === 0 ? '0, 240, 255' : i === 1 ? '139, 92, 246' : '20, 184, 166'}, 0.4)`,
                boxShadow: `0 0 8px rgba(${i === 0 ? '0, 240, 255' : i === 1 ? '139, 92, 246' : '20, 184, 166'}, 0.6)`,
                animation: `pulse-subtle ${3 + j * 0.3}s ease-in-out infinite`
              }}
            />
          ))}
          {/* Right strand nodes */}
          {[...Array(8)].map((_, j) => (
            <div
              key={`node-r-${j}`}
              style={{
                position: "absolute",
                right: "-4px",
                top: `${80 + j * 60}px`,
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: `rgba(${i === 0 ? '20, 184, 166' : i === 1 ? '0, 240, 255' : '139, 92, 246'}, 0.4)`,
                boxShadow: `0 0 8px rgba(${i === 0 ? '20, 184, 166' : i === 1 ? '0, 240, 255' : '139, 92, 246'}, 0.6)`,
                animation: `pulse-subtle ${3.5 + j * 0.3}s ease-in-out infinite`,
                animationDelay: "0.5s"
              }}
            />
          ))}
        </div>
      ))}

      {/* Floating Gene Nodes */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`gene-${i}`}
          style={{
            position: "absolute",
            left: `${(i * 8) % 100}%`,
            top: `${20 + (i % 4) * 25}%`,
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: `rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '20, 184, 166' : '139, 92, 246'}, 0.3)`,
            boxShadow: `0 0 10px rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '20, 184, 166' : '139, 92, 246'}, 0.5)`,
            animation: `drift ${15 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}

      {/* Molecular Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: "absolute",
            left: `${(i * 5.5) % 100}%`,
            top: `${(i * 7) % 100}%`,
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: `rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '20, 184, 166' : '139, 92, 246'}, 0.4)`,
            boxShadow: `0 0 6px rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '20, 184, 166' : '139, 92, 246'}, 0.6)`,
            animation: `float-slow ${20 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}

      {/* Molecular Structures */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`molecule-${i}`}
          style={{
            position: "absolute",
            left: `${25 + i * 20}%`,
            top: `${30 + (i % 2) * 40}%`,
            width: "40px",
            height: "40px",
            animation: `rotate-slow ${30 + i * 5}s linear infinite`,
            animationDelay: `${i * 2}s`,
            opacity: 0.2
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: "2px solid rgba(0, 240, 255, 0.3)",
              borderRadius: "50%"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(0, 240, 255, 0.5)",
              boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)"
            }}
          />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <div
              key={angle}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(139, 92, 246, 0.4)",
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-18px)`,
                boxShadow: "0 0 6px rgba(139, 92, 246, 0.6)"
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
