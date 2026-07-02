"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function MicrofinanceContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-16">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{t("mfpHeroTitle")}</h1>
          <Link
            href="/register"
            className="inline-block mt-6 w-fit bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-3 transition-colors"
          >
            {t("mfpHeroBtn")}
          </Link>
        </div>
        <div className="relative w-full h-full min-h-[240px] overflow-hidden bg-gradient-to-br from-[#c98a5a] to-[#5a3a25]" />
      </section>

      <div className="bg-[#f5c518] py-3 px-4">
        <p className="text-center text-sm text-gray-900 max-w-5xl mx-auto">{t("mfpBanner")}</p>
      </div>

      {/* What is */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("mfpWhatHeading")}</h2>
        <p className="text-gray-700 leading-relaxed">{t("mfpWhatPara1")}</p>
        <p className="text-gray-700 leading-relaxed mt-4">{t("mfpWhatPara2")}</p>

        <p className="font-bold text-gray-900 mt-8">{t("mfpIncludesHeading")}</p>
        <p className="text-gray-700 leading-relaxed mt-2">{t("mfpIncludesIntro")}</p>
        <ul className="list-disc pl-5 mt-3 space-y-1.5 text-sm text-gray-700">
          <li>{t("mfpInc1")}</li>
          <li>{t("mfpInc2")}</li>
          <li>{t("mfpInc3")}</li>
          <li>{t("mfpInc4")}</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{t("mfpWhyHeading")}</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>
            <span className="font-bold">{t("mfpWhy1Bold")}</span> {t("mfpWhy1")}
          </li>
          <li>
            <span className="font-bold">{t("mfpWhy2Bold")}</span> {t("mfpWhy2")}
          </li>
          <li>
            <span className="font-bold">{t("mfpWhy3Bold")}</span> {t("mfpWhy3")}
          </li>
        </ul>
        <p className="text-sm text-gray-600 italic mt-6">{t("mfpDisclaimer")}</p>
      </section>

      {/* Avail banner */}
      <div className="bg-[#f5c518] py-4 px-4">
        <p className="text-center text-sm text-gray-900 max-w-4xl mx-auto">
          {t("mfpAvailBanner")}{" "}
          <a href="#" className="underline font-semibold">
            {t("disputeClickHere")}
          </a>{" "}
          {t("mfpGetStartedNow")}
        </p>
      </div>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="font-bold text-gray-900 mb-4">{t("mfpStepsHeading")}</p>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-700">
          <li>
            <a href="#" className="text-blue-700 hover:underline">
              {t("downloadWord")}
            </a>{" "}
            {t("mfpStep1Suffix")}
          </li>
          <li>{t("mfpStep2")}</li>
          <li>{t("mfpStep3")}</li>
          <li>{t("mfpStep4")}</li>
        </ol>

        <p className="text-sm text-gray-700 mt-8">
          <Link href="/microfinance-dispute-resolution" className="text-blue-700 hover:underline">
            {t("disputeClickHere")}
          </Link>{" "}
          {t("mfpDisputeSuffix")}
        </p>
      </section>
    </>
  );
}
