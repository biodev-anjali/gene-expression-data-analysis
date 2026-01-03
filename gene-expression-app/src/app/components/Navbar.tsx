"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/analyze", label: "Analyzer" },
    { href: "/charts", label: "Charts" },
    { href: "/history", label: "History" },
    { href: "/documentation", label: "Documentation" },
  ]

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "rgba(10, 10, 15, 0.8)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
      padding: "20px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    }}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href === "/" && pathname === "/")
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              color: isActive ? "#fff" : "#94a3b8",
              background: isActive ? "rgba(139, 92, 246, 0.3)" : "transparent",
              borderRadius: "6px",
              border: isActive ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid transparent",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none"
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "#fff"
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "#94a3b8"
                e.currentTarget.style.background = "transparent"
              }
            }}
          >
            {isActive && (
              <span style={{ fontSize: "10px" }}>✦</span>
            )}
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

