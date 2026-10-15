"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
  SidebarInput,
} from "@/components/ui/sidebar";
import {
  Layers,
  Code2,
  Cpu,
  Database,
  Shield,
  Sparkles,
  Terminal,
  RotateCcw,
  Compass,
} from "lucide-react";
import { typeClass, fieldTouchClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  {
    name: "Solidity",
    role: "EVM Smart Contracts",
    desc: "Standar utama ekosistem Ethereum, Monad, Arbitrum, Mantle, Sonic, Linea, EDU Chain, dan protokol DeFi terbesar.",
    chains: "Ethereum, Monad, Arbitrum, Mantle, Sonic, Linea, EDU Chain",
  },
  {
    name: "Rust",
    role: "High-Performance Systems",
    desc: "Bahasa berkecepatan tinggi untuk arsitektur Solana, Near, Vara, Eclipse (SVM on ETH), dan Wormhole messaging.",
    chains: "Solana, Eclipse, Vara, Wormhole, Near",
  },
  {
    name: "Move",
    role: "Resource-Oriented Safety",
    desc: "Bahasa berbasis kepemilikan objek aman untuk smart contract di jaringan Sui, Aptos, dan IOTA Rebased.",
    chains: "Sui, Aptos, IOTA Rebased",
  },
  {
    name: "Python",
    role: "Decentralized AI & Compute",
    desc: "Bahasa machine learning untuk melatih subnet Bittensor, arsitektur data 0G, dan agen AI terdesentralisasi Gaia.",
    chains: "Bittensor, 0G, Gaia, Injective AI",
  },
  {
    name: "Cardano (Aiken)",
    role: "EUTXO Smart Contracts",
    desc: "Bahasa fungsional modern dan aman untuk menulis smart contract model EUTXO di ekosistem Cardano.",
    chains: "Cardano Ecosystem",
  },
  {
    name: "Compact",
    role: "Zero-Knowledge & Privacy",
    desc: "Bahasa smart contract berbasis Zero-Knowledge untuk proteksi data dan privasi komersial di Midnight Network.",
    chains: "Midnight Network",
  },
];

const CATEGORIES = [
  "All",
  "EVM",
  "Rust/Move",
  "AI & Data",
  "L2 & Rollups",
  "DeFi & Infra",
  "Privacy & DAO",
] as const;

const CATEGORY_ICONS: Record<string, typeof Layers> = {
  All: Compass,
  EVM: Layers,
  "Rust/Move": Cpu,
  "AI & Data": Sparkles,
  "L2 & Rollups": Database,
  "DeFi & Infra": Terminal,
  "Privacy & DAO": Shield,
};

export interface TrackItem {
  id: string;
  name: string;
  category: string;
  lang: string;
  desc: string;
  milestone: string;
  units: number;
  badge: string;
  image?: string;
  accentColor: string;
  symbol: string;
}

