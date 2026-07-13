"use client";

import { useScrolled } from "@/lib/v3/motion";
import { useV3 } from "@/lib/v3/useV3";
import { ArrowUp } from "@/components/v3/ui/Icons";

/**
 * Back to top. A square ink block in the corner — no circle, no shadow, no float animation.
 * It appears once you are far enough down for it to be worth having.
 */
export default function BackToTop() {
  const { t3 } = useV3();
  const shown = useScrolled(900);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t3("v3BackToTop")}
      // `invisible` rather than unmounted: the element keeps its place in the DOM, so it does not
      // pop in and out of the accessibility tree on every scroll.
      className={`v3-focus fixed right-5 bottom-5 z-30 flex h-11 w-11 items-center justify-center border border-[var(--v3-ink)] bg-[var(--v3-ink)] text-[var(--v3-paper)] transition-all duration-300 hover:bg-transparent hover:text-[var(--v3-ink)] ${
        shown ? "opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
      tabIndex={shown ? 0 : -1}
    >
      <ArrowUp className="text-base" />
    </button>
  );
}
