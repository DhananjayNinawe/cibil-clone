"use client";

import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Prose from "@/components/v3/ui/Prose";
import Rule from "@/components/v3/ui/Rule";
import ConsentControls from "@/components/v3/pages/suit-filed/ConsentControls";
import SectionRail from "@/components/v3/pages/suit-filed/SectionRail";

/**
 * The non-suit-filed terms. Seven conditions rather than five, and a governing-law part that
 * restates the five disclaimer clauses nested beneath it — that repetition is in the source
 * document and is load-bearing (the clauses are re-incorporated into the indemnity), so it is
 * reproduced, not tidied away.
 */
export default function NonSuitFiledContent() {
  const { t } = useV3();

  const terms = [
    t("nonSuitTerm1"),
    t("nonSuitTerm2"),
    t("nonSuitTerm3"),
    t("nonSuitTerm4"),
    t("nonSuitTerm5"),
    t("nonSuitTerm6"),
    t("nonSuitTerm7"),
  ];

  const disclaimers = [
    t("suitFiledDisc1"),
    t("suitFiledDisc2"),
    t("suitFiledDisc3"),
    t("suitFiledDisc4"),
    t("suitFiledDisc5"),
  ];

  return (
    <>
      <PageHeader
        folio={t("footerCorpSuitFiledHeading")}
        title={t("nonSuitPageTitle")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerCorpSuitFiledHeading"), href: toV3("/suit-filed-cases/overview") },
          { label: t("suitFiledSideNonSuit") },
        ]}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
            <SectionRail active="suitFiledSideNonSuit" className="self-start lg:sticky lg:top-32" />

            <div className="min-w-0">
              <Prose>
                <h2 id="terms" className="scroll-mt-28">
                  {t("suitFiledTermsHeading")}
                </h2>
                <ol>
                  {terms.map((term, i) => (
                    <li key={i}>{term}</li>
                  ))}
                </ol>

                <h2 id="disclaimer" className="scroll-mt-28">
                  {t("suitFiledDisclaimerHeading")}
                </h2>
                <ol>
                  {disclaimers.map((disclaimer, i) => (
                    <li key={i}>{disclaimer}</li>
                  ))}
                </ol>

                <h2 id="governing-law" className="scroll-mt-28">
                  {t("suitFiledGoverningHeading")}
                </h2>
                <ul>
                  <li>{t("nonSuitGoverning1")}</li>
                  <li>
                    {t("nonSuitGoverning2")}
                    <ul className="mt-3">
                      {disclaimers.map((disclaimer, i) => (
                        <li key={i}>{disclaimer}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </Prose>

              <ConsentControls />
            </div>
          </div>

          <Rule className="mt-24 sm:mt-32" />
        </Container>
      </Section>
    </>
  );
}
