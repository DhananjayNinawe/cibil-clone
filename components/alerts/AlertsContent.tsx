"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { CheckCircleIcon } from "@/components/icons";

/** Bleeds off the right edge of the hero. Ships with its own backdrop, phone and pills baked in. */
const HERO_BANNER = "https://www.cibil.com/content/dam/cibil/consumer/alerts/alert-banner-web.png";

/** The alerts page centres its copy in a column narrower than the site header. */
const COLUMN = "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8";

const BENEFITS: TranslationKey[] = [
  "productIndividualsTitle",
  "featScoreHistory",
  "featWhereYouStand",
  "footerCreditEducation",
];

/** Underlines the locale's key word in brand yellow; falls back to plain text if it isn't found. */
function InstantHeading() {
  const { t } = useLanguage();
  const heading = t("alrInstantHeading");
  const word = t("alrInstantHeadingHighlight");
  const at = heading.indexOf(word);

  return (
    <h2 className="text-2xl font-bold leading-snug text-gray-900 sm:text-[28px]">
      {at < 0 ? (
        heading
      ) : (
        <>
          {heading.slice(0, at)}
          <span className="relative inline-block">
            {word}
            <span aria-hidden className="absolute inset-x-0 -bottom-1 h-1.25 bg-[#f5c518]" />
          </span>
          {heading.slice(at + word.length)}
        </>
      )}
    </h2>
  );
}

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
    <div
      className={`relative rounded-xl border px-5 py-7 ${
        popular ? "border-[#f5c518] bg-[#fdf6d8]" : "border-gray-200 bg-white"
      }`}
    >
      {/* Overhangs the corner, but never past the column's padding — else it scrolls the page sideways on phones. */}
      {popular && (
        <span className="absolute -right-4 top-2 z-10 w-28 rotate-45 bg-[#0a3a52] py-1 text-center text-[9px] font-bold text-white shadow-sm sm:-right-7">
          {t("alrMostPopular")}
        </span>
      )}

      <p className="text-sm text-gray-500">{t(nameKey)}</p>
      <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">{t(priceKey)}</p>

      <div className="mt-2 flex items-center gap-2 whitespace-nowrap">
        <span className="text-[13px] text-gray-600">{t(periodKey)}</span>
        <span className="rounded-full bg-[#f5c518]/35 px-2 py-0.5 text-[11px] font-medium text-gray-700">
          {t(saveKey)}
        </span>
      </div>

      <Link
        href="/choose-subscription"
        className={`mt-6 block rounded-full py-2.5 text-center text-xs font-bold tracking-wide transition-colors ${
          popular
            ? "bg-[#f5c518] text-gray-900 hover:bg-[#e8b800]"
            : "border-2 border-[#f5c518] bg-white text-gray-800 hover:bg-[#f5c518]"
        }`}
      >
        {t("sidebarSubscribeNowBtn")}
      </Link>
    </div>
  );
}

export default function AlertsContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero — copy in the column, banner bleeding off the right edge on desktop. */}
      <section className="relative overflow-hidden bg-white">
        <div className={`${COLUMN} py-12 lg:py-20`}>
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-[40px] sm:leading-[1.15]">
              {t("alrHeroTitle")}
            </h1>
            <p className="mt-5 max-w-md text-gray-600">{t("alrHeroDesc")}</p>
            <Link
              href="/register"
              className="mt-8 inline-block rounded-full bg-[#f5c518] px-9 py-3.5 text-xs font-bold tracking-wide text-gray-900 transition-colors hover:bg-[#e8b800]"
            >
              {t("getAlertsBtn")}
            </Link>
          </div>
        </div>

        <div className="px-4 pb-10 sm:px-6 lg:absolute lg:right-0 lg:top-0 lg:px-0 lg:pb-0">
          <Image
            src={HERO_BANNER}
            alt=""
            aria-hidden
            width={576}
            height={350}
            unoptimized
            preload
            className="mx-auto h-auto w-full max-w-sm select-none lg:mx-0 lg:w-96 lg:max-w-none xl:w-md 2xl:w-120"
          />
        </div>
      </section>

      {/* What CIBIL Alerts watches for you. */}
      <div className={COLUMN}>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-1 rounded-lg bg-[#e6f7fd] px-6 py-4 sm:px-10">
          <span className="text-sm text-gray-500">{t("alrMonitorLabel")}</span>
          <span className="text-sm font-bold text-gray-800">{t("alrMonitorItems")}</span>
        </div>
      </div>

      {/* Benefits + pricing. */}
      <section className={`${COLUMN} grid grid-cols-1 items-start gap-10 py-16 lg:grid-cols-2 lg:gap-14`}>
        <div>
          <InstantHeading />
          <p className="mt-5 text-gray-800">{t("alrInstantDesc")}</p>
          <p className="mt-7 text-sm text-gray-700">{t("alrOtherBenefits")}</p>
          <ul className="mt-4 space-y-2.5">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckCircleIcon className="h-4.5 w-4.5 shrink-0 text-[#00b0f0]" />
                {t(benefit)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <PlanCard
              nameKey="alrPlanStandard"
              priceKey="alrPlanStandardPrice"
              periodKey="alrPlanStandardPeriod"
              saveKey="planStandardSave"
            />
            <PlanCard
              nameKey="alrPlanPremium"
              priceKey="alrPlanPremiumPrice"
              periodKey="alrPlanPremiumPeriod"
              saveKey="planPremiumSave"
              popular
            />
          </div>
          <p className="mt-4 text-xs text-gray-500">{t("alrOnlyStandardPremium")}</p>
        </div>
      </section>

      <div className={`${COLUMN} pb-20`}>
        <p className="border-y border-[#7fd3ee] py-6 text-center text-gray-700">
          <Link
            href="/cibil-score-report"
            className="font-medium text-gray-900 underline underline-offset-4 hover:text-[#00b0f0]"
          >
            {t("alrSafeguardClickHere")}
          </Link>{" "}
          {t("safeguardProfileBanner")}
        </p>
      </div>
    </>
  );
}
