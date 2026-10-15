"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { typeClass } from "@/lib/type-scale";

interface StepData {
  step: string;
  title: string;
  tagline: string;
  desc: string;
  meta: string;
  badge: string;
}

const STEPS: StepData[] = [
  {
    step: "01",
    title: "Understand Architecture",
    tagline: "Mental Models Without The Fluff",
    desc: "Pahami logika desentralisasi, kriptografi kunci publik, dan arsitektur konsensus melalui blueprint teknikal ringkas tanpa video tutorial bertele-tele.",
    meta: "Foundation",
    badge: "Architecture & Logic",
  },
  {
    step: "02",
    title: "Write Code in Browser",
    tagline: "Zero Gas & Instant Sandbox",
    desc: "Eksekusi instruksi pertama dalam 60 detik langsung di sandbox web. Tanpa instalasi node lokal yang rumit, tanpa biaya gas, dan tanpa koneksi wallet.",
    meta: "Interactive Code",
    badge: "Solidity & EVM",
  },
  {
    step: "03",
    title: "Audit-Grade Assertions",
    tagline: "Automated Foundry Test Suites",
    desc: "Setiap baris kode diuji dengan test suite ketat dan evaluasi 8-Poin Reality Check untuk memastikan smart contract Anda tahan eksploitasi sebelum deploy publik.",
    meta: "Automated Tests",
    badge: "Foundry Testing",
  },
  {
    step: "04",
    title: "Verified Proof of Competence",
    tagline: "On-Chain Evidence Ledger",
    desc: "Lulus bukan dengan sertifikat gambar pajangan. Rekam jejak Anda tercatat dari Pull Request yang dimerge dan smart contract terverifikasi yang diakui industri global.",
    meta: "Verification",
    badge: "Level B Verified",
  },
];

