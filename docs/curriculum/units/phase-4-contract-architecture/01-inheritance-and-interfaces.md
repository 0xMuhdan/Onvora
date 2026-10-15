# Unit: Inheritance, Interfaces & Contract Composition

```yaml
unit:
  id: "sol-arch-01-inheritance-and-interfaces"
  title: "Inheritance, Interfaces & Composition — Desain Modular Smart Contract"
  track: "ethereum-developer"
  phase: "phase-4-contract-architecture"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: proficient

  why: |
    Protokol DeFi dan infrastruktur Web3 modern tidak pernah dibangun dalam satu file kontrak monolitik.
    Mereka menggunakan sistem pewarisan berlapis (*inheritance*), antarmuka terstandarisasi (*interfaces*),
    dan pola komposisi modular. Memahami cara Solidity menyelesaikan konflik warisan ganda (*C3 Linearization*)
    dan cara berinteraksi dengan kontrak pihak ketiga melalui antarmuka ABI adalah fondasi arsitektur protokol.

  target: |
    Developer yang ingin merancang sistem multi-kontrak terstruktur dan memahami interaksi antar-protokol
    (composability) di Ethereum.

  prerequisites:
    - "sol-core-02-functions-and-custom-errors"

  outcomes:
    - "Merancang antarmuka (interface) kontrak dan mendeklarasikan function signatures tanpa implementasi"
    - "Menerapkan pewarisan ganda (multiple inheritance) menggunakan kata kunci 'is', 'virtual', dan 'override'"
    - "Menganalisis urutan eksekusi method 'super' berdasarkan algoritma C3 Linearization Python/Solidity"
    - "Mengintegrasikan pemanggilan kontrak eksternal menggunakan type-safe Interface casting"

  lessons:
    - id: "lesson-sol-arch-01-01-interfaces-and-c3"
      title: "Antarmuka Kontrak dan Pewarisan C3 Linearization"
      concepts:
        - "solidity-interfaces"
        - "abstract-contracts"
        - "virtual-and-override"
        - "c3-linearization-order"
        - "external-contract-calls"
      learning_objectives:
        - id: "LO-SOL-ARCH-001"
          text: "Mendefinisikan interface yang kompatibel dengan standar ERC"
        - id: "LO-SOL-ARCH-002"
          text: "Menyelesaikan konflik pewarisan fungsi ganda menggunakan keyword override(Base1, Base2)"
      learning_modes: [read, code, interact]
      estimated_minutes: 40
      content_blocks:
        - type: text
          body: |
            ## 1. Apa Itu Interface di Solidity?

            Sebuah **Interface** mendefinisikan kontrak perilaku (API) tanpa menyertakan kode implementasi
            maupun variabel state.

            ### Aturan Mutlak Interface:
            1. Tidak dapat memiliki variabel state di storage.
            2. Tidak dapat memiliki konstruktor (`constructor`).
            3. Seluruh fungsi wajib dideklarasikan dengan visibilitas `external`.
            4. Tidak dapat mewarisi dari kontrak lain, kecuali dari interface lain.

            ```solidity
            // Contoh Interface Standar Vault
            interface IVault {
                event Deposited(address indexed user, uint256 amount);
                error InsufficientShares();

                function deposit(uint256 amount) external payable returns (uint256 shares);
                function getBalance(address user) external view returns (uint256);
            }
            ```

            ### Cara Memanggil Kontrak Lain Menggunakan Interface:
            ```solidity
            contract YieldAggregator {
                // Type-safe external call
                function claimYield(address vaultAddress) external {
                    IVault vault = IVault(vaultAddress);
                    uint256 userBal = vault.getBalance(msg.sender);
                    // Lanjutkan eksekusi...
                }
            }
            ```

            ---

            ## 2. Pewarisan Ganda & Algoritma C3 Linearization

            Solidity mendukung *Multiple Inheritance* (pewarisan lebih dari satu induk).
            Ketika dua kontrak induk memiliki fungsi dengan nama dan parameter yang sama,
            bagaimana Solidity menentukan fungsi mana yang dipanggil saat menggunakan `super`?

            Solidity menggunakan algoritma **C3 Linearization** (dari kiri ke kanan, dari yang paling umum ke yang paling spesifik).

            ```solidity
            abstract contract Base {
                function role() public virtual returns (string memory) {
                    return "Base";
                }
            }

            abstract contract Authorizer is Base {
                function role() public virtual override returns (string memory) {
                    return "Authorizer";
                }
            }

            abstract contract Operator is Base {
                function role() public virtual override returns (string memory) {
                    return "Operator";
                }
            }

            // Urutan 'is' menentukan hierarki C3:
            // Operator ditulis terakhir, sehingga lebih diprioritaskan saat pemanggilan
            contract Manager is Authorizer, Operator {
                function role() public override(Authorizer, Operator) returns (string memory) {
                    return super.role(); // Mengembalikan "Operator"
                }
            }
            ```

        - type: callout
          variant: warning
          body: |
            ⚠️ **Urutan Deklarasi 'is' Sangat Krusial:**
            Urutan pewarisan harus ditulis dari "paling umum (base-most)" ke "paling spesifik (derived-most)".
            Jika dibalik, kompilator Solidity akan mengeluarkan error: *"Linearization of inheritance graph impossible"*.

        - type: interactive
          id: "sim-c3-linearization-graph"
          description: |
            C3 Linearization Visualizer: Buat pohon hierarki pewarisan multi-level dan lihat urutan
            linear eksekusi 'super' yang dihasilkan secara grafis.

        - type: quiz
          id: "checkpoint-solidity-inheritance"
          learning_objective_ref: "LO-SOL-ARCH-002"
          question: "Jika sebuah fungsi dioverride dari dua kontrak induk yang berbeda (A dan B), apa yang harus dituliskan pada deklarasi fungsi kontrak anak?"
          choices:
            - text: "Cukup tulis 'override' saja tanpa argumen"
              correct: false
            - text: "Wajib menuliskan secara eksplisit 'override(A, B)' untuk menyatakan resolusi dari kedua induk"
              correct: true
            - text: "Tuliskan 'virtual override' pada kontrak anak"
              correct: false
            - text: "Fungsi harus diganti namanya agar tidak bentrok"
              correct: false
          explanation: |
            Solidity mewajibkan developer secara sadar mencantumkan nama seluruh kontrak induk
            yang dioverride di dalam tanda kurung: `override(A, B)`.

  interactive:
    - "sim-c3-linearization-graph"

  practice:
    - "exercise-implement-vault-interface"

  checkpoint: "checkpoint-solidity-inheritance"
  mini_project: null

  common_mistakes:
    - mistake: "Mendeklarasikan variabel state di dalam interface"
      correction: "Interface hanya boleh berisi function signatures, events, custom errors, structs, dan enums; dilarang memiliki state variables."
    - mistake: "Memanggil kontrak eksternal tanpa memvalidasi apakah alamat tersebut benar-benar memiliki bytecode"
      correction: "Panggilan tingkat tinggi seperti IERC20(target).transfer() akan mengembalikan sukses semu jika target adalah EOA kosong (karena EOA selalu mengembalikan status success pada raw call)."

  security:
    - risk: "C3 Linearization Order Mismatch pada Modifiers"
      why_it_matters: "Urutan eksekusi modifier yang diwariskan dapat menyebabkan pemeriksaan akses (auth check) berjalan setelah efek mutasi dijalankan jika urutan pewarisan keliru."
      practice: "Selalu audit grafik pewarisan kontrak dan pastikan modifier keamanan dijalankan paling awal."
      mitigation: "Gunakan automated linter (Slither) untuk memverifikasi hirarki C3."

  evidence:
    - type: "checkpoint-passed"
      level: 3
      description: "Mampu merancang interface modular, multiple inheritance, dan pemanggilan kontrak pihak ketiga"

  skills:
    - "solidity-interfaces"
    - "c3-linearization"
    - "contract-composability"

  estimated_time_minutes: 60
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
