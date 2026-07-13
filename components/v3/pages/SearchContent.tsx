"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { POPULAR_ENTRIES, searchPages, type SearchEntry } from "@/lib/searchIndex";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import { ArrowRight, Close, Search } from "@/components/v3/ui/Icons";
import Reveal from "@/components/v3/motion/Reveal";
import HighlightedText from "@/components/shared/HighlightedText";

/**
 * The results page.
 *
 * The index is V1's (lib/searchIndex.ts) — built from the sitemap, so every page is findable by
 * construction and in all four languages. V3 adds no second copy of it; it only maps the hrefs
 * through `toV3()` and re-sets the presentation.
 *
 * And the presentation is the point: a search result is an index entry, so it is typeset as one.
 * The field is a ruled line you write on rather than a boxed input; each hit is a ruled row with
 * its title in ink, its route printed underneath in the mono voice, and the section it belongs to
 * hung as a folio at the end of the line. No blue links, no cards, no relevance bars.
 */
export default function SearchContent() {
  const { t, t3, language } = useV3();
  const searchParams = useSearchParams();

  const query = (searchParams.get("q") ?? "").trim();
  const results = useMemo(() => searchPages(query, language), [query, language]);

  return (
    <>
      <PageHeader
        title={t("searchTitle")}
        lede={t3("v3SearchHint")}
        breadcrumbs={[{ label: t("searchHome"), href: toV3("/") }, { label: t("searchTitle") }]}
        actions={
          // Keyed on the query so the field resets whenever the URL changes from outside this form
          // — the masthead palette, a shared link, the back button — without syncing state in an
          // effect.
          <SearchForm key={query} initialQuery={query} />
        }
      />

      <Section space="md">
        <Container>
          {query && (
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h2 className="v3-h3 text-pretty">“{query}”</h2>

              <p className="v3-folio">
                <span className="v3-num mr-1.5 text-[var(--v3-fg)]">{results.length}</span>
                {results.length === 1 ? t("searchResultsCountOne") : t("searchResultsCount")}
              </p>
            </div>
          )}

          {query && results.length > 0 && (
            <ul className="mt-10 border-t border-[var(--v3-line-2)]">
              {results.map((result, i) => (
                <Reveal key={result.href} as="li" variant="rise" delay={Math.min(i, 5) * 50}>
                  <Link
                    href={toV3(result.href)}
                    className="v3-focus v3-row grid gap-x-8 gap-y-2 border-b border-[var(--v3-line)] px-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline"
                  >
                    <span className="min-w-0">
                      <span className="block text-lg leading-snug font-medium text-pretty text-[var(--v3-fg)]">
                        <span className="v3-link-draw">
                          <HighlightedText text={t(result.titleKey)} query={query} />
                        </span>
                      </span>

                      {/* The route itself, printed. An index tells you the page number. */}
                      <span className="v3-caption mt-2 block truncate">{toV3(result.href)}</span>
                    </span>

                    <span className="v3-folio sm:text-right">
                      {t(result.sectionKey)}
                      {result.groupKey ? ` · ${t(result.groupKey)}` : ""}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}

          {query && results.length === 0 && (
            <div className="mt-10 border-t border-[var(--v3-line-3)] pt-10">
              <h2 className="v3-h3 text-pretty">{t("searchNoResultsTitle")}</h2>
              <p className="v3-lede mt-5 max-w-[54ch] text-pretty">{t("searchNoResultsBody")}</p>
            </div>
          )}

          <PopularPages
            entries={POPULAR_ENTRIES}
            heading={query ? t("searchTryHeading") : t("searchPopularHeading")}
            className={query ? "mt-20" : "mt-4"}
          />

          <p className="mt-16 text-sm text-[var(--v3-fg-2)]">
            {t("searchBrowseSitemapPrefix")}{" "}
            <Link
              href={toV3("/sitemap")}
              className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
            >
              {t("footerSitemap")}
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}

/** The field: a hairline you write on, at headline scale. */
function SearchForm({ initialQuery }: { initialQuery: string }) {
  const { t } = useV3();
  const router = useRouter();
  const [draft, setDraft] = useState(initialQuery);

  const go = (value: string) =>
    router.push(value ? `${toV3("/search")}?q=${encodeURIComponent(value)}` : toV3("/search"));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    go(draft.trim());
  };

  return (
    <form role="search" onSubmit={onSubmit} className="w-full">
      <div className="flex items-center gap-4 border-b border-[var(--v3-line-3)] pb-3 transition-colors focus-within:border-[var(--v3-accent)]">
        <Search className="shrink-0 text-xl text-[var(--v3-fg-3)]" />

        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          aria-label={t("searchTitle")}
          placeholder={t("searchPlaceholder")}
          autoComplete="off"
          className="w-full min-w-0 bg-transparent text-xl text-[var(--v3-fg)] placeholder:text-[var(--v3-fg-3)] focus:outline-none sm:text-2xl"
        />

        {draft && (
          <button
            type="button"
            aria-label={t("searchClear")}
            onClick={() => {
              setDraft("");
              go("");
            }}
            className="v3-focus shrink-0 text-base text-[var(--v3-fg-3)] transition-colors hover:text-[var(--v3-fg)]"
          >
            <Close />
          </button>
        )}

        <button
          type="submit"
          aria-label={t("searchTitle")}
          className="v3-focus group shrink-0 text-lg text-[var(--v3-fg)]"
        >
          <ArrowRight className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px]" />
        </button>
      </div>
    </form>
  );
}

/**
 * The fallback, and the thing to try next when nothing matched. Set as a numbered index rather
 * than a row of pills — a different rhythm from the ruled results above it.
 */
function PopularPages({
  entries,
  heading,
  className = "",
}: {
  entries: SearchEntry[];
  heading: string;
  className?: string;
}) {
  const { t } = useV3();

  return (
    <div className={className}>
      <h2 className="v3-folio flex items-center gap-3">
        <span aria-hidden className="h-px w-8 shrink-0 bg-[var(--v3-line-2)]" />
        {heading}
      </h2>

      <ul className="mt-6 grid border-t border-[var(--v3-line-2)] sm:grid-cols-2 sm:gap-x-12">
        {entries.map((entry, i) => (
          <li key={entry.href}>
            <Link
              href={toV3(entry.href)}
              className="v3-focus group flex items-baseline gap-4 border-b border-[var(--v3-line)] py-4"
            >
              <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="text-sm leading-snug text-[var(--v3-fg)]">
                <span className="v3-link-draw">{t(entry.titleKey)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
