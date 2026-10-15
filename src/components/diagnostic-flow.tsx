"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AskUserQuestions,
  type AskUserQuestion,
  type AskUserAnswer,
} from "@/components/ui/ask-user-questions";
import { typeClass } from "@/lib/type-scale";
import { useSize } from "@/lib/size-context";
import { cn } from "@/lib/utils";

const ONVORA_DIAGNOSTIC_QUESTIONS: AskUserQuestion[] = [
  {
    id: "experience",
    title: "Apa pengalaman pemrograman & rekayasa perangkat lunak Anda?",
    layout: "stacked",
    options: [
      {
        id: "none",
        title: "Pemula Total (Belum Pernah Coding)",
        description: "Ingin memulai dari konsep desentralisasi paling dasar tanpa rasa takut.",
      },
      {
        id: "web2",
        title: "Web2 Developer (JavaScript / TypeScript / Python)",
        description: "Familiar dengan rekayasa web/backend modern, ingin transisi ke Web3.",
      },
      {
        id: "solidity",
        title: "EVM Practitioner (Pernah Menulis Solidity)",
        description: "Sudah paham kontrak dasar atau ERC-20, ingin menguasai testing Foundry.",
      },
      {
        id: "security",
        title: "Advanced Engineer / Auditor Candidate",
        description: "Ingin mendalami reentrancy defense, fuzzing invariants, dan audit publik.",
      },
    ],
  },
  {
    id: "goals",
    title: "Pilih trek ekosistem yang paling ingin Anda kuasai:",
    multiSelect: true,
    layout: "stacked",
    options: [
      {
        id: "evm-defi",
        title: "Ethereum & EVM Smart Contracts",
        description: "Solidity 0.8.20, Foundry, AMM DEX, Vaults, ERC Standards.",
      },
      {
        id: "solana-rust",
        title: "Solana High-Performance Systems",
        description: "Rust, Anchor Framework, Program Derived Addresses (PDA).",
      },
      {
        id: "ai-agents",
        title: "Decentralized AI & Compute",
        description: "Python, 0G Storage/DA, Bittensor Subnets, Autonomous AI Agents.",
      },
      {
        id: "zk-privacy",
        title: "Zero-Knowledge & Privacy Protocols",
        description: "Midnight Network, Compact language, Circom ZK-SNARKs.",
      },
    ],
  },
  {
    id: "commitment",
    title: "Berapa alokasi waktu sprint belajar yang Anda sediakan setiap minggu?",
    layout: "stacked",
    options: [
      {
        id: "casual",
        title: "5 – 10 Jam / Minggu (Belajar Santai)",
        description: "Progres konsisten di sela kesibukan harian tanpa tekanan.",
      },
      {
        id: "dedicated",
        title: "10 – 20 Jam / Minggu (Komitmen Terarah)",
        description: "Sprint intensif malam dan akhir pekan untuk membangun portofolio riil.",
      },
      {
        id: "hardcore",
        title: "20+ Jam / Minggu (Full-Time Immersion)",
        description: "Fokus penuh untuk siap tembus hackathon ekosistem atau tim hiring.",
      },
    ],
  },
  {
    id: "target_outcome",
    title: "Apa target capaian terbesar Anda dalam 3 bulan ke depan?",
    allowOther: true,
    otherPlaceholder: "Tuliskan target khusus Anda (misal: membangun dApp untuk startup sendiri)...",
    layout: "stacked",
    options: [
      {
        id: "evidence-b",
        title: "Lolos 8/8 Reality Check di Sepolia Testnet (Level B)",
        description: "Membuktikan portofolio smart contract yang siap diaudit.",
      },
      {
        id: "pr-merged",
        title: "Pull Request Dimerge ke Repositori Audit Publik (Level A)",
        description: "Standar tertinggi pengakuan industri Web3 global.",
      },
      {
        id: "hackathon-win",
        title: "Membentuk Tim & Memenangkan Hackathon Global",
        description: "Mendapatkan grant pendanaan ekosistem dan mentoring praktisi.",
      },
      {
        id: "career",
        title: "Mendapatkan Pekerjaan / Kontrak Engineering Web3",
        description: "Direkrut langsung oleh partner hiring berbasis bukti kompetensi.",
      },
    ],
  },
];

interface DiagnosticResult {
  startPhase: number;
  phaseName: string;
  headline: string;
  reason: string;
  selectedTracks: string[];
  commitmentLevel: string;
  targetOutcome: string;
}

