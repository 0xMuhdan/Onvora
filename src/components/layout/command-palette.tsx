"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CommandMenu,
  CommandMenuDialog,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuEmpty,
  CommandMenuFooter,
  useIsMac,
  type CommandMenuItemData,
} from "@/components/ui/command-menu";
import {
  Search,
  Terminal,
  Layers,
  Compass,
  FileCode,
  Shield,
  Users,
  Trophy,
  Briefcase,
  Sparkles,
  BookOpen,
  LogIn,
} from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

export const ONVORA_COMMANDS: CommandMenuItemData[] = [
  // Tracks & Curriculum
  {
    value: "/tracks/ethereum",
    label: "Ethereum Developer Track",
    description: "12 Phase EVM, Foundry, & Security Roadmap",
    icon: Layers,
    group: "Developer Tracks",
    keywords: ["solidity", "evm", "foundry", "curriculum", "roadmap"],
  },
  {
    value: "/tracks",
    label: "Explore All 25+ Tracks",
    description: "Multi-Chain Catalog: Solana, 0G, Sui, Monad",
    icon: Compass,
    group: "Developer Tracks",
    keywords: ["tracks", "rust", "move", "python", "chains", "catalog"],
  },
  {
    value: "/practice",
    label: "In-Browser Sandbox",
    description: "Eksekusi kode langsung tanpa gas fee",
    icon: Terminal,
    group: "Developer Tracks",
    keywords: ["sandbox", "terminal", "forge", "practice", "test"],
  },
  {
    value: "/builds",
    label: "Production Protocol Builds",
    description: "8/8 Reality Check Verified Protocols",
    icon: FileCode,
    group: "Developer Tracks",
    keywords: ["builds", "amm", "escrow", "protocols", "capstone"],
  },
  {
    value: "/evidence",
    label: "Evidence Ledger Verification",
    description: "Bukti kompetensi on-chain Level A - Level E",
    icon: Shield,
    group: "Developer Tracks",
    keywords: ["evidence", "ledger", "audit", "proof", "verification"],
  },
  {
    value: "/diagnostic",
    label: "Builder Diagnostic (Phase 00)",
    description: "Kuesioner penentu titik awal kurikulum",
    icon: Sparkles,
    group: "Developer Tracks",
    keywords: ["diagnostic", "assessment", "quiz", "start phase"],
  },
  {
    value: "/community",
    label: "Builder Circles & Peer Review",
    description: "Kolaborasi sprint & audit code review",
    icon: Users,
    group: "Developer Tracks",
    keywords: ["community", "circles", "review", "peer", "discord"],
  },

  // Actions
  {
    value: "/practice?challenge=vault-access",
    label: "Solve Vault Access Control",
    description: "Latihan mitigasi keamanan smart contract",
    icon: Terminal,
    group: "Quick Actions",
    keywords: ["vault", "access control", "reentrancy", "challenge"],
  },
  {
    value: "/tracks/ethereum",
    label: "Lihat Silabus Phase 01–12",
    description: "Roadmap kanonik pengembang Ethereum",
    icon: BookOpen,
    group: "Quick Actions",
    keywords: ["silabus", "fase", "modul", "phases"],
  },
  {
    value: "/diagnostic",
    label: "Mulai Kuesioner Diagnostic",
    description: "Petakan fase awal dalam 2 menit",
    icon: Sparkles,
    group: "Quick Actions",
    keywords: ["mulai diagnostic", "test kemampuan"],
  },

  // Ecosystem & Career
  {
    value: "/hackathons",
    label: "Ecosystem Hackathons 2026",
    description: "Prize pool kompetisi developer global",
    icon: Trophy,
    group: "Opportunities",
    keywords: ["hackathon", "bounty", "prize", "grant"],
  },
  {
    value: "/jobs",
    label: "Web3 Career Opportunities",
    description: "Lowongan remote langsung dari partner hiring",
    icon: Briefcase,
    group: "Opportunities",
    keywords: ["jobs", "karir", "hiring", "lowongan", "remote"],
  },

  // Account
  {
    value: "/start",
    label: "Buat Akun Builder Baru",
    description: "Daftar instan via Google email (tanpa wallet)",
    icon: Sparkles,
    group: "Account",
    keywords: ["register", "start", "signup", "buat akun"],
  },
  {
    value: "/login",
    label: "Masuk ke Akun Onvora",
    description: "Magic link login langsung ke browser sandbox",
    icon: LogIn,
    group: "Account",
    keywords: ["login", "signin", "masuk"],
  },
];

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  return (
    <CommandMenuDialog
      open={open}
      onOpenChange={onOpenChange}
      shortcut="mod+k"
      title="Onvora Command Palette"
      description="Cari trek belajar, modul praktikum, atau aksi developer."
      className="max-w-2xl border border-white/10 bg-[#0c0d10]/95 backdrop-blur-2xl shadow-2xl"
    >
      <CommandMenu
        items={ONVORA_COMMANDS}
        suggestions={["/tracks/ethereum", "/practice", "/diagnostic"]}
        suggestionsLabel="Rekomendasi"
        onSelect={(item) => {
          onOpenChange(false);
          if (item.value) {
            router.push(item.value);
          }
        }}
      >
        <CommandMenuInput
          placeholder="Ketik perintah atau cari ekosistem (misal: Solidity, Sandbox, Audit)..."
          className="border-b border-white/10"
        />
        <CommandMenuList className="max-h-[380px] p-2">
          <CommandMenuEmpty>
            Tidak ada perintah atau trek yang cocok.
          </CommandMenuEmpty>
        </CommandMenuList>
        <CommandMenuFooter />
      </CommandMenu>
    </CommandMenuDialog>
  );
}

export function CommandTrigger({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  const isMac = useIsMac();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 text-neutral-400 transition-all hover:border-[#5e6ad2]/50 hover:bg-white/[0.08] hover:text-white shrink-0 whitespace-nowrap select-none cursor-pointer",
        className
      )}
      aria-label="Open Command Menu (⌘K)"
    >
      <Search className="h-3.5 w-3.5 text-neutral-400 group-hover:text-neutral-200 shrink-0" />
      <span className="hidden xl:inline text-xs text-neutral-400 group-hover:text-neutral-200 font-normal">
        Search...
      </span>
      <kbd className="inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] font-medium text-neutral-400 group-hover:border-white/20 group-hover:text-neutral-200 whitespace-nowrap leading-none shrink-0">
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
}
