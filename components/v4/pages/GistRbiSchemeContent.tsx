"use client";

import TranslationNotice from "@/components/shared/TranslationNotice";
import SuitFiledNav from "@/components/v4/pages/SuitFiledNav";
import PageHero from "@/components/v4/ui/PageHero";
import Rail from "@/components/v4/ui/Rail";
import { Container, Section } from "@/components/v4/ui/Layout";
import { GIST_RBI_SCHEMES } from "@/lib/gistRbiSchemeData";
import { toV4 } from "@/lib/v4/routes";
import { renderV4RichText } from "@/lib/v4/richText";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The Gist of the RBI Scheme — the regulatory instrument the whole suit-filed registry rests on.
 *
 * It is the third of V4's three binding documents, and it is treated exactly like the other two:
 * `.v4-prose` at a real measure, the <Rail> holding the three schemes on screen, and
 * **<TranslationNotice /> above the text**. This one quotes the RBI's own definition of a wilful
 * default; a translation of a regulator's words is a reading aid, never the regulation, and the
 * banner is what says so in every locale but English.
 *
 * The scheme `id`s come from `lib/gistRbiSchemeData` and are identical across locales, so
 * `#wilful-defaults-25-lakh` resolves in Tamil as well as in English. The numbering is array order,
 * not text — see the note in the data module.
 */
export default function GistRbiSchemeContent() {
  const { t, t4, language } = useV4();

  const schemes = GIST_RBI_SCHEMES[language];

  return (
    <>
      <PageHero
        label={t("footerCorpSuitFiledHeading")}
        title={t("gistRbiPageTitle")}
        breadcrumb={{
          label: t("footerCorpSuitFiledHeading"),
          href: toV4("/suit-filed-cases/overview"),
        }}
      />

      <SuitFiledNav current="suitFiledSideGist" />

      <Section space="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,var(--v4-measure))_minmax(0,1fr)] lg:gap-16">
            <article>
              <TranslationNotice />

              <div className="grid gap-10">
                {schemes.map((scheme, i) => (
                  <section key={scheme.id} id={scheme.id} className="scroll-mt-28">
                    <h2 className="v4-h3 flex gap-3">
                      <span className="v4-num shrink-0 text-[var(--v4-fg-3)]">{i + 1}</span>
                      <span>{scheme.heading}</span>
                    </h2>

                    <div className="v4-prose mt-4">
                      {renderV4RichText(scheme.body, { newTabLabel: t4("v4OpensInNewTab") })}
                    </div>
                  </section>
                ))}
              </div>
            </article>

            <Rail
              sections={schemes.map((scheme, i) => ({
                id: scheme.id,
                label: `${i + 1}. ${scheme.heading}`,
              }))}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
