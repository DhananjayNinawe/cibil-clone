"use client";

import { useState } from "react";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { LIBRARY_FILTERS, LIBRARY_SECTIONS } from "@/lib/v3/libraryData";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import ArticleCard from "@/components/v3/ui/ArticleCard";
import Button from "@/components/v3/ui/Button";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * The library, set as a newspaper spread.
 *
 * One lead story runs large down the left of the page; the rest of the collection is a ruled
 * list of secondary entries in the narrow right-hand column — the classic front-page hierarchy,
 * and the reason this reads as editorial rather than as a grid of thumbnails. A five-across grid
 * of identical cards says every article matters equally, which is never true.
 *
 * The topic filters are the ruled index strip along the top; changing one re-sets the spread.
 * Every title and category is an existing key from V1's catalog (lib/v3/libraryData.ts).
 */
export default function Library() {
  const { t } = useV3();
  const [filter, setFilter] = useState<string>(LIBRARY_FILTERS[0]);

  const articles = LIBRARY_SECTIONS[filter] ?? [];
  const lead = articles.find((a) => a.lead) ?? articles[0];
  const rest = articles.filter((a) => a !== lead);

  return (
    <Section space="lg" tone="sunken" ruled>
      <Container>
        <SectionHead
          index="02"
          folio={t("learnSubtitle")}
          title={
            <>
              {t("learnHeadingPrefix")} <span className="v3-em">{t("learnHeadingBrand")}</span>
            </>
          }
          aside={
            <Button href={toV3("/credit-advice")} variant="link" arrow>
              {t("footerCreditEducation")}
            </Button>
          }
        />

        {/* The topic strip. A row of words on a rule — the selected one is underscored in ink. */}
        <div
          role="tablist"
          aria-label={t("learnSubtitle")}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-1 border-b border-[var(--v3-line-2)]"
        >
          {LIBRARY_FILTERS.map((key) => {
            const selected = key === filter;
            return (
              <button
                key={key}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setFilter(key)}
                className={`v3-focus v3-num -mb-px cursor-pointer border-b-2 py-4 text-xs font-medium tracking-[0.08em] transition-colors ${
                  selected
                    ? "border-[var(--v3-fg)] text-[var(--v3-fg)]"
                    : "border-transparent text-[var(--v3-fg-3)] hover:text-[var(--v3-fg)]"
                }`}
              >
                {t(key)}
              </button>
            );
          })}
        </div>

        {/* `key={filter}` remounts the spread when the topic changes, so the reveal replays and
            the new collection is *set* rather than swapped in place. */}
        <div key={filter} className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-[1.35fr_1fr]">
          {lead && (
            <Reveal variant="rise">
              <ArticleCard
                lead
                title={t(lead.title)}
                category={t(lead.categoryLabel)}
                image={lead.image}
                video={lead.format === "video"}
                href={toV3("/watch-and-learn")}
              />
            </Reveal>
          )}

          <div className="border-t border-[var(--v3-line-2)]">
            {rest.map((article, i) => (
              <Reveal key={article.key} variant="rise" delay={80 + i * 60}>
                <a
                  href={toV3(article.format === "video" ? "/watch-and-learn" : "/blog/main")}
                  className="v3-focus group flex items-start gap-5 border-b border-[var(--v3-line)] py-5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="v3-folio mb-2">{t(article.categoryLabel)}</p>
                    <h3 className="text-pretty text-sm leading-snug font-medium text-[var(--v3-fg)]">
                      <span className="v3-link-draw">{t(article.title)}</span>
                    </h3>
                  </div>

                  {/* A thumbnail plate, small and square — an index illustration, not a hero. */}
                  <span
                    aria-hidden
                    className="v3-plate v3-plate-mount relative hidden h-16 w-24 shrink-0 sm:block"
                    style={{ backgroundImage: `url(${article.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
