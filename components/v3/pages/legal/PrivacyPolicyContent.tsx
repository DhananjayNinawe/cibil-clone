"use client";

import { useMemo } from "react";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { renderRichText } from "@/lib/richText";
import { PRIVACY_POLICY, PRIVACY_POLICY_LAST_UPDATED } from "@/lib/privacyPolicyData";
import { Container, Section } from "@/components/v3/ui/Layout";
import MarginRail from "@/components/v3/ui/MarginRail";
import Prose from "@/components/v3/ui/Prose";
import PageHeader from "@/components/v3/ui/PageHeader";
import Rule from "@/components/v3/ui/Rule";
import TranslationNotice from "@/components/v3/ui/TranslationNotice";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * The Privacy Policy, set as a two-column document spread.
 *
 * The policy sections carry no slugs of their own (`lib/privacyPolicyData` keys them by heading),
 * so the anchors are derived from the ordinal — and because every locale defines the same sections
 * in the same order, `policy-07` points at the same clause in Tamil as it does in English. That is
 * the one property an id has to have here: switching language must not break a deep link.
 */
const anchorFor = (index: number) => `policy-${String(index + 1).padStart(2, "0")}`;

export default function PrivacyPolicyContent() {
  const { t, language } = useV3();
  const sections = PRIVACY_POLICY[language];

  const rail = useMemo(
    () => sections.map((section, i) => ({ id: anchorFor(i), label: section.heading })),
    [sections],
  );

  return (
    <>
      <PageHeader
        folio={t("footerInformation")}
        title={t("privacyPolicy")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("privacyPolicy") },
        ]}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
            {/* `self-start` is what makes the sticky rail travel: a stretched grid item is already
                as tall as the document beside it, and an element the height of its own scroll
                container has nowhere to stick to. */}
            <MarginRail
              links={rail}
              className="max-h-[calc(100vh-11rem)] self-start overflow-y-auto pr-2"
            />

            <div className="min-w-0">
              {/* The document's colophon: who last set this sheet, and when. */}
              <Reveal variant="fade">
                <p className="v3-folio flex flex-wrap items-center gap-3">
                  <span>{t("privacyLastUpdated")}</span>
                  <span aria-hidden className="h-px w-8 shrink-0 bg-[var(--v3-line-2)]" />
                  <span className="text-[var(--v3-fg)]">{PRIVACY_POLICY_LAST_UPDATED[language]}</span>
                </p>
              </Reveal>

              <TranslationNotice className="mt-8" />

              <Prose className="mt-4">
                {sections.map((section, i) => (
                  <section key={section.heading} id={anchorFor(i)} className="scroll-mt-28">
                    <h2>
                      <span
                        aria-hidden
                        className="v3-num mr-3 align-middle text-[0.55em] text-[var(--v3-fg-3)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </h2>

                    {section.parts.map((part, p) => (
                      <div key={part.subheading ?? p}>
                        {part.subheading && <h3>{part.subheading}</h3>}
                        {part.body && renderRichText(part.body)}

                        {/* The Grievance Officer's postal address — a tight run of lines, not a
                            run of paragraphs, so it is set as an address block. */}
                        {part.lines && (
                          <address className="mb-[1.125rem] not-italic">
                            {part.lines.map((line) => (
                              <span key={line} className="block">
                                {line}
                              </span>
                            ))}
                          </address>
                        )}
                      </div>
                    ))}
                  </section>
                ))}
              </Prose>
            </div>
          </div>

          <Rule className="mt-24 sm:mt-32" />
        </Container>
      </Section>
    </>
  );
}
