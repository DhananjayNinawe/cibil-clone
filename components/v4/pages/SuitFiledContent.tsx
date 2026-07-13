"use client";

import SuitFiledNav from "@/components/v4/pages/SuitFiledNav";
import PageHero from "@/components/v4/ui/PageHero";
import Rail from "@/components/v4/ui/Rail";
import { Button } from "@/components/v4/ui/Button";
import { Container, Section } from "@/components/v4/ui/Layout";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The suit-filed registry's own terms — the conditions a user accepts before reading a list of
 * named defaulters, the disclaimer that goes with it, and the law it is governed by.
 *
 * The three headings carry their own Roman numerals in the copy ("I. Terms and conditions:"), so
 * nothing is numbered here; the *clauses* under them are numbered by `.v4-prose ol`, whose markers
 * are set in the mono face. That is the point of an ordered list in a legal document: a reader who
 * needs to refer to a clause needs it to have a number, and a bulleted list gives them nothing to
 * cite. V1 sets all three lists as bullets.
 *
 * The anchors (`terms`, `disclaimer`, `governing-law`) are literal slugs, not slugged headings, so
 * they are the same in all four languages and the <Rail> keeps working when the reader switches.
 */
export default function SuitFiledContent() {
  const { t } = useV4();

  const terms = [
    t("suitFiledTerm1"),
    t("suitFiledTerm2"),
    t("suitFiledTerm3"),
    t("suitFiledTerm4"),
    t("suitFiledTerm5"),
  ];
  const disclaimers = [
    t("suitFiledDisc1"),
    t("suitFiledDisc2"),
    t("suitFiledDisc3"),
    t("suitFiledDisc4"),
    t("suitFiledDisc5"),
  ];

  const sections = [
    { id: "terms", label: t("suitFiledTermsHeading") },
    { id: "disclaimer", label: t("suitFiledDisclaimerHeading") },
    { id: "governing-law", label: t("suitFiledGoverningHeading") },
  ];

  return (
    <>
      <PageHero
        label={t("footerCorpSuitFiledHeading")}
        title={t("suitFiledPageTitle")}
        breadcrumb={{
          label: t("footerCorpSuitFiledHeading"),
          href: toV4("/suit-filed-cases/overview"),
        }}
      />

      <SuitFiledNav current="suitFiledSideSuit" />

      <Section space="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,var(--v4-measure))_minmax(0,1fr)] lg:gap-16">
            <article className="grid gap-10">
              <section id={sections[0].id} className="scroll-mt-28">
                <h2 className="v4-h3">{sections[0].label}</h2>
                <div className="v4-prose mt-4">
                  <ol>
                    {terms.map((term) => (
                      <li key={term}>{term}</li>
                    ))}
                  </ol>
                </div>
              </section>

              <section id={sections[1].id} className="scroll-mt-28">
                <h2 className="v4-h3">{sections[1].label}</h2>
                <div className="v4-prose mt-4">
                  <p>{t("suitFiledDisclaimerIntro")}</p>
                  <ol>
                    {disclaimers.map((disclaimer) => (
                      <li key={disclaimer}>{disclaimer}</li>
                    ))}
                  </ol>
                </div>
              </section>

              <section id={sections[2].id} className="scroll-mt-28">
                <h2 className="v4-h3">{sections[2].label}</h2>
                <div className="v4-prose mt-4">
                  {/* One clause, so a paragraph. V1 wraps it in a single-item bulleted list, and a
                      list of one is a list that tells a screen reader "list, one item" for no
                      reason. The words are identical. */}
                  <p>{t("suitFiledGoverning")}</p>
                </div>
              </section>

              {/* The source site's acknowledgement control: the reader accepts or declines these
                  terms before the registry is shown. Real <button>s — the pair is an action, not a
                  destination — and neither is gold: in V4 gold means "you", and on this page it is
                  spent on the Rail's marker. */}
              <div className="flex flex-wrap gap-3 border-t border-[var(--v4-edge)] pt-8">
                <Button type="button">{t("iAgreeBtn")}</Button>
                <Button type="button" variant="secondary">
                  {t("iDisagreeBtn")}
                </Button>
              </div>
            </article>

            <Rail sections={sections} />
          </div>
        </Container>
      </Section>
    </>
  );
}
