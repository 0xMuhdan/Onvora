"use client";

import { Info, AlertTriangle, AlertOctagon, CheckCircle2 } from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

interface CalloutBlockProps {
  variant?: "info" | "warning" | "danger" | "success";
  body: string;
}

export function CalloutBlock({ variant = "info", body }: CalloutBlockProps) {
  const styles = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/[0.07]",
      text: "text-blue-300",
      icon: <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />,
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/[0.07]",
      text: "text-amber-200",
      icon: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />,
    },
    danger: {
      border: "border-rose-500/30",
      bg: "bg-rose-500/[0.07]",
      text: "text-rose-200",
      icon: <AlertOctagon className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />,
    },
    success: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/[0.07]",
      text: "text-emerald-200",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />,
    },
  }[variant];

  return (
    <div
      className={cn(
        "my-6 flex items-start gap-3.5 rounded-2xl border p-4 sm:p-5 backdrop-blur-md",
        styles.border,
        styles.bg
      )}
    >
      {styles.icon}
      <div className={cn("flex-1 text-sm leading-relaxed", styles.text, typeClass("body"))}>
        {body}
      </div>
    </div>
  );
}
