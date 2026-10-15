"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";
import type { QuizChoice } from "@/lib/curriculum-data";

interface QuizBlockProps {
  question: string;
  choices: QuizChoice[];
  explanation?: string;
  onPassed?: () => void;
}

export function QuizBlock({
  question,
  choices,
  explanation,
  onPassed,
}: QuizBlockProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selectedIndex !== null ? choices[selectedIndex]?.correct : false;

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    setSubmitted(true);
    if (choices[selectedIndex]?.correct && onPassed) {
      onPassed();
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelectedIndex(null);
  };

  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-[#0d0f17] p-5 sm:p-7 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3.5 mb-5">
        <HelpCircle className="h-5 w-5 text-[#8c97ff]" />
        <h4 className={cn("font-bold text-white text-base", typeClass("title"))}>
          Checkpoint Kuis Pemahaman
        </h4>
        <span className={cn("ml-auto rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono text-emerald-400", typeClass("micro"))}>
          WAJIB LULUS
        </span>
      </div>

      <div className={cn("text-neutral-200 font-medium mb-5 leading-relaxed", typeClass("body"))}>
        {question}
      </div>

      <div className="space-y-2.5">
        {choices.map((choice, idx) => {
          const isSelected = selectedIndex === idx;

          let optionStyle = "border-white/10 bg-white/[0.02] text-neutral-300 hover:border-white/20 hover:bg-white/[0.04]";
          if (isSelected) {
            optionStyle = "border-[#5e6ad2] bg-[#5e6ad2]/15 text-white font-medium";
          }
          if (submitted) {
            if (choice.correct) {
              optionStyle = "border-emerald-500/50 bg-emerald-500/15 text-emerald-200 font-medium";
            } else if (isSelected && !choice.correct) {
              optionStyle = "border-rose-500/50 bg-rose-500/15 text-rose-200";
            } else {
              optionStyle = "border-white/5 bg-transparent text-neutral-500 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={submitted}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "w-full text-left rounded-xl border p-3.5 sm:p-4 text-sm transition-all flex items-start gap-3",
                optionStyle
              )}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-mono mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-snug">{choice.text}</span>
            </button>
          );
        })}
      </div>

      {/* Action / Result Feedback */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {!submitted ? (
          <button
            type="button"
            disabled={selectedIndex === null}
            onClick={handleSubmit}
            className={cn(
              "w-full sm:w-auto rounded-full px-6 py-2.5 text-xs font-bold transition-all",
              selectedIndex !== null
                ? "bg-white text-black hover:bg-neutral-200 shadow-md cursor-pointer"
                : "bg-white/10 text-neutral-500 cursor-not-allowed"
            )}
          >
            Periksa Jawaban
          </button>
        ) : (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-400">
                      Jawaban Benar! Checkpoint Lolos.
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-rose-400" />
                    <span className="text-sm font-bold text-rose-400">
                      Kurang Tepat, silakan coba lagi.
                    </span>
                  </>
                )}
              </div>
              {!isCorrect && (
                <button
                  onClick={handleRetry}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-neutral-300 hover:text-white"
                >
                  Ulangi Kuis
                </button>
              )}
            </div>

            {explanation && (
              <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs text-neutral-300 leading-relaxed font-mono">
                💡 <strong>Penjelasan Teknis:</strong> {explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
