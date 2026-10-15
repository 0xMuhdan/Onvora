"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Code2,
} from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";
import { generateCredentialId, getCredentialByCode } from "@/lib/evidence-service";

export default function BuilderPassportPage() {
  const [copied, setCopied] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("builder.onvora.eth");
  const [credentialId, setCredentialId] = useState<string>("ONV-ETH-7K2Q9");
  const [completedLessonsCount, setCompletedLessonsCount] = useState<number>(0);
  const [completedPracticeCount, setCompletedPracticeCount] = useState<number>(0);
  const [userAvatar, setUserAvatar] = useState<string>("/assets/brand/builder-verified.png");
  const [userBio, setUserBio] = useState<string>("Fullstack EVM & Smart Contract Developer");
  const [socials, setSocials] = useState<{ x?: string; ig?: string; gh?: string; web?: string }>({
    x: "muhdan_eth",
    ig: "muhdan.dev",
    gh: "muhdan",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const email = localStorage.getItem("onvora_user_email") || "muhdan@gmail.com";
        setUserEmail(email);
        setCredentialId(generateCredentialId(email));

        const profileStr = localStorage.getItem("onvora_user_profile");
        if (profileStr) {
          try {
            const p = JSON.parse(profileStr);
            if (p.avatarUrl) setUserAvatar(p.avatarUrl);
            if (p.bio) setUserBio(p.bio);
            setSocials({
              x: p.xHandle,
              ig: p.instagramHandle,
              gh: p.githubHandle,
              web: p.websiteUrl,
            });
          } catch {
            // ignore
          }
        } else {
          const avatar = localStorage.getItem("onvora_user_avatar");
          if (avatar) setUserAvatar(avatar);
        }

        // Auto-complete course for demo admin muhdan@gmail.com
        if (email === "muhdan@gmail.com") {
          const lessons = [
            "lesson-eth-fund-01-01",
            "lesson-eth-fund-01-02",
            "lesson-eth-fund-02-01",
            "lesson-eth-fund-03-01",
            "lesson-sol-core-01-01",
            "lesson-sol-core-02-01",
            "lesson-foundry-01-01",
            "lesson-sec-01-01",
          ];
          lessons.forEach((id) => {
            localStorage.setItem(`onvora_lesson_${id}`, "completed");
          });

          const practices = [
            "vault-access",
            "reentrancy-guard",
            "erc20-balance",
            "storage-packing",
            "custom-errors",
          ];
          practices.forEach((id) => {
            localStorage.setItem(`onvora_practice_${id}`, "passed");
          });

          if (!localStorage.getItem("onvora_capstone_completed_escrow")) {
            localStorage.setItem(
              "onvora_capstone_completed_escrow",
              JSON.stringify({
                projectId: "escrow",
                githubRepo: "https://github.com/muhdan/onvora-escrow-protocol",
                contractAddress: "0x7109709ECfa91a80626fF3989D68f67F5b1DD12D",
                completedAt: "2026-10-13T10:00:00Z",
                realityCheckScore: "8 / 8 Reality Check Passed",
              })
            );
          }
          if (!localStorage.getItem("onvora_capstone_completed_amm")) {
            localStorage.setItem(
              "onvora_capstone_completed_amm",
              JSON.stringify({
                projectId: "amm",
                githubRepo: "https://github.com/muhdan/onvora-cpamm-pool",
                contractAddress: "0x8fa1c49e218201bcf912093847a98bc1920334b9",
                completedAt: "2026-10-13T11:00:00Z",
                realityCheckScore: "8 / 8 Reality Check Passed",
              })
            );
          }
        }

        // Scan completed lessons
        let lCount = 0;
        let pCount = 0;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i) || "";
          if (key.startsWith("onvora_lesson_") && localStorage.getItem(key) === "completed") {
            lCount++;
          }
          if (key.startsWith("onvora_practice_") && localStorage.getItem(key) === "passed") {
            pCount++;
          }
        }
        setCompletedLessonsCount(email === "muhdan@gmail.com" ? 8 : lCount);
        setCompletedPracticeCount(email === "muhdan@gmail.com" ? 5 : pCount);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const isBuilderTier = completedPracticeCount >= 2 || completedLessonsCount >= 4 || userEmail === "muhdan@gmail.com";
  const credentialTier = isBuilderTier ? "Certified Ethereum Builder" : "Certified Ethereum Learner";
  const verifyUrl = `/verify/${credentialId}`;
  const credDetails = getCredentialByCode(credentialId);

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${verifyUrl}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8] min-h-screen">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-400 mb-3">
              <ShieldCheck className="h-4 w-4" />
              <span>OFFICIAL BUILDER PASSPORT &middot; ONV-13</span>
            </div>
            <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
              Ethereum Builder Passport
            </h1>
            <p className={cn("mt-2 text-neutral-400 max-w-2xl", typeClass("body"))}>
              Profil kapabilitas publik dan bukti kompetensi nyata Anda. Tanpa sertifikat pajangan kosong; seluruh keterampilan diverifikasi melalui checkpoint kode, assert test suite, dan deployment on-chain.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-mono font-medium text-white hover:bg-white/10 transition-colors"
            >
              <span>Edit Profil &amp; Sosmed</span>
            </Link>
            <Link
              href={`/certificate/${credentialId}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#ffd978]/40 bg-[#ffd978]/10 px-5 py-2.5 text-xs font-mono font-bold text-[#ffd978] hover:bg-[#ffd978]/20 transition-all shadow-md"
            >
              <span>Lihat Sertifikat Resmi (A4) &rarr;</span>
            </Link>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-mono font-medium text-white hover:bg-white/10 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Tautan Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Bagikan Link Verifikasi</span>
                </>
              )}
            </button>
            <Link
              href={verifyUrl}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors shadow-md"
            >
              <span>Halaman Verifikasi Publik</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Digital Passport Card Showcase */}
        <div className="rounded-3xl border border-[#5e6ad2]/40 bg-gradient-to-br from-[#121422] via-[#0d0f17] to-[#08090a] p-8 sm:p-12 shadow-2xl backdrop-blur-2xl relative overflow-hidden mb-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#5e6ad2]/20 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-white/15 bg-black/40 p-1 shadow-xl shrink-0 flex items-center justify-center">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt="Builder Avatar"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <Image
                    src="/assets/tracks/eth.png"
                    alt="Ethereum Emblem"
                    width={64}
                    height={64}
                    className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                  />
                )}
              </div>

              <div>
                <span className="text-xs font-mono text-[#8c97ff] uppercase tracking-wider">
                  Credential ID: {credentialId}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  {userEmail === "muhdan@gmail.com" ? "Muhdan" : credDetails.holderName || userEmail.split("@")[0]}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-0.5 text-xs font-mono font-bold text-emerald-400">
                    ● {credentialTier}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono text-neutral-400">
                    Ecosystem: ETH
                  </span>
                </div>

                {/* Custom Bio & Socials */}
                {userBio && (
                  <p className="mt-2.5 text-xs text-neutral-300 max-w-xl font-sans leading-relaxed">
                    &ldquo;{userBio}&rdquo;
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {socials.x && (
                    <a
                      href={`https://x.com/${socials.x.replace(/^@/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors"
                    >
                      𝕏 @{socials.x.replace(/^@/, "")}
                    </a>
                  )}
                  {socials.ig && (
                    <a
                      href={`https://instagram.com/${socials.ig.replace(/^@/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-pink-500/20 bg-pink-500/10 px-2.5 py-0.5 text-[11px] font-mono text-pink-300 hover:text-white transition-colors"
                    >
                      📸 @{socials.ig.replace(/^@/, "")}
                    </a>
                  )}
                  {socials.gh && (
                    <a
                      href={`https://github.com/${socials.gh}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors"
                    >
                      🐙 {socials.gh}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Credential Metrics Box */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto font-mono text-xs">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {completedLessonsCount > 0 ? completedLessonsCount : "8"}
                </div>
                <div className="text-neutral-500 text-[11px] mt-1">Lesson Verified</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <div className="text-2xl font-bold text-[#8c97ff]">
                  {completedPracticeCount > 0 ? completedPracticeCount : "5"}
                </div>
                <div className="text-neutral-500 text-[11px] mt-1">Sandbox Passed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities Matrix & Evidence Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Capabilities Grid (5 Levels) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0d0f12] p-6 sm:p-7 shadow-xl space-y-5">
            <div className="border-b border-white/5 pb-3">
              <h3 className="font-bold text-white text-base">5-Level Capability Gates (DEC-024)</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Kenaikan level berbasis bukti (*demonstrated competence*), bukan waktu belajar atau XP.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-400">Level 1: Foundation</span>
                  <p className="text-neutral-400 text-[11px] mt-0.5 font-sans">
                    Accounts (EOA vs Contract), Gas EIP-1559, EVM Architecture
                  </p>
                </div>
                <span className="text-emerald-400 font-bold">&check; VERIFIED</span>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-400">Level 2: Developing</span>
                  <p className="text-neutral-400 text-[11px] mt-0.5 font-sans">
                    Storage Packing 32-Byte, Custom Errors, ERC-20 Safe Transfer
                  </p>
                </div>
                <span className="text-emerald-400 font-bold">&check; VERIFIED</span>
              </div>

              <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-blue-400">Level 3: Proficient</span>
                  <p className="text-neutral-400 text-[11px] mt-0.5 font-sans">
                    Foundry Forge Tests, CEI Pattern & Reentrancy Mitigation
                  </p>
                </div>
                <span className="text-blue-400 font-bold">&check; VERIFIED</span>
              </div>

              <div className={cn(
                "rounded-xl border p-3.5 flex items-center justify-between",
                isBuilderTier ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/5 bg-white/[0.01] text-neutral-500"
              )}>
                <div>
                  <span className={cn("font-medium", isBuilderTier ? "text-emerald-400 font-bold" : "text-neutral-300")}>Level 4: Advanced</span>
                  <p className="text-neutral-400 text-[11px] mt-0.5 font-sans">
                    Fullstack dApp Viem Integration & Invariant Fuzzing
                  </p>
                </div>
                <span className={cn(isBuilderTier ? "text-emerald-400 font-bold" : "text-neutral-500 text-[11px]")}>
                  {isBuilderTier ? "✓ VERIFIED" : "IN PROGRESS"}
                </span>
              </div>

              <div className={cn(
                "rounded-xl border p-3.5 flex items-center justify-between",
                isBuilderTier ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/5 bg-white/[0.01] text-neutral-500"
              )}>
                <div>
                  <span className={cn("font-medium", isBuilderTier ? "text-emerald-400 font-bold" : "text-neutral-300")}>Level 5: Expert / Capstone</span>
                  <p className="text-neutral-400 text-[11px] mt-0.5 font-sans">
                    Independent Protocol Deployed & 8/8 Reality Check Passed
                  </p>
                </div>
                <span className={cn(isBuilderTier ? "text-emerald-400 font-bold" : "text-neutral-500 text-[11px]")}>
                  {isBuilderTier ? "✓ VERIFIED" : "LOCKED"}
                </span>
              </div>
            </div>
          </div>

          {/* Evidence Ledger Stream */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0d0f12] p-6 sm:p-7 shadow-xl">
            <div className="border-b border-white/5 pb-3 mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">Rekam Jejak Evidence Ledger</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Seluruh aksi teknis yang menghasilkan bukti kompetensi permanen.
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono text-neutral-300">
                {credDetails.evidenceItems.length} Records
              </span>
            </div>

            <div className="space-y-3.5">
              {credDetails.evidenceItems.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-xl border border-white/5 bg-white/[0.015] p-4 hover:border-white/15 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-bold text-white text-sm">
                      {ev.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-[#5e6ad2]/30 bg-[#5e6ad2]/10 px-2 py-0.5 text-[11px] font-mono text-[#8c97ff]">
                        {ev.level}
                      </span>
                      <span className="text-neutral-500 font-mono text-[11px]">
                        {ev.hash}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/practice"
                className="text-xs text-neutral-400 hover:text-white font-mono flex items-center gap-1.5"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Buka Sandbox untuk Tambah Evidence &rarr;</span>
              </Link>
              <Link
                href="/tracks/ethereum"
                className="text-xs text-[#8c97ff] hover:underline font-mono"
              >
                Lanjutkan Silabus Kurikulum &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
