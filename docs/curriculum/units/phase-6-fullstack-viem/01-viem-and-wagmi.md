# Unit: Fullstack dApp Integration with Viem & Wagmi v2

```yaml
unit:
  id: "dapp-01-viem-and-wagmi"
  title: "Fullstack dApp Integration — Viem, Wagmi v2, dan Type-Safe ABI Hooks"
  track: "ethereum-developer"
  phase: "phase-6-fullstack-viem"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: proficient

  why: |
    Smart contract yang terisolasi di blockchain tidak berguna bagi pengguna biasa tanpa antarmuka web
    yang responsif dan mudah digunakan. Di era Web3 modern, Ethers.js dan Web3.js telah digantikan oleh
    Viem dan Wagmi v2 karena memiliki kinerja jauh lebih ringan, modular, dan didukung inferensi tipe
    TypeScript murni (Type-Safe ABI) tanpa overhead konversi manual.

  target: |
    Developer yang telah membangun smart contract dan ingin menghubungkannya ke aplikasi web frontend
    modern menggunakan React / Next.js.

  prerequisites:
    - "sol-arch-01-inheritance-and-interfaces"
    - "foundry-01-forge-unit-tests"

  outcomes:
    - "Mengonfigurasi Viem Public Client dan Wallet Client dengan transport RPC multi-chain"
    - "Menggunakan Wagmi v2 hooks (useReadContract, useWriteContract, useWaitForTransactionReceipt)"
    - "Menerapkan type-safe ABI inference menggunakan TypeScript 'as const'"
    - "Menangani alur UX dompet Web3: status pending, user rejection, dan pergantian jaringan (chain switching)"

  lessons:
    - id: "lesson-dapp-01-01-viem-client-and-hooks"
      title: "Membangun Antarmuka dApp Reaktif dengan Viem & Wagmi v2"
      concepts:
        - "viem-public-client-vs-wallet-client"
        - "wagmi-v2-hooks"
        - "type-safe-abi-as-const"
        - "transaction-receipt-lifecycle"
      learning_objectives:
        - id: "LO-DAPP-VIEM-001"
          text: "Mendemonstrasikan pembacaan data on-chain tanpa meminta koneksi dompet pengguna"
        - id: "LO-DAPP-VIEM-002"
          text: "Mengirim transaksi mutasi state dan menunggu konfirmasi receipt di frontend"
      learning_modes: [read, code, interact]
      estimated_minutes: 45
      content_blocks:
        - type: text
          body: |
            ## Mengapa Viem & Wagmi Menjadi Standar De Facto?

            1. **Ukuran Bundle Sangat Ringan:** Viem memiliki ukuran footprint hingga 70% lebih kecil dibanding Ethers.js.
            2. **Native Type-Safety:** Dengan menambahkan `as const` pada definisi ABI, TypeScript dapat melakukan auto-complete nama fungsi dan memvalidasi tipe argumen secara otomatis saat penulisan kode!
            3. **Pemisahan Peran Client:**
               - **Public Client:** Digunakan untuk membaca state publik blockchain (saldo, panggilan `view`) melalui RPC endpoint tanpa perlu meminta user menghubungkan dompet kripto (*frictionless onboarding*).
               - **Wallet Client:** Digunakan untuk meminta tanda tangan digital (ECDSA signature) atau menyiarkan transaksi mutasi state yang membutuhkan biaya gas.

            ---

            ### Contoh Kode Type-Safe Contract Read & Write (Wagmi v2):

            ```typescript
            import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
            import { parseEther } from "viem";

            // ABI dengan 'as const' untuk auto-complete TypeScript penuh
            export const VAULT_ABI = [
              {
                type: "function",
                name: "deposit",
                inputs: [],
                outputs: [],
                stateMutability: "payable",
              },
              {
                type: "function",
                name: "balanceOf",
                inputs: [{ name: "account", type: "address" }],
                outputs: [{ type: "uint256" }],
                stateMutability: "view",
              },
            ] as const;

            export function VaultInteraction({ vaultAddress, userAddress }: { vaultAddress: `0x${string}`; userAddress: `0x${string}` }) {
              // 1. Membaca Saldo On-Chain
              const { data: balance, refetch } = useReadContract({
                address: vaultAddress,
                abi: VAULT_ABI,
                functionName: "balanceOf",
                args: [userAddress],
              });

              // 2. Mengirim Transaksi Deposit
              const { data: hash, writeContract, isPending: isWriting } = useWriteContract();

              // 3. Menunggu Konfirmasi Transaksi Masuk ke Block
              const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

              return (
                <div className="p-4 border rounded-xl">
                  <p>Saldo Vault: {balance ? balance.toString() : "0"} Wei</p>
                  <button
                    onClick={() =>
                      writeContract({
                        address: vaultAddress,
                        abi: VAULT_ABI,
                        functionName: "deposit",
                        value: parseEther("0.1"),
                      })
                    }
                    disabled={isWriting || isConfirming}
                  >
                    {isWriting ? "Menunggu Tanda Tangan Dompet..." : isConfirming ? "Mengonfirmasi di Blok..." : "Deposit 0.1 ETH"}
                  </button>
                  {isSuccess && <p className="text-emerald-400">Transaksi Berhasil Dikonfirmasi!</p>}
                </div>
              );
            }
            ```

        - type: callout
          variant: info
          body: |
            💡 **Prinsip Frictionless UX (PR-01 & DEC-012):**
            Jangan pernah memblokir tampilan aplikasi dengan popup modal "Connect Wallet" di awal.
            Biarkan pengguna membaca data protokol terlebih dahulu menggunakan Public Client; minta koneksi dompet HANYA saat pengguna menekan tombol transaksi yang memerlukan pembayaran gas!

        - type: interactive
          id: "sim-viem-client-flow"
          description: |
            Simulator Alur Status Transaksi dApp: Saksikan transisi status dari Unconnected -> Connected -> Wallet Signature Prompt -> Broadcasted Hash -> Block Receipt Confirmed.

        - type: quiz
          id: "checkpoint-viem-public-client"
          learning_objective_ref: "LO-DAPP-VIEM-001"
          question: "Mengapa pembacaan fungsi 'view' di smart contract tidak memerlukan koneksi dompet pengguna (wallet connection)?"
          choices:
            - text: "Karena fungsi view tidak menggunakan gas dan dapat dieksekusi secara instan melalui RPC Public Client tanpa memerlukan tanda tangan private key"
              correct: true
            - text: "Karena fungsi view disimpan di database lokal browser pengguna"
              correct: false
            - text: "Karena node validator otomatis menandatangani fungsi view"
              correct: false
            - text: "Karena Viem secara otomatis membuat private key palsu untuk user"
              correct: false
          explanation: |
            Fungsi view hanya membaca state trie blockchain yang bersifat publik transparan
            menggunakan panggilan RPC `eth_call`. Tidak ada mutasi state on-chain, sehingga tidak ada
            gas yang terbakar dan tidak memerlukan otorisasi private key.

  interactive:
    - "sim-viem-client-flow"

  practice:
    - "exercise-build-vault-frontend"

  checkpoint: "checkpoint-viem-public-client"
  mini_project: "project-staking-dashboard-ui"

  common_mistakes:
    - mistake: "Mengasumsikan transaksi telah sukses saat hash transaksi pertama kali diterima"
      correction: "Hash transaksi hanya membuktikan bahwa transaksi telah diterima di mempool; Anda wajib menunggu hingga useWaitForTransactionReceipt mengonfirmasi blok telah final."
    - mistake: "Lupa menambahkan 'as const' pada deklarasi array ABI"
      correction: "Tanpa 'as const', TypeScript memperlakukan ABI sebagai array generic biasa sehingga fitur type-safe auto-complete nama fungsi dan argumen tidak akan aktif."

  security:
    - risk: "User Rejection dan Unhandled RPC Exception"
      why_it_matters: "Jika pengguna menolak konfirmasi di dompet (MetaMask/Rabby) dan error tidak ditangkap oleh error boundary, aplikasi web dapat mengalami crash layar putih."
      practice: "Selalu tangani onError callback dan tampilkan pesan ramah: 'Transaksi dibatalkan oleh pengguna'."
      mitigation: "Gunakan error boundary React dan tangkap rejection code 4001."

  evidence:
    - type: "checkpoint-passed"
      level: 4
      description: "Menguasai integrasi frontend dApp menggunakan Viem, Wagmi v2, dan type-safe ABI"

  skills:
    - "viem"
    - "wagmi-v2"
    - "frontend-web3"

  estimated_time_minutes: 60
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
