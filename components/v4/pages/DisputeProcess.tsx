"use client";

import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Step, Steps } from "@/components/v4/ui/Steps";
import { Reveal } from "@/components/v4/motion/Reveal";
import { CheckIcon, ClockIcon, CloseIcon, ShieldIcon } from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The two blocks the consumer and microfinance dispute pages genuinely share — V1 imports the same
 * `dispute/ProcessDiagram` and `dispute/ImportantPoints` into both, and the copy is identical, so
 * duplicating them here would be duplicating a maintenance liability, not honouring a difference.
 */

/**
 * What CIBIL does once a dispute is raised.
 *
 * V1 renders this as a single PNG of a flowchart: `alt="What we do?"`, which tells a screen-reader
 * user precisely nothing about the five things that happen to their complaint, and which cannot be
 * read at all if the image fails to load. Every box in that picture already exists as a translated
 * string in the catalog (`diagStep1Title` … `diagFinalDesc`) — the picture was drawn over copy the
 * site already had.
 *
 * So here it is as an ordered list, because the order is the meaning. The one thing a flowchart
 * says that a list cannot is the *fork* — accepted or rejected — so that stays a fork: two outcome
 * planes side by side inside step three, each carrying its own glyph, because a reader who cannot
 * distinguish the colours must still be able to tell the two apart (WCAG 1.4.1).
 */
export function DisputeProcessSection({
  headingKey = "diagramHeading",
}: {
  /** The MFI page introduces the same process with different words. V1 does the same. */
  headingKey?: TranslationKey;
}) {
  const { t } = useV4();

  return (
    <Section tone="night" aria-labelledby="v4-process-heading">
      <Container>
        <SectionHead
          id="v4-process-heading"
          title={t("whatWeDoHeading")}
          lede={t(headingKey)}
        />

        <div className="mt-12">
          <Steps>
            <Step n={1} title={t("diagStep1Title")} index={0}>
              <p>{t("diagStep1Desc")}</p>
            </Step>

            <Step n={2} title={t("diagStep2Title")} index={1}>
              <p>{t("diagStep2Desc")}</p>
            </Step>

            <Step n={3} title={t("diagStep3Title")} index={2}>
              <p>{t("diagDecisionText")}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Outcome
                  glyph={<CheckIcon size={18} />}
                  title={t("diagAcceptedTitle")}
                  desc={t("diagAcceptedDesc")}
                />
                <Outcome
                  glyph={<CloseIcon size={18} />}
                  title={t("diagRejectedTitle")}
                  desc={t("diagRejectedDesc")}
                />
              </div>
            </Step>

            <Step n={4} title={t("diagFinalTitle")} index={3}>
              <p>{t("diagFinalDesc")}</p>
            </Step>
          </Steps>
        </div>

        {/* The number the reader actually came for: how long until this is over. */}
        <Reveal className="mt-10 flex items-start gap-3">
          <ClockIcon size={19} className="mt-0.5 shrink-0 text-[var(--v4-accent)]" />
          <p className="v4-num text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
            {t("diagTurnaroundTime")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/** One arm of the fork. Not a card — a plane, with the glyph carrying the meaning beside the word. */
function Outcome({
  glyph,
  title,
  desc,
}: {
  glyph: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="v4-plane-flat p-4">
      <p className="flex items-center gap-2.5 font-bold text-[var(--v4-fg)]">
        <span className="text-[var(--v4-accent)]">{glyph}</span>
        {title}
      </p>
      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-[var(--v4-fg-3)]">{desc}</p>
    </div>
  );
}

const POINTS: TranslationKey[] = [
  "pointNoCorrection",
  "pointRbiGuidelines",
  "pointResolveWithin30",
];

/**
 * The three statutory provisos.
 *
 * These are the constraints CIBIL is *under* — what it may not do without the lender's confirmation,
 * whose word is final on the facts, and the 30 days it has. They read as small print, and V1 sets
 * them as small print. They are in fact the terms of the promise the rest of the page is making, so
 * here they are planes, at body size, one to a row.
 */
export function ImportantPointsSection() {
  const { t } = useV4();

  return (
    <Section tone="tint" space="md" aria-labelledby="v4-points-heading">
      <Container>
        <SectionHead id="v4-points-heading" title={t("importantPointsHeading")} />

        <ul className="mt-9 grid gap-3">
          {POINTS.map((point, i) => (
            <li key={point}>
              <Reveal index={i} className="v4-plane flex items-start gap-4 px-5 py-5 sm:px-6">
                <ShieldIcon size={19} className="mt-0.5 shrink-0 text-[var(--v4-accent)]" />
                <p className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">{t(point)}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
