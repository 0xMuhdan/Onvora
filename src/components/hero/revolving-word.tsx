"use client";

import { TextType } from "@/components/ui/text-type";

const WORDS = ["PROGRAMMING", "BUILDING", "LEARNING"] as const;

/**
 * Hero dynamic word with TextType effect — typing through:
 * 1. PROGRAMMING
 * 2. BUILDING
 * 3. LEARNING
 */
export function RevolvingHeroWord() {
  return (
    <span className="block">
      <span className="sr-only">
        PROGRAMMING, BUILDING &amp; LEARNING
      </span>
      <TextType
        text={[...WORDS]}
        as="span"
        className="hero-dynamic-word inline-block font-editorial font-semibold tracking-[0.12em] text-[#5e6ad2]"
        typingSpeed={80}
        pauseDuration={2000}
        deletingSpeed={45}
        showCursor={true}
        cursorCharacter="|"
        cursorClassName="text-[#5e6ad2] font-normal ml-1"
        loop={true}
      />
    </span>
  );
}

export default RevolvingHeroWord;
