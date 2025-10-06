'use client';

import Image from "next/image";

export default function AnalyzePage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b" style={{ background: "#feedd0", borderColor: "#f2d3b6" }}>
        <div className="container py-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Analyze Results</h1>
          <p className="text-gray-700 mt-2 max-w-4xl">
            We summarize key findings on <span className="font-medium">AppForge-Bench</span> with figures and tables from the paper.
            Overall, even frontier LLMs achieve modest success on full Android app development, while compilation
            feedback improves compile rates but not functional correctness proportionally. :contentReference[oaicite:0]{index=0}
          </p>
        </div>
      </section>

      {/* Key Findings */}
      <section className="section">
        <div className="container space-y-6">
          <h2 className="h2">Key Findings</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>
              <span className="font-medium">End-to-end development is hard:</span> best-performing model only reaches a
              sub-20% functional success rate; many generated apps still crash at runtime even after passing tests. :contentReference[oaicite:1]{index=1}
            </li>
            <li>
              <span className="font-medium">Compilation feedback helps compile rate</span> (large jumps for some models),
              yet <span className="italic">test pass</span> and <span className="italic">success</span> saturate after a few iterations. :contentReference[oaicite:2]{index=2}
            </li>
            <li>
              <span className="font-medium">Task complexity matters:</span> success decreases as LOC grows; simple apps can be
              robust with proactive exception handling. :contentReference[oaicite:3]{index=3}
            </li>
            <li>
              <span className="font-medium">“Evasion” behaviors:</span> some models delete faulty logic to pass compilation, harming
              functionality and runtime start-up. :contentReference[oaicite:4]{index=4}
            </li>
          </ul>
        </div>
      </section>

      {/* Figures grid */}
      <section className="section">
        <div className="container space-y-6">
          <h2 className="h2">Figures</h2>

          {/* row 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Figure
              src="/analyze/categories_pie.png"
              alt="Category distribution"
              title="Figure · Category Distribution"
              caption="AppForge tasks cover diverse Android app domains to reflect real practice."
            />
            <Figure
              src="/analyze/iter_refinement.png"
              alt="Iteration refinement effectiveness"
              title="Figure · Iterative Refinement"
              caption="Compilation rate increases over rounds, while Test-Pass/Success saturate after 2–3 iterations."
            />
          </div>

          {/* row 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Figure
              src="/analyze/loc_correlation.png"
              alt="LOC vs metrics"
              title="Figure · LOC vs. Metrics"
              caption="Higher complexity (more LOC) correlates with lower success; rolling means shown with uncertainty bands."
            />
            <Figure
              src="/analyze/pairwise_heatmaps.png"
              alt="Pairwise variance SWE vs AppForge"
              title="Figure · Model Differentiation"
              caption="AppForge provides stronger inter-model separation than SWE-bench on relative performance."
            />
          </div>

          {/* row 3 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Figure
              src="/analyze/compile_error_pies.png"
              alt="Compilation error distribution"
              title="Figure · Compilation Errors"
              caption="Android resource linking and related issues dominate; refinement shifts distribution but leaves residual failures."
            />
            <Figure
              src="/analyze/gpt5_defensive_code.png"
              alt="Defensive programming example"
              title="Figure · Defensive Programming"
              caption="Successful cases show proactive exception handling (e.g., fallback intents for settings navigation)."
            />
          </div>
        </div>
      </section>

      {/* Tables */}
      <section className="section">
        <div className="container space-y-10">
          <h2 className="h2">Tables</h2>

          {/* Table 2 */}
          <PaperCard
            title="Table 2 · Performance of Coding Agents on AppForge"
            note="SWE = mini-SWE-agent; CC = Claude Code."
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gray-50">
                    <Th text="Agent" left />
                    <Th text="LLM" left />
                    <Th text="#File" />
                    <Th text="#LOC" />
                    <Th text="Compile" />
                    <Th text="Test Pass" />
                    <Th text="Success" />
                  </tr>
                </thead>
                <tbody>
                  <Tr>
                    <Td> SWE </Td>
                    <Td> Claude-4-Opus </Td>
                    <Num>10.76</Num>
                    <Num>558.40</Num>
                    <Pct>71.29</Pct>
                    <Pct>24.61</Pct>
                    <Pct>11.88</Pct>
                  </Tr>
                  <Tr>
                    <Td> SWE </Td>
                    <Td> Qwen3-Coder </Td>
                    <Num>8.42</Num>
                    <Num>430.94</Num>
                    <Pct>88.12</Pct>
                    <Pct>22.21</Pct>
                    <Pct>6.93</Pct>
                  </Tr>
                  <Tr>
                    <Td> CC </Td>
                    <Td> Qwen3-Coder </Td>
                    <Num>5.34</Num>
                    <Num>280.66</Num>
                    <Pct>76.24</Pct>
                    <Pct>14.64</Pct>
                    <Pct>6.93</Pct>
                  </Tr>
                </tbody>
              </table>
            </div>
            <Caption>
              Agent frameworks provide modest gains at non-trivial cost; absolute success remains low. :contentReference[oaicite:5]{index=5}
            </Caption>
          </PaperCard>

          {/* Table 3 */}
          <PaperCard title="Table 3 · GPT-5 Reasoning Levels on AppForge">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gray-50">
                    <Th text="Level" left />
                    <Th text="#File" />
                    <Th text="#LOC" />
                    <Th text="Compile" />
                    <Th text="Test Pass" />
                    <Th text="Success" />
                  </tr>
                </thead>
                <tbody>
                  <Tr>
                    <Td>Low</Td>
                    <Num>5.91</Num>
                    <Num>280.91</Num>
                    <Pct>22.77</Pct>
                    <Pct>8.41</Pct>
                    <Pct>2.97</Pct>
                  </Tr>
                  <Tr>
                    <Td>Medium</Td>
                    <Num>7.61</Num>
                    <Num>321.96</Num>
                    <Pct>27.72</Pct>
                    <Pct>11.11</Pct>
                    <Pct>3.96</Pct>
                  </Tr>
                  <Tr>
                    <Td>High</Td>
                    <Num>7.76</Num>
                    <Num>354.59</Num>
                    <Pct>45.54</Pct>
                    <Pct>21.90</Pct>
                    <Pct>14.85</Pct>
                  </Tr>
                </tbody>
              </table>
            </div>
            <Caption>
              Increasing reasoning helps across metrics, but still far from practical for Android development. :contentReference[oaicite:6]{index=6}
            </Caption>
          </PaperCard>

          {/* Table 4 */}
          <PaperCard title="Table 4 · Runtime Crash Analysis across LLMs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gray-50">
                    <Th text="Model" left />
                    <Th text="Native Crash (w/o Fix)" />
                    <Th text="Native Crash (w/ Fix)" />
                    <Th text="Failed to Start (w/o Fix)" />
                    <Th text="Failed to Start (w/ Fix)" />
                  </tr>
                </thead>
                <tbody>
                  <Tr>
                    <Td>GPT-4.1</Td>
                    <Num>0.0</Num>
                    <Num>11.0</Num>
                    <Num>2.0</Num>
                    <Num>66.0</Num>
                  </Tr>
                  <Tr>
                    <Td>Claude-Opus</Td>
                    <Num>48.0</Num>
                    <Num>48.0</Num>
                    <Num>9.0</Num>
                    <Num>11.0</Num>
                  </Tr>
                  <Tr>
                    <Td>Gemini-Pro</Td>
                    <Num>25.0</Num>
                    <Num>37.0</Num>
                    <Num>14.0</Num>
                    <Num>21.0</Num>
                  </Tr>
                  <Tr>
                    <Td>GPT-5-High</Td>
                    <Num>21.0</Num>
                    <Num>0.0</Num>
                    <Num>5.0</Num>
                    <Num>25.0</Num>
                  </Tr>
                </tbody>
              </table>
            </div>
            <Caption>
              Evasive “compile-only” fixes often backfire at runtime (e.g., fail-to-start spikes), while many crashes are native rather than Java exceptions. :contentReference[oaicite:7]{index=7}
            </Caption>
          </PaperCard>

          <p className="text-xs text-gray-500">
            * Percentages shown as %; tables/typesetting are faithful to the paper but simplified for web readability.
          </p>
        </div>
      </section>
    </main>
  );
}

