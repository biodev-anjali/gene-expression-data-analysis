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
      {/* DNA Double Helix Strands - Enhanced and More Visible */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={`dna-${i}`}
          style={{
            position: "absolute",
            left: `${8 + i * 18}%`,
            top: "-80px",
            width: "5px",
            height: "700px",
            background: `linear-gradient(to bottom, 
              transparent 0%,
              rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.4) 20%,
              rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.5) 50%,
              rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.4) 80%,
              transparent 100%)`,
            animation: `float-slow ${16 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.2}s`,
            filter: "blur(0.3px)"
          }}
        >
          {/* Left strand nodes - DNA bases */}
          {[...Array(12)].map((_, j) => (
            <div
              key={`node-l-${j}`}
              style={{
                position: "absolute",
                left: "-8px",
                top: `${50 + j * 55}px`,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: `rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.6)`,
                boxShadow: `0 0 15px rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.9)`,
                animation: `pulse-subtle ${2.5 + j * 0.15}s ease-in-out infinite`,
                animationDelay: `${j * 0.08}s`,
                border: `2px solid rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.8)`
              }}
            />
          ))}
          {/* Right strand nodes - DNA bases */}
          {[...Array(12)].map((_, j) => (
            <div
              key={`node-r-${j}`}
              style={{
                position: "absolute",
                right: "-8px",
                top: `${75 + j * 55}px`,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: `rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.6)`,
                boxShadow: `0 0 15px rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.9)`,
                animation: `pulse-subtle ${2.8 + j * 0.15}s ease-in-out infinite`,
                animationDelay: `${0.3 + j * 0.08}s`,
                border: `2px solid rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.8)`
              }}
            />
          ))}
          {/* Connecting lines between DNA bases - forms helix structure */}
          {[...Array(12)].map((_, j) => (
            <div
              key={`connector-${j}`}
              style={{
                position: "absolute",
                left: "-4px",
                top: `${62 + j * 55}px`,
                width: "13px",
                height: "3px",
                background: `linear-gradient(90deg, 
                  rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.4),
                  rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.4))`,
                transform: `rotate(${j % 2 === 0 ? '35deg' : '-35deg'})`,
                transformOrigin: "left center",
                borderRadius: "2px",
                animation: `pulse-subtle ${3 + j * 0.1}s ease-in-out infinite`,
                animationDelay: `${j * 0.05}s`,
                boxShadow: `0 0 4px rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.5)`
              }}
            />
          ))}
        </div>
      ))}

      {/* Subtle floating particles - reduced for DNA focus */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: "absolute",
            left: `${(i * 16) % 100}%`,
            top: `${(i * 18) % 100}%`,
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: `rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.3)`,
            boxShadow: `0 0 6px rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.5)`,
            animation: `float-slow ${22 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  )
}
