"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { CheckCircleIcon, CrossCircleIcon } from "@/components/icons";
import FaqAccordion, { FaqItem } from "@/components/faq/FaqAccordion";

const FEATURE_ROWS: { boldKey: TranslationKey; descKey: TranslationKey; basic: boolean }[] = [
  { boldKey: "csrFeatUnlimitedBold", descKey: "csrFeatUnlimited", basic: true },
  { boldKey: "csrFeatSimulatorBold", descKey: "csrFeatSimulator", basic: true },
  { boldKey: "csrFeatAlertsBold", descKey: "csrFeatAlerts", basic: false },
  { boldKey: "csrFeatTrendedBold", descKey: "csrFeatTrended", basic: true },
  { boldKey: "csrFeatWhereBold", descKey: "csrFeatWhere", basic: true },
];

export default function ScoreSimProductContent() {
  const { t } = useLanguage();

  const faqItems: FaqItem[] = [
    { question: t("ssQ1"), answer: <p>{t("ssA1")}</p> },
    { question: t("ssQ2"), answer: <p>{t("ssA2Intro")}</p> },
    { question: t("ssQ3"), answer: <p>{t("ssA3Para1Prefix")}.</p> },
    { question: t("ssQ4"), answer: <p>{t("ssA4")}</p> },
    { question: t("ssQ5"), answer: <p>{t("ssA5")}</p> },
  ];

  return (
    <>
      {/* Teal hero banner */}
      <section className="bg-[#00b0f0] py-12 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{t("sspHeroTitle")}</h1>
        <p className="text-white/90 mt-2">{t("ssHeroDesc")}</p>
        <Link
          href="/register"
          className="inline-block mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-8 py-3 transition-colors"
        >
          {t("simulateNowBtn")}
        </Link>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("sspHowHeading")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("sspHowPara1")}</p>
          <p className="text-gray-700 leading-relaxed mt-4">{t("sspHowPara2")}</p>
        </div>
        <div className="h-64 rounded-lg bg-[#e6f7fd] flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800">736</p>
            <p className="text-xs text-gray-500 mt-1">YOUR SIMULATED CIBIL SCORE</p>
          </div>
        </div>
      </section>

      {/* Subscription features table */}
      <section className="bg-[#e6f7fd] py-16 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="grid grid-cols-4 border-b border-gray-200">
            <div className="p-5">
              <p className="font-bold text-gray-900">{t("sspTableHeading")}</p>
              <p className="text-xs text-gray-500 mt-1">{t("sspTableDesc")}</p>
            </div>
            {[
              { name: "sspPlanBasic", price: "planBasicPrice", period: "planBasicPeriod" },
              { name: "sspPlanStandard", price: "planStandardPrice", period: "planStandardPeriod" },
              { name: "sspPlanPremium", price: "planPremiumPrice", period: "planPremiumPeriod" },
            ].map((p, i) => (
              <div key={p.name} className={`p-5 text-center ${i === 2 ? "bg-[#fdf6d8]" : ""}`}>
                <p className="text-sm text-gray-500">{t(p.name as TranslationKey)}</p>
                <p className="font-bold text-gray-900">{t(p.price as TranslationKey)}</p>
                <p className="text-xs text-gray-500">{t(p.period as TranslationKey)}</p>
                <Link
                  href="/choose-subscription"
                  className={`block text-center mt-3 rounded py-1.5 text-xs font-bold transition-colors ${
                    i === 2 ? "bg-[#f5c518] text-gray-900" : "border border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {t("getStartedBtn")}
                </Link>
              </div>
            ))}
          </div>

          {FEATURE_ROWS.map((row) => (
            <div key={row.boldKey} className="grid grid-cols-4 border-b border-gray-100 items-center">
              <div className="p-4">
                <p className="font-bold text-sm text-gray-800">{t(row.boldKey)}</p>
                <p className="text-xs text-gray-500">{t(row.descKey)}</p>
              </div>
              <div className="p-4 flex justify-center">
                {row.basic ? <CheckCircleIcon className="w-5 h-5 text-[#00b0f0]" /> : <CrossCircleIcon className="w-5 h-5 text-red-500" />}
              </div>
              <div className="p-4 flex justify-center">
                <CheckCircleIcon className="w-5 h-5 text-[#00b0f0]" />
              </div>
              <div className="p-4 flex justify-center">
                <CheckCircleIcon className="w-5 h-5 text-[#00b0f0]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-bold">{t("ssDisclaimerLabel")}</span> {t("sspDisclaimerShort")}
        </p>
      </div>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">{t("fcsFaqHeading")}</h2>
        <FaqAccordion items={faqItems} />
      </section>
    </>
  );
}
