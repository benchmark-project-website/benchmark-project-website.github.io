
'use client';
import React from "react";

type Props = {
  datasets: string[];
  value?: string;
  onChange?: (v: string) => void;
};
export default function DatasetTabs({ datasets, value, onChange }: Props) {
  const active = value ?? datasets[0];
  return (
    <div className="flex flex-wrap gap-2">
      {datasets.map(d => (
        <button
          key={d}
          onClick={()=> onChange?.(d)}
          className={
            "badge " + (active === d ? "bg-gray-100 ring-1 ring-gray-300" : "")
          }
          aria-pressed={active===d}
        >
          {d}
        </button>
      ))}
    </div>
  );
}
