"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  /** Pre-translated. */
  label: ReactNode;
  panel: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  /** Accessible name for the tablist — pre-translated. */
  label: string;
  className?: string;
}

/**
 * WAI-ARIA tabs: arrow keys move between tabs, Home/End jump to the ends, and only the
 * active tab is in the tab order. The moving pill is a single absolutely-positioned
 * element rather than a per-tab background, so it slides instead of blinking.
 */
export default function Tabs({ items, label, className = "" }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(active + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(active - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(items.length - 1);
        break;
    }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className="flex flex-wrap gap-1 rounded-full border border-[var(--v2-line)] bg-[var(--v2-surface)] p-1.5 backdrop-blur-md"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={`v2-focus relative rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${
                selected
                  ? "bg-[var(--v2-cyan)] text-[#04202c] shadow-[0_8px_28px_-8px_rgba(0,176,240,0.9)]"
                  : "text-[var(--v2-text-2)] hover:text-[var(--v2-text)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
          tabIndex={0}
          className="v2-focus mt-10"
        >
          {index === active && item.panel}
        </div>
      ))}
    </div>
  );
}
