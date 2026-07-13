import type { ReactNode } from "react";

export interface Step {
  /** Pre-translated. */
  title: string;
  body?: ReactNode;
}

interface StepsProps {
  steps: Step[];
  /**
   * · rail  — a numbered vertical list against a single hairline (a procedure you follow)
   * · score — a horizontal band of numbered columns (a process you survey)
   */
  layout?: "rail" | "score";
  className?: string;
}

/**
 * A numbered procedure.
 *
 * The number is the design. Set large, in the mono voice, hung in the margin against a rule —
 * no circles, no filled badges, no connecting arrows. Every dispute, escalation and enrolment
 * flow on this site is one of these, and they should all read like clauses in a document.
 */
export default function Steps({ steps, layout = "rail", className = "" }: StepsProps) {
  if (layout === "score") {
    return (
      <ol className={`grid gap-px bg-[var(--v3-line)] sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
        {steps.map((step, i) => (
          <li key={i} className="bg-[var(--v3-bg)] p-6 sm:p-8">
            <span aria-hidden className="v3-num block text-3xl text-[var(--v3-accent)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-base leading-snug font-medium text-[var(--v3-fg)]">
              {step.title}
            </h3>
            {step.body && (
              <div className="mt-3 text-sm leading-relaxed text-[var(--v3-fg-2)] [&_a]:text-[var(--v3-accent)] [&_a]:underline [&_a]:underline-offset-2">
                {step.body}
              </div>
            )}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={`border-t border-[var(--v3-line)] ${className}`}>
      {steps.map((step, i) => (
        <li
          key={i}
          className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-8 sm:py-9"
        >
          <span aria-hidden className="v3-num pt-1 text-sm text-[var(--v3-fg-3)]">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0">
            <h3 className="text-pretty text-lg leading-snug font-medium text-[var(--v3-fg)]">
              {step.title}
            </h3>
            {step.body && (
              <div className="mt-3 max-w-[58ch] text-sm leading-relaxed text-[var(--v3-fg-2)] [&_a]:text-[var(--v3-accent)] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-[var(--v3-fg)]">
                {step.body}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
