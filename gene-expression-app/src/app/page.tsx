import Link from "next/link"

export default function Home() {
  return (
    <main className="p-10 space-y-4">
      <h1 className="text-3xl font-bold">GENEX</h1>
      <p className="text-lg">Gene Expression Analyzer</p>

      <p className="text-sm max-w-xl">
        A shared bioinformatics platform designed to analyze, visualize,
        and reuse gene expression results without redundant computation.
      </p>

      <p className="text-sm font-semibold">
        Developed by Anjali Yadav<br/>
        M.Sc. Zoology | Bioinformatics
      </p>

      <nav className="flex gap-4 pt-4 underline">
        <Link href="/analyze">Analyzer</Link>
        <Link href="/charts">Charts</Link>
        <Link href="/csv-parser">CSV Parser</Link>
        <Link href="/history">History</Link>
      </nav>
    </main>
  )
}
