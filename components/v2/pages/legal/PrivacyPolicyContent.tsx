"use client";

import { Fragment } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { renderRichText } from "@/lib/richText";
import { PRIVACY_POLICY, PRIVACY_POLICY_LAST_UPDATED } from "@/lib/privacyPolicyData";
import { Container, Section } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Badge from "@/components/v2/ui/Badge";
import DocRail from "@/components/v2/pages/legal/DocRail";
import LegalDocument, { type DocBodySection } from "@/components/v2/pages/legal/LegalDocument";
import TranslationNoticePlate from "@/components/v2/pages/legal/TranslationNoticePlate";

const BODY_ID = "privacy-policy-body";

/**
 * The Privacy Policy.
 *
 * Same document as V1, down to the clause — the sections come from `lib/privacyPolicyData/`,
 * keyed by language, and the rich text is rendered by V1's own `renderRichText`. What V2 changes
 * is that it is now *readable*: a fixed measure, a rail that says where you are and how much is
 * left, and rules instead of boxes.
 *
 * Section ids are positional (`policy-1`, …) rather than slugged from the heading, because the
 * heading is translated — a slug would change under the reader's feet on a language switch and
 * break every anchor. Position does not.
 */
export default function PrivacyPolicyContent() {
  const { t, language } = useV2();

  const sections: DocBodySection[] = PRIVACY_POLICY[language].map((section, index) => ({
    id: `policy-${index + 1}`,
    label: section.heading,
    body: (
      <>
        {section.parts.map((part, partIndex) => (
          <Fragment key={part.subheading ?? partIndex}>
            {part.subheading && <h3>{part.subheading}</h3>}
            {part.body && renderRichText(part.body)}
            {part.lines && (
              // The grievance officer's postal address: one block, line-broken, never a list of
              // spaced-out paragraphs.
              <p>
                {part.lines.map((line, lineIndex) => (
                  <Fragment key={line}>
                    {lineIndex > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
            )}
          </Fragment>
        ))}
      </>
    ),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("footerInformation")}
        title={t("privacyPolicy")}
        breadcrumbs={[{ label: t("privacyPolicy") }]}
        tone="deep"
        size="sm"
      >
        <Badge tone="neutral">
          {t("privacyLastUpdated")} · {PRIVACY_POLICY_LAST_UPDATED[language]}
        </Badge>
      </PageHero>

      <Section space="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
            <DocRail sections={sections} bodyId={BODY_ID} />

            <LegalDocument
              id={BODY_ID}
              sections={sections}
              intro={<TranslationNoticePlate />}
              footer={
                <p className="mt-16 border-t border-[var(--v2-line)] pt-8 text-sm text-[var(--v2-text-3)]">
                  {t("privacyLastUpdated")}: {PRIVACY_POLICY_LAST_UPDATED[language]}
                </p>
              }
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
