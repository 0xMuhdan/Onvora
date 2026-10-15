import Link from "next/link";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

const COLUMNS = [
  {
    title: "Curriculum",
    links: [
      { label: "Developer Tracks", href: "/tracks" },
      { label: "Browser Practice", href: "/practice" },
      { label: "Production Builds", href: "/builds" },
      { label: "Evidence Ledger", href: "/evidence" },
      { label: "Builder Passport", href: "/passport" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Technical Glossary", href: "/tracks" },
      { label: "Builder Stories", href: "/community" },
      { label: "Testnet Faucets", href: "/practice" },
      { label: "Documentation", href: "/tracks" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Builder Circles", href: "/community" },
      { label: "Peer Code Review", href: "/community" },
      { label: "Ecosystem Hackathons", href: "/hackathons" },
      { label: "Career Opportunities", href: "/jobs" },
    ],
  },
  {
    title: "Principles",
    links: [
      { label: "Anti-Tutorial Hell", href: "/#manifesto" },
      { label: "No Wallet Friction", href: "/start" },
      { label: "Proof-First Learning", href: "/evidence" },
      { label: "Audit-Grade Testing", href: "/practice" },
    ],
  },
];

export function Colophon() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#08090a] text-neutral-400">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className={cn("font-semibold text-white", typeClass("caption"))}>
                {col.title}
              </h2>
              <ul className={cn("mt-4 space-y-2.5 text-neutral-400", typeClass("caption"))}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-neutral-500", typeClass("caption"))}>
          <p>&copy; 2026 Onvora. All rights reserved.</p>
          <p>The developer system for modern Web3 engineering.</p>
        </div>
      </div>
    </footer>
  );
}
