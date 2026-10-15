import Image from "next/image";
import Link from "next/link";
import { RevolvingHeroWord } from "@/components/hero/revolving-word";
import { TextType } from "@/components/ui/text-type";
import TerminalDemo from "@/components/terminal-demo";
import { BlurHighlight } from "@/components/ui/blur-highlight";
import { LearnerTransformationBeam } from "@/components/ui/transformation-beam";
import { EncryptedText } from "@/components/ui/encrypted-text";
import CommunityCirclesDemo from "@/components/community-circles-demo";
import { BuilderStorytelling } from "@/components/storytelling/builder-storytelling";
import { MotionFadeIn, MotionStagger, MotionCard } from "@/components/animations/motion";
import { typeClass, fieldTouchClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

const MANIFESTO = [
  {
    trap: {
      title: "The Tutorial Hell Trap",
      body: "Menonton video berjam-jam memberi ilusi paham, tapi saat layar editor kosong, Anda membeku tidak tahu harus mengetik apa.",
    },
    standard: {
      title: "Code from Minute One",
      body: "Setiap materi langsung diuji lewat latihan interaktif di browser. Anda belajar dengan logika dan tangan sendiri, bukan sekadar pasif menatap layar.",
    },
  },
  {
    trap: {
      title: "Worthless Paper Certificates",
      body: "Sertifikat PDF atau badge digital tidak pernah meyakinkan hiring manager atau tim audit protokol Web3 mana pun di dunia.",
    },
    standard: {
      title: "Verified Proof of Competence",
      body: "Kami tidak menjual sertifikat pajangan. Rekam jejak Anda tercatat dari Pull Request yang dimerge dan smart contract terverifikasi di Evidence Ledger.",
    },
  },
  {
    trap: {
      title: "High Friction & Hidden Costs",
      body: "Banyak pemula mundur sebelum mulai karena dipaksa setup environment lokal yang rumit, membeli kripto, dan membayar gas fee mahal.",
    },
    standard: {
      title: "Zero Gas & Frictionless Access",
      body: "Sandbox berjalan langsung di browser tanpa instalasi dan tanpa biaya gas sepeser pun. Cukup login email, Anda langsung mengeksekusi instruksi pertama.",
    },
  },
];

const LANGUAGES = [
  { name: "Solidity", role: "EVM Smart Contracts", chains: "Ethereum, Monad, Arbitrum, Mantle, Linea, Sonic" },
  { name: "Rust", role: "High-Performance Systems", chains: "Solana, Near, Vara, Eclipse, Wormhole" },
  { name: "Move", role: "Resource-Oriented Safety", chains: "Sui, Aptos" },
  { name: "Python", role: "Decentralized AI & Scripting", chains: "Bittensor, 0G, Gaia, AI Agents" },
  { name: "Cardano (Aiken)", role: "EUTXO Smart Contracts", chains: "Cardano Ecosystem" },
  { name: "Compact", role: "Zero-Knowledge & Privacy", chains: "Midnight Network" },
];

const FEATURED_TRACKS = [
  { name: "Ethereum Developer", tag: "EVM Core", lang: "Solidity" },
  { name: "Monad Developer", tag: "Parallel EVM", lang: "Solidity" },
  { name: "Solana Developer", tag: "High Throughput", lang: "Rust" },
  { name: "0G Developer", tag: "Modular AI", lang: "Python / Solidity" },
  { name: "Sui Developer", tag: "Object-Centric", lang: "Move" },
  { name: "Mantle Developer", tag: "Modular L2", lang: "Solidity" },
  { name: "Injective Developer", tag: "DeFi Infra", lang: "Rust" },
  { name: "Injective AI Developer", tag: "AI Agents", lang: "Python" },
  { name: "Bittensor Developer", tag: "AI Subnets", lang: "Python" },
  { name: "Arbitrum Developer", tag: "L2 Rollup", lang: "Solidity" },
  { name: "Sonic Developer", tag: "Fast EVM", lang: "Solidity" },
  { name: "Gaia Developer", tag: "DeAI Agents", lang: "Python" },
  { name: "Greenfield Developer", tag: "Decentralized Storage", lang: "Go / Solidity" },
  { name: "Midnight Developer", tag: "ZK Privacy", lang: "Compact" },
  { name: "Linea Developer", tag: "zkEVM Rollup", lang: "Solidity" },
  { name: "Eclipse Developer", tag: "SVM on ETH", lang: "Rust" },
  { name: "Wormhole Developer", tag: "Cross-Chain", lang: "Rust / Solidity" },
  { name: "XION Developer", tag: "Chain Abstraction", lang: "Rust" },
  { name: "EDU Chain Developer", tag: "EdTech L3", lang: "Solidity" },
  { name: "Telos Developer", tag: "ZK-EVM", lang: "Solidity" },
  { name: "Vara Developer", tag: "WASM Network", lang: "Rust" },
  { name: "IOTA Developer", tag: "Tangle EVM", lang: "Solidity / Move" },
  { name: "OCID Developer", tag: "Decentralized ID", lang: "Solidity / TS" },
  { name: "Nouns Developer", tag: "DAO Governance", lang: "Solidity" },
  { name: "BGA x AuraSci Learner", tag: "DeSci & BioDAO", lang: "Solidity / Python" },
];

const EVIDENCE_LEVELS = [
  {
    level: "Level A",
    type: "Real-World Contribution",
    standard: "Pull Request yang dimerge di repositori audit publik",
    value: "Highest Industry Standard",
  },
  {
    level: "Level B",
    type: "Independent Production Project",
    standard: "Lolos 8/8 Reality Check dan sukses deploy testnet",
    value: "Portfolio Ready",
  },
  {
    level: "Level C",
    type: "Guided Curriculum Project",
    standard: "Lolos seluruh assertion test suite otomatis modul",
    value: "Core Competency Verified",
  },
  {
    level: "Level D",
    type: "Applied Assessment Challenge",
    standard: "Menyelesaikan skenario security attack & debugging",
    value: "Applied Engineering",
  },
  {
    level: "Level E",
    type: "Foundational Knowledge Exam",
    standard: "Evaluasi pemahaman konsep teknikal dasar Web3",
    value: "Conceptual Foundation",
  },
];

export default function HomePage() {
  return (
    <div className="w-full bg-[#08090a] text-[#f7f8f8]">
      {/* FOLD 1 — HERO SECTION (LINEAR DARK THEME WITH RADIAL GLOW) */}
      <section className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center pt-24 pb-16 sm:py-24 lg:py-32 overflow-hidden border-b border-white/10">
        {/* Subtle Radial Glow Accent */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#5e6ad2]/15 blur-[120px] rounded-full" />

        <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Headline, Typography & CTA */}
            <div className="text-center lg:col-span-7 lg:text-left">
              <TextType
                text={["WEB3", "AI"]}
                as="h1"
                className="font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-[0.95]"
                typingSpeed={90}
                pauseDuration={2200}
                deletingSpeed={50}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-[#5e6ad2] font-normal"
                loop={true}
              />
              <div className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#5e6ad2]">
                <RevolvingHeroWord />
              </div>

              <h2 className={cn("mt-6 sm:mt-8 font-bold text-white tracking-tight leading-snug", typeClass("display"))}>
                Stop watching tutorials. Start building real protocols.
              </h2>

              <div className={cn("mt-4 max-w-2xl text-neutral-400", typeClass("body"))}>
                <EncryptedText
                  text="Kuasai Solidity, Rust, dan Decentralized AI melalui praktik terarah langsung di browser. Tanpa setup rumit, nol biaya gas, dan buktikan kemampuanmu dengan smart contract nyata yang diakui industri."
                  revealDelayMs={15}
                  flipDelayMs={35}
                  encryptedClassName="text-neutral-500 font-mono"
                  revealedClassName="text-neutral-300"
                />
              </div>

              {/* CTAs */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link
                  href="/start"
                  className={cn("inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]", typeClass("body"))}
                >
                  Start Building Free
                </Link>
                <Link
                  href="/practice"
                  className={cn("inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white transition-all hover:bg-white/10 hover:border-white/25", typeClass("body"))}
                >
                  Try Sandbox in Browser
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Graphic */}
            <div className="flex justify-center lg:col-span-5">
              <div className="relative flex items-center justify-center p-4">
                <div className="absolute inset-0 rounded-3xl bg-[#5e6ad2]/20 blur-3xl" />
                <Image
                  src="/assets/brand/builder-hero-active.png"
                  alt="Onvora builder focusing on code"
                  width={600}
                  height={500}
                  priority
                  unoptimized
                  className="relative h-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.25)] brightness-200 invert"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOLD 2 — DEFINITION (BLUR HIGHLIGHT + TRANSFORMATION BEAM) */}
      <section className="relative w-full border-b border-white/10 bg-[#0b0c0e] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left: What is Onvora */}
            <div className="text-left lg:col-span-7">
              <h2 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
                The Developer Ecosystem Built for Proof of Competence.
              </h2>

              <BlurHighlight
                highlightedBits={[
                  "platform pembelajaran",
                  "builder ecosystem",
                  "memulai dari nol",
                  "project nyata",
                  "Evidence Ledger",
                ]}
                highlightColor="rgba(94, 106, 210, 0.2)"
                highlightClassName="font-semibold text-white border-b border-[#5e6ad2]"
                blurAmount={7}
                inactiveOpacity={0.3}
                blurDuration={0.8}
                highlightDuration={1}
                className={cn("mt-6 text-neutral-300", typeClass("subtitle"))}
              >
                Onvora adalah platform pembelajaran dan builder ecosystem yang membantu siapa pun memulai dari nol, mengembangkan kemampuan Web3, membangun project nyata, dan membuktikan kompetensi melalui rekam jejak Evidence Ledger.
              </BlurHighlight>

              <div className={cn("mt-8 flex flex-wrap items-center gap-4 text-neutral-400", typeClass("caption"))}>
                <span className="text-[#5e6ad2] font-semibold">Proof-First Learning</span>
                <span>&bull;</span>
                <span>Audit-Grade Evaluation</span>
                <span>&bull;</span>
                <span>Direct Ecosystem Bridges</span>
              </div>
            </div>

            {/* Right: Transformation Beam */}
            <div className="lg:col-span-5">
              <LearnerTransformationBeam />
            </div>
          </div>
        </div>
      </section>

      {/* FOLD 3 — MANIFESTO SECTION */}
      <section className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center border-b border-white/10 bg-[#08090a] py-16 sm:py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <MotionFadeIn>
            <h2 className={cn("max-w-4xl font-bold text-white tracking-tight leading-snug", typeClass("display"))}>
              Why Watching Video Tutorials Fails You.
            </h2>
          </MotionFadeIn>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <MotionFadeIn delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <h3 className={cn("font-semibold text-neutral-400 border-b border-white/10 pb-3", typeClass("caption"))}>
                  The Old Web3 Traps
                </h3>
                <ul className="mt-6 space-y-6">
                  {MANIFESTO.map((item) => (
                    <li key={item.trap.title}>
                      <h4 className={cn("font-semibold text-neutral-300", typeClass("subtitle"))}>
                        {item.trap.title}
                      </h4>
                      <p className={cn("mt-1.5 text-neutral-400", typeClass("body"))}>
                        {item.trap.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionFadeIn>

            <MotionFadeIn delay={0.2}>
              <div className="rounded-2xl border border-[#5e6ad2]/30 bg-[#5e6ad2]/[0.03] p-6 sm:p-8">
                <h3 className={cn("font-semibold text-[#5e6ad2] border-b border-[#5e6ad2]/20 pb-3", typeClass("caption"))}>
                  The Onvora Standard
                </h3>
                <ul className="mt-6 space-y-6">
                  {MANIFESTO.map((item) => (
                    <li key={item.standard.title}>
                      <h4 className={cn("font-semibold text-white", typeClass("subtitle"))}>
                        {item.standard.title}
                      </h4>
                      <p className={cn("mt-1.5 text-neutral-300", typeClass("body"))}>
                        {item.standard.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionFadeIn>
          </div>
        </div>
      </section>

      {/* FOLD 4 — THE BUILDER LOOP (PINNED SCROLL STORYTELLING) */}
      <BuilderStorytelling />

      {/* FOLD 5 — BUILDER CIRCLES COMMUNITY SHOWCASE (CIRCLES COMPONENT) */}
      <section className="relative w-full border-b border-white/10 bg-[#08090a] py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <h2 className={cn("font-bold text-white tracking-tight", typeClass("display"))}>
                BFC: Build From Cafe Community.
              </h2>
              <p className={cn("mt-2 text-neutral-300 leading-relaxed", typeClass("body"))}>
                Tempat ngumpulnya para explorer &amp; builder Web3. Dari diskusi airdrop legit, strategi liquidity &amp; trading on-chain, sampai agenda ngopi santai tiap akhir pekan di cafe bareng temen-temen sefrekuensi.
              </p>
            </div>
            <Link
              href="/community"
              className={cn("font-semibold text-[#5e6ad2] hover:text-white transition-colors whitespace-nowrap", typeClass("caption"))}
            >
              Gabung BFC Community &rarr;
            </Link>
          </div>

          <div className="mt-8 flex justify-center items-center">
            <CommunityCirclesDemo />
          </div>
        </div>
      </section>

      {/* FOLD 6 — INTERACTIVE TERMINAL SANDBOX */}
      <section className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center border-b border-white/10 bg-[#0b0c0e] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h3 className={cn("font-bold text-white tracking-tight", typeClass("display"))}>
                Solve Real Security Flaws Directly in Browser.
              </h3>
              <p className={cn("mt-3 text-neutral-400", typeClass("body"))}>
                Fungsi withdraw di samping memiliki celah akses: siapa pun dapat mencairkan saldo vault. Pasang validasi kepemilikan agar hanya owner yang berhak melakukan penarikan.
              </p>

              <div className={cn("mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 font-mono space-y-2", typeClass("caption"))}>
                <p className="text-white font-semibold">Checkpoint Goal:</p>
                <p className="text-neutral-400">&bull; Validasi caller: require(msg.sender == owner)</p>
                <p className="text-neutral-400">&bull; Gas optimized revert error</p>
              </div>

              <div className="mt-8">
                <Link
                  href="/practice"
                  className={cn("inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-neutral-200 transition-colors", typeClass("caption"))}
                >
                  Open Full In-Browser Sandbox &rarr;
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <TerminalDemo />
            </div>
          </div>
        </div>
      </section>

      {/* FOLD 7 — EVIDENCE LEDGER */}
      <section className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center border-b border-white/10 bg-[#08090a] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <MotionFadeIn>
            <div className="mb-8">
              <h2 className={cn("font-bold text-white tracking-tight", typeClass("display"))}>
                Verified Proof. Zero Fake Certificates.
              </h2>
            </div>

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="overflow-x-auto lg:col-span-8 rounded-2xl border border-white/10 bg-white/[0.02] p-2">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className={cn("border-b border-white/10 font-semibold text-neutral-400", typeClass("caption"))}>
                      <th className="px-4 py-3">Level</th>
                      <th className="px-4 py-3">Verification Standard</th>
                      <th className="px-4 py-3">Industry Recognition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {EVIDENCE_LEVELS.map((row) => (
                      <tr key={row.level} className="hover:bg-white/[0.02] transition-colors">
                        <td className={cn("px-4 py-3.5 font-bold text-white whitespace-nowrap", typeClass("body"))}>
                          {row.level}
                        </td>
                        <td className={cn("px-4 py-3.5 text-neutral-300", typeClass("body"))}>
                          <p className="font-semibold text-white">{row.type}</p>
                          <p className={cn("text-neutral-400 mt-0.5", typeClass("caption"))}>{row.standard}</p>
                        </td>
                        <td className={cn("px-4 py-3.5 font-semibold text-[#5e6ad2] whitespace-nowrap", typeClass("body"))}>
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center lg:col-span-4">
                <Image
                  src="/assets/brand/builder-verified-v2.png"
                  alt="Verified builder badge"
                  width={240}
                  height={180}
                  unoptimized
                  className="h-36 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] brightness-200 invert"
                />
                <h4 className={cn("mt-4 font-semibold text-white", typeClass("subtitle"))}>
                  Audit-Grade Verified
                </h4>
                <p className={cn("mt-1 text-neutral-400", typeClass("caption"))}>
                  Lolos assertion test dan reality check nyata sebelum deploy ke testnet publik.
                </p>
              </div>
            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* FOLD 8 — MULTI-CHAIN CATALOG */}
      <section className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center border-b border-white/10 bg-[#0b0c0e] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className={cn("font-bold text-white tracking-tight", typeClass("display"))}>
              Master 6 Languages Across 25+ Chains.
            </h2>
          </div>

          {/* Languages Grid */}
          <MotionStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LANGUAGES.map((lang) => (
              <MotionCard key={lang.name}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-[#5e6ad2]/50 hover:bg-white/[0.04] transition-all h-full">
                  <div className="flex items-center justify-between">
                    <span className={cn("font-semibold text-white", typeClass("subtitle"))}>{lang.name}</span>
                    <span className={cn("rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-medium text-neutral-300", typeClass("micro"))}>
                      {lang.role}
                    </span>
                  </div>
                  <p className={cn("mt-2 text-neutral-400", typeClass("caption"))}>
                    Ecosystems: {lang.chains}
                  </p>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>

          {/* Featured Tracks */}
          <div className="mt-10">
            <h3 className={cn("font-semibold text-neutral-400 mb-4", typeClass("caption"))}>
              Featured Developer Tracks
            </h3>
            <MotionStagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {FEATURED_TRACKS.map((t) => {
                const isEth = t.name.startsWith("Ethereum");
                return (
                  <MotionCard key={t.name}>
                    <Link
                      href="/tracks"
                      className={`flex flex-col justify-between rounded-xl border p-3.5 transition-all h-full ${
                        isEth
                          ? "border-[#5e6ad2]/60 bg-[#5e6ad2]/10 hover:border-[#5e6ad2] shadow-[0_0_15px_-3px_rgba(94,106,210,0.3)]"
                          : "border-white/10 bg-white/[0.02] opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <p className={cn("font-semibold text-white truncate", typeClass("caption"))}>{t.name}</p>
                        {!isEth && (
                          <span className={cn("text-amber-300 font-mono", typeClass("micro"))}>🔒 SOON</span>
                        )}
                        {isEth && (
                          <span className={cn("text-emerald-400 font-mono font-bold", typeClass("micro"))}>● ACTIVE</span>
                        )}
                      </div>
                      <div className={cn("mt-2.5 flex items-center justify-between text-neutral-400 font-mono", typeClass("micro"))}>
                        <span>{t.lang}</span>
                        <span className="text-[#5e6ad2] font-medium">{t.tag}</span>
                      </div>
                    </Link>
                  </MotionCard>
                );
              })}
            </MotionStagger>
          </div>

          <div className="mt-10 flex gap-4">
            <Link
              href="/tracks"
              className={cn("inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-neutral-200 transition-colors", typeClass("caption"))}
            >
              Explore All 25+ Tracks &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FOLD 9 — FINAL CTA */}
      <section className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center bg-[#08090a] py-20 sm:py-28 text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-[#5e6ad2]/15 blur-[140px] rounded-full" />
        </div>

        <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <MotionFadeIn>
            <h2 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
              Ready to ship production Web3 protocols?
            </h2>
            <p className={cn("mt-4 text-neutral-400 max-w-xl mx-auto", typeClass("body"))}>
              No wallet connection needed. Use your Google email to get instant sandbox access.
            </p>

            <form
              action="/start"
              method="get"
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email address..."
                required
                className={cn(
                  "flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-[#5e6ad2]",
                  typeClass("body"),
                  fieldTouchClass
                )}
              />
              <button
                type="submit"
                className={cn("rounded-full bg-white px-7 py-3 font-semibold text-black hover:bg-neutral-200 transition-colors whitespace-nowrap", typeClass("body"))}
              >
                Get Started
              </button>
            </form>

            <div className={cn("mt-6 flex justify-center gap-4 text-neutral-500 font-medium", typeClass("caption"))}>
              <span>Free to start</span>
              <span>&bull;</span>
              <span>No crypto required</span>
              <span>&bull;</span>
              <span>Run tests in 60s</span>
            </div>
          </MotionFadeIn>
        </div>
      </section>
    </div>
  );
}
