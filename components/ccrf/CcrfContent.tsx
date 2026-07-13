"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";
import OfferBanner from "@/components/shared/OfferBanner";

function QaBlock({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-gray-900 mb-3">{q}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

function DifferenceTable() {
  const { t } = useLanguage();
  return (
    <div className="bg-gray-100 rounded-lg p-4 sm:p-6 my-4">
      <Image
        src="https://www.cibil.com/faq/company-credit-report/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image_1566811398.coreimg.75.1440.jpeg/1688980173202/faq-ccr-10cr-50cr.jpeg"
        alt={`${t("ccrfDiffTitle")} ${t("ccrfDiffRankHeader")} ${t("ccrfDiffScoreHeader")}`}
        width={720}
        height={1100}
        unoptimized
        sizes="(max-width: 640px) 100vw, 640px"
        className="w-full h-auto mx-auto"
      />
    </div>
  );
}

export default function CcrfContent() {
  const { t } = useLanguage();

  return (
    <>
      <OfferBanner />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        <div>
          <QaBlock q={t("ccrfQ1")}>
            <p>{t("ccrfA1")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ2")}>
            <p>{t("ccrfA2")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ3")}>
            <p>{t("ccrfA3")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ4")}>
            <p>
              {t("ccrfA4")}{" "}
              <a href="#" className="text-blue-700 hover:underline">
                {t("ccrfA4Link")}
              </a>
            </p>
          </QaBlock>
          <QaBlock q={t("ccrfQ5")}>
            <p>{t("ccrfA5")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ6")}>
            <DifferenceTable />
          </QaBlock>
          <QaBlock q={t("ccrfQ7")}>
            <p>{t("ccrfA7")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ8")}>
            <p>
              {t("ccrfA8Prefix")}{" "}
              <Link href="/company-dispute-resolution" className="text-blue-700 hover:underline">
                {t("ccrfA8Link")}
              </Link>{" "}
              {t("ccrfA8Suffix")}
            </p>
          </QaBlock>
        </div>

        <div className="flex justify-center lg:justify-start">
          <div className="lg:sticky lg:top-40">
            <CreditSidebarCard variant="rank" />
          </div>
        </div>
      </section>
    </>
  );
}
