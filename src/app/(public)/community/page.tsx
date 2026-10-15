"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardGroup,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardButton,
} from "@/components/ui/card";
import { CommunityWaitlistModal } from "@/components/community-waitlist-modal";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";
import {
  Coffee,
  TrendingUp,
  Coins,
  Layers,
  Terminal,
  Cpu,
  Sparkles,
  MessageCircle,
  Send,
  CheckCircle2,
  MapPin,
  Users,
} from "lucide-react";

// 6 Jalan Menghasilkan Cuan di Web3 / Blockchain
const WAYS_TO_EARN = [
  {
    id: "trading",
    title: "1. Trading & Arbitrage",
    icon: TrendingUp,
    badge: "Spot & Futures",
    accent: "#10B981",
    tagline: "Bukan tebak-tebak grafik, tapi analisis data on-chain.",
    desc: "Mulai dari Spot accumulation di siklus bull/bear, Futures hedging, Arbitrage harga antar DEX (Uniswap vs Curve vs CEX), hingga triangular swap menggunakan data likuiditas on-chain.",
    examples: "Funding rate farming, DEX-CEX arbitrage, whale wallet tracking.",
  },
  {
    id: "liquidity",
    title: "2. DeFi & Liquidity (DLMM / AMM)",
    icon: Coins,
    badge: "Passive Yield",
    accent: "#6366F1",
    tagline: "Menjadi kasir pertukaran token dan memanen fee transaksi.",
    desc: "Pasang likuiditas di Concentrated Liquidity (Uniswap v3) atau Dynamic Liquidity Market Maker (Meteora DLMM). Setiap ada trader yang menukar token di rentang harga Anda, Anda menghasilkan fee pasif.",
    examples: "Meteora DLMM, Uniswap v3 fee tiers, Aave lending borrow APY.",
  },
  {
    id: "airdrop",
    title: "3. Airdrop & Retroactive Farming",
    icon: Sparkles,
    badge: "Zero to Low Capital",
    accent: "#EC4899",
    tagline: "Cukup modal waktu & interaksi awal, raih alokasi token bernilai.",
    desc: "Protokol blockchain baru membagikan token gratis kepada pengguna awal (early adopters) yang membantu mencoba testnet, bridge aset, atau menjalankan node tanpa perlu beli kripto mahal.",
    examples: "Testnet faucet missions, protocol bridging, devnet node runners.",
  },
  {
    id: "bounties",
    title: "4. Dev Grants, Bounties & Hackathons",
    icon: Terminal,
    badge: "High Payouts",
    accent: "#F59E0B",
    tagline: "Selesaikan bug security atau bangun dApp prototipe.",
    desc: "Yayasan blockchain (Ethereum, Solana, Monad, Arbitrum) rutin mendanai jutaan dolar untuk developer. Ikuti kompetisi hackathon global berhadiah puluhan ribu dolar atau cari bug smart contract di Immunefi.",
    examples: "$10k-$100k Hackathon prize pool, Immunefi bug bounties, ecosystem grants.",
  },
  {
    id: "depin_ai",
    title: "5. DePIN & Decentralized AI Compute",
    icon: Cpu,
    badge: "Hardware & Bandwidth",
    accent: "#06B6D4",
    tagline: "Monetisasi resource laptop, internet, atau GPU nganggur.",
    desc: "Ekosistem DePIN (Decentralized Physical Infrastructure) dan DeAI memungkinkan Anda berbagi bandwidth internet atau compute power untuk melatih model AI dan memvalidasi jaringan penyimpanan data.",
    examples: "0G Storage node, Bittensor subnet validation, Grass network sharing.",
  },
  {
    id: "remote_jobs",
    title: "6. Remote Global Web3 Career",
    icon: Users,
    badge: "Salary in USD / Stablecoin",
    accent: "#8B5CF6",
    tagline: "Kerja dari cafe di Indonesia dengan gaji standar internasional.",
    desc: "Industri Web3 sangat kekurangan talenta teknis dan non-teknis terpercaya. Mulai dari Smart Contract Dev, Frontend Viem/Wagmi, Technical Writer, sampai Community Lead dibayar gaji dollar langsung ke wallet.",
    examples: "Junior Solidity Engineer, Web3 Growth Lead, Protocol QA Tester.",
  },
];

