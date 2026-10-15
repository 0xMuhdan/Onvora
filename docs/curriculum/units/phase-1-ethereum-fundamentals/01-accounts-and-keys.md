# Unit: Accounts, Keys, and State Identity

```yaml
unit:
  id: "eth-fund-01-accounts-and-keys"
  title: "Accounts, Keys, and State Identity — EOA vs Contract Accounts di Ethereum"
  track: "ethereum-developer"
  phase: "phase-1-ethereum-fundamentals"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: beginner

  why: |
    Di Ethereum, segala interaksi berakar dari konsep Account. Berbeda dengan model akun
    Web2 (username/password di server terpusat), Ethereum membedakan akun yang dikendalikan
    oleh kunci kriptografi pribadi (EOA) dan akun yang dikendalikan oleh kode bytecode
    (Contract Account). Memahami perbedaan ini adalah fondasi mutlak sebelum menulis smart contract.

  target: |
    Developer yang telah memahami konsep dasar blockchain dan ingin menguasai representasi
    identitas, state trie, dan kriptografi akun di jaringan Ethereum.

  prerequisites:
    - "web3-basics-02-blockchain-fundamentals"
    - "web3-basics-03-wallets-and-security"

  outcomes:
    - "Membedakan karakteristik teknis antara Externally Owned Accounts (EOA) dan Contract Accounts (CA)"
    - "Menjelaskan 4 komponen utama state akun: nonce, balance, storageRoot, dan codeHash"
    - "Mendeskripsikan alur derivasi kunci: Private Key -> Public Key (secp256k1) -> Keccak-256 Address"
    - "Menjelaskan peran Nonce dalam mencegah serangan replay dan kalkulasi alamat kontrak baru"

  lessons:
    - id: "lesson-eth-fund-01-01-account-types"
      title: "Anatomi Akun: EOA vs Contract Account"
      concepts:
        - "externally-owned-account"
        - "contract-account"
        - "account-state-fields"
        - "nonce-replay-prevention"
      learning_objectives:
        - id: "LO-ETH-ACC-001"
          text: "Mengidentifikasi perbedaan struktural antara EOA dan Contract Account"
        - id: "LO-ETH-ACC-002"
          text: "Menganalisis 4 field penyusun state akun Ethereum di World State Trie"
      learning_modes: [read, interact]
      estimated_minutes: 20
      content_blocks:
        - type: text
          body: |
            ## Dua Warga Negara Ethereum: EOA dan Smart Contract

            Ethereum World State adalah pemetaan antara **20-byte addresses** ke **account states**.
            Semua entitas di Ethereum digolongkan menjadi dua tipe akun:

            | Karakteristik | Externally Owned Account (EOA) | Contract Account (CA) |
            |---|---|---|
            | **Pengendali** | Pemilik Private Key (Manusia/Bot) | Bytecode EVM yang dideploy |
            | **Private Key** | Memiliki Private Key | Tidak memiliki Private Key |
            | **Biaya Pembuatan** | Gratis (Kalkulasi lokal) | Memerlukan Gas untuk deployment |
            | **Inisiasi Transaksi** | Bisa menginisiasi transaksi pertama | Hanya bisa bereaksi jika dipanggil oleh EOA / kontrak lain |
            | **Code Hash** | `EMPTY_CODE_HASH` (Keccak-256 dari string kosong) | Hash dari bytecode EVM kontrak |
            | **Storage Root** | Kosong | Root hash dari storage trie internal kontrak |

            ### 4 Komponen Account State

            Setiap akun memiliki 4 nilai di dalam Merkle Patricia State Trie:
            1. **`nonce`**:
               - Untuk EOA: Jumlah transaksi yang berhasil dikirim dari akun ini (mencegah *replay attack*).
               - Untuk Contract: Jumlah kontrak anak yang dibuat oleh kontrak ini (via `CREATE`/`CREATE2`).
            2. **`balance`**: Jumlah Wei (1 ETH = $10^{18}$ Wei) yang dimiliki akun.
            3. **`storageRoot`**: 256-bit hash dari node root storage trie yang menyimpan variabel state kontrak.
            4. **`codeHash`**: Hash Keccak-256 dari executable EVM code. Untuk EOA bernilai tetapan hash string kosong.

        - type: callout
          variant: info
          body: |
            💡 **Kalkulasi Alamat Smart Contract:**
            Saat EOA membuat kontrak baru menggunakan opcode `CREATE`, alamat kontrak dihitung secara deterministik:
            `address = keccak256(rlp.encode([sender_address, nonce]))[12:]`
            Inilah alasan mengapa nonce EOA menentukan alamat kontrak berikutnya yang dideploy!

        - type: interactive
          id: "sim-eth-key-derivation"
          description: |
            Simulator Derivasi Alamat: Masukkan private key hex, saksikan transformasi kurva eliptik
            secp256k1 menghasilkan 64-byte uncompressed public key, lakukan Keccak-256 hash, dan
            ambil 20 byte terakhir untuk membentuk alamat 0x...

        - type: quiz
          id: "checkpoint-eth-accounts"
          learning_objective_ref: "LO-ETH-ACC-001"
          question: "Mengapa sebuah Contract Account tidak dapat mengirimkan transaksi pertama secara mandiri tanpa pemicu?"
          choices:
            - text: "Karena Contract Account tidak memiliki ETH untuk membayar gas"
              correct: false
            - text: "Karena Contract Account tidak memiliki Private Key untuk menandatangani (ECDSA sign) transaksi"
              correct: true
            - text: "Karena EVM melarang pemanggilan lintas smart contract"
              correct: false
            - text: "Karena nonce Contract Account selalu bernilai nol"
              correct: false
          explanation: |
            Di Ethereum (pra-native account abstraction), setiap transaksi yang masuk ke mempool
            wajib memiliki tanda tangan kriptografi ECDSA yang sah dari sebuah Private Key. Karena
            Contract Account hanya berupa kode tanpa private key, ia hanya mengeksekusi instruksi
            saat dipanggil (call/internal transaction).

  interactive:
    - "sim-eth-key-derivation"

  practice:
    - "exercise-calculate-contract-address"

  checkpoint: "checkpoint-eth-accounts"
  mini_project: null

  common_mistakes:
    - mistake: "Mengira Contract Account memiliki private key tersembunyi"
      correction: "Contract Account murni dikendalikan oleh logika kode EVM; tidak ada entitas manapun yang memiliki private key atas alamat tersebut."
    - mistake: "Mengasumsikan nonce EOA dimulai dari angka acak"
      correction: "Nonce EOA selalu dimulai dari 0 dan bertambah tepat +1 setiap kali transaksi berhasil masuk ke block."

  security:
    - risk: "Replay Attack jika Nonce tidak divalidasi"
      why_it_matters: "Penyerang bisa menyiarkan ulang transaksi transfer dana korban secara berulang-ulang hingga saldo habis."
      practice: "Protokol node memverifikasi bahwa nonce transaksi harus tepat sama dengan nonce state akun saat ini."
      mitigation: "Gunakan chain ID (EIP-155) dan strict sequential nonce tracking."

  evidence:
    - type: "checkpoint-passed"
      level: 1
      description: "Memahami model akun, derivasi alamat, dan komponen state Ethereum"

  skills:
    - "eth-core-accounts"
    - "crypto-secp256k1"

  estimated_time_minutes: 45
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