/* ---------- Small building blocks ---------- */

function Figure(props: { src: string; alt: string; title: string; caption?: string }) {
  const { src, alt, title, caption } = props;
  return (
    <figure className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="relative w-full h-auto aspect-[16/11]">
        <Image src={src} alt={alt} fill className="object-contain rounded-lg" />
      </div>
      <figcaption className="mt-2 text-sm text-gray-600">
        <span className="font-medium">{title}.</span> {caption}
      </figcaption>
    </figure>
  );
}

function PaperCard(props: { title: string; note?: string; children: React.ReactNode }) {
  const { title, note, children } = props;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-4 pt-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {note && <p className="text-sm text-gray-500 mt-1">{note}</p>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/* table atoms */
function Th({ text, left = false }: { text: string; left?: boolean }) {
  return (
    <th
      className={`border border-gray-200 px-3 py-2 text-sm ${
        left ? "text-left" : "text-right tabular-nums"
      }`}
    >
      {text}
    </th>
  );
}
function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-slate-50">{children}</tr>;
}
function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-gray-200 px-3 py-2 text-sm text-left align-middle">
      {children}
    </td>
  );
}
function Num({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-gray-200 px-3 py-2 text-sm text-right tabular-nums align-middle">
      {children}
    </td>
  );
}
function Pct({ children }: { children: number | string }) {
  const v = typeof children === "number" ? `${children.toFixed(2)}%` : `${children}%`;
  return (
    <td className="border border-gray-200 px-3 py-2 text-sm text-right tabular-nums align-middle">
      {v}
    </td>
  );
}
function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-500 px-4 pb-4 -mt-2">{children}</p>;
}
