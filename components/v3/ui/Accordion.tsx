"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { Minus, Plus } from "@/components/v3/ui/Icons";

export interface AccordionItem {
  /**
   * Anchor for the row. Optional, but give one to every question on a long page: it is what a
   * <MarginRail> links to and what `useActiveSection` marks, and it makes a single question
   * deep-linkable — arrive on `#dispute-time` and that answer is already open.
   */
  id?: string;
  /** Pre-translated question. */
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow several panels open at once. Default: one at a time. */
  multiple?: boolean;
  /** Number the questions in the margin — for FAQ pages, where the count is the point. */
  numbered?: boolean;
  className?: string;
}

/**
 * A ruled list of questions.
 *
 * No card, no fill, no rounded chrome: each row is a hairline with a question sitting on it and
 * a +/− at the end of the line. Opening one draws the answer out beneath the rule. This is the
 * shape of a printed FAQ, and it means an FAQ page — of which this site has seven — reads as a
 * document instead of a stack of grey boxes.
 *
 * The panel is animated with `grid-template-rows: 0fr → 1fr`, which is the one honest way to
 * transition to a content-determined height: no measuring, no max-height guess that clips a
 * long answer in Hindi.
 */
export default function Accordion({
  items,
  multiple = false,
  numbered = false,
  className = "",
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>([]);

  /* Deep links. A question with an `id` is a destination — from the margin rail, from a search
     result, from a link a reader sent a friend. Landing on one and finding it collapsed would be
     a broken promise, so the panel named by the fragment opens itself. Nothing runs on a page
     whose items carry no ids. */
  useEffect(() => {
    if (!items.some((item) => item.id)) return;

    const sync = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return;
      const index = items.findIndex((item) => item.id === hash);
      if (index === -1) return;
      setOpen((current) =>
        current.includes(index) ? current : multiple ? [...current, index] : [index],
      );
    };

    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [items, multiple]);

  const toggle = (i: number) => {
    setOpen((current) => {
      if (current.includes(i)) return current.filter((n) => n !== i);
      return multiple ? [...current, i] : [i];
    });
  };

  return (
    <div className={`border-t border-[var(--v3-line-2)] ${className}`}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div
            key={i}
            id={item.id}
            className="scroll-mt-28 border-b border-[var(--v3-line)] sm:scroll-mt-32"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="v3-focus group flex w-full items-start gap-5 py-6 text-left transition-colors hover:text-[var(--v3-accent)] sm:gap-8 sm:py-7"
              >
                {numbered && (
                  <span aria-hidden className="v3-num mt-1 shrink-0 text-xs text-[var(--v3-fg-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}

                <span className="flex-1 text-pretty text-base leading-snug font-medium text-[var(--v3-fg)] transition-colors group-hover:text-[var(--v3-accent)] sm:text-lg">
                  {item.question}
                </span>

                <span className="mt-1 shrink-0 text-base text-[var(--v3-fg-3)] transition-colors group-hover:text-[var(--v3-accent)]">
                  {isOpen ? <Minus /> : <Plus />}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div
                  className={`pb-8 text-sm leading-relaxed text-[var(--v3-fg-2)] ${
                    numbered ? "sm:pl-[3.25rem]" : ""
                  } [&_a]:text-[var(--v3-accent)] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-[var(--v3-fg)]`}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
