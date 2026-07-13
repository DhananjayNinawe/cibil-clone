"use client";

import { useV2 } from "@/lib/v2/useV2";
import { useScrolled } from "@/lib/v2/motion";

/** Appears once the reader is deep enough that the header is a long way back up. */
export default function BackToTop() {
  const { tv } = useV2();
  const deep = useScrolled(900);

  return (
    <button
      type="button"
      aria-label={tv("v2BackToTop")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`v2-focus fixed bottom-8 right-8 z-[65] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--v2-line-2)] bg-[rgba(5,7,13,0.7)] text-[var(--v2-text-2)] backdrop-blur-md transition-all duration-500 ease-[var(--v2-ease)] hover:border-[var(--v2-cyan)] hover:text-[var(--v2-cyan)] ${
        deep ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
      </svg>
    </button>
  );
}
