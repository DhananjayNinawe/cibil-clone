"use client";

import type { ReactNode } from "react";
import { useV3 } from "@/lib/v3/useV3";
import Masthead from "@/components/v3/layout/Masthead";
import Footer from "@/components/v3/layout/Footer";
import BackToTop from "@/components/v3/layout/BackToTop";

/**
 * The V3 shell.
 *
 * Client, for one reason that matters: it stamps `lang` on the root element from the reader's
 * chosen language. V1's <html lang="en"> is fixed and read-only, so without this every
 * `:lang(hi)` rule in v3.css — the ones that give Devanagari its own line-height and swap the
 * mono folio for a face that actually has the glyphs — would never match, and a screen reader
 * would announce Hindi copy with an English voice.
 *
 * The language comes from a `useSyncExternalStore` over localStorage, so the server renders the
 * default ("en") and the client re-renders with the stored choice. That is a re-render, not a
 * hydration mismatch.
 */
export default function Shell({
  fontClassName,
  children,
}: {
  fontClassName: string;
  children: ReactNode;
}) {
  const { language, t3 } = useV3();

  return (
    <div
      lang={language}
      className={`v3-root v3-grain relative flex min-h-screen flex-1 flex-col ${fontClassName}`}
    >
      {/* The first thing in the tab order, and invisible until it is focused. */}
      <a
        href="#v3-main"
        className="v3-focus v3-num sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-[var(--v3-ink)] focus:px-4 focus:py-3 focus:text-xs focus:text-[var(--v3-paper)]"
      >
        {t3("v3SkipToContent")}
      </a>

      <Masthead />

      {/* z-[1] lifts the content above the fixed grain layer (.v3-grain::before), which paints at
          z-0 across the whole viewport. */}
      <main id="v3-main" className="relative z-[1] flex-1">
        {children}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
