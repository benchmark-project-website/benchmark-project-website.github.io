
'use client';
import { useState } from "react";
export default function FilterBar({ scaffold, tags }:{ scaffold: string[]; tags: string[] }){
  const [s, setS] = useState(scaffold[0]);
  const [t, setT] = useState(tags[0]);
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <label className="text-sm">Scaffold</label>
      <select className="btn" value={s} onChange={e=>setS(e.target.value)}>
        {scaffold.map(x=> <option key={x}>{x}</option>)}
      </select>
      <label className="text-sm">Tags</label>
      <select className="btn" value={t} onChange={e=>setT(e.target.value)}>
        {tags.map(x=> <option key={x}>{x}</option>)}
      </select>
    </div>
  );
}
