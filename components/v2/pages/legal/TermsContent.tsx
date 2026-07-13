"use client";

import { Fragment } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { renderRichText } from "@/lib/richText";
import { TERMS_INTRO, TERMS_SECTIONS } from "@/lib/legalPageData";
import { Container, Section } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Prose from "@/components/v2/ui/Prose";
import DocRail from "@/components/v2/pages/legal/DocRail";
import LegalDocument, { type DocBodySection } from "@/components/v2/pages/legal/LegalDocument";
import TranslationNoticePlate from "@/components/v2/pages/legal/TranslationNoticePlate";

const BODY_ID = "terms-body";

/**
 * Terms and Conditions for Provision of Services.
 *
 * The section `id`s are the ones the data file already fixes across all four locales, so the
 * table of contents, the anchors and a shared deep link all keep working when the language
 * changes — which is the whole reason they live in the data rather than being slugged from the
 * translated heading.
 */
export default function TermsContent() {
  const { t, language } = useV2();

  const sections: DocBodySection[] = TERMS_SECTIONS[language].map((section) => ({
    id: section.id,
    label: section.heading,
    body: (
      <>
        {section.body && renderRichText(section.body)}
        {section.subsections?.map((sub) => (
          <Fragment key={sub.heading}>
            <h3>{sub.heading}</h3>
            {renderRichText(sub.body)}
          </Fragment>
        ))}
      </>
    ),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("termsConditions")}
        title={t("termsPageTitle")}
        breadcrumbs={[{ label: t("termsConditions") }]}
        tone="deep"
        size="sm"
      />

      <Section space="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
            <DocRail sections={sections} bodyId={BODY_ID} />

            <LegalDocument
              id={BODY_ID}
              sections={sections}
              intro={
                <>
                  <TranslationNoticePlate />
                  <Prose className="mb-14 max-w-[72ch]">
                    {TERMS_INTRO[language].map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </Prose>
                </>
              }
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
