"use client";

import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. */
  duration?: number;
  className?: string;
}

/**
 * Seamless horizontal ticker. The track holds the content twice and translates by exactly
 * -50%, so the loop point is invisible. The duplicate is `aria-hidden` — a screen reader
 * should hear the list once, not twice — and the whole thing pauses on hover.
 */
export default function Marquee({ children, duration = 42, className = "" }: MarqueeProps) {
  return (
    <div className={`v2-marquee relative overflow-hidden ${className}`}>
      <div
        className="v2-marquee-track"
        style={{ "--v2-marquee-dur": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
