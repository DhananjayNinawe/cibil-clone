"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/v4/motion/Reveal";
import { useV4 } from "@/lib/v4/useV4";

/**
 * A numbered process — how a dispute is raised, how a report is bought, how a grievance escalates.
 *
 * An ordered list, because it is one: the order is the meaning, and a screen reader announces
 * "list, 4 items" and then counts them. V1 draws these as a row of floating circles connected by a
 * decorative line, which is a diagram a screen reader cannot see and a keyboard cannot enter.
 *
 * The numeral is set in the mono face and sits in the margin, so the steps' *text* still forms a
 * clean column — the number is an index, not a word in the sentence.
 */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="grid gap-0">{children}</ol>;
}

export function Step({
  n,
  title,
  children,
  index = 0,
}: {
  /** The step's number, as shown. Passed rather than derived so a page can start at 0 or skip. */
  n: number;
  title: string;
  children?: ReactNode;
  index?: number;
}) {
  const { t4 } = useV4();

  return (
    <li className="border-t border-[var(--v4-edge)] last:border-b">
      <Reveal index={index} className="flex gap-5 py-7 sm:gap-8">
        <span className="shrink-0">
          <span className="v4-sr">{t4("v4Step")}</span>
          <span
            aria-hidden="true"
            className="v4-num flex h-10 w-10 items-center justify-center rounded-[var(--v4-r-sm)] border border-[var(--v4-edge-2)] bg-[var(--v4-surface)] text-[0.9375rem] font-medium text-[var(--v4-fg)]"
          >
            {String(n).padStart(2, "0")}
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="v4-h3">{title}</h3>
          {children ? <div className="v4-prose mt-2.5">{children}</div> : null}
        </div>
      </Reveal>
    </li>
  );
}
