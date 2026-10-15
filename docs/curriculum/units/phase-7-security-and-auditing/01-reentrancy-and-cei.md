# Unit: Checks-Effects-Interactions & Reentrancy Mitigations

```yaml
unit:
  id: "sec-01-checks-effects-interactions"
  title: "Checks-Effects-Interactions & Reentrancy Mitigations — Anatomi Kerentanan Klasik Terbesar Web3"
  track: "ethereum-developer"
  phase: "phase-7-security-and-auditing"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: advanced

  why: |
    Reentrancy adalah vektor serangan paling terkenal dalam sejarah Ethereum—menyebabkan peretasan The DAO
    pada tahun 2016 yang berujung pada percabangan hard fork Ethereum dan Ethereum Classic. Bahkan di era modern,
    variasi serangan ini (cross-function reentrancy dan read-only reentrancy) masih rutin menguras protokol DeFi.
    Menguasai pola Checks-Effects-Interactions (CEI) dan mekanisme ReentrancyGuard adalah benteng pertahanan
    paling mutlak bagi setiap engineer smart contract.

  target: |
    Developer yang ingin mendalami teknik analisis serangan eksploitasi, menulis kode pertahanan tingkat tinggi,
    dan melindungi likuiditas protokol dari serangan rekursif.

  prerequisites:
    - "sol-core-02-functions-and-custom-errors"
    - "foundry-02-cheatcodes-and-fuzzing"

  outcomes:
    - "Menganalisis alur serangan reentrancy pada level opcode panggilan eksternal (CALL)"
    - "Menerapkan pola Checks-Effects-Interactions (CEI) secara ketat pada seluruh fungsi yang mengubah state"
    - "Mengintegrasikan modifier 'nonReentrant' OpenZeppelin untuk perlindungan mutex lock"
    - "Memahami bahaya Read-Only Reentrancy pada protokol yang menyediakan oracle harga untuk protokol lain"

  lessons:
    - id: "lesson-sec-01-01-reentrancy-anatomy"
      title: "Anatomi Serangan Reentrancy dan Pola CEI"
      concepts:
        - "external-call-control-hijack"
        - "the-dao-hack-postmortem"
        - "checks-effects-interactions-pattern"
        - "reentrancy-guard-mutex"
        - "read-only-reentrancy"
      learning_objectives:
        - id: "LO-SEC-REENT-001"
          text: "Mengidentifikasi pelanggaran pola CEI pada kode smart contract yang rentan"
        - id: "LO-SEC-REENT-002"
          text: "Meremajakan kode rentan menggunakan pola CEI dan OpenZeppelin ReentrancyGuard"
      learning_modes: [read, code, interact]
      estimated_minutes: 50
      content_blocks:
        - type: text
          body: |
            ## Bagaimana Reentrancy Terjadi?

            Ketika sebuah smart contract mengirimkan native ETH ke alamat eksternal menggunakan low-level call:
            ```solidity
            (bool success, ) = msg.sender.call{value: amount}("");
            ```
            Kontrol eksekusi EVM **sepenuhnya diserahkan** kepada alamat penerima! Jika alamat penerima adalah
            kontrak penyerang, fungsi `fallback()` atau `receive()` penyerang akan terpicu secara otomatis.

            Jika kontrak korban mentransfer dana **sebelum** mengurangi saldo di state storage-nya, kontrak penyerang
            dapat memanggil ulang fungsi penarikan (`withdraw`) tersebut berkali-kali secara rekursif sebelum
            perubahan saldo pertama sempat tercatat!

            ---

            ### Contoh Kode Rentan (Vulnerable Code):
            ```solidity
            contract VulnerableEtherStore {
                mapping(address => uint256) public balances;

                function withdraw() external {
                    uint256 bal = balances[msg.sender];
                    require(bal > 0, "No balance");

                    // CELAH FATAL: Mengirim ETH SEBELUM mereset balances[msg.sender]!
                    (bool sent, ) = msg.sender.call{value: bal}("");
                    require(sent, "Failed to send Ether");

                    // Mutasi state baru dilakukan di sini (terlambat, sudah terkuras!)
                    balances[msg.sender] = 0;
                }
            }
            ```

            ---

            ## Pola Pertahanan: Checks-Effects-Interactions (CEI)

            Standar defensif utama di industri adalah pola **CEI**:
            1. **Checks (Pemeriksaan):** Validasi seluruh prasyarat input, hak akses, dan saldo di awal (`require`/`revert CustomError`).
            2. **Effects (Efek):** Perbarui seluruh state storage internal kontrak **sebelum** menyentuh dunia luar.
            3. **Interactions (Interaksi):** Lakukan panggilan ke kontrak eksternal atau transfer aset hanya setelah seluruh efek internal tuntas.

            ### Kode Aman Berbasis CEI:
            ```solidity
            error InsufficientBalance();
            error TransferFailed();

            contract SafeEtherStore {
                mapping(address => uint256) public balances;

                function withdraw() external {
                    // 1. CHECKS
                    uint256 bal = balances[msg.sender];
                    if (bal == 0) revert InsufficientBalance();

                    // 2. EFFECTS (Update state SEBELUM interaksi!)
                    balances[msg.sender] = 0;

                    // 3. INTERACTIONS
                    (bool sent, ) = msg.sender.call{value: bal}("");
                    if (!sent) {
                        // Jika transfer gagal, transaksi revert dan mengembalikan state
                        revert TransferFailed();
                    }
                }
            }
            ```

            ---

            ## Lapisan Pertahanan Tambahan: ReentrancyGuard Mutex

            Sebagai lapisan perlindungan kedua (*defense-in-depth*), gunakan modifier `nonReentrant` dari OpenZeppelin:
            ```solidity
            import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

            contract HardenedVault is ReentrancyGuard {
                function withdraw() external nonReentrant {
                    // Dilindungi oleh flag status yang mencegah reentrancy lintas fungsi
                }
            }
            ```

        - type: callout
          variant: danger
          body: |
            🚨 **Waspada Read-Only Reentrancy:**
            Bahkan jika fungsi `withdraw` dilindungi oleh `nonReentrant`, fungsi pembacaan publik `view`
            (seperti `getSharePrice()`) mungkin tidak dilindungi modifier.
            Jika protokol DeFi lain membaca harga saham vault di tengah-tengah eksekusi reentrancy saat saldo kotor
            belum seimbang, protokol pihak ketiga tersebut dapat dieksploitasi karena membaca nilai oracle palsu!

        - type: interactive
          id: "sim-reentrancy-attack-loop"
          description: |
            Simulasi Serangan Reentrancy: Saksikan panggilan rekursif berulang antara AttackerContract
            dan VulnerableVault step-by-step di tumpukan eksekusi hingga brankas terkuras habis.

        - type: quiz
          id: "checkpoint-cei-pattern"
          learning_objective_ref: "LO-SEC-REENT-001"
          question: "Mengapa pola Checks-Effects-Interactions (CEI) mampu menggagalkan serangan reentrancy?"
          choices:
            - text: "Karena CEI menonaktifkan fungsi call tingkat rendah secara permanen"
              correct: false
            - text: "Karena state internal (saldo) telah dikurangi menjadi nol sebelum kontrol diserahkan ke pihak luar, sehingga pemanggilan rekursif kedua akan langsung gagal pada tahap Checks"
              correct: true
            - text: "Karena CEI membatasi gas transfer menjadi maksimal 2,300 gas"
              correct: false
            - text: "Karena CEI secara otomatis menyandikan transaksi dengan enkripsi asimetris"
              correct: false
          explanation: |
            Dengan memutasi saldo akun menjadi nol terlebih dahulu sebelum mentransfer ETH, jika penyerang
            mencoba memanggil ulang fungsi withdraw di fallback-nya, pemeriksaan `bal == 0` akan langsung
            memicu revert, menggagalkan upaya peretasan.

  interactive:
    - "sim-reentrancy-attack-loop"

  practice:
    - "exercise-reproduce-and-fix-reentrancy"

  checkpoint: "checkpoint-cei-pattern"
  mini_project: "project-audit-vulnerable-vault"

  common_mistakes:
    - mistake: "Mengandalkan transfer() atau send() bawaan Solidity untuk mencegah reentrancy"
      correction: "Opcode transfer() memiliki batas 2,300 gas statis yang kini usang dan dapat gagal sewaktu-waktu akibat perubahan gas repricing hard fork Ethereum; gunakan low-level call dengan CEI + ReentrancyGuard."
    - mistake: "Mengira nonReentrant melindungi fungsi view dari pembacaan state inkonsisten"
      correction: "Fungsi view tidak memodifikasi state sehingga tidak mengaktifkan guard tradisional; untuk mitigasi read-only reentrancy, sinkronkan pembacaan atau gunakan transient storage lock."

  security:
    - risk: "Cross-Function Reentrancy"
      why_it_matters: "Penyerang tidak memanggil ulang fungsi yang sama, melainkan memanggil fungsi lain di kontrak yang sama yang membaca saldo yang belum diperbarui."
      practice: "Pastikan seluruh fungsi yang mengakses variabel state bersama dilindungi oleh satu mutex lock yang sama atau patuhi CEI secara global."
      mitigation: "Gunakan ReentrancyGuard terpusat di seluruh fungsi mutasi."

  evidence:
    - type: "checkpoint-passed"
      level: 4
      description: "Mampu menganalisis kerentanan reentrancy, merancang mitigasi pola CEI, dan menerapkan ReentrancyGuard"

  skills:
    - "reentrancy-defense"
    - "cei-pattern"
    - "smart-contract-security"

  estimated_time_minutes: 75
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
