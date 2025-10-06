
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Github, Youtube, Twitter } from "lucide-react";

export const metadata = {
  title: "AppForge Bench",
  description: "AppForge Bench website."
};

const brand = "#FF8A1F";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b" style={{background: brand}}>
          <div className="container flex items-center justify-between h-16 text-white">
            <Link href="/AppForge" className="flex items-center gap-2 font-semibold text-lg">
              {/* Site icon */}
              <Image src="/assets/appforge-icon.jpg" alt="AppForge" width={28} height={28} className="rounded-md" />
              <span>AppForge Bench</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="hover:underline text-white/90 hover:text-white" href="/leaderboard">Leaderboards</Link>
              <Link className="hover:underline text-white/90 hover:text-white" href="/AppForge">AppForge</Link>
              <Link className="hover:underline text-white/90 hover:text-white" href="/AppForge-Bench/">Docs</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-gray-200">
          <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">© {new Date().getFullYear()} AppForge Team. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
