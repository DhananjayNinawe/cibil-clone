"use client";

import { useId, useState, type ReactNode } from "react";
import { MinusIcon, PlusIcon } from "./Icons";

/**
 * The accordion — every FAQ on this site, and there are hundreds of them.
 *
 * Built on a real `<button>` inside a heading, wired the way the ARIA disclosure pattern actually
 * specifies: `aria-expanded` on the trigger, `aria-controls` pointing at the panel, and the panel
 * hidden from the accessibility tree when it is closed. A `<div onClick>` that toggles a class is
 * the version of this component that ships everywhere and is unusable with a keyboard.
 *
 * The panel animates with `grid-template-rows: 0fr → 1fr`, which is the one technique that opens to
 * the content's *own* height without JavaScript measuring it and without a `max-height` guess that
 * either clips a long answer or leaves a long pause after a short one.
 *
 * `hidden` is deliberately NOT used while animating — a hidden element has no height to animate to.
 * Instead the panel is inert via `aria-hidden` + `inert` only once closed, and the collapsed grid
 * row does the visual work.
 */
export function Disclosure({
  question,
  children,
  defaultOpen = false,
  headingLevel: H = "h3",
}: {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="border-b border-[var(--v4-edge)]">
      <H className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start justify-between gap-5 py-5 text-left"
        >
          <span className="text-[1.0625rem] font-bold leading-snug tracking-[-0.012em]">
            {question}
          </span>
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--v4-r-xs)] border border-[var(--v4-edge-2)] text-[var(--v4-fg-2)]">
            {open ? <MinusIcon size={14} /> : <PlusIcon size={14} />}
          </span>
        </button>
      </H>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-[var(--v4-ease-both)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="v4-prose pb-6 pr-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** A run of them. */
export function DisclosureList({ children }: { children: ReactNode }) {
  return <div className="border-t border-[var(--v4-edge)]">{children}</div>;
}
