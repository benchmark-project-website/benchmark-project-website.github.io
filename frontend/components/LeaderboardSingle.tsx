'use client';

import React from "react";
import { rows as defaultRows, LAST_UPDATED, Row } from "@/data/leaderboard";

type Props = { rows?: Row[] };

function pct(v: number){ return `${v.toFixed(2)}%`; }
function ints(v: number){ return `${Math.round(v)}`; }

// simple sort
function useSort(data: Row[]) {
  const [sortKey, setKey] = React.useState<keyof Row>("success_cf");
  const [dir, setDir] = React.useState<"desc"|"asc">("desc");
  const sorted = React.useMemo(()=>{
    const copy = [...data];
    copy.sort((a,b)=>{
      const av = (a[sortKey] as number) ?? 0;
      const bv = (b[sortKey] as number) ?? 0;
      return dir === "desc" ? bv - av : av - bv;
    });
    return copy;
  },[data, sortKey, dir]);

  function onSort(k: keyof Row){
    if (k === sortKey) setDir(d=> d==="desc" ? "asc" : "desc");
    else { setKey(k); setDir("desc"); }
  }
  return { sorted, sortKey, dir, onSort };
}

export default function LeaderboardSingle({ rows = defaultRows }: Props) {
  const pros = rows.filter(r=>r.group==="proprietary");
  const open = rows.filter(r=>r.group==="open");
  const { sorted, sortKey, dir, onSort } = useSort([...pros, ...open]);

  // Download CSV
  function downloadCSV(){
    const header = ["Model","#File","#LOC","Compile%","Test Pass%","Crash%","Success%","#File(cf)","#LOC(cf)","Compile%(cf)","Test Pass%(cf)","Crash%(cf)","Success%(cf)"];
    const toRow = (r: Row) => [
      r.model, r.files_p1, r.loc_p1, r.compile_p1, r.test_p1, r.crash_p1, r.success_p1,
      r.files_cf, r.loc_cf, r.compile_cf, r.test_cf, r.crash_cf, r.success_cf
    ];
    const csv = [header, ...sorted.map(toRow)]
      .map(arr => arr.map(v=> typeof v==="string" ? `"${v.replace(/"/g,'""')}"` : v).join(","))
      .join("\n");
    const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "appforge_leaderboard.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  const ThBtn: React.FC<{label:string, col:keyof Row}> = ({label, col}) => (
    <button
      onClick={()=>onSort(col)}
      className="w-full text-center text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1"
      title="Click to sort"
    >
      {label}
      {sortKey===col && (dir==="desc" ? " ▼" : " ▲")}
    </button>
  );

  const SectionTitle: React.FC<{text:string}> = ({text})=>(
    <tr><td colSpan={13} className="bg-gray-50 border border-gray-200 px-3 py-2 italic text-gray-700">{text}</td></tr>
  );

  const RowTr: React.FC<{r:Row}> = ({r})=>(
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-200 px-3 py-2 font-medium">{r.model}</td>

      <td className="border border-gray-200 px-3 py-2 text-center">{ints(r.files_p1)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center">{ints(r.loc_p1)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center font-semibold">{pct(r.compile_p1)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center">{pct(r.test_p1)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center">{pct(r.crash_p1)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center">{pct(r.success_p1)}</td>

      <td className="border border-gray-200 px-3 py-2 text-center">{ints(r.files_cf)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center">{ints(r.loc_cf)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center font-semibold">{pct(r.compile_cf)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center">{pct(r.test_cf)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center">{pct(r.crash_cf)}</td>
      <td className="border border-gray-200 px-3 py-2 text-center font-semibold">{pct(r.success_cf)}</td>
    </tr>
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Table 1 · Performance of LLMs on <span className="italic">AppForge</span></h2>
          <p className="text-sm text-gray-600">Left: Pass@1 · Right: with Compilation Error Feedback</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</span>
          <button onClick={downloadCSV} className="px-3 py-1.5 rounded-md border hover:bg-gray-50 text-sm">Download CSV</button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[980px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th rowSpan={2} className="sticky top-0 z-10 bg-white border border-gray-200 px-3 py-2 text-left font-semibold">LLMs</th>
              <th colSpan={6} className="sticky top-0 z-10 bg-white border border-gray-200 px-3 py-2 text-center font-semibold">Pass@1</th>
              <th colSpan={6} className="sticky top-0 z-10 bg-white border border-gray-200 px-3 py-2 text-center font-semibold">with Compilation Error Feedback</th>
            </tr>
            <tr>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="#File" col="files_p1"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="#LOC" col="loc_p1"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="Compile" col="compile_p1"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="Test Pass" col="test_p1"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="Crash" col="crash_p1"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="Success" col="success_p1"/></th>

              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="#File" col="files_cf"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="#LOC" col="loc_cf"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="Compile" col="compile_cf"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="Test Pass" col="test_cf"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="Crash" col="crash_cf"/></th>
              <th className="sticky top-[40px] bg-white border border-gray-200 px-2 py-2"><ThBtn label="Success" col="success_cf"/></th>
            </tr>
          </thead>

          <tbody>
            {/* Proprietary */}
            <SectionTitle text="Proprietary Models" />
            {sorted.filter(r=>r.group==="proprietary").map(r=> <RowTr key={`pro-${r.model}`} r={r} />)}

            {/* Open-source */}
            <SectionTitle text="Open-source Models" />
            {sorted.filter(r=>r.group==="open").map(r=> <RowTr key={`open-${r.model}`} r={r} />)}
          </tbody>
        </table>
      </div>

      {/* FootNote */}
      <p className="text-xs text-gray-500 mt-2">
        Notes: Success indicates functionally correct apps. Percent values are shown as %.
      </p>
    </div>
  );
}
