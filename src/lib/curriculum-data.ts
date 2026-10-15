/**
 * Canonical Curriculum Data for Ethereum Developer Track
 * Aligned with docs/curriculum/units/ and ONV-05 / ONV-06 specifications.
 */

export interface QuizChoice {
  text: string;
  correct: boolean;
}

export interface ContentBlock {
  id: string;
  type: "text" | "callout" | "code" | "interactive" | "simulation" | "quiz";
  title?: string;
  body?: string;
  variant?: "info" | "warning" | "danger" | "success";
  code?: string;
  language?: string;
  simulationType?: "evm-stack" | "eip1559-calc" | "storage-packer" | "reentrancy-trace";
  simulationConfig?: Record<string, unknown>;
  question?: string;
  choices?: QuizChoice[];
  explanation?: string;
}

export interface LessonData {
  id: string;
  slug: string;
  unitSlug: string;
  trackSlug: string;
  title: string;
  orderIndex: number;
  estimatedMinutes: number;
  learningObjectives: string[];
  blocks: ContentBlock[];
  practiceChallengeId?: string; // Links to /practice?challenge=<id>
  nextLesson?: {
    unitSlug: string;
    lessonSlug: string;
    title: string;
  };
  prevLesson?: {
    unitSlug: string;
    lessonSlug: string;
    title: string;
  };
}

export interface UnitData {
  id: string;
  slug: string;
  trackSlug: string;
  phaseNumber: number;
  phaseName: string;
  title: string;
  why: string;
  targetLevel: string;
  lessons: {
    slug: string;
    title: string;
    estimatedMinutes: number;
  }[];
}

