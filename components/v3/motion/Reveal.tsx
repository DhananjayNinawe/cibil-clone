"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/v3/motion";

export type RevealVariant = "rise" | "fade" | "wipe" | "plate" | "rule";

interface RevealProps {
  children: ReactNode;
  /**
   * · rise  — copy settles up a short distance
   * · fade  — the quietest option
   * · wipe  — a block of type uncovered top-down, as if a sheet were pulled away
   * · plate — artwork unveiled left-to-right; never scaled, never faded
   * · rule  — a hairline drawn from its left edge
   */
  variant?: RevealVariant;
  /** Milliseconds. Stagger siblings by 60–90ms; more than that and the page feels slow. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

/** The clip-based variants cannot be observed directly — see the note below. */
const CLIPPED: RevealVariant[] = ["wipe", "plate"];

/**
 * The one reveal component. Every variant is a CSS class whose hidden half is gated behind
 * `@media (scripting: enabled)` (v3.css) — so with JavaScript off the content is simply visible,
 * and the observer here only ever adds the class that *finishes* the animation.
 *
 * `wipe` and `plate` render one extra element, and that is not decoration. IntersectionObserver
 * measures a target's *clipped* box, so an element clipped to zero height never intersects,
 * the observer never fires, and the content it was supposed to uncover stays hidden for ever.
 * The observer therefore watches an unclipped wrapper and the clip sits on the child, which
 * `.is-set > .v3-reveal` resolves.
 *
 * The consequence for callers: on a clipped variant, `className` lands on the *wrapper*, so it
 * must not be a layout container for the children (no `flex`, no `grid` — its only child is the
 * clip element). Padding and margins are fine. On the other variants `className` behaves normally.
 */
export default function Reveal({
  children,
  variant = "rise",
  delay = 0,
  as,
  className = "",
}: RevealProps) {
  const { ref } = useInView<HTMLElement>();
  const Tag: ElementType = as ?? "div";
  const delayStyle = delay ? ({ "--v3-reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  if (CLIPPED.includes(variant)) {
    return (
      <Tag ref={ref} className={className}>
        <div className={`v3-reveal v3-reveal-${variant}`} style={delayStyle}>
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={`v3-reveal v3-reveal-${variant} ${className}`} style={delayStyle}>
      {children}
    </Tag>
  );
}