// Tongkrongan Cafe per Kota (BFC Hubs)
const MEETUP_CIRCLES = [
  {
    id: "tasik",
    city: "Tasikmalaya",
    venue: "Hazet, Dadaha & Unsil Coffee Spots",
    badge: "● FOUNDER CHAPTER",
    focus: "Airdrop Alpha, Liquidity DLMM & Ngopi Bareng",
    members: 58,
    accent: "#10B981",
  },
  {
    id: "jkt",
    city: "Jakarta & Sekitarnya",
    venue: "Senopati & Blok M Coffee Spots",
    badge: "● BATCH 01 WAITLIST",
    focus: "EVM Smart Contracts, Airdrop Alpha & DeFi Liquidity",
    members: 142,
    accent: "#5e6ad2",
  },
  {
    id: "bdg",
    city: "Bandung",
    venue: "Dago & Riau Creative Cafes",
    badge: "● BATCH 01 WAITLIST",
    focus: "Web3 Engineering, Rust Systems & DeAI",
    members: 98,
    accent: "#10B981",
  },
  {
    id: "sby",
    city: "Surabaya",
    venue: "Barat & Pusat Coffee Roasters",
    badge: "● BATCH 01 WAITLIST",
    focus: "On-Chain Trading, Arbitrage & Protocol Testing",
    members: 76,
    accent: "#F59E0B",
  },
  {
    id: "jogja",
    city: "Yogyakarta",
    venue: "Jakal & Prawirotaman Co-Working Cafes",
    badge: "● BATCH 01 WAITLIST",
    focus: "Foundry Testing, Security Audit & Academic Circles",
    members: 89,
    accent: "#8B5CF6",
  },
  {
    id: "bali",
    city: "Bali (Canggu & Ubud)",
    venue: "Nomad Hubs & Coffee Workspaces",
    badge: "● BATCH 01 WAITLIST",
    focus: "Global Hackathons, Venture Grants & Founder Meetups",
    members: 64,
    accent: "#EC4899",
  },
  {
    id: "online",
    city: "Online / Kota Lainnya",
    venue: "Discord Voice & Google Meet Rooms",
    badge: "● GLOBAL ACCESS",
    focus: "Weekend Voice Lounge & Virtual Sprint Sessions",
    members: 230,
    accent: "#06B6D4",
  },
];

