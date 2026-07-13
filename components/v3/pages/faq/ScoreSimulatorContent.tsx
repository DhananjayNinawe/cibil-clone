"use client";

import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import Plate from "@/components/v3/motion/Plate";
import FaqDocument, { A, FaqNote, Points, type FaqEntry } from "@/components/v3/pages/faq/FaqDocument";

const HERO = "https://www.cibil.com/content/dam/cibil/consumer/Score-simulator-banner.jpg";

/**
 * Score Simulator FAQs — five questions and a legal disclaimer.
 *
 * The disclaimer is the point of the page as much as the answers are: a simulator that people
 * mistake for a prediction is a liability. V1 sets it in 12px grey between two cyan hairlines at
 * the very bottom, where nobody reads it. Here it is a regulatory note with a clay rule down its
 * edge, closing the document — the same words, given the weight they were written with.
 */
export default function ScoreSimulatorContent() {
  const { t } = useV3();

  const entries: FaqEntry[] = [
    { id: "what-is-score-simulator", question: t("ssQ1"), answer: <A>{t("ssA1")}</A> },
    {
      id: "how-it-works",
      question: t("ssQ2"),
      answer: (
        <>
          <A>{t("ssA2Intro")}</A>
          <Points
            items={[
              t("ssA2Bullet1"),
              t("ssA2Bullet2"),
              t("ssA2Bullet3"),
              t("ssA2Bullet4"),
              t("ssA2Bullet5"),
            ]}
          />
          <A>{t("ssA2Outro")}</A>
        </>
      ),
    },
    {
      id: "where-to-find-it",
      question: t("ssQ3"),
      answer: (
        <>
          <A>
            {t("ssA3Para1Prefix")}{" "}
            <Link href={toV3("/choose-subscription")} className="v3-focus">
              {t("ssA3Para1Link")}
            </Link>
            .
          </A>
          <A>
            {t("ssA3Para2Prefix")}{" "}
            <Link href={toV3("/login")} className="v3-focus">
              {t("ssA3Para2Link")}
            </Link>
          </A>
        </>
      ),
    },
    { id: "does-it-affect-my-score", question: t("ssQ4"), answer: <A>{t("ssA4")}</A> },
    { id: "how-it-helps", question: t("ssQ5"), answer: <A>{t("ssA5")}</A> },
  ];

  return (
    <FaqDocument
      category="megaScoreSimulatorFaqs"
      title={[
        t("ssHeroTitlePrefix"),
        <span key="brand" className="v3-em">
          {t("ssHeroTitleBold")}
        </span>,
      ]}
      lede={t("ssHeroDesc")}
      actions={
        <Button href={toV3("/register")} size="lg" arrow>
          {t("simulateNowBtn")}
        </Button>
      }
      media={
        <Plate
          src={HERO}
          alt={`${t("ssHeroTitlePrefix")} ${t("ssHeroTitleBold")}`}
          ratio="16 / 10"
          fit="cover"
          priority
          drift
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      }
      entries={entries}
      aside={<FaqNote variant="subscribe" />}
    >
      <Callout tone="regulatory" title={t("ssDisclaimerLabel")} className="mt-12">
        <p className="text-pretty">{t("ssDisclaimer")}</p>
      </Callout>
    </FaqDocument>
  );
}
