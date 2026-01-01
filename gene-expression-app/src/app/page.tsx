import Link from "next/link"

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Gene Expression Analyzer</h1>
      <p>App is live on Vercel 🚀</p>
      <Link href="/history">Go to History</Link>
    </main>
  )
}
