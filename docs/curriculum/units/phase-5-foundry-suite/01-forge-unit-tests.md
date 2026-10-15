# Unit: Foundry Forge & Unit Testing Foundations

```yaml
unit:
  id: "foundry-01-forge-unit-tests"
  title: "Foundry Forge & Unit Testing Foundations — Ekosistem Pengujian Berkecepatan Tinggi"
  track: "ethereum-developer"
  phase: "phase-5-foundry-suite"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: proficient

  why: |
    Foundry telah menjadi standar emas industri pengujian smart contract menggantikan framework
    berbasis JavaScript (Hardhat/Truffle). Ditulis dalam bahasa Rust, Forge menjalankan test suite
    ratusan kali lebih cepat dan memungkinkan developer menulis seluruh unit test langsung dalam
    Solidity murni. Menguasai struktur proyek Foundry, eksekusi 'forge test', dan assertion libraries
    adalah prasyarat utama untuk menghasilkan smart contract audit-grade.

  target: |
    Developer yang ingin membangun siklus pengujian otomatis yang cepat, andal, dan modular
    menggunakan toolkit Foundry.

  prerequisites:
    - "sol-core-02-functions-and-custom-errors"
    - "sol-arch-01-inheritance-and-interfaces"

  outcomes:
    - "Menginisialisasi struktur proyek Foundry standar (src, test, script, foundry.toml)"
    - "Menulis file pengujian unit dalam Solidity dengan mewarisi kontrak 'Test' dari forge-std"
    - "Menggunakan fungsi setUp() untuk mempersiapkan state kontrak sebelum setiap test dijalankan"
    - "Menerapkan assertEq, assertTrue, dan assertApproxEqAbs untuk memverifikasi logika kontrak"

  lessons:
    - id: "lesson-foundry-01-01-project-setup-and-tests"
      title: "Menulis Unit Test Pertama dengan Forge"
      concepts:
        - "foundry-directory-layout"
        - "forge-std-test-contract"
        - "setup-fixture-lifecycle"
        - "forge-test-assertions"
      learning_objectives:
        - id: "LO-FND-FORGE-001"
          text: "Menjelaskan siklus hidup fungsi setUp() pada setiap pemanggilan fungsi test"
        - id: "LO-FND-FORGE-002"
          text: "Mengeksekusi 'forge test -vvvv' dan menganalisis stack trace panggilan EVM"
      learning_modes: [read, code, interact]
      estimated_minutes: 40
      content_blocks:
        - type: text
          body: |
            ## Mengapa Foundry Menjadi Standar De Facto?

            1. **Kecepatan Kompilasi & Eksekusi Rust:** Test suite yang membutuhkan waktu 2 menit di Hardhat selesai dalam hitungan detik di Foundry.
            2. **Solidity Native:** Anda tidak perlu lagi melakukan konversi tipe data BigNumber JavaScript yang rentan bug; tulis kode pengujian Anda langsung dalam Solidity.
            3. **Trace EVM Tingkat Rendah:** Flag `-vvvv` menampilkan setiap instruksi opcode, call stack, parameter, dan error secara transparan.

            ### Struktur Proyek Standar Foundry:
            ```
            my-foundry-project/
            ├── src/             # Source code smart contract (.sol)
            │   └── Vault.sol
            ├── test/            # File pengujian unit & fuzzing (.t.sol)
            │   └── Vault.t.sol
            ├── script/          # Deployment dan automation scripts (.s.sol)
            │   └── DeployVault.s.sol
            ├── lib/             # Dependensi git submodules (forge-std, openzeppelin)
            └── foundry.toml     # File konfigurasi compiler & RPC
            ```

            ---

            ## Anatomi File Test (.t.sol)

            Setiap file test mengimpor `Test` dari library standar `forge-std`.
            Semua fungsi yang diawali dengan kata `test` akan dieksekusi secara otomatis oleh test runner.

            ```solidity
            // SPDX-License-Identifier: MIT
            pragma solidity ^0.8.20;

            import {Test, console2} from "forge-std/Test.sol";
            import {Vault} from "../src/Vault.sol";

            contract VaultTest is Test {
                Vault public vault;
                address public user = makeAddr("alice");

                // Dijalankan SEKALI sebelum SETIAP fungsi test dijalankan (Isolated State!)
                function setUp() public {
                    vault = new Vault();
                    vm.deal(user, 10 ether); // Memberi saldo ETH awal ke alice
                }

                // Konvensi penamaan: test_NamaKondisi_Keluaran
                function test_DepositIncreasesBalance() public {
                    console2.log("Saldo awal alice:", user.balance);

                    // Berpura-pura menjadi 'user' untuk pemanggilan berikutnya
                    vm.prank(user);
                    vault.deposit{value: 1 ether}();

                    assertEq(vault.balanceOf(user), 1 ether, "Balance vault harus 1 ETH");
                    assertEq(address(vault).balance, 1 ether);
                }
            }
            ```

            ### Level Verbosity Output (`-v`):
            - `forge test`: Hanya menampilkan status PASS / FAIL.
            - `forge test -vv`: Menampilkan output log `console2.log()`.
            - `forge test -vvv`: Menampilkan call trace untuk test yang gagal.
            - `forge test -vvvv`: Menampilkan seluruh call trace dan setup logs untuk semua test.

        - type: callout
          variant: info
          body: |
            💡 **State Isolation:**
            Setiap kali fungsi `test_*` dijalankan, Forge mereset state blockchain ke snapshot
            yang dihasilkan oleh fungsi `setUp()`. Mutasi state pada satu test tidak akan pernah
            mengotori (*pollute*) test lainnya!

        - type: interactive
          id: "sim-forge-terminal-trace"
          description: |
            Terminal Emulator Forge: Jalankan perintah 'forge test -vvvv', saksikan pohon panggilan
            EVM berwarna hijau/merah menampilkan kedalaman call, gas consumed, dan parameter transfer.

        - type: quiz
          id: "checkpoint-foundry-lifecycle"
          learning_objective_ref: "LO-FND-FORGE-001"
          question: "Kapan fungsi setUp() dieksekusi di dalam kontrak Forge Test?"
          choices:
            - text: "Hanya satu kali di awal sebelum seluruh file test dijalankan"
              correct: false
            - text: "Dijalankan ulang dari awal sebelum setiap fungsi test_* individual dieksekusi, memastikan isolasi state sempurna"
              correct: true
            - text: "Hanya dijalankan jika fungsi test mengalami kegagalan"
              correct: false
            - text: "Dijalankan secara acak bergantung pada thread worker"
              correct: false
          explanation: |
            Fungsi setUp() bertindak sebagai fixture generator yang dieksekusi ulang sebelum setiap
            fungsi test_* untuk memastikan lingkungan uji selalu bersih dan terisolasi.

  interactive:
    - "sim-forge-terminal-trace"

  practice:
    - "exercise-write-first-forge-test"

  checkpoint: "checkpoint-foundry-lifecycle"
  mini_project: null

  common_mistakes:
    - mistake: "Lupa menamai fungsi pengujian dengan awalan 'test'"
      correction: "Forge hanya mengeksekusi fungsi yang namanya diawali dengan 'test' (mis. test_Deposit); fungsi tanpa awalan test akan diabaikan."
    - mistake: "Mengubah state kontrak di test A dan berharap perubahannya terbaca di test B"
      correction: "Setiap test berjalan di state baru yang bersih hasil eksekusi setUp()."

  security:
    - risk: "False Positive pada Testing Tanpa Assert Revert Condition"
      why_it_matters: "Menguji skenario gagal hanya dengan membiarkan transaksi lolos dapat menyembunyikan celah keamanan di mana penyerang berhasil mengeksekusi fungsi terlarang."
      practice: "Gunakan vm.expectRevert() setiap kali menguji kondisi error otorisasi."
      mitigation: "Tulis pengujian positif (happy path) dan negatif (revert conditions) secara seimbang."

  evidence:
    - type: "checkpoint-passed"
      level: 3
      description: "Mampu menyusun proyek Foundry, menulis fixture setUp(), dan assertion unit testing"

  skills:
    - "foundry-forge"
    - "unit-testing"
    - "state-isolation"

  estimated_time_minutes: 60
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
