# Unit: EVM Architecture & Data Areas

```yaml
unit:
  id: "eth-fund-03-evm-architecture"
  title: "EVM Architecture & Data Areas — Stack, Memory, Storage, dan Calldata"
  track: "ethereum-developer"
  phase: "phase-1-ethereum-fundamentals"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: beginner

  why: |
    Solidity hanyalah lapisan abstraksi sintaks tingkat tinggi; pada akhirnya, seluruh kontrak
    dieksekusi sebagai bytecode mesin di Ethereum Virtual Machine (EVM). Memahami bagaimana
    EVM mengelola Stack, Memory, Storage, dan Calldata adalah kunci utama untuk menulis
    kontrak yang hemat gas (*gas-optimized*) dan terhindar dari bug fatal seperti *storage collision*
    atau *stack too deep*.

  target: |
    Developer yang ingin mendalami arsitektur internal virtual machine, representasi memori,
    dan alokasi penyimpanan state terdesentralisasi.

  prerequisites:
    - "eth-fund-01-accounts-and-keys"
    - "eth-fund-02-gas-and-eip1559"

  outcomes:
    - "Menjelaskan arsitektur EVM sebagai 256-bit word size stack-based virtual machine"
    - "Membandingkan karakteristik dan biaya gas dari 4 area data: Stack, Memory, Storage, Calldata"
    - "Menganalisis rumus quadratic gas cost pada Memory expansion"
    - "Menjelaskan konsep slot storage 32-byte dan mekanisme hashing Keccak-256 untuk pemetaan variabel"

  lessons:
    - id: "lesson-eth-fund-03-01-evm-internals"
      title: "Anatomi Eksekusi EVM: Mesin Stack 256-Bit"
      concepts:
        - "stack-machine-architecture"
        - "256-bit-words"
        - "four-data-areas"
        - "storage-vs-memory-gas"
      learning_objectives:
        - id: "LO-EVM-ARCH-001"
          text: "Mendeskripsikan cara kerja stack machine 1024-elemen EVM"
        - id: "LO-EVM-ARCH-002"
          text: "Membedakan alokasi data sementara vs data persisten di smart contract"
      learning_modes: [read, interact]
      estimated_minutes: 30
      content_blocks:
        - type: text
          body: |
            ## Mengenal Ethereum Virtual Machine (EVM)

            EVM adalah mesin virtual berbasis **Stack** dengan ukuran kata dasar **256-bit (32 byte)**,
            yang dirancang khusus agar serasi dengan algoritma hashing Keccak-256 dan kriptografi kurva eliptik.
            EVM tidak menggunakan register CPU konvensional, melainkan mengoperasikan instruksi
            melalui manipulasi puncak tumpukan (*Last-In, First-Out*).

            ### 4 Kompartemen Data EVM

            Ketika sebuah smart contract dipanggil, EVM menyediakan 4 area memori terpisah:

            ```
            +-------------------------------------------------------------------------+
            |                        CALL FRAME EKSEKUSI EVM                         |
            +-------------------------------------------------------------------------+
            | 1. STACK       | 1024 slot kedalaman, 256-bit per item, sangat cepat    |
            | 2. CALLDATA    | Read-only byte array, berisi parameter calldata fungsi  |
            | 3. MEMORY      | Byte-addressable, sementara (volatile), expansi kuadrat|
            | 4. STORAGE     | Persisten on-chain, 2^256 slot x 32-byte, sangat mahal  |
            +-------------------------------------------------------------------------+
            ```

            | Karakteristik | Stack | Memory | Storage | Calldata |
            |---|---|---|---|---|
            | **Persistensi** | Sementara (per call) | Sementara (per call) | **Permanen on-chain** | Sementara (per call) |
            | **Sifat Akses** | Read/Write (LIFO) | Read/Write (Linear) | Read/Write (Key-Value) | **Read-Only** |
            | **Kapasitas** | Maks 1024 item | Fleksibel (Dynamic) | $2^{256}$ slot $\times$ 32B | Ukuran input payload |
            | **Biaya Gas** | Sangat Murah (3 gas) | Murah + Kuadratik | **Sangat Mahal (2.1k–20k)** | Paling hemat (16 gas/byte) |

            ### Memory Expansion Quadratic Gas Formula

            Memori EVM diinisialisasi kosong pada awal setiap panggilan fungsi. Membaca atau menulis
            ke indeks memori yang lebih tinggi memperluas ukuran memori dalam kelipatan 32 byte.
            Biaya gas ekspansi memori mengikuti rumus kuadratik:

            $$C_{\text{mem}}(a) = 3 \times a + \left\lfloor \frac{a^2}{512} \right\rfloor$$

            *(di mana $a$ adalah jumlah kata 32-byte yang dialokasikan)*.
            Ini artinya: mengalokasikan array memori yang terlampau besar akan membuat gas melonjak secara eksponensial!

        - type: callout
          variant: warning
          body: |
            ⚠️ **Stack Too Deep Error:**
            Karena EVM hanya mampu mengakses secara langsung hingga 16 elemen teratas dari stack
            (opcode `SWAP1` hingga `SWAP16`, `DUP1` hingga `DUP16`), fungsi Solidity dengan terlalu banyak
            variabel lokal akan memicu kompilator error: *"Stack too deep"*.
            Solusinya adalah membungkus variabel ke dalam `struct` atau memecah fungsi menjadi sub-fungsi.

        - type: interactive
          id: "sim-evm-stack-stepper"
          description: |
            Simulator Step-by-Step Opcode EVM: Jalankan instruksi PUSH1, PUSH1, ADD, SSTORE dan
            lihat perubahan elemen stack, memory pointer, dan slot storage secara visual real-time.

        - type: quiz
          id: "checkpoint-evm-data-areas"
          learning_objective_ref: "LO-EVM-ARCH-002"
          question: "Mengapa parameter array string fungsi eksternal lebih disarankan memakai 'calldata' daripada 'memory' di Solidity?"
          choices:
            - text: "Karena 'calldata' dapat dimodifikasi di dalam fungsi sedangkan 'memory' tidak"
              correct: false
            - text: "Karena 'calldata' langsung membaca byte input transaksi tanpa menyalin ke memori sementara, sehingga jauh lebih hemat gas"
              correct: true
            - text: "Karena 'calldata' otomatis disimpan permanen ke dalam blockchain storage"
              correct: false
            - text: "Karena 'calldata' memperbolehkan penulisan rekursif tak terbatas"
              correct: false
          explanation: |
            Menggunakan modifier `calldata` menghindari alokasi dan penyalinan data ke `memory`
            EVM, menghemat ribuan gas komputasi terutama untuk data dinamis berukuran besar (strings, arrays).

  interactive:
    - "sim-evm-stack-stepper"

  practice:
    - "exercise-trace-opcode-stack"

  checkpoint: "checkpoint-evm-data-areas"
  mini_project: null

  common_mistakes:
    - mistake: "Menganggap variabel 'memory' tetap tersimpan setelah transaksi selesai"
      correction: "Seluruh isi Memory dan Stack otomatis terhapus saat eksekusi panggilan fungsi berakhir. Hanya Storage yang bertahan selamanya di blockchain."
    - mistake: "Menyimpan data besar yang jarang dipakai ke dalam Storage"
      correction: "Storage adalah komponen termahal di Ethereum. Gunakan event logs atau IPFS jika data tidak dibutuhkan oleh logika on-chain."

  security:
    - risk: "Storage Collision pada Proxy Contracts"
      why_it_matters: "Dalam kontrak upgradeable dengan delegatecall, jika layout slot variabel storage berbenturan, variabel kritis seperti owner atau balance dapat tertimpa secara tidak sengaja oleh attacker."
      practice: "Gunakan deterministic storage namespace pattern (ERC-7201) untuk pola kontrak proxy modern."
      mitigation: "Patuhi urutan deklarasi variabel warisan dan hindari modifikasi urutan slot yang telah dideploy."

  evidence:
    - type: "checkpoint-passed"
      level: 1
      description: "Menguasai arsitektur stack EVM, 4 area data, dan biaya ekspansi memori"

  skills:
    - "evm-architecture"
    - "gas-optimization-storage"

  estimated_time_minutes: 60
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
