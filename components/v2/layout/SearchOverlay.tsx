"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { POPULAR_ENTRIES, searchPages, type SearchEntry } from "@/lib/searchIndex";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import HighlightedText from "@/components/shared/HighlightedText";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/icons";

const LIMIT = 7;

/**
 * Command-palette search.
 *
 * The index is V1's (lib/searchIndex.ts) — it is built from the sitemap, so every page is
 * findable and stays findable — with each result's href mapped into /v2. Opens on ⌘K / Ctrl-K,
 * navigates with ↑/↓, commits with Enter, closes on Escape. Focus is trapped while open and
 * returned to the trigger on close.
 */
export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, tv, language } = useV2();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();
  const results: SearchEntry[] = useMemo(
    () => (trimmed ? searchPages(trimmed, language, LIMIT) : POPULAR_ENTRIES.slice(0, LIMIT)),
    [trimmed, language],
  );

  // Reset the highlight to the top result whenever the query changes — adjusted during render,
  // not in an effect, so the highlight can never paint on a stale row for one frame.
  const [lastQuery, setLastQuery] = useState(trimmed);
  if (trimmed !== lastQuery) {
    setLastQuery(trimmed);
    setActive(0);
  }

  // Lock the page behind the overlay and restore focus to whatever opened it.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      // Minimal focus trap: the panel is the only interactive region while open.
      if (event.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const go = (href: string) => {
    onClose();
    setQuery("");
    router.push(toV2(href));
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((prev) => (prev + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selected = results[active];
      if (selected) go(selected.href);
      else if (trimmed) go(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("searchTitle")}
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
    >
      <button
        type="button"
        aria-label={t("searchClear")}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[rgba(3,5,10,0.78)] backdrop-blur-xl [animation:v2-fade-in_300ms_ease]"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        className="v2-panel v2-rim relative w-full max-w-2xl overflow-hidden rounded-[var(--v2-r-lg)] shadow-[var(--v2-shadow-3)]"
      >
        <div className="flex items-center gap-4 border-b border-[var(--v2-line)] px-5">
          <SearchIcon className="h-5 w-5 shrink-0 text-[var(--v2-cyan)]" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded
            aria-controls="v2-search-results"
            aria-activedescendant={results[active] ? `v2-search-option-${active}` : undefined}
            aria-label={t("searchPlaceholder")}
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder={tv("v2SearchHint")}
            className="h-16 flex-1 bg-transparent text-base text-[var(--v2-text)] outline-none placeholder:text-[var(--v2-text-3)]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("a11yDismiss")}
            className="v2-focus shrink-0 rounded-full p-2 text-[var(--v2-text-3)] transition-colors hover:text-[var(--v2-text)]"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <ul id="v2-search-results" role="listbox" aria-label={t("searchSuggestionsLabel")} className="max-h-[52vh] overflow-y-auto p-2">
          {!trimmed && (
            <li className="v2-eyebrow px-4 py-3 text-[var(--v2-text-3)]">{t("searchPopularHeading")}</li>
          )}

          {results.map((result, index) => (
            <li key={result.href} id={`v2-search-option-${index}`} role="option" aria-selected={index === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onClick={() => go(result.href)}
                className={`group flex w-full items-center justify-between gap-4 rounded-[var(--v2-r-sm)] px-4 py-3 text-left transition-colors duration-200 ${
                  index === active ? "bg-[rgba(0,176,240,0.12)]" : ""
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-[var(--v2-text)]">
                    <HighlightedText text={t(result.titleKey)} query={trimmed} />
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-[var(--v2-text-3)]">
                    {t(result.sectionKey)}
                    {result.groupKey ? ` › ${t(result.groupKey)}` : ""}
                  </span>
                </span>
                <ArrowRightIcon
                  className={`h-4 w-4 shrink-0 text-[var(--v2-cyan)] transition-all duration-300 ${
                    index === active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                />
              </button>
            </li>
          ))}

          {trimmed && results.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-[var(--v2-text-3)]">{t("searchNoSuggestions")}</li>
          )}
        </ul>

        {trimmed && (
          <div className="border-t border-[var(--v2-line)] p-2">
            <button
              type="button"
              onClick={() => go(`/search?q=${encodeURIComponent(trimmed)}`)}
              className="v2-focus w-full rounded-[var(--v2-r-sm)] px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-[var(--v2-cyan)] transition-colors hover:bg-[var(--v2-surface-2)]"
            >
              {t("searchViewAll")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
