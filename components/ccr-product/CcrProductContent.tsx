"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { PlusMinusCircleIcon, CheckCircleIcon, DocumentIcon, PersonContactIcon, PlayIcon } from "@/components/icons";

function OfferBanner() {
  const { t } = useLanguage();
  return (
    <div className="bg-[#0a3a52] py-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white text-lg font-semibold">
          {t("ccrfOfferPrefix")} <span className="text-[#f5c518] font-bold">{t("ccrfOfferPercent")}</span> {t("ccrfOfferSuffix")}
        </p>
        <div className="flex items-center gap-3">
          <span className="bg-white text-gray-900 text-sm font-bold rounded px-3 py-1.5">{t("ccrfUseCode")}</span>
          <span className="border border-white text-white text-sm font-bold rounded px-3 py-1.5">{t("ccrfCode")}</span>
        </div>
        <div className="text-right">
          <p className="text-[#f5c518] text-sm font-bold">{t("ccrfLimitedOffer")}</p>
          <p className="text-white text-xs mt-1">30 : 05 : 13</p>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <p className="font-bold text-gray-900">{title}</p>
      <p className="text-sm text-gray-600 mt-2">{desc}</p>
    </div>
  );
}

function PlanColumn({
  name,
  priceKey,
  periodKey,
  refreshKey,
  saksham,
}: {
  name: string;
  priceKey: TranslationKey;
  periodKey: TranslationKey;
  refreshKey: TranslationKey;
  saksham?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className="border border-gray-200">
      <div className="bg-[#00b0f0] text-white text-center font-bold py-3">{name}</div>
      <div className="text-center font-bold text-gray-900 py-3 border-b border-gray-100">{t(priceKey)}</div>
      <div className="text-center text-sm text-gray-700 py-3 border-b border-gray-100">{t(periodKey)}</div>
      <div className="text-center text-xs text-gray-600 py-3 border-b border-gray-100 px-2">{t(refreshKey)}</div>
      <div className="text-center text-xs text-gray-600 py-3 border-b border-gray-100">{t("ccpAccessDashboard")}</div>
      <div className="text-center text-xs text-gray-600 py-3 border-b border-gray-100 h-9">{saksham ? t("featCibilSaksham") : ""}</div>
      <div className="p-4 text-center">
        <Link href="/choose-subscription" className="inline-block bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs font-bold rounded-full px-5 py-2 transition-colors">
          {t("sidebarSubscribeNowBtn")}
        </Link>
      </div>
    </div>
  );
}

