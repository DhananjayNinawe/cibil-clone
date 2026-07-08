"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";

const FOUR_FACTORS_IMG =
  "https://www.cibil.com/faq/credit-score-and-loan-basics/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image.coreimg.75.1440.jpeg/1738733444575/factors.jpeg";

function QaBlock({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{q}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

function FactorCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <p className="font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2 inline-block">{title}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function CsbContent() {
  const { t } = useLanguage();

  const bullets: [string, string][] = [
    [t("csbA4Bullet1Bold"), t("csbA4Bullet1")],
    [t("csbA4Bullet2Bold"), t("csbA4Bullet2")],
    [t("csbA4Bullet3Bold"), t("csbA4Bullet3")],
    [t("csbA4Bullet4Bold"), t("csbA4Bullet4")],
    [t("csbA4Bullet5Bold"), t("csbA4Bullet5")],
    [t("csbA4Bullet6Bold"), t("csbA4Bullet6")],
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
      <div>
        <QaBlock q={t("csbQ1")}>
          <p>{t("csbA1Para1")}</p>
          <p>{t("csbA1Para2")}</p>
          <p>
            <a href="#" className="text-blue-700 hover:underline">
              {t("csbA1Link")}
            </a>{" "}
            {t("csbA1LinkSuffix")}
          </p>
        </QaBlock>

        <QaBlock q={t("csbQ2")}>
          <p>{t("csbA2")}</p>
        </QaBlock>

        <QaBlock q={t("csbQ3")}>
          <p>{t("csbA3")}</p>
          <p>
            <a href="#" className="text-blue-700 hover:underline">
              {t("csbA3VideoLink")}
            </a>{" "}
            {t("csbA3VideoSuffix")}
          </p>
        </QaBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mt-10">
          <FactorCard title={t("csbFactorAgeTitle")} desc={t("csbFactorAgeDesc")} />
          <FactorCard title={t("csbFactorUtilTitle")} desc={t("csbFactorUtilDesc")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,260px)_1fr] gap-x-10 gap-y-8 items-center my-10">
          <div className="relative aspect-square w-full max-w-[260px] mx-auto sm:mx-0">
            <Image
              src={FOUR_FACTORS_IMG}
              alt={`${t("csbFourFactorsTitle")} ${t("csbFourFactorsSubtitle")}`}
              fill
              unoptimized
              sizes="260px"
              className="object-contain"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            <FactorCard title={t("csbFactorPaymentTitle")} desc={t("csbFactorPaymentDesc")} />
            <FactorCard title={t("csbFactorEnquiriesTitle")} desc={t("csbFactorEnquiriesDesc")} />
          </div>
        </div>

        <QaBlock q={t("csbQ4")}>
          <p>{t("csbA4Intro")}</p>
          <ul className="space-y-2 list-disc pl-5">
            {bullets.map(([bold, rest]) => (
              <li key={bold}>
                <span className="font-bold">{bold}</span> {rest}
              </li>
            ))}
          </ul>
        </QaBlock>

        <QaBlock q={t("csbQ5")}>
          <p>{t("csbA5")}</p>
        </QaBlock>

        <QaBlock q={t("csbQ6")}>
          <p>{t("csbA6")}</p>
        </QaBlock>
      </div>

      <div className="flex justify-center lg:justify-end">
        <CreditSidebarCard variant="subscribe" />
      </div>
    </section>
  );
}