export function BuilderStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      const newIndex = Math.min(
        Math.floor(progress * STEPS.length),
        STEPS.length - 1,
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[360vh] sm:h-[400vh] w-full bg-[#08090a]">
      {/* Sticky Screen Canvas */}
      <div className="sticky top-20 flex h-[calc(100dvh-5rem)] w-full flex-col justify-center overflow-hidden border-b border-white/10 bg-[#08090a] py-6 sm:py-8">
        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-center px-4 sm:px-6 lg:px-8">
          {/* Main Storytelling Content (2-Column Grid) */}
          <div className="my-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* SISI KIRI: Step Narrative & Progress Indicator */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                {/* Horizontal Step Tabs with Progress Line */}
                <div className="relative mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                  {STEPS.map((s, idx) => (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => {
                        const el = containerRef.current;
                        if (!el) return;
                        const targetScroll =
                          el.offsetTop +
                          (idx / (STEPS.length - 1)) *
                            (el.offsetHeight - window.innerHeight);
                        window.scrollTo({ top: targetScroll, behavior: "smooth" });
                      }}
                      className="group flex flex-col items-center gap-2 text-center focus:outline-hidden"
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full font-bold transition-all",
                          typeClass("caption"),
                          idx === activeIndex
                            ? "bg-white text-black shadow-[0_0_20px_-3px_rgba(255,255,255,0.5)]"
                            : idx < activeIndex
                              ? "border border-white/20 bg-white/10 text-white"
                              : "border border-white/5 bg-white/[0.02] text-neutral-500",
                        )}
                      >
                        {s.step}
                      </span>
                      <span
                        className={cn(
                          "font-medium transition-colors",
                          typeClass("micro"),
                          idx === activeIndex
                            ? "font-semibold text-white"
                            : "text-neutral-500",
                        )}
                      >
                        Step 0{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Narrative Active Details */}
                <div className="min-h-[200px]">
                  <div className={cn("inline-flex items-center gap-2 rounded-full border border-[#5e6ad2]/30 bg-[#5e6ad2]/10 px-3 py-1 font-semibold text-[#5e6ad2]", typeClass("micro"))}>
                    {STEPS[activeIndex].badge}
                  </div>

                  <h2 className={cn("mt-4 font-bold text-white tracking-tight transition-all duration-300", typeClass("display"))}>
                    {STEPS[activeIndex].title}
                  </h2>
                  <p className={cn("mt-1 font-semibold text-[#5e6ad2]", typeClass("subtitle"))}>
                    {STEPS[activeIndex].tagline}
                  </p>
                  <p className={cn("mt-4 text-neutral-400 transition-opacity duration-300", typeClass("body"))}>
                    {STEPS[activeIndex].desc}
                  </p>
                </div>
              </div>

              {/* Step Navigation Hints & CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                <Link
                  href="/start"
                  className={cn("inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-semibold text-black hover:bg-neutral-200 transition-all", typeClass("caption"))}
                >
                  Start from Step 01 &rarr;
                </Link>
                <span className={cn("text-neutral-500", typeClass("caption"))}>
                  Scroll down to explore &darr;
                </span>
              </div>
            </div>

            {/* SISI KANAN: LIVING DYNAMIC MOCKUP (Morphs on Scroll) */}
            <div className="relative flex items-center justify-center lg:col-span-7">
              <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0c0d10] p-3 shadow-2xl backdrop-blur-xl">
                {/* Mockup Titlebar */}
                <div className={cn("flex items-center justify-between rounded-xl border-b border-white/5 bg-white/[0.02] px-4 py-2.5 text-neutral-400", typeClass("caption"))}>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    <span className={cn("ml-2 font-mono text-neutral-300", typeClass("micro"))}>
                      onvora://builder-canvas/step-0{activeIndex + 1}
                    </span>
                  </div>
                  <span className={cn("font-semibold text-[#5e6ad2]", typeClass("micro"))}>
                    {STEPS[activeIndex].meta}
                  </span>
                </div>

                {/* Living Content Canvas */}
                <div className="relative min-h-[340px] sm:min-h-[380px] p-5 sm:p-6 bg-[#08090a] rounded-xl mt-2 border border-white/5">
                  {/* STAGE 01: ARSITEKTUR KONSEPTUAL */}
                  {activeIndex === 0 && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className={cn("font-mono font-bold text-white", typeClass("caption"))}>
                          EVM Mental Model &amp; State Tree
                        </span>
                        <span className={cn("text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium", typeClass("micro"))}>
                          Verified Logic
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                          <p className={cn("text-neutral-500 font-mono", typeClass("micro"))}>01. Identity</p>
                          <p className={cn("font-semibold text-white mt-1", typeClass("subtitle"))}>
                            Public &amp; Private Key
                          </p>
                          <p className={cn("text-neutral-400 mt-1 font-mono", typeClass("caption"))}>
                            ECDSA Signature &middot; Keccak-256
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                          <p className={cn("text-neutral-500 font-mono", typeClass("micro"))}>02. State Storage</p>
                          <p className={cn("font-semibold text-white mt-1", typeClass("subtitle"))}>
                            Immutable State Tree
                          </p>
                          <p className={cn("text-neutral-400 mt-1 font-mono", typeClass("caption"))}>
                            Patricia Merkle Trie
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                        <p className={cn("font-semibold text-neutral-300", typeClass("caption"))}>
                          Execution Pipeline:
                        </p>
                        <div className={cn("mt-2.5 flex items-center justify-between font-mono text-neutral-400", typeClass("caption"))}>
                          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-white">User Intent</span>
                          <span>&rarr;</span>
                          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-white">Gas Calc</span>
                          <span>&rarr;</span>
                          <span className="rounded-md border border-[#5e6ad2] bg-[#5e6ad2] px-2.5 py-1 text-white font-bold">EVM Opcode</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STAGE 02: IN-BROWSER CODE EDITOR */}
                  {activeIndex === 1 && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <div className={cn("flex items-center justify-between border-b border-white/10 pb-2 font-mono", typeClass("caption"))}>
                        <span className="text-white font-bold">VaultSecurity.sol</span>
                        <span className="text-neutral-500">Solidity 0.8.20</span>
                      </div>

                      <pre className={cn("mt-3 overflow-x-auto rounded-xl border border-white/10 bg-[#050608] p-4 font-mono text-neutral-200", typeClass("caption"))}>
                        <code>{`// SPDX-License-Identifier: MIT
contract VaultSecurity {
    address public immutable owner;
    
    constructor() { owner = msg.sender; }

    function withdraw() external {
        require(msg.sender == owner, "!owner");
        payable(msg.sender).transfer(balance);
    }
}`}</code>
                      </pre>

                      <div className={cn("mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-neutral-400 font-mono", typeClass("caption"))}>
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          Compiler Ready &middot; Zero Gas Fee
                        </span>
                        <span className="font-bold text-[#5e6ad2]">Sandbox Online</span>
                      </div>
                    </div>
                  )}

                  {/* STAGE 03: LIVE TEST & REALITY CHECK */}
                  {activeIndex === 2 && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <div className={cn("flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-3 py-1.5 rounded-lg font-mono text-neutral-300", typeClass("caption"))}>
                        <span>terminal: forge test</span>
                        <span className="text-emerald-400 font-semibold">[PASSING]</span>
                      </div>

                      <div className={cn("mt-3 rounded-xl border border-white/10 bg-[#050608] p-4 font-mono text-neutral-200", typeClass("caption"))}>
                        <p className="text-neutral-500">$ forge test --match-contract VaultTest</p>
                        <p className="mt-2 text-emerald-400 font-semibold">
                          [PASS] test_OwnerCanWithdraw() (gas: 14,210)
                        </p>
                        <p className="text-emerald-400 font-semibold">
                          [PASS] test_RevertWhen_Unauthorized() (gas: 8,120)
                        </p>
                        <p className="text-emerald-400 font-semibold">
                          [PASS] test_RealityCheck_ReentrancyGuard() (gas: 9,040)
                        </p>
                        <p className="mt-3 border-t border-white/10 pt-2 text-neutral-400">
                          Suite result: ok. 3 passed; 0 failed; finished in 2.8ms
                        </p>
                      </div>

                      <div className={cn("mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3", typeClass("caption"))}>
                        <p className="font-semibold text-[#5e6ad2]">8/8 Reality Check Passed:</p>
                        <p className="text-neutral-400 mt-0.5">
                          Logika akses aman, konsumsi gas optimal, dan siap deploy ke public testnet.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STAGE 04: EVIDENCE LEDGER CREDENTIAL SPECIMEN */}
                  {activeIndex === 3 && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <div className={cn("flex items-center justify-between border-b border-white/10 pb-2", typeClass("caption"))}>
                        <span className="font-semibold text-[#5e6ad2]">Onvora Evidence Ledger</span>
                        <span className={cn("rounded-full border border-[#5e6ad2] bg-[#5e6ad2]/20 px-2.5 py-0.5 text-white font-semibold", typeClass("micro"))}>
                          Level B Verified
                        </span>
                      </div>

                      <div className={cn("mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4", typeClass("caption"))}>
                        <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/10">
                          <div>
                            <p className={cn("text-neutral-500 font-mono", typeClass("micro"))}>Builder Passport</p>
                            <p className="font-semibold text-white mt-0.5 font-mono">builder.onvora.eth</p>
                          </div>
                          <div>
                            <p className={cn("text-neutral-500 font-mono", typeClass("micro"))}>Specialization</p>
                            <p className="font-semibold text-white mt-0.5">EVM Smart Contracts</p>
                          </div>
                        </div>

                        <div className={cn("mt-3 space-y-1.5 text-neutral-400 font-mono", typeClass("caption"))}>
                          <p>&bull; <strong className="text-white">Smart Contracts:</strong> 4 Verified on Sepolia</p>
                          <p>&bull; <strong className="text-white">Pull Request:</strong> Merged to Public Audit Repo</p>
                          <p>&bull; <strong className="text-white">Verification Hash:</strong> 0x7f4b...9e12</p>
                        </div>

                        <div className={cn("mt-4 border-t border-white/10 pt-3 flex items-center justify-between", typeClass("caption"))}>
                          <span className="text-neutral-500">Status: Audit-Grade</span>
                          <span className="font-semibold text-[#5e6ad2]">Industry Ready &check;</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Scrub Bar */}
                <div className={cn("mt-3 flex items-center justify-between px-1 text-neutral-500 font-mono", typeClass("caption"))}>
                  <span>Scroll Progress: {Math.round(scrollProgress * 100)}%</span>
                  <div className="h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
                    <div
                      style={{ width: `${scrollProgress * 100}%` }}
                      className="h-full bg-[#5e6ad2] transition-all duration-150"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