const ALL_TRACKS: TrackItem[] = [
  {
    id: "ethereum",
    name: "Ethereum Developer",
    category: "EVM",
    lang: "Solidity",
    desc: "Arsitektur smart contract EVM fundamental, Foundry testing, token ERC, security audit, dan DeFi protocols.",
    milestone: "Level B Ready",
    units: 12,
    badge: "EVM Foundation",
    image: "/assets/tracks/eth.png",
    accentColor: "#627EEA",
    symbol: "ETH",
  },
  {
    id: "monad",
    name: "Monad Developer",
    category: "EVM",
    lang: "Solidity",
    desc: "Rekayasa dApp performa tinggi pada parallel execution EVM (10,000 TPS) dan optimasi pipelining.",
    milestone: "Level B Ready",
    units: 8,
    badge: "Parallel EVM",
    image: "/assets/tracks/monad.png",
    accentColor: "#836EF9",
    symbol: "MONAD",
  },
  {
    id: "solana",
    name: "Solana Developer",
    category: "Rust/Move",
    lang: "Rust",
    desc: "Anchor framework, program model Solana, PDA (Program Derived Addresses), dan token standard SPL.",
    milestone: "Level B Ready",
    units: 10,
    badge: "High-Throughput",
    image: "/assets/tracks/solana.png",
    accentColor: "#14F195",
    symbol: "SOL",
  },
  {
    id: "arbitrum",
    name: "Arbitrum Developer",
    category: "L2 & Rollups",
    lang: "Solidity",
    desc: "Pengembangan dApp pada Arbitrum One/Nova, Nitro execution engine, gas estimation L2, dan Stylus (WASM/Rust).",
    milestone: "Level B Ready",
    units: 8,
    badge: "L2 Rollup",
    image: "/assets/tracks/arbitrum.png",
    accentColor: "#28A0F0",
    symbol: "ARB",
  },
  {
    id: "sui",
    name: "Sui Developer",
    category: "Rust/Move",
    lang: "Move",
    desc: "Object-centric data model, Sui Move smart contracts, programmable transaction blocks, dan dynamic fields.",
    milestone: "Level B Ready",
    units: 8,
    badge: "Object-Centric",
    image: "/assets/tracks/sui.png",
    accentColor: "#4DA2FF",
    symbol: "SUI",
  },
  {
    id: "0g",
    name: "0G Developer",
    category: "AI & Data",
    lang: "Python / Solidity",
    desc: "Penyimpanan data terdesentralisasi throughput tinggi untuk AI (0G DA & 0G Storage), dan integrasi on-chain AI models.",
    milestone: "Level B Ready",
    units: 7,
    badge: "Modular AI",
    image: "/assets/tracks/0g.png",
    accentColor: "#10B981",
    symbol: "0G",
  },
  {
    id: "mantle",
    name: "Mantle Developer",
    category: "L2 & Rollups",
    lang: "Solidity",
    desc: "Membangun dApp performa tinggi pada modular L2 dengan EigenDA data availability dan biaya transaksi ultra-rendah.",
    milestone: "Level B Ready",
    units: 8,
    badge: "Modular L2",
    image: "/assets/tracks/mantle.png",
    accentColor: "#00E599",
    symbol: "MNT",
  },
  {
    id: "injective",
    name: "Injective Developer",
    category: "DeFi & Infra",
    lang: "Rust",
    desc: "Infrastruktur pertukaran finansial instan, on-chain orderbook primitive, dan modul derivatif khusus.",
    milestone: "Level B Ready",
    units: 7,
    badge: "DeFi Infra",
    image: "/assets/tracks/injective.png",
    accentColor: "#00F2FE",
    symbol: "INJ",
  },
  {
    id: "injective-ai",
    name: "Injective AI Developer",
    category: "AI & Data",
    lang: "Python",
    desc: "Arsitektur agen otonom AI di Injective untuk eksekusi likuiditas terdesentralisasi dan arbitrase multi-market.",
    milestone: "Level B Ready",
    units: 6,
    badge: "AI Agents",
    image: "/assets/tracks/injective-ai.png",
    accentColor: "#4FACFE",
    symbol: "INJ-AI",
  },
  {
    id: "bittensor",
    name: "Bittensor Developer",
    category: "AI & Data",
    lang: "Python",
    desc: "Rekayasa subnet machine learning terdesentralisasi (Yuma Consensus), validasi miner, dan komputasi model AI terdistribusi.",
    milestone: "Level B Ready",
    units: 8,
    badge: "AI Subnets",
    image: "/assets/tracks/bittensor.png",
    accentColor: "#2F80ED",
    symbol: "TAO",
  },
  {
    id: "sonic",
    name: "Sonic Developer",
    category: "EVM",
    lang: "Solidity",
    desc: "Sonic Virtual Machine (SVM-grade EVM), settlement 10,000 TPS dengan 1-second finality, dan optimasi database Carmen.",
    milestone: "Level B Ready",
    units: 6,
    badge: "Fast EVM",
    image: "/assets/tracks/sonic.png",
    accentColor: "#F97316",
    symbol: "SONIC",
  },
  {
    id: "gaia",
    name: "Gaia Developer",
    category: "AI & Data",
    lang: "Python",
    desc: "Pembangunan agen kecerdasan buatan terdesentralisasi (DeAI agents), sistem memori on-chain, dan multi-agent orchestration.",
    milestone: "Level B Ready",
    units: 6,
    badge: "DeAI Agents",
    image: "/assets/tracks/gaia.png",
    accentColor: "#A855F7",
    symbol: "GAIA",
  },
  {
    id: "greenfield",
    name: "Greenfield Developer",
    category: "DeFi & Infra",
    lang: "Go / Solidity",
    desc: "Penyimpanan data Web3 terdesentralisasi terprogram (programmable data storage) terintegrasi langsung dengan kontrak pintar BNB Chain.",
    milestone: "Level B Ready",
    units: 7,
    badge: "Decentralized Storage",
    image: "/assets/tracks/greenfield.png",
    accentColor: "#F0B90B",
    symbol: "BNB-GF",
  },
  {
    id: "linea",
    name: "Linea Developer",
    category: "L2 & Rollups",
    lang: "Solidity",
    desc: "zkEVM Rollup setara bytecode EVM oleh Consensys: kompatibilitas penuh tooling Ethereum dengan biaya gas terkompresi.",
    milestone: "Level B Ready",
    units: 8,
    badge: "zkEVM Rollup",
    image: "/assets/tracks/linea.png",
    accentColor: "#61DFFF",
    symbol: "LINEA",
  },
  {
    id: "eclipse",
    name: "Eclipse Developer",
    category: "L2 & Rollups",
    lang: "Rust",
    desc: "Menjalankan Solana Virtual Machine (SVM) sebagai Layer 2 di atas Ethereum dengan ketersediaan data Celestia.",
    milestone: "Level B Ready",
    units: 7,
    badge: "SVM on Ethereum",
    image: "/assets/tracks/eclipse.png",
    accentColor: "#EC4899",
    symbol: "ECLIPSE",
  },
  {
    id: "wormhole",
    name: "Wormhole Developer",
    category: "L2 & Rollups",
    lang: "Rust / Solidity",
    desc: "Protokol messaging cross-chain generik, NTT (Native Token Transfers), dan composability lintas 30+ jaringan.",
    milestone: "Level A Ready",
    units: 8,
    badge: "Cross-Chain",
    image: "/assets/tracks/wormhole.png",
    accentColor: "#0052FF",
    symbol: "W",
  },
  {
    id: "xion",
    name: "XION Developer",
    category: "DeFi & Infra",
    lang: "Rust / CosmWasm",
    desc: "Chain abstraction menyeluruh (Generalized Abstraction), meta account tanpa seed phrase, dan UX ramah pengguna umum.",
    milestone: "Level B Ready",
    units: 6,
    badge: "Chain Abstraction",
    image: "/assets/tracks/xion.png",
    accentColor: "#6366F1",
    symbol: "XION",
  },
  {
    id: "edu-chain",
    name: "EDU Chain Developer",
    category: "EVM",
    lang: "Solidity",
    desc: "Membangun dApp edukasi Web3, kredensial terverifikasi on-chain, dan integrasi Open Campus L3 Rollup.",
    milestone: "Level B Ready",
    units: 6,
    badge: "EdTech L3",
    image: "/assets/tracks/edu-chain.png",
    accentColor: "#06B6D4",
    symbol: "EDU",
  },
  {
    id: "midnight",
    name: "Midnight Developer",
    category: "Privacy & DAO",
    lang: "Compact",
    desc: "Smart contract zero-knowledge dengan proteksi privasi data komersial menggunakan bahasa Compact pada jaringan Midnight.",
    milestone: "Level B Ready",
    units: 7,
    badge: "ZK Privacy",
    image: "/assets/tracks/midnight.png",
    accentColor: "#3B82F6",
    symbol: "NIGHT",
  },
  {
    id: "telos",
    name: "Telos Developer",
    category: "EVM",
    lang: "Solidity",
    desc: "Zero-Knowledge Hardware-accelerated EVM (SNARKtor), efisiensi throughput, dan arsitektur micro-transactions.",
    milestone: "Level B Ready",
    units: 6,
    badge: "ZK-EVM",
    image: "/assets/tracks/telos.png",
    accentColor: "#14B8A6",
    symbol: "TLOS",
  },
  {
    id: "vara",
    name: "Vara Developer",
    category: "Rust/Move",
    lang: "Rust",
    desc: "Pengembangan smart contract berbasis WASM pada Gear Protocol dengan model Actor-concurrency independen.",
    milestone: "Level B Ready",
    units: 7,
    badge: "WASM Network",
    image: "/assets/tracks/vara.png",
    accentColor: "#10B981",
    symbol: "VARA",
  },
  {
    id: "iota",
    name: "IOTA Developer",
    category: "EVM",
    lang: "Solidity / Move",
    desc: "IOTA Rebased: arsitektur EVM berkecepatan tinggi dengan integrasi Stardust, Move smart contracts, dan DAG Tangle.",
    milestone: "Level B Ready",
    units: 7,
    badge: "Tangle EVM",
    image: "/assets/tracks/iota.png",
    accentColor: "#0284C7",
    symbol: "IOTA",
  },
  {
    id: "ocid",
    name: "OCID Developer",
    category: "DeFi & Infra",
    lang: "Solidity / TS",
    desc: "Protokol Open Campus ID: manajemen identitas desentralisasi (DID), verifiable credentials, dan integrasi learner ledger.",
    milestone: "Level B Ready",
    units: 5,
    badge: "Decentralized ID",
    image: "/assets/tracks/ocid.png",
    accentColor: "#8B5CF6",
    symbol: "OCID",
  },
  {
    id: "nouns",
    name: "Nouns Developer",
    category: "Privacy & DAO",
    lang: "Solidity",
    desc: "Arsitektur governance DAO otonom on-chain, lelang token harian, settlement treasury multi-sig, dan fork logic.",
    milestone: "Level B Ready",
    units: 6,
    badge: "DAO Governance",
    image: "/assets/tracks/nouns.png",
    accentColor: "#EF4444",
    symbol: "NOUNS",
  },
  {
    id: "bga-aurasci",
    name: "BGA x AuraSci Learner",
    category: "AI & Data",
    lang: "Solidity / Python",
    desc: "Decentralized Science (DeSci), manajemen IP-NFT riset bioteknologi, pendanaan on-chain BioDAO, dan kurasi sains terbuka.",
    milestone: "Level B Ready",
    units: 6,
    badge: "DeSci & BioDAO",
    image: "/assets/tracks/bga-aurasci.png",
    accentColor: "#F59E0B",
    symbol: "BGA",
  },
];

