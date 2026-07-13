"use client";

import { useV2 } from "@/lib/v2/useV2";
import { renderRichText } from "@/lib/richText";
import { GIST_RBI_SCHEMES } from "@/lib/gistRbiSchemeData";
import DocRail from "@/components/v2/pages/legal/DocRail";
import LegalDocument, { type DocBodySection } from "@/components/v2/pages/legal/LegalDocument";
import SuitFiledShell from "@/components/v2/pages/suit-filed/SuitFiledShell";
import TranslationNoticePlate from "@/components/v2/pages/legal/TranslationNoticePlate";

const BODY_ID = "gist-rbi-body";

/**
 * The Gist of the RBI Scheme — the third of the site's three binding regulatory texts, and so the
 * third to carry the translation notice: it quotes RBI circulars verbatim, including the
 * definition of "wilful default", where a paraphrase in translation would be a liability.
 *
 * The scheme `id`s come from the data file and are identical in every locale, so the numbered
 * headings, the rail and any shared anchor survive a language switch.
 */
export default function GistRbiSchemeContent() {
  const { t, language } = useV2();

  const sections: DocBodySection[] = GIST_RBI_SCHEMES[language].map((scheme) => ({
    id: scheme.id,
    label: scheme.heading,
    body: renderRichText(scheme.body),
  }));

  return (
    <SuitFiledShell
      title={t("gistRbiPageTitle")}
      docRail={<DocRail sections={sections} bodyId={BODY_ID} />}
    >
      <LegalDocument id={BODY_ID} sections={sections} intro={<TranslationNoticePlate />} />
    </SuitFiledShell>
  );
}
