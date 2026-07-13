"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { searchPages, POPULAR_ENTRIES, type SearchEntry } from "@/lib/searchIndex";
import HighlightedText from "@/components/shared/HighlightedText";
import { SearchIcon, CloseIcon } from "@/components/icons";

export default function SearchResultsContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  const query = (searchParams.get("q") ?? "").trim();
  const results = useMemo(() => searchPages(query, language), [query, language]);

  return (
    <section className="mx-auto max-w-4xl px-6 py-10 sm:px-8">
      <h1 className="text-[26px] font-bold leading-snug text-gray-900">{t("searchTitle")}</h1>

      {/* Keyed on the query so the field resets whenever the URL changes from outside this form —
          the header search, a shared link, the back button — without syncing state in an effect. */}
      <SearchForm key={query} initialQuery={query} />

      {query && (
        // Query first, then the count: the count word order differs across the four languages,
        // and this phrasing reads correctly in all of them without string interpolation.
        <p className="mt-6 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">“{query}”</span> — {results.length}{" "}
          {results.length === 1 ? t("searchResultsCountOne") : t("searchResultsCount")}
        </p>
      )}

      {query && results.length > 0 && (
        <ul className="mt-4 divide-y divide-gray-100 border-t border-gray-100">
          {results.map((result) => (
            <li key={result.href}>
              <Link href={result.href} className="group block py-4">
                <p className="text-base font-semibold text-[#0f6cbd] group-hover:underline">
                  <HighlightedText text={t(result.titleKey)} query={query} />
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {t(result.sectionKey)}
                  {result.groupKey ? ` › ${t(result.groupKey)}` : ""}
                </p>
                <p className="mt-1 text-xs text-gray-400">{result.href}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query && results.length === 0 && (
        <div className="mt-4 rounded border border-gray-200 bg-gray-50 p-6">
          <p className="font-semibold text-gray-900">{t("searchNoResultsTitle")}</p>
          <p className="mt-2 text-sm text-gray-600">{t("searchNoResultsBody")}</p>
        </div>
      )}

      <PopularPages entries={POPULAR_ENTRIES} heading={query ? t("searchTryHeading") : t("searchPopularHeading")} />

      <p className="mt-10 text-sm text-gray-600">
        {t("searchBrowseSitemapPrefix")}{" "}
        <Link href="/sitemap" className="font-semibold text-[#0f6cbd] hover:underline">
          {t("footerSitemap")}
        </Link>
      </p>
    </section>
  );
}

function SearchForm({ initialQuery }: { initialQuery: string }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [draft, setDraft] = useState(initialQuery);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="relative mt-6">
      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        aria-label={t("searchPlaceholder")}
        placeholder={t("searchPlaceholder")}
        autoComplete="off"
        className="w-full rounded border border-gray-300 px-4 py-3 pr-20 text-sm focus:border-[#00b0f0] focus:outline-none focus:ring-1 focus:ring-[#00b0f0]"
      />
      {draft && (
        <button
          type="button"
          aria-label={t("searchClear")}
          onClick={() => {
            setDraft("");
            router.push("/search");
          }}
          className="absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
      <button
        type="submit"
        aria-label={t("searchPlaceholder")}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00b0f0]"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </form>
  );
}

function PopularPages({ entries, heading }: { entries: SearchEntry[]; heading: string }) {
  const { t } = useLanguage();

  return (
    <div className="mt-10">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800">{heading}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {entries.map((entry) => (
          <li key={entry.href}>
            <Link
              href={entry.href}
              className="inline-block rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-[#00b0f0] hover:text-[#00b0f0]"
            >
              {t(entry.titleKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