export const CANONICAL_UNITS: Record<string, UnitData> = {
  "eth-fund-01-accounts-and-keys": {
    id: "unit-eth-fund-01",
    slug: "eth-fund-01-accounts-and-keys",
    trackSlug: "ethereum",
    phaseNumber: 1,
    phaseName: "Phase 01: Ethereum Fundamentals",
    title: "Accounts, Keys, and State Identity",
    why: "Memahami perbedaan mendasar EOA vs Contract Account dan representasi 4 komponen state di Merkle Patricia Trie.",
    targetLevel: "Beginner",
    lessons: [
      {
        slug: "eoa-vs-contract-accounts",
        title: "Anatomi Akun: EOA vs Contract Account & 4 State Fields",
        estimatedMinutes: 20,
      },
      {
        slug: "cryptographic-key-derivation",
        title: "Derivasi Kunci Kriptografi & Nonce Replay Prevention",
        estimatedMinutes: 25,
      },
    ],
  },
  "eth-fund-02-gas-and-eip1559": {
    id: "unit-eth-fund-02",
    slug: "eth-fund-02-gas-and-eip1559",
    trackSlug: "ethereum",
    phaseNumber: 1,
    phaseName: "Phase 01: Ethereum Fundamentals",
    title: "Gas Mechanics and EIP-1559 Economics",
    why: "Menguasai struktur biaya transaksi modern, mekanisme burn Base Fee, dan batas komputasi EVM.",
    targetLevel: "Beginner",
    lessons: [
      {
        slug: "gas-units-and-eip1559-market",
        title: "Mekanisme Pasar Biaya: Base Fee, Priority Fee Tip & Max Fee",
        estimatedMinutes: 25,
      },
    ],
  },
  "eth-fund-03-evm-architecture": {
    id: "unit-eth-fund-03",
    slug: "eth-fund-03-evm-architecture",
    trackSlug: "ethereum",
    phaseNumber: 1,
    phaseName: "Phase 01: Ethereum Fundamentals",
    title: "EVM Architecture & Data Areas",
    why: "Membedah cara kerja internal stack machine 256-bit dan 4 area data EVM.",
    targetLevel: "Beginner",
    lessons: [
      {
        slug: "stack-memory-storage-calldata",
        title: "4 Kompartemen Data EVM & Ekspansi Memori Kuadratik",
        estimatedMinutes: 30,
      },
    ],
  },
  "sol-core-01-types-and-storage-layout": {
    id: "unit-sol-core-01",
    slug: "sol-core-01-types-and-storage-layout",
    trackSlug: "ethereum",
    phaseNumber: 3,
    phaseName: "Phase 03: Solidity Core Foundations",
    title: "Types, Storage Packing & Transient Storage",
    why: "Menguasai teknik pemadatan slot 32-byte untuk menghemat gas SSTORE dan memanfaatkan EIP-1153.",
    targetLevel: "Developing",
    lessons: [
      {
        slug: "storage-slot-packing-rules",
        title: "Aturan 32-Byte Slot Packing dan Optimasi Gas Solidity",
        estimatedMinutes: 30,
      },
    ],
  },
  "sol-core-02-functions-and-custom-errors": {
    id: "unit-sol-core-02",
    slug: "sol-core-02-functions-and-custom-errors",
    trackSlug: "ethereum",
    phaseNumber: 3,
    phaseName: "Phase 03: Solidity Core Foundations",
    title: "Functions, Visibility & Modern Custom Errors",
    why: "Menerapkan visibilitas fungsi yang aman dan mengganti require string boros dengan custom errors.",
    targetLevel: "Developing",
    lessons: [
      {
        slug: "function-visibility-and-custom-errors",
        title: "Matriks Visibilitas & Transisi ke Deklarasi Custom Errors",
        estimatedMinutes: 35,
      },
    ],
  },
  "foundry-01-forge-unit-tests": {
    id: "unit-foundry-01",
    slug: "foundry-01-forge-unit-tests",
    trackSlug: "ethereum",
    phaseNumber: 5,
    phaseName: "Phase 05: Foundry Testing Suite",
    title: "Foundry Forge & Unit Testing Foundations",
    why: "Membangun lingkungan pengujian smart contract berbasis Solidity berkecepatan tinggi dengan Forge.",
    targetLevel: "Proficient",
    lessons: [
      {
        slug: "foundry-project-setup-and-tests",
        title: "Struktur Proyek Forge, Fixture setUp(), dan Assertion Testing",
        estimatedMinutes: 30,
      },
    ],
  },
  "sec-01-checks-effects-interactions": {
    id: "unit-sec-01",
    slug: "sec-01-checks-effects-interactions",
    trackSlug: "ethereum",
    phaseNumber: 7,
    phaseName: "Phase 07: Security & Auditing",
    title: "Checks-Effects-Interactions & Reentrancy Mitigations",
    why: "Menganalisis anatomi serangan reentrancy dan merancang pertahanan berbasis pola CEI & ReentrancyGuard.",
    targetLevel: "Advanced",
    lessons: [
      {
        slug: "reentrancy-anatomy-and-cei",
        title: "Anatomi Kerentanan Reentrancy dan Penerapan Pola CEI Defensif",
        estimatedMinutes: 40,
      },
    ],
  },
};

