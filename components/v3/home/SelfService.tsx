"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * Self service, set as three numbered clauses.
 *
 * Each is a condition and its remedy — "if you found an inaccuracy…, initiate a dispute here" —
 * which is literally the grammar of a clause in a contract, so it is typeset as one: number in
 * the margin, the sentence running to a measure, the remedy as the linked word at the end of it.
 *
 * The link destinations are V1's: each "here." already points at the matching dispute route.
 */
const CLAUSES: { key: TranslationKey; href: string }[] = [
  { key: "selfServiceReportDispute", href: "/consumer-dispute-resolution" },
  { key: "selfServiceMfiDispute", href: "/microfinance-dispute-resolution" },
  { key: "selfServiceUploadDocs", href: "/company-dispute-resolution" },
];

export default function SelfService() {
  const { t } = useV3();

  return (
    <Section space="lg" ruled>
      <Container>
        <SectionHead
          index="04"
          folio={t("quickLinksHeading")}
          title={
            <>
              {t("selfServiceHeadingPrefix")}{" "}
              <span className="v3-em">{t("selfServiceHeadingBrand")}</span>
            </>
          }
        />

        <ol className="mt-4">
          {CLAUSES.map((clause, i) => (
            <Reveal key={clause.key} variant="rise" delay={i * 70} as="li">
              <div className="grid grid-cols-[2.5rem_1fr] gap-x-6 border-b border-[var(--v3-line)] py-8 sm:grid-cols-[4rem_1fr] sm:gap-x-10 sm:py-9">
                <span aria-hidden className="v3-num pt-1 text-sm text-[var(--v3-fg-3)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="max-w-[62ch] text-pretty text-base leading-relaxed text-[var(--v3-fg-2)] sm:text-lg">
                  {t(clause.key)}{" "}
                  <Link
                    href={toV3(clause.href)}
                    className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
                  >
                    {t("hereLink")}
                  </Link>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
