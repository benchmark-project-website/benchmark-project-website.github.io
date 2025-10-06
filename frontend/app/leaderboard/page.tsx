'use client';

import Image from "next/image";
import LeaderboardSingle from "@/components/LeaderboardSingle";

export default function Page(){
  return (
    <main>
      {/* top */}
      <section className="border-b" style={{ background: "#feedd0", borderColor: "#f2d3b6" }}>
        <div className="container py-4">
          <div className="flex items-center" style={{ columnGap: 16 }}>
            <div className="shrink-0" style={{ width: 144 }}>
              <Image src="/assets/appforge-icon.jpg" alt="AppForge" width={144} height={144} className="rounded-2xl" priority />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Leaderboards</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LeaderboardSingle />
        </div>
      </section>
    </main>
  );
}
