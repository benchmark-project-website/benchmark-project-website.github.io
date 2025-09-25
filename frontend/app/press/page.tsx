
export default function PressPage(){
  const items = [
    {date: "2025-07-15", label: "Example Blog • Scaling Mobile UI Agents", href: "#"},
    {date: "2025-06-30", label: "Example Video • Inside AppForge Bench", href: "#"}
  ];
  return (
    <main className="section">
      <div className="container space-y-4">
        <h1 className="h1">Press</h1>
        <ul className="space-y-2">
          {items.map((it, i)=>(
            <li key={i} className="flex items-start gap-3">
              <span className="badge">{it.date}</span>
              <a href={it.href} className="hover:underline">{it.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
