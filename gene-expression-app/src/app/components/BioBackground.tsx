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
      opacity: 0.5
    }}>
      {/* DNA Double Helix Strands - More prominent */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`dna-${i}`}
          style={{
            position: "absolute",
            left: `${10 + i * 25}%`,
            top: "-50px",
            width: "4px",
            height: "600px",
            background: `linear-gradient(to bottom, 
              transparent,
              rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.3),
              rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.4),
              transparent)`,
            animation: `float-slow ${14 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
            filter: "blur(0.5px)"
          }}
        >
          {/* Left strand nodes */}
          {[...Array(10)].map((_, j) => (
            <div
              key={`node-l-${j}`}
              style={{
                position: "absolute",
                left: "-6px",
                top: `${40 + j * 55}px`,
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: `rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.5)`,
                boxShadow: `0 0 12px rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.8)`,
                animation: `pulse-subtle ${2.5 + j * 0.2}s ease-in-out infinite`,
                animationDelay: `${j * 0.1}s`
              }}
            />
          ))}
          {/* Right strand nodes */}
          {[...Array(10)].map((_, j) => (
            <div
              key={`node-r-${j}`}
              style={{
                position: "absolute",
                right: "-6px",
                top: `${70 + j * 55}px`,
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: `rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.5)`,
                boxShadow: `0 0 12px rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.8)`,
                animation: `pulse-subtle ${2.8 + j * 0.2}s ease-in-out infinite`,
                animationDelay: `${0.4 + j * 0.1}s`
              }}
            />
          ))}
          {/* Connecting lines between nodes */}
          {[...Array(10)].map((_, j) => (
            <div
              key={`connector-${j}`}
              style={{
                position: "absolute",
                left: "-2px",
                top: `${55 + j * 55}px`,
                width: "8px",
                height: "2px",
                background: `linear-gradient(90deg, 
                  rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.3),
                  rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.3))`,
                transform: `rotate(${j % 2 === 0 ? '45deg' : '-45deg'})`,
                transformOrigin: "left center",
                animation: `pulse-subtle ${3 + j * 0.15}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      ))}

      {/* Additional floating gene nodes - subtle */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`gene-${i}`}
          style={{
            position: "absolute",
            left: `${(i * 12) % 100}%`,
            top: `${15 + (i % 3) * 30}%`,
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: `rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '20, 184, 166' : '139, 92, 246'}, 0.3)`,
            boxShadow: `0 0 8px rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '20, 184, 166' : '139, 92, 246'}, 0.5)`,
            animation: `drift ${18 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`
          }}
        />
      ))}

      {/* Molecular particles - very subtle */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: "absolute",
            left: `${(i * 8) % 100}%`,
            top: `${(i * 9) % 100}%`,
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: `rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '20, 184, 166' : '139, 92, 246'}, 0.3)`,
            boxShadow: `0 0 4px rgba(${i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '20, 184, 166' : '139, 92, 246'}, 0.4)`,
            animation: `float-slow ${25 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`
          }}
        />
      ))}
    </div>
  )
}
