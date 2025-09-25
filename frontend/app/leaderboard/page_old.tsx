
'use client';
import React, { useState } from "react";
import Image from "next/image";
import DatasetTabs from "@/components/DatasetTabs";
import FilterBar from "@/components/FilterBar";
import LeaderboardTable from "@/components/LeaderboardTable";
import Section from "@/components/Section";
import news from "@/lib/data/news.json";
import board from "@/lib/data/leaderboard.json";

const brand = "#FF8A1F";

export default function Page(){
  const [dataset, setDataset] = useState(board.datasets[0]);
  return (
    <main>
      {/* Brand banner with icon */}
      <section className="border-b" style={{background: brand}}>
        <div className="container py-6 flex items-center gap-3 text-white">
          <Image src="/assets/appforge-icon.jpg" alt="AppForge" width={36} height={36} className="rounded-md" />
          <h1 className="text-2xl md:text-3xl font-semibold">Leaderboards</h1>
        </div>
      </section>

      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container py-6">
          <p className="text-gray-700">Compare systems on AppForge Bench variants. Replace this text with your own description.</p>
          <div className="mt-4 flex flex-wrap gap-3 items-center">
            <DatasetTabs datasets={board.datasets} value={dataset} onChange={setDataset}/>
          </div>
          <div className="mt-4"><FilterBar scaffold={board.filters.scaffold} tags={board.filters.tags}/></div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-6">
          <LeaderboardTable rows={board.rows as any} selectedDataset={dataset}/>
          <div className="flex justify-end">
            <a className="btn" href="/analyze">Analyze Results in Detail</a>
          </div>
        </div>
      </section>

      <Section title="News">
        <ul className="space-y-2">
          {news.map((n, i)=>(
            <li key={i} className="flex items-start gap-3">
              <span className="badge">{n.date}</span>
              <a className="hover:underline" href={n.href}>{n.title}</a>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Acknowledgements">
        <p>Thank the institutions and collaborators who support AppForge. Replace with real names/logos.</p>
      </Section>
    </main>
  );
}
