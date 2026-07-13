"use client";

import { useMemo } from "react";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { renderRichText } from "@/lib/richText";
import { TERMS_INTRO, TERMS_SECTIONS } from "@/lib/legalPageData";
import { Container, Section } from "@/components/v3/ui/Layout";
import MarginRail from "@/components/v3/ui/MarginRail";
import PageHeader from "@/components/v3/ui/PageHeader";
import Prose from "@/components/v3/ui/Prose";
import Rule from "@/components/v3/ui/Rule";
import TranslationNotice from "@/components/v3/ui/TranslationNotice";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * The Terms and Conditions.
 *
 * The same document spread as the Privacy Policy — sticky contents in the outer margin, the clauses
 * set to a reading measure — but the anchors here are the real slugs from `lib/legalPageData`,
 * which every locale defines identically and in the same order. So a link into §7 survives a
 * language switch, which is the entire reason those ids exist.
 *
 * Sections are numbered in the mono voice, in the margin of their own heading: a printed contract
 * numbers its clauses, and the number is not part of the sentence.
 */
export default function TermsContent() {
  const { t, language } = useV3();
  const sections = TERMS_SECTIONS[language];

  const rail = useMemo(
    () => sections.map((section) => ({ id: section.id, label: section.heading })),
    [sections],
  );

  return (
    <>
      <PageHeader
        folio={t("footerInformation")}
        title={t("termsPageTitle")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("termsConditions") },
        ]}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
            <MarginRail
              links={rail}
              className="max-h-[calc(100vh-11rem)] self-start overflow-y-auto pr-2"
            />

            <div className="min-w-0">
              <TranslationNotice className="mb-10" />

              {/* The lead-in, set above the first numbered clause and above the first rule. */}
              <Reveal variant="rise">
                <Prose>
                  {TERMS_INTRO[language].map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </Prose>
              </Reveal>

              <Prose>
                {sections.map((section, i) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2>
                      <span
                        aria-hidden
                        className="v3-num mr-3 align-middle text-[0.55em] text-[var(--v3-fg-3)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </h2>

                    {section.body && renderRichText(section.body)}

                    {section.subsections?.map((sub) => (
                      <div key={sub.heading}>
                        <h3>{sub.heading}</h3>
                        {renderRichText(sub.body)}
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
