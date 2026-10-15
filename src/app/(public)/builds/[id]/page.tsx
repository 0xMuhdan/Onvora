"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Code2,
  ShieldCheck,
} from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";
import { getCapstoneById } from "@/lib/capstone-data";
import { RealityCheckChecklist } from "@/components/capstone/reality-check-checklist";
import { CodeBlock } from "@/components/curriculum/code-block";

export default function CapstoneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const project = getCapstoneById(resolvedParams.id);
  const [activeTab, setActiveTab] = useState<"overview" | "code" | "testing" | "reality-check">("overview");

  if (!project) {
    return (
      <div className="min-h-screen bg-[#08090a] py-32 text-center text-white">
        <h2 className="text-xl font-bold">Proyek Capstone Tidak Ditemukan</h2>
        <p className="mt-2 text-neutral-400">
          Proyek dengan ID &apos;{resolvedParams.id}&apos; belum tersedia atau URL tidak valid.
        </p>
        <Link
          href="/builds"
          className="mt-6 inline-flex rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-black hover:bg-neutral-200"
        >
          Kembali ke Katalog Proyek &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8] min-h-screen">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6">
          <Link href="/builds" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Katalog Proyek</span>
          </Link>
          <span>/</span>
          <span className="text-[#8c97ff]">{project.title}</span>
        </div>

        {/* Hero Spec Banner */}
        <div className="rounded-3xl border border-[#5e6ad2]/40 bg-[#5e6ad2]/[0.05] p-8 sm:p-12 shadow-2xl backdrop-blur-2xl relative overflow-hidden mb-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#5e6ad2]/15 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-mono font-bold text-emerald-400">
                ● {project.badge}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono text-neutral-300">
                {project.difficulty}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono text-neutral-300 flex items-center gap-1">
                <Clock className="h-3 w-3 text-neutral-400" />
                <span>{project.estimatedTime}</span>
              </span>
            </div>

            <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
              {project.title}
            </h1>

            <p className={cn("mt-4 text-neutral-300 leading-relaxed", typeClass("body"))}>
              {project.problemStatement}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab("reality-check")}
                className="rounded-full bg-white px-7 py-3 text-xs font-bold text-black hover:bg-neutral-200 transition-all shadow-md cursor-pointer"
              >
                Mulai Reality Check &rarr;
              </button>
              <Link
                href="/practice"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Uji Logika di Sandbox (/practice)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={cn(
              "px-5 py-3 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer",
              activeTab === "overview"
                ? "border-[#5e6ad2] text-white font-bold"
                : "border-transparent text-neutral-400 hover:text-white"
            )}
          >
            1. Arsitektur &amp; State
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "px-5 py-3 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer",
              activeTab === "code"
                ? "border-[#5e6ad2] text-white font-bold"
                : "border-transparent text-neutral-400 hover:text-white"
            )}
          >
            2. Smart Contracts Interface ({project.contracts.length})
          </button>
          <button
            onClick={() => setActiveTab("testing")}
            className={cn(
              "px-5 py-3 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer",
              activeTab === "testing"
                ? "border-[#5e6ad2] text-white font-bold"
                : "border-transparent text-neutral-400 hover:text-white"
            )}
          >
            3. Foundry Testing &amp; Deploy
          </button>
          <button
            onClick={() => setActiveTab("reality-check")}
            className={cn(
              "px-5 py-3 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5",
              activeTab === "reality-check"
                ? "border-emerald-500 text-emerald-400 font-bold"
                : "border-transparent text-neutral-400 hover:text-white"
            )}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>4. The 8 Reality Check (Wajib)</span>
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-[#0d0f12] p-8 shadow-xl">
              <h3 className="font-bold text-white text-lg mb-3">Gambaran Arsitektur Protokol</h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                {project.architectureOverview}
              </p>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-6 font-mono text-xs text-[#8c97ff] overflow-x-auto">
                <div className="text-neutral-500 mb-2">DIAGRAM ALUR STATE MACHINE:</div>
                <pre>{project.stateDiagram}</pre>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-6">
                <span className="text-xs font-mono text-neutral-500">TARGET USER:</span>
                <p className="text-white text-sm mt-1">{project.targetUser}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-6">
                <span className="text-xs font-mono text-neutral-500">TECH STACK:</span>
                <p className="text-white text-sm mt-1 font-mono">{project.techStack}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="space-y-8">
            {project.contracts.map((c, idx) => (
              <div key={idx} className="rounded-3xl border border-white/10 bg-[#0d0f12] p-6 sm:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
                  <div>
                    <h3 className="font-bold text-white font-mono text-base">{c.name}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{c.description}</p>
                  </div>
                  <span className="text-xs font-mono text-[#8c97ff] rounded bg-[#5e6ad2]/10 px-2 py-0.5 self-start">
                    Solidity 0.8.20
                  </span>
                </div>

                <CodeBlock code={c.code} language="solidity" title={c.name} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "testing" && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-[#0d0f12] p-8 shadow-xl">
              <h3 className="font-bold text-white text-lg mb-3">Panduan Pengujian Audit Foundry</h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                {project.testingGuidance}
              </p>

              <div className="border-t border-white/5 pt-6">
                <h4 className="font-bold text-white text-sm mb-3 font-mono">Skrip Deployment Sepolia (Deploy.s.sol):</h4>
                <CodeBlock code={project.deploymentScript} language="solidity" title="Deploy.s.sol" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "reality-check" && (
          <div className="space-y-8">
            <RealityCheckChecklist projectId={project.id} items={project.realityChecks} />
          </div>
        )}
      </div>
    </div>
  );
}
