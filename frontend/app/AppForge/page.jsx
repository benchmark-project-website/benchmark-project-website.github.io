
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
            <li>AppForge tests AI systems’ ability to develop complete Android applications from scratch.</li>
            <li>We construct tasks by collecting real-world mobile apps from F-Droid, a well-curated repository of open-source Android projects. Each task begins with a natural language specification describing the intended app functionality. The AI system must then generate a full Android codebase that implements the requested features.</li>
            <li>For each instance, we build a controlled execution environment with Dockerized harnesses. The generated code is compiled into an APK, installed on an emulator or device, and automatically tested with deterministic test suites. Evaluation is execution-based, measuring not only whether the app runs correctly but also whether it handles state management, lifecycle control, and asynchronous operations.</li>
            <li>AppForge differs from existing code benchmarks: instead of isolated function generation or localized program repair, it evaluates the end-to-end software engineering process. This includes design, implementation, debugging, and integration. By reflecting the challenges of real-world mobile development, AppForge provides the first benchmark to assess whether large language models are truly ready to act as next-generation software engineers.</li>
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
