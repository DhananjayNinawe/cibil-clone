"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/v4/ui/Button";
import PageHero from "@/components/v4/ui/PageHero";
import { Article, ArticleList, FaqBody, type FaqGroup } from "@/components/v4/faq/FaqShell";
import RelatedTopics from "@/components/v4/faq/RelatedTopics";
import { Reveal } from "@/components/v4/motion/Reveal";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

const HREF = toV4("/faq/credit-score-and-loan-basics");

/**
 * `/v4/faq/credit-score-and-loan-basics` — six questions, so no accordions.
 *
 * A six-question page behind six collapsed rows is a page that hides everything it has and charges
 * the reader six clicks to discover it was short. Disclosure earns its keep on the eighteen-question
 * disputes page; here the answers are simply open, and the rail carries the navigation.
 *
 * The one real redesign is the four factors. V1 ships them as a 1440px JPEG of a pie chart with the
 * labels baked into the pixels — which cannot be translated, cannot be read aloud, and cannot be
 * selected. V4 draws them: four planes, indexed, each swatched from the sequential ramp, with the
 * text as text. The ramp is ordinal here rather than quantitative — CIBIL publishes no weights for
 * these factors, and V4 does not invent them, so the swatches step through the scale without
 * claiming that Age of Credit outranks Payment History.
 */
export default function CsbContent() {
  const { t } = useV4();

  const groups: FaqGroup[] = [
    {
      id: "credit-basics",
      label: t("megaCreditBasicsHeading"),
      content: (
        <ArticleList>
          <Article question={t("csbQ1")}>
            <p>{t("csbA1Para1")}</p>
            <p>{t("csbA1Para2")}</p>
            <p>
              {/* V1 parks this on `href="#"`. "What is TransUnion CIBIL… click here to know more"
                  has an obvious real destination, and V4 is not allowed a dead link. */}
              <Link href={toV4("/about-us")}>{t("csbA1Link")}</Link> {t("csbA1LinkSuffix")}
            </p>
          </Article>

          <Article question={t("csbQ2")}>
            <p>{t("csbA2")}</p>
          </Article>

          <Article question={t("csbQ3")}>
            <p>{t("csbA3")}</p>
            <p>
              <Link href={toV4("/watch-and-learn")}>{t("csbA3VideoLink")}</Link>{" "}
              {t("csbA3VideoSuffix")}
            </p>
          </Article>
        </ArticleList>
      ),
    },
    {
      id: "four-factors",
      label: t("csbFourFactorsTitle"),
      lede: t("csbFourFactorsSubtitle"),
      content: <Factors />,
    },
    {
      id: "improve-your-score",
      label: t("csbQ4"),
      content: <Improve />,
    },
    {
      id: "points-to-note",
      label: t("pointsToNoteHeading"),
      content: (
        <ArticleList>
          <Article question={t("csbQ5")}>
            <p>{t("csbA5")}</p>
          </Article>
          <Article question={t("csbQ6")}>
            <p>{t("csbA6")}</p>
          </Article>
        </ArticleList>
      ),
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("filterUnderstandingCibil"), href: toV4("/faq-brochure") }}
        label={t("faqs")}
        title={t("csbHeroTitle")}
        actions={
          <ButtonLink href={toV4("/register")} size="lg" arrow>
            {t("getYoursNowBtn")}
          </ButtonLink>
        }
      />

      <FaqBody groups={groups} />

      <RelatedTopics
        current={HREF}
        actions={
          <>
            <ButtonLink href={toV4("/freecibilscore")} arrow>
              {t("megaFreeCibilScore")}
            </ButtonLink>
            <ButtonLink href={toV4("/credit-advice")} variant="secondary" arrow>
              {t("filterCreditAdvice")}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}

/** The four factors that move a CIBIL Score, drawn rather than photographed. */
function Factors() {
  const { t } = useV4();

  const factors: { title: TranslationKey; desc: TranslationKey }[] = [
    { title: "csbFactorPaymentTitle", desc: "csbFactorPaymentDesc" },
    { title: "csbFactorUtilTitle", desc: "csbFactorUtilDesc" },
    { title: "csbFactorAgeTitle", desc: "csbFactorAgeDesc" },
    { title: "csbFactorEnquiriesTitle", desc: "csbFactorEnquiriesDesc" },
  ];

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {factors.map((factor, i) => (
        <Reveal key={factor.title} as="li" index={i}>
          <article className="v4-plane flex h-full flex-col p-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-8 w-2 rounded-[2px]"
                style={{ background: `var(--v4-c${i + 2})` }}
              />
              <span className="v4-num text-[0.8125rem] text-[var(--v4-fg-3)]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="v4-h3 mt-4">{t(factor.title)}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
              {t(factor.desc)}
            </p>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

/** "How can I improve my CIBIL Score?" — six actions, and the only list on the page worth its own h2. */
function Improve() {
  const { t } = useV4();

  const actions: { bold: TranslationKey; rest: TranslationKey }[] = [
    { bold: "csbA4Bullet1Bold", rest: "csbA4Bullet1" },
    { bold: "csbA4Bullet2Bold", rest: "csbA4Bullet2" },
    { bold: "csbA4Bullet3Bold", rest: "csbA4Bullet3" },
    { bold: "csbA4Bullet4Bold", rest: "csbA4Bullet4" },
    { bold: "csbA4Bullet5Bold", rest: "csbA4Bullet5" },
    { bold: "csbA4Bullet6Bold", rest: "csbA4Bullet6" },
  ];

  return (
    <>
      <p className="v4-lede">{t("csbA4Intro")}</p>

      <ul className="mt-8 grid gap-0">
        {actions.map((action, i) => (
          <Reveal key={action.bold} as="li" index={i} className="border-t border-[var(--v4-edge)] last:border-b">
            <div className="flex gap-5 py-5 sm:gap-7">
              <span
                aria-hidden="true"
                className="v4-num mt-0.5 shrink-0 text-[0.8125rem] text-[var(--v4-fg-3)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                <strong className="font-bold text-[var(--v4-fg)]">{t(action.bold)}</strong>{" "}
                {t(action.rest)}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </>
  );
}
