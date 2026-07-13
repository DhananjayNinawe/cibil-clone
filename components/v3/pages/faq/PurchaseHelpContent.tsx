"use client";

import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import Button from "@/components/v3/ui/Button";
import Plate from "@/components/v3/motion/Plate";
import FaqDocument, { A, Figure, FaqNote, type FaqEntry } from "@/components/v3/pages/faq/FaqDocument";

const HERO = "https://www.cibil.com/content/dam/cibil/consumer/S-Collections-Management-2hero-D-090916.jpg";
const REFRESH_CENTER_IMG =
  "https://www.cibil.com/faq/purchase-post-purchase-help/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image.coreimg.jpeg/1680548740381/purchase-post-01.jpeg";

/**
 * Purchase and Post-Purchase Help — four questions about buying, logging in and verifying.
 *
 * The Refresh Center screenshot carries three strings *inside the image* — the panel's name, the
 * age of the report and the button you are meant to press — and V1 leaves a screen reader with
 * none of them. All three are in the catalog, so here they are the plate's alt text: the same
 * instruction, whether you can see the picture or not.
 */
export default function PurchaseHelpContent() {
  const { t } = useV3();

  const entries: FaqEntry[] = [
    {
      id: "unlimited-access-plans",
      question: t("ppQ1"),
      answer: (
        <A>
          {t("ppA1Prefix")}{" "}
          <Link href={toV3("/choose-subscription")} className="v3-focus">
            {t("ppA1Link")}
          </Link>{" "}
          {t("ppA1Suffix")}
        </A>
      ),
    },
    {
      id: "account-already-exists",
      question: t("ppQ2"),
      answer: (
        <>
          <A>{t("ppA2")}</A>
          <Figure
            src={REFRESH_CENTER_IMG}
            alt={`${t("ppRefreshCenter")} — ${t("ppReportAge")} ${t("ppBuyReportsBtn")}`}
            ratio="13 / 9"
          />
          <A>
            <Link href={toV3("/login")} className="v3-focus">
              {t("ppLoginMyCibil")}
            </Link>
          </A>
        </>
      ),
    },
    {
      id: "identity-verification",
      question: t("ppQ3"),
      answer: (
        <>
          <A>{t("ppA3Para1")}</A>
          <A>{t("ppA3Para2")}</A>
        </>
      ),
    },
    {
      id: "report-only",
      question: t("ppQ4"),
      answer: (
        <A>
          {t("ppA4Prefix")} <strong>{t("ppA4Link")}</strong> {t("ppA4Suffix")}
        </A>
      ),
    },
  ];

  return (
    <FaqDocument
      category="megaPurchasePostPurchase"
      title={t("ppHeroTitle")}
      actions={
        <Button href={toV3("/choose-subscription")} size="lg" arrow>
          {t("getYoursNowBtn")}
        </Button>
      }
      media={
        <Plate
          src={HERO}
          alt={t("ppHeroTitle")}
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
