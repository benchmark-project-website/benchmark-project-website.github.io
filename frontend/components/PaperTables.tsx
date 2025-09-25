// frontend/components/PaperTables.tsx
"use client";

import { Fragment, useState } from "react";

/* ----------------------------- Data ----------------------------- */

type Row1 = {
  llm: string;
  comp: string;   // Compilation (%)
  test: string;   // Test Pass (%)
  crash: string;  // Crash (%)
  allcorr: string;// All Correct (%)
  loc: string;    // #LOC
  tokens: string; // #Tokens
};

const proprietary: Row1[] = [
  { llm: "Claude-4-Opus",   comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "Claude-4-Sonnet", comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "Gemini-2.5-Pro",  comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "GPT-5 (low)",     comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "GPT-5 (medium)",  comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "GPT-5 (high)",    comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "OpenAI o3",       comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
];

const opensource: Row1[] = [
  { llm: "DeepSeek-R1",   comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "DeepSeek-V3.1", comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "GLM-4.5",       comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "Kimi K2",       comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "Minimax-M1",    comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
  { llm: "Qwen3-Coder",   comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", loc: "XXX", tokens: "XXX" },
];

type Row2 = {
  llm: string;
  comp: string;
  test: string;
  crash: string;
  allcorr: string;
  tokens: string; // K
};
type AgentBlock = { agent: string; rows: Row2[] };

const agents: AgentBlock[] = [
  {
    agent: "Mini-SWE",
    rows: [
      { llm: "DeepSeek-V3.1",  comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
      { llm: "Qwen-Coder",     comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
      { llm: "Gemini-2.5-Pro", comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
    ],
  },
  {
    agent: "Claude Code",
    rows: [
      { llm: "DeepSeek-V3.1",  comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
      { llm: "Qwen-Coder",     comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
      { llm: "Gemini-2.5-Pro", comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
    ],
  },
  {
    agent: "Gemini CLI",
    rows: [
      { llm: "DeepSeek-V3.1",  comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
      { llm: "Qwen-Coder",     comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
      { llm: "Gemini-2.5-Pro", comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
    ],
  },
  {
    agent: "Ours",
    rows: [
      { llm: "DeepSeek-V3.1",  comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
      { llm: "Qwen-Coder",     comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
      { llm: "Gemini-2.5-Pro", comp: "XX.X", test: "XX.X", crash: "XX.X", allcorr: "XX.X", tokens: "XX.X" },
    ],
  },
];

/* --------------------------------- Tools -------------------------------- */

type Dir = "asc" | "desc";

function parseNum(s: string): number {
  const n = parseFloat(String(s).replaceAll(",", ""));
  return Number.isFinite(n) ? n : NaN;
}
function cmp(a: number, b: number, dir: Dir) {
  if (Number.isNaN(a) && Number.isNaN(b)) return 0;
  if (Number.isNaN(a)) return 1; // 
  if (Number.isNaN(b)) return -1;
  return dir === "asc" ? a - b : b - a;
}
function cmpStr(a: string, b: string, dir: Dir) {
  return dir === "asc" ? a.localeCompare(b) : b.localeCompare(a);
}

const headBase = "px-3 py-2 text-left border-b border-gray-200 text-sm font-semibold text-gray-900 select-none cursor-pointer";
const td = "px-3 py-2 border-b border-gray-100";
const tdNum = td + " text-right font-mono";
const thNum = headBase + " text-right";
const rankTd = td + " text-right w-[56px] font-mono text-gray-600";

/* ---------------------------------- Table 1 ---------------------------------- */

type T1Key = "llm" | "comp" | "test" | "crash" | "allcorr" | "loc" | "tokens";

export function Table1ModelPerformance() {
  const [key, setKey] = useState<T1Key>("comp");
  const [dir, setDir] = useState<Dir>("desc");

  function sortRows(rows: Row1[]) {
    const r = [...rows];
    r.sort((a, b) => {
      if (key === "llm") return cmpStr(a.llm, b.llm, dir);
      return cmp(parseNum(a[key]), parseNum(b[key]), dir);
    });
    return r;
  }

  function onSort(k: T1Key) {
    if (k === key) setDir(dir === "asc" ? "desc" : "asc");
    else { setKey(k); setDir("desc"); }
  }

  const Arrow = ({active}:{active:boolean}) => (
    <span className="ml-1 inline-block text-xs align-middle">{active ? (dir === "asc" ? "▲" : "▼") : " "}</span>
  );

  const renderBlock = (title: string, rows: Row1[]) => {
    const sorted = sortRows(rows);
    return (
      <Fragment>
        <tr>
          <td colSpan={8} className="py-1">
            <div className="text-gray-600 italic pt-2">{title}</div>
          </td>
        </tr>
        {sorted.map((r, i) => (
          <tr key={title + r.llm}>
            <td className={rankTd}>{i + 1}</td>
            <td className={td}>{r.llm}</td>
            <td className={tdNum}>{r.comp}</td>
            <td className={tdNum}>{r.test}</td>
            <td className={tdNum}>{r.crash}</td>
            <td className={tdNum}>{r.allcorr}</td>
            <td className={tdNum}>{r.loc}</td>
            <td className={tdNum}>{r.tokens}</td>
          </tr>
        ))}
      </Fragment>
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-sm font-medium mb-2">
        Table 1: Performance of LLMs on <span className="italic">AppForge</span>.
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="align-bottom">
            <th className={headBase + " text-right w-[56px]"}>#</th>
            <th className={headBase} onClick={()=>onSort("llm")}>LLMs<Arrow active={key==="llm"}/></th>
            <th className={thNum} onClick={()=>onSort("comp")}>Compilation (%)<Arrow active={key==="comp"}/></th>
            <th className={thNum} onClick={()=>onSort("test")}>Test Pass (%)<Arrow active={key==="test"}/></th>
            <th className={thNum} onClick={()=>onSort("crash")}>Crash (%)<Arrow active={key==="crash"}/></th>
            <th className={thNum} onClick={()=>onSort("allcorr")}>All Correct (%)<Arrow active={key==="allcorr"}/></th>
            <th className={thNum} onClick={()=>onSort("loc")}>#LOC<Arrow active={key==="loc"}/></th>
            <th className={thNum} onClick={()=>onSort("tokens")}>#Tokens<Arrow active={key==="tokens"}/></th>
          </tr>
        </thead>
        <tbody>
          {renderBlock("Proprietary Models", proprietary)}
          {renderBlock("Open-source Models", opensource)}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------- Table 2 ---------------------------------- */

type T2Key = "llm" | "comp" | "test" | "crash" | "allcorr" | "tokens" | "agent";

export function Table2AgentComparison() {
  const [key, setKey] = useState<T2Key>("comp");
  const [dir, setDir] = useState<Dir>("desc");

  function sortGroupRows(rows: Row2[]) {
    const r = [...rows];
    r.sort((a, b) => {
      if (key === "llm") return cmpStr(a.llm, b.llm, dir);
      if (key === "agent") return 0; 
      return cmp(parseNum(a[key]), parseNum(b[key]), dir);
    });
    return r;
  }

  function sortBlocks(src: AgentBlock[]) {
    const blocks = src.map(b => ({ agent: b.agent, rows: sortGroupRows(b.rows) }));
    if (key === "agent") {
      blocks.sort((a, b) => cmpStr(a.agent, b.agent, dir));
    }
    return blocks;
  }

  function onSort(k: T2Key) {
    if (k === key) setDir(dir === "asc" ? "desc" : "asc");
    else { setKey(k); setDir("desc"); }
  }

  const Arrow = ({active}:{active:boolean}) => (
    <span className="ml-1 inline-block text-xs align-middle">{active ? (dir === "asc" ? "▲" : "▼") : " "}</span>
  );

  const blocks = sortBlocks(agents);

  return (
    <div className="mx-auto max-w-5xl mt-10">
      <div className="text-sm font-medium mb-2">
        Table 2: Performance comparison of coding agents with different LLMs on <span className="italic">AppForge</span> (%). Tokens are in K.
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className={headBase} onClick={()=>onSort("agent")}>Agent<Arrow active={key==="agent"}/></th>
            <th className={headBase}>#</th>
            <th className={headBase} onClick={()=>onSort("llm")}>LLM<Arrow active={key==="llm"}/></th>
            <th className={thNum} onClick={()=>onSort("comp")}>Comp. Rate<Arrow active={key==="comp"}/></th>
            <th className={thNum} onClick={()=>onSort("test")}>Test Pass<Arrow active={key==="test"}/></th>
            <th className={thNum} onClick={()=>onSort("crash")}>Crash Rate<Arrow active={key==="crash"}/></th>
            <th className={thNum} onClick={()=>onSort("allcorr")}>All Corr. Rate<Arrow active={key==="allcorr"}/></th>
            <th className={thNum} onClick={()=>onSort("tokens")}>Tokens (K)<Arrow active={key==="tokens"}/></th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => {
            const rows = block.rows;
            return (
              <Fragment key={block.agent}>
                {rows.map((r, i) => (
                  <tr key={block.agent + "-" + r.llm}>
                    {/* only in group */}
                    {i === 0 && (
                      <td className={td + " align-top font-medium"} rowSpan={rows.length}>
                        {block.agent}
                      </td>
                    )}
                    <td className={rankTd}>{i + 1}</td>
                    <td className={td}>{r.llm}</td>
                    <td className={tdNum}>{r.comp}</td>
                    <td className={tdNum}>{r.test}</td>
                    <td className={tdNum}>{r.crash}</td>
                    <td className={tdNum}>{r.allcorr}</td>
                    <td className={tdNum}>{r.tokens}</td>
                  </tr>
                ))}
                {/* blank */}
                <tr><td colSpan={8} className="py-1"></td></tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
