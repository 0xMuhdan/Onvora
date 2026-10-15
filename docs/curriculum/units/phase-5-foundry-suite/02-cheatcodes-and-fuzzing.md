# Unit: Foundry Cheatcodes & Fuzz Testing Suite

```yaml
unit:
  id: "foundry-02-cheatcodes-and-fuzzing"
  title: "Foundry Cheatcodes & Fuzz Testing — Manipulasi State EVM & Uji Acak Otomatis"
  track: "ethereum-developer"
  phase: "phase-5-foundry-suite"
  knowledge_scope: ecosystem
  chain_adapter: "ETH"
  target_level: developing

  why: |
    Pengujian manual dengan nilai tetap (hardcoded values) hanya mampu membuktikan bahwa kontrak
    bekerja pada skenario yang dipikirkan developer. Penyerang dunia nyata selalu mencari angka-angka
    ekstrem (*edge cases*) yang terlewat. Dengan memanfaatkan Foundry Cheatcodes untuk memanipulasi waktu
    dan identitas pemanggil, serta Fuzz Testing untuk menguji ratusan ribu input acak secara instan,
    Anda dapat mendeteksi celah eksploitasi sebelum kontrak dideploy ke jaringan publik.

  target: |
    Developer yang ingin menguasai teknik simulasi skenario lanjutan, manipulasi parameter lingkungan EVM,
    dan pengujian berbasis properti (*fuzzing*).

  prerequisites:
    - "foundry-01-forge-unit-tests"

  outcomes:
    - "Menggunakan cheatcodes 'vm.prank', 'vm.deal', 'vm.warp', dan 'vm.roll' untuk mengontrol lingkungan EVM"
    - "Menulis pengujian revert menggunakan 'vm.expectRevert' dengan verifikasi custom error spesifik"
    - "Mengonversi unit test statis menjadi Fuzz Test otomatis dengan parameter input acak ('testFuzz_')"
    - "Menerapkan 'bound(val, min, max)' dan 'vm.assume()' untuk membatasi ruang domain fuzzer"

  lessons:
    - id: "lesson-foundry-02-01-cheatcodes-and-fuzz"
      title: "Kekuatan Cheatcodes dan Fuzz Testing Foundry"
      concepts:
        - "vm-cheatcodes-address"
        - "state-manipulation-prank-deal"
        - "time-travel-warp-roll"
        - "stateless-fuzzing-testfuzz"
        - "fuzz-bounding-and-assumptions"
      learning_objectives:
        - id: "LO-FND-FUZZ-001"
          text: "Menerapkan cheatcode vm untuk menguji batas waktu dan hak akses kontrak"
        - id: "LO-FND-FUZZ-002"
          text: "Menulis pengujian fuzzing dengan pembatasan domain menggunakan bound()"
      learning_modes: [read, code, interact]
      estimated_minutes: 45
      content_blocks:
        - type: text
          body: |
            ## Apa Itu Foundry Cheatcodes?

            Cheatcodes adalah serangkaian instruksi khusus yang dieksekusi langsung oleh mesin virtual Forge
            di alamat address tetap: `0x7109709ECfa91a80626fF3989D68f67F5b1DD12D` (diakses via instans `vm`).
            Cheatcodes memberikan kendali seperti "dewa" atas lingkungan blockchain lokal:

            | Cheatcode | Fungsi & Kegunaan |
            |---|---|
            | **`vm.prank(address)`** | Menyetel `msg.sender` untuk satu pemanggilan eksternal berikutnya |
            | **`vm.startPrank(address)`** | Menyetel `msg.sender` untuk seluruh pemanggilan hingga `vm.stopPrank()` |
            | **`vm.deal(address, amount)`** | Mengubah saldo ETH sebuah akun ke angka tertentu secara instan |
            | **`vm.warp(timestamp)`** | Memajukan atau memundurkan waktu `block.timestamp` (mis. uji batas lockup waktu) |
            | **`vm.roll(blockNumber)`** | Mengubah nomor `block.number` saat ini |
            | **`vm.expectRevert(bytes)`** | Memverifikasi bahwa pemanggilan berikutnya PASTI gagal dengan error tertentu |
            | **`vm.expectEmit(...)`** | Memverifikasi bahwa pemanggilan berikutnya memancarkan event spesifik dengan topik yang cocok |

            ### Contoh Pengujian Hak Akses & Custom Revert:
            ```solidity
            function test_CannotWithdrawIfNotOwner() public {
                address attacker = makeAddr("attacker");

                // Beritahu Forge bahwa pemanggilan berikutnya HARUS revert dengan error UnauthorizedAccount
                vm.expectRevert(
                    abi.encodeWithSelector(Vault.UnauthorizedAccount.selector, attacker, vault.owner())
                );

                vm.prank(attacker);
                vault.withdraw(1 ether);
            }
            ```

            ---

            ## Stateless Fuzz Testing: Biarkan Forge Mencari Bug untuk Anda!

            Jika Anda menambahkan parameter ke dalam fungsi `test_*`, Forge secara otomatis mengenali
            fungsi tersebut sebagai **Fuzz Test**!
            Forge akan mengeksekusi fungsi tersebut ratusan kali (default 256 run) dengan input acak
            yang mencakup angka ekstrem ($0, 1, 2^{256}-1$, dsb).

            ```solidity
            // Forge akan memasukkan angka acak ke parameter 'depositAmount'
            function testFuzz_Deposit(uint96 depositAmount) public {
                // Batasi input acak ke rentang realistis: 1 Wei s/d 1,000 ETH
                uint256 amount = bound(depositAmount, 1 wei, 1000 ether);

                address user = makeAddr("user");
                vm.deal(user, amount);

                vm.prank(user);
                vault.deposit{value: amount}();

                assertEq(vault.balanceOf(user), amount);
            }
            ```

            ### `bound()` vs `vm.assume()`:
            - **`vm.assume(condition)`**: Membuang input jika kondisi bernilai `false`. Jika terlalu banyak input dibuang, Forge akan gagal karena *max-rejects*.
            - **`bound(val, min, max)`**: Memetakan ulang angka acak ke rentang yang ditentukan secara efisien tanpa membuang eksekusi uji (*sangat direkomendasikan!*).

        - type: callout
          variant: info
          body: |
            💡 **Invariant Testing:**
            Selain Stateless Fuzzing, Foundry mendukung **Invariant Testing** (Stateful Property Testing):
            menjalankan rangkaian pemanggilan fungsi acak secara berurutan dan membuktikan bahwa properti inti
            (misal: `totalShares * sharePrice == totalVaultAssets`) tidak pernah rusak dalam kondisi apa pun.

        - type: interactive
          id: "sim-fuzz-generator"
          description: |
            Interactive Fuzzing visualizer: Saksikan fuzzer menghasilkan 256 skenario acak, mencoba
            angka batas overflow, dan menampilkan test report keberhasilan.

        - type: quiz
          id: "checkpoint-cheatcode-bound"
          learning_objective_ref: "LO-FND-FUZZ-002"
          question: "Mengapa menggunakan helper bound(val, min, max) lebih disukai daripada vm.assume(val >= min && val <= max) pada Fuzz Testing?"
          choices:
            - text: "Karena vm.assume() membuat kompilasi kontrak menjadi error"
              correct: false
            - text: "Karena bound() memetakan nilai acak langsung ke dalam rentang tanpa membuang percobaan uji, sedangkan vm.assume() membuang input dan berisiko memicu max-reject error"
              correct: true
            - text: "Karena bound() hanya bisa digunakan untuk nilai boolean"
              correct: false
            - text: "Karena bound() otomatis menonaktifkan cheatcode vm"
              correct: false
          explanation: |
            Helper `bound()` menggunakan operasi modulo matematis untuk menggeser angka acak fuzzer
            ke dalam batas yang valid, memastikan setiap run pengujian tetap berjalan produktif tanpa
            terbuang sia-sia.

  interactive:
    - "sim-fuzz-generator"

  practice:
    - "exercise-write-fuzz-test-vault"

  checkpoint: "checkpoint-cheatcode-bound"
  mini_project: null

  common_mistakes:
    - mistake: "Memanggil vm.prank() lalu memanggil helper lokal sebelum memanggil fungsi target"
      correction: "vm.prank() HANYA berlaku untuk TEPAT SATU pemanggilan eksternal berikutnya. Jika Anda memanggil fungsi lain terlebih dahulu, prank akan terpakai oleh pemanggilan tersebut."
    - mistake: "Menggunakan rentang fuzzing tanpa batas untuk perhitungan token desimal"
      correction: "uint256 acak dapat bernilai hingga 2^256 - 1, yang akan selalu menyebabkan integer overflow wajar jika ditambahkan ke saldo normal; selalu gunakan bound() untuk rentang pasokan token realistis."

  security:
    - risk: "Asumsi Waktu Statis pada Kontrak Vesting & Timelock"
      why_it_matters: "Kontrak yang bergantung pada block.timestamp rentan terhadap manipulasi atau bug logika jika batas waktu tidak diuji secara menyeluruh melintasi boundary warp."
      practice: "Gunakan vm.warp() untuk menguji status sebelum timestamp jatuh tempo, tepat pada timestamp, dan jauh setelah timestamp."
      mitigation: "Tulis pengujian edge case untuk setiap batas waktu kontrak."

  evidence:
    - type: "checkpoint-passed"
      level: 3
      description: "Mampu menerapkan Foundry cheatcodes, manipulasi state EVM, dan penulisan fuzz testing terarah"

  skills:
    - "foundry-cheatcodes"
    - "fuzz-testing"
    - "property-testing"

  estimated_time_minutes: 60
  author: "Onvora Curriculum Team"
  technical_reviewer: "Senior EVM Architect"
  curriculum_reviewer: "Onvora Academic Lead"
  security_reviewer: "Smart Contract Security Specialist"
  review_date: "2026-10-13"
  version: 1
  deprecated: false
```
