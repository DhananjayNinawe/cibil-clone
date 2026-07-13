"use client";

import type { ReactNode } from "react";
import CountUp from "@/components/v2/motion/CountUp";

interface StatBlockProps {
  /** Pre-translated, e.g. "183" or "46%". A leading number is counted up; the rest is kept verbatim. */
  value: string;
  /** Pre-translated unit, e.g. "years", "M". */
  unit?: string;
  /** Pre-translated caption. */
  label: ReactNode;
  className?: string;
}

/** Splits "46%" into 46 and "%" so the numeral can animate and the symbol stays put. */
function splitValue(value: string): { number: number; suffix: string } | null {
  const match = value.match(/^([\d.,]+)(.*)$/);
  if (!match) return null;
  const number = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(number) ? { number, suffix: match[2] } : null;
}

export default function StatBlock({ value, unit, label, className = "" }: StatBlockProps) {
  const parsed = splitValue(value);
  // The values come from the translation catalog, so a locale may well write them in a
  // script this regex cannot parse. Fall back to printing the string as-is.
  const decimals = parsed && parsed.number % 1 !== 0 ? 1 : 0;

  return (
    <div className={`group relative ${className}`}>
      <p className="flex items-baseline gap-1 font-light leading-none tracking-tight text-[var(--v2-text)]">
        <span className="text-[clamp(3rem,5.5vw,4.75rem)] tabular-nums">
          {parsed ? (
            <>
              <CountUp value={parsed.number} decimals={decimals} />
              {parsed.suffix}
            </>
          ) : (
            value
          )}
        </span>
        {unit && <span className="text-2xl text-[var(--v2-cyan)]">{unit}</span>}
      </p>
      <div className="mt-6 h-px w-12 bg-[var(--v2-cyan)] shadow-[0_0_12px_rgba(0,176,240,0.8)] transition-[width] duration-700 ease-[var(--v2-ease)] group-hover:w-20" />
      <p className="mt-5 text-sm leading-relaxed text-[var(--v2-text-2)]">{label}</p>
    </div>
  );
}
