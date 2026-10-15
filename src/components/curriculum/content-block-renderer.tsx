"use client";

import { CalloutBlock } from "./callout-block";
import { CodeBlock } from "./code-block";
import { SimulationBlock } from "./simulation-block";
import { QuizBlock } from "./quiz-block";
import type { ContentBlock } from "@/lib/curriculum-data";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

interface ContentBlockRendererProps {
  block: ContentBlock;
  onQuizPassed?: () => void;
}

export function ContentBlockRenderer({
  block,
  onQuizPassed,
}: ContentBlockRendererProps) {
  switch (block.type) {
    case "text":
      return (
        <div
          className={cn(
            "my-6 prose prose-invert max-w-none text-neutral-300 leading-relaxed space-y-4",
            typeClass("body")
          )}
        >
          {/* Simple markdown-friendly line rendering */}
          {block.body?.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className={cn("text-xl sm:text-2xl font-bold text-white tracking-tight pt-4 pb-1", typeClass("title"))}
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className={cn("text-lg font-bold text-white tracking-tight pt-3", typeClass("title"))}
                >
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("|")) {
              // Simple markdown table parser
              const rows = paragraph.trim().split("\n");
              return (
                <div key={idx} className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.01]">
                  <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
                    <tbody>
                      {rows.map((row, rIdx) => {
                        if (row.includes("---")) return null;
                        const cols = row.split("|").filter((c, i, a) => i > 0 && i < a.length - 1);
                        const isHeader = rIdx === 0;
                        return (
                          <tr
                            key={rIdx}
                            className={cn(
                              "border-b border-white/5",
                              isHeader ? "bg-white/5 font-bold text-white" : "text-neutral-300 hover:bg-white/[0.02]"
                            )}
                          >
                            {cols.map((col, cIdx) => (
                              <td key={cIdx} className="p-3 whitespace-nowrap">
                                {col.trim()}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      );

    case "callout":
      return <CalloutBlock variant={block.variant} body={block.body || ""} />;

    case "code":
      return (
        <CodeBlock
          code={block.code || ""}
          language={block.language || "solidity"}
          title={block.title}
        />
      );

    case "simulation":
      return (
        <SimulationBlock
          type={block.simulationType || "eip1559-calc"}
          title={block.title}
        />
      );

    case "quiz":
      return (
        <QuizBlock
          question={block.question || ""}
          choices={block.choices || []}
          explanation={block.explanation}
          onPassed={onQuizPassed}
        />
      );

    default:
      return null;
  }
}
