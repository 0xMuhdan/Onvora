# Unit: Wallets & Security

```yaml
unit:
  id: "web3-basics-03-wallets-and-security"
  title: "Wallets & Security — Kunci Digital yang Tidak Boleh Hilang"
  track: "ethereum-developer"
  phase: "phase-1-understand"
  knowledge_scope: core
  chain_adapter: null
  target_level: beginner

  why: |
    Di Web3, tidak ada tombol "Lupa Password". Wallet adalah identitasmu, rekening bankmu,
    dan kunci rumahmu — sekaligus. Memahami cara kerjanya (public key, private key, seed phrase)
    bukan hanya penting untuk keamanan pribadi, tapi juga fundamental untuk menulis smart contract
    yang aman.

  target: |
    Pemula yang belum pernah menggunakan crypto wallet, atau pengguna yang sudah punya wallet
    tapi tidak paham mekanisme di baliknya (public/private key cryptography).

  prerequisites:
    - "web3-basics-02-blockchain-fundamentals"

  outcomes:
    - "Menjelaskan cara kerja public-key cryptography dalam konteks blockchain"
    - "Mendeskripsikan hubungan antara private key, public key, dan address"
    - "Mengidentifikasi minimal 5 praktik keamanan wallet yang wajib dilakukan"
    - "Menjelaskan perbedaan antara custodial dan non-custodial wallet"
    - "Mengenali 3 jenis serangan/scam yang paling umum menarget pengguna wallet"

  lessons:
    - id: "lesson-03-01-public-key-cryptography"
      title: "Public-Key Cryptography — Gembok dan Kunci"
      concepts:
        - "public-key"
        - "private-key"
        - "digital-signature"
        - "asymmetric-cryptography"
        - "address-derivation"
      learning_objectives:
        - id: "LO-WALLET-001"
          text: "Menjelaskan cara kerja public-key cryptography menggunakan analogi gembok-kunci"
        - id: "LO-WALLET-002"
          text: "Mendeskripsikan alur dari private key → public key → address"
      learning_modes: [read, interact]
      estimated_minutes: 15
      content_blocks:
        - type: text
          body: |
            ## Analogi: Gembok dan Kunci

            Bayangkan kamu punya **kotak surat** di depan rumah:
            - **Public Key (= gembok + alamat kotak surat):** Siapa pun bisa melihat alamatnya
              dan memasukkan surat (mengirim uang). Kamu bahkan bisa menulisnya di kartu nama.
            - **Private Key (= kunci kotak surat):** Hanya kamu yang punya. Tanpa kunci ini,
              tidak ada yang bisa membuka kotak dan mengambil isi di dalamnya.

            ### Alur di Blockchain

            ```
            Private Key (rahasia, hanya kamu)
                │
                ▼ (operasi matematika satu arah — tidak bisa dibalik)
            Public Key
                │
                ▼ (hash function)
            Address (0x742d35Cc6634C0532925a3b844Bc9e7595f...)
            ```

            **Aturan emas:**
            - Dari private key → kamu bisa mendapatkan public key dan address
            - Dari address → kamu **TIDAK BISA** menebak private key
            - Ini berkat matematika kurva eliptik (elliptic curve cryptography)

            ### Digital Signature — Tanda Tangan Digital

            Ketika kamu mengirim transaksi:
            1. Kamu menulis pesan: "Kirim 1 ETH ke Bob"
            2. Kamu menandatanganinya dengan **private key**-mu
            3. Siapa pun bisa memverifikasi tanda tangan menggunakan **public key**-mu
            4. Tapi tidak ada yang bisa membuat tanda tangan tanpa private key-mu

            Ini seperti tanda tangan notaris — semua bisa verifikasi asli atau tidak,
            tapi hanya kamu yang bisa membuat tanda tangan itu.

        - type: interactive
          id: "sim-key-pair-generation"
          description: |
            Simulasi: klik "Generate Key Pair" untuk melihat bagaimana private key
            menghasilkan public key dan address. Coba tandatangani pesan dan verifikasi
            tanda tangan — semua di lingkungan simulasi, bukan key sungguhan.

        - type: security_note
          body: |
            🔴 **JANGAN PERNAH:**
            - Membagikan private key ke siapa pun — termasuk "customer support"
            - Menggunakan private key dari tutorial/contoh untuk menyimpan dana sungguhan
            - Menyimpan private key di cloud tanpa enkripsi (Google Drive, email, dll.)

        - type: quiz
          id: "checkpoint-key-cryptography"
          learning_objective_ref: "LO-WALLET-001"
          question: "Jika seseorang mengetahui address blockchain-mu, apa yang bisa mereka lakukan?"
          choices:
            - text: "Mengambil semua dana dari wallet-mu"
              correct: false
              feedback: "Tidak! Address itu seperti alamat kotak surat — orang bisa melihat dan mengirim, tapi tidak bisa mengambil."
            - text: "Melihat saldo dan riwayat transaksimu, serta mengirim dana ke wallet-mu"
              correct: true
              feedback: "Benar! Address bersifat publik. Siapa pun bisa melihat dan mengirim — tapi mengambil butuh private key."
            - text: "Tidak bisa melakukan apa-apa — address bersifat rahasia"
              correct: false
              feedback: "Address justru bersifat publik dan dirancang untuk dibagikan."

    - id: "lesson-03-02-wallet-types"
      title: "Jenis-Jenis Wallet — Dari Hot Wallet sampai Hardware Wallet"
      concepts:
        - "hot-wallet"
        - "cold-wallet"
        - "hardware-wallet"
        - "custodial-wallet"
        - "non-custodial-wallet"
        - "seed-phrase"
        - "mnemonic"
      learning_objectives:
        - id: "LO-WALLET-003"
          text: "Membedakan custodial dan non-custodial wallet serta implikasinya"
        - id: "LO-WALLET-004"
          text: "Menjelaskan fungsi seed phrase dan mengapa harus dijaga dengan hati-hati"
      learning_modes: [read, interact]
      estimated_minutes: 15
      content_blocks:
        - type: text
          body: |
            ## Custodial vs Non-Custodial

            | Aspek | Custodial (Exchange) | Non-Custodial (Self-custody) |
            |-------|---------------------|------------------------------|
            | **Siapa pegang private key** | Platform (Binance, Coinbase) | Kamu sendiri |
            | **Contoh** | Akun Binance, akun Coinbase | MetaMask, Rabby, Ledger |
            | **Keuntungan** | Mudah, ada "lupa password" | Kamu yang kontrol sepenuhnya |
            | **Risiko** | Platform diretas/bangkrut = danamu hilang | Kehilangan key = danamu hilang selamanya |
            | **Analogi** | Uang di rekening bank | Uang di brankas pribadi |

            > **"Not your keys, not your coins."**
            > Jika platform yang memegang key-mu bangkrut (seperti FTX pada 2022),
            > danamu ikut hilang. Itulah kenapa pemahaman self-custody penting.

            ## Seed Phrase — 12/24 Kata Ajaib

            Seed phrase (mnemonic) adalah representasi private key dalam bentuk
            kata-kata yang bisa dibaca manusia:

            ```
            abandon ability able about above absent absorb abstract
            absurd abuse access accident account accuse achieve acid
            acoustic acquire across act action actor actress actual
            ```

            **Siapa pun yang punya 24 kata ini memiliki SEMUA aset di wallet-mu.**
            Tidak ada cara untuk recovery jika seed phrase hilang.

            ## Hot vs Cold Wallet

            | Tipe | Koneksi Internet | Contoh | Keamanan | Kenyamanan |
            |------|-----------------|--------|----------|------------|
            | **Hot Wallet** | Selalu online | MetaMask, Rabby | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
            | **Cold Wallet** | Offline | Ledger, Trezor | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

            **Aturan praktis:** Simpan dana besar di cold wallet. Gunakan hot wallet
            hanya untuk jumlah kecil yang kamu pakai sehari-hari — seperti dompet
            di saku vs brankas di rumah.

        - type: interactive
          id: "sim-wallet-comparison"
          description: |
            Tabel perbandingan interaktif: pilih skenario penggunaan (trader harian,
            investor jangka panjang, developer) dan dapatkan rekomendasi tipe wallet
            yang sesuai beserta alasannya.

        - type: quiz
          id: "checkpoint-wallet-types"
          learning_objective_ref: "LO-WALLET-003"
          question: "Apa risiko utama menggunakan custodial wallet seperti exchange?"
          choices:
            - text: "Transaksi lebih lambat"
              correct: false
              feedback: "Kecepatan bukan masalah utama. Exchange justru sering lebih cepat untuk trading."
            - text: "Jika exchange bangkrut atau diretas, kamu bisa kehilangan semua dana"
              correct: true
              feedback: "Benar! Seperti kasus FTX — miliaran dolar dana pengguna hilang karena mereka tidak memegang private key sendiri."
            - text: "Kamu tidak bisa mengirim crypto ke orang lain"
              correct: false
              feedback: "Salah — kamu tetap bisa mengirim. Masalahnya adalah kontrol atas asetmu."

    - id: "lesson-03-03-security-practices"
      title: "Praktik Keamanan Wajib & Mengenali Scam"
      concepts:
        - "phishing"
        - "social-engineering"
        - "approval-scam"
        - "fake-airdrop"
        - "opsec"
      learning_objectives:
        - id: "LO-WALLET-005"
          text: "Mengidentifikasi minimal 3 jenis serangan/scam yang paling umum"
        - id: "LO-WALLET-006"
          text: "Menerapkan 5 praktik keamanan wajib untuk pengguna Web3"
      learning_modes: [read, interact]
      estimated_minutes: 15
      content_blocks:
        - type: text
          body: |
            ## 3 Scam Paling Umum di Web3

            ### 1. Phishing — Situs Palsu
            Penipu membuat website yang **sangat mirip** dengan yang asli.
            - `uniswap.org` (asli) vs `un1swap.org` (palsu)
            - `metamask.io` (asli) vs `metamask-extension.com` (palsu)

            **Cara kerja:** Kamu connect wallet ke situs palsu → diminta sign transaction →
            approval memberi akses semua token-mu ke scammer.

            ### 2. Social Engineering — Manipulasi Psikologis
            - "Saya dari support MetaMask, berikan seed phrase untuk memperbaiki akun Anda"
            - DM di Discord/Telegram menawarkan "bantuan" → mengarahkan ke situs phishing
            - Fake airdrop: "Klaim 1000 token gratis!" → drainer contract

            ### 3. Unlimited Approval Exploit
            Beberapa dApp meminta **unlimited approval** untuk token-mu. Jika dApp tersebut
            diretas atau ternyata scam, mereka bisa mengambil semua token yang kamu approve
            — kapan pun, tanpa perlu persetujuanmu lagi.

            ## 5 Praktik Keamanan Wajib

            | # | Praktik | Kenapa |
            |---|---------|--------|
            | 1 | **Simpan seed phrase offline** (kertas/metal, bukan digital) | Screenshot/notes bisa diretas |
            | 2 | **Selalu verifikasi URL** sebelum connect wallet | Phishing site identik secara visual |
            | 3 | **Gunakan hardware wallet** untuk dana besar | Hot wallet rentan malware |
            | 4 | **Revoke approval** yang tidak dipakai (revoke.cash) | Unlimited approval = risiko tak terbatas |
            | 5 | **Jangan pernah share seed phrase** — tidak ada support yang memintanya | 100% scam jika diminta seed phrase |

        - type: security_note
          body: |
            🔴 **Aturan Absolut:** Tidak ada pihak manapun — termasuk Onvora, MetaMask,
            Ethereum Foundation, atau siapa pun — yang akan pernah meminta seed phrase atau
            private key-mu. Jika ada yang meminta, itu **pasti scam**. Tanpa pengecualian.

        - type: interactive
          id: "sim-scam-detector-quiz"
          description: |
            Skenario interaktif: kamu diberi 6 pesan/DM/email yang terlihat dari "support".
            Identifikasi mana yang scam dan mana yang legit. Setiap jawaban diberi penjelasan
            detail tentang red flag yang harus diperhatikan.

        - type: quiz
          id: "checkpoint-security-practices"
          learning_objective_ref: "LO-WALLET-005"
          question: "Kamu mendapat DM di Discord: 'Hai, saya dari MetaMask Support. Kami mendeteksi masalah di wallet-mu. Kirim seed phrase untuk diperbaiki.' Apa yang harus kamu lakukan?"
          choices:
            - text: "Kirim seed phrase karena MetaMask Support pasti terpercaya"
              correct: false
              feedback: "TIDAK! MetaMask tidak pernah DM pengguna dan tidak pernah meminta seed phrase. Ini 100% scam."
            - text: "Abaikan dan block pengirimnya — ini pasti scam"
              correct: true
              feedback: "Benar! Tidak ada support resmi yang meminta seed phrase melalui DM. Block dan laporkan."
            - text: "Verifikasi dulu dengan mengirim sebagian seed phrase"
              correct: false
              feedback: "Tidak! Mengirim sebagian seed phrase tetap berbahaya dan memberi informasi ke scammer."

  interactive:
    - "sim-key-pair-generation"
    - "sim-wallet-comparison"
    - "sim-scam-detector-quiz"

  practice: []

  checkpoint: "checkpoint-unit-03-wallets-security"

  mini_project: null
  mini_project_skip_reason: "Unit konseptual awareness — tidak memerlukan wallet nyata (DEC-012, BR-05-002)"

  common_mistakes:
    - mistake: "Menyimpan seed phrase di notes/screenshot di HP"
      correction: "Seed phrase harus disimpan offline: tulis di kertas atau metal plate, simpan di tempat aman. Perangkat digital bisa diretas."
    - mistake: "Menggunakan satu wallet untuk segalanya"
      correction: "Gunakan wallet terpisah: satu untuk daily use (hot), satu untuk savings (cold). Jangan pernah connect wallet utama ke dApp yang tidak kamu kenal."
    - mistake: "Mengira 'Approve' pada token sama dengan 'Send'"
      correction: "Approve memberi izin ke smart contract untuk mengambil tokenmu di masa depan — ini berbeda dari mengirim langsung. Selalu cek dan revoke approval yang tidak dipakai."

  security:
    - risk: "Kehilangan semua aset karena seed phrase dicuri"
      why_it_matters: "Tidak ada recovery mechanism di blockchain — dana yang hilang tidak bisa dikembalikan"
      practice: "Latihan identifikasi scam dan praktik penyimpanan seed phrase yang aman"
      mitigation: "Gunakan hardware wallet, verifikasi URL, jangan pernah share seed phrase"

  evidence:
    - type: "knowledge_assessment"
      description: "Checkpoint: Wallet & Security Comprehension"

  skills:
    - "blockchain-fundamentals"
    - "web3-security"

  estimated_time_minutes: 45
  author: "Onvora Content Team"
  technical_reviewer: ""
  curriculum_reviewer: ""
  security_reviewer: ""
  review_date: ""
  version: 1
  deprecated: false
```
