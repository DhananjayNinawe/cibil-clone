"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/v4/ui/Icons";
import { prefersReducedMotion } from "@/lib/v4/motion";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Back to top.
 *
 * Appears only once there is a top worth going back to (two viewports down), so it is not a button
 * hovering over a page that has not been scrolled. It is a real `<button>` with a real label, not
 * an icon in a div — and the scroll it performs is smooth unless the OS asked for no motion, in
 * which case it jumps, because a long smooth scroll is exactly the kind of movement that triggers
 * vestibular symptoms.
 */
export default function BackToTop() {
  const { t4 } = useV4();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let ticking = false;
    const apply = () => {
      ticking = false;
      setShown(window.scrollY > window.innerHeight * 2);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!shown) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })
      }
      aria-label={t4("v4BackToTop")}
      className="v4-surface-in fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-[var(--v4-r-sm)] border border-[var(--v4-edge-2)] bg-[var(--v4-plane)] text-[var(--v4-ink)] shadow-[var(--v4-shadow-2)] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <ArrowUpIcon size={19} />
    </button>
  );
}
