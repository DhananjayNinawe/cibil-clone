"use client";

import { useMemo } from "react";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { renderRichText } from "@/lib/richText";
import { GIST_RBI_SCHEMES } from "@/lib/gistRbiSchemeData";
import { Container, Section } from "@/components/v3/ui/Layout";
import MarginRail from "@/components/v3/ui/MarginRail";
import PageHeader from "@/components/v3/ui/PageHeader";
import Prose from "@/components/v3/ui/Prose";
import Rule from "@/components/v3/ui/Rule";
import TranslationNotice from "@/components/v3/ui/TranslationNotice";
import SectionRail from "@/components/v3/pages/suit-filed/SectionRail";

/**
 * The Gist of the RBI Scheme — the third binding legal text in the site, and the only one that also
 * belongs to a cluster.
 *
 * So its outer margin carries two rails, stacked under one sticky block: the cluster index (where
 * this document sits among the five) above the document's own contents (where you are inside it).
 * The inner `MarginRail` keeps its own `sticky` declaration, which is a no-op nested here — the
 * outer block is what actually travels.
 *
 * The anchors are the `id` slugs from `lib/gistRbiSchemeData`, identical across all four locales.
 */
export default function GistRbiSchemeContent() {
  const { t, language } = useV3();
  const schemes = GIST_RBI_SCHEMES[language];

  const rail = useMemo(
    () => schemes.map((scheme) => ({ id: scheme.id, label: scheme.heading })),
    [schemes],
  );

  return (
    <>
      <PageHeader
        folio={t("footerCorpSuitFiledHeading")}
        title={t("gistRbiPageTitle")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerCorpSuitFiledHeading"), href: toV3("/suit-filed-cases/overview") },
          { label: t("suitFiledSideGist") },
        ]}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
            <div className="self-start lg:sticky lg:top-32">
              <SectionRail active="suitFiledSideGist" />
              <MarginRail
                links={rail}
                className="mt-10 border-t border-[var(--v3-line)] pt-8"
              />
            </div>

            <div className="min-w-0">
              <TranslationNotice className="mb-10" />

              <Prose>
                {schemes.map((scheme, i) => (
                  <section key={scheme.id} id={scheme.id} className="scroll-mt-28">
                    <h2>
                      <span
                        aria-hidden
                        className="v3-num mr-3 align-middle text-[0.55em] text-[var(--v3-fg-3)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {scheme.heading}
                    </h2>

                    {renderRichText(scheme.body)}
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