/**
 * Dedicated Track Media Thumbnail with graceful fallback
 * Formatted with proper aspect ratio, ambient ecosystem glow, and hover zoom physics
 */
function TrackMedia({ track }: { track: TrackItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full sm:w-44 md:w-48 h-36 sm:h-auto sm:self-stretch shrink-0 rounded-xl overflow-hidden border border-white/10 bg-[#0c0d10] flex items-center justify-center group-hover:border-white/20 transition-all p-3">
      {/* Subtle Ambient Radial Glow from the ecosystem brand color */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 blur-2xl transition-opacity group-hover:opacity-45"
        style={{ backgroundColor: track.accentColor }}
      />

      {track.image && !imgError ? (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Image
            src={track.image}
            alt={track.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 176px, 192px"
            className="object-contain object-center p-3 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="relative z-10 flex h-full w-full min-h-[120px] flex-col items-center justify-center p-3 overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 font-mono text-xs font-bold text-white shadow-inner group-hover:scale-110 transition-transform"
              style={{ borderColor: `${track.accentColor}60` }}
            >
              {track.symbol}
            </span>
            <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              {track.badge}
            </span>
          </div>
          {/* Ambient Micro Dot Matrix */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px]" />
        </div>
      )}
      {/* Subtle Bottom Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090a]/60 via-transparent to-transparent" />
    </div>
  );
}

export default function TracksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredTracks = useMemo(() => {
    return ALL_TRACKS.filter((track) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        track.name.toLowerCase().includes(q) ||
        track.desc.toLowerCase().includes(q) ||
        track.lang.toLowerCase().includes(q) ||
        track.badge.toLowerCase().includes(q) ||
        track.symbol.toLowerCase().includes(q);

      const matchesLanguage =
        selectedLanguage === "All" ||
        track.lang.toLowerCase().includes(selectedLanguage.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || track.category === selectedCategory;

      return matchesSearch && matchesLanguage && matchesCategory;
    });
  }, [searchQuery, selectedLanguage, selectedCategory]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedLanguage !== "All" ||
    selectedCategory !== "All";

  function resetFilters() {
    setSearchQuery("");
    setSelectedLanguage("All");
    setSelectedCategory("All");
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="relative flex min-h-[calc(100dvh-5rem)] w-full bg-[#08090a] text-[#f7f8f8]">
        {/* Fluid Functionalism Sidebar for Tracks Filter */}
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="offcanvas"
          className="border-r border-white/10 bg-[#08090a]/95 pt-20"
        >
          <SidebarHeader className="p-4 border-b border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#5e6ad2]" />
                <span className={cn("font-bold text-white tracking-tight", typeClass("caption"))}>
                  Filters &amp; Search
                </span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className={cn("inline-flex items-center gap-1 text-[#5e6ad2] hover:underline font-mono", typeClass("micro"))}
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              )}
            </div>

            <div>
              <label
                htmlFor="search-sidebar-track"
                className={cn("block text-neutral-400 font-mono mb-1.5", typeClass("micro"))}
              >
                Cari Ekosistem:
              </label>
              <SidebarInput
                id="search-sidebar-track"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Solidity, Solana, AI..."
                className={cn(
                  "border-white/10 bg-white/5 text-white placeholder:text-neutral-500",
                  typeClass("caption"),
                  fieldTouchClass
                )}
              />
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            {/* Categories Menu Group */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-neutral-400 font-mono">
                Kategori Ekosistem
              </SidebarGroupLabel>
              <SidebarMenu>
                {CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat] ?? Layers;
                  const count =
                    cat === "All"
                      ? ALL_TRACKS.length
                      : ALL_TRACKS.filter((t) => t.category === cat).length;

                  return (
                    <SidebarMenuItem key={cat}>
                      <SidebarMenuButton
                        icon={Icon}
                        isActive={selectedCategory === cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="justify-between"
                      >
                        <span>{cat}</span>
                        <span className={cn("font-mono text-neutral-500", typeClass("micro"))}>
                          {count}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>

            {/* Languages Menu Group */}
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-neutral-400 font-mono">
                Bahasa Pemrograman
              </SidebarGroupLabel>
              <SidebarMenu>
                {["All", "Solidity", "Rust", "Move", "Python", "Cardano", "Compact"].map(
                  (lang) => (
                    <SidebarMenuItem key={lang}>
                      <SidebarMenuButton
                        icon={Code2}
                        isActive={selectedLanguage === lang}
                        onClick={() => setSelectedLanguage(lang)}
                      >
                        <span>{lang}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-white/10 text-neutral-500 font-mono">
            <div className={cn("flex items-center justify-between", typeClass("micro"))}>
              <span>Toggle Shortcut</span>
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-neutral-400">
                [
              </kbd>
            </div>
          </SidebarFooter>

          {/* Drag Resize Rail */}
          <SidebarRail />
        </Sidebar>

        {/* Main Content Pane inside SidebarInset */}
        <SidebarInset className="bg-[#08090a] pt-24 pb-16 px-4 sm:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            {/* Top Workspace Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white" />
                <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
                  <span>Tracks</span>
                  <span>/</span>
                  <span className="text-white font-medium">{selectedCategory}</span>
                  {selectedLanguage !== "All" && (
                    <>
                      <span>/</span>
                      <span className="text-[#5e6ad2]">{selectedLanguage}</span>
                    </>
                  )}
                </div>
              </div>

              <div className={cn("text-neutral-400 font-mono", typeClass("caption"))}>
                Menampilkan <strong>{filteredTracks.length}</strong> dari {ALL_TRACKS.length} trek
              </div>
            </div>

            {/* Hero Header */}
            <div className="max-w-3xl mb-10">
              <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
                Developer Tracks &amp; Ecosystems
              </h1>
              <p className={cn("mt-4 text-neutral-400", typeClass("body"))}>
                Katalog terstruktur 25+ ekosistem pengembang dan 6 bahasa pemrograman. Gunakan sidebar di samping untuk menyaring berdasarkan arsitektur (EVM, Rust/Move, AI &amp; Data) atau bahasa kode.
              </p>
            </div>

            {/* Tracks List */}
            {filteredTracks.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center my-6">
                <p className={cn("font-semibold text-white", typeClass("subtitle"))}>
                  Tidak ada trek yang sesuai filter.
                </p>
                <p className={cn("mt-2 text-neutral-400", typeClass("caption"))}>
                  Coba sesuaikan kata kunci pencarian atau reset filter di sidebar.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className={cn("mt-4 rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-neutral-200", typeClass("caption"))}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTracks.map((track) => {
                  const isEthereum = track.id === "ethereum";

                  return (
                    <article
                      key={track.id}
                      className={`group rounded-2xl border p-4 sm:p-5 transition-all relative overflow-hidden flex flex-col sm:flex-row gap-5 items-start ${
                        isEthereum
                          ? "border-[#5e6ad2]/50 bg-[#5e6ad2]/[0.04] shadow-[0_0_30px_-5px_rgba(94,106,210,0.15)]"
                          : "border-white/10 bg-white/[0.015] opacity-85 hover:opacity-100 hover:border-white/20"
                      }`}
                    >
                      {/* Photo / Ecosystem Identity Slot */}
                      <TrackMedia track={track} />

                      {/* Details & Actions Pane */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                        <div>
                          {/* Top Row: Title, Badge, and Coming Soon / Active Tag */}
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h2 className={cn("font-bold text-white", typeClass("title"))}>
                                {track.name}
                              </h2>
                              <span
                                className={cn(
                                  "rounded-full px-2.5 py-0.5 font-medium",
                                  typeClass("micro"),
                                  isEthereum
                                    ? "border border-[#5e6ad2]/40 bg-[#5e6ad2]/20 text-[#5e6ad2] font-semibold"
                                    : "border border-white/10 bg-white/5 text-neutral-400"
                                )}
                              >
                                {track.badge}
                              </span>
                              {!isEthereum && (
                                <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-bold text-amber-300", typeClass("micro"))}>
                                  <span>🔒</span>
                                  <span>COMING SOON</span>
                                </span>
                              )}
                              {isEthereum && (
                                <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-400", typeClass("micro"))}>
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>ACTIVE COHORT</span>
                                </span>
                              )}
                            </div>
                            <div className={cn("flex items-center gap-2 text-neutral-400 font-mono", typeClass("micro"))}>
                              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-white">
                                {track.lang}
                              </span>
                              <span className="text-neutral-500">
                                {track.category}
                              </span>
                            </div>
                          </div>

                          <p className={cn("mt-2 text-neutral-400 leading-relaxed", typeClass("body"))}>
                            {track.desc}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                          <div className={cn("flex items-center gap-3 text-neutral-500 font-mono", typeClass("caption"))}>
                            <span>{track.units} Modules</span>
                            <span>&middot;</span>
                            <span className="text-neutral-400 font-medium">{track.milestone}</span>
                          </div>
                          {isEthereum ? (
                            <div className="flex items-center gap-2">
                              <Link
                                href="/tracks/ethereum"
                                className={cn("inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-medium text-white hover:bg-white/10 transition-all", typeClass("caption"))}
                              >
                                View 12 Phases &rarr;
                              </Link>
                              <Link
                                href="/practice"
                                className={cn("inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 font-semibold text-black hover:bg-neutral-200 transition-all shadow-[0_0_15px_-3px_rgba(255,255,255,0.4)]", typeClass("caption"))}
                              >
                                Start Sandbox &rarr;
                              </Link>
                            </div>
                          ) : (
                            <span className={cn("inline-flex items-center gap-1 font-mono text-neutral-500 cursor-not-allowed", typeClass("caption"))}>
                              [Cohort Locked &middot; In Development]
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
