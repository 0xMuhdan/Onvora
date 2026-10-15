# Unit: Types, Storage Packing & Transient Storage

```yaml
unit:
  id: "sol-core-01-types-and-storage-layout"
  title: "Types, Storage Packing & Transient Storage — Optimasi Slot Solidity 0.8.20+"
  track: "ethereum-developer"
  phase: "phase-3-solidity-foundations"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: developing

  why: |
    Di Solidity, penulisan urutan variabel state secara sembarangan dapat menggandakan biaya gas
    secara dramatis. Memahami aturan 32-byte storage slot packing, perbedaan value types vs reference
    types, serta fitur mutakhir Transient Storage (EIP-1153) adalah pembeda utama antara developer
    pemula dan engineer smart contract tingkat produksi.

  target: |
    Developer yang telah memahami arsitektur dasar EVM dan ingin menguasai teknik alokasi tipe data
    dan optimasi slot penyimpanan on-chain di Solidity versi modern.

  prerequisites:
    - "eth-fund-03-evm-architecture"

  outcomes:
    - "Mengklasifikasikan tipe data Solidity: Value types (uint, address, bool) vs Reference types (bytes, string, struct, mapping)"
    - "Menerapkan teknik Storage Slot Packing untuk memadatkan beberapa variabel kecil ke dalam 1 slot 32-byte"
    - "Menganalisis perbedaan konsumsi gas antara SSTORE standar (20,000 gas) vs TSTORE Transient Storage (100 gas)"
    - "Menghitung indeks slot storage untuk variabel tetap dan pemetaan mapping hash"

  lessons:
    - id: "lesson-sol-core-01-01-storage-packing"
      title: "Aturan 32-Byte Slot Packing dan Optimasi Gas"
      concepts:
        - "solidity-primitive-types"
        - "storage-slot-packing"
        - "gas-cost-sstore"
        - "eip-1153-transient-storage"
      learning_objectives:
        - id: "LO-SOL-TYPE-001"
          text: "Menyusun deklarasi variabel state agar muat dalam jumlah slot sesedikit mungkin"
        - id: "LO-SOL-TYPE-002"
          text: "Menggunakan transient storage untuk variabel sementara intra-transaksi"
      learning_modes: [read, code, interact]
      estimated_minutes: 30
      content_blocks:
        - type: text
          body: |
            ## Bagaimana Solidity Menyimpan Variabel State?

            Penyimpanan permanen (*storage*) di Ethereum terdiri dari slot bernomor $0, 1, 2, \dots, 2^{256}-1$,
            masing-masing berkapasitas **tepat 32 byte (256 bit)**.

            Kompilator Solidity mengemas variabel state secara berurutan dari slot 0 ke atas. Jika ukuran
            variabel berikutnya ditambah variabel saat ini masih $\le 32$ byte, kompilator akan memadatkan
            keduanya ke dalam **slot yang sama** (*storage packing*). Namun jika melebihi 32 byte, variabel baru
            akan dialokasikan ke slot berikutnya!

            ### Contoh Buruk vs Contoh Teroptimasi:

            ```solidity
            // BURUK: Membutuhkan 3 slot storage terpisah (Boros Gas)
            contract BadLayout {
                uint128 public a; // Slot 0 (menggunakan 16 byte, 16 byte kosong)
                uint256 public b; // Slot 1 (karena uint256 butuh 32 byte penuh, pindah ke slot baru)
                uint128 public c; // Slot 2 (menggunakan 16 byte di slot baru)
            }

            // OPTIMAL: Membutuhkan HANYA 2 slot storage (Hemat 20,000 gas SSTORE!)
            contract GoodLayout {
                uint128 public a; // Slot 0 (16 byte)
                uint128 public c; // Slot 0 (16 byte) -> Dikemas bersama 'a' menjadi tepat 32 byte!
                uint256 public b; // Slot 1 (32 byte)
            }
            ```

            ### Ukuran Tipe Primitif di Solidity:
            - `bool`: 1 byte (8 bit)
            - `address`: 20 byte (160 bit)
            - `uint8` s/d `uint256`: kelipatan 8 bit ($N/8$ byte)
            - `bytes1` s/d `bytes32`: $1$ s/d $32$ byte

            ### Inovasi Modern: Transient Storage (EIP-1153 / Cancun Hardfork)
            Mulai Solidity 0.8.24 dan EVM Cancun, hadir opcode `TSTORE` dan `TLOAD`:
            - Berfungsi menyimpan data selama durasi transaksi, lalu otomatis terhapus saat transaksi selesai.
            - Biaya hanya **100 gas**, jauh lebih murah dibandingkan `SSTORE` (2,100–20,000 gas).
            - Sangat ideal untuk status `ReentrancyGuard` dan manipulasi flash loan intra-call!

        - type: callout
          variant: info
          body: |
            💡 **Catatan Penting Memory vs Storage Packing:**
            Storage packing **HANYA** berlaku untuk *state variables* di storage. Variabel lokal di dalam fungsi
            yang berada di **Memory** TIDAK dipadatkan (setiap item memori selalu memakan minimal 32 byte penuh).

        - type: interactive
          id: "sim-solidity-slot-packer"
          description: |
            Interactive Slot Visualizer: Seret dan atur ulang deklarasi variabel uint128, bool, address,
            dan uint256. Lihat visualisasi 32-byte slot box terisi dan kalkulasi penghematan gas secara langsung!

        - type: quiz
          id: "checkpoint-solidity-packing"
          learning_objective_ref: "LO-SOL-TYPE-001"
          question: "Berapa banyak slot storage 32-byte yang dipakai oleh kontrak dengan urutan variabel: address owner; bool active; uint8 count; uint256 totalSupply;?"
          choices:
            - text: "4 slot, karena ada 4 variabel"
              correct: false
            - text: "2 slot, karena owner (20B), active (1B), dan count (1B) totalnya 22B (muat di slot 0), lalu totalSupply di slot 1"
              correct: true
            - text: "1 slot, karena semua variabel dipadatkan secara otomatis oleh kompilator"
              correct: false
            - text: "3 slot, karena boolean selalu membutuhkan slot tersendiri"
              correct: false
          explanation: |
            Ukuran: address (20 byte) + bool (1 byte) + uint8 (1 byte) = 22 byte. Karena 22 <= 32,
            ketiganya muat di dalam Slot 0. Variabel totalSupply (uint256 = 32 byte) tidak muat di sisa
            10 byte slot 0, sehingga ditempatkan di Slot 1. Total = 2 slot.

  interactive:
    - "sim-solidity-slot-packer"

  practice:
    - "exercise-pack-state-variables"

  checkpoint: "checkpoint-solidity-packing"
  mini_project: null

  common_mistakes:
    - mistake: "Menggunakan uint8 untuk variabel lokal di dalam fungsi dengan tujuan hemat gas"
      correction: "Di dalam memory/stack fungsi, uint8 justru memerlukan masking opcode tambahan (JUMP/AND) yang membuat gas lebih boros daripada uint256 native EVM."
    - mistake: "Mengasumsikan mapping dan dynamic array disimpan berurutan di slot berikutnya"
      correction: "Mapping dan dynamic array hanya menggunakan slot dasar untuk menyimpan panjang/keberadaannya, sedangkan data elemennya tersebar di slot Keccak-256."

  security:
    - risk: "Unintended Overwrites akibat Slot Packing yang Salah di Assembly"
      why_it_matters: "Jika menulis ke slot packed menggunakan inline Yul assembly tanpa bitwise shift yang tepat, Anda dapat merusak variabel tetangga di slot yang sama."
      practice: "Hindari manipulasi assembly langsung pada slot packed kecuali menggunakan mask bitwise yang tervalidasi."
      mitigation: "Gunakan getter dan setter Solidity murni untuk variabel packed."

  evidence:
    - type: "checkpoint-passed"
      level: 2
      description: "Memahami tipe data Solidity, optimasi 32-byte slot layout, dan transient storage"

  skills:
    - "solidity-types"
    - "storage-packing"
    - "eip-1153"

  estimated_time_minutes: 60
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
