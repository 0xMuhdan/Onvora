import type { ReactNode } from "react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "verified" | "pending" | "aging" | "critical";

const toneStyles: Record<BadgeTone, string> = {
  neutral: "border-white/10 bg-white/5 text-neutral-300",
  verified: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  aging: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  critical: "border-red-500/30 bg-red-500/10 text-red-400",
};

/**
 * Monochrome status badge — DESIGN.md §2.2.
 * Labels are bracketed technical text, sized with micro role from Fluid Functionalism.
 */
export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono font-medium",
        typeClass("micro"),
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
