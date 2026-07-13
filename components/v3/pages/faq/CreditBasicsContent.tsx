"use client";

import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import Button from "@/components/v3/ui/Button";
import Plate from "@/components/v3/motion/Plate";
import FaqDocument, {
  A,
  Defs,
  FaqNote,
  Points,
  type FaqEntry,
} from "@/components/v3/pages/faq/FaqDocument";

const FOUR_FACTORS_IMG =
  "https://www.cibil.com/faq/credit-score-and-loan-basics/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image.coreimg.75.1440.jpeg/1738733444575/factors.jpeg";

/**
 * Credit Score and Loan Basics — six questions.
 *
 * V1 floats the four factors that move a score in a two-by-two grid *between* two questions,
 * belonging to neither. They are the answer to Q3 ("what factors affect my CIBIL Score?"), so
 * here they sit inside it: the plate on the left, the four factors ruled beneath it as the terms
 * they are.
 */
export default function CreditBasicsContent() {
  const { t } = useV3();

  const improvements: [string, string][] = [
    [t("csbA4Bullet1Bold"), t("csbA4Bullet1")],
    [t("csbA4Bullet2Bold"), t("csbA4Bullet2")],
    [t("csbA4Bullet3Bold"), t("csbA4Bullet3")],
    [t("csbA4Bullet4Bold"), t("csbA4Bullet4")],
    [t("csbA4Bullet5Bold"), t("csbA4Bullet5")],
    [t("csbA4Bullet6Bold"), t("csbA4Bullet6")],
  ];

  const entries: FaqEntry[] = [
    {
      id: "what-is-transunion-cibil",
      question: t("csbQ1"),
      answer: (
        <>
          <A>{t("csbA1Para1")}</A>
          <A>{t("csbA1Para2")}</A>
          <A>
            <Link href={toV3("/about-us")} className="v3-focus">
              {t("csbA1Link")}
            </Link>{" "}
            {t("csbA1LinkSuffix")}
          </A>
        </>
      ),
    },
    {
      id: "why-the-score-matters",
      question: t("csbQ2"),
      answer: <A>{t("csbA2")}</A>,
    },
    {
      id: "what-moves-the-score",
      question: t("csbQ3"),
      answer: (
        <>
          <A>{t("csbA3")}</A>
          <A>
            <Link href={toV3("/watch-and-learn")} className="v3-focus">
              {t("csbA3VideoLink")}
            </Link>{" "}
            {t("csbA3VideoSuffix")}
          </A>

          <div className="mt-6 grid gap-8 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:items-start">
            <Plate
              src={FOUR_FACTORS_IMG}
              alt={`${t("csbFourFactorsTitle")} — ${t("csbFourFactorsSubtitle")}`}
              ratio="1 / 1"
              fit="contain"
              mount
              sizes="(max-width: 640px) 100vw, 208px"
            />

            <div>
              <p className="v3-folio">{t("csbFourFactorsTitle")}</p>
              <p className="mt-1 text-sm text-[var(--v3-fg-2)]">{t("csbFourFactorsSubtitle")}</p>
              <Defs
                items={[
                  { term: t("csbFactorPaymentTitle"), desc: t("csbFactorPaymentDesc") },
                  { term: t("csbFactorUtilTitle"), desc: t("csbFactorUtilDesc") },
                  { term: t("csbFactorAgeTitle"), desc: t("csbFactorAgeDesc") },
                  { term: t("csbFactorEnquiriesTitle"), desc: t("csbFactorEnquiriesDesc") },
                ]}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      id: "improve-the-score",
      question: t("csbQ4"),
      answer: (
        <>
          <A>{t("csbA4Intro")}</A>
          <Points
            items={improvements.map(([bold, rest]) => (
              <span key={bold}>
                <strong>{bold}</strong> {rest}
              </span>
            ))}
          />
        </>
      ),
    },
    { id: "can-cibil-change-records", question: t("csbQ5"), answer: <A>{t("csbA5")}</A> },
    { id: "no-hit", question: t("csbQ6"), answer: <A>{t("csbA6")}</A> },
  ];

  return (
    <FaqDocument
      category="megaCreditScoreLoanBasics"
      title={t("csbHeroTitle")}
      actions={
        <Button href={toV3("/register")} size="lg" arrow>
          {t("getYoursNowBtn")}
        </Button>
      }
      entries={entries}
      aside={<FaqNote variant="subscribe" />}
    />
  );
}
