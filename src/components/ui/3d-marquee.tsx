"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { typeClass } from "@/lib/type-scale";

export interface MarqueeCardItem {
  id: string;
  title: string;
  chain: string;
  lang: string;
  badge: string;
  codeSnippet: string;
  status: string;
  accent?: string;
}

export interface ThreeDMarqueeProps {
  items?: MarqueeCardItem[];
  images?: string[];
  className?: string;
}

export function ThreeDMarquee({ items, images, className }: ThreeDMarqueeProps) {
  const totalCount = items?.length ?? images?.length ?? 0;
  const chunkSize = Math.max(1, Math.ceil(totalCount / 4));

  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    if (items) {
      return items.slice(start, start + chunkSize);
    }
    return images?.slice(start, start + chunkSize) ?? [];
  });

  return (
    <div
      className={cn(
        "relative mx-auto block h-[480px] sm:h-[540px] md:h-[600px] w-full overflow-hidden border border-rule-sharp bg-newsprint-sheet shadow-xs isolate",
        className,
      )}
      style={{
        contain: "paint",
        clipPath: "inset(0 round 0px)",
      }}
    >
      {/* Top & Bottom Vignette Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-newsprint-sheet via-newsprint-sheet/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-newsprint-sheet via-newsprint-sheet/80 to-transparent" />

      {/* 3D Isometric View Container */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div
          style={{
            transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",
          }}
          className="grid grid-cols-4 gap-6 sm:gap-8 scale-[0.68] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 origin-center"
        >
          {chunks.map((subarray, colIndex) => {
            const isEven = colIndex % 2 === 0;
            const animDuration = isEven ? "24s" : "30s";

            return (
              <div
                key={`col-${colIndex}`}
                style={{
                  animation: `${isEven ? "marquee-float-down" : "marquee-float-up"} ${animDuration} linear infinite alternate`,
                }}
                className="flex flex-col items-center gap-6"
              >
                {(subarray as (MarqueeCardItem | string)[]).map((item, idx) => {
                  if (typeof item === "string") {
                    return (
                      <div
                        key={`img-${colIndex}-${idx}`}
                        className="relative aspect-[970/700] w-64 sm:w-72 overflow-hidden border border-rule-sharp bg-newsprint-paper p-2 shadow-md transition-transform duration-300 hover:-translate-y-2"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item}
                          alt={`Ecosystem artifact ${idx + 1}`}
                          className="h-full w-full rounded-sm object-cover"
                        />
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      className="group relative w-64 sm:w-72 border border-rule-sharp bg-newsprint-paper p-4 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#5e6ad2] hover:shadow-xl"
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b border-rule-paper pb-2">
                        <span className={cn("font-mono font-bold text-[#5e6ad2]", typeClass("micro"))}>
                          {item.chain}
                        </span>
                        <span className={cn("border border-rule-sharp bg-newsprint-sheet px-1.5 py-0.5 font-mono font-semibold text-ink-primary", typeClass("micro"))}>
                          {item.badge}
                        </span>
                      </div>

                      {/* Title & Language */}
                      <h4 className={cn("mt-2.5 font-bold text-ink-primary group-hover:text-[#5e6ad2] transition-colors", typeClass("subtitle"))}>
                        {item.title}
                      </h4>
                      <p className={cn("mt-0.5 font-mono text-ink-secondary", typeClass("micro"))}>
                        Stack: {item.lang}
                      </p>

                      {/* Code Snippet Window */}
                      <div className={cn("mt-2.5 border border-rule-paper bg-[#0c0c0c] p-2 font-mono leading-relaxed text-emerald-400", typeClass("micro"))}>
                        <code>{item.codeSnippet}</code>
                      </div>

                      {/* Card Footer Status */}
                      <div className={cn("mt-2.5 flex items-center justify-between border-t border-rule-paper pt-2 font-mono text-ink-muted", typeClass("micro"))}>
                        <span>{item.status}</span>
                        <span className="text-[#5e6ad2] font-semibold">[VERIFIED]</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee-float-down {
              0% { transform: translateY(-40px); }
              100% { transform: translateY(80px); }
            }
            @keyframes marquee-float-up {
              0% { transform: translateY(60px); }
              100% { transform: translateY(-60px); }
            }
          `,
        }}
      />
    </div>
  );
}
