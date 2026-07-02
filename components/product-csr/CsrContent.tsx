"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { ReportChartIcon, BellIcon, PersonContactIcon } from "@/components/icons";

function DashFeature({ boldKey, restKey }: { boldKey: TranslationKey; restKey: TranslationKey }) {
  const { t } = useLanguage();
  return (
    <div className="bg-white p-5 flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-[#e6f7fd] flex items-center justify-center shrink-0">
        <ReportChartIcon className="w-5 h-5 text-[#00b0f0]" />
      </div>
      <p className="text-sm text-gray-700">
        <span className="font-bold">{t(boldKey)}</span> {t(restKey)}
      </p>
    </div>
  );
}

export default function CsrContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{t("csrHeroTitle")}</h1>
            <Link
              href="/choose-subscription"
              className="inline-block mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
            >
              {t("sidebarSubscribeNowBtn")}
            </Link>
          </div>
          <div className="relative h-56 rounded-xl bg-gradient-to-br from-[#dfeef4] to-[#a8cdd8] flex items-center justify-center">
            <BellIcon className="w-16 h-16 text-white/40" />
          </div>
        </div>
      </section>

      <div className="bg-[#f5c518] py-3 px-4">
        <p className="text-center text-sm text-gray-900 max-w-4xl mx-auto">{t("csrDidYouKnow")}</p>
      </div>

      {/* What is */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("csrWhatHeading")}</h2>
        <p className="text-gray-700 leading-relaxed">{t("csrWhatPara1")}</p>
        <p className="text-gray-700 leading-relaxed mt-4">{t("csrWhatPara2")}</p>
        <p className="text-gray-700 leading-relaxed mt-4">{t("csrWhatPara3")}</p>
      </section>

      {/* Dashboard features */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">
          <div className="text-center lg:text-left">
            <h2 className="text-xl font-bold text-gray-900">{t("csrDashboardHeading")}</h2>
            <p className="text-sm text-gray-600 mt-3">{t("csrDashboardDesc")}</p>
            <Link
              href="/choose-subscription"
              className="inline-block mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
            >
              {t("sidebarSubscribeNowBtn")}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DashFeature boldKey="csrFeatUnlimitedBold" restKey="csrFeatUnlimited" />
            <DashFeature boldKey="csrFeatTrendedBold" restKey="csrFeatTrended" />
            <DashFeature boldKey="csrFeatAlertsBold" restKey="csrFeatAlerts" />
            <DashFeature boldKey="csrFeatWhereBold" restKey="csrFeatWhere" />
            <DashFeature boldKey="csrFeatSimulatorBold" restKey="csrFeatSimulator" />
          </div>
        </div>
      </section>

      {/* Why subscribe */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("csrWhyHeading")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("csrWhyDesc")}</p>
          <p className="text-gray-800 font-semibold mt-4">{t("csrWhyGetStarted")}</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
            <li>{t("csrWhyBullet1")}</li>
            <li>{t("csrWhyBullet2")}</li>
            <li>{t("csrWhyBullet3")}</li>
          </ul>
        </div>
        <div className="h-56 rounded-lg bg-gradient-to-br from-[#0a3a52] to-[#1a6d8a] flex items-center justify-center">
          <PersonContactIcon className="w-16 h-16 text-white/40" />
        </div>
      </section>

      {/* Track banner */}
      <section className="bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t("csrTrackHeading")}</h2>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl">{t("csrTrackDesc")}</p>
          </div>
          <Link
            href="/choose-subscription"
            className="bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors shrink-0"
          >
            {t("sidebarSubscribeNowBtn")}
          </Link>
        </div>
      </section>

      <div className="border-y border-gray-200 py-3 px-4">
        <p className="text-center text-sm text-gray-600 max-w-4xl mx-auto">
          <a href="/freecibilscore" className="text-blue-700 hover:underline font-medium">
            {t("fcsFreeBanner")}
          </a>
        </p>
      </div>

      {/* From the blog */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-bold tracking-widest text-gray-800">{t("csrFromBlog")}</p>
        <p className="text-sm text-gray-600 mt-2 max-w-md">{t("featuredArticlesDesc")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10 max-w-3xl mx-auto text-center">
          {[t("csrBlog1"), t("csrBlog2")].map((b) => (
            <div key={b}>
              <p className="font-bold text-gray-900 leading-snug">{b}</p>
              <a href="#" className="text-sm text-[#00b0f0] hover:underline font-medium mt-2 inline-flex items-center gap-1">
                {t("readMoreLink")} <span aria-hidden>›</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
