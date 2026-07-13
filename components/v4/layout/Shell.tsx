"use client";

import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import { useV4 } from "@/lib/v4/useV4";

/**
 * V4's shell: the skip link, the header, the main landmark, the footer.
 *
 * It is a **client** component for one specific reason: it stamps `lang` on the V4 root element.
 * The root `<html lang="en">` in app/layout.tsx belongs to V1 and is read-only, so without this the
 * document would claim to be English while rendering Hindi — which mis-announces every word to a
 * screen reader, picks the wrong hyphenation and font fallbacks, and makes the `:lang(hi)` rules in
 * v4.css (the ones that fix Devanagari line-height and kill the Latin letter-spacing) never match.
 * V3 hit the same wall and solved it the same way.
 *
 * `v4-root` is where every token in v4.css is defined, so nothing inside it can style anything
 * outside it — V1, V2 and V3 render in this same document.
 */
export default function Shell({
  children,
  fontClassName,
}: {
  children: ReactNode;
  fontClassName: string;
}) {
  const { language, t4 } = useV4();

  return (
    <div lang={language} className={`v4-root flex min-h-screen flex-col ${fontClassName}`}>
      {/* The first thing in the tab order on every page: a way past the header. */}
      <a href="#v4-main" className="v4-skip">
        {t4("v4SkipToContent")}
      </a>

      <Header />

      <main id="v4-main" className="flex-1">
        {children}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
