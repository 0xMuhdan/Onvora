"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type EncryptedTextProps = {
  text: string;
  className?: string;
  /**
   * Time in milliseconds between revealing each subsequent real character.
   * Lower is faster. Defaults to 6ms per character for instant, snappy reveal.
   */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /**
   * Time in milliseconds between gibberish flips for unrevealed characters.
   * Lower is more jittery. Defaults to 30ms.
   */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters */
  revealedClassName?: string;
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}

/**
 * Deterministic character generator for SSR and initial hydration to prevent
 * hydration mismatch (server vs client Math.random disparity).
 */
function getDeterministicCharacter(
  originalChar: string,
  index: number,
  charset: string,
): string {
  if (originalChar === " ") return " ";
  const code = originalChar.charCodeAt(0);
  return charset.charAt((code + index * 17 + 31) % charset.length);
}

function generateInitialGibberish(
  original: string,
  charset: string,
): string[] {
  if (!original) return [];
  const result: string[] = [];
  for (let i = 0; i < original.length; i += 1) {
    const ch = original[i];
    result.push(getDeterministicCharacter(ch, i, charset));
  }
  return result;
}

function generateGibberishPreservingSpaces(
  original: string,
  charset: string,
): string[] {
  if (!original) return [];
  const result: string[] = [];
  for (let i = 0; i < original.length; i += 1) {
    const ch = original[i];
    result.push(ch === " " ? " " : generateRandomCharacter(charset));
  }
  return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 6,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 30,
  encryptedClassName = "text-muted-foreground font-mono",
  revealedClassName = "text-foreground",
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  // Start with revealCount progressing immediately so text is never stuck
  const [revealCount, setRevealCount] = useState<number>(0);
  const [scrambleChars, setScrambleChars] = useState<string[]>(() =>
    generateInitialGibberish(text, charset),
  );

  useEffect(() => {
    if (!text) return;

    let isCancelled = false;
    let animId: number | null = null;
    const startTime = performance.now();
    let lastFlipTime = startTime;
    let currentScramble = generateGibberishPreservingSpaces(text, charset);

    const update = (now: number) => {
      if (isCancelled) return;

      const elapsedMs = now - startTime;
      const totalLength = text.length;

      // Reveal characters in rapid progression (snappy 6ms per char)
      const currentReveal = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
      );

      setRevealCount(currentReveal);

      if (currentReveal >= totalLength) {
        return;
      }

      const timeSinceLastFlip = now - lastFlipTime;
      if (timeSinceLastFlip >= Math.max(1, flipDelayMs)) {
        const nextScramble = [...currentScramble];
        for (let i = currentReveal; i < totalLength; i += 1) {
          if (text[i] !== " ") {
            nextScramble[i] = generateRandomCharacter(charset);
          }
        }
        currentScramble = nextScramble;
        setScrambleChars(nextScramble);
        lastFlipTime = now;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      isCancelled = true;
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
    };
  }, [text, revealDelayMs, charset, flipDelayMs]);

  if (!text) return null;

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      aria-label={text}
      role="text"
      suppressHydrationWarning
    >
      {text.split("").map((char, index) => {
        const isRevealed = index < revealCount;
        const displayChar = isRevealed
          ? char
          : char === " "
            ? " "
            : (scrambleChars[index] ?? getDeterministicCharacter(char, index, charset));

        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
            suppressHydrationWarning
          >
            {displayChar}
          </span>
        );
      })}
    </span>
  );
};
