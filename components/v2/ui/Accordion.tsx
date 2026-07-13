"use client";

import { useId, useState, type ReactNode } from "react";
import { PlusMinusCircleIcon } from "@/components/icons";
import { useV2 } from "@/lib/v2/useV2";

export interface AccordionItem {
  /** Stable key — a React key, never shown. */
  id: string;
  /** Pre-translated. */
  question: ReactNode;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index open on first paint. `-1` (default) starts fully collapsed. */
  defaultOpen?: number;
  /** Allow several panels open at once, and offer expand/collapse-all. */
  multiple?: boolean;
  className?: string;
}

/**
 * FAQ accordion.
 *
 * Height animates through `grid-template-rows: 0fr → 1fr`, which transitions smoothly
 * without measuring the panel — no ResizeObserver, no `max-height` guess that clips long
 * answers. The panel stays in the DOM and is hidden with `visibility`, so in-page search
 * (Ctrl+F) and assistive tech can still reach it.
 */
export default function Accordion({
  items,
  defaultOpen = -1,
  multiple = false,
  className = "",
}: AccordionProps) {
  const { tv } = useV2();
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(defaultOpen >= 0 ? [defaultOpen] : []),
  );

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const allOpen = open.size === items.length;

  return (
    <div className={className}>
      {multiple && items.length > 2 && (
        <div className="mb-5 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((_, i) => i)))}
            className="v2-focus v2-underline text-xs font-bold uppercase tracking-[0.14em] text-[var(--v2-cyan)]"
          >
            {allOpen ? tv("v2CollapseAll") : tv("v2ExpandAll")}
          </button>
        </div>
      )}

      <ul className="divide-y divide-[var(--v2-line)] border-y border-[var(--v2-line)]">
        {items.map((item, index) => {
          const isOpen = open.has(index);
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <li key={item.id} className="group">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="v2-focus flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-[var(--v2-cyan)]"
                >
                  <span
                    className={`text-[15px] font-bold leading-snug transition-colors sm:text-base ${
                      isOpen ? "text-[var(--v2-cyan)]" : "text-[var(--v2-text)]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <PlusMinusCircleIcon
                    expanded={isOpen}
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--v2-cyan)] transition-transform duration-500 ease-[var(--v2-ease)] group-hover:rotate-90"
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--v2-ease)]"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="v2-prose pb-7 pr-10 text-sm">{item.answer}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
