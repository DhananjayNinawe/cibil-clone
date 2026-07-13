"use client";

import type { ReactNode } from "react";
import { EyeIcon } from "@/components/icons";
import Backdrop from "@/components/v2/ui/Backdrop";
import { Container } from "@/components/v2/ui/Layout";

/* The two auth flows share one composition: a lit editorial panel and a calm form column.
   Both live here so /v2/login and /v2/register stay the same room. */

interface AuthShellProps {
  /** The marketing panel. */
  aside: ReactNode;
  /** The form column. */
  children: ReactNode;
}

/**
 * Split-screen shell.
 *
 * The form is **first in the DOM** — so it is what a phone reader (and a screen reader) meets
 * first, and so the page's single `<h1>` precedes the panel's headings — and is pulled to the
 * right-hand column from `lg` up with `order-first` on the panel. The panel then sticks while
 * the long registration form scrolls past it.
 */
export default function AuthShell({ aside, children }: AuthShellProps) {
  return (
    // overflow-clip, not overflow-hidden: `hidden` makes this section a scroll container, and a
    // scroll container becomes the sticky containing block for everything inside it — which
    // silently stopped the marketing panel from sticking. `clip` clips the backdrop's blooms
    // just the same without creating a scrollport.
    <section className="relative isolate overflow-clip pt-28 pb-24 sm:pt-32 lg:pt-36 lg:pb-32">
      <Backdrop tone="duo" grid />

      <Container width="wide" className="relative">
        <div className="grid items-start gap-16 lg:grid-cols-[1.05fr_minmax(0,560px)] lg:gap-20 xl:gap-28">
          <div className="w-full">{children}</div>
          {/* lg:self-start — a stretched grid item cannot stick. */}
          <div className="lg:sticky lg:top-32 lg:self-start lg:order-first">{aside}</div>
        </div>
      </Container>
    </section>
  );
}

/**
 * The show/hide affordance on password, ID-number and date-of-birth.
 *
 * V1's `EyeIcon` *is* the toggle button — it owns the click target and its own accessible
 * name — so V2 reuses it rather than redrawing the icon. It was drawn for a white page, so it
 * is re-tinted here through arbitrary variants (a descendant selector, which outranks the
 * utility on the button itself) and given V2's focus ring.
 *
 * It is positioned inside this absolutely-placed box rather than against the field wrapper:
 * the wrapper also holds the error/hint line, so `top-1/2` against it would drift down the
 * moment a message appeared. The box is exactly one control tall, so the icon stays on the
 * input's centre line whatever is printed beneath it.
 */
export function RevealToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
  return (
    <span className="absolute top-0 right-0 flex h-14 w-12 [&>button]:rounded-[8px] [&>button]:text-[var(--v2-text-3)] [&>button:focus-visible]:outline-2 [&>button:focus-visible]:outline-offset-2 [&>button:focus-visible]:outline-[var(--v2-cyan)] [&>button:hover]:text-[var(--v2-cyan)]">
      <EyeIcon visible={visible} onToggle={onToggle} />
    </span>
  );
}

/** Pending indicator for a submit button — same label, plus a spinner. */
export function Spinner() {
  return (
    <span
      aria-hidden
      className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}
