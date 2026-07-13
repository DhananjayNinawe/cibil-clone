"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/v2/motion/Reveal";

export interface Step {
  id: string;
  /** Pre-translated. */
  title: ReactNode;
  body?: ReactNode;
}

interface StepsProps {
  steps: Step[];
  /** `rail` stacks vertically against a glowing spine; `flow` runs horizontally. */
  layout?: "rail" | "flow";
  className?: string;
}

/**
 * Numbered process — dispute flows, enrolment, escalation ladders.
 *
 * The connector is a real gradient line rather than a border, and the numerals are the
 * design's editorial index, so the sequence reads as a designed path instead of a list.
 */
export default function Steps({ steps, layout = "rail", className = "" }: StepsProps) {
  if (layout === "flow") {
    return (
      <ol className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
        {steps.map((step, index) => (
          <Reveal as="li" key={step.id} variant="up" delay={index * 90} className="relative">
            {/* Connector to the next card — hidden on the last, and on stacked layouts. */}
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[calc(50%+2rem)] top-7 hidden h-px w-[calc(100%-4rem)] bg-linear-to-r from-[var(--v2-cyan)] to-transparent lg:block"
              />
            )}
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(0,176,240,0.4)] bg-[var(--v2-bg-2)] text-lg font-bold text-[var(--v2-cyan)] shadow-[0_0_30px_-6px_rgba(0,176,240,0.6)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 text-base font-bold leading-snug text-[var(--v2-text)]">{step.title}</h3>
            {step.body && (
              <div className="mt-2.5 text-sm leading-relaxed text-[var(--v2-text-2)]">{step.body}</div>
            )}
          </Reveal>
        ))}
      </ol>
    );
  }

  return (
    <ol className={`relative ${className}`}>
      <span
        aria-hidden
        className="absolute left-[27px] top-3 bottom-3 w-px bg-linear-to-b from-[var(--v2-cyan)] via-[rgba(0,176,240,0.25)] to-transparent"
      />
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.id}
          variant="left"
          delay={index * 90}
          className="relative flex gap-6 pb-10 last:pb-0"
        >
          <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[rgba(0,176,240,0.4)] bg-[var(--v2-bg-2)] text-base font-bold text-[var(--v2-cyan)] shadow-[0_0_30px_-6px_rgba(0,176,240,0.6)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 pt-3">
            <h3 className="text-base font-bold leading-snug text-[var(--v2-text)] sm:text-lg">{step.title}</h3>
            {step.body && (
              <div className="mt-2.5 text-sm leading-relaxed text-[var(--v2-text-2)]">{step.body}</div>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
