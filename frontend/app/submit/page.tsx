
export default function SubmitPage(){
  return (
    <main className="section">
      <div className="container space-y-4">
        <h1 className="h1">Submit to AppForge Bench</h1>
        <p>Guidelines for contributing your results to the leaderboard.</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Evaluate locally or via cloud with our CLI.</li>
          <li>Format results according to the schema.</li>
          <li>Open a PR to the experiments repo.</li>
        </ol>
        <a className="btn" href="https://github.com">Experiments Repo</a>
      </div>
    </main>
  );
}
