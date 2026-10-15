# Ethereum Developer Track — Structure & Syllabus

Sumber: Onvora.md §7; Revision §57. Resolusi konflik: **DEC-004** (12 phase Revision = struktur; topik Master = isi). Standar Tooling: **Hybrid Modern & Audit-Ready (Solidity 0.8.20+, Foundry Suite, Viem, OpenZeppelin v5)**.

Track: `ethereum-developer` · Chain adapter: `ETH` · Status: canonical structure & unit mapping.

---

## 1. Master Phase Map (12 Phases)

| Phase | Nama | Tujuan & Kompetensi | Content Scope (Standards & Tools) | Target Evidence | Est. Waktu | Priority |
|---|---|---|---|---|---|---|
| **00** | **Diagnostic** | Deteksi titik awal, mental model routing | Diagnostic quiz, background assessment (ONV-03) | — | 30m | P0 |
| **01** | **Ethereum Fundamentals** | Menguasai EOA, state transition, gas EIP-1559, dan arsitektur EVM | Accounts, Keypairs, Nonce, Mempool, Gas Auction, Base/Priority Fee, EVM (Stack, Memory, Storage, Calldata), RPC Nodes | L1 Verified | 8–10h | P0 |
| **02** | **Blockchain Simulations** | Observasi mutasi state on-chain di in-browser sandbox tanpa gas | Transaction execution visualizer, Call decoding, Event logs emission, Revert trace inspection | L1–L2 Verified | 4–6h | P0 |
| **03** | **Solidity Core Foundations** | Menulis smart contract modern aman dan gas-efficient | Solidity 0.8.20+, Types, Storage packing & Layout, Function visibility, Custom Errors vs Require, Structs & Mappings | L2 Verified | 10–14h | P1 |
| **04** | **Modular Contract Architecture** | Merancang protokol modular berbasis standar industri | OpenZeppelin v5 Contracts, ERC-20, ERC-721, Interfaces, Abstract contracts, Multiple inheritance, Libraries, SafeCast | L3 Verified | 12–16h | P1 |
| **05** | **Foundry Testing & Verification** | Unit testing, fuzz testing, dan deployment script audit-grade | Foundry Suite: Forge unit test, Cheatcodes (`vm.prank`, `vm.deal`, `vm.warp`), Stateless Fuzzing, Invariant Testing, Cast CLI, Anvil | L3–L4 Verified | 14–18h | P1 |
| **06** | **Fullstack dApp & Viem Integration** | Integrasi contract ke client web modern | Viem, Wagmi v2, TanStack Query, Wallet connection UX, ABI type-safe hooks, Transaction status lifecycles | L4 Verified | 10–14h | P1 |
| **07** | **Security & Smart Contract Auditing** | Eksploitasi defensif & analisis kerentanan | Checks-Effects-Interactions (CEI), ReentrancyGuard, Integer truncation, tx.origin vs msg.sender, Oracle manipulation, Slither basics | L4 Verified | 12–16h | P1 |
| **08** | **Capstone Production Build** | Membangun protokol terdesentralisasi skala penuh | Desain arsitektur mandiri, Test coverage 100%, Sepolia testnet deployment, Etherscan verified, Readme & audit checklist | L4–L5 Verified | 20–30h | P1 |
| **09** | **Peer Code Review & Rubric Evaluation** | Evaluasi kode teknikal berstandar audit industri | Rubric "Smart Contract Project" (ONV-10), gas optimization benchmark, security review exchange | L5 Verified | 4–6h | P1 |
| **10** | **Builder Readiness Benchmark** | Validasi kesiapan kerja & portofolio | Evaluasi komprehensif Builder Passport (ONV-14), Technical capability index, Evidence freshness | Certified Builder | 2–4h | P1 |
| **11** | **Ecosystem Opportunities & Public Proof** | Akses ke ekosistem, hackathon, dan karier | Kontribusi PR open-source Web3, Hackathon team formation, Ecosystem Grants, Career matching | Placement / Grants | Ongoing | P1 |

---

## 2. Unit Breakdown per Phase

### Phase 01: Ethereum Fundamentals & EVM Internals
- **Unit 01-01:** `eth-fund-01-accounts-and-keys` — EOA vs Contract Account, Private/Public Key Derivation, Nonce & State Representation.
- **Unit 01-02:** `eth-fund-02-gas-and-eip1559` — Gas Units, Base Fee, Priority Fee, Max Fee, Block Gas Limits, Opcode Execution Costs.
- **Unit 01-03:** `eth-fund-03-evm-architecture` — The EVM State Machine, Stack (1024 words), Memory (quadratic costs), Storage (32-byte slots), Calldata.

### Phase 02: Interactive Blockchain Simulations
- **Unit 02-01:** `eth-sim-01-transaction-lifecycle` — Dari Signature ke Mempool, Block Inclusion, dan State Root Calculation.
- **Unit 02-02:** `eth-sim-02-state-transitions-and-reverts` — Call vs Delegatecall, Event Logs & Topics, Decoding Revert Reason Strings.

