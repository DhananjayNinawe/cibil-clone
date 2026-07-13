"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import PageHero from "@/components/v2/ui/PageHero";
import { Container, Eyebrow, Section } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import { ArrowRightIcon } from "@/components/icons";

/** Where a reader looking for disclosures is likely to be heading next. */
const ONWARD: { key: TranslationKey; href: string }[] = [
  { key: "suitFiledSideRbi", href: "/external-links/rbi-notifications" },
  { key: "suitFiledSideGist", href: "/suit-filed-cases/gist-rbi-scheme" },
  { key: "footerCodeBusinessConduct", href: "/external-links/business-code-of-conduct" },
];

/**
 * The disclosure schedule.
 *
 * The source document is a ~1000-row table that V1 renders as an empty shell with a
 * "coming soon" cell — V2 keeps exactly that: the same three columns, the same notice, no
 * invented rows. What it adds is the frame the document belongs in — the statutory context
 * from the intro, and the neighbouring regulatory pages — so the page is useful even while
 * the schedule itself is pending.
 */
export default function RegulatoryContent() {
  const { t, tv } = useV2();

  const columns: TranslationKey[] = [
    "regulatoryColSrNo",
    "regulatoryColParticulars",
    "regulatoryColDetails",
  ];

  return (
    <>
      <PageHero
        size="md"
        tone="deep"
        eyebrow={t("aboutUsEyebrow")}
        title={t("regulatoryTitle")}
        lede={t("regulatoryIntro")}
        breadcrumbs={[{ label: t("footerRegulatoryDisclosure") }]}
      />

      <Section space="lg" tone="canvas">
        <Container>
          <Reveal variant="fade">
            <Eyebrow index="01">{tv("v2DetailsLabel")}</Eyebrow>
          </Reveal>

          {/* The table is the document's own structure, so it stays a table — headed, captioned,
              scrollable inside its own rim, and honest about the fact that the body is pending. */}
          <Reveal variant="up" className="mt-10">
            <div
              tabIndex={0}
              role="region"
              aria-label={t("regulatoryTitle")}
              className="v2-focus v2-glass v2-rim overflow-x-auto rounded-[var(--v2-r-lg)]"
            >
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">{t("regulatoryTitle")}</caption>
                <thead>
                  <tr className="border-b border-[var(--v2-line-2)]">
                    {columns.map((column, index) => (
                      <th
                        key={column}
                        scope="col"
                        className={`whitespace-nowrap px-6 py-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v2-cyan)] ${
                          index === 0 ? "w-24" : ""
                        }`}
                      >
                        {t(column)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-16 text-center text-sm text-[var(--v2-text-3)]"
                    >
                      {t("sectionContentComingSoon")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section space="md" tone="raised">
        <Container>
          <Reveal variant="fade">
            <Eyebrow index="02">{tv("v2RelatedPages")}</Eyebrow>
          </Reveal>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--v2-r-lg)] border border-[var(--v2-line)] bg-[var(--v2-line)] sm:grid-cols-3">
            {ONWARD.map((item, index) => (
              <Reveal as="li" key={item.href} variant="up" delay={index * 80}>
                <Link
                  href={toV2(item.href)}
                  className="v2-focus group flex h-full items-center justify-between gap-4 bg-[var(--v2-bg-2)] p-7 transition-colors duration-500 hover:bg-[rgba(0,176,240,0.08)]"
                >
                  <span className="text-sm font-bold leading-snug text-[var(--v2-text)] transition-colors group-hover:text-[var(--v2-cyan)]">
                    {t(item.key)}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-[var(--v2-text-3)] transition-all duration-500 ease-[var(--v2-ease)] group-hover:translate-x-1 group-hover:text-[var(--v2-cyan)]" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
