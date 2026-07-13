"use client";

import { useV2 } from "@/lib/v2/useV2";
import { renderRichText } from "@/lib/richText";
import { SUIT_FILED_OVERVIEW } from "@/lib/footerPageData";
import DocRail from "@/components/v2/pages/legal/DocRail";
import LegalDocument, { type DocBodySection } from "@/components/v2/pages/legal/LegalDocument";
import SuitFiledShell from "@/components/v2/pages/suit-filed/SuitFiledShell";

const BODY_ID = "suit-filed-overview-body";

/** The two RBI overviews — suit-filed accounts, and non-suit filed accounts. */
export default function SuitFiledOverviewContent() {
  const { t, language } = useV2();

  const sections: DocBodySection[] = SUIT_FILED_OVERVIEW[language].map((section, index) => ({
    id: `overview-${index + 1}`,
    label: section.heading,
    body: renderRichText(section.body),
  }));

  return (
    <SuitFiledShell
      title={t("suitFiledOverviewTitle")}
      docRail={<DocRail sections={sections} bodyId={BODY_ID} />}
    >
      <LegalDocument id={BODY_ID} sections={sections} />
    </SuitFiledShell>
  );
}
