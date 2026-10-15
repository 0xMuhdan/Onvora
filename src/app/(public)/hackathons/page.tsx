"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

const HACKATHONS = [
  {
    id: "eth-global-sprint",
    title: "Ethereum Global Sprint 2026",
    host: "Ethereum Ecosystem Partners",
    prizePool: "$75,000 USD",
    dates: "Nov 14 – 28, 2026",
    tracks: ["DeFi Infrastructure", "Zero-Knowledge", "Account Abstraction"],
    status: "Registration Opening Soon",
    requiredCourse: "Ethereum Developer Track (Phase 01–05)",
    desc: "Bangun dApp produksi mandiri dalam 14 hari. Tim terbaik akan dipresentasikan langsung di hadapan investor global dan audit partner.",
  },
  {
    id: "defi-security-bounty",
    title: "Smart Contract Security Challenge",
    host: "Veritas Protocol Foundation",
    prizePool: "$30,000 USD",
    dates: "Dec 05 – 12, 2026",
    tracks: ["Exploit Defense", "Fuzzing Invariants", "EVM Optimization"],
    status: "Upcoming Event",
    requiredCourse: "Ethereum Developer Track (Level B)",
    desc: "Pecahkan 10 skenario exploit tersembunyi pada protokol lending simulasi dan ajukan mitigasi pull request.",
  },
  {
    id: "campus-builder-league",
    title: "Indonesia Web3 Campus League",
    host: "Onvora Builder Circles",
    prizePool: "$15,000 USD + Grants",
    dates: "Jan 10 – 24, 2027",
    tracks: ["Real-World Utilities", "Public Goods", "DeSci"],
    status: "Announced",
    requiredCourse: "Ethereum Developer Track (Completed)",
    desc: "Ajang pembuktian mahasiswa dan pemula untuk membangun protokol publik nyata tanpa biaya gas sepeser pun.",
  },
];

export default function HackathonsPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const hasCapstoneEscrow = !!localStorage.getItem("onvora_capstone_completed_escrow");
        const hasCapstoneAMM = !!localStorage.getItem("onvora_capstone_completed_amm");
        const hasCompletedLesson = !!localStorage.getItem("onvora_lesson_lesson-eth-fund-01-01");

        if (hasCapstoneEscrow || hasCapstoneAMM || hasCompletedLesson) {
          setIsUnlocked(true);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="max-w-3xl mb-12">
          <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
            Ecosystem Hackathons
          </h1>
          <p className={cn("mt-4 text-neutral-400", typeClass("body"))}>
            Tunjukkan hasil karya Anda ke panggung dunia. Dapatkan hadiah tunai (*grant prizes*), mentoring intensif praktisi, dan koneksi langsung ke ekosistem investor global tanpa rasa cemas.
          </p>
        </div>

        {/* Gate Banner (Dynamic Unlocked or Locked) */}
        {isUnlocked ? (
          <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/[0.05] p-6 sm:p-8 mb-10 backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-2xl">
                  🔓
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={cn("font-bold text-white", typeClass("title"))}>
                      Registration Gate: UNLOCKED
                    </h3>
                    <span className={cn("rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-bold text-emerald-400 font-mono", typeClass("micro"))}>
                      ● LEVEL B VERIFIED
                    </span>
                  </div>
                  <p className={cn("mt-1 text-neutral-300 max-w-2xl", typeClass("body"))}>
                    Selamat! Akun Anda memenuhi syarat kompetensi untuk mendaftar hackathon ekosistem. Pilih ajang di bawah ini untuk membentuk tim atau mendaftar mandiri.
                  </p>
                </div>
              </div>

              <Link
                href="/passport"
                className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-emerald-400 px-6 py-3 font-semibold text-black hover:bg-emerald-300 transition-all shadow-md", typeClass("caption"))}
              >
                Cek Builder Passport &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/[0.04] p-6 sm:p-8 mb-10 backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-2xl">
                  🔒
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={cn("font-bold text-white", typeClass("title"))}>
                      Registration Gate: Locked
                    </h3>
                    <span className={cn("rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold text-amber-300", typeClass("micro"))}>
                      REQUIRES 1 COURSE
                    </span>
                  </div>
                  <p className={cn("mt-1 text-neutral-300 max-w-2xl", typeClass("body"))}>
                    Pendaftaran hackathon dikhususkan untuk pembangun yang telah menyelesaikan minimal <strong>1 Course (Ethereum Developer Track)</strong>. Hal ini memastikan setiap tim memiliki kompetensi koding riil untuk bersaing memenangkan prize pool.
                  </p>
                </div>
              </div>

              <Link
                href="/tracks/ethereum"
                className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-neutral-200 transition-all shadow-[0_0_20px_-3px_rgba(255,255,255,0.4)]", typeClass("caption"))}
              >
                Start Ethereum Track &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Hackathons Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HACKATHONS.map((h) => (
            <div
              key={h.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                  <span className={cn("font-semibold text-[#5e6ad2]", typeClass("caption"))}>
                    {h.host}
                  </span>
                  <span className={cn("rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-neutral-400 font-mono", typeClass("micro"))}>
                    {h.status}
                  </span>
                </div>

                <h2 className={cn("font-bold text-white tracking-tight group-hover:text-white", typeClass("title"))}>
                  {h.title}
                </h2>

                <p className={cn("mt-2.5 text-neutral-400", typeClass("body"))}>
                  {h.desc}
                </p>

                <div className="mt-4 p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                  <p className={cn("text-neutral-500 font-mono", typeClass("micro"))}>Prize Pool</p>
                  <p className={cn("font-bold text-white mt-0.5", typeClass("subtitle"))}>{h.prizePool}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {h.tracks.map((track) => (
                    <span
                      key={track}
                      className={cn("rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5 text-neutral-400 font-mono", typeClass("micro"))}
                    >
                      {track}
                    </span>
                  ))}
                </div>
              </div>

              <div className={cn("mt-6 pt-4 border-t border-white/5 flex items-center justify-between", typeClass("caption"))}>
                <span className="text-neutral-500 font-mono">{h.dates}</span>
                {isUnlocked ? (
                  <Link
                    href="/passport"
                    className={cn("inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-emerald-300 font-bold hover:bg-emerald-500/20 transition-all", typeClass("caption"))}
                  >
                    <span>Daftar Tim &rarr;</span>
                  </Link>
                ) : (
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-neutral-400 font-medium cursor-not-allowed", typeClass("micro"))}>
                    <span>🔒</span>
                    <span>Locked</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
