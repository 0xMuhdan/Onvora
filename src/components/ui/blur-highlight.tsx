"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface HighlightBitObject {
  text: string;
  occurrence?: number;
}

export type HighlightBit = string | HighlightBitObject;

export interface BlurHighlightProps {
  children: string;
  highlightedBits?: HighlightBit[];
  highlightColor?: string;
  highlightClassName?: string;
  blurAmount?: number;
  inactiveOpacity?: number;
  blurDelay?: number;
  blurDuration?: number;
  highlightDelay?: number;
  highlightDuration?: number;
  highlightDirection?: "left" | "right" | "top" | "bottom";
  viewportOptions?: { once?: boolean; amount?: number };
  className?: string;
}

export function BlurHighlight({
  children,
  highlightedBits = [],
  highlightColor = "rgba(17, 17, 17, 0.08)",
  highlightClassName,
  blurAmount = 8,
  inactiveOpacity = 0.3,
  blurDelay = 0.1,
  blurDuration = 0.8,
  highlightDelay = 0.4,
  highlightDuration = 0.9,
  highlightDirection = "left",
  viewportOptions = { once: true, amount: 0.3 },
  className,
}: BlurHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (viewportOptions.once) {
            observer.disconnect();
          }
        } else if (!viewportOptions.once) {
          setIsInView(false);
        }
      },
      {
        threshold: viewportOptions.amount ?? 0.3,
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [viewportOptions.once, viewportOptions.amount]);

  // Parse children string and match highlightedBits
  const segments = useMemo(() => {
    if (!children || typeof children !== "string") {
      return [{ text: children || "", isHighlight: false }];
    }

    const bitStrings = highlightedBits.map((b) =>
      typeof b === "string" ? b : b.text,
    );

    if (bitStrings.length === 0) {
      return [{ text: children, isHighlight: false }];
    }

    // Escape regex characters
    const escaped = bitStrings.map((s) =>
      s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    );
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");

    const parts = children.split(regex);
    return parts.map((part) => ({
      text: part,
      isHighlight: bitStrings.some(
        (b) => b.toLowerCase() === part.toLowerCase(),
      ),
    }));
  }, [children, highlightedBits]);

  return (
    <div
      ref={containerRef}
      className={cn("transition-all ease-out", className)}
      style={{
        filter: isInView ? "blur(0px)" : `blur(${blurAmount}px)`,
        opacity: isInView ? 1 : inactiveOpacity,
        transitionDuration: `${blurDuration}s`,
        transitionDelay: `${blurDelay}s`,
      }}
    >
      {segments.map((segment, idx) => {
        if (!segment.isHighlight) {
          return <span key={idx}>{segment.text}</span>;
        }

        return (
          <span
            key={idx}
            className={cn(
              "relative inline-block font-semibold transition-all ease-out",
              highlightClassName,
            )}
            style={{
              backgroundImage: `linear-gradient(to right, ${highlightColor}, ${highlightColor})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: highlightDirection === "right" ? "right center" : "left center",
              backgroundSize: isInView ? "100% 100%" : "0% 100%",
              transitionDuration: `${highlightDuration}s`,
              transitionDelay: `${highlightDelay}s`,
              padding: "0.08em 0.3em",
              margin: "0 0.1em",
              borderRadius: "2px",
            }}
          >
            {segment.text}
          </span>
        );
      })}
    </div>
  );
}
