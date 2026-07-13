"use client";

import { useId, useRef, useState, type ReactNode } from "react";

export interface TabItem {
  /** Pre-translated. */
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  /** Pre-translated accessible name for the tablist. */
  label: string;
  className?: string;
}

/**
 * Tabs as a ruled index strip: the labels sit in a row on a hairline, and the selected one is
 * marked by a heavy rule *under* it — a tab in a ledger, not a rounded pill.
 *
 * Full keyboard support (arrows, Home, End) with a roving tabindex, which is what the WAI-ARIA
 * tabs pattern actually requires and which a div-with-onClick never gives you.
 */
export default function Tabs({ items, label, className = "" }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-x-8 gap-y-2 border-b border-[var(--v3-line-2)]"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`v3-focus v3-num relative -mb-px cursor-pointer border-b-2 py-4 text-xs font-medium tracking-[0.08em] transition-colors ${
                selected
                  ? "border-[var(--v3-fg)] text-[var(--v3-fg)]"
                  : "border-transparent text-[var(--v3-fg-3)] hover:text-[var(--v3-fg)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          className="v3-focus pt-10"
        >
          {i === active && item.content}
        </div>
      ))}
    </div>
  );
}
