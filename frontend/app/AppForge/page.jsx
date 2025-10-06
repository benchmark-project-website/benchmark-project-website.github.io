
import Image from "next/image";

export default function Page() {
  const models = [
    { key: "deepseekv3", title: "deepseekv3" },
    { key: "kimik2", title: "kimik2" },
    { key: "qwen3coder", title: "qwen3coder" }
  ];
  const shots = ["shot1.jpg","shot2.jpg","shot3.jpg","shot4.jpg"];

  // Portrait-first layout
  const gridStyle = { display: "grid", gridTemplateColumns: "160px repeat(4, 120px)", gap: "12px" };
  const thumbWrapStyle = { width: "120px", aspectRatio: "9 / 16", borderRadius: "10px", border: "2px solid #e5e7eb", overflow: "hidden", background: "#fff" };
  const imgStyle = { width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#f8fafc" };

  return (
    <main>
      {/* Hero */}
      <section className="border-b" style={{ background: "#feedd0", borderColor: "#f2d3b6" }}>
        <div className="container py-4">
          <div className="flex items-center" style={{ columnGap: 16 }}>
            <div className="shrink-0 p-2 md:p-3" style={{ width: 144 }}>
              <Image
                src="/assets/appforge-icon.jpg"
                alt="AppForge icon"
                width={144}
                height={144}
                className="rounded-2xl"   
                priority
              />
            </div>
      
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">AppForge Bench</h1>
              <p className="text-gray-700 max-w-3xl">
                APPFORGE: FROM ASSISTANT TO INDEPENDENT DEVELOPER — ARE LLMS READY FOR SOFTWARE DEVELOPMENT?
              </p>
              <div className="flex flex-wrap gap-2">
                <a className="btn" href="/leaderboard">Open Leaderboards</a>
                <a className="btn" href="/analyze">Results Viewer</a>
                <a className="btn" href="/AppForge-Bench/">Docs</a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Overview */}
      <section className="section">
        <div className="container space-y-4">
          <h2 className="h2">Overview</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Large language models (LLMs) have demonstrated remarkable capability in function-level code generation tasks. Unlike isolated functions, real-world applications demand reasoning over the entire software system: developers must orchestrate how different components interact, maintain consistency across states over time, and ensure the application behaves correctly within the lifecycle and framework constraints. Yet, no existing benchmark adequately evaluates whether LLMs can bridge this gap and construct entire software systems from scratch. </li>
            <li>To address this gap, we propose AppForge, a benchmark consisting of 101 software development problems drawn from real-world Android apps. Given a natural language specification detailing the app functionality, a language model is tasked with implementing the functionality into an Android app from scratch. Developing an Android app from scratch requires understanding and coordinating app states, lifecycle management, and asynchronous operations, calling for LLMs to generate context-aware, robust, and maintainable code. To construct APPFORGE, we design a multi-agent system to automatically summarize the main functionalities from app documents and navigate the app to synthesize test cases validating the functional correctness of app implementation. Following rigorous manual verification by Android development experts, APPFORGE incorporates the test cases within an automated evaluation framework that enables reproducible assessment without human intervention, making it easily adoptable for future research. Our evaluation on 12 flagship LLMs shows that all evaluated models achieve low effectiveness, with the best-performing model (GPT-5) developing only 18.8% functionally correct applications, highlighting fundamental limitations in current models’ ability to handle complex, multi-component software engineering challenges.</li>
          </ul>
        </div>
      </section>
      {/* Overview image - centered & same width as text */}
      <section className="bg-transparent">
        <div className="container pt-3 pb-0">
          <div className="mx-auto max-w-3xl">
            <figure className="rounded-xl border border-gray-200 bg-white p-3">
              <img
                src="/assets/overview.png"
                alt="AppForge workflow diagram"
                className="block w-full h-auto rounded-lg shadow"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Demo: portrait comparison grid */}
      <section className="section">
        <div className="container space-y-4">
          <h2 className="h2">Demo</h2>
          <p className="text-gray-600">
            Upload 12 screenshots to <code>frontend/public/demo/&lt;model&gt;/shot1.jpg..shot4.jpg</code> (portrait 9:16 recommended).
          </p>

          <div className="overflow-x-auto">
            <div style={gridStyle}>
              <div></div>
              {shots.map((s, i)=>(
                <div key={s} style={{ textAlign: "center", fontSize: "12px", color: "#6b7280", paddingTop: "4px" }}>Shot {i+1}</div>
              ))}

              {models.map((m)=> (
                <>
                  {/* label cell */}
                  <div key={m.key + '-label'} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "8px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 600 }}>{m.title}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>LLM output screenshots</div>
                    </div>
                  </div>

                  {/* 4 thumbnails (portrait) */}
                  {shots.map((s)=> (
                    <div key={m.key + '-' + s} style={thumbWrapStyle}>
                      <img
                        src={`/demo/${m.key}/${s}`}
                        alt={`${m.title} ${s}`}
                        style={imgStyle}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
            Suggested original image ratio: 9:16. Thumbnails are 120px wide and keep portrait orientation.
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section">
        <div className="container space-y-4">
          <h2 className="h2">Resources</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><a className="hover:underline" href="/AppForge-Bench/">Documentation</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
