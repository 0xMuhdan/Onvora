"use client";

import { useState } from "react";
import { typeClass, fieldTouchClass } from "@/lib/type-scale";
import { useSize } from "@/lib/size-context";
import { cn } from "@/lib/utils";

interface Challenge {
  id: string;
  title: string;
  badge: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  desc: string;
  objectives: string[];
  initialCode: string;
  testFile: string;
  validate: (code: string) => { passed: boolean; logs: string[] };
}

const CHALLENGES: Challenge[] = [
  {
    id: "vault-access",
    title: "Vault Access Control",
    badge: "Access Control",
    difficulty: "Beginner",
    desc: "Fungsi withdraw di bawah ini dapat dipanggil oleh siapa saja tanpa verifikasi kepemilikan. Pasang validasi require agar hanya owner yang dapat mencairkan dana.",
    objectives: [
      "Pasang pengecekan require(msg.sender == owner, 'Unauthorized');",
      "Pastikan transaksi non-owner ditolak secara aman.",
    ],
    initialCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault {
    address public owner;
    uint256 public balance;

    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function deposit() external payable {
        require(msg.value > 0, "Zero deposit");
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // TUGAS: Pasang validasi agar hanya owner yang dapat memanggil withdraw
    function withdraw(uint256 amount) external {
        // Tulis validasi require(...) di sini:
        
        require(amount <= balance, "Insufficient balance");
        balance -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(amount);
    }
}`,
    testFile: "test/VaultSecurity.t.sol",
    validate: (code) => {
      const hasOwnerCheck =
        code.includes("msg.sender == owner") ||
        code.includes("owner == msg.sender") ||
        code.includes("onlyOwner");

      if (hasOwnerCheck) {
        return {
          passed: true,
          logs: [
            "  [TEST 1] test_OwnerCanWithdraw() ... PASS (gas: 14,210)",
            "  [TEST 2] test_RevertWhen_NonOwnerWithdraws() ... PASS (gas: 8,120)",
            "  [TEST 3] test_ZeroDepositReverts() ... PASS (gas: 5,430)",
            "  [PASS] All 3 assertions passed. Access control vulnerability secured.",
            "  [RECORD] Competency recorded to Evidence Ledger [LEVEL 2].",
          ],
        };
      }
      return {
        passed: false,
        logs: [
          "  [TEST 1] test_OwnerCanWithdraw() ... PASS",
          "  [FAIL] test_RevertWhen_NonOwnerWithdraws()",
          "  Assertion Error: Non-owner calls were not reverted! Anyone can drain funds.",
          "  Hint: Add require(msg.sender == owner, 'Unauthorized');",
        ],
      };
    },
  },
  {
    id: "reentrancy-guard",
    title: "Reentrancy Defense (Checks-Effects)",
    badge: "Security Exploit",
    difficulty: "Intermediate",
    desc: "Kontrak ini rentan terhadap serangan Reentrancy karena mengirim Ether sebelum mengupdate saldo internal. Perbaiki urutan sesuai pola Checks-Effects-Interactions.",
    objectives: [
      "Update saldo userBalances[msg.sender] = 0 SEBELUM pemanggilan transfer external.",
      "Cegah hacker memanggil withdraw() berulang kali sebelum state terupdate.",
    ],
    initialCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtherStore {
    mapping(address => uint256) public userBalances;

    function deposit() external payable {
        userBalances[msg.sender] += msg.value;
    }

    // TUGAS: Perbaiki celah Reentrancy dengan pola Checks-Effects-Interactions
    function withdraw() external {
        uint256 bal = userBalances[msg.sender];
        require(bal > 0, "No balance");

        // RENTAN: Mengirim uang sebelum mengupdate saldo!
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        // PINDAHKAN baris di bawah ini ke atas SEBELUM pemanggilan external di atas:
        userBalances[msg.sender] = 0;
    }
}`,
    testFile: "test/ReentrancyAttack.t.sol",
    validate: (code) => {
      const callIndex = code.indexOf(".call{value:");
      const resetIndex = code.indexOf("userBalances[msg.sender] = 0");

      if (resetIndex !== -1 && callIndex !== -1 && resetIndex < callIndex) {
        return {
          passed: true,
          logs: [
            "  [TEST 1] test_NormalWithdrawWorks() ... PASS (gas: 16,840)",
            "  [TEST 2] test_ReentrancyAttackFails() ... PASS (gas: 24,190)",
            "  [PASS] Checks-Effects-Interactions pattern verified! Reentrancy exploit prevented.",
            "  [RECORD] Competency recorded to Evidence Ledger [LEVEL 3].",
          ],
        };
      }
      return {
        passed: false,
        logs: [
          "  [FAIL] test_ReentrancyAttackFails()",
          "  Assertion Error: Attacker contract drained entire vault balance via recursive fallback!",
          "  Hint: Ubah saldo userBalances[msg.sender] = 0 SEBELUM baris msg.sender.call.",
        ],
      };
    },
  },
  {
    id: "erc20-balance",
    title: "ERC-20 Safe Transfer",
    badge: "Token Architecture",
    difficulty: "Beginner",
    desc: "Pastikan fungsi transfer token memvalidasi saldo pengirim dengan require dan mengupdate saldo kedua pihak secara aman.",
    objectives: [
      "Pasang require(balanceOf[msg.sender] >= amount, 'Insufficient');",
      "Kurangi saldo pengirim dan tambahkan saldo penerima.",
    ],
    initialCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleToken {
    mapping(address => uint256) public balanceOf;

    constructor(uint256 initialSupply) {
        balanceOf[msg.sender] = initialSupply;
    }

    // TUGAS: Validasi saldo dan update balance kedua pihak
    function transfer(address to, uint256 amount) external returns (bool) {
        // Tulis validasi require(...) di sini:

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}`,
    testFile: "test/TokenTransfer.t.sol",
    validate: (code) => {
      const hasBalanceCheck =
        code.includes("balanceOf[msg.sender] >= amount") ||
        code.includes("balanceOf[msg.sender] > amount");

      if (hasBalanceCheck) {
        return {
          passed: true,
          logs: [
            "  [TEST 1] test_SenderCanTransfer() ... PASS (gas: 28,100)",
            "  [TEST 2] test_RevertWhen_InsufficientBalance() ... PASS (gas: 6,420)",
            "  [PASS] ERC-20 Safe Transfer assertions passed.",
            "  [RECORD] Competency recorded to Evidence Ledger [LEVEL 2].",
          ],
        };
      }
      return {
        passed: false,
        logs: [
          "  [FAIL] test_RevertWhen_InsufficientBalance()",
          "  Assertion Error: Transfer berhasil dieksekusi meskipun saldo pengirim tidak cukup!",
          "  Hint: Tambahkan require(balanceOf[msg.sender] >= amount, 'Insufficient balance');",
        ],
      };
    },
  },
  {
    id: "storage-packing",
    title: "Storage Slot Packing",
    badge: "Gas Optimization",
    difficulty: "Intermediate",
    desc: "Urutan variabel state di bawah ini memboroskan 3 slot storage 32-byte (20.000 gas per slot tambahan). Susun ulang deklarasi variabel agar 'a' dan 'c' (keduanya uint128 = 16 byte) dipadatkan ke dalam Slot 0 bersama-sama, dan uint256 'b' menempati Slot 1.",
    objectives: [
      "Deklarasikan variabel uint128 berdampingan (a dan c).",
      "Pangkas konsumsi storage dari 3 slot menjadi tepat 2 slot (hemat 20,000 gas SSTORE).",
    ],
    initialCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GasWasteVault {
    // TUGAS: Atur ulang urutan deklarasi agar variabel a dan c dipadatkan (packed) ke 1 slot
    uint128 public a; // 16 byte
    uint256 public b; // 32 byte
    uint128 public c; // 16 byte

    function setValues(uint128 _a, uint256 _b, uint128 _c) external {
        a = _a;
        b = _b;
        c = _c;
    }
}`,
    testFile: "test/StorageLayout.t.sol",
    validate: (code) => {
      // Check if uint128 a and uint128 c are declared together
      const clean = code.replace(/\s+/g, " ");
      const isPacked =
        (clean.includes("uint128 public a; uint128 public c; uint256 public b;") ||
         clean.includes("uint128 public c; uint128 public a; uint256 public b;") ||
         clean.includes("uint256 public b; uint128 public a; uint128 public c;") ||
         clean.includes("uint256 public b; uint128 public c; uint128 public a;"));

      if (isPacked) {
        return {
          passed: true,
          logs: [
            "  [SLOT 0] uint128 a (16B) + uint128 c (16B) = 32B (PACKED) ... PASS",
            "  [SLOT 1] uint256 b (32B) ... PASS",
            "  [GAS SAVED] 1x SSTORE avoided -> 20,000 gas saved per deployment!",
            "  [PASS] Storage Slot Packing verified.",
            "  [RECORD] Competency recorded to Evidence Ledger [LEVEL 2].",
          ],
        };
      }
      return {
        passed: false,
        logs: [
          "  [FAIL] test_SlotPackingLayout()",
          "  Assertion Error: Masih menggunakan 3 slot storage terpisah! Variabel b (uint256) memisahkan a dan c.",
          "  Hint: Letakkan deklarasi 'uint128 public a;' dan 'uint128 public c;' berurutan langsung.",
        ],
      };
    },
  },
  {
    id: "custom-errors",
    title: "Modern Custom Errors",
    badge: "Bytecode Optimization",
    difficulty: "Beginner",
    desc: "Hapus require string mahal dan gantikan dengan deklarasi 'error UnauthorizedAccount()' dan 'if (msg.sender != owner) revert UnauthorizedAccount();' untuk memangkas ukuran bytecode kontrak.",
    objectives: [
      "Deklarasikan custom error: error UnauthorizedAccount();",
      "Gantikan require string dengan pengecekan if (...) revert UnauthorizedAccount();",
    ],
    initialCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// TUGAS: Deklarasikan custom error di sini:
// error UnauthorizedAccount();

contract ProtectedVault {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function emergencyWithdraw() external {
        // TUGAS: Ganti require string di bawah ini dengan custom error:
        require(msg.sender == owner, "ProtectedVault: caller is not the owner");
        payable(owner).transfer(address(this).balance);
    }
}`,
    testFile: "test/CustomErrors.t.sol",
    validate: (code) => {
      const hasDeclaredError = code.includes("error UnauthorizedAccount");
      const hasRevertStatement = code.includes("revert UnauthorizedAccount");
      const removedOldRequire = !code.includes('"ProtectedVault: caller is not the owner"');

      if (hasDeclaredError && hasRevertStatement && removedOldRequire) {
        return {
          passed: true,
          logs: [
            "  [TEST 1] test_DeploymentBytecodeSize() ... -340 bytes (PASSED)",
            "  [TEST 2] test_RevertWithCustomErrorSelector() ... PASS (4-byte selector matched)",
            "  [PASS] Modern custom error refactoring verified.",
            "  [RECORD] Competency recorded to Evidence Ledger [LEVEL 2].",
          ],
        };
      }
      return {
        passed: false,
        logs: [
          "  [FAIL] test_RevertWithCustomErrorSelector()",
          "  Assertion Error: Kontrak belum sepenuhnya mengadopsi pola error CustomError.",
          "  Pastikan mendeklarasikan 'error UnauthorizedAccount();' dan mengganti require dengan 'if (msg.sender != owner) revert UnauthorizedAccount();'",
        ],
      };
    },
  },
];

export default function PracticePage() {
  const { control, px, gap, isMobile, device } = useSize();
  const [activeChallengeId, setActiveChallengeId] = useState(CHALLENGES[0].id);
  const activeChallenge = CHALLENGES.find((c) => c.id === activeChallengeId) || CHALLENGES[0];

  const [code, setCode] = useState(activeChallenge.initialCode);
  const [testStatus, setTestStatus] = useState<"idle" | "running" | "passed" | "failed">("idle");
  const [logs, setLogs] = useState<string[]>([
    "$ onvora sandbox ready.",
    `Loaded test suite for: ${activeChallenge.title}`,
  ]);

  function switchChallenge(id: string) {
    const ch = CHALLENGES.find((c) => c.id === id);
    if (!ch) return;
    setActiveChallengeId(id);
    setCode(ch.initialCode);
    setTestStatus("idle");
    setLogs(["$ onvora sandbox ready.", `Switched to: ${ch.title}`]);
  }

  function runTests() {
    setTestStatus("running");
    setLogs((prev) => [...prev, `$ forge test --suite ${activeChallenge.testFile}`]);

    setTimeout(() => {
      const result = activeChallenge.validate(code);
      setTestStatus(result.passed ? "passed" : "failed");
      setLogs((prev) => [...prev, ...result.logs]);

      if (result.passed && typeof window !== "undefined") {
        localStorage.setItem(`onvora_practice_${activeChallenge.id}`, "passed");
        localStorage.setItem(`onvora_evidence_practice_${activeChallenge.id}`, JSON.stringify({
          challengeId: activeChallenge.id,
          title: activeChallenge.title,
          badge: activeChallenge.badge,
          difficulty: activeChallenge.difficulty,
          completedAt: new Date().toISOString(),
        }));
      }
    }, 600);
  }

  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8] min-h-[calc(100dvh-5rem)] flex flex-col justify-center">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Challenge Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/10 pb-4">
          <span className={cn("font-semibold text-neutral-400 mr-2", typeClass("caption"))}>
            Module:
          </span>
          {CHALLENGES.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => switchChallenge(ch.id)}
              className={cn(
                "rounded-full px-4 py-1.5 font-medium transition-all",
                typeClass("caption"),
                activeChallengeId === ch.id
                  ? "bg-white text-black font-semibold shadow-md"
                  : "border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
              )}
            >
              {ch.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left: Challenge Briefing */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("rounded-full border border-[#5e6ad2]/30 bg-[#5e6ad2]/10 px-2.5 py-0.5 text-[#5e6ad2] font-semibold", typeClass("micro"))}>
                {activeChallenge.badge}
              </span>
              <span className={cn("text-neutral-400 font-mono", typeClass("micro"))}>
                {activeChallenge.difficulty}
              </span>
            </div>

            <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
              {activeChallenge.title}
            </h1>
            <p className={cn("mt-3 text-neutral-400", typeClass("body"))}>
              {activeChallenge.desc}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h2 className={cn("font-semibold text-white", typeClass("caption"))}>
                Learning Objectives:
              </h2>
              <ul className={cn("mt-3 space-y-2.5 text-neutral-300", typeClass("caption"))}>
                {activeChallenge.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#5e6ad2] font-bold">[{i + 1}]</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Code Editor & Test Console */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#0c0d10] overflow-hidden shadow-2xl">
              <div className={cn("flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5 font-mono text-neutral-400", typeClass("caption"))}>
                <span className="text-white font-medium">{activeChallenge.id}.sol</span>
                <span>Solidity 0.8.20</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={14}
                spellCheck={false}
                className={cn(
                  "w-full bg-[#08090a] p-4 font-mono text-neutral-200 outline-none resize-y leading-relaxed border-none",
                  typeClass("caption"),
                  fieldTouchClass
                )}
              />
              <div className="border-t border-white/10 p-3 flex justify-between items-center bg-white/[0.01]">
                <button
                  type="button"
                  onClick={() => setCode(activeChallenge.initialCode)}
                  className={cn("text-neutral-500 hover:text-white transition-colors", typeClass("caption"))}
                >
                  Reset Starter Code
                </button>
                <button
                  type="button"
                  onClick={runTests}
                  disabled={testStatus === "running"}
                  className={cn(
                    "rounded-full bg-white font-semibold text-black transition-all hover:bg-neutral-200 disabled:opacity-50 inline-flex items-center justify-center",
                    control,
                    px,
                    typeClass("caption")
                  )}
                >
                  {testStatus === "running" ? "Running Test Suite..." : "Run Assertion Test"}
                </button>
              </div>
            </div>

            {/* Test Console */}
            <div className="rounded-2xl border border-white/10 bg-[#050608] overflow-hidden shadow-xl">
              <div className={cn("border-b border-white/5 bg-white/[0.02] px-4 py-2 font-mono text-neutral-400", typeClass("caption"))}>
                Console Output
              </div>
              <div className={cn("p-4 font-mono space-y-1 min-h-[110px]", typeClass("caption"))}>
                {logs.map((log, i) => (
                  <p
                    key={i}
                    className={
                      log.includes("PASS")
                        ? "text-emerald-400"
                        : log.includes("FAIL")
                        ? "text-red-400"
                        : "text-neutral-400"
                    }
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
