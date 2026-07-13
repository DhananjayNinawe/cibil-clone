"use client";

import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import FaqLayout from "@/components/v2/pages/faq/FaqLayout";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import Callout from "@/components/v2/ui/Callout";
import Plate from "@/components/v2/ui/Plate";
import Prose from "@/components/v2/ui/Prose";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/Score-simulator-banner.jpg";

export default function ScoreSimulatorContent() {
  const { t } = useV2();

  const items: AccordionItem[] = [
    { id: "ssQ1", question: t("ssQ1"), answer: <p>{t("ssA1")}</p> },
    {
      id: "ssQ2",
      question: t("ssQ2"),
      answer: (
        <>
          <p>{t("ssA2Intro")}</p>
          <ul>
            <li>{t("ssA2Bullet1")}</li>
            <li>{t("ssA2Bullet2")}</li>
            <li>{t("ssA2Bullet3")}</li>
            <li>{t("ssA2Bullet4")}</li>
            <li>{t("ssA2Bullet5")}</li>
          </ul>
          <p>{t("ssA2Outro")}</p>
        </>
      ),
    },
    {
      id: "ssQ3",
      question: t("ssQ3"),
      answer: (
        <>
          <p>
            {t("ssA3Para1Prefix")}{" "}
            <Link href={toV2("/choose-subscription")}>{t("ssA3Para1Link")}</Link>.
          </p>
          <p>
            {t("ssA3Para2Prefix")} <Link href={toV2("/login")}>{t("ssA3Para2Link")}</Link>
          </p>
        </>
      ),
    },
    { id: "ssQ4", question: t("ssQ4"), answer: <p>{t("ssA4")}</p> },
    { id: "ssQ5", question: t("ssQ5"), answer: <p>{t("ssA5")}</p> },
  ];

  return (
    <FaqLayout
      slug="score-simulator"
      eyebrow={t("featScoreSimulator")}
      title={t("ssHeroTitlePrefix")}
      titleAccent={t("ssHeroTitleBold")}
      lede={t("ssHeroDesc")}
      tone="duo"
      size="lg"
      panel="subscribe"
      cta={{ label: t("simulateNowBtn"), href: toV2("/register") }}
      media={
        <Plate
          src={HERO_IMAGE}
          alt={`${t("ssHeroTitlePrefix")} ${t("ssHeroTitleBold")}`}
          width={720}
          height={480}
          priority
        />
      }
    >
      <Accordion items={items} multiple defaultOpen={0} />

      {/* V1 parks the legal disclaimer in a hairline band at the foot of the page; it belongs
          with the answers it qualifies, so it closes the reading column instead. */}
      <Callout tone="warning" title={t("ssDisclaimerLabel")} className="mt-12">
        <Prose className="text-xs">
          <p className="mb-0">{t("ssDisclaimer")}</p>
        </Prose>
      </Callout>
    </FaqLayout>
  );
}
