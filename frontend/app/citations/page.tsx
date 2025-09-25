
import citations from "@/lib/data/citations.json";
import CitationBlock from "@/components/CitationBlock";
export default function CitationsPage(){
  return (
    <main className="section">
      <div className="container space-y-6">
        <h1 className="h1">Citations</h1>
        <p>Use the following citations when referencing AppForge Bench.</p>
        <CitationBlock entries={(citations as any).entries}/>
      </div>
    </main>
  );
}
