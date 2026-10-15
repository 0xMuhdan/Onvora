# Unit: OpenZeppelin v5 Standards & Token Architecture

```yaml
unit:
  id: "sol-arch-02-openzeppelin-tokens"
  title: "OpenZeppelin v5 Standards & Token Architecture — ERC-20, ERC-721 & SafeERC20"
  track: "ethereum-developer"
  phase: "phase-4-contract-architecture"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: proficient

  why: |
    Membangun token atau standar aset dari nol tanpa pustaka terverifikasi adalah penyebab utama
    bencana keamanan Web3. OpenZeppelin Contracts v5 adalah standar industri de facto yang telah diaudit
    secara ketat. Memahami arsitektur ERC-20 fungible tokens, ERC-721 NFTs, serta penanganan kasus
    aneh pada token legacy (seperti USDT yang tidak mengembalikan nilai boolean) dengan SafeERC20
    adalah keahlian wajib setiap smart contract developer.

  target: |
    Developer yang ingin membangun aset digital terdesentralisasi menggunakan standar aman
    dan mengintegrasikan transfer token dengan aman.

  prerequisites:
    - "sol-arch-01-inheritance-and-interfaces"

  outcomes:
    - "Mengimplementasikan kontrak token ERC-20 menggunakan modul OpenZeppelin v5"
    - "Menerapkan standar NFT ERC-721 dengan metadata URI dan mekanisme safeTransferFrom"
    - "Mengidentifikasi celah Weird ERC-20 Tokens (non-standard return values, fee-on-transfer, rebasing)"
    - "Menggunakan library SafeERC20 untuk mencegah dana terkunci pada transaksi transfer token"

  lessons:
    - id: "lesson-sol-arch-02-01-erc20-and-safe-transfer"
      title: "Standar Token ERC-20 dan Praktik Aman SafeERC20"
      concepts:
        - "erc20-standard-lifecycle"
        - "erc721-nft-ownership"
        - "openzeppelin-v5-features"
        - "weird-erc20-and-safeerc20"
      learning_objectives:
        - id: "LO-SOL-TOK-001"
          text: "Membangun kontrak ERC-20 dengan fitur minting dan cap terbatas"
        - id: "LO-SOL-TOK-002"
          text: "Menerapkan SafeERC20 untuk melindungi interaksi transfer token pihak ketiga"
      learning_modes: [read, code, interact]
      estimated_minutes: 45
      content_blocks:
        - type: text
          body: |
            ## 1. Anatomi Standar ERC-20 (Fungible Token)

            ERC-20 mendefinisikan antarmuka universal untuk token yang dapat dipertukarkan.
            Setiap unit token memiliki nilai yang identik satu sama lain.

            ### Fungsi Inti ERC-20:
            - `totalSupply()`: Mengembalikan total pasokan token yang beredar.
            - `balanceOf(account)`: Saldo token milik akun tertentu.
            - `transfer(to, amount)`: Mentransfer token dari pengirim langsung ke penerima.
            - `allowance(owner, spender)`: Kuota token yang diizinkan owner untuk ditarik oleh spender.
            - `approve(spender, amount)`: Memberikan izin penarikan kuota ke pihak ketiga (mis. Uniswap router).
            - `transferFrom(from, to, amount)`: Memindahkan token dari akun `from` menggunakan kuota allowance.

            ### Mengapa OpenZeppelin Contracts v5?
            Mulai versi 5.0, OpenZeppelin membuang pola lama (`_beforeTokenTransfer` hooks) dan menggantinya
            dengan fungsi internal tunggal yang lebih bersih: `_update(address from, address to, uint256 value)`.
            Semua minting (`from == address(0)`), burning (`to == address(0)`), dan transfer reguler melewati fungsi ini!

            ```solidity
            // SPDX-License-Identifier: MIT
            pragma solidity ^0.8.20;

            import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
            import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

            contract CommunityToken is ERC20, Ownable {
                uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18;

                error ExceedsMaxSupply(uint256 requested, uint256 cap);

                constructor(address initialOwner)
                    ERC20("Community Token", "CMT")
                    Ownable(initialOwner)
                {}

                function mint(address to, uint256 amount) external onlyOwner {
                    if (totalSupply() + amount > MAX_SUPPLY) {
                        revert ExceedsMaxSupply(totalSupply() + amount, MAX_SUPPLY);
                    }
                    _mint(to, amount);
                }
            }
            ```

            ---

            ## 2. Bahaya "Weird ERC-20" & Penyelamatan oleh SafeERC20

            Banyak token di dunia nyata (termasuk token berkapitalisasi terbesar seperti **USDT** di Ethereum mainnet)
            **TIDAK sepenuhnya patuh pada spesifikasi ERC-20 asli**:
            - Fungsi `transfer` USDT tidak mengembalikan nilai `bool true`, melainkan tidak mengembalikan apa pun (`void`)!
            - Jika kontrak Anda memanggil `IERC20(usdt).transfer(...)`, kompilator mengharapkan 32-byte boolean return value. Karena USDT tidak mengembalikan data, transaksi akan **REVERT** secara misterius!

            ### Solusi Standar Industri: Gunakan SafeERC20
            ```solidity
            import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
            import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

            contract PaymentGateway {
                using SafeERC20 for IERC20;

                function processPayment(IERC20 token, address recipient, uint256 amount) external {
                    // SafeERC20 menangani token void return secara mulus melalui low-level call & verifikasi data
                    token.safeTransferFrom(msg.sender, recipient, amount);
                }
            }
            ```

        - type: callout
          variant: info
          body: |
            💡 **ERC-721 NFT vs ERC-20:**
            ERC-721 merepresentasikan kepemilikan aset unik (*Non-Fungible*). Setiap item diidentifikasi oleh
            `tokenId` integer unik, dan memiliki `tokenURI` yang menunjuk ke metadata JSON (gambar, deskripsi, atribut).

        - type: interactive
          id: "sim-token-allowance-flow"
          description: |
            Alur Interaktif Approve & TransferFrom: Simulasikan interaksi antara Pengguna, Kontrak Staking Vault,
            dan Kontrak ERC-20 untuk memahami bagaimana allowance didelegasikan dan dikurangi secara bertahap.

        - type: quiz
          id: "checkpoint-safeerc20-why"
          learning_objective_ref: "LO-SOL-TOK-002"
          question: "Mengapa disarankan selalu menggunakan library SafeERC20 saat mentransfer token di protokol DeFi?"
          choices:
            - text: "SafeERC20 membebaskan biaya gas transfer token sepenuhnya"
              correct: false
            - text: "SafeERC20 secara otomatis memotong pajak fee-on-transfer"
              correct: false
            - text: "SafeERC20 memeriksa kesuksesan transfer baik untuk token yang mengembalikan bool maupun token lawas yang tidak mengembalikan nilai (seperti USDT)"
              correct: true
            - text: "SafeERC20 mengubah token ERC-20 menjadi native Ether"
              correct: false
          explanation: |
            SafeERC20 membungkus panggilan raw transfer/transferFrom dan memverifikasi apakah
            eksekusi sukses baik dengan memeriksa return boolean true maupun menerima empty return data
            (untuk token non-standard compliant).

  interactive:
    - "sim-token-allowance-flow"

  practice:
    - "exercise-deploy-erc20-with-cap"

  checkpoint: "checkpoint-safeerc20-why"
  mini_project: "project-staking-rewards-vault"

  common_mistakes:
    - mistake: "Menggunakan perbandingan IERC20(token).transfer() == true secara langsung"
      correction: "Token seperti USDT akan menyebabkan transaksi gagal karena tidak mengembalikan data apa pun; selalu gunakan token.safeTransfer()."
    - mistake: "Mengasumsikan setiap token ERC-20 memiliki 18 desimal"
      correction: "Banyak token populer memiliki desimal berbeda (misalnya USDC dan USDT memiliki 6 desimal, WBTC memiliki 8 desimal)."

  security:
    - risk: "Approval Front-Running Attack pada Standar approve() ERC-20"
      why_it_matters: "Jika spender melihat transaksi perubahan allowance Anda di mempool, ia dapat menyelipkan transaksi transferFrom sebelum allowance diturunkan."
      practice: "Gunakan EIP-2612 permit (tanda tangan off-chain) atau naikkan/turunkan dengan safeIncreaseAllowance / safeDecreaseAllowance."
      mitigation: "Terapkan perlindungan permit berbasis signature kriptografi."

  evidence:
    - type: "checkpoint-passed"
      level: 3
      description: "Menguasai standar ERC-20/721 OpenZeppelin v5 dan penerapan library defensif SafeERC20"

  skills:
    - "erc-20"
    - "erc-721"
    - "safe-erc20"
    - "openzeppelin-v5"

  estimated_time_minutes: 60
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
