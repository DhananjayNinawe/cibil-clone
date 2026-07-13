"use client";

import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import type { RailLink } from "@/components/v3/ui/MarginRail";
import Prose from "@/components/v3/ui/Prose";
import Callout from "@/components/v3/ui/Callout";
import Button from "@/components/v3/ui/Button";
import Rule from "@/components/v3/ui/Rule";
import Reveal from "@/components/v3/motion/Reveal";
import FaqDocument, { FaqNote } from "@/components/v3/pages/faq/FaqDocument";

/**
 * Understanding CIBIL — the brochure.
 *
 * The only page in the cluster that is a document rather than a list of answers, so it is the only
 * one that is not set as an accordion. V1 hides its two chapters behind tabs; a brochure with half
 * its contents behind a tab is a brochure nobody finishes, and the second chapter's placeholder is
 * itself a fact the reader deserves to see. Both chapters are therefore printed in full, ruled,
 * at a reading measure, with the rail as the table of contents.
 */
const CHAPTERS = [
  { id: "about-transunion-cibil", key: "brochureTab1" },
  { id: "about-cibil-score-and-report", key: "brochureTab2" },
] as const;

export default function BrochureContent() {
  const { t } = useV3();

  const rail: RailLink[] = CHAPTERS.map((chapter) => ({
    id: chapter.id,
    label: t(chapter.key),
  }));

  return (
    <FaqDocument
      category="filterUnderstandingCibil"
      title={t("brochurePageTitle")}
      lede={t("brochureFooterText")}
      actions={
        <Button href={toV3("/register")} size="lg" arrow>
          {t("sidebarGetScoreReportBtn")}
        </Button>
      }
      rail={rail}
      aside={<FaqNote variant="score-report" />}
    >
      <article>
        <section id={CHAPTERS[0].id} className="scroll-mt-28 sm:scroll-mt-32">
          <h2 className="v3-h2 text-balance">{t("brochureTab1")}</h2>
          <Rule className="mt-6" />

          <Reveal variant="rise">
            <Prose className="mt-8">
              <p>{t("brochureTab1Para1")}</p>
              <p>{t("brochureTab1Para2")}</p>
            </Prose>
          </Reveal>
        </section>

        <section id={CHAPTERS[1].id} className="mt-20 scroll-mt-28 sm:scroll-mt-32">
          <h2 className="v3-h2 text-balance">{t("brochureTab2")}</h2>
          <Rule className="mt-6" />

          <Reveal variant="rise">
            <Prose className="mt-8">
              <p>{t("sectionContentComingSoon")}</p>
            </Prose>
          </Reveal>
        </section>
      </article>

      {/* The closing line. V1 splits it across a dead `href="#"` — the sentence is printed whole
          here rather than hung on a link that goes nowhere. */}
      <Callout tone="note" className="mt-16">
        <p className="max-w-[52ch] text-pretty">
          {t("downloadWord")} {t("brochureDownloadPrefix")}
        </p>
      </Callout>
    </FaqDocument>
  );
}
