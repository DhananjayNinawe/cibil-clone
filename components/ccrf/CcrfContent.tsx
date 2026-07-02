"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";

function QaBlock({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-gray-900 mb-3">{q}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

function OfferBanner() {
  const { t } = useLanguage();
  return (
    <div className="bg-[#0a3a52] py-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white text-lg font-semibold">
          {t("ccrfOfferPrefix")} <span className="text-[#f5c518] font-bold">{t("ccrfOfferPercent")}</span>{" "}
          {t("ccrfOfferSuffix")}
        </p>
        <div className="flex items-center gap-3">
          <span className="bg-white text-gray-900 text-sm font-bold rounded px-3 py-1.5">{t("ccrfUseCode")}</span>
          <span className="border border-white text-white text-sm font-bold rounded px-3 py-1.5">{t("ccrfCode")}</span>
        </div>
        <div className="text-right">
          <p className="text-[#f5c518] text-sm font-bold">{t("ccrfLimitedOffer")}</p>
          <p className="text-white text-xs mt-1">30 : 06 : 19</p>
        </div>
      </div>
    </div>
  );
}

function DifferenceTable() {
  const { t } = useLanguage();
  const rows: [string, string][] = [
    [t("ccrfDiffRank1"), t("ccrfDiffScore1")],
    [t("ccrfDiffRank2"), t("ccrfDiffScore2")],
    [t("ccrfDiffRank3"), t("ccrfDiffScore3")],
    [t("ccrfDiffRank4"), t("ccrfDiffScore4")],
  ];

  return (
    <div className="bg-gray-100 rounded-lg p-4 sm:p-6 my-4">
      <p className="text-center font-bold text-gray-800 mb-4">{t("ccrfDiffTitle")}</p>
      <div className="grid grid-cols-2 gap-3">
        <p className="bg-[#00b0f0] text-white text-center text-sm font-bold py-2 rounded">{t("ccrfDiffRankHeader")}</p>
        <p className="bg-orange-500 text-white text-center text-sm font-bold py-2 rounded">{t("ccrfDiffScoreHeader")}</p>
        {rows.map(([rank, score], i) => (
          <div key={i} className="contents">
            <p className="bg-[#f5c518] text-gray-900 text-xs p-3 rounded">{rank}</p>
            <p className="bg-[#f5c518] text-gray-900 text-xs p-3 rounded">{score}</p>
          </div>
        ))}
      </div>
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
