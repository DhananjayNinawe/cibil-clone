"use client";

import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section } from "@/components/v3/ui/Layout";
import Callout from "@/components/v3/ui/Callout";
import Ledger from "@/components/v3/ui/Ledger";
import PageHeader from "@/components/v3/ui/PageHeader";
import Rule from "@/components/v3/ui/Rule";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * The Regulatory Disclosure.
 *
 * The source document is a ~1,000-row table that was never legible in the reference material, so
 * V1 ships the page as its own skeleton: the title, the intro, the three columns the disclosure is
 * ruled into, and a note where the rows will go. V3 preserves exactly that, and no more — inventing
 * regulatory rows would be the single worst thing a redesign of this page could do.
 *
 * What it does instead is set the skeleton honestly: the column structure survives as a real ruled
 * ledger head with a caption, and the absence of data is stated in the margin as a note rather than
 * dressed up as an empty row.
 */
export default function RegulatoryContent() {
  const { t } = useV3();

  return (
    <>
      <PageHeader
        folio={t("footerInformation")}
        title={t("regulatoryTitle")}
        lede={t("regulatoryIntro")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerRegulatoryDisclosure") },
        ]}
      />

      <Section space="lg">
        <Container width="text">
          <Reveal variant="fade">
            <Ledger
              columns={[t("regulatoryColSrNo"), t("regulatoryColParticulars"), t("regulatoryColDetails")]}
              rows={[]}
              caption={t("regulatoryTitle")}
            />
          </Reveal>

          <Reveal variant="rise" delay={80}>
            <Callout tone="regulatory" className="mt-10">
              {t("sectionContentComingSoon")}
            </Callout>
          </Reveal>

          <Rule className="mt-24 sm:mt-32" />
        </Container>
      </Section>
    </>
  );
}