### Phase 03: Solidity Core Foundations (Solidity 0.8.20+)
- **Unit 03-01:** `sol-core-01-types-and-storage-layout` — Primitives, Storage Slot Packing, Transient Storage (EIP-1153), Gas Optimization.
- **Unit 03-02:** `sol-core-02-functions-and-custom-errors` — Function Visibility, Mutability, `error` vs `require`, Custom Error Decoding.
- **Unit 03-03:** `sol-core-03-data-structures` — Mappings with Hash Location, Dynamic Arrays in Storage vs Memory, Struct Design Patterns.

### Phase 04: Modular Contract Architecture
- **Unit 04-01:** `sol-arch-01-inheritance-and-interfaces` — Abstract Contracts, Multiple Inheritance (C3 Linearization), Standard Interfaces.
- **Unit 04-02:** `sol-arch-02-openzeppelin-tokens` — ERC-20 Fungible Tokens, ERC-721 NFTs, Minting Rules, SafeERC20 Operations.
- **Unit 04-03:** `sol-arch-03-libraries-and-calldata` — Internal vs External Libraries, Calldata Slicing, OpenZeppelin ECDSA & Math.

### Phase 05: Foundry Testing & Verification Suite
- **Unit 05-01:** `foundry-01-forge-unit-tests` — Project Structure, `forge test`, Assertion Libraries, Console2 Logging.
- **Unit 05-02:** `foundry-02-cheatcodes-and-forking` — `vm.prank`, `vm.deal`, `vm.warp`, `vm.expectRevert`, Mainnet Forking with Alchemy/Infura RPC.
- **Unit 05-03:** `foundry-03-fuzzing-and-invariants` — Stateless Fuzzing (`testFuzz_`), Stateful Invariant Testing, Finding Edge-Case Exploits.
- **Unit 05-04:** `foundry-04-cast-and-anvil` — Local node simulation with `anvil`, On-chain inspections with `cast`, Contract Verification on Etherscan.

### Phase 06: Fullstack dApp & Viem Integration
- **Unit 06-01:** `dapp-01-viem-client-and-transports` — Public Client, Wallet Client, Custom RPC Transports, Multi-chain support.
- **Unit 06-02:** `dapp-02-wagmi-and-contract-hooks` — `useReadContract`, `useWriteContract`, Optimistic UI Updates, Transaction Receipts.
- **Unit 06-03:** `dapp-03-wallet-ux-and-error-boundaries` — Connection States, Chain Switching, User Rejection Handling, Gas Estimation Display.

### Phase 07: Security & Smart Contract Auditing
- **Unit 07-01:** `sec-01-checks-effects-interactions` — Reentrancy Attacks (The DAO Case Study), Pull-over-Push payments, ReentrancyGuard.
- **Unit 07-02:** `sec-02-access-control-and-auth` — `Ownable` vs `AccessControl` Role-Based Security, Danger of `tx.origin`.
- **Unit 07-03:** `sec-03-oracles-and-economic-attacks` — Spot Price Oracle Manipulation, TWAP vs Chainlink Feeds, Flash Loan Awareness.

### Phase 08: Capstone Production Build
- **Unit 08-01:** `capstone-01-protocol-architecture` — Multi-contract system specification, State diagrams, Invariant definitions.
- **Unit 08-02:** `capstone-02-foundry-deployment-and-testnet` — Deployment scripts with Foundry, Sepolia verification, CI/CD automated tests.
- **Unit 08-03:** `capstone-03-evidence-and-audit-checklist` — Submission packet, Comprehensive README, Security self-audit verification.

---

## 3. Prerequisites & Skill Graph Dependency Tree

```
Phase 00: Diagnostic
   ↓
Phase 01: Ethereum Fundamentals & EVM
   ↓
Phase 02: Blockchain Simulations
   ↓
Phase 03: Solidity Core Foundations
   ↓
Phase 04: Modular Contract Architecture
   ↓
Phase 05: Foundry Testing & Verification Suite
   ├───→ Phase 06: Fullstack dApp & Viem Integration
   └───→ Phase 07: Security & Smart Contract Auditing
               ↓
         Phase 08: Capstone Production Build
               ↓
         Phase 09: Peer Code Review (Rubric Evaluation)
               ↓
         Phase 10: Builder Readiness Benchmark
               ↓
         Phase 11: Ecosystem Opportunities & Public Proof
```

---

## 4. Credential Levels & Evidence Criteria
- **Certified Ethereum Learner:** Syarat minimal lolos Phase 01–03 dengan akumulasi evidence Level 1 & Level 2 di Evidence Ledger. ID Format: `ONV-ETH-LRN-XXXXX`.
- **Certified Ethereum Builder:** Syarat minimal lolos Phase 05, Phase 08 (Capstone lolos 8 kriteria Reality Check), dan Phase 09 (L5 Peer Review). ID Format: `ONV-ETH-BLD-XXXXX`.
