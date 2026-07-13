"use client";

import { useState } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { LEARN_FILTERS, LEARN_SECTIONS, type ArticleFormat } from "@/lib/v2/learnData";
import type { TranslationKey } from "@/lib/i18n";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import ArticleCard from "@/components/v2/ui/ArticleCard";
import Reveal from "@/components/v2/motion/Reveal";

type FormatOption = "all" | ArticleFormat;

const FORMATS: { value: FormatOption; label: TranslationKey }[] = [
  { value: "all", label: "allFormats" },
  { value: "blog", label: "formatBlogs" },
  { value: "video", label: "formatVideo" },
];

/**
 * The credit-education library.
 *
 * Same two-axis filter V1 offers (topic × format), rebuilt as segmented pills instead of a
 * dropdown: on a phone the format menu was a tap-to-open popover for three options. The lead
 * article is given a full editorial column, and the rest fall into an asymmetric grid.
 */
export default function Learn() {
  const { t, tv } = useV2();
  const [topic, setTopic] = useState<TranslationKey>("filterFeatured");
  const [format, setFormat] = useState<FormatOption>("all");

  const articles = (LEARN_SECTIONS[topic] ?? []).filter(
    (article) => format === "all" || article.format === format,
  );
  const lead = articles.find((article) => article.featured);
  const rest = articles.filter((article) => !article.featured);

  return (
    <Section id="learn" space="xl" tone="raised">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            eyebrow={t("navKnowledge")}
            title={
              <>
                {t("learnHeadingPrefix")}{" "}
                <span className="text-[var(--v2-cyan)]">{t("learnHeadingBrand")}</span>
              </>
            }
            lede={t("learnSubtitle")}
          />

          <Reveal variant="fade" delay={120}>
            <fieldset className="flex gap-1 rounded-full border border-[var(--v2-line)] bg-[var(--v2-surface)] p-1.5 backdrop-blur-md">
              <legend className="sr-only">{tv("v2FiltersLabel")}</legend>
              {FORMATS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={format === option.value}
                  onClick={() => setFormat(option.value)}
                  className={`v2-focus rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${
                    format === option.value
                      ? "bg-[var(--v2-cyan)] text-[#04202c]"
                      : "text-[var(--v2-text-3)] hover:text-[var(--v2-text)]"
                  }`}
                >
                  {t(option.label)}
                </button>
              ))}
            </fieldset>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={80} className="mt-12 flex flex-wrap gap-2.5">
          {LEARN_FILTERS.map((filter) => {
            const active = filter === topic;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={active}
                onClick={() => setTopic(filter)}
                className={`v2-focus rounded-full border px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                  active
                    ? "border-[var(--v2-cyan)] bg-[rgba(0,176,240,0.12)] text-[var(--v2-cyan)] shadow-[0_0_24px_-6px_rgba(0,176,240,0.8)]"
                    : "border-[var(--v2-line-2)] text-[var(--v2-text-2)] hover:border-[var(--v2-text-3)] hover:text-[var(--v2-text)]"
                }`}
              >
                {t(filter)}
              </button>
            );
          })}
        </Reveal>

        {/* `key` on the grid restarts the reveal animation when the filter changes — without it
            the new cards would swap in already-revealed, and the change would read as a jump. */}
        <div key={`${topic}-${format}`} className="mt-14">
          {articles.length === 0 ? (
            <p className="py-16 text-center text-sm text-[var(--v2-text-3)]">{t("searchNoSuggestions")}</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {lead && (
                <Reveal variant="blur" className="lg:col-span-1 lg:row-span-2">
                  <ArticleCard
                    title={t(lead.title)}
                    category={t(lead.categoryLabel)}
                    image={lead.image}
                    variant="hero"
                    video={lead.format === "video"}
                    videoLabel={t("a11yPlayVideo")}
                    className="h-full"
                  />
                </Reveal>
              )}

              {rest.map((article, index) => (
                <Reveal key={article.key} variant="up" delay={index * 80}>
                  <ArticleCard
                    title={t(article.title)}
                    category={t(article.categoryLabel)}
                    image={article.image}
                    video={article.format === "video"}
                    videoLabel={t("a11yPlayVideo")}
                    className="h-full"
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
