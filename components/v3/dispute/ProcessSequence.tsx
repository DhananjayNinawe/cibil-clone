"use client";

import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import Steps from "@/components/v3/ui/Steps";
import Callout from "@/components/v3/ui/Callout";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * What CIBIL does with a dispute, set as a numbered sequence of clauses.
 *
 * V1 draws this as a flow chart — a raster image shipped from cibil.com, unreadable on a phone,
 * untranslated in every locale but English, and invisible to a screen reader. The information in
 * it is a *procedure*, and a procedure is a numbered list; the only thing the chart added was the
 * accept/reject fork, which is expressed here typographically instead: clause 04 states the
 * decision and its two outcomes hang off it as two marginal notes, one pine, one ochre.
 *
 * Every string is V1's own (`diag*`), including the turnaround-time footnote, which is the single
 * most consequential number on the page and is now real text rather than pixels in a JPEG.
 *
 * Shared by the consumer and microfinance dispute pages — V1 shares the same component between
 * them too, varying only the lede.
 */
export default function ProcessSequence({ index, ledeKey }: { index: string; ledeKey: TranslationKey }) {
  const { t, t3 } = useV3();

  return (
    <Section space="lg" tone="sunken" ruled>
      <Container>
        <SectionHead
          index={index}
          folio={t3("v3ProcessLabel")}
          title={t("whatWeDoHeading")}
          lede={t(ledeKey)}
        />

        <Reveal variant="rise" className="mt-4">
          <Steps
            steps={[
              { title: t("diagStep1Title"), body: <p>{t("diagStep1Desc")}</p> },
              { title: t("diagStep2Title"), body: <p>{t("diagStep2Desc")}</p> },
              { title: t("diagStep3Title") },
              {
                title: t("diagDecisionText"),
                body: (
                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <Callout tone="success" title={t("diagAcceptedTitle")}>
                      <p>{t("diagAcceptedDesc")}</p>
                    </Callout>
                    <Callout tone="warning" title={t("diagRejectedTitle")}>
                      <p>{t("diagRejectedDesc")}</p>
                    </Callout>
                  </div>
                ),
              },
              { title: t("diagFinalTitle"), body: <p>{t("diagFinalDesc")}</p> },
            ]}
          />
        </Reveal>

        <p className="v3-caption mt-8 max-w-[60ch]">{t("diagTurnaroundTime")}</p>
      </Container>
    </Section>
  );
}
