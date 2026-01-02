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
        <a href="/analyze">Analyzer</a>
        <a href="/charts">Charts</a>
        <a href="/csv-parser">CSV Parser</a>
        <a href="/history">History</a>
      </nav>
    </main>
  )
}
