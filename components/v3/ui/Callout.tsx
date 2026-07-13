import type { ReactNode } from "react";

type Tone = "note" | "warning" | "success" | "regulatory";

interface CalloutProps {
  children: ReactNode;
  tone?: Tone;
  /** Pre-translated. */
  title?: string;
  className?: string;
}

/**
 * A marginal note.
 *
 * Not a tinted rounded box: a block of copy with a heavy rule down its left edge, the way an
 * annotated document marks a passage. The tone lives entirely in that one rule — no background
 * wash, no icon, no border on the other three sides. It reads as part of the page rather than
 * a widget dropped onto it, which is exactly what a regulatory disclosure should look like.
 */
const TONES: Record<Tone, string> = {
  note: "border-[var(--v3-line-3)]",
  warning: "border-[var(--v3-ochre)]",
  success: "border-[var(--v3-pine)]",
  regulatory: "border-[var(--v3-clay)]",
};

export default function Callout({ children, tone = "note", title, className = "" }: CalloutProps) {
  return (
    <aside className={`border-l-2 pl-5 sm:pl-6 ${TONES[tone]} ${className}`}>
      {title && <p className="v3-folio mb-2 text-[var(--v3-fg)]">{title}</p>}
      <div className="text-sm leading-relaxed text-[var(--v3-fg-2)] [&_a]:text-[var(--v3-accent)] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-[var(--v3-fg)]">
        {children}
      </div>
    </aside>
  );
}
