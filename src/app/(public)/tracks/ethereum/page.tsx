import Image from "next/image";
import Link from "next/link";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

interface PhaseUnit {
  id: string;
  title: string;
  estMinutes: number;
  lessonPath?: string;
}

interface PhaseDetail {
  phase: string;
  name: string;
  goal: string;
  badge: string;
  estHours: string;
  tools: string[];
  topics: string[];
  units: PhaseUnit[];
  milestone: string;
}

const PHASES: PhaseDetail[] = [
  {
    phase: "Phase 00",
    name: "Builder Diagnostic & Route",
    goal: "Menentukan titik awal belajar dan mengidentifikasi pemahaman dasar arsitektur desentralisasi.",
    badge: "Diagnostic",
    estHours: "30 menit",
    tools: ["Diagnostic Router", "Skill Matrix"],
    topics: ["Kuesioner routing", "Mental model check", "Pemetaan prasyarat materi"],
    units: [
      { id: "diag-01", title: "Web3 Mental Model & Prior Knowledge Assessment", estMinutes: 20 },
      { id: "diag-02", title: "Personalized Track Pathway Calibration", estMinutes: 10 },
    ],
    milestone: "Diagnostic Ready",
  },
  {
    phase: "Phase 01",
    name: "Web3 & Ethereum Fundamentals",
    goal: "Menguasai cara kerja EOA, Smart Contracts, Gas Auction EIP-1559, Mempool, State Storage, dan EVM Execution Lifecycle.",
    badge: "Core Mental Model",
    estHours: "8–10 jam",
    tools: ["EVM Machine", "EIP-1559", "JSON-RPC"],
    topics: ["EOA vs Contract Accounts", "Gas & Opcode Economics", "EVM State Tree & Storage", "RPC & Block Explorers"],
    units: [
      {
        id: "eth-fund-01-accounts-and-keys",
        title: "Accounts, Keys, and State Identity (EOA vs Contract)",
        estMinutes: 45,
        lessonPath: "/learn/ethereum/eth-fund-01-accounts-and-keys/eoa-vs-contract-accounts",
      },
      {
        id: "eth-fund-02-gas-and-eip1559",
        title: "Gas Mechanics and EIP-1559 Economics (Base vs Priority Fee)",
        estMinutes: 50,
        lessonPath: "/learn/ethereum/eth-fund-02-gas-and-eip1559/gas-units-and-eip1559-market",
      },
      {
        id: "eth-fund-03-evm-architecture",
        title: "EVM Architecture & Data Areas (Stack, Memory, Storage, Calldata)",
        estMinutes: 60,
        lessonPath: "/learn/ethereum/eth-fund-03-evm-architecture/stack-memory-storage-calldata",
      },
    ],
    milestone: "Level 1 Verified",
  },
  {
    phase: "Phase 02",
    name: "Interactive Blockchain Simulations",
    goal: "Melihat langsung mutasi state blockchain di browser tanpa biaya gas sebelum menulis kode kontrak penuh.",
    badge: "In-Browser Sandbox",
    estHours: "4–6 jam",
    tools: ["State Visualizer", "Opcode Step Trace"],
    topics: ["Simulasi transaksi lokal", "Contract call decoding", "Event emission", "Revert error tracing"],
    units: [
      { id: "eth-sim-01-transaction-lifecycle", title: "Mempool to Block Finality Simulation", estMinutes: 45 },
      { id: "eth-sim-02-state-transitions-and-reverts", title: "Call Execution Frame & Revert Reason Extraction", estMinutes: 45 },
    ],
    milestone: "Level 1-2 Verified",
  },
  {
    phase: "Phase 03",
    name: "Solidity Core Foundations",
    goal: "Menulis kode smart contract modern yang bersih: tipe data, 32-byte storage packing, function visibility, dan custom errors.",
    badge: "Solidity 0.8.20+",
    estHours: "10–14 jam",
    tools: ["Solidity 0.8.20+", "EIP-1153 Transient"],
    topics: ["Pragma & Compiler Standards", "Storage vs Memory vs Calldata", "Access Modifiers", "Custom Errors vs Require"],
    units: [
      {
        id: "sol-core-01-types-and-storage-layout",
        title: "Types, Storage Packing & Transient Storage (EIP-1153)",
        estMinutes: 60,
        lessonPath: "/learn/ethereum/sol-core-01-types-and-storage-layout/storage-slot-packing-rules",
      },
      {
        id: "sol-core-02-functions-and-custom-errors",
        title: "Functions, Visibility & Modern Custom Errors",
        estMinutes: 50,
        lessonPath: "/learn/ethereum/sol-core-02-functions-and-custom-errors/function-visibility-and-custom-errors",
      },
      { id: "sol-core-03-data-structures", title: "Mappings with Keccak Hashing & Dynamic Arrays", estMinutes: 60 },
    ],
    milestone: "Level 2 Verified",
  },
  {
    phase: "Phase 04",
    name: "Modular Contract Architecture",
    goal: "Merancang arsitektur kontrak modular menggunakan inheritance, interfaces, OpenZeppelin v5, dan SafeERC20.",
    badge: "Modular Contracts",
    estHours: "12–16 jam",
    tools: ["OpenZeppelin v5", "ERC-20 / ERC-721"],
    topics: ["Interface implementation", "OpenZeppelin standards", "Events & The Graph indexing", "Gas-efficient memory packing"],
    units: [
      { id: "sol-arch-01-inheritance-and-interfaces", title: "Inheritance, Interfaces & Composition (C3 Linearization)", estMinutes: 60 },
      { id: "sol-arch-02-openzeppelin-tokens", title: "OpenZeppelin v5 Standards: ERC-20, ERC-721 & SafeERC20", estMinutes: 60 },
      { id: "sol-arch-03-libraries-and-calldata", title: "Internal Libraries & Calldata Slice Processing", estMinutes: 50 },
    ],
    milestone: "Level 3 Verified",
  },
  {
    phase: "Phase 05",
    name: "Foundry Testing & Verification Suite",
    goal: "Menulis unit testing mendalam, cheatcodes manipulasi state, fuzz testing skenario ekstrem, dan deployment scripts.",
    badge: "Audit-Grade Testing",
    estHours: "14–18 jam",
    tools: ["Forge", "Cast CLI", "Anvil Node", "Fuzzing"],
    topics: ["Forge unit tests", "Fuzzing & Invariant checks", "Anvil local node simulation", "Cast CLI & On-Chain verification"],
    units: [
      {
        id: "foundry-01-forge-unit-tests",
        title: "Foundry Forge & Unit Testing Foundations",
        estMinutes: 60,
        lessonPath: "/learn/ethereum/foundry-01-forge-unit-tests/foundry-project-setup-and-tests",
      },
      { id: "foundry-02-cheatcodes-and-fuzzing", title: "Foundry Cheatcodes & Fuzz Testing (vm.prank, bound)", estMinutes: 60 },
      { id: "foundry-03-invariant-testing", title: "Stateful Invariant Testing & Handler Architecture", estMinutes: 70 },
      { id: "foundry-04-cast-and-anvil", title: "Cast CLI RPC Inspections & Local Anvil Forking", estMinutes: 50 },
    ],
    milestone: "Level 3-4 Verified",
  },
  {
    phase: "Phase 06",
    name: "Frontend dApp & Viem Integration",
    goal: "Menghubungkan smart contract ke frontend modern menggunakan Viem, Wagmi v2, dan reactive state management.",
    badge: "Fullstack Web3",
    estHours: "10–14 jam",
    tools: ["Viem", "Wagmi v2", "Next.js App Router"],
    topics: ["Wallet connection UX", "Contract read & write hooks", "Transaction lifecycle status", "Error boundary handling"],
    units: [
      { id: "dapp-01-viem-client-and-transports", title: "Type-Safe Viem Clients & RPC Transports", estMinutes: 50 },
      { id: "dapp-02-wagmi-and-contract-hooks", title: "Wagmi v2 React Hooks & Optimistic UI Updates", estMinutes: 60 },
      { id: "dapp-03-wallet-ux-and-error-boundaries", title: "Wallet Connection UX & User Rejection Recovery", estMinutes: 45 },
    ],
    milestone: "Level 4 Verified",
  },
  {
    phase: "Phase 07",
    name: "Smart Contract Security & Exploits",
    goal: "Menganalisis dan memitigasi vektor eksploitasi nyata: Reentrancy, Checks-Effects-Interactions, dan Oracle attacks.",
    badge: "Security & Auditing",
    estHours: "12–16 jam",
    tools: ["CEI Pattern", "ReentrancyGuard", "Slither"],
    topics: ["Checks-Effects-Interactions pattern", "ReentrancyGuard", "Flash loan defense", "Replay attack mitigations"],
    units: [
      {
        id: "sec-01-checks-effects-interactions",
        title: "Checks-Effects-Interactions & Reentrancy Mitigations",
        estMinutes: 75,
        lessonPath: "/learn/ethereum/sec-01-checks-effects-interactions/reentrancy-anatomy-and-cei",
      },
      { id: "sec-02-access-control-and-auth", title: "AccessControl Role Architecture & tx.origin Dangers", estMinutes: 60 },
      { id: "sec-03-oracles-and-economic-attacks", title: "Spot Price Oracle Manipulation & Chainlink Data Feeds", estMinutes: 60 },
    ],
    milestone: "Level 4 Verified",
  },
  {
    phase: "Phase 08",
    name: "Independent Capstone Production Project",
    goal: "Membangun produk dApp skala penuh secara mandiri dari awal yang lolos seluruh 8 kriteria Reality Check.",
    badge: "Production Build",
    estHours: "20–30 jam",
    tools: ["Full Protocol", "Sepolia Testnet", "Etherscan"],
    topics: ["Arsitektur protokol mandiri", "Test suite 100% coverage", "Deployment Sepolia Testnet", "Comprehensive documentation"],
    units: [
      { id: "capstone-01-protocol-architecture", title: "Decentralized Protocol Architecture & State Invariants", estMinutes: 90 },
      { id: "capstone-02-foundry-deployment", title: "Automated Deployment Scripting & Sepolia Verification", estMinutes: 90 },
      { id: "capstone-03-evidence-and-audit", title: "Reality Check Verification & Self-Audit Submission", estMinutes: 60 },
    ],
    milestone: "Level 4-5 Verified",
  },
  {
    phase: "Phase 09",
    name: "Peer Code Review & Rubric Evaluation",
    goal: "Menerima dan memberikan review kode teknikal berbasis rubrik audit standar industri.",
    badge: "Peer Review",
    estHours: "4–6 jam",
    tools: ["ONV-10 Rubric", "Gas Benchmark"],
    topics: ["Audit security checklist", "Gas optimization benchmark", "Architectural feedback loop"],
    units: [
      { id: "review-01-audit-rubric", title: "Industrial Audit Rubric Application & Gas Profiling", estMinutes: 60 },
      { id: "review-02-peer-exchange", title: "Double-Blind Peer Code Review Exchange", estMinutes: 60 },
    ],
    milestone: "Level 5 Verified",
  },
  {
    phase: "Phase 10",
    name: "Builder Readiness Benchmark",
    goal: "Evaluasi kesiapan teknis menyeluruh sebelum terhubung ke peluang ekosistem, hackathon, atau tim hiring.",
    badge: "Readiness Check",
    estHours: "2–4 jam",
    tools: ["Builder Passport", "Evidence Ledger"],
    topics: ["Technical capability index", "Evidence freshness audit", "Passport completion review"],
    units: [
      { id: "ready-01-passport-audit", title: "Evidence Freshness & Capability Benchmark Verification", estMinutes: 45 },
    ],
    milestone: "Certified Builder",
  },
  {
    phase: "Phase 11",
    name: "Real-World Evidence & Next Opportunity",
    goal: "Melakukan kontribusi Pull Request nyata ke repositori Web3 publik dan terhubung ke mitra ekosistem global.",
    badge: "Opportunity Gateway",
    estHours: "Fleksibel",
    tools: ["GitHub Open-Source", "Ecosystem Grants"],
    topics: ["Public GitHub PR merged", "Ecosystem grant submission", "Hackathon team formation", "Career role matching"],
    units: [
      { id: "opp-01-public-contribution", title: "Canonical Web3 Open-Source PR Contribution", estMinutes: 120 },
      { id: "opp-02-ecosystem-placement", title: "Ecosystem Partner Placement & Hackathon Matching", estMinutes: 60 },
    ],
    milestone: "Level A Industry Proof",
  },
];

