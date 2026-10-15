# Unit: Gas Mechanics and EIP-1559 Economics

```yaml
unit:
  id: "eth-fund-02-gas-and-eip1559"
  title: "Gas Mechanics and EIP-1559 Economics — Komputasi, Biaya, dan Burn Rate"
  track: "ethereum-developer"
  phase: "phase-1-ethereum-fundamentals"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: beginner

  why: |
    Gas adalah mekanisme pencegahan serangan denial-of-service (Turing completeness protection)
    dan penentu prioritas komputasi di Ethereum. Tanpa pemahaman mendalam tentang kalkulasi Gas,
    EIP-1559 fee markets, dan konsumsi opcode, developer tidak akan mampu merancang smart contract
    yang efisien secara biaya dan aman dari kehabisan gas (out-of-gas reverts).

  target: |
    Developer yang ingin memahami aspek ekonomi komputasi EVM, struktur biaya transaksi modern,
    dan cara menghitung biaya gas secara akurat.

  prerequisites:
    - "eth-fund-01-accounts-and-keys"

  outcomes:
    - "Menjelaskan konsep Gas sebagai satuan komputasi independen terhadap harga fiat ETH"
    - "Menghitung total biaya transaksi menggunakan formula EIP-1559 (Base Fee + Priority Fee)"
    - "Menganalisis mekanisme penyesuaian otomatis Base Fee (target 15M gas vs max 30M gas)"
    - "Memahami konsekuensi Out-of-Gas revert terhadap state change dan saldo pengirim"

  lessons:
    - id: "lesson-eth-fund-02-01-eip1559-structure"
      title: "Mekanisme Pasar Biaya: Dari First-Price Auction ke EIP-1559"
      concepts:
        - "gas-units-vs-gwei"
        - "eip-1559-base-fee"
        - "priority-fee-tip"
        - "max-fee-per-gas"
        - "gas-burning"
      learning_objectives:
        - id: "LO-ETH-GAS-001"
          text: "Mendeskripsikan perbedaan gas units dan harga per gas dalam Gwei"
        - id: "LO-ETH-GAS-002"
          text: "Menghitung biaya transaksi nyata dengan formula EIP-1559"
      learning_modes: [read, interact]
      estimated_minutes: 25
      content_blocks:
        - type: text
          body: |
            ## Mengapa Ethereum Membutuhkan Gas?

            Karena EVM bersifat *Turing-complete*, kode program secara teoritis dapat memuat
            *infinite loop* yang bisa membekukan seluruh node validator di dunia.
            Untuk mencegah hal tersebut, setiap instruksi opcode memiliki biaya terukur berupa **Gas Units**.
            Jika bahan bakar (Gas) habis sebelum eksekusi selesai, transaksi dibatalkan (*revert*),
            tetapi gas yang telah terbakar tetap dibayarkan ke jaringan!

            ### Struktur Transaksi EIP-1559 (Type-2 Transactions)

            Sebelum upgrade London (EIP-1559), Ethereum menggunakan lelang harga buta (*First-Price Auction*).
            Kini, arsitektur fee dipecah menjadi komponen deterministik:

            $$\text{Total Fee} = \text{Gas Used} \times (\text{Base Fee} + \min(\text{Priority Fee}, \text{Max Fee} - \text{Base Fee}))$$

            1. **`Base Fee`**:
               - Dihitung secara otomatis oleh protokol per blok.
               - Mengikuti utilisasi blok: jika blok terisi > 15M gas (target 50%), Base Fee naik maks 12.5%.
                 Jika < 15M gas, Base Fee turun maks 12.5%.
               - **Seluruh Base Fee DIBARANGKAN (BURNED)** — mengurangi pasokan ETH yang beredar!
            2. **`Max Priority Fee per Gas` (Tip)**:
               - Insentif tambahan yang dibayarkan langsung kepada validator (*block proposer*)
                 agar transaksi diprioritaskan masuk ke blok.
            3. **`Max Fee per Gas`**:
               - Batas tertinggi absolut yang rela dibayar oleh pengirim transaksi.
               - Selisih antara `Max Fee` dan `(Base Fee + Tip)` akan **dikembalikan (refund)** ke dompet pengirim.

            ### Satuan Unit di Ethereum

            | Satuan | Nilai dalam Wei | Penggunaan Umum |
            |---|---|---|
            | **Wei** | $1 \text{ Wei}$ | Satuan terkecil komputasi internal EVM |
            | **Gwei** (Gigawei) | $10^9 \text{ Wei}$ ($0.000000001 \text{ ETH}$) | Standar penetapan harga gas (mis. 20 Gwei) |
            | **Ether** (ETH) | $10^{18} \text{ Wei}$ | Nilai mata uang utama pengguna |

        - type: callout
          variant: info
          body: |
            💡 **Gas Limit Dasar:**
            Transfer ETH sederhana antar dua EOA membutuhkan tepat **21,000 gas**.
            Interaksi smart contract membutuhkan gas bervariasi bergantung pada operasi:
            - Penyimpanan storage baru (`SSTORE` dari 0 ke non-zero): 20,000 gas.
            - Operasi pembacaan storage (`SLOAD` cold read): 2,100 gas.
            - Operasi penambahan dasar (`ADD`): 3 gas.

        - type: interactive
          id: "sim-eip1559-calculator"
          description: |
            Simulator Kalkulator EIP-1559: Atur Base Fee saat ini, atur Priority Fee tip Anda, dan
            simulasikan apakah transaksi Anda berhasil dimasukkan ke blok berikutnya beserta kalkulasi
            pengembalian ETH sisa gas.

        - type: quiz
          id: "checkpoint-eip1559-fee"
          learning_objective_ref: "LO-ETH-GAS-002"
          question: "Apa yang terjadi dengan Base Fee yang dibayarkan pengguna dalam transaksi EIP-1559?"
          choices:
            - text: "Diberikan seluruhnya kepada validator yang memvalidasi blok"
              correct: false
            - text: "Dihanguskan (burned) secara permanen dari peredaran oleh protokol"
              correct: true
            - text: "Disimpan di treasury Ethereum Foundation untuk mendanai riset"
              correct: false
            - text: "Dibagikan secara merata kepada semua staker di jaringan"
              correct: false
          explanation: |
            EIP-1559 membakar (burn) 100% dari Base Fee untuk mencegah validator memanipulasi
            pasar biaya dengan membuat transaksi palsu untuk menaikkan harga lelang.

  interactive:
    - "sim-eip1559-calculator"

  practice:
    - "exercise-estimate-gas-costs"

  checkpoint: "checkpoint-eip1559-fee"
  mini_project: null

  common_mistakes:
    - mistake: "Mengira Gas Limit adalah jumlah gas yang pasti akan ditarik dari dompet"
      correction: "Gas Limit adalah batas pagu maksimal yang Anda izinkan. Yang ditarik adalah Gas Used aktual; sisanya otomatis dikembalikan."
    - mistake: "Mengabaikan lonjakan Base Fee saat jaringan padat"
      correction: "Jika Max Fee disetel terlalu rendah dibanding kenaikan Base Fee, transaksi akan macet di mempool hingga biaya jaringan turun kembali."

  security:
    - risk: "Out-of-Gas Griefing & DOS via Block Gas Limit"
      why_it_matters: "Loop tanpa batas pada array dinamis di smart contract dapat menembus batas 30M gas per blok, menyebabkan fungsi terkunci permanen dan dana membeku."
      practice: "Hindari iterasi array tak terbatas di dalam contract; gunakan pagination atau pola pull-payments."
      mitigation: "Batasi ukuran array dan terapkan invariant checks gas consumption."

  evidence:
    - type: "checkpoint-passed"
      level: 1
      description: "Memahami struktur biaya gas EIP-1559, pricing opcode, dan mekanisme burn"

  skills:
    - "eth-gas-economics"
    - "eip-1559"

  estimated_time_minutes: 50
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
