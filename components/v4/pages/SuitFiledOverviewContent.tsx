"use client";

import SuitFiledNav from "@/components/v4/pages/SuitFiledNav";
import PageHero from "@/components/v4/ui/PageHero";
import Rail from "@/components/v4/ui/Rail";
import { Container, Section } from "@/components/v4/ui/Layout";
import { SUIT_FILED_OVERVIEW } from "@/lib/footerPageData";
import { toV4 } from "@/lib/v4/routes";
import { renderV4RichText } from "@/lib/v4/richText";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The suit-filed section's front door.
 *
 * The four pages behind it are a registry and its rules: who is on it, why they are on it, what the
 * RBI told the banks to report, and what a reader may and may not do with the data. Dropping someone
 * straight into that is why V1's version of this section reads as impenetrable. So this page does
 * one job — it explains, in the company's own words, what the two registries *are* — and the section
 * nav underneath the hero is the way into them.
 *
 * The copy is `SUIT_FILED_OVERVIEW`, locale-keyed in `lib/footerPageData.ts`. This is *not* one of
 * the three binding documents (no <TranslationNotice /> — the notice is reserved for the Terms, the
 * Privacy Policy and the Gist of the RBI Scheme, and putting it on a page that is not binding would
 * devalue it on the three that are). Its `OverviewSection` has no `id`, so anchors are positional
 * and stable across locales rather than slugged from a translated heading.
 */
export default function SuitFiledOverviewContent() {
  const { t, t4, language } = useV4();

  const sections = SUIT_FILED_OVERVIEW[language];
  const anchorId = (index: number) => `overview-${index + 1}`;

  return (
    <>
      <PageHero
        label={t("footerCorpSuitFiledHeading")}
        title={t("suitFiledOverviewTitle")}
        breadcrumb={{
          label: t("footerCorpSuitFiledHeading"),
          href: toV4("/suit-filed-cases/overview"),
        }}
      />

      <SuitFiledNav current="suitFiledSideOverview" />

      <Section space="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,var(--v4-measure))_minmax(0,1fr)] lg:gap-16">
            <article className="grid gap-10">
              {sections.map((section, i) => (
                <section key={anchorId(i)} id={anchorId(i)} className="scroll-mt-28">
                  <h2 className="v4-h2">{section.heading}</h2>
                  <div className="v4-prose mt-5">
                    {renderV4RichText(section.body, { newTabLabel: t4("v4OpensInNewTab") })}
                  </div>
                </section>
              ))}
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
