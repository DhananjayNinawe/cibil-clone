"use client";

import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import Button from "@/components/v3/ui/Button";
import Ledger from "@/components/v3/ui/Ledger";
import Plate from "@/components/v3/motion/Plate";
import FaqDocument, { A, FaqNote, type FaqEntry } from "@/components/v3/pages/faq/FaqDocument";
import RankOffer from "@/components/v3/pages/faq/RankOffer";

const HERO = "https://www.cibil.com/content/dam/cibil/consumer/P-Custom-Scorecards-2hero-D-310816.jpg";

/**
 * CIBIL Rank and Company Credit Report FAQs — eight questions.
 *
 * Q6 asks for the difference between the Rank and the Score, and V1 answers with a *photograph of
 * a table*: eight sentences baked into a JPEG, unselectable, unsearchable, unreadable by a screen
 * reader and never translated, even though all eight are sitting in the catalog as ccrfDiffRank1–4
 * and ccrfDiffScore1–4. Here they are the ledger they always were — ruled, tabular, and in the
 * reader's language.
 */
export default function CompanyReportContent() {
  const { t } = useV3();

  const entries: FaqEntry[] = [
    { id: "what-is-cibil-rank", question: t("ccrfQ1"), answer: <A>{t("ccrfA1")}</A> },
    { id: "how-rank-is-calculated", question: t("ccrfQ2"), answer: <A>{t("ccrfA2")}</A> },
    { id: "what-is-ccr", question: t("ccrfQ3"), answer: <A>{t("ccrfA3")}</A> },
    {
      id: "who-can-access",
      question: t("ccrfQ4"),
      answer: (
        <A>
          {t("ccrfA4")}{" "}
          <Link href={toV3("/register")} className="v3-focus">
            {t("ccrfA4Link")}
          </Link>
        </A>
      ),
    },
    { id: "rank-not-available", question: t("ccrfQ5"), answer: <A>{t("ccrfA5")}</A> },
    {
      id: "rank-versus-score",
      question: t("ccrfQ6"),
      answer: (
        <Ledger
          /* The primitive bleeds itself out to the page gutter so a wide table can scroll on a
             phone. Inside an answer column that would reach across the margin rail, so the bleed
             is cancelled here — the table scrolls within the column instead. */
          className="mx-0! px-0!"
          caption={`${t("ccrfDiffTitle")} ${t("ccrfDiffRankHeader")} / ${t("ccrfDiffScoreHeader")}`}
          columns={[t("ccrfDiffRankHeader"), t("ccrfDiffScoreHeader")]}
          rows={[
            [t("ccrfDiffRank1"), t("ccrfDiffScore1")],
            [t("ccrfDiffRank2"), t("ccrfDiffScore2")],
            [t("ccrfDiffRank3"), t("ccrfDiffScore3")],
            [t("ccrfDiffRank4"), t("ccrfDiffScore4")],
          ]}
        />
      ),
    },
    { id: "rank-versus-rating", question: t("ccrfQ7"), answer: <A>{t("ccrfA7")}</A> },
    {
      id: "rectify-the-ccr",
      question: t("ccrfQ8"),
      answer: (
        <A>
          {t("ccrfA8Prefix")}{" "}
          <Link href={toV3("/company-dispute-resolution")} className="v3-focus">
            {t("ccrfA8Link")}
          </Link>{" "}
          {t("ccrfA8Suffix")}
        </A>
      ),
    },
  ];

  return (
    <FaqDocument
      category="megaRankCompanyFaqs"
      title={t("ccrfHeroTitle")}
      actions={
        <Button href={toV3("/register")} size="lg" arrow>
          {t("getRankReportBtn")}
        </Button>
      }
      media={
        <Plate
          src={HERO}
          alt={t("ccrfHeroTitle")}
          ratio="16 / 10"
          fit="cover"
          priority
          drift
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      }
      intro={<RankOffer />}
      entries={entries}
      aside={<FaqNote variant="rank" />}
    />
  );
}
