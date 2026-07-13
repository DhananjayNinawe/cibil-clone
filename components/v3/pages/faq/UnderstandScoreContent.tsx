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
  RegionalLanguages,
  VideoPlate,
  type FaqEntry,
} from "@/components/v3/pages/faq/FaqDocument";

const HERO = "https://www.cibil.com/content/dam/cibil/consumer/S-Credit-Reporting-2hero-D-090916.jpg";
const SUBSCRIPTION_URL = "https://www.cibil.com/choose-subscription";

/**
 * Understand Your Credit Score and Report — eleven questions, two explainer videos and the six
 * sections of a CIR.
 *
 * The CIR anatomy (Q4) is set as a ruled definition list rather than a bulleted blob: it is a
 * reference table, and a reader scanning for "what is the Enquiry section?" should find it by
 * running a finger down the terms in the margin.
 */
export default function UnderstandScoreContent() {
  const { t } = useV3();

  const entries: FaqEntry[] = [
    {
      id: "what-is-score",
      question: t("ucsQ1"),
      answer: <A>{t("ucsA1")}</A>,
    },
    {
      id: "more-than-a-score",
      question: t("ucsQ2"),
      answer: <A>{t("ucsA2")}</A>,
    },
    {
      id: "account-and-member-details",
      question: t("ucsQ3"),
      answer: (
        <>
          <A>
            {t("ucsA3Prefix")}{" "}
            <Link href={toV3("/choose-subscription")} className="v3-focus">
              {t("ucsA3Link")}
            </Link>
            {t("ucsA3Suffix")}
          </A>
          <A>{t("ucsVideoLinkLine")}</A>
          <VideoPlate
            videoId="7cHGllcvWjY"
            title={t("ucsVideoReadReportTitle")}
            className="my-5 max-w-md"
          />
          <A>{t("ucsRegionalLangs")}</A>
          <RegionalLanguages />
        </>
      ),
    },
    {
      id: "how-to-read-the-report",
      question: t("ucsQ4"),
      answer: (
        <>
          <A>
            {t("ucsA4Prefix")} <strong>{t("ucsA4Link")}</strong> {t("ucsA4Suffix")}
          </A>
          <Defs
            items={[
              { term: t("ucsSectionScore"), desc: t("ucsSectionScoreDesc") },
              { term: t("ucsSectionPersonal"), desc: t("ucsSectionPersonalDesc") },
              { term: t("ucsSectionContact"), desc: t("ucsSectionContactDesc") },
              { term: t("ucsSectionEmployment"), desc: t("ucsSectionEmploymentDesc") },
              { term: t("ucsSectionAccount"), desc: t("ucsSectionAccountDesc") },
              { term: t("ucsSectionEnquiry"), desc: t("ucsSectionEnquiryDesc") },
            ]}
          />
        </>
      ),
    },
    {
      id: "cir-glossary",
      question: t("ucsQ5"),
      answer: (
        <A>
          {t("ucsA5Prefix")} <strong>{t("ucsA5Link")}</strong> {t("ucsA5Suffix")}
        </A>
      ),
    },
    { id: "add-on-credit-card", question: t("ucsQ6"), answer: <A>{t("ucsA6")}</A> },
    { id: "guarantor-loans", question: t("ucsQ7"), answer: <A>{t("ucsA7")}</A> },
    {
      id: "unrecognised-accounts",
      question: t("ucsQ8"),
      answer: (
        <>
          <A>{t("ucsA8Para1")}</A>
          <A italic>
            {t("ucsA8Para2Italic")}{" "}
            <Link href={toV3("/choose-subscription")} className="v3-focus">
              {SUBSCRIPTION_URL}
            </Link>
            )
          </A>
        </>
      ),
    },
    {
      id: "closed-accounts-outstanding",
      question: t("ucsQ9"),
      answer: (
        <A>
          {t("ucsA9")}{" "}
          <Link href={toV3("/choose-subscription")} className="v3-focus">
            {SUBSCRIPTION_URL}
          </Link>
        </A>
      ),
    },
    {
      id: "enquiries-and-score",
      question: t("ucsQ10"),
      answer: (
        <>
          <VideoPlate
            videoId="FS08WcDyBkA"
            title={t("ucsVideoEnquiryTitle")}
            className="mb-5 max-w-md"
          />
          <A>{t("ucsEnquiriesRegional")}</A>
          <RegionalLanguages />
        </>
      ),
    },
    {
      id: "information-security",
      question: t("ucsQ11"),
      answer: (
        <A>
          {t("ucsA11")}{" "}
          <Link href={toV3("/faq-brochure")} className="v3-focus">
            {t("ucsDownloadBrochure")}
          </Link>
        </A>
      ),
    },
  ];

  return (
    <FaqDocument
      category="megaUnderstandScoreReport"
      title={t("ucsHeroTitle")}
      actions={
        <Button href={toV3("/register")} size="lg" arrow>
          {t("checkNewScoreBtn")}
        </Button>
      }
      media={
        <Plate
          src={HERO}
          alt={t("ucsHeroTitle")}
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
