# Unit: Web3 Overview

```yaml
unit:
  id: "web3-basics-01-web3-overview"
  title: "Web3 Overview — Dari Internet Biasa ke Internet yang Kamu Miliki"
  track: "ethereum-developer"
  phase: "phase-1-understand"
  knowledge_scope: core
  chain_adapter: null
  target_level: awareness

  why: |
    Sebelum kamu menulis satu baris kode pun, kamu perlu paham: kenapa Web3 ada?
    Apa masalah nyata yang diselesaikan? Siapa yang diuntungkan? Dan kenapa ini relevan
    untuk kariermu sebagai developer? Unit ini menjawab semua itu — tanpa jargon berlebihan.

  target: |
    Siapa pun yang baru pertama kali mendengar Web3, mahasiswa IT, developer Web2
    yang penasaran, atau siapa pun yang ingin paham gambaran besar sebelum mendalami teknis.

  prerequisites: []

  outcomes:
    - "Menjelaskan perbedaan mendasar antara Web1, Web2, dan Web3 menggunakan contoh nyata"
    - "Mengidentifikasi minimal 3 masalah Web2 yang coba diselesaikan oleh Web3"
    - "Mendeskripsikan peran developer dalam ekosistem Web3"
    - "Membedakan antara hype/spekulasi dan use case nyata Web3"

  lessons:
    - id: "lesson-01-01-internet-evolution"
      title: "Evolusi Internet: Web1 → Web2 → Web3"
      concepts:
        - "web1-read-only"
        - "web2-read-write-platform"
        - "web3-read-write-own"
        - "centralization-vs-decentralization"
      learning_objectives:
        - id: "LO-WEB3-001"
          text: "Menjelaskan karakteristik utama Web1, Web2, dan Web3"
        - id: "LO-WEB3-002"
          text: "Mengidentifikasi mengapa transisi dari Web2 ke Web3 terjadi"
      learning_modes: [read, interact]
      estimated_minutes: 15
      content_blocks:
        - type: text
          body: |
            ## Bayangkan Internet Sebagai Toko Buku

            **Web1 (1990–2004): Etalase kaca.**
            Kamu bisa melihat buku di balik kaca, tapi tidak bisa menyentuhnya. Website adalah
            halaman statis — kamu membaca, lalu pergi. Tidak ada komentar, tidak ada interaksi.
            Yahoo, GeoCities, dan website universitas adalah contohnya.

            **Web2 (2005–sekarang): Toko buku yang bisa kamu masuki.**
            Kamu bisa masuk, menulis review, merekomendasikan buku, bahkan menjual buku sendiri.
            Tapi ada satu masalah: **toko itu milik orang lain**. Instagram memiliki foto-fotomu.
            YouTube memiliki video-videomu. Grab memiliki data perjalananmu. Mereka bisa mengubah
            aturan, memblokir akunmu, atau menjual datamu — kapan saja.

            **Web3 (mulai berkembang): Toko buku yang kamu miliki bersama.**
            Bagaimana jika kamu bisa menggunakan layanan digital tanpa harus menyerahkan kontrol
            sepenuhnya kepada satu perusahaan? Itulah visi Web3: internet di mana **kamu memiliki
            data, aset, dan identitasmu sendiri**.

        - type: callout
          variant: info
          body: |
            💡 **Penting:** Web3 bukan berarti Web2 menghilang. Web3 adalah lapisan tambahan
            di atas internet yang sudah ada — memberikan opsi kepemilikan dan transparansi
            yang sebelumnya tidak mungkin.

        - type: interactive
          id: "sim-web-evolution-timeline"
          description: |
            Timeline interaktif: geser slider dari 1990 → sekarang. Di setiap era, lihat
            contoh aplikasi, siapa yang punya data, dan apa yang bisa/tidak bisa dilakukan user.

        - type: text
          body: |
            ## Masalah Nyata Web2

            | Masalah | Contoh di Kehidupan Nyata |
            |---------|--------------------------|
            | **Single Point of Failure** | Server WhatsApp down → 2 miliar orang tidak bisa berkomunikasi |
            | **Data Ownership** | Facebook menjual data penggunanya ke Cambridge Analytica |
            | **Censorship & De-platforming** | Akun kreator YouTube dihapus tanpa peringatan jelas |
            | **Rent-seeking** | Apple & Google mengambil 30% dari setiap transaksi di app store |
            | **Opaque Algorithms** | TikTok menentukan apa yang kamu lihat — kamu tidak tahu caranya |

            Web3 **tidak otomatis menyelesaikan semua ini**. Tapi Web3 memberikan alat baru
            untuk membangun sistem yang lebih transparan dan memberikan kontrol ke pengguna.

        - type: quiz
          id: "checkpoint-web-evolution"
          learning_objective_ref: "LO-WEB3-001"
          question: "Apa perbedaan paling mendasar antara Web2 dan Web3?"
          choices:
            - text: "Web3 lebih cepat dari Web2"
              correct: false
              feedback: "Kecepatan bukan perbedaan utama. Bahkan saat ini Web3 sering lebih lambat."
            - text: "Di Web3, pengguna memiliki dan mengontrol data serta aset digitalnya sendiri"
              correct: true
              feedback: "Tepat! Ownership dan kontrol oleh pengguna adalah pergeseran fundamental Web3."
            - text: "Web3 tidak membutuhkan internet"
              correct: false
              feedback: "Web3 tetap berjalan di atas internet — bedanya ada pada lapisan kepemilikan dan kepercayaan."

    - id: "lesson-01-02-web3-real-use-cases"
      title: "Use Case Nyata Web3 — Bukan Sekadar Hype"
      concepts:
        - "defi-overview"
        - "digital-ownership"
        - "transparent-governance"
        - "supply-chain-verification"
        - "digital-identity"
      learning_objectives:
        - id: "LO-WEB3-003"
          text: "Menyebutkan dan menjelaskan minimal 3 use case Web3 yang sudah berjalan di dunia nyata"
        - id: "LO-WEB3-004"
          text: "Membedakan antara hype/spekulasi dan aplikasi Web3 yang memberikan nilai nyata"
      learning_modes: [read, interact]
      estimated_minutes: 15
      content_blocks:
        - type: text
          body: |
            ## Web3 Sudah Digunakan di Dunia Nyata

            Banyak orang mengira Web3 hanya soal trading crypto atau membeli gambar mahal.
            Mari lihat apa yang **benar-benar sedang dibangun**:

            ### 1. Keuangan Terbuka (DeFi)
            **Masalah:** 1,4 miliar orang dewasa di dunia tidak punya akses ke bank.
            **Solusi Web3:** Protokol seperti Aave dan Uniswap memungkinkan siapa pun dengan
            internet untuk meminjam, menabung, atau bertukar aset — tanpa perlu KYC bank
            tradisional, tanpa jam operasional, tanpa batas negara.

            > Pada 2024, total nilai yang dikelola protokol DeFi mencapai $80+ miliar.
            > Ini bukan eksperimen kecil — ini sistem keuangan paralel yang sudah berjalan.

            ### 2. Kepemilikan Digital Nyata
            **Masalah:** Kamu "membeli" lagu di iTunes, tapi sebenarnya kamu hanya menyewa
            lisensi. Apple bisa mencabutnya kapan saja.
            **Solusi Web3:** Standar seperti ERC-721 memungkinkan kepemilikan digital yang
            benar-benar milikmu — bisa dijual, dipindahkan, atau digunakan di platform lain.

            ### 3. Transparansi Organisasi (DAO)
            **Masalah:** Donasi ke organisasi amal — tapi ke mana uangnya?
            **Solusi Web3:** DAO (Decentralized Autonomous Organization) memungkinkan organisasi
            di mana setiap keputusan keuangan tercatat di blockchain, bisa diaudit siapa saja.
            Contoh: Gitcoin telah mendistribusikan $50+ juta untuk proyek open source secara
            transparan.

            ### 4. Identitas Digital
            **Masalah:** Untuk membuktikan identitasmu, kamu harus menyerahkan data pribadi
            ke puluhan layanan berbeda.
            **Solusi Web3:** Dengan teknologi seperti Ethereum Name Service (ENS) dan verifiable
            credentials, kamu bisa membuktikan siapa dirimu tanpa menyerahkan data berlebihan.

            ### 5. Supply Chain & Verifikasi
            **Masalah:** Dari mana asal kopi yang kamu minum? Apakah obat ini asli?
            **Solusi Web3:** Perusahaan seperti VeChain dan IBM Food Trust menggunakan blockchain
            untuk melacak produk dari sumber hingga ke tangan konsumen.

        - type: callout
          variant: warning
          body: |
            ⚠️ **Reality Check:** Tidak semua proyek Web3 berguna. Banyak yang murni spekulasi.
            Sebagai builder, tugasmu adalah **membangun yang bermakna** — bukan ikut-ikutan hype.
            Tanda proyek hype: janji return tinggi, tidak ada produk nyata, fokus pada harga token.

        - type: interactive
          id: "sim-web3-use-case-sorter"
          description: |
            Aktivitas: drag-and-drop — pisahkan 8 proyek Web3 ke dalam kategori
            "Use Case Nyata" vs "Kemungkinan Hype". Dapatkan penjelasan untuk setiap jawaban.

        - type: quiz
          id: "checkpoint-web3-use-cases"
          learning_objective_ref: "LO-WEB3-003"
          question: "Manakah yang merupakan use case nyata Web3 yang sudah berjalan?"
          choices:
            - text: "Protokol DeFi yang memungkinkan pinjam-meminjam tanpa bank tradisional"
              correct: true
              feedback: "Benar! Aave dan Compound sudah memproses miliaran dolar pinjaman secara transparan."
            - text: "AI yang menggantikan semua pekerjaan manusia via blockchain"
              correct: false
              feedback: "Ini bukan use case Web3. AI dan blockchain adalah teknologi berbeda dengan tujuan berbeda."

    - id: "lesson-01-03-developer-role-in-web3"
      title: "Peran Developer di Web3 — Kenapa Ini Relevan Untukmu"
      concepts:
        - "web3-developer-roles"
        - "smart-contract-developer"
        - "dapp-developer"
        - "protocol-developer"
        - "security-researcher"
      learning_objectives:
        - id: "LO-WEB3-005"
          text: "Mendeskripsikan minimal 3 peran developer di ekosistem Web3"
        - id: "LO-WEB3-006"
          text: "Menjelaskan mengapa Web3 menjadi peluang karier yang relevan untuk developer"
      learning_modes: [read]
      estimated_minutes: 10
      content_blocks:
        - type: text
          body: |
            ## Kamu Bukan Sekadar "Coder" di Web3

            Di Web2, developer membangun fitur yang diputuskan oleh product manager.
            Di Web3, developer **membangun infrastruktur keuangan, sistem kepemilikan,
            dan aturan yang menggerakkan ekonomi digital**. Kode yang kamu tulis bisa
            mengelola jutaan dolar — secara langsung.

            ### Peran Developer di Web3

            | Peran | Apa yang Dikerjakan | Skill Utama |
            |-------|---------------------|-------------|
            | **Smart Contract Developer** | Menulis logika bisnis on-chain (aturan, pembayaran, kepemilikan) | Solidity, Vyper, Testing, Security |
            | **dApp Developer** | Membangun frontend yang berinteraksi dengan smart contract | React/Next.js, Ethers.js/Viem, Wallet Integration |
            | **Protocol Developer** | Merancang dan membangun protokol (DeFi, NFT, DAO) | Arsitektur sistem, Ekonomi token, Solidity advanced |
            | **Security Researcher / Auditor** | Menemukan kerentanan di smart contract sebelum diretas | Reverse engineering, Formal verification, Fuzzing |
            | **Infrastructure / Tooling** | Membangun tools untuk developer lain (SDK, indexer, node) | Go/Rust, Sistem terdistribusi, Networking |

            ### Kenapa Sekarang?

            - **Demand tinggi, supply rendah:** Per 2024, ada ~30.000 smart contract developer
              aktif di seluruh dunia — dibanding ~30 juta Web2 developer. Kompetisi jauh lebih rendah.
            - **Kompensasi premium:** Senior Solidity developer bisa mendapat $150K–$400K/tahun
              karena kelangkaan dan risiko tinggi dari kode yang mereka tulis.
            - **Remote-first:** Mayoritas tim Web3 bekerja secara remote dan global.
            - **Open source & meritocratic:** Kontribusimu bisa dilihat siapa saja di blockchain.

        - type: callout
          variant: info
          body: |
            💡 **Track Ethereum Developer di Onvora** dirancang untuk membawamu dari
            "baru tahu apa itu Web3" hingga "bisa membangun, menguji, dan men-deploy
            smart contract yang aman" — dengan bukti kemampuan nyata, bukan sekadar sertifikat.

        - type: quiz
          id: "checkpoint-developer-role"
          learning_objective_ref: "LO-WEB3-005"
          question: "Apa yang membuat peran smart contract developer berbeda dari developer Web2 biasa?"
          choices:
            - text: "Smart contract developer menggunakan bahasa pemrograman yang lebih sulit"
              correct: false
              feedback: "Solidity sebenarnya mirip JavaScript. Perbedaannya bukan di kesulitan bahasa."
            - text: "Kode smart contract langsung mengelola aset dan tidak bisa diubah setelah di-deploy"
              correct: true
              feedback: "Benar! Immutability dan pengelolaan aset langsung membuat peran ini unik dan berisiko tinggi."
            - text: "Smart contract developer tidak perlu menulis tes"
              correct: false
              feedback: "Justru sebaliknya! Testing di Web3 bahkan lebih kritis karena bug bisa berarti kehilangan dana nyata."

  interactive:
    - "sim-web-evolution-timeline"
    - "sim-web3-use-case-sorter"

  practice: []

  checkpoint: "checkpoint-unit-01-web3-overview"

  mini_project: null
  mini_project_skip_reason: "Unit konseptual awareness — fokus membangun mental model, belum ada komponen coding"

  common_mistakes:
    - mistake: "Menganggap Web3 = cryptocurrency / trading"
      correction: "Cryptocurrency adalah salah satu aplikasi Web3, bukan keseluruhannya. Web3 adalah paradigma internet baru dengan prinsip kepemilikan dan transparansi."
    - mistake: "Berpikir Web3 sudah menggantikan Web2"
      correction: "Web3 masih tahap awal. Sebagian besar internet masih Web2. Web3 menambah lapisan baru, bukan menggantikan."
    - mistake: "Mengira semua proyek crypto adalah Web3 yang baik"
      correction: "Banyak proyek crypto yang murni spekulasi. Kriteria Web3 yang bermakna: ada masalah nyata yang diselesaikan, ada produk yang bekerja, transparan."

  security:
    - risk: "Terjebak scam proyek crypto yang mengaku 'Web3'"
      why_it_matters: "Sebagai pemula, kamu target utama scam yang menjanjikan keuntungan instan"
      practice: "Selalu riset proyek sebelum terlibat: cek tim, kode (open source?), audit, dan track record"
      mitigation: "Di Onvora, kamu belajar di lingkungan simulasi — tidak perlu uang nyata atau wallet"

  evidence:
    - type: "knowledge_assessment"
      description: "Checkpoint: Web3 Overview Comprehension"

  skills:
    - "blockchain-fundamentals"

  estimated_time_minutes: 40
  author: "Onvora Content Team"
  technical_reviewer: ""
  curriculum_reviewer: ""
  security_reviewer: ""
  review_date: ""
  version: 1
  deprecated: false
```
