"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import FaqLayout from "@/components/v2/pages/faq/FaqLayout";
import VideoCard from "@/components/v2/pages/faq/VideoCard";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import Plate from "@/components/v2/ui/Plate";
import Badge from "@/components/v2/ui/Badge";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/S-Credit-Reporting-2hero-D-090916.jpg";

/** The six sections of a CIBIL Report, in V1's order. */
const REPORT_SECTIONS: [TranslationKey, TranslationKey][] = [
  ["ucsSectionScore", "ucsSectionScoreDesc"],
  ["ucsSectionPersonal", "ucsSectionPersonalDesc"],
  ["ucsSectionContact", "ucsSectionContactDesc"],
  ["ucsSectionEmployment", "ucsSectionEmploymentDesc"],
  ["ucsSectionAccount", "ucsSectionAccountDesc"],
  ["ucsSectionEnquiry", "ucsSectionEnquiryDesc"],
];

/** The regional-language editions V1 lists. Its links are all `#`, so V2 sets them as chips. */
const REGIONAL_LANGS: TranslationKey[] = [
  "langTamil",
  "langMalayalam",
  "langKannada",
  "langHindi",
  "langTelugu",
];

export default function UnderstandScoreContent() {
  const { t } = useV2();

  const regional = (
    <p className="flex flex-wrap gap-2 pt-1">
      {REGIONAL_LANGS.map((lang) => (
        <Badge key={lang} tone="neutral">
          {t(lang)}
        </Badge>
      ))}
    </p>
  );

  const items: AccordionItem[] = [
    {
      id: "ucsQ1",
      question: t("ucsQ1"),
      answer: <p>{t("ucsA1")}</p>,
    },
    {
      id: "ucsQ2",
      question: t("ucsQ2"),
      answer: <p>{t("ucsA2")}</p>,
    },
    {
      id: "ucsQ3",
      question: t("ucsQ3"),
      answer: (
        <>
          <p>
            {t("ucsA3Prefix")}{" "}
            <Link href={toV2("/choose-subscription")}>{t("ucsA3Link")}</Link>
            {t("ucsA3Suffix")}
          </p>
          <p>{t("ucsVideoLinkLine")}</p>
          <VideoCard videoId="7cHGllcvWjY" title={t("ucsVideoReadReportTitle")} className="my-5 max-w-lg" />
          <p>{t("ucsRegionalLangs")}</p>
          {regional}
        </>
      ),
    },
    {
      id: "ucsQ4",
      question: t("ucsQ4"),
      answer: (
        <>
          <p>
            {t("ucsA4Prefix")} <strong>{t("ucsA4Link")}</strong> {t("ucsA4Suffix")}
          </p>
          <ul>
            {REPORT_SECTIONS.map(([title, desc]) => (
              <li key={title}>
                <strong>{t(title)}</strong>
                <br />
                {t(desc)}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: "ucsQ5",
      question: t("ucsQ5"),
      answer: (
        <p>
          {t("ucsA5Prefix")} <strong>{t("ucsA5Link")}</strong> {t("ucsA5Suffix")}
        </p>
      ),
    },
    { id: "ucsQ6", question: t("ucsQ6"), answer: <p>{t("ucsA6")}</p> },
    { id: "ucsQ7", question: t("ucsQ7"), answer: <p>{t("ucsA7")}</p> },
    {
      id: "ucsQ8",
      question: t("ucsQ8"),
      answer: (
        <>
          <p>{t("ucsA8Para1")}</p>
          <p className="italic">
            {t("ucsA8Para2Italic")}{" "}
            <Link href={toV2("/choose-subscription")}>https://www.cibil.com/choose-subscription</Link>)
          </p>
        </>
      ),
    },
    {
      id: "ucsQ9",
      question: t("ucsQ9"),
      answer: (
        <p>
          {t("ucsA9")}{" "}
          <Link href={toV2("/choose-subscription")}>https://www.cibil.com/choose-subscription</Link>
        </p>
      ),
    },
    {
      id: "ucsQ10",
      question: t("ucsQ10"),
      answer: (
        <>
          <VideoCard videoId="FS08WcDyBkA" title={t("ucsVideoEnquiryTitle")} className="mb-5 max-w-lg" />
          <p>{t("ucsEnquiriesRegional")}</p>
          {regional}
        </>
      ),
    },
    {
      id: "ucsQ11",
      question: t("ucsQ11"),
      answer: (
        <p>
          {t("ucsA11")} <Link href={toV2("/faq-brochure")}>{t("ucsDownloadBrochure")}</Link>
        </p>
      ),
    },
  ];

  return (
    <FaqLayout
      slug="understand-your-credit-score-and-report"
      eyebrow={t("megaCibilScoreReport")}
      title={t("ucsHeroTitle")}
      tone="cyan"
      size="lg"
      panel="score-report"
      cta={{ label: t("checkNewScoreBtn"), href: toV2("/register") }}
      media={<Plate src={HERO_IMAGE} alt={t("ucsHeroTitle")} width={720} height={480} priority />}
    >
      <Accordion items={items} multiple defaultOpen={0} />
    </FaqLayout>
  );
}
