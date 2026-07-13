"use client";

import { useCountUp } from "@/lib/v2/motion";

interface CountUpProps {
  /** The numeric part only — units and symbols are rendered by the caller from `t()`. */
  value: number;
  decimals?: number;
  className?: string;
}

/**
 * Animates 0 → value when scrolled into view.
 *
 * The displayed digits are `aria-hidden` and the final value is exposed once, in text, to
 * assistive tech: a live-counting number would otherwise be announced dozens of times.
 */
export default function CountUp({ value, decimals = 0, className = "" }: CountUpProps) {
  const { ref, display } = useCountUp(value);
  const formatted = display.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{formatted}</span>
      <span className="sr-only">{value.toFixed(decimals)}</span>
    </span>
  );
}
