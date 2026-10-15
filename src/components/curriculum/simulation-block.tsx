"use client";

import { useState } from "react";
import { Play, RotateCcw, Flame, Layers } from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

interface SimulationBlockProps {
  type?: "evm-stack" | "eip1559-calc" | "storage-packer" | "reentrancy-trace";
  title?: string;
}

export function SimulationBlock({
  type = "eip1559-calc",
  title,
}: SimulationBlockProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[#5e6ad2]/30 bg-[#0d0f17] p-5 sm:p-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <h4 className={cn("font-bold text-white tracking-wide text-sm sm:text-base", typeClass("title"))}>
            {title || "Interactive Simulation Sandbox"}
          </h4>
        </div>
        <span className={cn("rounded-md border border-[#5e6ad2]/20 bg-[#5e6ad2]/10 px-2.5 py-0.5 font-mono text-xs text-[#8c97ff]", typeClass("micro"))}>
          LIVE SIMULATION
        </span>
      </div>

      {type === "eip1559-calc" && <Eip1559Calculator />}
      {type === "evm-stack" && <EvmStackStepper />}
      {type === "storage-packer" && <StoragePackerVisualizer />}
      {type === "reentrancy-trace" && <ReentrancyTraceVisualizer />}
    </div>
  );
}

function Eip1559Calculator() {
  const [baseFee, setBaseFee] = useState<number>(25); // Gwei
  const [priorityFee, setPriorityFee] = useState<number>(2); // Gwei
  const [gasUsed, setGasUsed] = useState<number>(21000); // Gas Units (standard transfer)

  const effectiveFeePerGas = baseFee + priorityFee;
  const totalFeeGwei = effectiveFeePerGas * gasUsed;
  const totalFeeEth = totalFeeGwei / 1e9;
  const burnedEth = (baseFee * gasUsed) / 1e9;
  const validatorTipEth = (priorityFee * gasUsed) / 1e9;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Base Fee Slider */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
          <label className={cn("text-xs text-neutral-400 font-mono flex justify-between", typeClass("caption"))}>
            <span>Base Fee (Network):</span>
            <span className="text-white font-bold">{baseFee} Gwei</span>
          </label>
          <input
            type="range"
            min="5"
            max="150"
            value={baseFee}
            onChange={(e) => setBaseFee(Number(e.target.value))}
            className="w-full mt-2 accent-[#5e6ad2]"
          />
        </div>

        {/* Priority Fee Slider */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
          <label className={cn("text-xs text-neutral-400 font-mono flex justify-between", typeClass("caption"))}>
            <span>Priority Fee (Tip):</span>
            <span className="text-emerald-400 font-bold">{priorityFee} Gwei</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={priorityFee}
            onChange={(e) => setPriorityFee(Number(e.target.value))}
            className="w-full mt-2 accent-emerald-500"
          />
        </div>

        {/* Gas Used Selector */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
          <label className={cn("text-xs text-neutral-400 font-mono flex justify-between", typeClass("caption"))}>
            <span>Gas Used (Units):</span>
            <span className="text-blue-400 font-bold">{gasUsed.toLocaleString()}</span>
          </label>
          <div className="mt-2 flex gap-1.5">
            <button
              onClick={() => setGasUsed(21000)}
              className={cn("flex-1 text-[11px] py-1 rounded border font-mono", gasUsed === 21000 ? "border-[#5e6ad2] bg-[#5e6ad2]/20 text-white" : "border-white/5 text-neutral-400")}
            >
              21k (ETH)
            </button>
            <button
              onClick={() => setGasUsed(65000)}
              className={cn("flex-1 text-[11px] py-1 rounded border font-mono", gasUsed === 65000 ? "border-[#5e6ad2] bg-[#5e6ad2]/20 text-white" : "border-white/5 text-neutral-400")}
            >
              65k (ERC-20)
            </button>
            <button
              onClick={() => setGasUsed(185000)}
              className={cn("flex-1 text-[11px] py-1 rounded border font-mono", gasUsed === 185000 ? "border-[#5e6ad2] bg-[#5e6ad2]/20 text-white" : "border-white/5 text-neutral-400")}
            >
              185k (Swap)
            </button>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-rose-300">
              <Flame className="h-4 w-4 text-rose-400" />
              <span>ETH DIBURN (HANGUS):</span>
            </div>
            <div className="text-lg font-bold font-mono text-rose-200 mt-1">
              {burnedEth.toFixed(6)} ETH
            </div>
          </div>
          <span className="text-xs text-rose-400 font-mono">100% Base Fee</span>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-emerald-300">TOTAL BIAYA TRANSAKSI:</div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {totalFeeEth.toFixed(6)} ETH
            </div>
          </div>
          <div className="text-right text-xs text-neutral-400 font-mono">
            <div>Tip: {validatorTipEth.toFixed(6)} ETH</div>
            <div className="text-white font-medium">{effectiveFeePerGas} Gwei/gas</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EvmStackStepper() {
  const STEPS = [
    { opcode: "PUSH1 0x0A", desc: "Dorong angka 10 (0x0A) ke puncak stack", stack: ["0x0000...000A (10)"] },
    { opcode: "PUSH1 0x14", desc: "Dorong angka 20 (0x14) ke puncak stack", stack: ["0x0000...0014 (20)", "0x0000...000A (10)"] },
    { opcode: "ADD", desc: "Ambil 2 nilai teratas, jumlahkan (10 + 20), dorong hasilnya 30 (0x1E)", stack: ["0x0000...001E (30)"] },
    { opcode: "SSTORE", desc: "Tulis angka 30 ke Storage Slot 0", stack: [] },
  ];

  const [stepIndex, setStepIndex] = useState(0);

  const nextStep = () => {
    setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0));
  };

  const reset = () => setStepIndex(0);

  const current = STEPS[stepIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400 font-mono">
          Langkah {stepIndex + 1} dari {STEPS.length}: <strong className="text-white">{current.opcode}</strong>
        </span>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-neutral-400 hover:text-white"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
          <button
            onClick={nextStep}
            className="flex items-center gap-1 rounded-md bg-[#5e6ad2] px-3 py-1 text-xs font-semibold text-white hover:bg-[#6c78e0]"
          >
            <Play className="h-3 w-3" /> Step Forward
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs text-[#8c97ff]">
        &gt; {current.desc}
      </div>

      {/* Visual Stack Box */}
      <div className="rounded-xl border border-white/10 bg-[#08090b] p-4">
        <div className="text-xs text-neutral-500 font-mono mb-2 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-neutral-400" />
          <span>EVM STACK (1024 DEEP, 256-BIT):</span>
        </div>
        <div className="space-y-1.5 min-h-[90px] flex flex-col justify-end">
          {current.stack.length === 0 ? (
            <div className="text-center text-xs text-neutral-600 font-mono py-6">
              [Stack Kosong — Nilai telah disimpan ke Storage Slot]
            </div>
          ) : (
            current.stack.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-lg border px-3 py-2 font-mono text-xs flex justify-between items-center transition-all",
                  idx === 0
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-bold"
                    : "border-white/10 bg-white/[0.02] text-neutral-300"
                )}
              >
                <span>{item}</span>
                <span className="text-[10px] text-neutral-500">
                  {idx === 0 ? "TOP (SP)" : `INDEX ${idx}`}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StoragePackerVisualizer() {
  const [packed, setPacked] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400 font-mono">
          Mode Layout: <strong>{packed ? "Optimal (Packed)" : "Buruk (Unpacked)"}</strong>
        </span>
        <button
          onClick={() => setPacked(!packed)}
          className="rounded-md border border-[#5e6ad2]/40 bg-[#5e6ad2]/20 px-3 py-1 text-xs font-mono text-[#8c97ff] hover:bg-[#5e6ad2]/30"
        >
          Ganti ke Mode {packed ? "Unpacked" : "Packed"}
        </button>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {/* Slot 0 */}
        <div className="rounded-xl border border-white/10 bg-[#08090b] p-3">
          <div className="text-neutral-500 text-[11px] mb-2 flex items-center justify-between">
            <span>SLOT 0 (32 BYTE TOTAL)</span>
            <span className="text-emerald-400">{packed ? "32 / 32 Byte Terisi (100%)" : "16 / 32 Byte (16B Terbuang)"}</span>
          </div>
          <div className="flex gap-1 h-8 rounded-lg overflow-hidden border border-white/10 p-0.5 bg-black/30">
            <div className="bg-blue-500/30 border border-blue-400/40 rounded flex items-center justify-center text-[10px] text-blue-200 flex-1">
              uint128 a (16B)
            </div>
            {packed ? (
              <div className="bg-emerald-500/30 border border-emerald-400/40 rounded flex items-center justify-center text-[10px] text-emerald-200 flex-1">
                uint128 c (16B)
              </div>
            ) : (
              <div className="bg-white/5 border border-dashed border-white/10 rounded flex items-center justify-center text-[10px] text-neutral-600 flex-1">
                [KOSONG 16B]
              </div>
            )}
          </div>
        </div>

        {/* Slot 1 */}
        <div className="rounded-xl border border-white/10 bg-[#08090b] p-3">
          <div className="text-neutral-500 text-[11px] mb-2 flex items-center justify-between">
            <span>SLOT 1 (32 BYTE TOTAL)</span>
            <span className="text-purple-400">32 / 32 Byte Terisi</span>
          </div>
          <div className="flex gap-1 h-8 rounded-lg overflow-hidden border border-white/10 p-0.5 bg-black/30">
            <div className="bg-purple-500/30 border border-purple-400/40 rounded flex items-center justify-center text-[10px] text-purple-200 w-full">
              uint256 b (32 Byte Penuh)
            </div>
          </div>
        </div>

        {/* Slot 2 (Only in unpacked) */}
        {!packed && (
          <div className="rounded-xl border border-rose-500/30 bg-[#08090b] p-3">
            <div className="text-rose-400 text-[11px] mb-2 flex items-center justify-between">
              <span>SLOT 2 (SLOT TAMBAHAN PEMBOROS 20,000 GAS!)</span>
              <span className="text-rose-400">16 / 32 Byte</span>
            </div>
            <div className="flex gap-1 h-8 rounded-lg overflow-hidden border border-rose-500/20 p-0.5 bg-black/30">
              <div className="bg-rose-500/30 border border-rose-400/40 rounded flex items-center justify-center text-[10px] text-rose-200 flex-1">
                uint128 c (16B)
              </div>
              <div className="bg-white/5 border border-dashed border-white/10 rounded flex items-center justify-center text-[10px] text-neutral-600 flex-1">
                [KOSONG 16B]
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReentrancyTraceVisualizer() {
  const [step, setStep] = useState(0);

  const TRACES = [
    { actor: "Attacker", action: "Panggil Vault.withdraw(1 ETH)", color: "text-blue-400" },
    { actor: "Vault", action: "Periksa saldo penyerang (1 ETH > 0) -> Lolos!", color: "text-neutral-300" },
    { actor: "Vault", action: "Transfer 1 ETH via low-level msg.sender.call()", color: "text-amber-400" },
    { actor: "Attacker (Fallback)", action: "Terima 1 ETH -> Langsung panggil ulang Vault.withdraw() sebelum saldo diubah!", color: "text-rose-400" },
    { actor: "Vault (Rekursi 2)", action: "Periksa saldo lagi: MASIH 1 ETH karena baris balances=0 belum tereksekusi!", color: "text-rose-400" },
    { actor: "Attacker", action: "DANA BRANKAS TERKURAS HABIS!", color: "text-rose-500 font-bold" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400 font-mono">
          Step {step + 1} of {TRACES.length}:
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setStep(0)}
            className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-neutral-400 hover:text-white"
          >
            Reset
          </button>
          <button
            onClick={() => setStep((s) => (s < TRACES.length - 1 ? s + 1 : 0))}
            className="flex items-center gap-1 rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-500"
          >
            Trace Serangan &rarr;
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {TRACES.slice(0, step + 1).map((t, idx) => (
          <div
            key={idx}
            className={cn(
              "rounded-lg border px-3 py-2 font-mono text-xs flex items-center justify-between",
              idx === step ? "border-rose-500/50 bg-rose-500/10" : "border-white/5 bg-white/[0.02]"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-300">[{t.actor}]:</span>
              <span className={t.color}>{t.action}</span>
            </div>
            <span className="text-[10px] text-neutral-600 font-mono">Frame #{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
