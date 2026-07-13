"use client";

import Image from "next/image";
import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import FaqLayout from "@/components/v2/pages/faq/FaqLayout";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import Plate from "@/components/v2/ui/Plate";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/S-Collections-Management-2hero-D-090916.jpg";
const REFRESH_CENTER_IMAGE =
  "https://www.cibil.com/faq/purchase-post-purchase-help/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image.coreimg.jpeg/1680548740381/purchase-post-01.jpeg";

export default function PurchaseHelpContent() {
  const { t } = useV2();

  const items: AccordionItem[] = [
    {
      id: "ppQ1",
      question: t("ppQ1"),
      answer: (
        <p>
          {t("ppA1Prefix")} <Link href={toV2("/choose-subscription")}>{t("ppA1Link")}</Link>{" "}
          {t("ppA1Suffix")}
        </p>
      ),
    },
    {
      id: "ppQ2",
      question: t("ppQ2"),
      answer: (
        <>
          <p>{t("ppA2")}</p>
          <span className="my-5 block overflow-hidden rounded-[var(--v2-r-md)] bg-white p-3 sm:max-w-lg">
            <Image
              src={REFRESH_CENTER_IMAGE}
              alt={t("ppRefreshCenter")}
              width={520}
              height={360}
              unoptimized
              sizes="(max-width: 640px) 100vw, 520px"
              className="h-auto w-full object-contain"
            />
          </span>
          <p>
            <Link href={toV2("/login")}>{t("ppLoginMyCibil")}</Link>
          </p>
        </>
      ),
    },
    {
      id: "ppQ3",
      question: t("ppQ3"),
      answer: (
        <>
          <p>{t("ppA3Para1")}</p>
          <p>{t("ppA3Para2")}</p>
        </>
      ),
    },
    {
      id: "ppQ4",
      question: t("ppQ4"),
      answer: (
        <p>
          {t("ppA4Prefix")} <strong>{t("ppA4Link")}</strong> {t("ppA4Suffix")}
        </p>
      ),
    },
  ];

  return (
    <FaqLayout
      slug="purchase-post-purchase-help"
      eyebrow={t("navSupport")}
      title={t("ppHeroTitle")}
      tone="cyan"
      size="sm"
      panel="subscribe"
      cta={{ label: t("getYoursNowBtn"), href: toV2("/choose-subscription") }}
      media={<Plate src={HERO_IMAGE} alt={t("ppHeroTitle")} width={720} height={480} priority />}
    >
      <Accordion items={items} multiple defaultOpen={0} />
    </FaqLayout>
  );
}
