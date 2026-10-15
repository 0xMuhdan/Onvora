"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

const JOBS = [
  {
    id: "solidity-engineer",
    title: "Junior Solidity Engineer",
    company: "Aura Network Labs",
    location: "Remote (Global / ID)",
    salary: "$4,500 – $7,000 / mo",
    type: "Full-Time",
    tags: ["Solidity", "Foundry", "ERC Standards"],
    requiredEvidence: "Ethereum Track Completed (Level B Verified)",
    desc: "Membangun dan memelihara modul core smart contract DeFi, staking pool, dan automated settlement engine.",
  },
  {
    id: "security-auditor",
    title: "Junior Smart Contract Auditor",
    company: "Veritas Protocol Security",
    location: "Remote",
    salary: "$5,000 – $8,500 / mo",
    type: "Full-Time",
    tags: ["Security", "Fuzzing", "Reentrancy Guard"],
    requiredEvidence: "Ethereum Security & Testing (Level B-A)",
    desc: "Melakukan vulnerability triage, menulis automated fuzz tests, dan mereview pull request smart contract sebelum deploy.",
  },
  {
    id: "web3-frontend",
    title: "Web3 Frontend Engineer",
    company: "Nexus DEX Infrastructure",
    location: "Hybrid (Jakarta / Remote)",
    salary: "$3,000 – $5,000 / mo",
    type: "Full-Time",
    tags: ["Viem", "Wagmi", "React", "EVM"],
    requiredEvidence: "Ethereum Track Completed (Level B)",
    desc: "Menghubungkan antarmuka trading dApp ke smart contract Ethereum via Viem, Wagmi, dan RPC indexing.",
  },
  {
    id: "ecosystem-researcher",
    title: "Ecosystem Technical Researcher",
    company: "Meridian Foundation",
    location: "Remote",
    salary: "$3,500 – $6,000 / mo",
    type: "Contract",
    tags: ["EVM Architecture", "Layer 2", "DeFi"],
    requiredEvidence: "Ethereum Foundations & Capstone",
    desc: "Menganalisis arsitektur protokol baru, menyusun dokumentasi teknikal developer, dan menguji dApp testnet.",
  },
];

export default function JobsPage() {
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
            Web3 Career Opportunities
          </h1>
          <p className={cn("mt-4 text-neutral-400", typeClass("body"))}>
            Dapatkan akses langsung ke lowongan kerja dari mitra ekosistem terverifikasi. Tidak perlu mengirim CV kosong atau sertifikat PDF—hiring partner merekrut langsung berbasis <strong>Evidence Ledger</strong> Anda.
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
                      Direct Apply Gate: UNLOCKED
                    </h3>
                    <span className={cn("rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-bold text-emerald-400 font-mono", typeClass("micro"))}>
                      ● LEVEL B VERIFIED
                    </span>
                  </div>
                  <p className={cn("mt-1 text-neutral-300 max-w-2xl", typeClass("body"))}>
                    Selamat! Bukti kompetensi Ethereum Anda telah terverifikasi di Evidence Ledger. Anda dapat langsung mengirimkan profil <strong>Builder Passport</strong> Anda ke hiring manager partner.
                  </p>
                </div>
              </div>

              <Link
                href="/passport"
                className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-emerald-400 px-6 py-3 font-semibold text-black hover:bg-emerald-300 transition-all shadow-md", typeClass("caption"))}
              >
                Buka Builder Passport &rarr;
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
                      Direct Apply Gate: Locked
                    </h3>
                    <span className={cn("rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold text-amber-300", typeClass("micro"))}>
                      REQUIRES 1 COURSE
                    </span>
                  </div>
                  <p className={cn("mt-1 text-neutral-300 max-w-2xl", typeClass("body"))}>
                    Fitur pelamaran kerja dan rekomendasi otomatis ke hiring manager akan terbuka penuh setelah Anda menyelesaikan <strong>1 Course (Ethereum Developer Track)</strong>. Selesaikan materi untuk mendapatkan verifikasi Level B di Evidence Ledger.
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

        {/* Opportunity Job Cards Grid */}
        <div className="space-y-4">
          <div className={cn("flex items-center justify-between border-b border-white/10 pb-3 text-neutral-400 font-mono", typeClass("caption"))}>
            <span>Verified Partner Opportunities ({JOBS.length})</span>
            <span>Match Engine: Evidence-Based</span>
          </div>

          {JOBS.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 hover:border-white/20 transition-all relative overflow-hidden group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className={cn("font-bold text-white group-hover:text-white", typeClass("title"))}>
                      {job.title}
                    </h2>
                    <span className={cn("font-semibold text-[#5e6ad2]", typeClass("subtitle"))}>
                      {job.company}
                    </span>
                    <span className={cn("rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-neutral-400", typeClass("micro"))}>
                      {job.type}
                    </span>
                  </div>

                  <p className={cn("text-neutral-400 max-w-3xl", typeClass("body"))}>
                    {job.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn("rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1 text-neutral-300 font-mono", typeClass("micro"))}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Meta & Action */}
                <div className="flex lg:flex-col items-start lg:items-end justify-between lg:justify-start gap-3 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                  <span className={cn("font-bold text-white", typeClass("subtitle"))}>
                    {job.salary}
                  </span>
                  <span className={cn("text-neutral-500 font-mono", typeClass("caption"))}>
                    {job.location}
                  </span>
                  <div className="mt-2 flex items-center gap-2">
                    {isUnlocked ? (
                      <Link
                        href="/passport"
                        className={cn("inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-emerald-300 font-bold hover:bg-emerald-500/20 transition-all", typeClass("caption"))}
                      >
                        <span>Lamar via Passport &rarr;</span>
                      </Link>
                    ) : (
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-neutral-400 font-medium cursor-not-allowed", typeClass("micro"))}>
                        <span>🔒</span>
                        <span>Locked (Complete Course)</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className={cn("mt-5 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-neutral-500", typeClass("caption"))}>
                <span>
                  Prasyarat: <strong className="text-neutral-400">{job.requiredEvidence}</strong>
                </span>
                {isUnlocked ? (
                  <span className="text-emerald-400 font-mono text-xs font-bold">
                    ● Prasyarat Terpenuhi (Level B Verified)
                  </span>
                ) : (
                  <Link
                    href="/tracks/ethereum"
                    className="text-[#5e6ad2] hover:underline"
                  >
                    Buka Kunci Lewat Ethereum Track &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
