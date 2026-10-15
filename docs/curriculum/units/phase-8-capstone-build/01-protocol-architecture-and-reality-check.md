# Unit: Capstone Architecture & The 8 Reality Check Criteria

```yaml
unit:
  id: "capstone-01-protocol-architecture"
  title: "Capstone Architecture & The 8 Reality Check Criteria — Menembus Standar Produksi"
  track: "ethereum-developer"
  phase: "phase-8-capstone-build"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: advanced

  why: |
    Proyek capstone mandiri adalah bukti puncak bahwa seorang developer tidak hanya menyalin tutorial,
    tetapi mampu merancang, membangun, menguji dengan standar audit, dan men-deploy protokol desentralisasi
    nyata dari nol. Lolos seluruh 8 Kriteria Reality Check adalah syarat mutlak untuk memperoleh pengakuan
    Certified Ethereum Builder (Level B / Level 4–5 Verified) di Evidence Ledger Onvora.

  target: |
    Developer yang telah menyelesaikan seluruh materi teknis dan siap membangun portofolio produksi nyata
    untuk membuka peluang karier, hackathon, dan hibah ekosistem (*grants*).

  prerequisites:
    - "sol-arch-02-openzeppelin-tokens"
    - "foundry-02-cheatcodes-and-fuzzing"
    - "sec-01-checks-effects-interactions"
    - "dapp-01-viem-and-wagmi"

  outcomes:
    - "Merancang spesifikasi arsitektur multi-kontrak dengan diagram relasi state dan invariants"
    - "Mengimplementasikan seluruh 8 Kriteria Reality Check Onvora pada proyek mandiri"
    - "Menulis test suite komprehensif dengan cakupan 100% menggunakan Foundry Forge & Fuzzing"
    - "Men-deploy kontrak ke Sepolia Testnet, memverifikasi source code di Etherscan, dan menyusun laporan audit mandiri"

  lessons:
    - id: "lesson-capstone-01-01-reality-check-standards"
      title: "8 Kriteria Reality Check untuk Proyek Standar Industri"
      concepts:
        - "the-8-reality-check-criteria"
        - "multi-contract-invariants"
        - "testnet-deployment-verification"
        - "peer-review-rubric-readiness"
      learning_objectives:
        - id: "LO-CAP-REAL-001"
          text: "Mengevaluasi kesiapan proyek capstone terhadap 8 Kriteria Reality Check"
        - id: "LO-CAP-REAL-002"
          text: "Menyiapkan berkas pengajuan lengkap (README, arsitektur, script deploy, audit checklist)"
      learning_modes: [read, build, explain]
      estimated_minutes: 60
      content_blocks:
        - type: text
          body: |
            ## 8 Kriteria Reality Check Onvora

            Setiap proyek Capstone mandiri yang diajukan untuk verifikasi kredensial **Certified Ethereum Builder**
            wajib lolos seluruh 8 pilar standar berikut tanpa toleransi:

            | # | Kriteria | Standar Pembuktian Riil |
            |---|---|---|
            | **1** | **Real Problem Solved** | Menyelesaikan masalah nyata (berasal dari *Real-World Problem Library*); dilarang membuat token spekulatif kosong / DeFi clone murahan. |
            | **2** | **Multi-Contract Architecture** | Minimal 2 kontrak yang saling berkomunikasi menggunakan Interface terpisah dan C3 Linearization yang bersih. |
            | **3** | **Modern Solidity (v0.8.20+)** | Memakai custom errors (`error InsufficientFunds()`), storage layout packing efisien, dan library OpenZeppelin v5. |
            | **4** | **Audit-Grade Testing (Foundry)** | 100% line coverage pada logika kritis, mencakup unit testing, revert verification, dan minimal 1 suite *Stateless Fuzzing* / *Invariant Testing*. |
            | **5** | **Zero High/Critical Vulnerabilities** | Mematuhi pola Checks-Effects-Interactions (CEI), menggunakan ReentrancyGuard pada fungsi likuiditas, dan lolos analisa static Slither tanpa alert kritis. |
            | **6** | **Live Testnet Deployment** | Dideploy ke Sepolia Testnet menggunakan Foundry script otomatis, dan source code terverifikasi publik di Sepolia Etherscan. |
            | **7** | **Interactive Frontend Demo** | Antarmuka web fungsional yang dibangun dengan Viem / Wagmi, memungkinkan pengguna mencoba alur utama tanpa crash. |
            | **8** | **Comprehensive Documentation** | File `README.md` terstruktur: diagram arsitektur ASCII/Mermaid, panduan build & test lokal, alamat kontrak testnet, dan checklist mitigasi keamanan. |

            ---

            ### Struktur Repositori Capstone Standar:

            ```
            capstone-protocol/
            ├── src/
            │   ├── interfaces/
            │   │   └── IProtocolVault.sol
            │   ├── ProtocolVault.sol
            │   └── ProtocolToken.sol
            ├── test/
            │   ├── ProtocolVault.t.sol
            │   └── invariants/
            │       └── InvariantVault.t.sol
            ├── script/
            │   └── DeploySepolia.s.sol
            ├── frontend/
            │   └── src/ (Next.js + Viem + Wagmi)
            ├── README.md
            └── SECURITY_AUDIT.md
            ```

        - type: callout
          variant: success
          body: |
            🎯 **Gerbang Kredensial Builder (Level B Verified):**
            Menyelesaikan Capstone ini secara mandiri akan membuka fitur pelamaran kerja di Onvora Jobs,
            rekomendasi otomatis ke hiring partner Web3 global, serta tiket otomatis ke hackathon tingkat lanjut!

        - type: quiz
          id: "checkpoint-reality-check-rule"
          learning_objective_ref: "LO-CAP-REAL-001"
          question: "Mengapa sebuah proyek capstone tetap ditolak meskipun kodenya berjalan jika tidak memiliki pengujian Fuzzing atau Invariant test di Foundry?"
          choices:
            - text: "Karena smart contract tidak boleh dideploy sebelum memiliki sertifikat DAO"
              correct: false
            - text: "Karena pengujian nilai tetap statis tidak membuktikan keandalan properti protokol terhadap skenario ekstrem acak yang biasa dieksploitasi oleh hacker di dunia nyata"
              correct: true
            - text: "Karena Foundry mengharuskan setiap variabel bertipe uint256"
              correct: false
            - text: "Karena Sepolia testnet menolak kontrak tanpa fuzzing"
              correct: false
          explanation: |
            Fuzzing dan invariant testing adalah standar mutlak audit Web3 modern untuk membuktikan
            bahwa rumus matematis dan status keuangan brankas kontrak tidak dapat dirusak oleh kombinasi input tak terduga.

  interactive: []

  practice:
    - "exercise-run-slither-audit"

  checkpoint: "checkpoint-reality-check-rule"
  mini_project: "project-independent-capstone-build"

  common_mistakes:
    - mistake: "Mengunggah private key asli ke dalam skrip deployment Git"
      correction: "Jangan pernah memasukkan private key ke dalam kode repositori! Gunakan Foundry keystore aman (cast wallet import) atau environment variable .env yang masuk ke .gitignore."
    - mistake: "Tidak memverifikasi source code kontrak di Etherscan"
      correction: "Gunakan flag '--verify --etherscan-api-key' saat menjalankan forge script agar auditor dan komunitas dapat membaca kode kontrak yang dideploy secara transparan."

  security:
    - risk: "Hardcoded Admin Address pada Deployment Script"
      why_it_matters: "Jika admin address disetel secara statis ke alamat deployer testnet tanpa multisig atau timelock, protokol rentan terhadap single-point-of-failure."
      practice: "Gunakan konfigurasi parameter lingkungan dan pertimbangkan kepemilikan multi-signature untuk peran administratif."
      mitigation: "Terapkan AccessControl atau Ownable2Step OpenZeppelin."

  evidence:
    - type: "project-submitted"
      level: 5
      description: "Membangun protokol terdesentralisasi mandiri yang lolos 8 Kriteria Reality Check Onvora"

  skills:
    - "protocol-architecture"
    - "capstone-build"
    - "audit-readiness"
    - "reality-check-verified"

  estimated_time_minutes: 180
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
