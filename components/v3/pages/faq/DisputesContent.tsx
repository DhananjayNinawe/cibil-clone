"use client";

import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import Button from "@/components/v3/ui/Button";
import Plate from "@/components/v3/motion/Plate";
import FaqDocument, {
  A,
  Defs,
  Figure,
  FaqNote,
  Points,
  type FaqEntry,
} from "@/components/v3/pages/faq/FaqDocument";

const HERO =
  "https://www.cibil.com/content/dam/cibil/consumer/P-TransUnion-CIBIL-Bureau-Credit-Characteristics-2hero-D-190816.jpg";
const DISPUTE_FLOW_IMAGE =
  "https://www.cibil.com/faq/loan-rejections-disputes/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image.coreimg.75.1440.jpeg/1671464745775/dispute-horizontal-flow-if-report-received-from-lender.jpeg";
const DISPUTE_FLOW_IMAGE_2 =
  "https://www.cibil.com/faq/loan-rejections-disputes/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image_38853473.coreimg.75.1440.jpeg/1671464816941/dispute-horizontal-flow-if-report-received-from-lender.jpeg";
const UNDER_DISPUTE_ALERT_IMAGE =
  "https://www.cibil.com/faq/loan-rejections-disputes/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image_38853473_copy.coreimg.75.1440.jpeg/1680641281919/loan-rejection-disputes-02.jpeg";

/**
 * Loan Rejections and Disputes — eighteen questions, the longest FAQ on the site.
 *
 * This page is the whole argument for the margin rail. In V1 it is an unbroken column of bold
 * sentences with no index and no anchors: a reader who wants "how long does a dispute take?" has
 * to scroll and read every question on the way. Here the eighteen are listed in the margin, each
 * one is a link you can send someone, and the answer opens itself when you arrive on it.
 */
export default function DisputesContent() {
  const { t } = useV3();

  const entries: FaqEntry[] = [
    { id: "defaulters-list", question: t("lrdQ1"), answer: <A>{t("lrdA1")}</A> },
    {
      id: "kinds-of-inaccuracy",
      question: t("lrdQ2"),
      answer: (
        <>
          <Defs
            items={[
              { term: t("lrdA2Ownership"), desc: t("lrdA2OwnershipDesc") },
              { term: t("lrdA2Incorrect"), desc: t("lrdA2IncorrectDesc") },
              { term: t("lrdA2Inaccurate"), desc: t("lrdA2InaccurateDesc") },
            ]}
          />
          <A>
            <Link href={toV3("/consumer-dispute-resolution")} className="v3-focus">
              {t("lrdA2ClickHere")}
            </Link>{" "}
            {t("lrdA2ClickHereSuffix")}
          </A>
        </>
      ),
    },
    { id: "closed-accounts-still-showing", question: t("lrdQ3"), answer: <A>{t("lrdA3")}</A> },
    { id: "can-cibil-correct-data", question: t("lrdQ4"), answer: <A>{t("lrdA4")}</A> },
    {
      id: "how-to-raise-a-dispute",
      question: t("lrdQ5"),
      answer: (
        <>
          <A>{t("lrdA5Intro")}</A>
          <Figure src={DISPUTE_FLOW_IMAGE} alt={t("lrdA5Intro")} ratio="1440 / 220" />
          <A>
            <Link href={toV3("/watch-and-learn")} className="v3-focus">
              {t("lrdA5VideoLink")}
            </Link>
          </A>
          <A italic>{t("lrdA5Note")}</A>
          <A>
            <strong>{t("lrdA5Received")}</strong> {t("lrdA5ReceivedDesc")}
          </A>
          <A>{t("lrdA5Once")}</A>
          <A>{t("lrdA5Time")}</A>
          <Figure src={DISPUTE_FLOW_IMAGE_2} alt={t("lrdA5UnderstandSuffix")} ratio="1440 / 220" />
          <A>
            <Link href={toV3("/consumer-dispute-resolution")} className="v3-focus">
              {t("lrdA5UnderstandLink")}
            </Link>{" "}
            {t("lrdA5UnderstandSuffix")}
          </A>
        </>
      ),
    },
    { id: "incomplete-report", question: t("lrdQ6"), answer: <A>{t("lrdA6")}</A> },
    { id: "branch-details", question: t("lrdQ7"), answer: <A>{t("lrdA7")}</A> },
    {
      id: "one-dispute-type",
      question: t("lrdQ8"),
      answer: (
        <>
          <A>{t("lrdA8Para1")}</A>
          <A>{t("lrdA8Para2")}</A>
        </>
      ),
    },
    { id: "what-cibil-does", question: t("lrdQ9"), answer: <A>{t("lrdA9")}</A> },
    { id: "dispute-status", question: t("lrdQ10"), answer: <A>{t("lrdA10")}</A> },
    { id: "contact-your-lender", question: t("lrdQ11"), answer: <A>{t("lrdA11")}</A> },
    { id: "why-no-consumer-check", question: t("lrdQ12"), answer: <A>{t("lrdA12")}</A> },
    { id: "unsatisfied-with-result", question: t("lrdQ13"), answer: <A>{t("lrdA13")}</A> },
    {
      id: "under-dispute-alert",
      question: t("lrdQ14"),
      answer: (
        <>
          <A>{t("lrdA14")}</A>
          <Figure src={UNDER_DISPUTE_ALERT_IMAGE} alt={t("lrdQ14")} ratio="1440 / 380" />
        </>
      ),
    },
    { id: "thirty-day-deadline", question: t("lrdQ15"), answer: <A>{t("lrdA15")}</A> },
    { id: "time-to-update", question: t("lrdQ16"), answer: <A>{t("lrdA16")}</A> },
    {
      id: "account-not-updated",
      question: t("lrdQ17"),
      answer: (
        <>
          <A>{t("lrdA17Intro")}</A>
          <Points items={[t("lrdA17Bullet1"), t("lrdA17Bullet2")]} />
          <A>{t("lrdA17Suffix")}</A>
        </>
      ),
    },
    { id: "no-update-from-lender", question: t("lrdQ18"), answer: <A>{t("lrdA18")}</A> },
  ];

  return (
    <FaqDocument
      category="megaLoanRejectionsDisputes"
      title={t("lrdHeroTitle")}
      actions={
        <Button href={toV3("/consumer-dispute-resolution")} size="lg" arrow>
          {t("raiseDisputeOnlineBtn")}
        </Button>
      }
      media={
        <Plate
          src={HERO}
          alt={t("lrdHeroTitle")}
          ratio="16 / 10"
          fit="cover"
          priority
          drift
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      }
      entries={entries}
      aside={<FaqNote variant="subscribe" />}
    />
  );
}
