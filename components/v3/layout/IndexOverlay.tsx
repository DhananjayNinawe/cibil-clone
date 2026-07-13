"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useScrollLock } from "@/lib/v3/motion";
import { useV3 } from "@/lib/v3/useV3";
import { V3_INDEX } from "@/lib/v3/nav";
import { toV3 } from "@/lib/v3/routes";
import { Container } from "@/components/v3/ui/Layout";
import Logo from "@/components/v3/ui/Logo";
import { ArrowUpRight, Close } from "@/components/v3/ui/Icons";

/**
 * The Index — V3's navigation, and the piece the whole design turns on.
 *
 * Instead of hiding fifty pages behind five hover panels, it prints them. The entire information
 * architecture, numbered and ruled, on one sheet: five parts, each with its groups, each group a
 * list of entries you can run your finger down. It is the back matter of a book, and for a site
 * whose job is to be trusted with regulatory disclosures, showing the reader everything you have
 * is not just a nicer interaction — it is the brand argument.
 *
 * The details that make it usable rather than merely pretty:
 *   · Escape closes it, and focus returns to whatever opened it.
 *   · Focus is trapped inside while it is open — Tab cannot wander into the page behind.
 *   · Body scroll is locked, with the scrollbar's width compensated so the page does not jump.
 *   · It is a <dialog>-shaped region: `role="dialog"`, `aria-modal`, and a real label.
 */
export default function IndexOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, t3 } = useV3();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      // The focus trap. Without it, tabbing past the last link inside a fixed, full-screen
      // overlay silently moves focus into the page underneath — which is still there, still
      // focusable, and completely invisible.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t3("v3IndexLabel")}
      className="v3-overlay-in fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[var(--v3-paper)]"
    >
      <Container>
        {/* Mirrors the masthead exactly, so the page does not appear to jump when it opens. */}
        <div className="flex h-20 items-center justify-between sm:h-24">
          <Logo />

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="v3-focus v3-num inline-flex h-10 items-center gap-2.5 border border-[var(--v3-rule-3)] px-3 text-xs tracking-[0.08em] transition-colors hover:bg-[var(--v3-ink)] hover:text-[var(--v3-paper)] sm:px-4"
          >
            <Close className="text-base" />
            <span className="hidden sm:inline">{t3("v3CloseLabel")}</span>
          </button>
        </div>

        <hr className="v3-rule v3-rule-strong" />

        <div className="grid gap-8 pt-12 pb-16 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="v3-display">{t3("v3IndexLabel")}</h2>
          <p className="v3-lede max-w-[38ch] lg:pb-3">{t3("v3IndexLede")}</p>
        </div>

        {/* The parts. Each is a spread: the number and the part name hang in the left margin, the
            groups run in the wide column beside them. */}
        <div className="pb-20">
          {V3_INDEX.map((part) => (
            <section
              key={part.key}
              className="grid gap-8 border-t border-[var(--v3-rule-2)] py-10 lg:grid-cols-[minmax(14rem,1fr)_2.4fr] lg:gap-16 lg:py-12"
            >
              <div>
                <p className="v3-folio mb-4 text-[var(--v3-accent)]">{part.folio}</p>
                <h3 className="v3-h3">
                  <Link href={part.href} className="v3-focus group inline-flex items-baseline gap-2">
                    <span className="v3-link-draw">{t(part.key)}</span>
                    <ArrowUpRight className="text-xs text-[var(--v3-ink-3)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </h3>
              </div>

              <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {part.groups.map((group) => (
                  <div key={group.heading}>
                    <p className="v3-folio mb-4 border-b border-[var(--v3-rule)] pb-3">
                      {t(group.heading)}
                    </p>

                    <ul>
                      {group.entries.map((entry) => (
                        <li key={`${group.heading}-${entry.key}-${entry.href}`}>
                          <Link
                            href={entry.href}
                            className="v3-focus group block border-b border-[var(--v3-rule)] py-2.5 transition-colors hover:text-[var(--v3-accent)]"
                          >
                            <span className="text-sm leading-snug text-[var(--v3-ink)] transition-colors group-hover:text-[var(--v3-accent)]">
                              {t(entry.key)}
                            </span>
                            {entry.descKey && (
                              <span className="mt-1 block text-xs leading-snug text-[var(--v3-ink-3)]">
                                {t(entry.descKey)}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* The way back to production. Every version of this site can reach the others. */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--v3-rule-2)] py-8">
          <Link
            href={toV3("/sitemap")}
            className="v3-focus v3-num text-xs tracking-[0.08em] text-[var(--v3-ink-2)] hover:text-[var(--v3-ink)]"
          >
            <span className="v3-link-draw">{t3("v3AllPages")}</span>
          </Link>

          <a
            href="/"
            className="v3-focus v3-num text-xs tracking-[0.08em] text-[var(--v3-ink-3)] hover:text-[var(--v3-ink)]"
          >
            <span className="v3-link-draw">{t3("v3ViewClassicSite")}</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
