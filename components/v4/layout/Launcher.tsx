"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import HighlightedText from "@/components/shared/HighlightedText";
import { searchPages } from "@/lib/searchIndex";
import { toV4 } from "@/lib/v4/routes";
import { V4_SECTIONS, V4_TASKS } from "@/lib/v4/nav";
import { useEscape, useFocusTrap, useScrollLock } from "@/lib/v4/motion";
import { useV4 } from "@/lib/v4/useV4";
import { ArrowRightIcon, CloseIcon, SearchIcon, TASK_ICONS } from "@/components/v4/ui/Icons";

/**
 * The Launcher — V4's one navigation surface.
 *
 * V1 and V2 hang five hover mega-menus off the header; V3 replaces them with a full-screen printed
 * index and a separate ⌘K palette. V4 does a third thing, and it is the design's central UX claim:
 * **the menu and the search box are the same object.**
 *
 * A reader looking for a page does not think of themselves as choosing between "browsing" and
 * "searching" — they think about the page. Splitting those into two surfaces (a menu you hover, a
 * palette you summon) makes the reader pick a *tool* before they can pick a *destination*, and that
 * choice is pure cognitive load. So: open the Launcher and the whole site is laid out in front of
 * you. Start typing and the same surface narrows to what matched. Stop typing and it is a menu
 * again. There is no mode to switch, and nothing to learn.
 *
 * Three details that make it work rather than merely look nice:
 *
 *   · TASKS BEFORE TAXONOMY. Most people arrive with a verb — check my score, fix a mistake,
 *     compare plans, talk to someone. Those four sit above the directory (see lib/v4/nav.ts).
 *
 *   · THE SEARCH IS THE SITE'S, NOT THE MENU'S. Filtering runs over `lib/searchIndex` — every page
 *     on the site, with synonyms, in the reader's language — not over the handful of links the menu
 *     happens to list. Typing "password" finds Login; typing "wilful defaulter" finds Suit Filed.
 *     A menu that can only find itself is a menu that sends people to the search page.
 *
 *   · IT IS A DIALOG, AND BEHAVES LIKE ONE. Focus is trapped inside it, Escape closes it, the page
 *     behind it cannot scroll, and on close focus returns to the button that opened it. Arrow keys
 *     walk the results and Enter opens the highlighted one, so the whole thing is usable without
 *     ever touching a pointer.
 */

const RESULT_LIMIT = 8;

/**
 * Mounted only while open (see Header), so there is no `open` prop and no reset logic: closing it
 * unmounts it, which discards the query and the highlighted row for free.
 */
