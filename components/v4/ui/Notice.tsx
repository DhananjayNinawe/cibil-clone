"use client";

import type { ReactNode } from "react";
import { AlertIcon, CheckIcon, InfoIcon } from "./Icons";

/**
 * The notice — the banner V4 uses for "this service is free", "the English version prevails",
 * "your dispute is resolved in 30 days".
 *
 * Colour is never the only signal. Each tone carries its own glyph as well as its own fill, because
 * a reader with a colour-vision deficiency sees two identical grey boxes otherwise (WCAG 1.4.1),
 * and because a screen reader sees neither. `role="status"` on the informational tones and
 * `role="alert"` on the warning one is deliberately *not* set here: these are static page furniture,
 * not live announcements, and a page that fires four alerts on load is a page nobody can read.
 */

type Tone = "info" | "success" | "warning";

const TONES: Record<Tone, { fill: string; edge: string; ink: string; Glyph: typeof InfoIcon }> = {
  info: {
    fill: "var(--v4-info-fill)",
    edge: "color-mix(in srgb, var(--v4-info) 30%, transparent)",
    ink: "var(--v4-info)",
    Glyph: InfoIcon,
  },
  success: {
    fill: "var(--v4-success-fill)",
    edge: "color-mix(in srgb, var(--v4-success) 30%, transparent)",
    ink: "var(--v4-success)",
    Glyph: CheckIcon,
  },
  warning: {
    fill: "var(--v4-warning-fill)",
    edge: "color-mix(in srgb, var(--v4-warning) 34%, transparent)",
    ink: "var(--v4-warning)",
    Glyph: AlertIcon,
  },
};

export default function Notice({
  tone = "info",
  title,
  children,
  className = "",
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const { fill, edge, ink, Glyph } = TONES[tone];

  return (
    <div
      className={`flex items-start gap-3.5 rounded-[var(--v4-r-md)] border p-4 sm:p-5 ${className}`}
      style={{ background: fill, borderColor: edge }}
    >
      <Glyph size={19} className="mt-0.5 shrink-0" style={{ color: ink }} />
      <div className="min-w-0 text-[0.9375rem] leading-relaxed text-[var(--v4-ink-2)]">
        {title ? (
          <p className="font-bold text-[var(--v4-ink)]">{title}</p>
        ) : null}
        <div className={title ? "mt-1" : ""}>{children}</div>
      </div>
    </div>
  );
}
