
'use client';
import React, { useMemo, useState } from "react";

type Row = {
  dataset: string;
  model: string;
  resolved: number; // %
  org?: string;
  date?: string;    // YYYY-MM-DD
  logs?: boolean;
  trajs?: boolean;
  site?: boolean;
  release?: string;
};

type Props = {
  rows: Row[];
  selectedDataset?: string;
};

function Check({ v }: { v?: boolean }){
  return <span className={"inline-flex items-center justify-center w-5 h-5 rounded-md border " + (v ? "border-emerald-300 bg-emerald-50" : "border-gray-300 bg-white")}>
    {v ? "✓" : ""}
  </span>;
}

function HeaderCell({label, sortKey, sort, setSort}:{label:string; sortKey:keyof Row; sort:[keyof Row, "asc"|"desc"]; setSort: (k:keyof Row)=>void}){
  const [key, dir] = sort;
  const active = key === sortKey;
  return (
    <th>
      <button className="flex items-center gap-1 hover:underline" onClick={()=>setSort(sortKey)}>
        <span>{label}</span>
        {active && <span className="text-xs">{dir==="asc"?"▲":"▼"}</span>}
      </button>
    </th>
  );
}

export default function LeaderboardTable({ rows, selectedDataset }: Props){
  const [q, setQ] = useState("");
  const [sort, setSortState] = useState<[keyof Row, "asc"|"desc"]>(["resolved","desc"]);
  const setSort = (k: keyof Row) => {
    setSortState(([prev, dir]) => prev === k ? [k, dir==="asc"?"desc":"asc"] : [k, "desc"]);
  };

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    let r = rows;
    if (selectedDataset) r = r.filter(x => x.dataset === selectedDataset);
    r = r.filter(r => r.model.toLowerCase().includes(s) || (r.org||"").toLowerCase().includes(s));
    const [key, dir] = sort;
    return r.slice().sort((a,b)=>{
      const av = (a[key] as any);
      const bv = (b[key] as any);
      if (typeof av === "number" && typeof bv === "number"){
        return dir==="asc" ? av-bv : bv-av;
      }
      return dir==="asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [q, rows, selectedDataset, sort]);

  return (
    <div className="card overflow-hidden">
      <div className="p-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <div className="h3">Leaderboard</div>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Search model or org..."
          className="border border-gray-300 rounded-xl px-3 py-2 w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="tbl min-w-[900px]">
          <thead>
            <tr>
              <th>Rank</th>
              <HeaderCell label="Model" sortKey="model" sort={sort} setSort={setSort}/>
              <HeaderCell label="% Resolved" sortKey="resolved" sort={sort} setSort={setSort}/>
              <HeaderCell label="Org" sortKey="org" sort={sort} setSort={setSort}/>
              <HeaderCell label="Date" sortKey="date" sort={sort} setSort={setSort}/>
              <th>Logs</th>
              <th>Trajs</th>
              <th>Site</th>
              <HeaderCell label="Release" sortKey="release" sort={sort} setSort={setSort}/>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i)=>(
              <tr key={r.model + i}>
                <td className="font-mono text-sm">{i+1}</td>
                <td className="font-medium">{r.model}</td>
                <td className="font-mono">{r.resolved.toFixed(2)}</td>
                <td>{r.org || ""}</td>
                <td><span className="font-mono text-sm">{r.date || ""}</span></td>
                <td><Check v={r.logs}/></td>
                <td><Check v={r.trajs}/></td>
                <td><Check v={r.site}/></td>
                <td className="font-mono text-sm">{r.release || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 text-sm text-gray-600 space-y-2 border-t border-gray-200">
        <p><strong>Note.</strong> Table layout mirrors SWE-bench (columns & sorting). Rows are taken from your screenshot for the <em>Bash Only</em> tab so you can test now.</p>
      </div>
    </div>
  );
}
