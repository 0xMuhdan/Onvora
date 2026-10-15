"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import {
  typeStyles,
  typeScale,
  typeClasses,
  typeClass,
  fieldTouchClass,
  type TypeScaleRole,
  type TypeScalePair,
  type TypeScaleStep,
} from "@/lib/type-scale";
import { useTouchPrimary } from "@/hooks/use-touch-primary";

type SizeVariant = "default" | "compact";
type DeviceType = "mobile" | "tablet" | "desktop";

interface DeviceInfo {
  /** The current active device profile: "mobile" (<768px), "tablet" (768px-1024px), or "desktop" (>=1024px). */
  device: DeviceType;
  /** True when viewport width is below 768px. */
  isMobile: boolean;
  /** True when viewport width is between 768px and 1024px. */
  isTablet: boolean;
  /** True when viewport width is 1024px or higher. */
  isDesktop: boolean;
  /** True when primary input pointer is touch / coarse. */
  isTouch: boolean;
}

interface SizeClasses extends DeviceInfo {
  /** The variant these classes belong to — handy for conditionals. */
  variant: SizeVariant;
  /** Bounded control height — buttons, inputs, select triggers, subtle tabs —
   *  AND list/menu rows (select options, dropdown, checkbox and radio rows).
   *  One token by design: a popup row lines up with the trigger that opened
   *  it because they share this height. */
  control: string;
  /** `control` as a number, for consumers that need raw pixels. */
  controlHeight: number;
  /** Tab trigger height inside a padded segmented list. Sized so
   *  `segmentPad` + `segmentItem` adds back up to the control height —
   *  the segmented control's outer box stays on the same ladder. */
  segmentItem: string;
  /** Padding of the segmented list around its tabs. */
  segmentPad: string;
  /** Body text inside controls (size + line height), same as `type.body`.
   *  Its 20px line box (18px compact) is what puts a padded row on the
   *  ladder: 8 + 20 + 8 = 36, 5 + 18 + 5 = 28. */
  text: string;
  /** `text` for an editable field: the same body role, plus 16px on touch
   *  screens (`fieldTouchClass`), since iOS Safari zooms the page into a
   *  focused field set under 16px. */
  field: string;
  /** One class string per type role at this step (size + leading). */
  type: Record<TypeScaleRole, string>;
  /** Horizontal padding of bounded controls (select trigger, inputs). */
  px: string;
  /** Horizontal padding of list/menu rows, which sit inside a padded popup
   *  or group and need less inset than a bounded control. */
  itemPx: string;
  /** Gap between an icon / control glyph and its label, and between
   *  neighbouring controls in a row (toolbars, filter bars, button
   *  clusters). Density is spacing as much as control height, so the
   *  compact step halves it. */
  gap: string;
  /** Glyph size in px: leading/trailing icons inside controls, and the
   *  checkbox square / radio circle. */
  icon: number;
}

type RawSizeClasses = Omit<SizeClasses, keyof DeviceInfo>;

const rawSizeMap: Record<SizeVariant, RawSizeClasses> = {
  // 36px — the default control height. Matches a 13px label with comfortable
  // breathing room and keeps controls a workable pointer target.
  default: {
    variant: "default",
    control: "h-9",
    controlHeight: 36,
    segmentItem: "h-7",
    segmentPad: "p-1",
    text: typeClasses.default.body,
    field: `${typeClasses.default.body} ${fieldTouchClass}`,
    type: typeClasses.default,
    px: "px-3",
    itemPx: "px-2",
    gap: "gap-2",
    icon: 16,
  },
  // 28px — the compact height for dense surfaces: filter bars, toolbars,
  // table headers, sidebars. One step down in text (12px) and icon (14px)
  // so the whole control shrinks together, not just its box.
  compact: {
    variant: "compact",
    control: "h-7",
    controlHeight: 28,
    segmentItem: "h-6",
    segmentPad: "p-0.5",
    text: typeClasses.compact.body,
    field: `${typeClasses.compact.body} ${fieldTouchClass}`,
    type: typeClasses.compact,
    px: "px-2.5",
    itemPx: "px-1.5",
    gap: "gap-1",
    icon: 14,
  },
};

const sizeMap = rawSizeMap as unknown as Record<SizeVariant, SizeClasses>;

/** Hook to observe the active device type and viewport dimensions */
export function useDevice(): DeviceInfo {
  const isTouch = useTouchPrimary();
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice("mobile");
      } else if (width < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return useMemo(
    () => ({
      device,
      isMobile: device === "mobile",
      isTablet: device === "tablet",
      isDesktop: device === "desktop",
      isTouch,
    }),
    [device, isTouch]
  );
}

