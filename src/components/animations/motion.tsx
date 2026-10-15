"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

export interface MotionFadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function MotionFadeIn({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 24,
  className,
  ...props
}: MotionFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface MotionStaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function MotionStagger({
  children,
  staggerDelay = 0.08,
  className,
}: MotionStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
