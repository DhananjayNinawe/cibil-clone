"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { V3_STATS } from "@/lib/v3/libraryData";
import { Container, Folio, Section } from "@/components/v3/ui/Layout";
import Button from "@/components/v3/ui/Button";
import PageHeader from "@/components/v3/ui/PageHeader";
import { ArrowUpRight } from "@/components/v3/ui/Icons";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import SetType from "@/components/v3/motion/SetType";
import Tally from "@/components/v3/motion/Tally";

const HERO_IMAGE_URL =
  "https://www.transunioncibil.com/content/dam/transunion-cibil/corporate/images/header/About-Us-2hero-D-220916.jpg";

/** Where the story goes next. Both are real pages in the About part of the index. */
const ONWARD: { key: TranslationKey; href: string }[] = [
  { key: "footerCompanyHistory", href: "/about-us/company-history" },
  { key: "footerOfficialPartners", href: "/official-partners" },
  { key: "footerCodeOfConduct", href: "/external-links/business-code-of-conduct" },
];

/**
 * The company's own story — and the one page on the site that is pure statement.
 *
 * V1 sets it as a grey hero and two paragraphs of body copy, which is the least this text
 * deserves: it is the argument for why a credit bureau should be trusted at all. Here it is a
 * spread — the statement hung in the left column at display scale, the two paragraphs running to
 * a reading measure beside it — and then the page raises its voice exactly once, on a black band
 * carrying "Information for Good." with the company's scale tallied beneath it.
 *
 * Nothing is cut: both paragraphs, the eyebrow, the description and the KNOW MORE jump are all
 * V1's, in V1's words.
 */
export default function AboutUsContent() {
  const { t, t3 } = useV3();

  return (
    <>
      <PageHeader
        size="full"
        folio={t("aboutUsEyebrow")}
        title={t("aboutUsHeroTitle")}
        lede={t("aboutUsHeroDesc")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("aboutUsHeroTitle") },
        ]}
        actions={
          <Button href="#about" variant="outline" size="lg" arrow>
            {t("knowMoreBtn")}
          </Button>
        }
        media={
          <Plate
            src={HERO_IMAGE_URL}
            alt={t("aboutUsHeroTitle")}
            ratio="3 / 2"
            fit="cover"
            drift
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
      />

      {/* ─────────────────────────────────────────────────────────── The statement */}
      <Section id="about" space="lg" className="scroll-mt-24">
        <Container>
          <Folio index="01">{t("aboutUsEyebrow")}</Folio>

          <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-[0.95fr_1.05fr]">
            {/* min-w-0: a grid item's automatic minimum is its min-content width, and the display
                serif would otherwise push the column past the viewport rather than wrap. */}
            <div className="min-w-0">
              <h2 className="v3-h1 text-balance">
                <SetType lines={[t("aboutSectionTitle")]} />
              </h2>
            </div>

            <div className="min-w-0">
              {/* The opening paragraph is the thesis, so it is set as a lede; the second is the
                  evidence, and sits back into the prose voice. */}
              <Reveal variant="rise">
                <p className="v3-lede max-w-[var(--v3-measure)] text-pretty border-t border-[var(--v3-line-3)] pt-8 text-[var(--v3-fg)]">
                  {t("aboutParagraph1")}
                </p>
              </Reveal>

              <Reveal variant="rise" delay={90}>
                <p className="mt-8 max-w-[var(--v3-measure)] text-pretty text-base leading-relaxed text-[var(--v3-fg-2)]">
                  {t("aboutParagraph2")}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────── The band: what it is all for */}
      <Section space="xl" tone="ink">
        <Container>
          <Folio index="02">{t3("v3StatsKicker")}</Folio>

          <h2 className="v3-display v3-em mt-12 max-w-[14ch] text-balance">
            <SetType lines={[t("infoForGood")]} />
          </h2>

          <dl className="mt-20 grid gap-x-12 gap-y-12 sm:grid-cols-3">
            {V3_STATS.map((stat, i) => {
              const printed = t(stat.valueKey);
              // "46%" carries its own unit; "183" takes one from a separate key. Splitting the
              // numerals off the suffix lets the tally climb and still print what the catalog says.
              const suffix = printed.replace(/[\d\s,.]/g, "");

              return (
                <Reveal key={stat.key} variant="rise" delay={i * 80}>
                  <div className="border-t border-[var(--v3-line-2)] pt-8">
                    <dt className="sr-only">{t(stat.labelKey)}</dt>
                    <dd>
                      <p className="flex items-baseline">
                        <span className="v3-num text-5xl leading-none font-medium tracking-tight text-[var(--v3-fg)] lg:text-6xl">
                          <Tally value={stat.value} suffix={suffix} />
                        </span>
                        {stat.unitKey && (
                          <span className="v3-folio ml-3 text-[var(--v3-gold)]">
                            {t(stat.unitKey)}
                          </span>
                        )}
                      </p>

                      <p className="mt-5 max-w-[28ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                        {t(stat.labelKey)}
                      </p>
                    </dd>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </Container>
      </Section>

      {/* ───────────────────────────────────────────────────────────── Where it goes on */}
      <Section space="md">
        <Container>
          <h2 className="v3-folio flex items-center gap-3">
            <span aria-hidden className="h-px w-8 shrink-0 bg-[var(--v3-line-2)]" />
            {t3("v3RelatedPages")}
          </h2>

          <ul className="mt-8 border-t border-[var(--v3-line-2)]">
            {ONWARD.map((entry, i) => (
              <Reveal key={entry.key} variant="rise" delay={i * 70} as="li">
                <Link
                  href={toV3(entry.href)}
                  className="v3-focus v3-row group flex items-center justify-between gap-6 border-b border-[var(--v3-line)] py-6"
                >
                  <span className="v3-h3 text-pretty">
                    <span className="v3-link-draw">{t(entry.key)}</span>
                  </span>

                  <ArrowUpRight className="shrink-0 text-base text-[var(--v3-fg-3)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
