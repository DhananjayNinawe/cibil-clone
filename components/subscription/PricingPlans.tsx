"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import PricingCard, { PricingFeature } from "@/components/subscription/PricingCard";

/** Feature rows, in display order. A plan lists the rows it carries; Basic marks Alerts as excluded. */
function useFeatureRows() {
  const { t } = useLanguage();

  const rows = [
    t("featCibilAlerts"),
    t("featCibilScoreReport"),
    t("featScoreSimulator"),
    t("featScoreHistory"),
    t("featWhereYouStand"),
    t("featCibilSaksham"),
  ];

  /** `count` rows from the top; `excludeFirst` shows the Alerts row with a cross instead of a check. */
  return (count: number, excludeFirst = false): PricingFeature[] =>
    rows.slice(0, count).map((label, i) => ({ label, included: !(excludeFirst && i === 0) }));
}

function StarterStrip() {
  const { t } = useLanguage();

  return (
    <div className="mt-8 rounded-xl bg-[#f4f5f7] px-6 py-6 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{t("starterStripHeading")}</h2>
          <p className="mt-4 text-sm text-gray-500">{t("starterStripPlanLabel")}</p>
          <p className="mt-1 text-gray-600">
            <span className="text-lg font-bold text-gray-900">{t("planStarterPrice")}</span>{" "}
            <span className="text-sm">{t("planStarterPeriod")}</span>
          </p>
        </div>

        <div className="sm:text-right">
          <Link
            href="/register"
            className="inline-block rounded-full border border-[#f5c518] bg-white px-8 py-2.5 text-xs font-bold tracking-wide text-gray-800 transition-colors hover:bg-[#f5c518]"
          >
            {t("subscribeNow")}
          </Link>
          <p className="mt-6 text-sm italic text-gray-600">{t("starterStripNote")}</p>
        </div>
      </div>
    </div>
  );
}

function PlanNote() {
  const { t } = useLanguage();

  return (
    <div className="mt-8 rounded-xl bg-[#f2f4fb] px-6 py-5 sm:px-8">
      <p className="text-sm font-semibold text-[#00b0f0]">{t("planNoteLabel")}</p>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-gray-700">
        <li>
          {t("planNoteAnnualReport")}{" "}
          <Link href="/freecibilscore" className="text-[#0072c6] underline hover:no-underline">
            {t("planNoteClickHere")}
          </Link>
        </li>
        <li>{t("planNoteRewards")}</li>
      </ul>
    </div>
  );
}

export default function PricingPlans() {
  const { t } = useLanguage();
  const featuresFor = useFeatureRows();

  const plans = [
    {
      name: t("planBasicName"),
      price: t("planBasicPrice"),
      duration: t("planBasicDuration"),
      features: featuresFor(5, true),
    },
    {
      name: t("planStandardName"),
      price: t("planStandardPrice"),
      wasPrice: t("planStandardWasPrice"),
      duration: t("planStandardDuration"),
      saveBadge: t("planStandardSave"),
      features: featuresFor(6),
    },
    {
      name: t("planPremiumName"),
      price: t("planPremiumPrice"),
      wasPrice: t("planPremiumWasPrice"),
      duration: t("planPremiumDuration"),
      saveBadge: t("planPremiumSave"),
      features: featuresFor(6),
      highlighted: true,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            wasPrice={plan.wasPrice}
            duration={plan.duration}
            saveBadge={plan.saveBadge}
            features={plan.features}
            subscribeLabel={t("subscribeNow")}
            highlighted={plan.highlighted}
          />
        ))}
      </div>

      <StarterStrip />
      <PlanNote />
    </div>
  );
}
