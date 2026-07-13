import type { ReactNode } from "react";

type Tone = "cyan" | "gold" | "neutral" | "success" | "error";

const TONES: Record<Tone, string> = {
  cyan: "border-[rgba(0,176,240,0.35)] bg-[var(--v2-cyan-dim)] text-[var(--v2-cyan-soft)]",
  gold: "border-[rgba(245,197,24,0.35)] bg-[var(--v2-gold-dim)] text-[var(--v2-gold)]",
  neutral: "border-[var(--v2-line-2)] bg-[var(--v2-surface)] text-[var(--v2-text-2)]",
  success: "border-[rgba(61,220,151,0.35)] bg-[rgba(61,220,151,0.12)] text-[var(--v2-success)]",
  error: "border-[rgba(255,107,107,0.35)] bg-[rgba(255,107,107,0.12)] text-[var(--v2-error)]",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  /** Adds a pulsing dot — for "live"/"recommended"-style emphasis. */
  pulse?: boolean;
  className?: string;
}

export default function Badge({ children, tone = "cyan", pulse = false, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${TONES[tone]} ${className}`}
    >
      {pulse && (
        <span aria-hidden className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-current [animation:v2-pulse-ring_2s_ease-out_infinite]" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
