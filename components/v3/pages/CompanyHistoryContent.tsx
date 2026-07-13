"use client";

import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { COMPANY_HISTORY } from "@/lib/footerPageData";
import { Container, Folio, Section } from "@/components/v3/ui/Layout";
import Button from "@/components/v3/ui/Button";
import PageHeader from "@/components/v3/ui/PageHeader";
import Rule from "@/components/v3/ui/Rule";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";

const HERO_IMAGE_URL =
  "https://www.transunioncibil.com/content/dam/transunion-cibil/business/images/header/post/INT-IN-24-2815101-India-About-us-Web-Image-Desktop-Header.jpg";

/**
 * The chronology.
 *
 * This is the page the whole design language was waiting for. A timeline in V2 is a row of glowing
 * nodes on a gradient wire; here it is what a chronology has always been in print — the year hung
 * in the margin as a mono numeral, the entry set beside it to a reading measure, a hairline between
 * every year and a single vertical rule running the length of the century down the gutter between
 * them. Nothing pulses, nothing connects with an arrow: the rules do all of it.
 *
 * The milestones themselves are V1's data (lib/footerPageData.ts), read per locale — `year` is
 * structural and identical across the four, the prose is translated.
 */
export default function CompanyHistoryContent() {
  const { t, t3, language } = useV3();
  const entries = COMPANY_HISTORY[language];

  // The span of the story, as a mono numeral range. Not language — it is the same in every locale.
  const span = `${entries[0].year}–${entries[entries.length - 1].year}`;

  return (
    <>
      <PageHeader
        folio={t("aboutUsEyebrow")}
        title={t("companyHistoryTitle")}
        lede={t("aboutUsHeroDesc")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerAboutTransunionCibil"), href: toV3("/about-us") },
          { label: t("companyHistoryTitle") },
        ]}
        media={
          <Plate
            src={HERO_IMAGE_URL}
            alt={t("companyHistoryTitle")}
            ratio="16 / 9"
            fit="cover"
            drift
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
      />

      <Section space="lg">
        <Container>
          <Folio index="01">{span}</Folio>

          <ol className="mt-12">
            {entries.map((entry, i) => (
              <Reveal
                key={entry.year}
                as="li"
                variant="rise"
                // The stagger is capped: twelve entries at 60ms each would leave the last one
                // waiting most of a second after it is already on screen.
                delay={Math.min(i, 3) * 60}
              >
                <article className="grid border-t border-[var(--v3-line)] sm:grid-cols-[8rem_1fr] lg:grid-cols-[13rem_1fr]">
                  {/* The year, hung in the margin and set hard against the rule. */}
                  <p className="v3-num pt-8 text-4xl leading-none text-[var(--v3-fg-3)] sm:py-11 sm:pr-8 sm:text-right sm:text-5xl lg:pr-12 lg:text-6xl">
                    {entry.year}
                  </p>

                  {/* The vertical rule is this border. Each row's padding sits inside it, so the
                      segments meet and the line runs unbroken down the whole chronology. */}
                  <div className="min-w-0 pt-4 pb-8 sm:border-l sm:border-[var(--v3-line-2)] sm:py-11 sm:pl-8 lg:pl-12">
                    <div className="max-w-[var(--v3-measure)] space-y-3.5 text-sm leading-relaxed text-pretty text-[var(--v3-fg-2)] sm:text-base">
                      {entry.paras.map((para, p) => (
                        <p key={p}>{para}</p>
                      ))}

                      {entry.bullets && (
                        <ul className="space-y-2 pt-1">
                          {entry.bullets.map((bullet, b) => (
                            <li key={b} className="relative pl-6">
                              {/* An en dash, not a bullet — the same mark .v3-prose uses. */}
                              <span aria-hidden className="absolute top-0 left-0 text-[var(--v3-fg-3)]">
                                —
                              </span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>

          <Rule strong />

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <p className="v3-folio">{t3("v3RelatedPages")}</p>

            <Button href={toV3("/about-us")} variant="outline" arrow>
              {t("footerAboutTransunionCibil")}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
