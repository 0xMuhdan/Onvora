"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Printer,
  Share2,
  Copy,
  Check,
  Award,
  ArrowLeft,
} from "lucide-react";
import type { CredentialData } from "@/lib/evidence-service";

interface VisualCertificateProps {
  credential: CredentialData;
}

export function VisualCertificate({ credential }: VisualCertificateProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    credential.tier
  )}&organizationName=Onvora+Protocol&issueYear=2026&issueMonth=10&certUrl=${encodeURIComponent(
    credential.verificationUrl
  )}&certId=${encodeURIComponent(credential.credentialId)}`;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Action Toolbar (Hidden during print) */}
      <div className="print:hidden w-full max-w-[1040px] flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          href="/passport"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Builder Passport</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-neutral-400" />}
            <span>{copied ? "Tautan Tersalin!" : "Salin Link"}</span>
          </button>

          <a
            href={shareLinkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0a66c2]/40 bg-[#0a66c2]/15 px-4 py-2 text-xs font-mono text-[#70b5f9] hover:bg-[#0a66c2]/25 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Add to LinkedIn</span>
          </a>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors shadow-md cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Cetak / Simpan PDF (A4)</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Paper Container (A4 Landscape ratio ~ 1.414) */}
      <div
        id="certificate-print-area"
        className="w-full max-w-[1040px] aspect-[1.414/1] rounded-3xl border-2 border-[#cf9f38]/60 bg-gradient-to-br from-[#121624] via-[#0b0e17] to-[#06070a] p-8 sm:p-14 shadow-[0_0_60px_-15px_rgba(207,159,56,0.25)] relative overflow-hidden flex flex-col justify-between text-[#f7f8f8] select-none print:shadow-none print:border-black print:rounded-none print:p-10 print:max-w-none print:w-full"
      >
        {/* Subtle Watermark Ethereum in Background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035] -rotate-12">
          <Image
            src="/assets/tracks/eth.png"
            alt="Ethereum Watermark"
            width={480}
            height={480}
            className="object-contain"
          />
        </div>

        {/* Decorative Inner Golden Guilloche Border */}
        <div className="pointer-events-none absolute inset-3 sm:inset-4 rounded-2xl border border-[#ffd978]/30 border-dashed" />
        <div className="pointer-events-none absolute inset-5 sm:inset-6 rounded-xl border border-white/5" />

        {/* Corner Accents */}
        <div className="pointer-events-none absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#ffd978]/70" />
        <div className="pointer-events-none absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#ffd978]/70" />
        <div className="pointer-events-none absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#ffd978]/70" />
        <div className="pointer-events-none absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#ffd978]/70" />

        {/* 1. Header Protocol Authority */}
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="relative w-6 h-6 sm:w-8 sm:h-8">
              <Image src="/assets/tracks/eth.png" alt="ETH Emblem" fill className="object-contain" />
            </div>
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#ffd978] uppercase">
              ONVORA PROTOCOL &bull; ETHEREUM ECOSYSTEM ACADEMY
            </span>
          </div>
          <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] text-neutral-400 uppercase">
            CANONICAL EVIDENCE LEDGER &bull; VERIFIABLE CREDENTIAL REGISTRY
          </div>
        </div>

        {/* 2. Certificate Formal Title */}
        <div className="relative z-10 text-center my-4">
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase drop-shadow-md">
            Certificate of Technical Mastery
          </h1>
          <div className="w-48 h-0.5 mx-auto mt-2 bg-gradient-to-r from-transparent via-[#ffd978] to-transparent" />
          <p className="font-sans text-[11px] sm:text-xs text-neutral-400 mt-2 tracking-wide uppercase">
            DENGAN INI MENYATAKAN SECARA RESMI BAHWA:
          </p>
        </div>

        {/* 3. Recipient Name Highlight */}
        <div className="relative z-10 text-center my-2">
          <div className="inline-block rounded-2xl border border-white/10 bg-[#0c0f18]/80 px-8 sm:px-14 py-2 sm:py-3 shadow-inner">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-wide text-[#ffd978] drop-shadow-[0_2px_10px_rgba(255,217,120,0.3)]">
              {credential.holderName}
            </h2>
          </div>
          <div className="font-mono text-[11px] sm:text-xs text-blue-400 mt-2">
            IDENTITAS ON-CHAIN: {credential.holderUsername} &bull; ID: {credential.credentialId}
          </div>
        </div>

        {/* 4. Citation & Award Badge */}
        <div className="relative z-10 text-center my-3">
          <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Telah berhasil menyelesaikan seluruh 12 Phase Kurikulum Teknis dan membuktikan kompetensi rekayasa smart contract standar industri melalui serangkaian assertion test dan reality check independen:
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-5 py-1 text-xs sm:text-sm font-mono font-bold text-emerald-300 tracking-wider">
            <Award className="h-4 w-4 text-emerald-400" />
            <span>{credential.tier.toUpperCase()}</span>
            <span className="text-emerald-500">&bull; LEVEL 5 (EXPERT VERIFIED)</span>
          </div>
        </div>

        {/* 5. 4 Verified Competency Boxes */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
          <div className="rounded-xl border border-white/10 bg-black/40 p-2.5 sm:p-3 text-left">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-bold">
              <span>●</span> EVM INTERNALS
            </div>
            <p className="text-[10px] text-neutral-400 font-sans mt-0.5 leading-snug">
              Gas EIP-1559, Storage 32B Packing &amp; Opcode execution
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-2.5 sm:p-3 text-left">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-bold">
              <span>●</span> SOLIDITY 0.8.20+
            </div>
            <p className="text-[10px] text-neutral-400 font-sans mt-0.5 leading-snug">
              Custom Error Selectors, OpenZeppelin v5 Contracts
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-2.5 sm:p-3 text-left">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-bold">
              <span>●</span> FOUNDRY SUITE
            </div>
            <p className="text-[10px] text-neutral-400 font-sans mt-0.5 leading-snug">
              Forge Unit Tests, Fuzzing Invariants &amp; Anvil Forking
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-2.5 sm:p-3 text-left">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-bold">
              <span>●</span> CAPSTONE REALITY
            </div>
            <p className="text-[10px] text-neutral-400 font-sans mt-0.5 leading-snug">
              8/8 Reality Check Passed, Sepolia Live Verified
            </p>
          </div>
        </div>

        {/* 6. Footer Authorities, Seal & Verification QR */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/10">
          {/* Official Golden Stamp Seal */}
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full border-2 border-[#ffd978] bg-[#141824] p-1 shadow-lg flex items-center justify-center shrink-0">
              <div className="h-full w-full rounded-full border border-[#ffd978]/60 border-dashed flex flex-col items-center justify-center text-center">
                <span className="text-[7px] font-mono font-bold text-[#ffd978] leading-tight">ONVORA</span>
                <span className="text-[9px]">★</span>
                <span className="text-[6px] font-mono text-emerald-400">VERIFIED</span>
              </div>
            </div>
            <div className="text-left font-mono text-[10px]">
              <span className="text-neutral-400">STATUS LISENSI:</span>
              <div className="font-bold text-emerald-400">{credential.status}</div>
              <span className="text-neutral-500 text-[9px]">DITERBITKAN: 13 OKTOBER 2026</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex items-center gap-8 text-center font-mono text-[10px]">
            <div>
              <div className="text-blue-400 font-serif italic text-sm mb-1 opacity-90">Onvora Academic</div>
              <div className="w-28 h-px bg-neutral-600 mx-auto mb-1" />
              <div className="font-bold text-white">ONVORA COUNCIL</div>
              <div className="text-[8px] text-neutral-500">Curriculum Board</div>
            </div>
            <div>
              <div className="text-emerald-400 font-serif italic text-sm mb-1 opacity-90">Veritas Security</div>
              <div className="w-28 h-px bg-neutral-600 mx-auto mb-1" />
              <div className="font-bold text-white">VERITAS AUDIT</div>
              <div className="text-[8px] text-neutral-500">Security Lead</div>
            </div>
          </div>

          {/* Verification Hash & QR Link */}
          <div className="text-left sm:text-right font-mono text-[10px]">
            <span className="text-neutral-400">VERIFIKASI TERBUKA:</span>
            <div className="text-blue-400 text-[11px] font-bold">
              onvora.id/verify/{credential.credentialId}
            </div>
            <span className="text-neutral-500 text-[9px]">HASH: 0x8fa1c4...34b9</span>
          </div>
        </div>
      </div>
    </div>
  );
}
