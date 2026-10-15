# Unit: Functions, Visibility & Modern Custom Errors

```yaml
unit:
  id: "sol-core-02-functions-and-custom-errors"
  title: "Functions, Visibility & Modern Custom Errors — Standar Penulisan Solidity 0.8.20+"
  track: "ethereum-developer"
  phase: "phase-3-solidity-foundations"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: developing

  why: |
    Fungsi adalah gerbang utama eksekusi logika smart contract. Menggunakan visibilitas fungsi yang salah
    dapat menciptakan celah keamanan kritis (seperti fungsi admin yang tidak sengaja terbuka untuk publik),
    sedangkan menggunakan pola penanganan error string lawas membuat ukuran bytecode membengkak dan memboroskan gas.
    Unit ini membedah visibilitas, mutabilitas, dan transisi ke pola deklarasi `custom error`.

  target: |
    Developer yang ingin menulis fungsi smart contract yang aman, efisien, dan mengikuti pola
    modern industri Web3.

  prerequisites:
    - "sol-core-01-types-and-storage-layout"

  outcomes:
    - "Membedakan 4 visibilitas fungsi: public, external, internal, dan private"
    - "Menerapkan mutabilitas fungsi: pure, view, non-payable, dan payable"
    - "Mengganti 'require(cond, string)' dengan 'error CustomError()' untuk memangkas ukuran bytecode dan gas deploy"
    - "Menganalisis bagaimana custom error didekode menggunakan 4-byte error selector oleh frontend/indexer"

  lessons:
    - id: "lesson-sol-core-02-01-visibility-and-errors"
      title: "Visibilitas Fungsi dan Deklarasi Custom Errors"
      concepts:
        - "function-visibility-matrix"
        - "mutability-pure-view-payable"
        - "custom-error-definition"
        - "4-byte-error-selector"
      learning_objectives:
        - id: "LO-SOL-FUNC-001"
          text: "Memilih visibilitas fungsi yang paling tepat dan hemat gas"
        - id: "LO-SOL-FUNC-002"
          text: "Mengimplementasikan penanganan error modern menggunakan pernyataan revert CustomError"
      learning_modes: [read, code, interact]
      estimated_minutes: 35
      content_blocks:
        - type: text
          body: |
            ## Matriks 4 Visibilitas Fungsi

            Setiap fungsi di Solidity wajib memiliki salah satu dari empat penanda visibilitas:

            | Visibilitas | Dari Luar Kontrak (EOA/Other) | Dari Dalam Kontrak Sendiri | Dari Kontrak Turunan (Inherited) | Gas Calldata |
            |---|---|---|---|---|
            | **`external`** | Ya (via RPC/Tx) | Tidak langsung (harus `this.f()`) | Tidak | Paling Hemat (baca calldata langsung) |
            | **`public`** | Ya (via RPC/Tx) | Ya (langsung) | Ya | Sedang (copy ke memory jika ada array) |
            | **`internal`** | Tidak | Ya | Ya | Sangat Efisien (panggilan lompat JUMP internal) |
            | **`private`** | Tidak | Ya | **Tidak** | Efisien (hanya di file kontrak deklarator) |

            ### Mutabilitas Fungsi: State Reading & Writing
            - **`payable`**: Dapat menerima transfer native ETH bersamaan dengan panggilan fungsi (`msg.value > 0`).
            - **Non-payable** (default): Menolak transaksi jika ada ETH yang dikirimkan.
            - **`view`**: Hanya membaca state blockchain (Storage/Balance), tidak bisa memodifikasi atau menulis state.
            - **`pure`**: Sama sekali tidak membaca atau menulis state (hanya komputasi matematis/logika murni dari argumen).

            ---

            ## Revolusi Custom Errors (Solidity 0.8.4+)

            Pola lawas menggunakan string revert:
            ```solidity
            // CARA LAWAS (Boros Gas & Ukuran Bytecode Besar):
            require(msg.sender == owner, "Ownable: caller is not the owner");
            ```
            Setiap karakter string dalam `require` harus disimpan ke dalam runtime bytecode kontrak saat deployment!
            Selain itu, saat terjadi revert, string harus disalin ke memory secara dinamis.

            ### Cara Modern (Standar Produksi):
            ```solidity
            // CARA MODERN: Deklarasikan error di level kontrak atau file
            error UnauthorizedAccount(address caller, address expectedOwner);
            error InsufficientBalance(uint256 available, uint256 required);

            contract Vault {
                address public immutable owner;

                constructor() {
                    owner = msg.sender;
                }

                function withdraw(uint256 amount) external {
                    if (msg.sender != owner) {
                        revert UnauthorizedAccount(msg.sender, owner);
                    }
                    // Logika penarikan...
                }
            }
            ```

            ### Mengapa Custom Error Jauh Lebih Unggul?
            1. **Hemat Gas Deployment:** Menghilangkan ratusan byte string teks dari kontrak.
            2. **Hemat Gas Eksekusi Revert:** Hanya membutuhkan 4-byte selector (`bytes4(keccak256("UnauthorizedAccount(address,address)"))`) ditambah parameter packed data.
            3. **Data Kaya & Type-Safe:** Frontend (seperti Viem/Ethers) dapat langsung menangkap parameter yang menyebabkan error (`caller` dan `expectedOwner`).

        - type: callout
          variant: info
          body: |
            💡 **Tips Optimasi Gas:**
            Gunakan `external` alih-alih `public` untuk fungsi yang tidak pernah dipanggil secara internal di dalam kontrak itu sendiri.
            Fungsi `external` dapat membaca array/string langsung dari `calldata` tanpa perlu mengalokasikan dan menyalin ke `memory`.

        - type: interactive
          id: "sim-custom-error-decoder"
          description: |
            Decoder Custom Error: Masukkan hex revert data dari transaksi yang gagal (misal 0x118cdaa7...),
            dan saksikan aplikasi mengekstrak 4-byte selector, mencocokkan dengan signature error, dan menampilkan parameter caller!

        - type: quiz
          id: "checkpoint-solidity-errors"
          learning_objective_ref: "LO-SOL-FUNC-002"
          question: "Apa keuntungan teknis utama menggunakan 'error CustomError()' dibandingkan 'require(condition, string)'?"
          choices:
            - text: "Custom error membuat fungsi otomatis menjadi view sehingga tidak membutuhkan gas"
              correct: false
            - text: "Custom error hanya menggunakan 4-byte hash selector bukan string panjang, menghemat ukuran bytecode dan biaya gas deploy maupun runtime"
              correct: true
            - text: "Custom error mencegah transaksi di-revert oleh EVM"
              correct: false
            - text: "Custom error mengizinkan transfer ETH tanpa modifier payable"
              correct: false
          explanation: |
            Custom error mengkodekan kesalahan menjadi 4-byte selector (mirip function selector),
            menghilangkan kebutuhan menyimpan string deskriptif ke dalam bytecode kontrak yang mahal.

  interactive:
    - "sim-custom-error-decoder"

  practice:
    - "exercise-refactor-require-to-custom-errors"

  checkpoint: "checkpoint-solidity-errors"
  mini_project: null

  common_mistakes:
    - mistake: "Menganggap fungsi 'private' membuat data variabel di blockchain menjadi rahasia dari publik"
      correction: "Semua data di blockchain bersifat publik transparan. Penanda 'private' hanya mencegah kontrak lain memanggil fungsi tersebut secara langsung, bukan merahasiakan isinya."
    - mistake: "Lupa menambahkan parameter 'revert' saat menggunakan if statement untuk validasi"
      correction: "Gunakan pola 'if (!valid) revert MyError();' secara eksplisit."

  security:
    - risk: "Salah Menetapkan Visibilitas 'public' pada Fungsi Inisialisasi atau Pembayaran"
      why_it_matters: "Penyerang dapat memanggil fungsi sensitif secara langsung jika visibilitas tidak dibatasi menjadi internal atau tidak dilindungi oleh access control."
      practice: "Prinsip least privilege: Jadikan fungsi private/internal secara default kecuali memang dirancang untuk diekspos."
      mitigation: "Terapkan custom error Unauthorized() dan periksa caller."

  evidence:
    - type: "checkpoint-passed"
      level: 2
      description: "Mampu menerapkan visibilitas fungsi yang aman dan pola modern custom error Solidity"

  skills:
    - "solidity-functions"
    - "custom-errors"
    - "gas-optimization"

  estimated_time_minutes: 50
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
