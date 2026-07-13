"use client";

import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { renderRichText } from "@/lib/richText";
import { SUIT_FILED_OVERVIEW } from "@/lib/footerPageData";
import { Container, Section } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Prose from "@/components/v3/ui/Prose";
import Rule from "@/components/v3/ui/Rule";
import Reveal from "@/components/v3/motion/Reveal";
import SectionRail from "@/components/v3/pages/suit-filed/SectionRail";

/**
 * The suit-filed overview — the two histories (suit-filed accounts, and non-suit-filed accounts)
 * that everything else in this cluster is downstream of.
 *
 * Two long entries, so they are set as two numbered essays under a rule apiece rather than dropped
 * into a single undifferentiated column: the reader needs to see at a glance that these are two
 * separate regimes with two separate RBI circulars behind them.
 */
export default function SuitFiledOverviewContent() {
  const { t, language } = useV3();

  return (
    <>
      <PageHeader
        folio={t("footerCorpSuitFiledHeading")}
        title={t("suitFiledOverviewTitle")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerCorpSuitFiledHeading") },
        ]}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
            <SectionRail active="suitFiledSideOverview" className="self-start lg:sticky lg:top-32" />

            <div className="min-w-0">
              {SUIT_FILED_OVERVIEW[language].map((section, i) => (
                <article
                  key={section.heading}
                  id={`overview-${String(i + 1).padStart(2, "0")}`}
                  className={`scroll-mt-28 ${i > 0 ? "mt-20" : ""}`}
                >
                  <Reveal variant="rise">
                    <h2 className="v3-h3 text-balance">
                      <span
                        aria-hidden
                        className="v3-num mr-4 align-middle text-[0.55em] text-[var(--v3-fg-3)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </h2>
                  </Reveal>

                  <Rule className="mt-6" />

                  <Reveal variant="rise" delay={80}>
                    <Prose className="mt-8">{renderRichText(section.body)}</Prose>
                  </Reveal>
                </article>
              ))}
            </div>
          </div>

          <Rule className="mt-24 sm:mt-32" />
        </Container>
      </Section>
    </>
  );
}