export function DiagnosticFlow() {
  const { isMobile } = useSize();
  const [completedResult, setCompletedResult] = useState<DiagnosticResult | null>(null);

  function handleComplete(answers: Record<string, AskUserAnswer>) {
    const expAnswer = answers.experience?.selectedIds?.[0];
    const goalsAnswer = answers.goals?.selectedIds ?? ["evm-defi"];
    const commitAnswer = answers.commitment?.selectedIds?.[0] ?? "dedicated";
    const targetAnswer =
      answers.target_outcome?.otherText ||
      answers.target_outcome?.selectedIds?.[0] ||
      "evidence-b";

    let startPhase = 0;
    let phaseName = "Phase 00: Builder Diagnostic & Route";
    let headline = "Foundational Web3 Mindset & State Machine";
    let reason =
      "Titik awal kanonik: memahami logika desentralisasi, kunci publik/privat, dan model akun tanpa asumsi.";

    if (expAnswer === "web2") {
      startPhase = 1;
      phaseName = "Phase 01: Web3 & Ethereum Fundamentals";
      headline = "Transisi Arsitektur Web2 ke Smart Contract";
      reason =
        "Pengalaman Web2 Anda mempercepat pemahaman sintaks. Fokus langsung pada EOA, mempool, gas economics, dan EVM execution lifecycle.";
    } else if (expAnswer === "solidity") {
      startPhase = 3;
      phaseName = "Phase 03: Solidity Core & Foundry Testing";
      headline = "Audit-Grade Testing & Modular Contract Architecture";
      reason =
        "Anda sudah memiliki pemahaman dasar Solidity. Langsung melangkah ke best practice memory packing, inheritance, dan unit testing Foundry.";
    } else if (expAnswer === "security") {
      startPhase = 7;
      phaseName = "Phase 07: Smart Contract Security & Exploits";
      headline = "Vulnerability Triage & Production Hardening";
      reason =
        "Jalur akselerasi keamanan tingkat lanjut: analisis reentrancy, oracle manipulation, invariant fuzz testing, dan simulasi audit publik.";
    }

    setCompletedResult({
      startPhase,
      phaseName,
      headline,
      reason,
      selectedTracks: goalsAnswer,
      commitmentLevel: commitAnswer,
      targetOutcome: targetAnswer,
    });
  }

  return (
    <div className="w-full">
      {completedResult ? (
        <div className="rounded-3xl border border-[#5e6ad2]/40 bg-[#5e6ad2]/[0.06] p-8 sm:p-10 shadow-2xl backdrop-blur-xl animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <span className={cn("rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono font-semibold text-emerald-400", typeClass("micro"))}>
              ● DIAGNOSTIC COMPLETE
            </span>
            <span className={cn("text-neutral-400 font-mono", typeClass("micro"))}>
              Evidence Roadmap Generated
            </span>
          </div>

          <div className="mt-6">
            <span className={cn("text-[#5e6ad2] font-semibold font-mono uppercase tracking-wider", typeClass("caption"))}>
              Rekomendasi Titik Awal Anda
            </span>
            <h2 className={cn("mt-1 font-bold text-white tracking-tight", typeClass("display"))}>
              {completedResult.phaseName}
            </h2>
            <p className={cn("mt-1 font-semibold text-neutral-200", typeClass("subtitle"))}>
              {completedResult.headline}
            </p>
            <p className={cn("mt-4 text-neutral-300 leading-relaxed", typeClass("body"))}>
              {completedResult.reason}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <span className={cn("text-neutral-500 font-mono uppercase", typeClass("micro"))}>
                Trek Pilihan
              </span>
              <p className={cn("mt-1 font-semibold text-white", typeClass("caption"))}>
                {completedResult.selectedTracks.join(", ")}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <span className={cn("text-neutral-500 font-mono uppercase", typeClass("micro"))}>
                Target Capaian 3 Bulan
              </span>
              <p className={cn("mt-1 font-semibold text-emerald-400", typeClass("caption"))}>
                {completedResult.targetOutcome}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={
                completedResult.startPhase === 7
                  ? "/learn/ethereum/sec-01-checks-effects-interactions/reentrancy-anatomy-and-cei"
                  : completedResult.startPhase === 3
                  ? "/learn/ethereum/sol-core-01-types-and-storage-layout/storage-slot-packing-rules"
                  : "/learn/ethereum/eth-fund-01-accounts-and-keys/eoa-vs-contract-accounts"
              }
              className={cn("rounded-full bg-white px-7 py-3 font-semibold text-black hover:bg-neutral-200 transition-all shadow-[0_0_20px_-3px_rgba(255,255,255,0.4)]", typeClass("caption"))}
            >
              Mulai Pelajaran Rekomendasi (Phase {String(completedResult.startPhase).padStart(2, "0")}) &rarr;
            </Link>
            <Link
              href="/practice"
              className={cn("rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10 transition-colors", typeClass("caption"))}
            >
              Buka Sandbox Koding
            </Link>
            <button
              type="button"
              onClick={() => setCompletedResult(null)}
              className={cn("text-neutral-400 hover:text-white transition-colors ml-auto", typeClass("caption"))}
            >
              Ulangi Diagnostic
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-[#0c0d10] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#5e6ad2] animate-pulse" />
              <span className={cn("font-mono text-[#5e6ad2] font-semibold uppercase tracking-wider", typeClass("micro"))}>
                Onvora Diagnostic Engine // Phase 00
              </span>
            </div>
            <h2 className={cn("mt-1.5 font-bold text-white tracking-tight", typeClass("title"))}>
              Petakan Jalur Pembelajaran Sesuai Kemampuan Anda
            </h2>
            <p className={cn("mt-1 text-neutral-400", typeClass("caption"))}>
              Gunakan tombol angka 1–9 di keyboard untuk memilih dengan cepat. Navigasi lancar dengan fluid motion.
            </p>
          </div>

          <AskUserQuestions
            questions={ONVORA_DIAGNOSTIC_QUESTIONS}
            onComplete={handleComplete}
            skipLabel="Lewati Soal"
            size={isMobile ? "default" : "default"}
          />
        </div>
      )}
    </div>
  );
}
