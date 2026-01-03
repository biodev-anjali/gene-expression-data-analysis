"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/analyze", label: "Analyzer" },
    { href: "/charts", label: "Charts" },
    { href: "/csv-parser", label: "CSV Parser" },
    { href: "/history", label: "History" },
  ]

  return (
    <nav style={{
      position: "fixed",
      top: "30px",
      right: "40px",
      zIndex: 100,
      display: "flex",
      gap: "12px",
      flexWrap: "wrap"
    }}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="nav-link"
          style={{
            padding: "10px 18px",
            fontSize: "14px",
            opacity: pathname === link.href ? 1 : 0.8,
            borderBottom: pathname === link.href ? "2px solid #00f0ff" : "2px solid transparent"
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

