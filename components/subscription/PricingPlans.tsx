"use client";

import { useLanguage } from "@/context/LanguageContext";
import PricingCard, { PricingFeature } from "@/components/subscription/PricingCard";

export default function PricingPlans() {
  const { t } = useLanguage();

  const allFeatures = [
    t("featCibilScore"),
    t("featCibilCreditReport"),
    t("featScoreSimulator"),
    t("featScoreHistory"),
    t("featWhereYouStand"),
    t("featCibilAlerts"),
    t("featCibilSaksham"),
  ];

  const featuresFor = (includedCount: number): PricingFeature[] =>
    allFeatures.map((label, i) => ({ label, included: i < includedCount }));

  const plans = [
    {
      name: t("planStarterName"),
      price: t("planStarterPrice"),
      period: t("planStarterPeriod"),
      features: featuresFor(2),
    },
    {
      name: t("planBasicName"),
      price: t("planBasicPrice"),
      period: t("planBasicPeriod"),
      features: featuresFor(5),
    },
    {
      name: t("planStandardName"),
      price: t("planStandardPrice"),
      period: t("planStandardPeriod"),
      saveBadge: t("planStandardSave"),
      features: featuresFor(7),
      highlighted: true,
    },
    {
      name: t("planPremiumName"),
      price: t("planPremiumPrice"),
      period: t("planPremiumPeriod"),
      saveBadge: t("planPremiumSave"),
      features: featuresFor(7),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto px-4">
      {plans.map((plan) => (
        <PricingCard
          key={plan.name}
          name={plan.name}
          price={plan.price}
          period={plan.period}
          saveBadge={plan.saveBadge}
          features={plan.features}
          featuresIncludeLabel={t("featuresInclude")}
          subscribeLabel={t("subscribeNow")}
          highlighted={plan.highlighted}
        />
      ))}
    </div>
  );
}
