"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { ReportChartIcon, ClockIcon, PersonContactIcon, DocumentIcon, BankIcon } from "@/components/icons";
import FaqAccordion, { FaqItem } from "@/components/faq/FaqAccordion";

function HeroSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{t("fcsHeroTitle")}</h1>
          <Link
            href="/register"
            className="inline-block mt-6 w-fit bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
          >
            {t("getFreeScoreBtn")}
          </Link>
          <p className="text-sm text-gray-600 mt-4">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/login" className="text-gray-900 font-semibold underline">
              {t("logInLink")}
            </Link>
          </p>
          <p className="text-xs text-gray-500 mt-4 max-w-md">{t("fcsHeroEligibility")}</p>
        </div>
        <div className="relative w-full h-full min-h-[220px] overflow-hidden bg-gradient-to-br from-[#0a3a52] to-[#1a6d8a] flex items-center justify-center">
          <p className="text-white text-2xl font-bold text-center px-6">Looking for a Loan?</p>
        </div>
      </section>
      <div className="bg-[#fdf6d8] py-3 px-4">
        <p className="text-center text-sm text-gray-700 max-w-4xl mx-auto">{t("fcsFreeBanner")}</p>
      </div>
    </>
  );
}

function WhatYouGet() {
  const { t } = useLanguage();
  const items: { icon: React.ReactNode; text: TranslationKey }[] = [
    { icon: <ReportChartIcon className="w-5 h-5 text-[#0a3a52]" />, text: "fcsGet1" },
    { icon: <ClockIcon className="w-5 h-5 text-[#0a3a52]" />, text: "fcsGet2" },
    { icon: <PersonContactIcon className="w-5 h-5 text-[#0a3a52]" />, text: "fcsGet3" },
    { icon: <DocumentIcon className="w-5 h-5 text-[#0a3a52]" />, text: "fcsGet4" },
    { icon: <BankIcon className="w-5 h-5 text-[#0a3a52]" />, text: "fcsGet5" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("fcsWhatYouGetHeading")}</h2>
        <Link
          href="/register"
          className="inline-block mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
        >
          {t("getStartedNowBtn")}
        </Link>
      </div>
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">{item.icon}</span>
            <p className="text-sm text-gray-700">{t(item.text)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function FcsContent() {
  const { t } = useLanguage();

  const faqKeys: TranslationKey[] = [
    "fcsFaq1",
    "fcsFaq2",
    "fcsFaq3",
    "fcsFaq4",
    "fcsFaq5",
    "fcsFaq6",
    "fcsFaq7",
    "fcsFaq8",
    "fcsFaq9",
    "fcsFaq10",
  ];
  const faqItems: FaqItem[] = faqKeys.map((k) => ({ question: t(k), answer: <p>{t("sectionContentComingSoon")}</p> }));

  return (
    <>
      <HeroSection />
      <WhatYouGet />

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">{t("fcsFaqHeading")}</h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <div className="bg-[#fdf6d8] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-lg font-semibold text-gray-800 max-w-xl">{t("fcsVideoBannerTitle")}</p>
          <button className="bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors shrink-0">
            {t("watchNowBtn")}
          </button>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">{t("fcsTermsHeading")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-gray-600">
          <p className="flex items-start gap-2">
            <span className="text-[#00b0f0] mt-1">•</span>
            {t("fcsTerm1")}
          </p>
          <p className="flex items-start gap-2 sm:border-l sm:border-gray-200 sm:pl-8">
            <span className="text-[#00b0f0] mt-1">•</span>
            {t("fcsTerm2")}
          </p>
          <p className="flex items-start gap-2 sm:border-l sm:border-gray-200 sm:pl-8">
            <span className="text-[#00b0f0] mt-1">•</span>
            {t("fcsTerm3")}
          </p>
        </div>
      </section>
    </>
  );
}
