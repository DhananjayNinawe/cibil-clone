"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { POPULAR_ENTRIES, searchPages, type SearchEntry } from "@/lib/searchIndex";
import { useScrollLock } from "@/lib/v3/motion";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Search } from "@/components/v3/ui/Icons";

/**
 * The search palette.
 *
 * The index it searches is V1's (lib/searchIndex.ts), which is built from the sitemap — so every
 * page is findable by construction, in whichever of the four languages the reader is using, and
 * V3 adds no second copy of it. Only the hrefs are mapped through `toV3()`.
 *
 * Presented as a sheet that drops from the masthead rather than a centred modal card: it is the
 * *page* being searched, so the field lands where the page begins. Arrow keys walk the results,
 * Enter opens the highlighted one, Escape closes.
 */
export default function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, t3, language } = useV3();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  useScrollLock(open);

  const results = useMemo<SearchEntry[]>(() => {
    const trimmed = query.trim();
    if (!trimmed) return POPULAR_ENTRIES;
    return searchPages(trimmed, language, 8);
  }, [query, language]);

  // A new query means a new list; leaving the cursor where it was would highlight an unrelated row.
  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    setQuery("");
    return () => restoreRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[cursor];
      if (target) router.push(toV3(target.href));
      else if (query.trim()) router.push(`${toV3("/search")}?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("searchTitle")}
      className="fixed inset-0 z-50"
    >
      {/* The scrim is ink at low opacity — no blur. Blurring the page behind a search field
          suggests the page is what you are looking at; it isn't. */}
      <button
        type="button"
        aria-label={t3("v3CloseLabel")}
        onClick={onClose}
        className="v3-overlay-in absolute inset-0 cursor-default bg-[var(--v3-ink)]/40"
      />

      <div className="v3-fade-up relative mx-auto w-full max-w-[46rem] bg-[var(--v3-paper)] px-[var(--v3-gutter)] pb-4 shadow-[0_32px_80px_-40px_rgba(22,21,15,0.5)]">
        <div className="flex items-center gap-4 border-b border-[var(--v3-rule-3)] py-6">
          <Search className="shrink-0 text-lg text-[var(--v3-ink-3)]" />

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t3("v3SearchHint")}
            aria-label={t("searchTitle")}
            aria-controls="v3-search-results"
            className="w-full bg-transparent text-lg text-[var(--v3-ink)] placeholder:text-[var(--v3-ink-3)] focus:outline-none"
          />

          <kbd
            aria-hidden
            className="v3-num hidden shrink-0 border border-[var(--v3-rule)] px-2 py-1 text-[0.625rem] text-[var(--v3-ink-3)] sm:block"
          >
            ESC
          </kbd>
        </div>

        <p className="v3-folio py-4">
          {query.trim() ? t3("v3RelatedPages") : t("searchPopularHeading")}
        </p>

        {results.length === 0 ? (
          <p className="pb-8 text-sm text-[var(--v3-ink-2)]">{t("searchNoSuggestions")}</p>
        ) : (
          <ul id="v3-search-results" className="max-h-[50vh] overflow-y-auto pb-4">
            {results.map((entry, i) => (
              <li key={entry.href}>
                <Link
                  href={toV3(entry.href)}
                  onMouseEnter={() => setCursor(i)}
                  onClick={onClose}
                  aria-current={i === cursor ? "true" : undefined}
                  className={`v3-focus flex items-baseline justify-between gap-4 border-b border-[var(--v3-rule)] px-2 py-3.5 transition-colors ${
                    i === cursor ? "bg-[var(--v3-paper-2)]" : ""
                  }`}
                >
                  <span className="text-sm text-[var(--v3-ink)]">{t(entry.titleKey)}</span>
                  <span className="v3-folio shrink-0">{t(entry.sectionKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query.trim() && (
          <Link
            href={`${toV3("/search")}?q=${encodeURIComponent(query.trim())}`}
            onClick={onClose}
            className="v3-focus v3-num block py-3 text-xs tracking-[0.08em] text-[var(--v3-accent)]"
          >
            <span className="v3-link-draw">{t("searchViewAll")}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
