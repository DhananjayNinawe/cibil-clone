"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { BellIcon, CheckCircleIcon } from "@/components/icons";

function PlanCard({
  nameKey,
  priceKey,
  periodKey,
  saveKey,
  popular,
}: {
  nameKey: TranslationKey;
  priceKey: TranslationKey;
  periodKey: TranslationKey;
  saveKey: TranslationKey;
  popular?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className={`relative rounded-lg border p-6 ${popular ? "bg-[#fdf6d8] border-[#f5c518]" : "bg-white border-gray-200"}`}>
      {popular && (
        <span className="absolute -top-2 -right-2 bg-[#0a3a52] text-white text-[10px] font-bold px-3 py-1 rounded rotate-12">
          {t("alrMostPopular")}
        </span>
      )}
      <p className="text-sm text-gray-500">{t(nameKey)}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{t(priceKey)}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm text-gray-600">{t(periodKey)}</span>
        <span className="text-xs font-medium text-gray-600 bg-yellow-100 rounded-full px-2 py-0.5">{t(saveKey)}</span>
      </div>
      <Link
        href="/choose-subscription"
        className={`block text-center mt-5 rounded-full py-2.5 text-sm font-bold transition-colors ${
          popular ? "bg-[#f5c518] hover:bg-[#e8b800] text-gray-900" : "border-2 border-[#f5c518] text-gray-800 hover:bg-[#f5c518]"
        }`}
      >
        {t("sidebarSubscribeNowBtn")}
      </Link>
    </div>
  );
}

export default function AlertsContent() {
  const { t } = useLanguage();

  const benefits: TranslationKey[] = ["scoreCardTitle", "featScoreHistory", "featWhereYouStand", "footerCreditEducation"];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{t("alrHeroTitle")}</h1>
            <p className="text-gray-600 mt-4 max-w-md">{t("alrHeroDesc")}</p>
            <Link
              href="/register"
              className="inline-block mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-8 py-3 transition-colors"
            >
              {t("getAlertsBtn")}
            </Link>
          </div>
          <div className="relative h-64 rounded-2xl bg-gradient-to-br from-[#dff3ea] to-[#a8d8c0] flex items-center justify-center">
            <BellIcon className="w-16 h-16 text-white/50" />
          </div>
        </div>
      </section>

      {/* Monitor banner */}
      <div className="bg-[#e6f7fd] py-4 px-4">
        <p className="text-center text-sm text-gray-800 max-w-5xl mx-auto">
          <span className="font-medium text-gray-500">{t("alrMonitorLabel")}</span>{" "}
          <span className="font-bold">{t("alrMonitorItems")}</span>
        </p>
      </div>

      {/* Instant alerts + pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 leading-snug">
            {t("alrInstantHeading")}
          </h2>
          <p className="text-gray-700 mt-4">{t("alrInstantDesc")}</p>
          <p className="text-gray-800 font-semibold mt-6">{t("alrOtherBenefits")}</p>
          <ul className="mt-3 space-y-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircleIcon className="w-4 h-4 text-[#00b0f0]" />
                {t(b)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <PlanCard nameKey="alrPlanStandard" priceKey="alrPlanStandardPrice" periodKey="alrPlanStandardPeriod" saveKey="planStandardSave" />
            <PlanCard nameKey="alrPlanPremium" priceKey="alrPlanPremiumPrice" periodKey="alrPlanPremiumPeriod" saveKey="planPremiumSave" popular />
          </div>
          <p className="text-xs text-gray-500 mt-4">{t("alrOnlyStandardPremium")}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border-y-2 border-[#00b0f0]/40 py-6 text-center">
          <p className="text-gray-700">
            <Link href="/" className="text-blue-700 hover:underline font-medium">
              {t("alrSafeguardClickHere")}
            </Link>{" "}
            {t("safeguardProfileBanner")}
          </p>
        </div>
      </div>
    </>
  );
}
