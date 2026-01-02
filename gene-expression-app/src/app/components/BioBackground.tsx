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
    }}>
      {/* Cosmic stars background */}
      {[...Array(80)].map((_, i) => {
        // Deterministic pseudo-random values based on index
        const seed = (i * 9301 + 49297) % 233280;
        const x = (seed % 10000) / 100;
        const y = ((seed * 7919) % 10000) / 100;
        const size = 1 + ((seed * 17) % 20) / 10;
        const opacity = 0.3 + ((seed * 23) % 50) / 100;
        const isCyan = (seed % 2) === 0;
        const glow = 2 + ((seed * 31) % 40) / 10;
        const animDur = 2 + ((seed * 7) % 30) / 10;
        const animDelay = ((seed * 11) % 200) / 100;
        
        return (
          <div
            key={`star-${i}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              background: `rgba(${isCyan ? '0, 240, 255' : '255, 255, 255'}, ${opacity})`,
              boxShadow: `0 0 ${glow}px rgba(0, 240, 255, 0.8)`,
              animation: `twinkle ${animDur}s ease-in-out infinite`,
              animationDelay: `${animDelay}s`
            }}
          />
        );
      })}

      {/* DNA Double Helix Structures - More prominent and cosmic */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const baseX = 10 + i * 15;
        const helixHeight = 800;
        const nodeCount = 14;
        
        return (
          <div
            key={`dna-helix-${i}`}
            style={{
              position: "absolute",
              left: `${baseX}%`,
              top: "-100px",
              width: "8px",
              height: `${helixHeight}px`,
              transformOrigin: "center center",
              animation: `float-slow ${18 + i * 2}s ease-in-out infinite, rotate-slow ${60 + i * 10}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
              opacity: 0.7
            }}
          >
            {/* Central spine */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: "2px",
                height: "100%",
                background: `linear-gradient(to bottom, 
                  transparent,
                  rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.3),
                  rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.5),
                  transparent)`,
                transform: "translateX(-50%)",
              }}
            />

            {/* Left helix strand nodes */}
            {[...Array(nodeCount)].map((_, j) => {
              const angle = (j / nodeCount) * Math.PI * 4; // Full helix rotation
              const radius = 12;
              const x = Math.cos(angle) * radius;
              const y = (j / nodeCount) * helixHeight;
              
              return (
                <div
                  key={`left-node-${j}`}
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${x}px)`,
                    top: `${y}px`,
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, 
                      rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.9),
                      rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.6))`,
                    boxShadow: `0 0 20px rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 1),
                               0 0 40px rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.5)`,
                    transform: "translate(-50%, -50%)",
                    animation: `pulse-subtle ${2 + j * 0.1}s ease-in-out infinite`,
                    animationDelay: `${j * 0.05}s`,
                    border: `1px solid rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 1)`
                  }}
                />
              );
            })}

            {/* Right helix strand nodes */}
            {[...Array(nodeCount)].map((_, j) => {
              const angle = (j / nodeCount) * Math.PI * 4 + Math.PI; // Opposite side
              const radius = 12;
              const x = Math.cos(angle) * radius;
              const y = (j / nodeCount) * helixHeight;
              
              return (
                <div
                  key={`right-node-${j}`}
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${x}px)`,
                    top: `${y}px`,
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, 
                      rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.9),
                      rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.6))`,
                    boxShadow: `0 0 20px rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 1),
                               0 0 40px rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.5)`,
                    transform: "translate(-50%, -50%)",
                    animation: `pulse-subtle ${2.2 + j * 0.1}s ease-in-out infinite`,
                    animationDelay: `${0.2 + j * 0.05}s`,
                    border: `1px solid rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 1)`
                  }}
                />
              );
            })}

            {/* Connecting base pairs - rungs of the helix */}
            {[...Array(nodeCount)].map((_, j) => {
              const angle = (j / nodeCount) * Math.PI * 4;
              const radius = 12;
              const leftX = Math.cos(angle) * radius;
              const rightX = Math.cos(angle + Math.PI) * radius;
              const y = (j / nodeCount) * helixHeight;
              const length = Math.abs(rightX - leftX);
              
              return (
                <div
                  key={`rung-${j}`}
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${leftX}px)`,
                    top: `${y}px`,
                    width: `${length}px`,
                    height: "2px",
                    background: `linear-gradient(90deg, 
                      rgba(${i % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.5),
                      rgba(${i % 2 === 1 ? '0, 240, 255' : '20, 184, 166'}, 0.5))`,
                    transform: "translateY(-50%)",
                    boxShadow: `0 0 8px rgba(0, 240, 255, 0.6)`,
                    animation: `pulse-subtle ${2.5 + j * 0.08}s ease-in-out infinite`,
                    animationDelay: `${j * 0.04}s`
                  }}
                />
              );
            })}
          </div>
        );
      })}

      {/* Floating DNA fragments - smaller cosmic elements */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`fragment-${i}`}
          style={{
            position: "absolute",
            left: `${(i * 8.33) % 100}%`,
            top: `${15 + (i % 4) * 25}%`,
            width: "40px",
            height: "60px",
            opacity: 0.4,
            animation: `drift ${25 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`
          }}
        >
          {/* Mini helix fragment */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "2px",
            height: "100%",
            background: `linear-gradient(to bottom, transparent, rgba(0, 240, 255, 0.4), transparent)`,
            transform: "translate(-50%, -50%)"
          }} />
          {[...Array(3)].map((_, j) => (
            <div key={`frag-node-${j}`} style={{
              position: "absolute",
              left: `${j % 2 === 0 ? '30%' : '70%'}`,
              top: `${25 + j * 25}%`,
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: `rgba(${j % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.6)`,
              boxShadow: `0 0 10px rgba(${j % 2 === 0 ? '0, 240, 255' : '139, 92, 246'}, 0.8)`,
              transform: "translate(-50%, -50%)"
            }} />
          ))}
        </div>
      ))}
    </div>
  )
}