export default function CommunityPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<"whatsapp" | "telegram">("whatsapp");
  const [selectedInterest, setSelectedInterest] = useState<string>("airdrop");

  function openWaitlist(channel: "whatsapp" | "telegram", interest: string = "airdrop") {
    setSelectedChannel(channel);
    setSelectedInterest(interest);
    setWaitlistOpen(true);
  }

  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <div className="relative rounded-3xl border border-white/10 bg-[#0c0d10] p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl overflow-hidden mb-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#5e6ad2]/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-[#10B981]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-bold text-emerald-400 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className={typeClass("micro")}>BATCH 01 WAITING LIST OPEN</span>
            </div>

            <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
              BFC: Build From Cafe.
            </h1>

            <p className={cn("mt-4 text-neutral-300 leading-relaxed", typeClass("body"))}>
              Kalau orang kantor punya WFC (Work From Cafe), kita punya <strong>BFC</strong>: nongkrong santai akhir pekan di coffee shop lokal, ngobrolin seputar crypto, berburu airdrop testnet, bedah strategi liquidity &amp; trading, sampai latihan koding smart contract pertama bareng temen-temen sefrekuensi.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openWaitlist("whatsapp")}
                className={cn(
                  "rounded-full bg-white px-7 py-3.5 font-semibold text-black hover:bg-neutral-200 transition-all shadow-[0_0_25px_-3px_rgba(255,255,255,0.4)] inline-flex items-center gap-2 cursor-pointer",
                  typeClass("caption")
                )}
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                Gabung Waiting List WhatsApp &rarr;
              </button>

              <button
                type="button"
                onClick={() => openWaitlist("telegram")}
                className={cn(
                  "rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all inline-flex items-center gap-2 cursor-pointer",
                  typeClass("caption")
                )}
              >
                <Send className="h-4 w-4 text-sky-400" />
                Gabung Telegram Alpha &rarr;
              </button>
            </div>

            <div className={cn("mt-6 flex flex-wrap items-center gap-4 text-neutral-400", typeClass("caption"))}>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Bebas tanya dari nol
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Anti-pompom koin bodong
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Teman ngopi offline &amp; online
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: BANYAK CARA DAPET DUIT DI CRYPTO / WEB3 */}
        <div className="mb-20">
          <div className="max-w-3xl mb-10">
            <span className={cn("text-[#5e6ad2] font-semibold font-mono uppercase tracking-wider", typeClass("micro"))}>
              Ecosystem Opportunities
            </span>
            <h2 className={cn("mt-1.5 font-bold text-white tracking-tight", typeClass("display"))}>
              Banyak Cara Menghasilkan di Crypto &amp; Web3.
            </h2>
            <p className={cn("mt-2 text-neutral-400 leading-relaxed", typeClass("body"))}>
              Dunia blockchain bukan cuma soal beli koin lalu berdoa naik. Ada puluhan model ekonomi nyata yang bisa kamu pelajari dan eksekusi bareng komunitas Onvora:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WAYS_TO_EARN.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                        style={{ color: item.accent }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={cn("rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-neutral-400 font-mono", typeClass("micro"))}>
                        {item.badge}
                      </span>
                    </div>

                    <h3 className={cn("font-bold text-white group-hover:text-white", typeClass("title"))}>
                      {item.title}
                    </h3>
                    <p className={cn("mt-1 font-semibold text-[#5e6ad2]", typeClass("caption"))}>
                      {item.tagline}
                    </p>
                    <p className={cn("mt-2.5 text-neutral-400 leading-relaxed", typeClass("body"))}>
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-white/5">
                    <p className={cn("text-neutral-500 font-mono", typeClass("micro"))}>
                      Contoh: <span className="text-neutral-300">{item.examples}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => openWaitlist("whatsapp", item.id)}
                      className={cn("mt-3 inline-flex items-center text-[#5e6ad2] hover:text-white font-semibold cursor-pointer", typeClass("caption"))}
                    >
                      Bahas ini di Komunitas &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: BFC MEETUP CIRCLES PER KOTA */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <span className={cn("text-[#5e6ad2] font-semibold font-mono uppercase tracking-wider", typeClass("micro"))}>
                Local Cafe Chapters
              </span>
              <h2 className={cn("mt-1.5 font-bold text-white tracking-tight", typeClass("display"))}>
                Pilih Kota Nongkrong Kamu.
              </h2>
              <p className={cn("mt-2 text-neutral-400", typeClass("body"))}>
                Setiap akhir pekan, kita tentukan coffee shop di kotamu untuk kumpul bareng 2–3 jam. Buka laptop, tukar info alpha terbaru, dan ngobrol santai tanpa sekat.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openWaitlist("whatsapp")}
              className={cn("rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-neutral-200 transition-colors shrink-0", typeClass("caption"))}
            >
              Masuk Waiting List Kota &rarr;
            </button>
          </div>

          <CardGroup columns={3} separated border="outlined">
            {MEETUP_CIRCLES.map((c, idx) => (
              <Card
                key={c.id}
                index={idx}
                onClick={() => openWaitlist("whatsapp", c.id)}
                className="p-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.015] hover:border-white/20 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-semibold border border-white/10 bg-white/5 text-neutral-300", typeClass("micro"))}>
                      <MapPin className="h-3 w-3 text-[#5e6ad2]" />
                      <span>{c.city}</span>
                    </span>
                    <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20")}>
                      {c.badge}
                    </span>
                  </div>

                  <CardHeader>
                    <CardTitle className={cn("text-white font-bold", typeClass("title"))}>
                      {c.venue}
                    </CardTitle>
                    <CardDescription className={cn("mt-2 text-neutral-400", typeClass("caption"))}>
                      Topik Diskusi: {c.focus}
                    </CardDescription>
                  </CardHeader>
                </div>

                <CardFooter className={cn("mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between", typeClass("caption"))}>
                  <span className="text-neutral-500 font-mono">{c.members} Peminat</span>
                  <CardButton variant="primary">
                    Pilih Kota Ini &rarr;
                  </CardButton>
                </CardFooter>
              </Card>
            ))}
          </CardGroup>
        </div>
      </div>

      {/* Waiting List Dialog Modal */}
      <CommunityWaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
        defaultChannel={selectedChannel}
        defaultInterest={selectedInterest}
      />
    </div>
  );
}
