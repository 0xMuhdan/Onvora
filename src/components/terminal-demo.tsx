"use client";
import { Terminal } from "@/components/ui/terminal";

export default function TerminalDemo({ className }: { className?: string }) {
  return (
    <div className="w-full">
      <Terminal
        username="onvora-macbook"
        className={className ?? "max-w-none px-0"}
        commands={[
          "onvora sandbox init --template vault-security",
          "forge test --match-contract VaultSecurityTest",
          "onvora ledger record --evidence-level B",
        ]}
        outputs={{
          0: [
            "[INFO] Menginisialisasi environment EVM Solidity 0.8.20...",
            "[INFO] Starter code & assertion test suite siap.",
          ],
          1: [
            "Running 2 tests for test/VaultSecurity.t.sol:VaultSecurityTest",
            "[PASS] test_OwnerCanWithdraw() (gas: 14210)",
            "[PASS] test_RevertWhen_NonOwnerWithdraws() (gas: 8240)",
            "Test result: ok. 2 passed; 0 failed; finished in 4.12ms",
          ],
          2: [
            "[PASS] Verifikasi lulus 8/8 Reality Check.",
            "[SUCCESS] Bukti kompetensi tercatat ke Evidence Ledger [LEVEL B].",
          ],
        }}
        typingSpeed={40}
        delayBetweenCommands={1200}
      />
    </div>
  );
}
