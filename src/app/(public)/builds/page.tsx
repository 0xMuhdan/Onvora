import {
  Card,
  CardGroup,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardButton,
} from "@/components/ui/card";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

const BUILDS = [
  {
    id: "escrow",
    title: "Decentralized Escrow Protocol",
    desc: "Smart contract penitipan dana dua pihak dengan multi-sig resolution dan timelock dispute handler di jaringan Ethereum.",
    tech: "Solidity 0.8.20 / Foundry",
    difficulty: "Intermediate",
    time: "4-6 Hours",
    isEthereum: true,
  },
  {
    id: "amm",
    title: "Automated Liquidity Pool AMM",
    desc: "Membangun protokol Constant Product Market Maker (x * y = k) lengkap dengan token reward LP standar EVM.",
    tech: "Solidity / Mathematics",
    difficulty: "Advanced",
    time: "8-10 Hours",
    isEthereum: true,
  },
  {
    id: "nft-royalty",
    title: "NFT Royalty Standard (ERC-2981)",
    desc: "Implementasi standar royalti otomatis on-chain dengan penegakan izin operator transfer filter pada Ethereum.",
    tech: "Solidity / ERC-721",
    difficulty: "Beginner-Friendly",
    time: "3 Hours",
    isEthereum: true,
  },
  {
    id: "zk-verifier",
    title: "Zero-Knowledge Membership Verifier",
    desc: "Sistem verifikasi kepemilikan aset secara anonim menggunakan ZK-SNARKs tanpa membocorkan private key.",
    tech: "Circom / Compact / EVM",
    difficulty: "Advanced",
    time: "12 Hours",
    isEthereum: false,
  },
  {
    id: "cross-chain",
    title: "Cross-Chain Asset Relayer",
    desc: "Menghubungkan transfer token dan eksekusi payload state antar chain menggunakan protokol Wormhole NTT.",
    tech: "Rust / Solidity / Wormhole",
    difficulty: "Advanced",
    time: "10 Hours",
    isEthereum: false,
  },
  {
    id: "ai-worker",
    title: "Decentralized AI Agent Worker",
    desc: "Worker node yang memproses inferensi AI dan membuktikan keaslian eksekusi on-chain di 0G Network.",
    tech: "Python / 0G DA",
    difficulty: "Intermediate",
    time: "6 Hours",
    isEthereum: false,
  },
];

export default function BuildsPage() {
  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
            Build Real Web3 Protocols
          </h1>
          <p className={cn("mt-4 text-neutral-400", typeClass("body"))}>
            Setiap project di Onvora dirancang dari scratch dan wajib lolos 8-Poin Reality Check sebelum deploy ke testnet publik. Saat ini berfokus pada proyek mandiri ekosistem <strong>Ethereum Developer</strong>.
          </p>
        </div>

        <CardGroup columns={3} separated border="outlined">
          {BUILDS.map((item, idx) => (
            <Card
              key={item.id}
              index={idx}
              href={item.isEthereum ? `/builds/${item.id}` : undefined}
              disabled={!item.isEthereum}
              className={cn(
                "p-5 flex flex-col justify-between rounded-2xl border transition-all",
                item.isEthereum
                  ? "border-[#5e6ad2]/40 bg-[#5e6ad2]/[0.03] shadow-[0_0_25px_-5px_rgba(94,106,210,0.15)]"
                  : "border-white/10 bg-white/[0.015] opacity-75"
              )}
            >
              <div>
                <div className={cn("flex items-center justify-between border-b border-white/5 pb-2.5 font-mono mb-3", typeClass("micro"))}>
                  <span className="text-neutral-400">{item.tech}</span>
                  {item.isEthereum ? (
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-emerald-400 font-bold">
                      ● ACTIVE
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-amber-300 font-bold">
                      🔒 COMING SOON
                    </span>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className={cn("text-white font-bold", typeClass("title"))}>
                    {item.title}
                  </CardTitle>
                  <CardDescription className={cn("mt-2 text-neutral-400 leading-relaxed", typeClass("body"))}>
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </div>

              <CardFooter className={cn("mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between", typeClass("caption"))}>
                <span className="text-neutral-500 font-mono">{item.time}</span>
                {item.isEthereum ? (
                  <CardButton variant="primary">
                    Start Project &rarr;
                  </CardButton>
                ) : (
                  <span className="font-mono text-neutral-500 cursor-not-allowed">
                    [Locked &middot; In Queue]
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
        </CardGroup>
      </div>
    </div>
  );
}
