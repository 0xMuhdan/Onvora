"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RealityCheckItem } from "@/lib/capstone-data";

interface RealityCheckChecklistProps {
  projectId: string;
  items: RealityCheckItem[];
}

export function RealityCheckChecklist({
  projectId,
  items,
}: RealityCheckChecklistProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [githubRepo, setGithubRepo] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(`onvora_capstone_completed_${projectId}`);
        if (saved) {
          setSubmitted(true);
          // check all items
          const all: Record<string, boolean> = {};
          items.forEach((i) => (all[i.id] = true));
          setCheckedIds(all);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [projectId, items]);

  const toggleCheck = (id: string) => {
    if (submitted) return;
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const isAllChecked = checkedCount === items.length;
  const isValidAddress = contractAddress.startsWith("0x") && contractAddress.length === 42;
  const isValidGithub = githubRepo.includes("github.com/");
  const canSubmit = isAllChecked && isValidAddress && isValidGithub && !submitted;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      if (!isAllChecked) setErrorMsg("Seluruh 8 kriteria Reality Check wajib diverifikasi terlebih dahulu.");
      else if (!isValidGithub) setErrorMsg("Masukkan tautan URL repositori GitHub yang valid.");
      else if (!isValidAddress) setErrorMsg("Alamat kontrak Sepolia harus berupa format 0x (42 karakter).");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(
        `onvora_capstone_completed_${projectId}`,
        JSON.stringify({
          projectId,
          githubRepo,
          contractAddress,
          completedAt: new Date().toISOString(),
          realityCheckScore: `${items.length} / ${items.length} Reality Check Passed`,
        })
      );
      // Also reward practice / milestone progress
      localStorage.setItem(`onvora_practice_capstone_${projectId}`, "passed");
    }

    setSubmitted(true);
    setErrorMsg("");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0d0f17] p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-400 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>THE 8 REALITY CHECK CRITERIA &middot; ONV-09</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Workbench Kesiapan Produksi (Reality Check)
          </h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Syarat mutlak sebelum proyek independen Anda diakui di Evidence Ledger (Level 5 Verified / Certified Builder).
          </p>
        </div>

        <div className="text-left sm:text-right font-mono">
          <span className="text-xs text-neutral-500">Skor Evaluasi:</span>
          <div className="text-xl font-bold text-emerald-400 mt-0.5">
            {checkedCount} / {items.length} Lolos
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-400" />
          </div>
          <h4 className="text-xl font-bold text-white tracking-tight">
            Proyek Capstone Terverifikasi! (Reality Check 8/8)
          </h4>
          <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
            Artefak repositori dan alamat smart contract Sepolia Anda telah berhasil dicatat. Status kapabilitas Anda telah dinaikkan ke <strong>Level 5 (Expert Builder)</strong>.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/passport"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 shadow-md"
            >
              <span>Buka Builder Passport &rarr;</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 font-mono">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Checklist Items */}
          <div className="space-y-3">
            {items.map((item, idx) => {
              const isChecked = !!checkedIds[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all flex items-start gap-3.5 select-none",
                    isChecked
                      ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white"
                      : "border-white/5 bg-white/[0.015] text-neutral-400 hover:border-white/15"
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-md border text-xs transition-colors",
                        isChecked
                          ? "border-emerald-500 bg-emerald-500 text-black font-bold"
                          : "border-white/20 bg-transparent text-transparent"
                      )}
                    >
                      &check;
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-neutral-200">
                        Pilar #{idx + 1}: {item.question}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-white/5 text-neutral-500">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-400 leading-relaxed font-mono">
                      {item.requirement}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Artifact Inputs */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                Tautan Repositori GitHub Proyek:
              </label>
              <input
                type="url"
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
                placeholder="https://github.com/username/my-capstone-vault"
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                Alamat Kontrak Sepolia Terverifikasi (0x...):
              </label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x7109709ECfa91a80626fF3989D68f67F5b1DD12D"
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!canSubmit}
              className={cn(
                "w-full rounded-full py-3.5 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2",
                canSubmit
                  ? "bg-white text-black hover:bg-neutral-200 cursor-pointer"
                  : "bg-white/10 text-neutral-500 cursor-not-allowed"
              )}
            >
              <Award className="h-4 w-4" />
              <span>Ajukan Verifikasi Proyek &amp; Klaim Evidence Level 5</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
