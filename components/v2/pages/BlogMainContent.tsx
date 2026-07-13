"use client";

import Link from "next/link";
import type { BlogCard } from "@/lib/blogCards";
import { CREDIT_ADVICE_CARDS, NEW_TO_CREDIT_CARDS } from "@/lib/blogCards";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Card from "@/components/v2/ui/Card";
import Button from "@/components/v2/ui/Button";
import Reveal from "@/components/v2/motion/Reveal";
import HeroBand from "@/components/v2/pages/knowledge/HeroBand";
import { ArrowRightIcon } from "@/components/icons";

/** V1's blog masthead artwork. */
const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/main-banner.jpg";

/**
 * The four stories V1 pins beside the masthead.
 *
 * V1 hardcodes their headlines as English string literals in the component — the one place on the
 * blog where the copy never reaches `t()`. The same four articles already exist in
 * `lib/blogCards.ts` with a headline per locale, so they are taken from there instead: identical
 * stories, and the panel now reads in the reader's language like everything around it.
 */
const FEATURED: BlogCard[] = [
  CREDIT_ADVICE_CARDS[0], // Building a Strong Financial Foundation: Essential Money Skills…
  NEW_TO_CREDIT_CARDS[1], // New-to-credit? Here's how to maintain a healthy CIBIL score
  NEW_TO_CREDIT_CARDS[3], // First-time user's guide to establishing credit
  CREDIT_ADVICE_CARDS[7], // Safeguarding your Credit Profile
];

/**
 * The six categories, in V1's order. "Life Events" is the one that has no listing page — V1 parks
 * it on `"#"`; here the tile states plainly that its content is coming, which is what V1's own
 * catalog says to say, and no reader is sent to a link that goes nowhere.
 */
interface Category {
  key: TranslationKey;
  href?: string;
  /** V1 colours the tiles grey / cyan / gold in this order; the accent keeps that cadence. */
  accent: "neutral" | "cyan" | "gold";
}

const CATEGORIES: Category[] = [
  { key: "creditAdviceTitle", href: toV2("/credit-advice"), accent: "neutral" },
  { key: "creditMythsTitle", href: toV2("/credit-myths"), accent: "cyan" },
  { key: "watchLearnTitle", href: toV2("/watch-and-learn"), accent: "gold" },
  { key: "blogCatLifeEvents", accent: "neutral" },
  { key: "commercialCreditTitle", href: toV2("/commercial-credit"), accent: "gold" },
  { key: "newToCreditTitle", href: toV2("/new-to-credit"), accent: "neutral" },
];

const ACCENT: Record<Category["accent"], string> = {
  neutral: "from-[rgba(169,183,200,0.35)] to-transparent",
  cyan: "from-[var(--v2-cyan)] to-transparent",
  gold: "from-[var(--v2-gold)] to-transparent",
};

export default function BlogMainContent() {
  const { t, language } = useV2();

  return (
    <>
      <PageHero
        size="lg"
        tone="deep"
        eyebrow={t("blogLabel")}
        title={t("blogHeroTitle")}
        lede={t("blogHeroSubtitle")}
        breadcrumbs={[{ label: t("navKnowledge") }, { label: t("blogLabel") }]}
        media={
          <Card padding="lg" spotlight className="bg-[rgba(11,18,32,0.6)]">
            <p className="v2-eyebrow text-[var(--v2-text-3)]">{t("filterFeatured")}</p>
            <ul className="mt-7 divide-y divide-[var(--v2-line)]">
              {FEATURED.map((story) => (
                <li key={story.title.en} className="py-5 first:pt-0 last:pb-0">
                  <p className="text-[15px] font-bold leading-snug text-[var(--v2-text)]">
                    {story.title[language]}
                  </p>
                  <p className="v2-eyebrow mt-2.5 text-[var(--v2-cyan)]">{t("blogTag")}</p>
                </li>
              ))}
            </ul>
          </Card>
        }
      />

      <HeroBand src={HERO_IMAGE} />

      <Section space="lg" tone="canvas">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              index="01"
              eyebrow={t("blogCategoryLabel")}
              title={t("topicsHeading")}
              lede={t("learnSubtitle")}
            />
            <Reveal variant="fade" delay={120}>
              <Button href={toV2("/credit-advice")} variant="ghost" arrow>
                {t("blogViewAllPlain")}
              </Button>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category, index) => {
              const label = t(category.key);

              const tile = (
                <Card
                  spotlight
                  interactive={Boolean(category.href)}
                  padding="none"
                  className="h-full"
                >
                  {/* The accent bar carries V1's per-tile colour without repainting the whole card. */}
                  <span
                    aria-hidden
                    className={`block h-1 w-full bg-linear-to-r ${ACCENT[category.accent]}`}
                  />
                  <div className="flex h-full flex-col justify-between gap-10 p-8">
                    <h3 className="v2-h3 font-light text-[var(--v2-text)] transition-colors duration-300 group-hover/tile:text-[var(--v2-cyan)]">
                      {label}
                    </h3>

                    {category.href ? (
                      <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v2-cyan)]">
                        <span className="v2-underline">{t("blogViewAll")}</span>
                        <ArrowRightIcon
                          aria-hidden
                          className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--v2-ease)] group-hover/tile:translate-x-1"
                        />
                      </span>
                    ) : (
                      <span className="text-xs leading-relaxed text-[var(--v2-text-3)]">
                        {t("sectionContentComingSoon")}
                      </span>
                    )}
                  </div>
                </Card>
              );

              return (
                <Reveal
                  as="li"
                  key={category.key}
                  variant="up"
                  delay={(index % 3) * 90}
                  className="group/tile h-full"
                >
                  {category.href ? (
                    <Link
                      href={category.href}
                      className="v2-focus block h-full rounded-[var(--v2-r-lg)]"
                    >
                      {tile}
                    </Link>
                  ) : (
                    tile
                  )}
                </Reveal>
              );
            })}
          </ul>

          <Reveal variant="fade">
            <p className="mt-16 max-w-4xl text-xs leading-relaxed text-[var(--v2-text-3)]">
              {t("blogDisclaimer")}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
