"use client";

import Image from "next/image";
import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import FaqLayout from "@/components/v2/pages/faq/FaqLayout";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import Callout from "@/components/v2/ui/Callout";
import Plate from "@/components/v2/ui/Plate";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/P-TransUnion-CIBIL-Bureau-Credit-Characteristics-2hero-D-190816.jpg";
const DISPUTE_FLOW_IMAGE =
  "https://www.cibil.com/faq/loan-rejections-disputes/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image.coreimg.75.1440.jpeg/1671464745775/dispute-horizontal-flow-if-report-received-from-lender.jpeg";
const DISPUTE_FLOW_IMAGE_2 =
  "https://www.cibil.com/faq/loan-rejections-disputes/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image_38853473.coreimg.75.1440.jpeg/1671464816941/dispute-horizontal-flow-if-report-received-from-lender.jpeg";
const UNDER_DISPUTE_ALERT_IMAGE =
  "https://www.cibil.com/faq/loan-rejections-disputes/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image_38853473_copy.coreimg.75.1440.jpeg/1680641281919/loan-rejection-disputes-02.jpeg";

/** The dispute-flow diagrams are drawn on white; they get the same lit mat as every other CIBIL asset. */
function FlowPlate({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="my-5 block overflow-hidden rounded-[var(--v2-r-md)] bg-white p-3">
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={260}
        unoptimized
        sizes="(max-width: 1024px) 100vw, 720px"
        className="h-auto w-full object-contain"
      />
    </span>
  );
}

export default function DisputesContent() {
  const { t } = useV2();

  const items: AccordionItem[] = [
    { id: "lrdQ1", question: t("lrdQ1"), answer: <p>{t("lrdA1")}</p> },
    {
      id: "lrdQ2",
      question: t("lrdQ2"),
      answer: (
        <ul>
          <li>
            <strong>{t("lrdA2Ownership")}</strong>
            <br />
            {t("lrdA2OwnershipDesc")}
          </li>
          <li>
            <strong>{t("lrdA2Incorrect")}</strong>
            <br />
            {t("lrdA2IncorrectDesc")}
          </li>
          <li>
            <strong>{t("lrdA2Inaccurate")}</strong>
            <br />
            {t("lrdA2InaccurateDesc")}{" "}
            <Link href={toV2("/consumer-dispute-resolution")}>{t("lrdA2ClickHere")}</Link>{" "}
            {t("lrdA2ClickHereSuffix")}
          </li>
        </ul>
      ),
    },
    { id: "lrdQ3", question: t("lrdQ3"), answer: <p>{t("lrdA3")}</p> },
    { id: "lrdQ4", question: t("lrdQ4"), answer: <p>{t("lrdA4")}</p> },
    {
      id: "lrdQ5",
      question: t("lrdQ5"),
      answer: (
        <>
          <p>{t("lrdA5Intro")}</p>
          <FlowPlate src={DISPUTE_FLOW_IMAGE} alt={t("lrdA5Intro")} />
          <p>
            <Link href={toV2("/watch-and-learn")}>{t("lrdA5VideoLink")}</Link>
          </p>
          <Callout tone="note" className="my-5">
            {t("lrdA5Note")}
          </Callout>
          <p>
            <strong>{t("lrdA5Received")}</strong> {t("lrdA5ReceivedDesc")}
          </p>
          <p>{t("lrdA5Once")}</p>
          <p>{t("lrdA5Time")}</p>
          <FlowPlate src={DISPUTE_FLOW_IMAGE_2} alt={t("lrdA5UnderstandSuffix")} />
          <p>
            <Link href={toV2("/consumer-dispute-resolution")}>{t("lrdA5UnderstandLink")}</Link>{" "}
            {t("lrdA5UnderstandSuffix")}
          </p>
        </>
      ),
    },
    { id: "lrdQ6", question: t("lrdQ6"), answer: <p>{t("lrdA6")}</p> },
    { id: "lrdQ7", question: t("lrdQ7"), answer: <p>{t("lrdA7")}</p> },
    {
      id: "lrdQ8",
      question: t("lrdQ8"),
      answer: (
        <>
          <p>{t("lrdA8Para1")}</p>
          <p>{t("lrdA8Para2")}</p>
        </>
      ),
    },
    { id: "lrdQ9", question: t("lrdQ9"), answer: <p>{t("lrdA9")}</p> },
    { id: "lrdQ10", question: t("lrdQ10"), answer: <p>{t("lrdA10")}</p> },
    { id: "lrdQ11", question: t("lrdQ11"), answer: <p>{t("lrdA11")}</p> },
    { id: "lrdQ12", question: t("lrdQ12"), answer: <p>{t("lrdA12")}</p> },
    { id: "lrdQ13", question: t("lrdQ13"), answer: <p>{t("lrdA13")}</p> },
    {
      id: "lrdQ14",
      question: t("lrdQ14"),
      answer: (
        <>
          <p>{t("lrdA14")}</p>
          <FlowPlate src={UNDER_DISPUTE_ALERT_IMAGE} alt={t("lrdQ14")} />
        </>
      ),
    },
    { id: "lrdQ15", question: t("lrdQ15"), answer: <p>{t("lrdA15")}</p> },
    { id: "lrdQ16", question: t("lrdQ16"), answer: <p>{t("lrdA16")}</p> },
    {
      id: "lrdQ17",
      question: t("lrdQ17"),
      answer: (
        <>
          <p>{t("lrdA17Intro")}</p>
          <ul>
            <li>{t("lrdA17Bullet1")}</li>
            <li>{t("lrdA17Bullet2")}</li>
          </ul>
          <p>{t("lrdA17Suffix")}</p>
        </>
      ),
    },
    { id: "lrdQ18", question: t("lrdQ18"), answer: <p>{t("lrdA18")}</p> },
  ];

  return (
    <FaqLayout
      slug="loan-rejections-disputes"
      eyebrow={t("navGrievance")}
      title={t("lrdHeroTitle")}
      lede={t("disputeFreeServiceBanner")}
      tone="deep"
      size="md"
      panel="subscribe"
      cta={{ label: t("raiseDisputeOnlineBtn"), href: toV2("/consumer-dispute-resolution") }}
      media={<Plate src={HERO_IMAGE} alt={t("lrdHeroTitle")} width={720} height={480} priority />}
    >
      <Accordion items={items} multiple defaultOpen={0} />
    </FaqLayout>
  );
}
