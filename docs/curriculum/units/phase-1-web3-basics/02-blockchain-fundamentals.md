# Unit: Blockchain Fundamentals

```yaml
unit:
  id: "web3-basics-02-blockchain-fundamentals"
  title: "Blockchain Fundamentals — Bagaimana Ribuan Komputer Sepakat Tanpa Saling Percaya"
  track: "ethereum-developer"
  phase: "phase-1-understand"
  knowledge_scope: core
  chain_adapter: null
  target_level: beginner

  why: |
    Blockchain adalah fondasi dari seluruh Web3. Sebelum kamu bisa membangun apa pun,
    kamu harus paham cara kerja internalnya — bukan sekadar "database terdesentralisasi",
    tapi benar-benar bagaimana data disimpan, divalidasi, dan dijaga integritasnya
    oleh ribuan komputer yang tidak saling percaya.

  target: |
    Pemula total yang ingin memahami blockchain dari nol, atau developer Web2
    yang sering mendengar istilah blockchain tapi belum pernah memahami mekanismenya.

  prerequisites:
    - "web3-basics-01-web3-overview"

  outcomes:
    - "Menjelaskan apa itu blockchain dan mengapa disebut 'rantai blok'"
    - "Mendeskripsikan peran hash function dalam menjaga integritas data"
    - "Menjelaskan bagaimana block baru ditambahkan ke chain"
    - "Membedakan centralized database, distributed database, dan blockchain"
    - "Mendeskripsikan konsep immutability dan mengapa itu penting"

  lessons:
    - id: "lesson-02-01-what-is-blockchain"
      title: "Apa Itu Blockchain — Penjelasan Tanpa Jargon"
      concepts:
        - "block"
        - "chain"
        - "distributed-ledger"
        - "immutability"
      learning_objectives:
        - id: "LO-BC-001"
          text: "Menjelaskan apa itu blockchain menggunakan analogi yang mudah dipahami"
        - id: "LO-BC-002"
          text: "Mendeskripsikan struktur dasar sebuah block"
      learning_modes: [read, interact]
      estimated_minutes: 15
      content_blocks:
        - type: text
          body: |
            ## Blockchain = Buku Kas yang Tidak Bisa Dicoret

            Bayangkan kamu dan 100 orang lain punya **salinan buku kas yang sama**.
            Setiap kali ada transaksi baru:
            1. Transaksi diumumkan ke semua orang
            2. Semua orang memverifikasi: "Apakah pengirim punya cukup saldo?"
            3. Jika valid, transaksi ditulis di **halaman baru** (= block)
            4. Halaman itu ditandatangani dan dirantai ke halaman sebelumnya
            5. **Tidak ada yang bisa menghapus atau mengubah halaman yang sudah ditulis**

            Itulah blockchain: **buku kas digital yang disalin ke ribuan komputer,
            di mana setiap halaman baru dirantai ke halaman sebelumnya, dan tidak ada
            satu pihak pun yang bisa mengubah catatan lama**.

            ## Anatomi Sebuah Block

            Setiap block berisi:

            ```
            ┌─────────────────────────────────────┐
            │ Block #1247                          │
            ├─────────────────────────────────────┤
            │ Previous Hash: 0x7f3a...            │  ← Link ke block sebelumnya
            │ Timestamp: 2024-10-08 14:32:01      │
            │ Transactions:                        │
            │   - Alice → Bob: 0.5 ETH            │
            │   - Charlie → Diana: 1.2 ETH        │
            │   - Eve → Frank: 0.05 ETH           │
            │ Nonce: 48291                         │
            │ Hash: 0x9c2d...                      │  ← "Sidik jari" block ini
            └─────────────────────────────────────┘
            ```

            **Previous Hash** inilah yang membuat blockchain jadi "rantai". Jika seseorang
            mengubah satu transaksi di Block #1245, hash-nya berubah, yang mengubah
            previous hash di Block #1246, yang mengubah hash-nya, dan seterusnya — hingga
            seluruh chain berantakan. **Inilah yang membuat blockchain (hampir) mustahil
            untuk dimanipulasi.**

        - type: interactive
          id: "sim-block-structure"
          description: |
            Simulasi interaktif: lihat struktur sebuah block. Coba ubah satu karakter
            di data transaksi dan perhatikan bagaimana hash berubah total (avalanche effect).

        - type: quiz
          id: "checkpoint-block-anatomy"
          learning_objective_ref: "LO-BC-002"
          question: "Apa fungsi 'Previous Hash' dalam sebuah block?"
          choices:
            - text: "Menyimpan password block sebelumnya"
              correct: false
              feedback: "Hash bukan password. Hash adalah sidik jari unik yang merepresentasikan seluruh isi block."
            - text: "Menghubungkan block saat ini ke block sebelumnya, sehingga perubahan pada block lama terdeteksi"
              correct: true
              feedback: "Benar! Inilah yang membuat blockchain menjadi 'rantai' yang tamper-evident."
            - text: "Mempercepat proses pencarian data"
              correct: false
              feedback: "Bukan untuk kecepatan. Fungsi utamanya adalah menjaga integritas data antar block."

    - id: "lesson-02-02-hash-function"
      title: "Hash Function — Sidik Jari Digital"
      concepts:
        - "hash-function"
        - "sha256"
        - "deterministic"
        - "one-way-function"
        - "collision-resistance"
        - "avalanche-effect"
      learning_objectives:
        - id: "LO-BC-003"
          text: "Menjelaskan apa itu hash function dan 4 properti utamanya"
        - id: "LO-BC-004"
          text: "Mendemonstrasikan avalanche effect pada hash function"
      learning_modes: [read, interact]
      estimated_minutes: 15
      content_blocks:
        - type: text
          body: |
            ## Hash Function = Mesin Sidik Jari

            Hash function mengambil input apa pun (teks, file, gambar) dan menghasilkan
            output tetap yang disebut **hash** atau **digest**.

            ```
            Input: "Hello"        → Hash: 2cf24dba5fb0a30e...
            Input: "Hello!"       → Hash: 334d016f755cd6dc...
            Input: [file 4GB]     → Hash: a1b2c3d4e5f6a7b8...
            ```

            ### 4 Properti Utama Hash Function

            | Properti | Artinya | Analogi |
            |----------|---------|---------|
            | **Deterministic** | Input yang sama selalu menghasilkan hash yang sama | Sidik jari orang yang sama selalu cocok |
            | **One-way** | Dari hash, kamu tidak bisa menebak inputnya | Kamu tidak bisa merekonstruksi wajah dari sidik jari |
            | **Avalanche Effect** | Perubahan 1 karakter mengubah hash secara drastis | Menggeser 1 huruf di nama → sidik jari berubah total |
            | **Collision Resistant** | (Hampir) mustahil dua input berbeda menghasilkan hash yang sama | Tidak ada 2 orang punya sidik jari identik |

            ### Kenapa Blockchain Butuh Hash?

            1. **Integritas data:** Setiap block punya hash. Jika data berubah, hash berubah.
            2. **Linking:** Previous hash menghubungkan block, membuat rantai.
            3. **Mining/Consensus:** Menemukan hash dengan pola tertentu membutuhkan komputasi.
            4. **Identitas:** Address wallet diturunkan dari hash public key.

        - type: interactive
          id: "sim-hash-playground"
          description: |
            Hash Playground: ketik apa saja di input box dan lihat hash SHA-256
            yang dihasilkan secara real-time. Perhatikan bagaimana mengubah 1 huruf saja
            menghasilkan hash yang sama sekali berbeda (avalanche effect).

        - type: callout
          variant: info
          body: |
            💡 **Fun Fact:** Ethereum dan Bitcoin menggunakan hash function dari keluarga
            Keccak (Keccak-256 untuk Ethereum, SHA-256 untuk Bitcoin). Keduanya menghasilkan
            hash sepanjang 256 bit — itu artinya ada 2^256 kemungkinan hash, lebih banyak
            dari jumlah atom di alam semesta yang bisa diamati.

        - type: quiz
          id: "checkpoint-hash-function"
          learning_objective_ref: "LO-BC-003"
          question: "Apa yang terjadi jika kamu mengubah satu huruf dalam input hash function?"
          choices:
            - text: "Hash-nya berubah sedikit di bagian yang terkena perubahan"
              correct: false
              feedback: "Bukan! Karena avalanche effect, seluruh hash berubah drastis — bukan hanya bagian kecil."
            - text: "Hash-nya berubah secara total dan tidak bisa diprediksi"
              correct: true
              feedback: "Benar! Ini disebut avalanche effect — perubahan sekecil apa pun menghasilkan hash yang sama sekali berbeda."
            - text: "Hash-nya tetap sama karena perubahan terlalu kecil"
              correct: false
              feedback: "Salah. Hash function sangat sensitif — bahkan perubahan 1 bit mengubah seluruh output."

    - id: "lesson-02-03-blockchain-vs-database"
      title: "Blockchain vs Database Tradisional"
      concepts:
        - "centralized-database"
        - "distributed-database"
        - "decentralized-ledger"
        - "trust-model"
        - "trade-offs"
      learning_objectives:
        - id: "LO-BC-005"
          text: "Membedakan centralized database, distributed database, dan blockchain"
        - id: "LO-BC-006"
          text: "Mengidentifikasi kapan blockchain tepat dan kapan tidak tepat digunakan"
      learning_modes: [read, interact]
      estimated_minutes: 12
      content_blocks:
        - type: text
          body: |
            ## Bukan Sekadar Database

            Banyak orang bertanya: "Kenapa tidak pakai database biasa saja?"
            Pertanyaan bagus. Jawabannya: **blockchain bukan selalu lebih baik — tapi
            tepat untuk masalah tertentu**.

            | Aspek | Centralized DB | Distributed DB | Blockchain |
            |-------|---------------|----------------|------------|
            | **Siapa kontrol** | Satu entitas (perusahaan) | Satu entitas, banyak server | Tidak ada satu pun |
            | **Kepercayaan** | Percaya pada operator | Percaya pada operator | Tidak perlu percaya siapa pun |
            | **Modifikasi data** | Admin bisa ubah apa saja | Admin bisa ubah apa saja | Data yang sudah masuk (hampir) tidak bisa diubah |
            | **Kecepatan** | Sangat cepat (ms) | Cepat (ms) | Lambat (detik–menit) |
            | **Biaya** | Murah | Sedang | Mahal (gas fees) |
            | **Transparansi** | Tertutup | Tertutup | Terbuka (publik) |
            | **Cocok untuk** | Mayoritas aplikasi | Aplikasi skala besar | Aset, kepemilikan, transaksi tanpa perantara |

            ### Kapan Blockchain TEPAT?
            ✅ Butuh transparansi publik (keuangan, voting, supply chain)
            ✅ Tidak ada satu pihak yang bisa dipercaya semua orang
            ✅ Data harus immutable (tidak boleh diubah retroaktif)
            ✅ Melibatkan transfer nilai/aset digital

            ### Kapan Blockchain TIDAK TEPAT?
            ❌ Data perlu sering diubah/dihapus (GDPR compliance)
            ❌ Kecepatan adalah prioritas utama
            ❌ Semua pihak sudah saling percaya
            ❌ Volume data sangat besar (blockchain lambat dan mahal untuk storage)

        - type: interactive
          id: "sim-blockchain-vs-db-decision-tree"
          description: |
            Decision tree interaktif: jawab 5 pertanyaan tentang use case yang kamu
            bayangkan, dan sistem akan merekomendasikan apakah blockchain tepat atau
            database tradisional lebih cocok.

        - type: quiz
          id: "checkpoint-blockchain-vs-db"
          learning_objective_ref: "LO-BC-006"
          question: "Manakah skenario yang PALING tepat menggunakan blockchain?"
          choices:
            - text: "Sistem internal HR perusahaan untuk menyimpan data karyawan"
              correct: false
              feedback: "Data HR bersifat privat dan sering berubah. Database tradisional jauh lebih cocok."
            - text: "Sistem pencatatan kepemilikan tanah yang transparan dan anti-manipulasi"
              correct: true
              feedback: "Benar! Catatan kepemilikan butuh transparansi, immutability, dan tidak ada satu pihak yang boleh memanipulasi data."
            - text: "Platform streaming video untuk menonton film"
              correct: false
              feedback: "Streaming membutuhkan kecepatan tinggi dan volume data besar — blockchain terlalu lambat dan mahal untuk ini."

  interactive:
    - "sim-block-structure"
    - "sim-hash-playground"
    - "sim-blockchain-vs-db-decision-tree"

  practice: []

  checkpoint: "checkpoint-unit-02-blockchain-fundamentals"

  mini_project: null
  mini_project_skip_reason: "Unit konseptual — fokus membangun pemahaman fundamental. Hands-on dimulai di Phase 2."

  common_mistakes:
    - mistake: "Menganggap blockchain = Bitcoin"
      correction: "Bitcoin adalah salah satu implementasi blockchain. Ada banyak blockchain lain (Ethereum, Solana, Polygon) dengan tujuan berbeda."
    - mistake: "Berpikir blockchain tidak bisa diretas"
      correction: "Blockchain sangat sulit untuk dimanipulasi, tapi bukan mustahil. Smart contract bisa punya bug, dan 51% attack secara teori mungkin pada chain kecil."
    - mistake: "Mengira semua data di blockchain bersifat rahasia karena 'kripto'"
      correction: "Sebaliknya! Blockchain publik sepenuhnya transparan. Semua orang bisa melihat semua transaksi. 'Crypto' merujuk pada cryptography (pengamanan), bukan kerahasiaan."

  security:
    - risk: "Mempercayai klaim 'unhackable' dari proyek blockchain"
      why_it_matters: "Banyak proyek mengklaim blockchain mereka tidak bisa diretas — ini menyesatkan"
      practice: "Selalu bedakan antara keamanan protokol blockchain vs keamanan aplikasi yang berjalan di atasnya"
      mitigation: "Smart contract bisa punya bug meskipun blockchain-nya aman. Itulah kenapa security audit penting."

  evidence:
    - type: "knowledge_assessment"
      description: "Checkpoint: Blockchain Fundamentals Comprehension"

  skills:
    - "blockchain-fundamentals"

  estimated_time_minutes: 42
  author: "Onvora Content Team"
  technical_reviewer: ""
  curriculum_reviewer: ""
  security_reviewer: ""
  review_date: ""
  version: 1
  deprecated: false
```
