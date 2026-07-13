"use client";

import type { ReactNode } from "react";
import { useParallax } from "@/lib/v2/motion";

interface ParallaxProps {
  children: ReactNode;
  /** Fraction of scroll distance. Negative drifts against the scroll, positive with it. */
  speed?: number;
  className?: string;
}

/** Depth without a library: a transform driven by one rAF-throttled scroll listener. */
export default function Parallax({ children, speed = 0.1, className = "" }: ParallaxProps) {
  const ref = useParallax<HTMLDivElement>(speed);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
