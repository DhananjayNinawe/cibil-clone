"use client";

import { useV2 } from "@/lib/v2/useV2";
import DocRail from "@/components/v2/pages/legal/DocRail";
import LegalDocument, { type DocBodySection } from "@/components/v2/pages/legal/LegalDocument";
import SuitFiledShell from "@/components/v2/pages/suit-filed/SuitFiledShell";
import ConsentControls from "@/components/v2/pages/suit-filed/ConsentControls";

const BODY_ID = "suit-filed-body";

/**
 * Terms, disclaimer and governing law for the suit-filed cases data.
 *
 * The three headings already number themselves in the catalog ("I. Terms and conditions:"), so the
 * document opts out of the rail's own numbering rather than reading "01 — I. Terms and conditions".
 */
export default function SuitFiledContent() {
  const { t } = useV2();

  const disclaimers = [
    t("suitFiledDisc1"),
    t("suitFiledDisc2"),
    t("suitFiledDisc3"),
    t("suitFiledDisc4"),
    t("suitFiledDisc5"),
  ];

  const sections: DocBodySection[] = [
    {
      id: "terms",
      label: t("suitFiledTermsHeading"),
      body: (
        <ul>
          {[
            t("suitFiledTerm1"),
            t("suitFiledTerm2"),
            t("suitFiledTerm3"),
            t("suitFiledTerm4"),
            t("suitFiledTerm5"),
          ].map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "disclaimer",
      label: t("suitFiledDisclaimerHeading"),
      body: (
        <>
          <p>{t("suitFiledDisclaimerIntro")}</p>
          <ul>
            {disclaimers.map((clause) => (
              <li key={clause}>{clause}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: "governing-law",
      label: t("suitFiledGoverningHeading"),
      body: (
        <ul>
          <li>{t("suitFiledGoverning")}</li>
        </ul>
      ),
    },
  ];

  return (
    <SuitFiledShell
      title={t("suitFiledPageTitle")}
      docRail={<DocRail sections={sections} bodyId={BODY_ID} numbered={false} />}
    >
      <LegalDocument id={BODY_ID} sections={sections} numbered={false} footer={<ConsentControls />} />
    </SuitFiledShell>
  );
}
