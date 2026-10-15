"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CircleItem {
  id?: string;
  image?: string;
  alt?: string;
  label?: string;
  role?: string;
  badge?: string;
  accent?: string;
}

export type CircleRowItem = string | CircleItem;

export interface CirclesProps {
  /**
   * Array of concentric rings. Each row creates an orbital ring
   * with evenly distributed items along its circumference.
   */
  rows: CircleRowItem[][];
  /**
   * Content rendered at the center of the concentric circles.
   */
  centerContent?: React.ReactNode;
  /**
   * Base radius in pixels for the innermost ring. Default: 110
   */
  baseRadius?: number;
  /**
   * Distance in pixels added to each subsequent concentric ring. Default: 80
   */
  radiusStep?: number;
  /**
   * Rotation duration in seconds for the innermost ring. Default: 32
   */
  baseDuration?: number;
  /**
   * Additional duration in seconds added to each subsequent ring (staggered speed). Default: 10
   */
  additionalDuration?: number;
  /**
   * Size of each orbiting circle in pixels. Default: 50
   */
  circleSize?: number;
  /**
   * Whether rotation direction alternates between adjacent rings. Default: true
   */
  alternateDirection?: boolean;
  /**
   * Pause rotation animation on hover. Default: true
   */
  pauseOnHover?: boolean;
  /**
   * Whether to display the circular orbit path ring. Default: true
   */
  showPaths?: boolean;
  /**
   * Enable depth of field fade (outer rings subtly lower opacity). Default: true
   */
  depthFade?: boolean;
  className?: string;
}

export function Circles({
  rows,
  centerContent,
  baseRadius = 110,
  radiusStep = 80,
  baseDuration = 32,
  additionalDuration = 10,
  circleSize = 52,
  alternateDirection = true,
  pauseOnHover = true,
  showPaths = true,
  depthFade = true,
  className,
}: CirclesProps) {
  const compId = useId().replace(/:/g, "-");
  const [hoveredItem, setHoveredItem] = useState<{
    item: CircleItem;
  } | null>(null);

  // Maximum dimension needed to contain all rings comfortably
  const maxRadius = baseRadius + (rows.length - 1) * radiusStep;
  const containerSize = (maxRadius + circleSize / 2 + 20) * 2;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden select-none",
        className
      )}
      style={{
        width: "100%",
        maxWidth: `${containerSize}px`,
        height: `${containerSize}px`,
        minHeight: "420px",
      }}
      suppressHydrationWarning
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-[#5e6ad2]/15 blur-3xl" />
        <div className="h-[450px] w-[450px] rounded-full bg-[#4355ec]/10 blur-[130px]" />
      </div>

      {/* Centerpiece element */}
      {centerContent && (
        <div className="relative z-20 flex items-center justify-center pointer-events-auto">
          {centerContent}
        </div>
      )}

      {/* Render concentric orbital rings */}
      {rows.map((rowItems, rowIndex) => {
        const radius = baseRadius + rowIndex * radiusStep;
        const duration = baseDuration + rowIndex * additionalDuration;
        const isReversed = alternateDirection && rowIndex % 2 === 1;
        const ringAnimName = `circles-spin-${compId}-${rowIndex}`;
        const counterAnimName = `circles-counter-spin-${compId}-${rowIndex}`;
        const diameter = radius * 2;

        // Depth of field calculation: outer rings fade subtly as on React Bits
        const isOutermost = rowIndex === rows.length - 1;
        const isSecondOuter = rowIndex === rows.length - 2;
        const ringOpacity = depthFade
          ? isOutermost
            ? "opacity-60 hover:opacity-100"
            : isSecondOuter
            ? "opacity-80 hover:opacity-100"
            : "opacity-100"
          : "opacity-100";

        return (
          <div
            key={`ring-${rowIndex}`}
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300",
              ringOpacity
            )}
            style={{
              width: `${diameter}px`,
              height: `${diameter}px`,
            }}
            suppressHydrationWarning
          >
            {/* Concentric visual orbit path line */}
            {showPaths && (
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none"
                viewBox={`0 0 ${diameter} ${diameter}`}
              >
                <circle
                  cx={radius}
                  cy={radius}
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              </svg>
            )}

            {/* Rotating wrapper */}
            <div
              className={cn(
                "absolute inset-0 h-full w-full rounded-full transition-transform",
                pauseOnHover && "hover:[animation-play-state:paused]"
              )}
              style={{
                animation: `${ringAnimName} ${duration}s linear infinite`,
              }}
            >
              {rowItems.map((rawItem, itemIndex) => {
                const item: CircleItem =
                  typeof rawItem === "string"
                    ? { id: `item-${rowIndex}-${itemIndex}`, image: rawItem }
                    : rawItem;

                const angle = (itemIndex / rowItems.length) * 2 * Math.PI;
                // Position around the circle: center (radius, radius)
                // Use integer pixel rounding so SSR string matches client exact string
                const x = Math.round(radius + radius * Math.cos(angle) - circleSize / 2);
                const y = Math.round(radius + radius * Math.sin(angle) - circleSize / 2);

                return (
                  <div
                    key={item.id ?? `item-${rowIndex}-${itemIndex}`}
                    className="pointer-events-auto absolute group"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      width: `${circleSize}px`,
                      height: `${circleSize}px`,
                    }}
                    suppressHydrationWarning
                    onMouseEnter={() => setHoveredItem({ item })}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Counter-rotating node so image stays upright */}
                    <div
                      className={cn(
                        "relative flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-[#0e1015] shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:border-white/80 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]",
                        pauseOnHover && "group-hover:[animation-play-state:paused]"
                      )}
                      style={{
                        animation: `${counterAnimName} ${duration}s linear infinite`,
                      }}
                    >
                      {item.image ? (
                        <div className="relative h-full w-full overflow-hidden rounded-full">
                          <Image
                            src={item.image}
                            alt={item.alt ?? item.label ?? "Community member"}
                            fill
                            sizes={`${circleSize}px`}
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <span className="font-mono text-xs font-bold text-white">
                          {item.label?.slice(0, 2).toUpperCase() ?? "●"}
                        </span>
                      )}

                      {/* Clean hover tooltip card */}
                      {item.label && (
                        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 z-50 whitespace-nowrap">
                          <div className="rounded-xl border border-white/15 bg-[#08090a]/95 px-3 py-1.5 text-center shadow-2xl backdrop-blur-xl">
                            <p className="font-semibold text-xs text-white">
                              {item.label}
                            </p>
                            {item.role && (
                              <p className="text-[10px] text-neutral-400 font-mono">
                                {item.role}
                              </p>
                            )}
                            {item.badge && (
                              <span className="mt-1 inline-block rounded-full bg-[#5e6ad2]/20 border border-[#5e6ad2]/40 px-2 py-0.5 text-[9px] font-bold text-[#5e6ad2]">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Keyframes for this ring */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  @keyframes ${ringAnimName} {
                    from {
                      transform: rotate(${isReversed ? "360deg" : "0deg"});
                    }
                    to {
                      transform: rotate(${isReversed ? "0deg" : "360deg"});
                    }
                  }
                  @keyframes ${counterAnimName} {
                    from {
                      transform: rotate(${isReversed ? "-360deg" : "0deg"});
                    }
                    to {
                      transform: rotate(${isReversed ? "0deg" : "-360deg"});
                    }
                  }
                `,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