/** Hook to resolve size variant based on the active device.
 *  Mobile defaults to "default" (36px accessible touch target),
 *  while tablet and desktop can be configured or defaulted. */
export function useResponsiveSize(
  rules?: Partial<Record<DeviceType, SizeVariant>>
): SizeVariant {
  const { device } = useDevice();
  if (rules && rules[device]) {
    return rules[device]!;
  }
  if (device === "mobile") return "default";
  return "default";
}

/** The type scale resolved for the active ladder step (font size in px per
 *  role): explicit override > surrounding SizeProvider > "default". Line
 *  heights live in `typeStyles` and the --lh-* tokens. */
function useTypeScale(
  override?: SizeVariant | null
): Record<TypeScaleRole, number> {
  const variant = useSizeVariant(override);
  return {
    display: typeScale.display[variant],
    title: typeScale.title[variant],
    subtitle: typeScale.subtitle[variant],
    body: typeScale.body[variant],
    caption: typeScale.caption[variant],
    micro: typeScale.micro[variant],
  };
}

interface SizeContextValue extends DeviceInfo {
  size: SizeVariant;
  setSize: (size: SizeVariant) => void;
  classes: SizeClasses;
}

const SizeContext = createContext<SizeContextValue | null>(null);

/** Resolve the active size variant: explicit prop > provider > "default". */
function useSizeVariant(override?: SizeVariant | null): SizeVariant {
  const ctx = useContext(SizeContext);
  return override ?? ctx?.size ?? "default";
}

/** Resolve size classes: explicit prop > provider > "default". */
function useSize(override?: SizeVariant | null): SizeClasses {
  const ctx = useContext(SizeContext);
  const variant = override ?? ctx?.size ?? "default";
  const raw = rawSizeMap[variant];

  const deviceInfo: DeviceInfo = ctx
    ? {
        device: ctx.device,
        isMobile: ctx.isMobile,
        isTablet: ctx.isTablet,
        isDesktop: ctx.isDesktop,
        isTouch: ctx.isTouch,
      }
    : {
        device: "desktop",
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouch: false,
      };

  return {
    ...raw,
    ...deviceInfo,
  };
}

function useSizeContext() {
  const ctx = useContext(SizeContext);
  if (!ctx) throw new Error("useSizeContext must be used within a SizeProvider");
  return ctx;
}

type AdaptiveOption = boolean | Partial<Record<DeviceType, SizeVariant>>;

function SizeProvider({
  children,
  size,
  defaultSize = "default",
  adaptive = true,
}: {
  children: ReactNode;
  /** Controlled variant — pin a whole region to one size (e.g. a compact
   *  filter bar). Overrides internal state. */
  size?: SizeVariant;
  defaultSize?: SizeVariant;
  /** Automatically adjust size based on user's device (mobile, tablet, desktop). */
  adaptive?: AdaptiveOption;
}) {
  const deviceInfo = useDevice();
  const [internalSize, setInternalSize] = useState<SizeVariant>(defaultSize);

  const resolved = useMemo(() => {
    if (adaptive) {
      if (typeof adaptive === "object" && adaptive[deviceInfo.device]) {
        return adaptive[deviceInfo.device]!;
      }
      if (deviceInfo.isMobile && size === undefined) {
        return "default";
      }
    }
    return size ?? internalSize;
  }, [adaptive, deviceInfo.device, deviceInfo.isMobile, size, internalSize]);

  const isControlled = size !== undefined;

  const setSize = useCallback(
    (next: SizeVariant) => {
      if (isControlled) return;
      setInternalSize(next);
    },
    [isControlled]
  );

  const classes: SizeClasses = useMemo(
    () => ({
      ...rawSizeMap[resolved],
      ...deviceInfo,
    }),
    [resolved, deviceInfo]
  );

  const value = useMemo(
    () => ({
      size: resolved,
      setSize,
      classes,
      ...deviceInfo,
    }),
    [resolved, setSize, classes, deviceInfo]
  );

  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
}

export {
  SizeProvider,
  useSize,
  useSizeVariant,
  useSizeContext,
  useTypeScale,
  sizeMap,
  typeStyles,
  typeScale,
  typeClasses,
  typeClass,
  fieldTouchClass,
};
export type {
  SizeVariant,
  SizeClasses,
  DeviceType,
  DeviceInfo,
  AdaptiveOption,
  TypeScaleRole,
  TypeScalePair,
  TypeScaleStep,
};
