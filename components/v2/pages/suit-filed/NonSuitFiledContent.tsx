"use client";

import { useV2 } from "@/lib/v2/useV2";
import DocRail from "@/components/v2/pages/legal/DocRail";
import LegalDocument, { type DocBodySection } from "@/components/v2/pages/legal/LegalDocument";
import SuitFiledShell from "@/components/v2/pages/suit-filed/SuitFiledShell";
import ConsentControls from "@/components/v2/pages/suit-filed/ConsentControls";

const BODY_ID = "non-suit-filed-body";

/**
 * Terms, disclaimer and governing law for the non-suit-filed cases data.
 *
 * The five disclaimer clauses appear twice in the source document: once under the disclaimer, and
 * again nested under the second governing-law clause. That repetition is in the contract, so it is
 * kept here — the same five keys, rendered in both places, exactly as V1 does.
 */
export default function NonSuitFiledContent() {
  const { t } = useV2();

  const disclaimers = [
    t("suitFiledDisc1"),
    t("suitFiledDisc2"),
    t("suitFiledDisc3"),
    t("suitFiledDisc4"),
    t("suitFiledDisc5"),
  ];

  const disclaimerList = (
    <ul>
      {disclaimers.map((clause) => (
        <li key={clause}>{clause}</li>
      ))}
    </ul>
  );

  const sections: DocBodySection[] = [
    {
      id: "terms",
      label: t("suitFiledTermsHeading"),
      body: (
        <ul>
          {[
            t("nonSuitTerm1"),
            t("nonSuitTerm2"),
            t("nonSuitTerm3"),
            t("nonSuitTerm4"),
            t("nonSuitTerm5"),
            t("nonSuitTerm6"),
            t("nonSuitTerm7"),
          ].map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "disclaimer",
      label: t("suitFiledDisclaimerHeading"),
      body: disclaimerList,
    },
    {
      id: "governing-law",
      label: t("suitFiledGoverningHeading"),
      body: (
        <ul>
          <li>{t("nonSuitGoverning1")}</li>
          <li>
            {t("nonSuitGoverning2")}
            {disclaimerList}
          </li>
        </ul>
      ),
    },
  ];

  return (
    <SuitFiledShell
      title={t("nonSuitPageTitle")}
      docRail={<DocRail sections={sections} bodyId={BODY_ID} numbered={false} />}
    >
      <LegalDocument id={BODY_ID} sections={sections} numbered={false} footer={<ConsentControls />} />
    </SuitFiledShell>
  );
}
