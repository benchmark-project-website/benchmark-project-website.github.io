'use client';

import React from "react";
import { rows as defaultRows, LAST_UPDATED, Row } from "@/data/leaderboard";

type Props = { rows?: Row[] };

const numCls = "text-right tabular-nums";

function pct(v: number){ return `${v.toFixed(2)}%`; }
function ints(v: number){ return `${Math.round(v)}`; }

function useSort(data: Row[]) {
  const [sortKey, setKey] = React.useState<keyof Row>("success_cf");
  const [dir, setDir] = React.useState<"desc"|"asc">("desc");
  const sorted = React.useMemo(()=>{
    const a = [...data];
    a.sort((x,y)=>{
      const xv = (x[sortKey] as number) ?? 0;
      const yv = (y[sortKey] as number) ?? 0;
      return dir === "desc" ? yv - xv : xv - yv;
    });
    return a;
  }, [data, sortKey, dir]);
  const onSort = (k: keyof Row) => setKey(k === sortKey ? k : k), toggle = () => setDir(d=> d==="desc"?"asc":"desc");
  return { sorted, sortKey, dir, onSort, toggle };
}

function bestBy<T extends keyof Row>(rows: Row[], keys: T[]) {
  // max_highlight
  const map = new Map<T, number>();
  keys.forEach(k=>{
    map.set(k, Math.max(...rows.map(r => (r[k] as number) ?? -Infinity)));
  });
  return map;
}