export const CANONICAL_LESSONS: Record<string, LessonData> = {
  "eoa-vs-contract-accounts": {
    id: "lesson-eth-fund-01-01",
    slug: "eoa-vs-contract-accounts",
    unitSlug: "eth-fund-01-accounts-and-keys",
    trackSlug: "ethereum",
    title: "Anatomi Akun: EOA vs Contract Account & 4 State Fields",
    orderIndex: 1,
    estimatedMinutes: 20,
    learningObjectives: [
      "Mengidentifikasi perbedaan struktural antara EOA dan Contract Account",
      "Menganalisis 4 field penyusun state akun Ethereum di Merkle Patricia Trie",
    ],
    blocks: [
      {
        id: "block-intro-text",
        type: "text",
        body: `## Dua Tipe Warga Negara di Jaringan Ethereum

Ethereum World State adalah pemetaan global antara **20-byte addresses** ke **account states**. Berbeda dengan basis data Web2 yang mencatat username dan password di server terpusat, Ethereum membedakan setiap alamat menjadi dua jenis entitas akun:

1. **Externally Owned Account (EOA):** Akun yang dikendalikan oleh manusia atau sistem di luar blockchain yang memegang sepasang Private Key kriptografi.
2. **Contract Account (CA):** Akun yang tidak memiliki private key, melainkan dikendalikan secara deterministik oleh kode bytecode yang dieksekusi oleh Ethereum Virtual Machine (EVM).`,
      },
      {
        id: "block-callout-diff",
        type: "callout",
        variant: "info",
        body: `💡 **Poin Krusial:** Transaksi pertama di Ethereum *selalu* harus diinisiasi dan ditandatangani oleh EOA. Contract Account tidak bisa memulai transaksi sendiri di jaringan tanpa adanya pemicu (eksternal call) dari EOA atau kontrak lain.`,
      },
      {
        id: "block-state-fields",
        type: "text",
        body: `### 4 Komponen Account State

Setiap alamat akun di Ethereum memiliki tepat 4 nilai yang tersimpan di dalam node Merkle Patricia State Trie:

| Field | Tipe Data | Deskripsi Teknis |
|---|---|---|
| **\`nonce\`** | \`uint64\` | Untuk EOA: Jumlah transaksi terkirim. Untuk Contract: Jumlah kontrak anak yang dibuat. |
| **\`balance\`** | \`uint256\` | Jumlah saldo native Ether (dalam satuan terkecil Wei, 1 ETH = $10^{18}$ Wei). |
| **\`storageRoot\`** | \`bytes32\` | 256-bit hash dari root node storage trie yang menyimpan seluruh variabel state kontrak. |
| **\`codeHash\`** | \`bytes32\` | Hash Keccak-256 dari bytecode EVM. Untuk EOA bernilai hash kosong (\`0xc5d246...\`). |`,
      },
      {
        id: "block-code-preview",
        type: "code",
        language: "solidity",
        title: "Perbandingan Address & Nonce di Solidity",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AccountInspector {
    // Memeriksa apakah target adalah Contract Account atau EOA
    function isContract(address account) external view returns (bool) {
        // Kontrak memiliki ukuran code > 0 (setelah constructor selesai)
        return account.code.length > 0;
    }

    // Mendapatkan saldo Wei akun
    function getBalance(address account) external view returns (uint256) {
        return account.balance;
    }
}`,
      },
      {
        id: "block-quiz-accounts",
        type: "quiz",
        question: "Mengapa sebuah Contract Account tidak dapat mengirimkan transaksi pertama secara mandiri ke mempool?",
        choices: [
          { text: "Karena Contract Account tidak memiliki saldo ETH untuk membayar gas", correct: false },
          { text: "Karena Contract Account tidak memiliki Private Key untuk menandatangani (ECDSA signature) transaksi", correct: true },
          { text: "Karena EVM melarang pemanggilan lintas smart contract", correct: false },
          { text: "Karena nonce Contract Account selalu terkunci di angka nol", correct: false },
        ],
        explanation: "Setiap transaksi di Ethereum wajib diverifikasi melalui tanda tangan kriptografi kurva eliptik secp256k1. Karena Contract Account hanya berisi kode bytecode tanpa private key, ia hanya mengeksekusi instruksi saat dipanggil oleh entitas lain.",
      },
    ],
    practiceChallengeId: "vault-access",
    nextLesson: {
      unitSlug: "eth-fund-02-gas-and-eip1559",
      lessonSlug: "gas-units-and-eip1559-market",
      title: "Mekanisme Pasar Biaya: Base Fee & EIP-1559",
    },
  },

  "gas-units-and-eip1559-market": {
    id: "lesson-eth-fund-02-01",
    slug: "gas-units-and-eip1559-market",
    unitSlug: "eth-fund-02-gas-and-eip1559",
    trackSlug: "ethereum",
    title: "Mekanisme Pasar Biaya: Base Fee, Priority Fee Tip & Max Fee",
    orderIndex: 1,
    estimatedMinutes: 25,
    learningObjectives: [
      "Mendeskripsikan perbedaan gas units dan harga per gas dalam satuan Gwei",
      "Menghitung total biaya transaksi nyata dengan formula EIP-1559",
    ],
    blocks: [
      {
        id: "block-gas-intro",
        type: "text",
        body: `## Mengapa Ethereum Membutuhkan Gas?

Karena EVM bersifat *Turing-complete*, program komputer secara matematis dapat memuat perulangan tanpa henti (*infinite loop*). Tanpa mekanisme pembatas, satu transaksi jahat bisa membekukan ribuan node validator di seluruh dunia.

**Gas adalah bahan bakar komputasi:** Setiap instruksi opcode (penjumlahan, penyimpanan memori, pembacaan storage) memiliki biaya pasti dalam satuan *Gas Units*. Pengirim transaksi membayar gas ini menggunakan native token Ether (ETH).`,
      },
      {
        id: "block-eip1559-sim",
        type: "simulation",
        simulationType: "eip1559-calc",
        title: "Interactive EIP-1559 Fee Calculator",
      },
      {
        id: "block-gas-formula",
        type: "text",
        body: `### Formula Transaksi Tipe-2 (EIP-1559)

$$\\text{Total Biaya} = \\text{Gas Digunakan} \\times (\\text{Base Fee} + \\text{Priority Fee})$$

- **Base Fee:** Dihitung otomatis oleh protokol per blok berdasarkan kepadatan jaringan (target 15M gas). **100% Base Fee di-BURN (dihanguskan)** dari suplai beredar!
- **Max Priority Fee (Tip):** Biaya tip opsional yang dibayarkan langsung ke validator agar transaksi Anda diprioritaskan.
- **Max Fee:** Batas pagu tertinggi yang Anda izinkan. Selisih sisa gas otomatis dikembalikan (*refund*) ke akun Anda.`,
      },
      {
        id: "block-quiz-gas",
        type: "quiz",
        question: "Apa yang terjadi dengan Base Fee yang dibayarkan pengguna dalam transaksi EIP-1559?",
        choices: [
          { text: "Diberikan seluruhnya kepada validator yang memvalidasi blok", correct: false },
          { text: "Dihanguskan (burned) secara permanen dari peredaran oleh protokol", correct: true },
          { text: "Disimpan di rekening cadangan Ethereum Foundation", correct: false },
          { text: "Dibagikan merata ke semua pemegang token ERC-20", correct: false },
        ],
        explanation: "EIP-1559 membakar 100% Base Fee untuk menyelaraskan insentif ekonomi jaringan dan mencegah validator memanipulasi pasar biaya dengan membuat transaksi palsu.",
      },
    ],
    practiceChallengeId: "vault-access",
    prevLesson: {
      unitSlug: "eth-fund-01-accounts-and-keys",
      lessonSlug: "eoa-vs-contract-accounts",
      title: "Anatomi Akun: EOA vs Contract Account",
    },
    nextLesson: {
      unitSlug: "eth-fund-03-evm-architecture",
      lessonSlug: "stack-memory-storage-calldata",
      title: "4 Kompartemen Data EVM & Ekspansi Memori Kuadratik",
    },
  },

  "stack-memory-storage-calldata": {
    id: "lesson-eth-fund-03-01",
    slug: "stack-memory-storage-calldata",
    unitSlug: "eth-fund-03-evm-architecture",
    trackSlug: "ethereum",
    title: "4 Kompartemen Data EVM & Ekspansi Memori Kuadratik",
    orderIndex: 1,
    estimatedMinutes: 30,
    learningObjectives: [
      "Membandingkan karakteristik 4 area data EVM: Stack, Memory, Storage, dan Calldata",
      "Menganalisis rumus quadratic gas cost pada ekspansi Memory",
    ],
    blocks: [
      {
        id: "block-evm-areas-intro",
        type: "text",
        body: `## 4 Area Data dalam Call Frame EVM

Saat smart contract dieksekusi, EVM menyediakan 4 lingkungan data terpisah dengan karakteristik dan biaya gas yang sangat berbeda:

1. **Stack:** Tumpukan LIFO 1024 item, 256-bit per slot. Sangat cepat dan murah (3 gas per operasi dasar).
2. **Calldata:** Ruang byte array *read-only* berisi argumen input panggilan transaksi. Sangat hemat gas.
3. **Memory:** Ruang memori sementara (*volatile*) yang dibersihkan setiap kali panggilan selesai. Biaya meningkat secara kuadratik jika ukurannya membesar!
4. **Storage:** Ruang persisten on-chain permanen ($2^{256}$ slot $\\times$ 32 byte). Komponen paling mahal di Ethereum (2.100 s/d 20.000 gas per penulisan)!`,
      },
      {
        id: "block-evm-sim",
        type: "simulation",
        simulationType: "evm-stack",
        title: "EVM Stack & Opcode Stepper Simulator",
      },
      {
        id: "block-quiz-evm",
        type: "quiz",
        question: "Mengapa parameter string atau array pada fungsi external lebih disarankan menggunakan kata kunci 'calldata' daripada 'memory'?",
        choices: [
          { text: "Karena calldata dapat dimutasi di dalam fungsi", correct: false },
          { text: "Karena calldata langsung membaca payload input tanpa menyalin ke memori baru, menghemat ribuan gas", correct: true },
          { text: "Karena calldata otomatis tersimpan permanen ke state storage blockchain", correct: false },
          { text: "Karena calldata menghapus batasan stack 1024 item", correct: false },
        ],
        explanation: "Keyword calldata mencegah EVM mengalokasikan slot memori baru dan menyalin byte string, memangkas biaya gas komputasi secara signifikan.",
      },
    ],
    practiceChallengeId: "vault-access",
    prevLesson: {
      unitSlug: "eth-fund-02-gas-and-eip1559",
      lessonSlug: "gas-units-and-eip1559-market",
      title: "Mekanisme Pasar Biaya: Base Fee & EIP-1559",
    },
    nextLesson: {
      unitSlug: "sol-core-01-types-and-storage-layout",
      lessonSlug: "storage-slot-packing-rules",
      title: "Aturan 32-Byte Slot Packing dan Optimasi Gas",
    },
  },

  "storage-slot-packing-rules": {
    id: "lesson-sol-core-01-01",
    slug: "storage-slot-packing-rules",
    unitSlug: "sol-core-01-types-and-storage-layout",
    trackSlug: "ethereum",
    title: "Aturan 32-Byte Slot Packing dan Optimasi Gas Solidity",
    orderIndex: 1,
    estimatedMinutes: 30,
    learningObjectives: [
      "Menyusun deklarasi variabel state agar dipadatkan ke dalam slot 32-byte sesedikit mungkin",
      "Memahami perbedaan biaya SSTORE vs Transient Storage (EIP-1153)",
    ],
    blocks: [
      {
        id: "block-packing-text",
        type: "text",
        body: `## Rahasia Menghemat 20,000 Gas dengan Storage Packing

Setiap slot penyimpanan permanen di Ethereum berukuran **32 byte (256 bit)**. Kompilator Solidity secara otomatis mengemas variabel state berurutan jika jumlah byte totalnya muat di dalam 32 byte.

Jika Anda salah menaruh urutan variabel, Anda akan memboroskan slot storage tambahan, yang masing-masing berharga **20.000 gas** saat penulisan pertama (\`SSTORE\`)!`,
      },
      {
        id: "block-packing-code",
        type: "code",
        language: "solidity",
        title: "Perbandingan Layout Buruk vs Layout Teroptimasi",
        code: `// BOROS GAS (3 Slot Storage Terpisah):
contract BadStorage {
    uint128 public a; // Slot 0 (16 byte terisi, 16 byte sisa kosong)
    uint256 public b; // Slot 1 (karena uint256 butuh 32 byte, lompat ke slot baru!)
    uint128 public c; // Slot 2 (16 byte terisi di slot ketiga)
}

// HEMAT GAS (HANYA 2 Slot Storage):
contract OptimizedStorage {
    uint128 public a; // Slot 0 (16 byte)
    uint128 public c; // Slot 0 (16 byte) -> Dikemas bersama 'a' menjadi tepat 32 byte!
    uint256 public b; // Slot 1 (32 byte)
}`,
      },
      {
        id: "block-packing-sim",
        type: "simulation",
        simulationType: "storage-packer",
        title: "Interactive 32-Byte Slot Box Visualizer",
      },
      {
        id: "block-quiz-packing",
        type: "quiz",
        question: "Berapa banyak slot 32-byte yang digunakan oleh: address owner; bool active; uint8 count; uint256 totalSupply;?",
        choices: [
          { text: "4 slot, karena ada 4 variabel", correct: false },
          { text: "2 slot, karena owner (20B) + bool (1B) + uint8 (1B) = 22B muat di Slot 0, lalu totalSupply di Slot 1", correct: true },
          { text: "1 slot, karena dikompres otomatis oleh EVM", correct: false },
          { text: "3 slot, karena boolean selalu membutuhkan slot tersendiri", correct: false },
        ],
        explanation: "Karena 20 + 1 + 1 = 22 byte (<= 32 byte), ketiganya muat di Slot 0. Variabel totalSupply (32 byte) tidak muat di sisa 10 byte, sehingga dialokasikan ke Slot 1. Total = 2 slot.",
      },
    ],
    practiceChallengeId: "vault-access",
    prevLesson: {
      unitSlug: "eth-fund-03-evm-architecture",
      lessonSlug: "stack-memory-storage-calldata",
      title: "4 Kompartemen Data EVM",
    },
    nextLesson: {
      unitSlug: "sol-core-02-functions-and-custom-errors",
      lessonSlug: "function-visibility-and-custom-errors",
      title: "Matriks Visibilitas & Custom Errors",
    },
  },

  "function-visibility-and-custom-errors": {
    id: "lesson-sol-core-02-01",
    slug: "function-visibility-and-custom-errors",
    unitSlug: "sol-core-02-functions-and-custom-errors",
    trackSlug: "ethereum",
    title: "Matriks Visibilitas & Transisi ke Deklarasi Custom Errors",
    orderIndex: 1,
    estimatedMinutes: 35,
    learningObjectives: [
      "Menentukan visibilitas fungsi external, public, internal, dan private yang tepat",
      "Mengganti require string dengan error CustomError() untuk memangkas ukuran bytecode",
    ],
    blocks: [
      {
        id: "block-custom-error-text",
        type: "text",
        body: `## Mengapa Menolak 'require(cond, "string")' di Solidity Modern?

Pada Solidity versi lama, developer menulis pengecekan error seperti ini:
\`\`\`solidity
require(msg.sender == owner, "Vault: caller is not the owner");
\`\`\`
Masalahnya: teks string *"Vault: caller is not the owner"* disimpan secara permanen di dalam bytecode kontrak Anda. Semakin panjang pesan error, semakin mahal biaya deployment kontrak!

### Cara Modern: Deklarasikan \`error CustomError()\`

Mulai Solidity 0.8.4+, gunakan deklarasi custom error:
\`\`\`solidity
error UnauthorizedAccount(address caller, address owner);

if (msg.sender != owner) {
    revert UnauthorizedAccount(msg.sender, owner);
}
\`\`\`
Custom error hanya menggunakan **4-byte selector**, memangkas ukuran bytecode dan menghemat ribuan gas saat eksekusi revert!`,
      },
      {
        id: "block-quiz-errors",
        type: "quiz",
        question: "Apa keuntungan utama menggunakan 'error CustomError()' daripada 'require(cond, string)'?",
        choices: [
          { text: "Custom error membuat transaksi tidak pernah bisa gagal", correct: false },
          { text: "Custom error mengkodekan error ke dalam 4-byte selector hash, menghemat bytecode deploy dan gas saat revert", correct: true },
          { text: "Custom error mengizinkan transfer ETH tanpa modifier payable", correct: false },
          { text: "Custom error secara otomatis menjalankan invariant testing", correct: false },
        ],
        explanation: "Custom error menghilangkan teks string dari bytecode kontrak dan hanya menggunakan 4-byte selector hash, menghemat biaya deploy dan gas eksekusi.",
      },
    ],
    practiceChallengeId: "vault-access",
    prevLesson: {
      unitSlug: "sol-core-01-types-and-storage-layout",
      lessonSlug: "storage-slot-packing-rules",
      title: "Aturan 32-Byte Slot Packing",
    },
    nextLesson: {
      unitSlug: "foundry-01-forge-unit-tests",
      lessonSlug: "foundry-project-setup-and-tests",
      title: "Struktur Proyek Forge & Unit Testing",
    },
  },

  "foundry-project-setup-and-tests": {
    id: "lesson-foundry-01-01",
    slug: "foundry-project-setup-and-tests",
    unitSlug: "foundry-01-forge-unit-tests",
    trackSlug: "ethereum",
    title: "Struktur Proyek Forge, Fixture setUp(), dan Assertion Testing",
    orderIndex: 1,
    estimatedMinutes: 30,
    learningObjectives: [
      "Menulis test suite dalam Solidity menggunakan forge-std Test contract",
      "Memahami isolasi state fungsi setUp() pada setiap unit test",
    ],
    blocks: [
      {
        id: "block-foundry-intro",
        type: "text",
        body: `## Selamat Tinggal JavaScript Test Suite yang Lambat!

Foundry dibangun menggunakan bahasa Rust. Seluruh pengujian ditulis langsung dalam bahasa **Solidity murni**. Tidak ada konversi BigNumber yang membingungkan atau konfigurasi Web3.js yang rapuh.

### Siklus Hidup Fixture \`setUp()\`

Setiap file test mewarisi \`Test\` dari \`forge-std\`. Fungsi \`setUp()\` dieksekusi ulang sebelum **setiap** fungsi \`test_*\` berjalan. Ini menjamin isolasi state mutlak: mutasi state di test A tidak akan pernah mengotori test B!`,
      },
      {
        id: "block-foundry-code",
        type: "code",
        language: "solidity",
        title: "Contoh Test File Forge (Vault.t.sol)",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {Vault} from "../src/Vault.sol";

contract VaultTest is Test {
    Vault public vault;
    address public alice = makeAddr("alice");

    function setUp() public {
        vault = new Vault();
        vm.deal(alice, 10 ether);
    }

    function test_AliceCanDeposit() public {
        vm.prank(alice);
        vault.deposit{value: 1 ether}();

        assertEq(vault.balanceOf(alice), 1 ether);
    }
}`,
      },
      {
        id: "block-quiz-foundry",
        type: "quiz",
        question: "Kapan fungsi setUp() dieksekusi di dalam Forge Test contract?",
        choices: [
          { text: "Hanya satu kali sebelum seluruh file test dijalankan", correct: false },
          { text: "Dijalankan ulang sebelum setiap fungsi test_* individual untuk menjamin isolasi state bersih", correct: true },
          { text: "Hanya dijalankan jika ada test yang gagal", correct: false },
          { text: "Dijalankan secara paralel tanpa urutan pasti", correct: false },
        ],
        explanation: "Fungsi setUp() bertindak sebagai fixture generator yang direset sebelum setiap fungsi test_* dieksekusi agar lingkungan pengujian selalu terisolasi dan deterministik.",
      },
    ],
    practiceChallengeId: "vault-access",
    prevLesson: {
      unitSlug: "sol-core-02-functions-and-custom-errors",
      lessonSlug: "function-visibility-and-custom-errors",
      title: "Matriks Visibilitas & Custom Errors",
    },
    nextLesson: {
      unitSlug: "sec-01-checks-effects-interactions",
      lessonSlug: "reentrancy-anatomy-and-cei",
      title: "Anatomi Reentrancy & Pola CEI",
    },
  },

  "reentrancy-anatomy-and-cei": {
    id: "lesson-sec-01-01",
    slug: "reentrancy-anatomy-and-cei",
    unitSlug: "sec-01-checks-effects-interactions",
    trackSlug: "ethereum",
    title: "Anatomi Kerentanan Reentrancy dan Penerapan Pola CEI Defensif",
    orderIndex: 1,
    estimatedMinutes: 40,
    learningObjectives: [
      "Menganalisis alur penyerahan kontrol eksekusi pada low-level call",
      "Menerapkan pola Checks-Effects-Interactions (CEI) untuk menggagalkan exploit reentrancy",
    ],
    blocks: [
      {
        id: "block-reentrancy-text",
        type: "text",
        body: `## Serangan Legendaris The DAO (2016)

Reentrancy adalah celah keamanan yang menyebabkan peretasan $60M pada The DAO dan memicu perpecahan hard fork Ethereum (ETH) dan Ethereum Classic (ETC).

### Mengapa Reentrancy Bisa Terjadi?

Saat kontrak mengirimkan ETH menggunakan \`call{value: amount}("")\`, kontrol eksekusi diserahkan sepenuhnya ke kontrak penerima. Jika kontrak Anda mengirim ETH **sebelum** mengurangi saldo di state storage, kontrak penyerang dapat memanggil ulang fungsi penarikan secara rekursif sebelum saldo pertama sempat diubah!`,
      },
      {
        id: "block-reentrancy-sim",
        type: "simulation",
        simulationType: "reentrancy-trace",
        title: "Recursive Reentrancy Call Trace Simulator",
      },
      {
        id: "block-cei-code",
        type: "code",
        language: "solidity",
        title: "Perbaikan Berbasis Checks-Effects-Interactions (CEI)",
        code: `// POLA CEI AMAN:
function withdraw() external {
    // 1. CHECKS
    uint256 bal = balances[msg.sender];
    if (bal == 0) revert InsufficientBalance();

    // 2. EFFECTS (Update saldo sebelum melakukan panggilan eksternal!)
    balances[msg.sender] = 0;

    // 3. INTERACTIONS (Interaksi dengan dunia luar)
    (bool sent, ) = msg.sender.call{value: bal}("");
    if (!sent) revert TransferFailed();
}`,
      },
      {
        id: "block-quiz-cei",
        type: "quiz",
        question: "Mengapa pola Checks-Effects-Interactions (CEI) mampu menggagalkan serangan reentrancy?",
        choices: [
          { text: "Karena CEI menonaktifkan transaksi transfer ether sepenuhnya", correct: false },
          { text: "Karena saldo internal telah dinolkan sebelum interaksi luar terjadi, sehingga pemanggilan rekursif kedua langsung gagal pada tahap Checks", correct: true },
          { text: "Karena CEI membatasi gas transfer menjadi maksimal 2.300 gas", correct: false },
          { text: "Karena CEI menggunakan enkripsi asimetris otomatis", correct: false },
        ],
        explanation: "Dengan memutasi saldo akun menjadi nol terlebih dahulu sebelum mentransfer ETH, jika penyerang mencoba memanggil ulang fungsi withdraw di fallback-nya, pemeriksaan bal == 0 akan langsung memicu revert, menggagalkan upaya pencurian dana.",
      },
    ],
    practiceChallengeId: "reentrancy-guard",
    prevLesson: {
      unitSlug: "foundry-01-forge-unit-tests",
      lessonSlug: "foundry-project-setup-and-tests",
      title: "Struktur Proyek Forge & Unit Testing",
    },
  },
};
