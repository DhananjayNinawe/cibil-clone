"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import {
  BellIcon,
  CheckIcon,
  GaugeIcon,
  PeopleIcon,
  ReportChartIcon,
  TrendIcon,
  XMarkIcon,
} from "@/components/icons";
import FaqAccordion, { FaqItem } from "@/components/faq/FaqAccordion";

const SIMULATOR_VIDEO = "https://www.cibil.com/content/dam/cibil/consumer/scr-sim%20video.mp4";

/** Shared by every table row so cells line up across the separate row grids. */
const TABLE_GRID = "grid grid-cols-[1.7fr_repeat(3,1fr)] min-w-[720px]";

type FeatureRow = {
  icon: (props: { className?: string }) => React.ReactElement;
  boldKey: TranslationKey;
  descKey: TranslationKey;
  basic: boolean;
};

const FEATURE_ROWS: FeatureRow[] = [
  { icon: ReportChartIcon, boldKey: "csrFeatUnlimitedBold", descKey: "csrFeatUnlimited", basic: true },
  { icon: GaugeIcon, boldKey: "csrFeatSimulatorBold", descKey: "csrFeatSimulator", basic: true },
  { icon: BellIcon, boldKey: "csrFeatAlertsBold", descKey: "csrFeatAlerts", basic: false },
  { icon: TrendIcon, boldKey: "csrFeatTrendedBold", descKey: "csrFeatTrended", basic: true },
  { icon: PeopleIcon, boldKey: "csrFeatWhereBold", descKey: "csrFeatWhere", basic: true },
];

const PLANS: { nameKey: TranslationKey; priceKey: TranslationKey; periodKey: TranslationKey }[] = [
  { nameKey: "sspPlanBasic", priceKey: "planBasicPrice", periodKey: "planBasicPeriod" },
  { nameKey: "sspPlanStandard", priceKey: "planStandardPrice", periodKey: "planStandardPeriod" },
  { nameKey: "sspPlanPremium", priceKey: "planPremiumPrice", periodKey: "planPremiumPeriod" },
];

function Mark({ on }: { on: boolean }) {
  return on ? <CheckIcon className="w-6 h-6 text-[#00b0f0]" /> : <XMarkIcon className="w-5 h-5 text-[#e8503a]" />;
}

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
      <section className="bg-[#00b0f0] py-14 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{t("sspHeroTitle")}</h1>
        <p className="text-white mt-3">{t("ssHeroDesc")}</p>
        <Link
          href="/register"
          className="inline-block mt-7 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs font-bold tracking-wide rounded-full px-8 py-3 transition-colors"
        >
          {t("simulateNowBtn")}
        </Link>
      </section>

      {/* How it works + product video */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t("sspHowHeading")}</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{t("sspHowPara1")}</p>
          <p className="text-gray-700 text-sm leading-relaxed mt-4">{t("sspHowPara2")}</p>
        </div>
        <video controls preload="metadata" playsInline className="w-full aspect-video rounded-md bg-black shadow-sm">
          <source src={SIMULATOR_VIDEO} type="video/mp4" />
        </video>
      </section>

      {/* Subscription features table */}
      <section className="bg-[#e6f7fd] py-14 px-4">
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <div className="bg-white min-w-[720px]">
            <div className={`${TABLE_GRID} border-b border-gray-200`}>
              <div className="p-6 border-r border-gray-200">
                <p className="font-bold text-gray-900">{t("sspTableHeading")}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{t("sspTableDesc")}</p>
              </div>
              {PLANS.map((plan, i) => {
                const premium = i === PLANS.length - 1;
                return (
                  <div
                    key={plan.nameKey}
                    className={`p-5 text-center ${
                      premium ? "border-x border-t border-[#00b0f0]/50" : "border-r border-gray-200"
                    }`}
                  >
                    <p className="text-sm text-gray-500">{t(plan.nameKey)}</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{t(plan.priceKey)}</p>
                    <p className="text-xs text-gray-500 mt-2">{t(plan.periodKey)}</p>
                    <Link
                      href="/choose-subscription"
                      className={`block mt-4 rounded-full py-2 text-[11px] font-bold tracking-wide transition-colors ${
                        premium
                          ? "bg-[#f5c518] hover:bg-[#e8b800] text-gray-900"
                          : "border border-[#f5c518] text-gray-800 hover:bg-[#fdf6d8]"
                      }`}
                    >
                      {t("getStartedBtn")}
                    </Link>
                  </div>
                );
              })}
            </div>

            {FEATURE_ROWS.map((row, rowIndex) => {
              const last = rowIndex === FEATURE_ROWS.length - 1;
              const Icon = row.icon;
              return (
                <div key={row.boldKey} className={`${TABLE_GRID} ${last ? "" : "border-b border-gray-200"}`}>
                  <div className="flex items-start gap-3 p-5 border-r border-gray-200">
                    <Icon className="w-6 h-6 text-[#00b0f0] shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">
                      <span className="block font-bold text-gray-900">{t(row.boldKey)}</span>
                      <span className="text-gray-500">{t(row.descKey)}</span>
                    </p>
                  </div>
                  <div className="p-5 flex justify-center items-center border-r border-gray-200">
                    <Mark on={row.basic} />
                  </div>
                  <div className="p-5 flex justify-center items-center border-r border-gray-200">
                    <Mark on />
                  </div>
                  <div
                    className={`p-5 flex justify-center items-center border-x border-[#00b0f0]/50 ${last ? "border-b" : ""}`}
                  >
                    <Mark on />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-gray-600 leading-relaxed">
          <span className="font-bold text-gray-900">{t("ssDisclaimerLabel")}</span> {t("sspDisclaimerShort")}
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
