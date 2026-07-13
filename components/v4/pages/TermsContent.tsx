"use client";

import { Fragment } from "react";
import TranslationNotice from "@/components/shared/TranslationNotice";
import PageHero from "@/components/v4/ui/PageHero";
import Rail from "@/components/v4/ui/Rail";
import { Container, Section } from "@/components/v4/ui/Layout";
import { TERMS_INTRO, TERMS_SECTIONS } from "@/lib/legalPageData";
import { renderV4RichText } from "@/lib/v4/richText";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The Terms and Conditions — a contract, ten numbered sections long.
 *
 * This is the page where a design system either proves itself or is exposed. There is no photograph
 * to hide behind and no card grid to arrange: there is four thousand words of binding text, and the
 * only question is whether a person can *find their way through it*. So:
 *
 *   - the text runs at `--v4-measure` (66ch), not to the width of the browser — a contract set to a
 *     1,500px line is a contract nobody finishes a paragraph of;
 *   - the clause numbers are drawn from array order in the mono face, so they scan down the page;
 *   - the <Rail> holds the ten headings on screen and marks the one being read in gold, which on
 *     this page is the only gold there is. Gold means "you are here" and nothing else.
 *
 * **<TranslationNotice /> sits above the document**, and must. The Terms are translated into all
 * four locales so they can be read, but the English text remains the authoritative one — without
 * that banner a translation of a contract silently becomes the contract.
 *
 * Section `id`s come from `lib/legalPageData` and are identical in every locale by construction, so
 * a link to `#refunds` resolves whether the reader is in English or Tamil. They are never derived
 * from the (translated) heading.
 */
export default function TermsContent() {
  const { t, t4, language } = useV4();

  const sections = TERMS_SECTIONS[language];
  const newTabLabel = t4("v4OpensInNewTab");

  return (
    <>
      <PageHero label={t("footerInformation")} title={t("termsPageTitle")} />

      <Section space="md" className="border-t border-[var(--v4-edge)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,var(--v4-measure))_minmax(0,1fr)] lg:gap-16">
            <article>
              <TranslationNotice />

              <div className="v4-prose">
                {TERMS_INTRO[language].map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 grid gap-10">
                {sections.map((section, i) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="v4-h3 flex gap-3">
                      {/* The clause number is the index, not part of the translated heading — which
                          is what keeps the numbering identical in all four languages. */}
                      <span className="v4-num shrink-0 text-[var(--v4-fg-3)]">{i + 1}</span>
                      <span>{section.heading}</span>
                    </h2>

                    <div className="v4-prose mt-4">
                      {section.body ? renderV4RichText(section.body, { newTabLabel }) : null}

                      {/* A Fragment, not a wrapper <div>: `.v4-prose > * + *` sets the paragraph
                          rhythm on *direct* children, so nesting a subsection inside a box would
                          collapse the spacing between its own paragraphs. */}
                      {section.subsections?.map((sub) => (
                        <Fragment key={sub.heading}>
                          <h3>{sub.heading}</h3>
                          {renderV4RichText(sub.body, { newTabLabel })}
                        </Fragment>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </article>

            <Rail
              sections={sections.map((section, i) => ({
                id: section.id,
                label: `${i + 1}. ${section.heading}`,
              }))}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
