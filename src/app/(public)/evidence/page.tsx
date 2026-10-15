import Link from "next/link";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

const LEDGER_SAMPLES = [
  {
    hash: "0x8fa1...34b9",
    builder: "alex.onvora.eth",
    action: "Pull Request Merged into OpenZeppelin Fork",
    level: "Level A",
    verifiedAt: "2 Hours Ago",
    isEthereum: true,
  },
  {
    hash: "0x4ce9...1102",
    builder: "budi.builder.eth",
    action: "Lolos 8/8 Reality Check & Deployed Vault to Sepolia Testnet",
    level: "Level B",
    verifiedAt: "5 Hours Ago",
    isEthereum: true,
  },
  {
    hash: "0x12a8...99fc",
    builder: "siti.sol.eth",
    action: "Anchor SPL Token Staking Suite Passed",
    level: "Level C",
    verifiedAt: "Queue (Locked)",
    isEthereum: false,
  },
  {
    hash: "0x77bb...02d1",
    builder: "dev.zero-g.eth",
    action: "Autonomous AI Storage Worker Validated",
    level: "Level B",
    verifiedAt: "Queue (Locked)",
    isEthereum: false,
  },
];

export default function EvidencePage() {
  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
            Proof of Real Competence
          </h1>
          <p className={cn("mt-4 text-neutral-400", typeClass("body"))}>
            Kami tidak mencetak badge kosong atau sertifikat PDF pajangan. Hiring manager dan mitra ekosistem dapat langsung memverifikasi hash komitmen, smart contract aktif, dan assertion test suite Anda. Verifikasi on-chain saat ini berfokus pada <strong>Ethereum Sepolia &amp; Mainnet</strong>.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/passport"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors shadow-md"
            >
              <span>Buka Builder Passport Anda &rarr;</span>
            </Link>
            <Link
              href="/verify/ONV-ETH-7K2Q9"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>Lihat Demo Verifikasi Publik (ONV-ETH-7K2Q9)</span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl">
          <div className={cn("flex items-center justify-between border-b border-white/10 pb-4 mb-4 font-semibold text-neutral-400", typeClass("caption"))}>
            <span>Recent Verified Ledger Events</span>
            <span className="text-[#5e6ad2]">Active: Ethereum Core Verification</span>
          </div>

          <div className="divide-y divide-white/5">
            {LEDGER_SAMPLES.map((item) => (
              <div key={item.hash} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className={cn("flex items-center gap-2 font-mono text-neutral-400", typeClass("micro"))}>
                    <span className="text-white font-semibold">{item.builder}</span>
                    <span>&bull;</span>
                    <span>{item.hash}</span>
                    {item.isEthereum ? (
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-emerald-400 font-bold">
                        ● ETHEREUM ACTIVE
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-amber-300 font-bold">
                        🔒 SOON
                      </span>
                    )}
                  </div>
                  <p className={cn("mt-1 text-neutral-300", typeClass("body"))}>{item.action}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("rounded-full border border-[#5e6ad2]/30 bg-[#5e6ad2]/10 px-3 py-0.5 font-bold text-[#5e6ad2]", typeClass("micro"))}>
                    {item.level}
                  </span>
                  <span className={cn("text-neutral-500 font-mono whitespace-nowrap", typeClass("caption"))}>{item.verifiedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