export default function EthereumTrackDetailPage() {
  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8]">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className={cn("flex items-center gap-2 text-neutral-400 mb-6", typeClass("caption"))}>
          <Link href="/tracks" className="hover:text-white transition-colors">
            Tracks
          </Link>
          <span>/</span>
          <span className="text-white font-medium">Ethereum Developer</span>
        </div>

        {/* Hero Banner */}
        <div className="rounded-3xl border border-[#5e6ad2]/40 bg-[#5e6ad2]/[0.05] p-8 sm:p-12 shadow-2xl backdrop-blur-xl mb-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#5e6ad2]/15 blur-3xl" />
          
          <div className="relative max-w-2xl flex-1">
            <div className={cn("inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-bold text-emerald-400 mb-4", typeClass("micro"))}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE COHORT &middot; CANONICAL CURRICULUM</span>
            </div>

            <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
              Ethereum Developer Track
            </h1>

            <p className={cn("mt-4 text-neutral-300", typeClass("body"))}>
              Jalur kurikulum 12 Phase terstruktur berstandar industri modern (Solidity 0.8.20+, Foundry Suite, Viem, OpenZeppelin v5) untuk membawa Anda dari mental model nol hingga mampu menulis, menguji secara audit-grade, dan men-deploy smart contract produksi.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/learn/ethereum/eth-fund-01-accounts-and-keys/eoa-vs-contract-accounts"
                className={cn("rounded-full bg-white px-8 py-3.5 font-semibold text-black hover:bg-neutral-200 transition-all shadow-md", typeClass("caption"))}
              >
                Mulai Belajar di Lesson Player &rarr;
              </Link>
              <Link
                href="/practice"
                className={cn("rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white hover:bg-white/10 transition-colors", typeClass("caption"))}
              >
                Buka Sandbox Koding
              </Link>
            </div>
          </div>

          {/* Ethereum Emblem Showcase Card */}
          <div className="relative z-10 shrink-0 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl border border-white/10 bg-[#08090a]/80 p-5 flex items-center justify-center shadow-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[#627EEA]/25 blur-3xl rounded-full" />
            <Image
              src="/assets/tracks/eth.png"
              alt="Ethereum Developer Track Emblem"
              fill
              className="object-contain p-4 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
              priority
            />
          </div>
        </div>

        {/* 12 Phase Roadmap Timeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className={cn("font-bold text-white tracking-tight", typeClass("title"))}>
                Silabus 12 Phase Kanonik
              </h2>
              <p className={cn("text-neutral-400 mt-1", typeClass("caption"))}>
                Pilih unit pembelajaran untuk membuka materi interaktif, simulasi visual, dan kuis pemahaman.
              </p>
            </div>
            <span className={cn("text-neutral-400 font-mono hidden sm:inline", typeClass("caption"))}>12 Phase &middot; 30+ Unit &middot; L1 - Level A</span>
          </div>

          <div className="space-y-5">
            {PHASES.map((p, idx) => (
              <div
                key={p.phase}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 hover:border-[#5e6ad2]/40 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 font-mono font-bold text-[#5e6ad2]", typeClass("caption"))}>
                      {String(idx).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className={cn("font-bold text-white", typeClass("title"))}>
                        {p.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-medium text-neutral-300 font-mono", typeClass("micro"))}>
                      ⏱ {p.estHours}
                    </span>
                    <span className={cn("rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-medium text-neutral-300", typeClass("micro"))}>
                      {p.badge}
                    </span>
                  </div>
                </div>

                <p className={cn("mt-3 text-neutral-400", typeClass("body"))}>
                  {p.goal}
                </p>

                {/* Tooling Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                  <span className={cn("text-neutral-500 font-mono mr-1", typeClass("micro"))}>Tooling:</span>
                  {p.tools.map((tool) => (
                    <span
                      key={tool}
                      className={cn("rounded border border-[#5e6ad2]/30 bg-[#5e6ad2]/10 px-2 py-0.5 font-medium text-[#8c97ff] font-mono", typeClass("micro"))}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Units List with Interactive Links */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className={cn("text-neutral-400 font-medium mb-2", typeClass("micro"))}>
                    Daftar Unit Kurikulum (Klik untuk Belajar):
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {p.units.map((unit) => {
                      const targetHref = unit.lessonPath || "/learn/ethereum/eth-fund-01-accounts-and-keys/eoa-vs-contract-accounts";
                      return (
                        <Link
                          key={unit.id}
                          href={targetHref}
                          className="rounded-lg border border-white/5 bg-white/[0.015] p-3 hover:border-[#5e6ad2]/50 hover:bg-[#5e6ad2]/[0.08] transition-all flex flex-col justify-between group"
                        >
                          <span className={cn("text-neutral-300 font-medium leading-snug group-hover:text-white transition-colors", typeClass("caption"))}>
                            {unit.title}
                          </span>
                          <div className="mt-3 flex items-center justify-between text-neutral-500 font-mono">
                            <span className={typeClass("micro")}>{unit.id}</span>
                            <span className="text-[#8c97ff] group-hover:translate-x-0.5 transition-transform text-[11px] font-semibold">
                              Buka Lesson &rarr;
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className={cn("flex flex-wrap gap-2 text-neutral-400 font-mono", typeClass("micro"))}>
                    {p.topics.map((t) => (
                      <span key={t} className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className={cn("text-[#5e6ad2] font-semibold whitespace-nowrap", typeClass("caption"))}>
                    {p.milestone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Box Bottom */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 text-center">
          <h3 className={cn("font-bold text-white tracking-tight", typeClass("title"))}>
            Siap Menulis Smart Contract Pertama Anda?
          </h3>
          <p className={cn("mt-2 text-neutral-400 max-w-xl mx-auto", typeClass("body"))}>
            Tidak perlu menghubungkan wallet kripto. Lingkungan sandbox berjalan langsung di browser tanpa biaya gas sepeser pun.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link
              href="/learn/ethereum/eth-fund-01-accounts-and-keys/eoa-vs-contract-accounts"
              className={cn("rounded-full bg-white px-7 py-3 font-semibold text-black hover:bg-neutral-200 transition-colors", typeClass("caption"))}
            >
              Mulai Lesson Player Sekarang &rarr;
            </Link>
            <Link
              href="/practice"
              className={cn("rounded-full border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white hover:bg-white/10 transition-colors", typeClass("caption"))}
            >
              Buka Sandbox &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
