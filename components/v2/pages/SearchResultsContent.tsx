"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useV2 } from "@/lib/v2/useV2";
import { searchPages, POPULAR_ENTRIES, type SearchEntry } from "@/lib/searchIndex";
import { toV2 } from "@/lib/v2/routes";
import HighlightedText from "@/components/shared/HighlightedText";
import { SearchIcon, CloseIcon, ArrowRightIcon } from "@/components/icons";
import { Container, Section } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Callout from "@/components/v2/ui/Callout";
import Reveal from "@/components/v2/motion/Reveal";

const SEARCH_PATH = toV2("/search");

/**
 * Site search.
 *
 * The ranking is V1's `searchPages()` — the index is built from the sitemap, so it already knows
 * every page this site has, in every language, with the same keyword synonyms. V2 does not rebuild
 * it; it maps the resulting hrefs through `toV2()` so a result opens the V2 page, and re-presents
 * the same three states V1 has: nothing typed, matches, and no matches.
 */
export default function SearchResultsContent() {
  const { t, language } = useV2();
  const searchParams = useSearchParams();

  const query = (searchParams.get("q") ?? "").trim();
  const results = useMemo(() => searchPages(query, language), [query, language]);

  return (
    <>
      <PageHero
        eyebrow={t("footerSitemap")}
        title={t("searchTitle")}
        breadcrumbs={[{ label: t("searchTitle") }]}
        tone="cyan"
        size="sm"
      >
        {/* Keyed on the query so the field resets whenever the URL changes from outside this form —
            the header overlay, a shared link, the back button — without an effect syncing state. */}
        <SearchForm key={query} initialQuery={query} />
      </PageHero>

      <Section space="md">
        <Container width="narrow">
          {query && (
            // Query first, then the count: the count word order differs across the four languages,
            // and this phrasing reads correctly in all of them without string interpolation.
            <p className="text-sm text-[var(--v2-text-3)]">
              <span className="font-bold text-[var(--v2-text)]">“{query}”</span> — {results.length}{" "}
              {results.length === 1 ? t("searchResultsCountOne") : t("searchResultsCount")}
            </p>
          )}

          {query && results.length > 0 && (
            <ul className="mt-8">
              {results.map((result, index) => (
                <Reveal
                  as="li"
                  key={result.href}
                  variant="fade"
                  delay={Math.min(index, 8) * 45}
                  className="border-b border-[var(--v2-line)] first:border-t"
                >
                  <Link
                    href={toV2(result.href)}
                    className="v2-focus group flex items-start gap-6 py-6 transition-colors duration-300"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-bold text-[var(--v2-text)] transition-colors duration-300 group-hover:text-[var(--v2-cyan)]">
                        <HighlightedText text={t(result.titleKey)} query={query} />
                      </span>
                      <span className="mt-1.5 block text-xs text-[var(--v2-text-3)]">
                        {t(result.sectionKey)}
                        {result.groupKey ? ` › ${t(result.groupKey)}` : ""}
                      </span>
                      {/* A URL path, not prose — one of the few strings that is not translated. */}
                      <span className="mt-1 block font-mono text-[11px] text-[var(--v2-line-2)]">
                        {toV2(result.href)}
                      </span>
                    </span>
                    <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 -translate-x-2 text-[var(--v2-cyan)] opacity-0 transition-all duration-300 ease-[var(--v2-ease)] group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}

          {query && results.length === 0 && (
            <Callout tone="warning" title={t("searchNoResultsTitle")} className="mt-8">
              {t("searchNoResultsBody")}
            </Callout>
          )}

          <PopularPages
            entries={POPULAR_ENTRIES}
            heading={query ? t("searchTryHeading") : t("searchPopularHeading")}
          />

          <p className="mt-16 border-t border-[var(--v2-line)] pt-8 text-sm text-[var(--v2-text-3)]">
            {t("searchBrowseSitemapPrefix")}{" "}
            <Link
              href={toV2("/sitemap")}
              className="v2-focus v2-underline font-bold text-[var(--v2-cyan)] hover:text-[var(--v2-cyan-soft)]"
            >
              {t("footerSitemap")}
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}

function SearchForm({ initialQuery }: { initialQuery: string }) {
  const { t } = useV2();
  const router = useRouter();
  const [draft, setDraft] = useState(initialQuery);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    router.push(next ? `${SEARCH_PATH}?q=${encodeURIComponent(next)}` : SEARCH_PATH);
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="relative max-w-2xl">
      {/* Decorative: the input and the submit button are both already labelled. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-[var(--v2-text-3)]"
      >
        <SearchIcon className="h-5 w-5" />
      </span>
      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        aria-label={t("searchPlaceholder")}
        placeholder={t("searchPlaceholder")}
        autoComplete="off"
        className="v2-glass h-16 w-full rounded-full pl-16 pr-28 text-[15px] text-[var(--v2-text)] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[var(--v2-text-3)] focus:border-[rgba(0,176,240,0.6)] focus:shadow-[var(--v2-glow-cyan)]"
      />

      {draft && (
        <button
          type="button"
          aria-label={t("searchClear")}
          onClick={() => {
            setDraft("");
            router.push(SEARCH_PATH);
          }}
          className="v2-focus absolute right-16 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--v2-text-3)] transition-colors duration-200 hover:text-[var(--v2-text)]"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}

      <button
        type="submit"
        aria-label={t("searchPlaceholder")}
        className="v2-focus absolute right-2.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--v2-cyan)] text-[#04202c] transition-[background-color,box-shadow] duration-200 hover:shadow-[var(--v2-glow-cyan)]"
      >
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </form>
  );
}

function PopularPages({ entries, heading }: { entries: SearchEntry[]; heading: string }) {
  const { t } = useV2();

  return (
    <div className="mt-16">
      <h2 className="v2-eyebrow text-[var(--v2-text-3)]">{heading}</h2>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {entries.map((entry) => (
          <li key={entry.href}>
            <Link
              href={toV2(entry.href)}
              className="v2-focus inline-block rounded-full border border-[var(--v2-line-2)] px-5 py-2.5 text-sm text-[var(--v2-text-2)] transition-all duration-300 hover:border-[var(--v2-cyan)] hover:bg-[rgba(0,176,240,0.08)] hover:text-[var(--v2-cyan)]"
            >
              {t(entry.titleKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
