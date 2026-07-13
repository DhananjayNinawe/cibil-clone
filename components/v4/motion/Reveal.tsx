"use client";

import type { ElementType, ReactNode } from "react";
import { useInView, useTick } from "@/lib/v4/motion";

/**
 * The reveal.
 *
 * V4's elements *resolve*: they settle the last 12px and firm up from 99% scale, as though an
 * instrument were being brought into focus. They do not fly, fade from black, blur, or wipe — V2
 * and V3 have those, and a fourth version that borrows a third version's motion is a reskin.
 *
 * `index` staggers a row: the child writes it to `--i`, and the CSS multiplies it into a delay, so
 * a parent never has to know how many children it has.
 */
export function Reveal({
  children,
  as: As = "div",
  variant = "up",
  index = 0,
  className = "",
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: "up" | "fade" | "focus";
  index?: number;
  className?: string;
  once?: boolean;
}) {
  const { ref } = useInView<HTMLDivElement>({ once });
  const variantClass =
    variant === "fade" ? "v4-reveal-fade" : variant === "focus" ? "v4-reveal-focus" : "";

  return (
    <As
      ref={ref}
      className={`v4-reveal ${variantClass} ${className}`}
      style={{ "--i": index } as React.CSSProperties}
    >
      {children}
    </As>
  );
}

/**
 * A figure that ticks up to its reading.
 *
 * The value arrives as a *string* — "183", "46%", "₹1,200", "25" — because that is how it is stored
 * in the translation catalog, and the catalog is the source of truth for what this site says. So we
 * parse the number out, tick that, and re-wear the original's prefix and suffix on every frame. A
 * value with no number in it at all (some locales spell figures out) is simply printed: a counter
 * that cannot count is not an error, it is a caption.
 */
export function Tick({
  value,
  duration = 1200,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  // No `s` flag: the project targets ES2017, where it is a syntax error — and these values are
  // single-line anyway ("183", "46%", "₹1,200").
  const match = value.match(/^(\D*?)([\d,.]+)(.*)$/);
  const numeric = match ? Number(match[2].replace(/,/g, "")) : Number.NaN;
  const decimals = match && match[2].includes(".") ? (match[2].split(".")[1]?.length ?? 0) : 0;

  const format = (n: number) => {
    if (!match || Number.isNaN(numeric)) return value;
    const body = n.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${match[1]}${body}${match[3]}`;
  };

  const { ref, display } = useTick(Number.isNaN(numeric) ? 0 : numeric, { duration, format });

  if (Number.isNaN(numeric)) {
    return <span className={className}>{value}</span>;
  }

  return (
    // The final value is announced once, rather than every intermediate frame being read out — a
    // counter wired to a live region turns a screen reader into a slot machine.
    <span ref={ref} className={className} aria-hidden="true">
      {display}
    </span>
  );
}
