"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "solidity", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f12] shadow-2xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-neutral-400" />
          <span className={cn("text-neutral-300 font-mono text-xs font-medium", typeClass("caption"))}>
            {title || `${language.toUpperCase()} SNIPPET`}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
          title="Salin kode ke clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-mono">Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-neutral-400" />
              <span className="font-mono">Salin</span>
            </>
          )}
        </button>
      </div>

      {/* Code Pre Area */}
      <pre className="overflow-x-auto p-4 sm:p-5 text-[13px] font-mono leading-relaxed text-[#dcdfe4]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