export default function LeaderboardSingle({ rows = defaultRows }: Props) {
  const pros = rows.filter(r=>r.group==="proprietary");
  const open = rows.filter(r=>r.group==="open");
  const all = [...pros, ...open];

  const passCols: (keyof Row)[] = ["files_p1","loc_p1","compile_p1","test_p1","crash_p1","success_p1"];
  const cfCols: (keyof Row)[]   = ["files_cf","loc_cf","compile_cf","test_cf","crash_cf","success_cf"];

  const bestPass = bestBy(all, passCols);
  const bestCF   = bestBy(all, cfCols);

  const { sorted, sortKey, dir, onSort, toggle } = useSort(all);

  const Th: React.FC<{label:string; col?: keyof Row; align?: "left"|"right"|"center"}> = ({label,col,align="center"}) => (
    <th className={`sticky top-[40px] bg-white border border-gray-200 px-2 py-2 text-sm ${align==="right"?numCls:align==="left"?"text-left":"text-center"}`}>
      {col ? (
        <button
          onClick={()=>{ onSort(col!); toggle(); }}
          className="inline-flex items-center gap-1 hover:text-gray-900 text-gray-600"
          title="Click to sort"
        >
          {label}
          {sortKey===col && <span className="text-xs">{dir==="desc" ? "▼" : "▲"}</span>}
        </button>
      ) : label}
    </th>
  );

  const Section: React.FC<{title:string}> = ({title})=>(
    <tr>
      <td colSpan={13} className="bg-gray-50/70 border border-gray-200 px-3 py-2 text-gray-700 italic">
        {title}
      </td>
    </tr>
  );

  const Cell = (props: {value:number; isBest:boolean; isPct?:boolean})=>{
    const { value, isBest, isPct } = props;
    const text = isPct ? pct(value) : ints(value);
    return (
      <td className={`border border-gray-200 px-3 py-2 ${numCls} ${isBest ? "bg-amber-50 font-semibold rounded-[2px]" : ""}`}>
        {text}
      </td>
    );
  };

  return (
    <div className="w-full">
      {/* top info */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-white to-slate-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">Table 1 · Performance of LLMs on <span className="italic">AppForge</span></h2>
          <p className="text-sm text-gray-600">Left: Pass@1 · Right: with Compilation Error Feedback</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</span>
          <button
            onClick={()=>{
              const header = ["Model","#File","#LOC","Compile%","Test Pass%","Crash%","Success%","#File(cf)","#LOC(cf)","Compile%(cf)","Test Pass%(cf)","Crash%(cf)","Success%(cf)"];
              const body = sorted.map(r=>[
                r.model,r.files_p1,r.loc_p1,r.compile_p1,r.test_p1,r.crash_p1,r.success_p1,
                r.files_cf,r.loc_cf,r.compile_cf,r.test_cf,r.crash_cf,r.success_cf
              ]);
              const csv = [header, ...body].map(row=>row.join(",")).join("\n");
              const url = URL.createObjectURL(new Blob([csv], {type:"text/csv"}));
              const a = document.createElement("a"); a.href=url; a.download="appforge_leaderboard.csv"; a.click(); URL.revokeObjectURL(url);
            }}
            className="px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-sm shadow-sm"
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* table card */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[1000px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th rowSpan={2} className="sticky top-0 z-10 bg-white border border-gray-200 px-3 py-2 text-left font-semibold">
                LLMs
              </th>
              <th colSpan={6} className="sticky top-0 z-10 bg-white border border-gray-200 px-3 py-2 text-center font-semibold">
                Pass@1
              </th>
              <th colSpan={6} className="sticky top-0 z-10 bg-white border border-gray-200 px-3 py-2 text-center font-semibold">
                with Compilation Error Feedback
              </th>
            </tr>
            <tr>
              <Th label="#File" col="files_p1" />
              <Th label="#LOC"  col="loc_p1"  />
              <Th label="Compile" col="compile_p1" />
              <Th label="Test Pass" col="test_p1" />
              <Th label="Crash" col="crash_p1" />
              <Th label="Success" col="success_p1" />
              <Th label="#File" col="files_cf" />
              <Th label="#LOC"  col="loc_cf"  />
              <Th label="Compile" col="compile_cf" />
              <Th label="Test Pass" col="test_cf" />
              <Th label="Crash" col="crash_cf" />
              <Th label="Success" col="success_cf" />
            </tr>
          </thead>

          <tbody>
            <Section title="Proprietary Models" />
            {sorted.filter(r=>r.group==="proprietary").map(r=>(
              <tr key={`pro-${r.model}`} className="hover:bg-slate-50">
                <td className="sticky left-0 bg-white border border-gray-200 px-3 py-2 font-medium">{r.model}</td>

                <Cell value={r.files_p1} isBest={r.files_p1===bestPass.get("files_p1")} />
                <Cell value={r.loc_p1}   isBest={r.loc_p1===bestPass.get("loc_p1")} />
                <Cell value={r.compile_p1} isBest={r.compile_p1===bestPass.get("compile_p1")} isPct />
                <Cell value={r.test_p1}    isBest={r.test_p1===bestPass.get("test_p1")} isPct />
                <Cell value={r.crash_p1}   isBest={false} isPct />
                <Cell value={r.success_p1} isBest={r.success_p1===bestPass.get("success_p1")} isPct />

                <Cell value={r.files_cf} isBest={r.files_cf===bestCF.get("files_cf")} />
                <Cell value={r.loc_cf}   isBest={r.loc_cf===bestCF.get("loc_cf")} />
                <Cell value={r.compile_cf} isBest={r.compile_cf===bestCF.get("compile_cf")} isPct />
                <Cell value={r.test_cf}    isBest={r.test_cf===bestCF.get("test_cf")} isPct />
                <Cell value={r.crash_cf}   isBest={false} isPct />
                <Cell value={r.success_cf} isBest={r.success_cf===bestCF.get("success_cf")} isPct />
              </tr>
            ))}

            <Section title="Open-source Models" />
            {sorted.filter(r=>r.group==="open").map(r=>(
              <tr key={`open-${r.model}`} className="hover:bg-slate-50">
                <td className="sticky left-0 bg-white border border-gray-200 px-3 py-2 font-medium">{r.model}</td>

                <Cell value={r.files_p1} isBest={r.files_p1===bestPass.get("files_p1")} />
                <Cell value={r.loc_p1}   isBest={r.loc_p1===bestPass.get("loc_p1")} />
                <Cell value={r.compile_p1} isBest={r.compile_p1===bestPass.get("compile_p1")} isPct />
                <Cell value={r.test_p1}    isBest={r.test_p1===bestPass.get("test_p1")} isPct />
                <Cell value={r.crash_p1}   isBest={false} isPct />
                <Cell value={r.success_p1} isBest={r.success_p1===bestPass.get("success_p1")} isPct />

                <Cell value={r.files_cf} isBest={r.files_cf===bestCF.get("files_cf")} />
                <Cell value={r.loc_cf}   isBest={r.loc_cf===bestCF.get("loc_cf")} />
                <Cell value={r.compile_cf} isBest={r.compile_cf===bestCF.get("compile_cf")} isPct />
                <Cell value={r.test_cf}    isBest={r.test_cf===bestCF.get("test_cf")} isPct />
                <Cell value={r.crash_cf}   isBest={false} isPct />
                <Cell value={r.success_cf} isBest={r.success_cf===bestCF.get("success_cf")} isPct />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Notes: Success indicates functionally correct apps. Percent values are shown as %.
      </p>
    </div>
  );
}
