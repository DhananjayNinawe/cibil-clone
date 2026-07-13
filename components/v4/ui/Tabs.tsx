"use client";

import { useId, useRef, useState, type ReactNode } from "react";

/**
 * Tabs — the FAQ categories, the blog filters, the plan comparison.
 *
 * The full ARIA tabs pattern, including the half that is almost always missing: **arrow-key
 * navigation with roving tabindex**. In a correct tablist, Tab moves you *into* and *out of* the
 * tab strip in one hop, and the arrow keys move between the tabs. The common broken version makes a
 * keyboard user press Tab once per tab to get past a strip of nine filters.
 */

export interface TabItem {
  id: string;
  label: string;
  panel: ReactNode;
}

export default function Tabs({
  items,
  label,
  initial = 0,
}: {
  items: TabItem[];
  /** Names the tablist for a screen reader — "FAQ categories", "Article formats". */
  label: string;
  initial?: number;
}) {
  const [active, setActive] = useState(initial);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(items.length - 1);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="v4-scroll-x flex gap-1.5 border-b border-[var(--v4-edge)] pb-px"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${item.id}`}
              // Roving tabindex: only the active tab is in the tab order.
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative whitespace-nowrap rounded-t-[var(--v4-r-xs)] px-4 py-3 text-[0.9375rem] font-bold transition-colors ${
                selected
                  ? "text-[var(--v4-fg)]"
                  : "text-[var(--v4-fg-3)] hover:text-[var(--v4-fg-2)]"
              }`}
            >
              {item.label}
              {/* The active marker: gold, 2px, sitting on the rule. Same object as everywhere else. */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-2 -bottom-px h-[2px] rounded-full transition-opacity ${
                  selected ? "bg-[var(--v4-marker-line)] opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {items.map((item, i) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${uid}-panel-${item.id}`}
          aria-labelledby={`${uid}-tab-${item.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="pt-8 focus-visible:outline-none"
        >
          {i === active ? item.panel : null}
        </div>
      ))}
    </div>
  );
}
