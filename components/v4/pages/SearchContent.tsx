"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import HighlightedText from "@/components/shared/HighlightedText";
import { Container, Section } from "@/components/v4/ui/Layout";
import { ArrowRightIcon, SearchIcon } from "@/components/v4/ui/Icons";
import { ButtonLink } from "@/components/v4/ui/Button";
import { searchPages } from "@/lib/searchIndex";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The full search results page.
 *
 * The Launcher answers most searches without ever leaving the page, so this exists for the two
 * cases it cannot: a reader who arrived from a shared `?q=` URL, and a reader who wants the whole
 * ranked list rather than the top eight.
 *
 * It has three states, and all three are designed rather than defaulted: a *start* state that says
 * what search can do, an *empty* state that says why nothing matched and what to try, and a results
 * list. The one thing it never does is show a blank page with a spinner.
 */
export default function SearchContent() {
  const { t, t4, language } = useV4();
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const trimmed = query.trim();
  const results = useMemo(
    () => (trimmed ? searchPages(trimmed, language) : []),
    [trimmed, language],
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Keep the URL in step with what is on screen, so the result list can be shared or reloaded.
    router.replace(trimmed ? `${toV4("/search")}?q=${encodeURIComponent(trimmed)}` : toV4("/search"));
  };

  return (
    <Section space="lg">
      <Container width="default">
        <h1 className="v4-h1">{t("searchTitle")}</h1>

        <form role="search" onSubmit={onSubmit} className="mt-8">
          <div className="relative">
            <SearchIcon
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--v4-fg-3)]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t4("v4SearchPlaceholder")}
              aria-label={t4("v4SearchPlaceholder")}
              className="v4-input !py-4 pl-12 text-base"
            />
          </div>
        </form>

        {/* The count, announced as well as printed. */}
        <p aria-live="polite" className="v4-label mt-8">
          {trimmed
            ? `${results.length} ${
                results.length === 1 ? t("searchResultsCountOne") : t("searchResultsCount")
              }`
            : ""}
        </p>

        {!trimmed ? (
          <div className="v4-plane mt-4 px-6 py-14 text-center sm:px-10">
            <h2 className="v4-h3">{t4("v4SearchStartTitle")}</h2>
            <p className="v4-body mx-auto mt-3">{t4("v4SearchStartBody")}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="v4-plane mt-4 px-6 py-14 text-center sm:px-10">
            <h2 className="v4-h3">{t4("v4SearchEmptyTitle")}</h2>
            <p className="v4-body mx-auto mt-3">{t4("v4SearchEmptyBody")}</p>
            <div className="mt-7">
              <ButtonLink href={toV4("/sitemap")} variant="secondary">
                {t4("v4NotFoundCta")}
              </ButtonLink>
            </div>
          </div>
        ) : (
          <ul className="mt-4 grid gap-2">
            {results.map((hit) => (
              <li key={hit.href}>
                <Link
                  href={toV4(hit.href)}
                  className="v4-plane v4-plane-lift group flex items-center justify-between gap-4 px-5 py-4"
                >
                  <span className="min-w-0">
                    <span className="block font-bold group-hover:text-[var(--v4-accent)]">
                      <HighlightedText text={t(hit.titleKey)} query={trimmed} />
                    </span>
                    <span className="v4-caption mt-1 block">
                      {t(hit.sectionKey)}
                      {hit.groupKey ? ` · ${t(hit.groupKey)}` : ""}
                    </span>
                  </span>
                  <ArrowRightIcon
                    size={17}
                    className="shrink-0 text-[var(--v4-fg-3)] transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
