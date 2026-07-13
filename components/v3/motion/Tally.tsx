"use client";

import { useTally } from "@/lib/v3/motion";

interface TallyProps {
  /** The number to count to. */
  value: number;
  /**
   * What to actually print once it arrives — V1's catalog holds these as strings ("46%", "183"),
   * and the string is the truth. The tally only animates the approach to it, so a value the
   * catalog writes as "46%" never renders as "46" at rest.
   */
  suffix?: string;
  className?: string;
}

/**
 * A figure settling on its number.
 *
 * Set in mono with tabular figures (`v3-num`), so the digits do not change width as they climb —
 * a proportional counter shoves the rule and the label beside it around for the whole 1.4s, which
 * is exactly the kind of jitter this design is trying to eliminate.
 */
export default function Tally({ value, suffix = "", className = "" }: TallyProps) {
  const { ref, display } = useTally(value);

  return (
    <span ref={ref} className={`v3-num ${className}`}>
      {Math.round(display)}
      {suffix}
    </span>
  );
}
