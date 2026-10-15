"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Circles, type CircleRowItem } from "@/components/ui/circles";
import { CommunityWaitlistModal } from "@/components/community-waitlist-modal";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";
import { Sparkles, Users } from "lucide-react";

// Real People Portrait Circles — Exactly Matching React Bits Pro Aesthetic
const COMMUNITY_ROWS: CircleRowItem[][] = [
  // Ring 1 (Innermost - 4 People)
  [
    {
      id: "p-1",
      image: "/assets/avatars/avatar-1.jpg",
      label: "Alex R.",
      role: "Solidity & EVM Auditor",
      badge: "Level A Verified",
    },
    {
      id: "p-2",
      image: "/assets/avatars/avatar-2.jpg",
      label: "Budi S.",
      role: "DeFi Protocol Engineer",
      badge: "Tasik Chapter",
    },
    {
      id: "p-3",
      image: "/assets/avatars/avatar-3.jpg",
      label: "Elena M.",
      role: "Liquidity & DLMM Farmer",
      badge: "Meteora Alpha",
    },
    {
      id: "p-4",
      image: "/assets/avatars/avatar-4.jpg",
      label: "Kenji T.",
      role: "Rust & Solana Dev",
      badge: "Anchor Lead",
    },
  ],

  // Ring 2 (Middle - 6 People)
  [
    {
      id: "p-5",
      image: "/assets/avatars/avatar-5.jpg",
      label: "Sarah W.",
      role: "Airdrop & Testnet Hunter",
      badge: "Early Adopter",
    },
    {
      id: "p-6",
      image: "/assets/avatars/avatar-6.jpg",
      label: "David K.",
      role: "On-Chain Arbitrage Trader",
      badge: "DEX Analyst",
    },
    {
      id: "p-7",
      image: "/assets/avatars/avatar-7.jpg",
      label: "Jessica L.",
      role: "Fullstack Web3 Viem/Wagmi",
      badge: "Jakarta Chapter",
    },
    {
      id: "p-8",
      image: "/assets/avatars/avatar-8.jpg",
      label: "Reza A.",
      role: "Security Exploit Triage",
      badge: "Foundry Suite",
    },
    {
      id: "p-9",
      image: "/assets/avatars/avatar-9.jpg",
      label: "Chloe P.",
      role: "DePIN Node Operator",
      badge: "0G & Grass",
    },
    {
      id: "p-10",
      image: "/assets/avatars/avatar-10.jpg",
      label: "Ryan H.",
      role: "Zero-Knowledge Researcher",
      badge: "Circom Proofs",
    },
  ],

  // Ring 3 (Outer - 8 People)
  [
    {
      id: "p-11",
      image: "/assets/avatars/avatar-11.jpg",
      label: "Michael C.",
      role: "Arbitrum Stylus Builder",
      badge: "Bandung Chapter",
    },
    {
      id: "p-12",
      image: "/assets/avatars/avatar-12.jpg",
      label: "Sofia N.",
      role: "DeAI Agent Orchestrator",
      badge: "Bittensor Subnet",
    },
    {
      id: "p-13",
      image: "/assets/avatars/avatar-13.jpg",
      label: "Nadia F.",
      role: "Smart Contract Reviewer",
      badge: "EVM Fellow",
    },
    {
      id: "p-14",
      image: "/assets/avatars/avatar-14.jpg",
      label: "Hendra B.",
      role: "Cross-Chain Relayer",
      badge: "Wormhole NTT",
    },
    {
      id: "p-15",
      image: "/assets/avatars/avatar-15.jpg",
      label: "Amira D.",
      role: "Campus League Mentor",
      badge: "Surabaya Chapter",
    },
    {
      id: "p-16",
      image: "/assets/avatars/avatar-16.jpg",
      label: "Daniel V.",
      role: "Futures & Funding Farmer",
      badge: "Delta Neutral",
    },
    {
      id: "p-17",
      image: "/assets/avatars/avatar-17.jpg",
      label: "Kevin W.",
      role: "Constant Product AMM",
      badge: "Jogja Chapter",
    },
    {
      id: "p-18",
      image: "/assets/avatars/avatar-18.jpg",
      label: "Putri S.",
      role: "DID & Learner Ledger",
      badge: "Bali Chapter",
    },
  ],

  // Ring 4 (Outermost with subtle depth of field fade - 10 People)
  [
    { id: "p-19", image: "/assets/avatars/avatar-19.jpg", label: "Farhan M.", role: "Web3 Contributor" },
    { id: "p-20", image: "/assets/avatars/avatar-20.jpg", label: "Siti K.", role: "Airdrop Explorer" },
    { id: "p-21", image: "/assets/avatars/avatar-1.jpg", label: "Genta P.", role: "Smart Contract Dev" },
    { id: "p-22", image: "/assets/avatars/avatar-2.jpg", label: "Ilham B.", role: "DeFi Yield Farmer" },
    { id: "p-23", image: "/assets/avatars/avatar-3.jpg", label: "Clara T.", role: "Sui Move Builder" },
    { id: "p-24", image: "/assets/avatars/avatar-4.jpg", label: "Raka D.", role: "Solana Researcher" },
    { id: "p-25", image: "/assets/avatars/avatar-5.jpg", label: "Anisa R.", role: "Crypto Analyst" },
    { id: "p-26", image: "/assets/avatars/avatar-6.jpg", label: "Dimas S.", role: "Node Operator" },
    { id: "p-27", image: "/assets/avatars/avatar-7.jpg", label: "Ayu W.", role: "Security Auditor" },
    { id: "p-28", image: "/assets/avatars/avatar-8.jpg", label: "Bayu F.", role: "Web3 Designer" },
  ],
];

export default function CommunityCirclesDemo() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* Concentric Real-People Circles */}
      <Circles
        rows={COMMUNITY_ROWS}
        baseRadius={105}
        radiusStep={75}
        baseDuration={36}
        additionalDuration={10}
        circleSize={48}
        alternateDirection={true}
        pauseOnHover={true}
        depthFade={true}
        centerContent={
          /* Sleek circular hub (same dimension as avatars, matching React Bits Pro) */
          <button
            type="button"
            onClick={() => setWaitlistOpen(true)}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#08090a] shadow-[0_0_35px_rgba(94,106,210,0.5)] transition-all duration-300 hover:scale-115 hover:border-white hover:shadow-[0_0_50px_rgba(94,106,210,0.8)] cursor-pointer"
            aria-label="Open Community Waiting List"
          >
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[#5e6ad2]/25 blur-md group-hover:bg-[#5e6ad2]/50 transition-colors" />
            <Image
              src="/assets/brand/onvora-icon.png"
              alt="Onvora"
              width={30}
              height={30}
              className="relative z-10 h-7 w-7 object-contain transition-transform group-hover:rotate-12 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]"
            />
          </button>
        }
      />

      {/* Floating Pill Action beneath the orbits */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setWaitlistOpen(true)}
          className={cn(
            "group rounded-full bg-white px-6 py-3 font-semibold text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] inline-flex items-center gap-2 cursor-pointer",
            typeClass("caption")
          )}
        >
          <Sparkles className="h-4 w-4 text-[#5e6ad2]" />
          <span>Gabung Waiting List Batch 01 &rarr;</span>
        </button>

        <span className={cn("text-neutral-400 font-mono text-xs flex items-center gap-1.5")}>
          <Users className="h-3.5 w-3.5 text-emerald-400" />
          <span>400+ Builders &amp; Explorers sudah di dalam list</span>
        </span>
      </div>

      <CommunityWaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
      />
    </div>
  );
}
