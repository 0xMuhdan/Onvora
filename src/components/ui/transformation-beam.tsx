"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { typeClass } from "@/lib/type-scale";

const STEPS = [
  {
    num: "01",
    title: "Curious Learner",
    subtitle: "Start from Ground Zero",
    desc: "Mempelajari logika desentralisasi tanpa rasa bingung, tanpa biaya gas, dan tanpa perlu connect wallet.",
    badge: "Foundation",
    status: "Level E",
  },
  {
    num: "02",
    title: "Hands-on Coder",
    subtitle: "In-Browser Sandbox",
    desc: "Mengeksekusi baris kode langsung di sandbox web dan mendapatkan feedback instan dari assertion unit test.",
    badge: "Interactive Code",
    status: "Level C-D",
  },
  {
    num: "03",
    title: "Capable Builder",
    subtitle: "Production Protocols",
    desc: "Membangun arsitektur dApp mandiri yang lolos evaluasi ketat 8-Poin Reality Check sebelum deploy publik.",
    badge: "Independent Build",
    status: "Level B",
  },
  {
    num: "04",
    title: "Qualified Engineer",
    subtitle: "Verified Portfolio",
    desc: "Memiliki rekam jejak resmi di Evidence Ledger dan siap terhubung ke mitra ekosistem & hackathon global.",
    badge: "Verified Proof",
    status: "Level A",
  },
];

export function LearnerTransformationBeam({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border border-white/10 bg-[#0c0d10] p-5 sm:p-6 shadow-2xl backdrop-blur-xl",
        className,
      )}
    >
      {/* Header Kartu Diagram */}
      <div className={cn("flex items-center justify-between border-b border-white/10 pb-3", typeClass("caption"))}>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5e6ad2] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5e6ad2]" />
          </span>
          <span className="font-semibold text-white tracking-tight">
            The Builder Journey
          </span>
        </div>
        <span className={cn("rounded-full border border-[#5e6ad2]/30 bg-[#5e6ad2]/10 px-2.5 py-0.5 text-[#5e6ad2] font-semibold", typeClass("micro"))}>
          4-Stage Evolution
        </span>
      </div>

      {/* Kontainer Timeline dengan Animated Tracing Beam */}
      <div className="relative mt-6 space-y-4">
        {/* Garis Vertikal Latar */}
        <div className="absolute left-[19px] top-4 bottom-6 w-[2px] bg-white/10" />

        {/* Garis Berkas Cahaya Mengalir */}
        <svg
          className="pointer-events-none absolute left-[19px] top-4 bottom-6 h-[calc(100%-2rem)] w-[2px] overflow-visible"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="beam-gradient" x1="0" y1="0%" x2="0" y2="100%">
              <stop offset="0%" stopColor="#5e6ad2" stopOpacity="0">
                <animate
                  attributeName="offset"
                  values="-0.4; 1"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="20%" stopColor="#5e6ad2" stopOpacity="1">
                <animate
                  attributeName="offset"
                  values="-0.2; 1.2"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="40%" stopColor="#4355ec" stopOpacity="0">
                <animate
                  attributeName="offset"
                  values="0; 1.4"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
        </svg>

        {/* Daftar 4 Node Transformasi */}
        {STEPS.map((step, idx) => (
          <div key={step.num} className="relative flex items-start gap-3.5 group">
            {/* Step Marker */}
            <div className={cn("relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#08090a] font-bold text-white transition-all group-hover:border-[#5e6ad2] group-hover:shadow-[0_0_15px_-3px_rgba(94,106,210,0.5)]", typeClass("caption"))}>
              <span>{step.num}</span>
              {idx === 3 && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              )}
            </div>

            {/* Kartu Detail Tahap */}
            <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-all group-hover:border-white/15 group-hover:bg-white/[0.04]">
              <div className="flex items-center justify-between gap-1 border-b border-white/5 pb-1.5">
                <h3 className={cn("font-semibold text-white group-hover:text-[#5e6ad2] transition-colors", typeClass("subtitle"))}>
                  {step.title}
                </h3>
                <span className={cn("rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-neutral-300", typeClass("micro"))}>
                  {step.badge}
                </span>
              </div>
              <p className={cn("mt-1 text-neutral-400", typeClass("caption"))}>
                {step.desc}
              </p>
              <div className={cn("mt-2 flex items-center justify-between text-neutral-500 font-mono", typeClass("micro"))}>
                <span>{step.subtitle}</span>
                <span className="text-[#5e6ad2]">{step.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-5 border-t border-white/10 pt-3 text-center">
        <p className={cn("text-neutral-400", typeClass("caption"))}>
          Target Outcome: <span className="font-semibold text-white">Qualified Builder</span> registered in Evidence Ledger
        </p>
      </div>
    </div>
  );
}
