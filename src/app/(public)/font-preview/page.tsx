import Link from "next/link";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";
import { SizesPreview } from "@/components/sizes-preview";
import {
  Card,
  CardGroup,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardButton,
} from "@/components/ui/card";

export const metadata = {
  title: "Font Mix & Pairing Preview - Onvora",
};

const PAIRING_OPTIONS = [
  {
    id: "mix-1",
    title: "Kombinasi 1: The Modern Vanguard (Syne Bold + Instrument Serif Italic)",
    badge: "Paling Populer & Tren Web3 Global",
    vibe: "Kontras Tinggi: Geometris Futuristik dipadu Serif Miring Elegan",
    googleFontUrl: "family=Syne:wght@800&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600",
    staticFont: "'Syne', sans-serif",
    revolvingFont: "'Instrument Serif', Georgia, serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    revolvingStyle: "italic font-normal tracking-wide",
    description:
      "Perpaduan paling memukau saat ini di dunia desain digital (Awwwards/Stripe/Web3). Kata 'WEB3' tampil sangat kokoh dan bertenaga, lalu kata dinamisnya bergulir dengan keanggunan serif miring yang artistik.",
  },
  {
    id: "mix-2",
    title: "Kombinasi 2: The Cyber-Journalist (DM Serif Display + Space Grotesk)",
    badge: "Editorial Berwibawa + Insinyur Sistem",
    vibe: "Koran Bergengsi dengan Sentuhan Kode Hacker",
    googleFontUrl: "family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600",
    staticFont: "'DM Serif Display', Georgia, serif",
    revolvingFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    revolvingStyle: "font-bold tracking-widest uppercase",
    description:
      "Kata 'WEB3' berwibawa layaknya jurnal sains dan publikasi resmi dunia, sementara kata bergulirnya berkarakter teknikal tajam layaknya terminal developer.",
  },
  {
    id: "mix-3",
    title: "Kombinasi 3: The Silicon Review (Space Grotesk Bold + Playfair Italic)",
    badge: "Tech-Architecture + Pers Klasik",
    vibe: "Struktur Logika Keras berpadu Pers Klasik Mewah",
    googleFontUrl: "family=Space+Grotesk:wght@700&family=Playfair+Display:ital,wght@1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600",
    staticFont: "'Space Grotesk', sans-serif",
    revolvingFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    revolvingStyle: "italic font-semibold tracking-normal",
    description:
      "Menghadirkan rasa platform riset teknik yang canggih namun ditulis dengan standar jurnalistik tinggi. Sangat berkelas dan tidak membosankan.",
  },
  {
    id: "mix-4",
    title: "Kombinasi 4: Soft-Brutalist Harmony (Syne 800 + Fraunces Italic)",
    badge: "Modern, Hangat & Penuh Karakter",
    vibe: "Tipografi Berani dengan Lekukan Karakter Organik",
    googleFontUrl: "family=Syne:wght@800&family=Fraunces:ital,opsz,wght@1,9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600",
    staticFont: "'Syne', sans-serif",
    revolvingFont: "'Fraunces', serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    revolvingStyle: "italic font-semibold",
    description:
      "Kombinasi tebal yang ramah mata. Menghilangkan kesan kaku tanpa kehilangan ketegasan sebagai platform edukasi builder.",
  },
];

