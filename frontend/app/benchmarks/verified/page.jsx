export default function Page() {
  return (
    <main>
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container py-10 space-y-3">
          <h1 className="h1">AppForge Verified</h1>
          <p className="text-gray-600">AppForge Authors</p>
          <div className="flex flex-wrap gap-2">
            <a className="btn" href="#">Paper</a>
            <a className="btn" href="#">GitHub</a>
            <a className="btn" href="#">Dataset</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-4">
          <h2 className="h2">Overview</h2>
          <p>Replace with real overview next week.</p>
          <h2 className="h2">Resources</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Base dataset</li>
            <li>Retrieval datasets</li>
            <li>Model weights (optional)</li>
          </ul>
          <h2 className="h2">Citation</h2>
          <pre className="bg-gray-50 p-3 rounded-xl overflow-x-auto text-sm"><code>{`@inproceedings{appforge2025,...}`}</code></pre>
        </div>
      </section>
    </main>
  );
}