export default function Launcher({ onClose }: { onClose: () => void }) {
  const { t, t4, language } = useV4();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const trapRef = useFocusTrap<HTMLDivElement>(true);
  useScrollLock(true);
  useEscape(true, onClose);

  const trimmed = query.trim();
  const results = useMemo(
    () => (trimmed ? searchPages(trimmed, language, RESULT_LIMIT) : []),
    [trimmed, language],
  );

  /**
   * A new query starts the highlight back at the top result.
   *
   * Adjusted during render against the previous query rather than in an effect: an effect would
   * paint one frame with the *old* row highlighted against the *new* results — long enough to see,
   * and long enough for Enter to open the wrong page.
   */
  const [queryAtRender, setQueryAtRender] = useState(trimmed);
  if (trimmed !== queryAtRender) {
    setQueryAtRender(trimmed);
    setActive(0);
  }

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const hit = results[active];
      if (hit) go(toV4(hit.href));
    }
  };

  const count = results.length;

  return (
    <div className="fixed inset-0 z-50">
      {/* The scrim. Clicking it closes — the affordance every overlay on the web has, and the one
          a reader reaches for before they look for an X. */}
      <button
        type="button"
        aria-label={t4("v4CloseExplore")}
        onClick={onClose}
        className="v4-scrim-in absolute inset-0 w-full cursor-default bg-[rgba(6,34,47,0.42)]"
      />

      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label={t4("v4LauncherTitle")}
        className="v4-surface-in absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b border-[var(--v4-edge)] bg-[var(--v4-surface)] shadow-[var(--v4-elev-3)]"
      >
        <div className="mx-auto w-full max-w-[var(--v4-max-wide)] px-[var(--v4-gutter)] py-6 sm:py-8">
          {/* ── The filter. One input, and it is the search box too. ───────────────────────── */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <SearchIcon
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--v4-fg-3)]"
              />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t4("v4FilterPlaceholder")}
                aria-label={t4("v4FilterPlaceholder")}
                aria-controls="v4-launcher-results"
                className="v4-input !py-4 pl-12 text-base"
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t4("v4CloseExplore")}
              className="v4-btn v4-btn-secondary !px-3.5 !py-3.5"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          {/* Announced, not just drawn: a sighted reader watches the list shrink, a screen-reader
              user is told how many pages are left. */}
          <p aria-live="polite" className="v4-sr">
            {trimmed
              ? `${count} ${count === 1 ? t4("v4MatchLabel") : t4("v4MatchesLabel")}`
              : t4("v4LauncherHint")}
          </p>

          <div id="v4-launcher-results" className="mt-7 pb-4">
            {trimmed ? (
              <Results
                results={results}
                query={trimmed}
                active={active}
                onHover={setActive}
                onPick={go}
                t={t}
                t4={t4}
              />
            ) : (
              <Directory t={t} t4={t4} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type T = ReturnType<typeof useV4>["t"];
type T4 = ReturnType<typeof useV4>["t4"];

/** The filtered state: a ranked list of every page that matched, not just the ones in the menu. */
function Results({
  results,
  query,
  active,
  onHover,
  onPick,
  t,
  t4,
}: {
  results: ReturnType<typeof searchPages>;
  query: string;
  active: number;
  onHover: (i: number) => void;
  onPick: (href: string) => void;
  t: T;
  t4: T4;
}) {
  if (results.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="v4-h3">{t4("v4NoMatches")}</p>
        <p className="v4-body mx-auto mt-2">{t4("v4NoMatchesHint")}</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-1.5">
      {results.map((hit, i) => (
        <li key={hit.href}>
          <Link
            href={toV4(hit.href)}
            onClick={(e) => {
              e.preventDefault();
              onPick(toV4(hit.href));
            }}
            onMouseEnter={() => onHover(i)}
            aria-current={i === active ? "true" : undefined}
            className={`flex items-center justify-between gap-4 rounded-[var(--v4-r-sm)] border px-4 py-3.5 transition-colors ${
              i === active
                ? "border-[var(--v4-edge-2)] bg-[var(--v4-surface-2)]"
                : "border-transparent"
            }`}
          >
            <span className="min-w-0">
              <span className="block truncate font-bold">
                <HighlightedText text={t(hit.titleKey)} query={query} />
              </span>
              <span className="v4-caption mt-0.5 block truncate">
                {t(hit.sectionKey)}
                {hit.groupKey ? ` · ${t(hit.groupKey)}` : ""}
              </span>
            </span>
            <ArrowRightIcon size={17} className="shrink-0 text-[var(--v4-fg-3)]" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** The resting state: the four verbs, then the whole site in columns. */
function Directory({ t, t4 }: { t: T; t4: T4 }) {
  return (
    <>
      <h2 className="v4-label">{t4("v4QuickTasks")}</h2>
      <ul className="mt-3.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {V4_TASKS.map((task) => {
          const Glyph = TASK_ICONS[task.icon];
          return (
            <li key={task.key}>
              <Link
                href={task.href}
                className="v4-plane-flat v4-plane-lift group flex items-center gap-3.5 px-4 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--v4-r-xs)] bg-[var(--v4-surface-2)] text-[var(--v4-accent)]">
                  <Glyph size={19} />
                </span>
                <span className="text-[0.9375rem] font-bold leading-snug">{t4(task.key)}</span>
                <ArrowRightIcon
                  size={16}
                  className="ml-auto shrink-0 text-[var(--v4-fg-3)] transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="v4-label mt-9">{t4("v4Directory")}</h2>
      <div className="mt-4 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {V4_SECTIONS.map((section) => (
          <nav key={section.key} aria-labelledby={`v4-nav-${section.key}`}>
            <Link
              id={`v4-nav-${section.key}`}
              href={section.href}
              className="v4-link !text-[0.9375rem] !font-bold"
            >
              {t(section.key)}
            </Link>
            {section.groups.map((group) => (
              <div key={group.heading} className="mt-4">
                <h3 className="v4-label">{t(group.heading)}</h3>
                <ul className="mt-2 grid gap-0.5">
                  {group.entries.map((entry) => (
                    <li key={`${group.heading}-${entry.key}-${entry.href}`}>
                      <Link
                        href={entry.href}
                        className="-mx-2 block rounded-[var(--v4-r-xs)] px-2 py-1.5 text-[0.875rem] leading-snug text-[var(--v4-fg-2)] transition-colors hover:bg-[var(--v4-surface-2)] hover:text-[var(--v4-fg)]"
                      >
                        {t(entry.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        ))}
      </div>
    </>
  );
}