export default function CcrProductContent() {
  const { t } = useLanguage();
  const [openQ2, setOpenQ2] = useState(true);

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{t("ccpHeroTitle")}</h1>
            <p className="text-gray-600 mt-3">{t("ccpHeroDesc")}</p>
            <Link
              href="/choose-subscription"
              className="inline-block mt-5 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
            >
              {t("sidebarSubscribeNowBtn")}
            </Link>
            <p className="text-sm text-gray-600 mt-3">
              {t("ccpAlready")}{" "}
              <Link href="/login" className="text-blue-700 hover:underline font-semibold">
                {t("loginNow")}
              </Link>
            </p>
          </div>
          <div className="relative h-48 rounded-xl bg-gradient-to-br from-[#c99a5a] to-[#5a3a1f] flex items-center justify-center">
            <PersonContactIcon className="w-14 h-14 text-white/40" />
          </div>
        </div>
      </section>

      <OfferBanner />

      {/* Q&A + video */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center gap-3 border-b border-gray-200 py-4">
            <PlusMinusCircleIcon expanded={false} className="w-5 h-5 text-[#00b0f0]" />
            <span className="font-bold text-sm text-gray-800">{t("ccpQ1")}</span>
          </div>
          <div className="border-b-2 border-[#f5c518] py-4">
            <button type="button" onClick={() => setOpenQ2((o) => !o)} className="flex items-center gap-3 w-full text-left">
              <PlusMinusCircleIcon expanded={openQ2} className="w-5 h-5 text-[#00b0f0]" />
              <span className="font-bold text-sm text-gray-800">{t("ccpQ2")}</span>
            </button>
            {openQ2 && (
              <ul className="mt-3 ml-8 list-disc pl-4 space-y-2 text-sm text-gray-600">
                <li>{t("ccpQ2Bullet1")}</li>
                <li>{t("ccpQ2Bullet2")}</li>
              </ul>
            )}
          </div>
        </div>
        <div className="relative h-64 rounded-lg bg-gradient-to-br from-[#5a8ab0] to-[#1c3a52] flex items-center justify-center">
          <button aria-label="Play video" className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <PlayIcon className="w-7 h-7 text-[#00b0f0] ml-0.5" />
          </button>
        </div>
      </section>

      {/* Check now + DD note */}
      <div className="bg-gray-100 py-8 px-4 text-center">
        <Link href="/register" className="inline-block bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors">
          {t("ccpCheckNow")}
        </Link>
        <p className="text-sm text-gray-600 mt-4 max-w-3xl mx-auto">{t("ccpDownloadNote")}</p>
      </div>

      {/* Benefits */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900">{t("ccpBenefitsHeading")}</h2>
          <p className="text-sm text-gray-500 mt-2">{t("ccpBenefitsSub")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-left">
            <BenefitCard icon={<CheckCircleIcon className="w-10 h-10 text-[#00b0f0]" />} title={t("ccpBenefit1Title")} desc={t("ccpBenefit1Desc")} />
            <BenefitCard icon={<DocumentIcon className="w-10 h-10 text-[#00b0f0]" />} title={t("ccpBenefit2Title")} desc={t("ccpBenefit2Desc")} />
            <BenefitCard icon={<CheckCircleIcon className="w-10 h-10 text-[#00b0f0]" />} title={t("ccpBenefit3Title")} desc={t("ccpBenefit3Desc")} />
          </div>
          <p className="text-xs text-gray-500 italic mt-6">{t("ccpBenefitsDisclaimer")}</p>
          <Link href="/register" className="inline-block mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors">
            {t("ccpGetCcrNow")}
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-center text-xl font-bold text-gray-900">{t("ccpMonitorHeading")}</h2>
        <p className="text-center text-sm text-gray-500 mt-2">{t("ccpMonitorDesc")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          <PlanColumn name="BASIC" priceKey="ccpBasicPrice" periodKey="ccpBasicPeriod" refreshKey="ccpBasicRefresh" />
          <PlanColumn name="STANDARD" priceKey="ccpStandardPrice" periodKey="ccpStandardPeriod" refreshKey="ccpStandardRefresh" saksham />
          <PlanColumn name="PREMIUM" priceKey="ccpPremiumPrice" periodKey="ccpPremiumPeriod" refreshKey="ccpPremiumRefresh" saksham />
        </div>

        <div className="text-center mt-12">
          <p className="font-bold text-gray-800 border-b-2 border-[#f5c518] inline-block pb-1">{t("ccpThingsHeading")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-sm">
            <a href="#" className="text-blue-700 hover:underline">
              {t("ccpThing1")}
            </a>
            <a href="#" className="text-blue-700 hover:underline">
              {t("ccpThing2")}
            </a>
            <a href="#" className="text-blue-700 hover:underline">
              {t("ccpThing3")}
            </a>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-center font-bold text-gray-800 border-b-2 border-[#f5c518] inline-block pb-1 mx-auto block w-fit">
            {t("ccpFaqHeading")}
          </p>
          <div className="flex items-center justify-center gap-10 mt-6">
            <span className="text-sm font-bold text-gray-900 border-b-2 border-gray-900 pb-1">{t("ccpFaqTab1")}</span>
            <span className="text-sm text-gray-400">{t("ccpFaqTab2")}</span>
          </div>
          <div className="max-w-3xl mx-auto mt-6">
            <div className="flex items-center gap-3 border-b border-gray-200 py-4">
              <PlusMinusCircleIcon expanded={false} className="w-5 h-5 text-[#00b0f0]" />
              <span className="font-bold text-sm text-gray-800">{t("ccpFaq1")}</span>
            </div>
            <div className="flex items-center gap-3 border-b border-gray-200 py-4">
              <PlusMinusCircleIcon expanded={false} className="w-5 h-5 text-[#00b0f0]" />
              <span className="font-bold text-sm text-gray-800">{t("ccpFaq2")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