export default function FontPreviewPage() {
  const googleFontsQuery = PAIRING_OPTIONS.map((f) => f.googleFontUrl).join("&");

  return (
    <div className="w-full bg-newsprint-base py-12">
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?${googleFontsQuery}&display=swap`}
      />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-rule-sharp pb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Onvora Design Lab // Font Pairing Studio
          </p>
          <h1 className="mt-2 font-editorial text-4xl font-bold text-ink-primary sm:text-5xl">
            Katalog Kombinasi Font (Campuran / Font Pairing)
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
            Di desain modern, mencampurkan font judul yang berbeda antara kata utama (statis) dan kata aksi (dinamis) 
            adalah teknik terbaik untuk menciptakan estetika kelas dunia (*high aesthetic wow-factor*).
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className={cn("inline-block font-mono uppercase tracking-wider text-ink-primary underline underline-offset-4", typeClass("caption"))}
            >
              &larr; Kembali ke Landing Page Utama
            </Link>
          </div>
        </div>

        {/* Fluid Functionalism Typography System Live Inspector */}
        <div className="mt-8 rounded-2xl border border-[#5e6ad2]/40 bg-[#5e6ad2]/[0.05] p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className={cn("font-mono text-emerald-400 font-bold", typeClass("micro"))}>● ACTIVE SYSTEM</span>
              <h2 className={cn("mt-1 font-bold text-white tracking-tight", typeClass("title"))}>
                Fluid Functionalism Typography Hierarchy
              </h2>
            </div>
            <span className={cn("rounded-full border border-[#5e6ad2]/40 bg-[#5e6ad2]/20 px-3 py-1 font-mono text-[#5e6ad2]", typeClass("micro"))}>
              Inter Variable (opsz 14-25)
            </span>
          </div>

          <p className={cn("mt-3 text-neutral-300", typeClass("body"))}>
            Sistem 6 Role dengan rasio leading whole-pixel pada dua tangga ukuran (Default &amp; Compact):
          </p>

          <div className="mt-6 space-y-4 rounded-xl border border-white/10 bg-[#08090a] p-5">
            <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
              <span className={cn("font-bold text-white", typeClass("display"))}>Display (28/34px)</span>
              <span className={cn("font-mono text-neutral-500", typeClass("micro"))}>typeClass(&quot;display&quot;)</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
              <span className={cn("font-semibold text-white", typeClass("title"))}>Title (16/22px)</span>
              <span className={cn("font-mono text-neutral-500", typeClass("micro"))}>typeClass(&quot;title&quot;)</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
              <span className={cn("font-semibold text-neutral-200", typeClass("subtitle"))}>Subtitle (14/20px)</span>
              <span className={cn("font-mono text-neutral-500", typeClass("micro"))}>typeClass(&quot;subtitle&quot;)</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
              <span className={cn("text-neutral-300", typeClass("body"))}>Body copy, paragraph, and form controls (13/20px)</span>
              <span className={cn("font-mono text-neutral-500", typeClass("micro"))}>typeClass(&quot;body&quot;)</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
              <span className={cn("text-neutral-400", typeClass("caption"))}>Caption for secondary metadata &amp; labels (12/16px)</span>
              <span className={cn("font-mono text-neutral-500", typeClass("micro"))}>typeClass(&quot;caption&quot;)</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className={cn("text-neutral-500 font-mono", typeClass("micro"))}>Micro badges &amp; keycaps (11/14px)</span>
              <span className={cn("font-mono text-neutral-500", typeClass("micro"))}>typeClass(&quot;micro&quot;)</span>
            </div>
          </div>

          {/* Prose typeset demonstration */}
          <div className="mt-6 rounded-xl border border-white/10 bg-[#08090a] p-5">
            <span className={cn("font-mono text-[#5e6ad2]", typeClass("micro"))}>.typeset Prose Renderer:</span>
            <article className="typeset mt-3">
              <h1>Heading 1 (Display role)</h1>
              <p>
                Paragraf otomatis diformat dengan line-height proporsional, perataan warna semantik, dan pergeseran bobot optik tanpa layout shift.
              </p>
              <h2>Heading 2 (Title role)</h2>
              <p>
                Setiap tautan memiliki garis bawah halus dan transisi interaktif.
              </p>
            </article>
          </div>
        </div>

        {/* Fluid Functionalism Sizes System (Device Adaptive) */}
        <SizesPreview />

        {/* Fluid Functionalism Card & CardGroup System (2-D Fluid Hover) */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0c0d10] p-6 sm:p-8 shadow-xl">
          <div className="border-b border-white/10 pb-4 mb-6">
            <span className={cn("font-mono text-emerald-400 font-bold", typeClass("micro"))}>
              ● FLUID FUNCTIONALISM CARD SYSTEM
            </span>
            <h2 className={cn("mt-1 font-bold text-white tracking-tight", typeClass("title"))}>
              Compositional Card with 2-D Fluid Hover &amp; Spring Physics
            </h2>
            <p className={cn("mt-2 text-neutral-400", typeClass("caption"))}>
              Sorotan kursor meluncur halus secara 2 dimensi ke kartu terdekat. Klik atau arahkan kursor ke kartu mana pun:
            </p>
          </div>

          <CardGroup columns={3} separated border="outlined">
            <Card
              index={0}
              href="/tracks/ethereum"
              className="p-5 flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div>
                <span className={cn("inline-block rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-emerald-400 font-bold mb-3", typeClass("micro"))}>
                  ● ACTIVE COHORT
                </span>
                <CardHeader>
                  <CardTitle className={cn("text-white font-bold", typeClass("title"))}>
                    Ethereum Developer
                  </CardTitle>
                  <CardDescription className={cn("mt-2 text-neutral-400 leading-relaxed", typeClass("body"))}>
                    Arsitektur smart contract EVM, Foundry unit testing, dan mitigasi exploit audit-grade.
                  </CardDescription>
                </CardHeader>
              </div>
              <CardFooter className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between">
                <span className={cn("text-neutral-500 font-mono", typeClass("caption"))}>12 Phases</span>
                <CardButton variant="primary">Lihat Silabus &rarr;</CardButton>
              </CardFooter>
            </Card>

            <Card
              index={1}
              href="/practice"
              className="p-5 flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div>
                <span className={cn("inline-block rounded-full bg-[#5e6ad2]/10 border border-[#5e6ad2]/30 px-2.5 py-0.5 text-[#5e6ad2] font-bold mb-3", typeClass("micro"))}>
                  ● IN-BROWSER
                </span>
                <CardHeader>
                  <CardTitle className={cn("text-white font-bold", typeClass("title"))}>
                    Browser Sandbox
                  </CardTitle>
                  <CardDescription className={cn("mt-2 text-neutral-400 leading-relaxed", typeClass("body"))}>
                    Eksekusi baris kode langsung di browser tanpa biaya gas sepeser pun dan tanpa instalasi lokal.
                  </CardDescription>
                </CardHeader>
              </div>
              <CardFooter className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between">
                <span className={cn("text-neutral-500 font-mono", typeClass("caption"))}>Zero Gas</span>
                <CardButton variant="primary">Buka Sandbox &rarr;</CardButton>
              </CardFooter>
            </Card>

            <Card
              index={2}
              href="/diagnostic"
              className="p-5 flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div>
                <span className={cn("inline-block rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-amber-400 font-bold mb-3", typeClass("micro"))}>
                  ● INTERACTIVE
                </span>
                <CardHeader>
                  <CardTitle className={cn("text-white font-bold", typeClass("title"))}>
                    Builder Diagnostic
                  </CardTitle>
                  <CardDescription className={cn("mt-2 text-neutral-400 leading-relaxed", typeClass("body"))}>
                    Kuesioner cerdas AskUserQuestions untuk merekomendasikan titik awal fase belajar yang tepat.
                  </CardDescription>
                </CardHeader>
              </div>
              <CardFooter className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between">
                <span className={cn("text-neutral-500 font-mono", typeClass("caption"))}>Phase 00</span>
                <CardButton variant="primary">Mulai Diagnostic &rarr;</CardButton>
              </CardFooter>
            </Card>
          </CardGroup>
        </div>

        {/* Pairing Cards Grid */}
        <div className="mt-10 space-y-12">
          {PAIRING_OPTIONS.map((pair, idx) => (
            <div
              key={pair.id}
              className="border border-rule-sharp bg-newsprint-paper p-6 sm:p-10 shadow-sm transition-all hover:border-ink-primary"
            >
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule-paper pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    Pilihan #{idx + 1} &middot; {pair.vibe}
                  </span>
                  <h2 className="mt-0.5 text-lg font-bold text-ink-primary font-sans">
                    {pair.title}
                  </h2>
                </div>
                <span className="border border-rule-sharp bg-ink-fill px-3 py-1 font-mono text-[0.625rem] uppercase tracking-widest text-ink-reverse">
                  {pair.badge}
                </span>
              </div>

              {/* Live Preview Box */}
              <div className="mt-8 rounded-sm border border-rule-paper bg-newsprint-sheet p-6 sm:p-10">
                {/* 1. Main Static Word */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
                  <span
                    style={{ fontFamily: pair.staticFont }}
                    className="text-6xl font-bold tracking-[0.06em] text-ink-primary sm:text-7xl lg:text-8xl leading-none"
                  >
                    WEB3
                  </span>

                  {/* 2. Dynamic Mixed Word */}
                  <span
                    style={{ fontFamily: pair.revolvingFont }}
                    className={`mt-2 sm:mt-0 text-3xl sm:text-4xl lg:text-5xl text-ink-primary ${pair.revolvingStyle}`}
                  >
                    Programming
                  </span>
                </div>

                {/* Subtitle & Body */}
                <h3
                  style={{ fontFamily: pair.bodyFont }}
                  className="mt-6 text-xl sm:text-2xl font-bold text-ink-primary"
                >
                  Belajar Web3. Bangun Sesuatu yang Nyata.
                </h3>
                <p
                  style={{ fontFamily: pair.bodyFont }}
                  className="mt-2 max-w-xl text-sm sm:text-base leading-relaxed text-ink-secondary"
                >
                  Mulai dari nol, kembangkan kemampuanmu melalui praktik dan project mandiri,
                  lalu buktikan apa yang bisa kamu bangun.
                </p>

                {/* Action button */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="border border-rule-sharp bg-ink-fill px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-ink-reverse">
                    [Mulai Belajar Gratis]
                  </span>
                  <span className="font-mono text-[0.6875rem] text-ink-muted">
                    Rumus: <code className="bg-newsprint-muted px-1.5 py-0.5">{pair.staticFont.split(",")[0]}</code> + <code className="bg-newsprint-muted px-1.5 py-0.5">{pair.revolvingFont.split(",")[0]}</code>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 border-t border-rule-paper pt-4">
                <p className="text-sm leading-relaxed text-ink-secondary">
                  <strong className="text-ink-primary font-semibold">Mengapa kombinasi ini menarik:</strong>{" "}
                  {pair.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 border-t border-rule-sharp pt-8 text-center font-mono text-xs text-ink-secondary">
          Buka <code className="bg-newsprint-muted px-2 py-1">http://localhost:3000/font-preview</code> di browser Anda dan pilih nomor kombinasi yang paling Anda sukai!
        </div>
      </div>
    </div>
  );
}
