"use client";

import { Container, Section } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import { Reveal } from "@/components/v4/motion/Reveal";
import { COMPANY_HISTORY } from "@/lib/footerPageData";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Company History — the one page on this site that genuinely wants a vertical narrative device.
 *
 * So it gets a real one, and a real one is an **ordered list**. The order *is* the meaning here:
 * the commercial bureau could not have come before the consumer bureau, and the CIBIL Score could
 * not have come before either. A screen reader announces "list, 12 items" and then counts them; a
 * keyboard walks the headings. V1 draws the same content as a stack of unordered divs with a 60px
 * cyan numeral, which is a timeline only to someone looking at it.
 *
 * The rule and the nodes are the drawing, and they are `aria-hidden`: they say nothing the list
 * does not already say. The exception is the final node, which is filled gold — V4's one reserved
 * colour, meaning *this is where you are*: the newest entry is the company as it stands today.
 *
 * Every word comes from `COMPANY_HISTORY[language]` in lib/footerPageData.ts, which is locale-keyed
 * data (see AGENTS.md). Nothing here is retyped, reworded or added to — a fabricated milestone on a
 * corporate history page is not a design problem, it is a legal one.
 */
export default function CompanyHistoryContent() {
  const { t, language } = useV4();
  const entries = COMPANY_HISTORY[language];

  return (
    <>
      <PageHero
        label={t("aboutUsEyebrow")}
        title={t("companyHistoryTitle")}
        lede={t("aboutUsHeroDesc")}
        breadcrumb={{ label: t("aboutUsHeroTitle"), href: toV4("/about-us") }}
      />

      <Section tone="tint" space="lg">
        <Container width="default">
          <ol className="grid">
            {entries.map((entry, i) => {
              const latest = i === entries.length - 1;

              return (
                <li key={entry.year} className="grid grid-cols-[0.75rem_1fr] gap-x-5 sm:gap-x-8">
                  {/* The rail. Purely a drawing of the list's own order — hence hidden. On the last
                      entry the rule stops at the node rather than trailing past the final sentence. */}
                  <div aria-hidden="true" className="relative flex justify-center">
                    <span
                      className={`absolute left-1/2 top-0 w-px -translate-x-1/2 bg-[var(--v4-edge-2)] ${
                        latest ? "h-4" : "bottom-0"
                      }`}
                    />
                    <span
                      className={`relative mt-[0.6rem] h-3 w-3 rounded-[3px] border ${
                        latest
                          ? "border-[var(--v4-marker-line)] bg-[var(--v4-marker)]"
                          : "border-[var(--v4-edge-3)] bg-[var(--v4-bg)]"
                      }`}
                    />
                  </div>

                  <Reveal className={latest ? "" : "pb-12"}>
                    <h2
                      className={`v4-num text-[1.75rem] font-medium leading-none sm:text-[2.125rem] ${
                        latest ? "text-[var(--v4-fg)]" : "text-[var(--v4-fg-3)]"
                      }`}
                    >
                      {entry.year}
                    </h2>

                    <div className="v4-prose mt-4">
                      {entry.paras.map((para) => (
                        <p key={para}>{para}</p>
                      ))}

                      {entry.bullets ? (
                        <ul>
                          {entry.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>
    </>
  );
}
