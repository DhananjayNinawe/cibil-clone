"use client";

import SuitFiledNav from "@/components/v4/pages/SuitFiledNav";
import PageHero from "@/components/v4/ui/PageHero";
import Rail from "@/components/v4/ui/Rail";
import { Button } from "@/components/v4/ui/Button";
import { Container, Section } from "@/components/v4/ui/Layout";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The non-suit-filed registry's terms. Same shape as its suit-filed sibling — conditions, a
 * disclaimer, the governing law — and deliberately the same layout, because two documents that
 * differ only in their clauses should not also differ in how they are read.
 *
 * The five disclaimer clauses appear twice in the source document: once under the disclaimer, and
 * again nested inside the governing-law clause that refers back to them. That repetition is in the
 * legal text, so it is reproduced exactly. Summarising it away ("as listed above") would be
 * rewriting the contract, which is not a design decision that is ours to make.
 */
export default function NonSuitFiledContent() {
  const { t } = useV4();

  const terms = [
    t("nonSuitTerm1"),
    t("nonSuitTerm2"),
    t("nonSuitTerm3"),
    t("nonSuitTerm4"),
    t("nonSuitTerm5"),
    t("nonSuitTerm6"),
    t("nonSuitTerm7"),
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
        title={t("nonSuitPageTitle")}
        breadcrumb={{
          label: t("footerCorpSuitFiledHeading"),
          href: toV4("/suit-filed-cases/overview"),
        }}
      />

      <SuitFiledNav current="suitFiledSideNonSuit" />

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
                  <ol>
                    <li>{t("nonSuitGoverning1")}</li>
                    <li>
                      {t("nonSuitGoverning2")}
                      {/* The nested list is in the source document, not an editorial flourish. */}
                      <ol className="mt-3">
                        {disclaimers.map((disclaimer) => (
                          <li key={disclaimer}>{disclaimer}</li>
                        ))}
                      </ol>
                    </li>
                  </ol>
                </div>
              </section>

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
