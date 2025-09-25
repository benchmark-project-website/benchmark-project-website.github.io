
'use client';
import { useState } from "react";
type Entry = { title: string; bibtex: string; apa: string; mla: string };
export default function CitationBlock({ entries }:{ entries: Entry[] }){
  const [fmt, setFmt] = useState<"BibTeX"|"APA"|"MLA">("BibTeX");
  return (
    <div className="card">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="h3">Citations</div>
        <div className="flex gap-2">
          {["BibTeX","APA","MLA"].map(f => (
            <button key={f} onClick={()=>setFmt(f as any)} className={"badge " + (fmt===f ? "bg-gray-100" : "")}>{f}</button>
          ))}
        </div>
      </div>
      <div className="p-4 space-y-4">
        {entries.map((e,i)=>(
          <div key={i} className="space-y-2">
            <div className="font-medium">{e.title}</div>
            <pre className="bg-gray-50 p-3 rounded-xl overflow-x-auto text-sm"><code>
{fmt==="BibTeX" ? e.bibtex : fmt==="APA" ? e.apa : e.mla}
</code></pre>
          </div>
        ))}
      </div>
    </div>
  );
}
