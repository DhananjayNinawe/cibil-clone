"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useScrolled, useScrollProgress } from "@/lib/v3/motion";
import { useV3 } from "@/lib/v3/useV3";
import { V3_MASTHEAD } from "@/lib/v3/nav";
import { toV3 } from "@/lib/v3/routes";
import { Container } from "@/components/v3/ui/Layout";
import Logo from "@/components/v3/ui/Logo";
import { IndexMark, Search } from "@/components/v3/ui/Icons";
import LanguageSwitch from "@/components/v3/layout/LanguageSwitch";
import IndexOverlay from "@/components/v3/layout/IndexOverlay";
import SearchPalette from "@/components/v3/layout/SearchPalette";

/**
 * The masthead.
 *
 * V3 has no dropdowns. Not a mega panel, not a hover menu, not a flyout — the five section words
 * are plain links, and everything else in the site is one keystroke away behind the Index, which
 * takes over the whole screen. A dropdown hides the shape of a site from you; an index shows it
 * to you all at once, and a credit bureau with fifty pages of regulatory material has nothing to
 * gain from hiding its shape.
 *
 * The rule beneath the bar is the reading progress. It is not a separate widget bolted to the
 * top of the page (V2 has one of those) — it is the same hairline that separates the masthead
 * from the page, filling with ink as you go. One object, two jobs.
 */
export default function Masthead() {
  const { t, t3 } = useV3();
  const pathname = usePathname();
  const scrolled = useScrolled(12);
  const progress = useScrollProgress();

  const [indexOpen, setIndexOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Any navigation closes both overlays. Without this, following a link inside the index leaves
  // it hanging over the page you just asked for.
  useEffect(() => {
    setIndexOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // ⌘K / Ctrl-K opens search from anywhere — the shortcut every reader now expects.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIndexOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled ? "bg-[var(--v3-paper)]/95 backdrop-blur-[2px]" : "bg-transparent"
        }`}
      >
        <Container>
          <div
            className={`flex items-center justify-between gap-6 transition-[height] duration-300 ${
              scrolled ? "h-16" : "h-20 sm:h-24"
            }`}
          >
            {/* CIBIL's own lockup, untouched. The site's typeface is V3's to choose; the brand's
                is not. */}
            <Logo />

            {/* The five words. No hover panel behind any of them. */}
            <nav aria-label={t3("v3MainNavLabel")} className="hidden lg:block">
              <ul className="flex items-center gap-8 xl:gap-10">
                {V3_MASTHEAD.map((item) => {
                  const active = pathname.startsWith(item.href) && item.href !== toV3("/");
                  return (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`v3-focus v3-num text-xs tracking-[0.06em] transition-colors ${
                          active
                            ? "text-[var(--v3-ink)]"
                            : "text-[var(--v3-ink-2)] hover:text-[var(--v3-ink)]"
                        }`}
                      >
                        <span className="v3-link-draw">{t(item.key)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label={t("searchTitle")}
                className="v3-focus flex h-10 w-10 items-center justify-center text-[var(--v3-ink-2)] transition-colors hover:text-[var(--v3-ink)]"
              >
                <Search className="text-lg" />
              </button>

              <LanguageSwitch />

              <Link
                href={toV3("/login")}
                className="v3-focus v3-num hidden h-10 items-center px-4 text-xs tracking-[0.08em] text-[var(--v3-ink-2)] transition-colors hover:text-[var(--v3-ink)] sm:inline-flex"
              >
                <span className="v3-link-draw">{t("login")}</span>
              </Link>

              <button
                type="button"
                onClick={() => setIndexOpen(true)}
                aria-expanded={indexOpen}
                className="v3-focus v3-num inline-flex h-10 items-center gap-2.5 border border-[var(--v3-rule-3)] px-3 text-xs tracking-[0.08em] text-[var(--v3-ink)] transition-colors hover:bg-[var(--v3-ink)] hover:text-[var(--v3-paper)] sm:px-4"
              >
                <IndexMark className="text-base" />
                <span className="hidden sm:inline">{t3("v3IndexLabel")}</span>
              </button>
            </div>
          </div>
        </Container>

        {/* The rule, and the progress along it. */}
        <div className="relative h-px w-full bg-[var(--v3-rule)]">
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-full origin-left bg-[var(--v3-ink)]"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      <IndexOverlay open={indexOpen} onClose={() => setIndexOpen(false)} />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
