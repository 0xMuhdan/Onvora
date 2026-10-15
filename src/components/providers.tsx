"use client";

import { MotionConfig } from "motion/react";
import { SizeProvider } from "@/lib/size-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SizeProvider>
        {children}
      </SizeProvider>
    </MotionConfig>
  );
}
