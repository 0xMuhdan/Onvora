"use client";

import { useState } from "react";
import { SizeProvider, useSize, type SizeVariant } from "@/lib/size-context";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

function SizeControlsDemo({ forcedSize }: { forcedSize?: SizeVariant }) {
  const { variant, control, controlHeight, gap, px, segmentPad, segmentItem, text, field, icon } =
    useSize(forcedSize);

  return (
    <div className="rounded-xl border border-white/10 bg-[#08090a] p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
        <span className={cn("font-bold text-white", typeClass("caption"))}>
          Step: <span className="text-[#5e6ad2] uppercase">{variant}</span> ({controlHeight}px controls)
        </span>
        <span className={cn("font-mono text-neutral-500", typeClass("micro"))}>
          gap: {gap} &middot; icon: {icon}px &middot; pad: {px}
        </span>
      </div>

      <div className={cn("flex flex-wrap items-center", gap)}>
        {/* Button control on the ladder */}
        <button
          type="button"
          className={cn(
            "rounded-md bg-white font-semibold text-black transition-all hover:bg-neutral-200 inline-flex items-center justify-center",
            control,
            px,
            text
          )}
        >
          <svg
            className="mr-1.5"
            width={icon}
            height={icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Run Test
        </button>

        {/* Input control on the ladder */}
        <input
          type="text"
          defaultValue="0x7f4b...9e12"
          readOnly
          className={cn(
            "rounded-md border border-white/10 bg-white/5 text-neutral-200 focus:outline-hidden",
            control,
            px,
            field
          )}
        />

        {/* Segmented control tabs on the ladder */}
        <div className={cn("inline-flex rounded-lg border border-white/10 bg-white/[0.03]", segmentPad, gap)}>
          <button
            type="button"
            className={cn(
              "rounded-md bg-white/15 font-semibold text-white inline-flex items-center justify-center px-2.5",
              segmentItem,
              text
            )}
          >
            Solidity
          </button>
          <button
            type="button"
            className={cn(
              "rounded-md text-neutral-400 hover:text-white inline-flex items-center justify-center px-2.5",
              segmentItem,
              text
            )}
          >
            Rust
          </button>
        </div>
      </div>
    </div>
  );
}

export function SizesPreview() {
  const { device, isMobile, isTablet, isDesktop, isTouch } = useSize();
  const [activeStep, setActiveStep] = useState<SizeVariant>("default");

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#0c0d10] p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className={cn("font-mono text-emerald-400 font-bold", typeClass("micro"))}>
            ● FLUID FUNCTIONALISM SIZES SYSTEM
          </span>
          <h2 className={cn("mt-1 font-bold text-white tracking-tight", typeClass("title"))}>
            Adaptive Device &amp; Two-Step Control Ladder
          </h2>
        </div>

        {/* Device Detection Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 font-mono font-semibold",
              typeClass("micro"),
              isMobile
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : isTablet
                ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                : "border-sky-500/40 bg-sky-500/10 text-sky-400"
            )}
          >
            Device: {device.toUpperCase()}
          </span>

          <span className={cn("rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-neutral-300", typeClass("micro"))}>
            Pointer: {isTouch ? "Touch (Coarse)" : "Mouse (Fine)"}
          </span>
        </div>
      </div>

      <p className={cn("mt-4 text-neutral-300", typeClass("body"))}>
        Dua anak tangga ukuran terkoordinasi (<strong>Default 36px</strong> dan <strong>Compact 28px</strong>). Seluruh dimensi menyusut proporsional secara bersamaan (tinggi kontrol, line box, ukuran font, padding horizontal, icon, dan celah antar-kontrol).
      </p>

      {/* Adaptive device policy notice */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <h4 className={cn("font-semibold text-white", typeClass("subtitle"))}>
          Kebijakan Adaptasi Berbasis Perangkat:
        </h4>
        <ul className={cn("mt-2 space-y-1.5 text-neutral-400", typeClass("caption"))}>
          <li className="flex items-center gap-2">
            <span className="text-[#5e6ad2] font-bold">&bull;</span>
            <span><strong>Mobile (&lt; 768px):</strong> Secara otomatis mengutamakan <strong>Default 36px</strong> untuk memastikan kenyamanan target sentuh (ergonomi jari), serta menambahkan <code className="text-white">fieldTouchClass</code> (16px) untuk mencegah auto-zoom iOS Safari.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#5e6ad2] font-bold">&bull;</span>
            <span><strong>Tablet (768px - 1024px):</strong> Menyesuaikan responsif antara kemudahan sentuh dan kepadatan antarmuka.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#5e6ad2] font-bold">&bull;</span>
            <span><strong>Desktop (&ge; 1024px):</strong> Mengizinkan mode <strong>Compact 28px</strong> untuk toolbar rapat, console terminal, dan spreadsheet data tanpa desak-desakan.</span>
          </li>
        </ul>
      </div>

      {/* Interactive Switcher */}
      <div className="mt-6 flex items-center justify-between">
        <span className={cn("font-semibold text-neutral-300", typeClass("caption"))}>
          Uji Coba Langsung di Browser:
        </span>
        <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 gap-1">
          <button
            type="button"
            onClick={() => setActiveStep("default")}
            className={cn(
              "rounded-md px-3 py-1 font-semibold transition-all",
              typeClass("caption"),
              activeStep === "default"
                ? "bg-white text-black shadow-sm"
                : "text-neutral-400 hover:text-white"
            )}
          >
            Default (36px)
          </button>
          <button
            type="button"
            onClick={() => setActiveStep("compact")}
            className={cn(
              "rounded-md px-3 py-1 font-semibold transition-all",
              typeClass("caption"),
              activeStep === "compact"
                ? "bg-white text-black shadow-sm"
                : "text-neutral-400 hover:text-white"
            )}
          >
            Compact (28px)
          </button>
        </div>
      </div>

      {/* Live Demo Container */}
      <div className="mt-4">
        <SizeProvider size={activeStep} adaptive={false}>
          <SizeControlsDemo />
        </SizeProvider>
      </div>
    </div>
  );
}
