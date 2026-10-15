"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Award,
  Terminal,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { getCredentialByCode } from "@/lib/evidence-service";

export default function PublicVerifyPage({
  params,
}: {
  params: Promise<{ credentialId: string }>;
}) {
  const resolvedParams = use(params);
  const [copied, setCopied] = useState(false);

  const credential = getCredentialByCode(resolvedParams.credentialId);

  const handleCopyHash = async () => {
    if (typeof window !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8] min-h-screen">
      <div className="mx-auto w-full max-w-[960px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link
            href="/passport"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Builder Passport</span>
          </Link>
        </div>

        {/* Verification Certificate Panel */}
        <div className="rounded-3xl border border-emerald-500/30 bg-[#0d0f17] p-8 sm:p-12 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

          {/* Verification Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    AUTHENTIC &bull; {credential.status}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                  Open Credential Verification
                </h1>
              </div>
            </div>

            <div className="text-left sm:text-right font-mono text-xs">
              <span className="text-neutral-500">ID Kredensial Resmi:</span>
              <div className="text-sm font-bold text-white mt-0.5">{credential.credentialId}</div>
            </div>
          </div>

          {/* Holder & Tier Info */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-xl border border-white/15 bg-black/40 p-2 shrink-0 flex items-center justify-center">
                  <Image
                    src="/assets/tracks/eth.png"
                    alt="Ethereum Track"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#8c97ff]">Penerima Kredensial:</span>
                  <h2 className="text-xl font-bold text-white">{credential.holderName}</h2>
                  <span className="text-xs font-mono text-neutral-400">@{credential.holderUsername}</span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-block rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-mono font-bold text-emerald-300">
                  {credential.tier}
                </span>
                <div className="text-xs font-mono text-neutral-400 mt-2 flex items-center sm:justify-end gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Diterbitkan: {new Date(credential.issuedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Capabilities */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-[#8c97ff]" />
                <span>Daftar Keterampilan Teknis Terverifikasi (Evidence Gates):</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {credential.skillsVerified.map((skill, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/5 bg-white/[0.015] p-3 text-xs text-neutral-300 font-mono flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="leading-snug">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Assertions & Reality Check */}
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base mb-3 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-neutral-400" />
                <span>Bukti Rekam Jejak Assertion Tests &amp; Audit:</span>
              </h3>
              <div className="space-y-2.5">
                {credential.evidenceItems.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-xl border border-white/5 bg-white/[0.01] p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold text-neutral-200">{ev.title}</span>
                      <p className="text-neutral-400 text-[11px] mt-0.5">{ev.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                      <span className="text-[#8c97ff] border border-[#5e6ad2]/20 bg-[#5e6ad2]/10 px-2 py-0.5 rounded">
                        {ev.level}
                      </span>
                      <span className="text-neutral-500">{ev.hash}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Footer & Actions */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-500 font-mono">
              Onvora Canonical Protocol &middot; Cryptographically Signed
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/certificate/${credential.credentialId}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ffd978]/40 bg-[#ffd978]/10 px-4 py-2 text-xs font-mono font-bold text-[#ffd978] hover:bg-[#ffd978]/20 transition-all shadow-md"
              >
                <span>Lihat Sertifikat Resmi &rarr;</span>
              </Link>
              <button
                onClick={handleCopyHash}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-neutral-400" />}
                <span>{copied ? "Tautan Tersalin!" : "Salin Bukti URL"}</span>
              </button>
              <Link
                href="/tracks/ethereum"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#5e6ad2] px-5 py-2 text-xs font-semibold text-white hover:bg-[#6c78e0] transition-colors"
              >
                <span>Lihat Silabus Lengkap</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
