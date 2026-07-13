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
 * The terms, disclaimer and governing law a reader must accept before the suit-filed data is shown.
 *
 * It is a contract, so it is set as one: numbered clauses in `decimal-leading-zero`, ruled between
 * the three parts, and the accept/decline pair at the foot under a strong rule. The part headings
 * carry their own numerals in the catalog ("I.", "II.", "III."), which is why they are not numbered
 * a second time here.
 */
export default function SuitFiledContent() {
  const { t } = useV3();

  const terms = [
    t("suitFiledTerm1"),
    t("suitFiledTerm2"),
    t("suitFiledTerm3"),
    t("suitFiledTerm4"),
    t("suitFiledTerm5"),
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
        title={t("suitFiledPageTitle")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerCorpSuitFiledHeading"), href: toV3("/suit-filed-cases/overview") },
          { label: t("suitFiledSideSuit") },
        ]}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
            <SectionRail active="suitFiledSideSuit" className="self-start lg:sticky lg:top-32" />

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
                <p>{t("suitFiledDisclaimerIntro")}</p>
                <ol>
                  {disclaimers.map((disclaimer, i) => (
                    <li key={i}>{disclaimer}</li>
                  ))}
                </ol>

                <h2 id="governing-law" className="scroll-mt-28">
                  {t("suitFiledGoverningHeading")}
                </h2>
                <ul>
                  <li>{t("suitFiledGoverning")}</li>
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
