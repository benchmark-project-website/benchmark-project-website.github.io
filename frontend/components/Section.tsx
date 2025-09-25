
export default function Section({ title, children }:{ title: string; children: React.ReactNode }){
  return (
    <section className="section">
      <div className="container">
        <h2 className="h2 mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
      </div>
    </section>
  );
}
