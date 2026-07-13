"use client";

import TranslationNotice from "@/components/shared/TranslationNotice";
import PageHero from "@/components/v4/ui/PageHero";
import Rail from "@/components/v4/ui/Rail";
import { Container, Section } from "@/components/v4/ui/Layout";
import { PRIVACY_POLICY, PRIVACY_POLICY_LAST_UPDATED } from "@/lib/privacyPolicyData";
import { renderV4RichText } from "@/lib/v4/richText";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The Privacy Policy.
 *
 * A privacy policy is not marketing copy that happens to be long — it is the document a reader
 * opens when they are already worried, usually looking for one specific answer ("who do you give
 * this to?", "how do I get it deleted?"). So the whole design is a *reading* design: the text is set
 * at the 66ch measure (`.v4-prose`), and the <Rail> keeps the fourteen section headings on screen so
 * the reader can see the shape of the document and jump to the clause they came for.
 *
 * Two rules govern this file, and both are non-negotiable:
 *
 *   1. **<TranslationNotice /> above the document.** This is binding legal text. It is translated
 *      into all four locales so it can actually be read, but the English version remains the
 *      authoritative one, and the banner says so on every locale except English. Translating a
 *      contract without that notice quietly *replaces* the contract.
 *
 *   2. **Not one clause is touched.** Every word comes from `lib/privacyPolicyData/[language]`.
 *      V4 chooses the measure, the leading and the rhythm. It does not choose the words.
 *
 * `PolicySection` carries no `id`, so the anchors are positional (`privacy-1`, `privacy-2`, …) and
 * never derived from the heading text — a slug generated from a translated heading is a different
 * slug in every language, which is a table of contents that breaks the moment the reader switches
 * to Hindi. `scripts/check-i18n.mjs` already guarantees every locale holds the same sections in the
 * same order, so the index *is* a stable identity.
 */
export default function PrivacyPolicyContent() {
  const { t, t4, language } = useV4();

  const sections = PRIVACY_POLICY[language];
  const anchorId = (index: number) => `privacy-${index + 1}`;

  return (
    <>
      <PageHero
        label={t("footerInformation")}
        title={t("privacyPolicy")}
        actions={
          <span className="v4-chip">
            {t("privacyLastUpdated")}
            <span className="v4-num">{PRIVACY_POLICY_LAST_UPDATED[language]}</span>
          </span>
        }
      />

      <Section space="md" className="border-t border-[var(--v4-edge)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,var(--v4-measure))_minmax(0,1fr)] lg:gap-16">
            <article>
              <TranslationNotice />

              <div className="grid gap-10">
                {sections.map((section, i) => (
                  <section key={anchorId(i)} id={anchorId(i)} className="scroll-mt-28">
                    <h2 className="v4-h3">{section.heading}</h2>

                    {section.parts.map((part, partIndex) => (
                      <div key={part.subheading ?? partIndex} className="v4-prose mt-4">
                        {part.subheading ? <h3>{part.subheading}</h3> : null}
                        {part.body
                          ? renderV4RichText(part.body, { newTabLabel: t4("v4OpensInNewTab") })
                          : null}
                        {/* The Grievance Officer's postal address: a tight run of lines, not
                            paragraphs. Spacing them out would make an address look like prose. */}
                        {part.lines ? (
                          <div>
                            {part.lines.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </section>
                ))}
              </div>
            </article>

            <Rail
              sections={sections.map((section, i) => ({
                id: anchorId(i),
                label: section.heading,
              }))}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
