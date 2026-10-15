"use client";

import React from "react";
import { ThreeDMarquee, MarqueeCardItem } from "@/components/ui/3d-marquee";

const ONVORA_ARTIFACTS: MarqueeCardItem[] = [
  {
    id: "art-1",
    title: "Parallel EVM Vault",
    chain: "Monad",
    lang: "Solidity 0.8.20",
    badge: "10k TPS Ready",
    codeSnippet: "contract MonadVault { pipelinedExecute(); }",
    status: "Assertion 6/6 Pass",
  },
  {
    id: "art-2",
    title: "Anchor AMM DEX",
    chain: "Solana",
    lang: "Rust / Anchor",
    badge: "High Throughput",
    codeSnippet: "#[program] pub mod dex { swap(); }",
    status: "PDA Verified",
  },
  {
    id: "art-3",
    title: "Decentralized AI Node",
    chain: "0G Network",
    lang: "Python / Solidity",
    badge: "Modular DA",
    codeSnippet: "zgStorage.uploadBatch(model_weights);",
    status: "8/8 Reality Check",
  },
  {
    id: "art-4",
    title: "Object-Centric Lending",
    chain: "Sui",
    lang: "Move",
    badge: "Resource Safe",
    codeSnippet: "public fun borrow(vault: &mut Pool) { ... }",
    status: "Dynamic Field OK",
  },
  {
    id: "art-5",
    title: "DeFi Yield Aggregator",
    chain: "Ethereum",
    lang: "Solidity / Foundry",
    badge: "EVM Core",
    codeSnippet: "function rebalance() external nonReentrant;",
    status: "Audit-Grade Passed",
  },
  {
    id: "art-6",
    title: "AI Subnet Validator",
    chain: "Bittensor",
    lang: "Python",
    badge: "DeAI Machine Learning",
    codeSnippet: "bt.subtensor.set_weights(miner_scores);",
    status: "Incentive Active",
  },
  {
    id: "art-7",
    title: "Nitro Stylus WASM Engine",
    chain: "Arbitrum",
    lang: "Rust / Solidity",
    badge: "L2 Rollup",
    codeSnippet: "#[stylus::entrypoint] fn compute() -> Result",
    status: "Gas Reduced 85%",
  },
  {
    id: "art-8",
    title: "Modular Rollup Bridge",
    chain: "Mantle",
    lang: "Solidity",
    badge: "EigenDA L2",
    codeSnippet: "mantleBridge.depositERC20(token, amount);",
    status: "Zero Proof Lag",
  },
  {
    id: "art-9",
    title: "Sub-Second State Channel",
    chain: "Sonic",
    lang: "Solidity",
    badge: "Sub-Second Finality",
    codeSnippet: "sonicGateway.fastSettle(channelId);",
    status: "Finality < 0.4s",
  },
  {
    id: "art-10",
    title: "zkEVM Proof Prover",
    chain: "Linea",
    lang: "Solidity",
    badge: "Zero-Knowledge",
    codeSnippet: "lineaRollup.verifyZkProof(stateRoot, proof);",
    status: "Proof Merged L1",
  },
  {
    id: "art-11",
    title: "On-Chain Orderbook Dex",
    chain: "Injective",
    lang: "Rust / CosmWasm",
    badge: "Cosmos IBC",
    codeSnippet: "injExchange.executeLimitOrder(pair, price);",
    status: "MEV Resistant",
  },
  {
    id: "art-12",
    title: "ZK Commercial Privacy Vault",
    chain: "Midnight",
    lang: "Compact",
    badge: "Confidential Data",
    codeSnippet: "witness private_balance: Field;",
    status: "Privacy Guarded",
  },
  {
    id: "art-13",
    title: "Cross-Chain NTT Protocol",
    chain: "Wormhole",
    lang: "Rust / Solidity",
    badge: "Cross-Chain 30+ Chains",
    codeSnippet: "wormholeRelayer.sendPayloadToChild(target);",
    status: "NTT Transferred",
  },
  {
    id: "art-14",
    title: "SVM Layer 2 Execution",
    chain: "Eclipse",
    lang: "Rust",
    badge: "Celestia DA",
    codeSnippet: "eclipseVm.dispatchTransaction(solTx);",
    status: "L2 Blocks Active",
  },
  {
    id: "art-15",
    title: "Decentralized Learner ID",
    chain: "EDU Chain",
    lang: "Solidity / TS",
    badge: "EdTech L3",
    codeSnippet: "ocidProtocol.issueCredential(builderDid);",
    status: "Ledger Recorded",
  },
  {
    id: "art-16",
    title: "Autonomous Treasury DAO",
    chain: "Nouns",
    lang: "Solidity",
    badge: "DAO Governance",
    codeSnippet: "nounsAuction.settleCurrentAndCreateNewAuction();",
    status: "Multi-Sig Signed",
  },
];

export default function ThreeDMarqueeDemo() {
  return (
    <div className="w-full">
      <ThreeDMarquee items={ONVORA_ARTIFACTS} />
    </div>
  );
}
