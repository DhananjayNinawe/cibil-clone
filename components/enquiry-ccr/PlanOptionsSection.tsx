"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

interface PlanOption {
  key: string;
  name: TranslationKey;
  desc: TranslationKey;
  price: TranslationKey;
  period: TranslationKey;
  recommended?: boolean;
}

const PLANS: PlanOption[] = [
  { key: "basic", name: "ccrPlanBasicName", desc: "ccrPlanBasicDesc", price: "ccrPlanBasicPrice", period: "ccrPlanBasicPeriod", recommended: true },
  { key: "standard", name: "ccrPlanStandardName", desc: "ccrPlanStandardDesc", price: "ccrPlanStandardPrice", period: "ccrPlanStandardPeriod" },
  { key: "premium", name: "ccrPlanPremiumName", desc: "ccrPlanPremiumDesc", price: "ccrPlanPremiumPrice", period: "ccrPlanPremiumPeriod" },
];

export default function PlanOptionsSection() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("basic");

  return (
    <>
      <section id="plans" className="bg-[#f4f8fb] py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {PLANS.map((plan) => (
              <label
                key={plan.key}
                className={`relative flex items-center justify-between bg-white border rounded-lg p-5 cursor-pointer transition-colors ${
                  selected === plan.key ? "border-[#00b0f0] ring-1 ring-[#00b0f0]" : "border-gray-200"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 right-4 bg-[#00b0f0] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {t("recommendedBadge")}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="ccr-plan"
                    checked={selected === plan.key}
                    onChange={() => setSelected(plan.key)}
                    className="w-4 h-4 accent-[#00b0f0]"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{t(plan.name)}</p>
                    <p className="text-xs text-gray-500">{t(plan.desc)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{t(plan.price)}</p>
                  <p className="text-xs text-gray-500">{t(plan.period)}</p>
                </div>
              </label>
            ))}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("ccrHowCheckHeading")}</h2>
            <p className="text-gray-600 mt-3">{t("ccrHowCheckDesc")}</p>
            <Link
              href="/register"
              className="inline-block mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
            >
              {t("getStartedBtn")}
            </Link>
            <p className="text-sm text-gray-600 mt-4">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-blue-700 hover:underline font-semibold">
                {t("logInLink")}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#eaf4fa] py-3 px-4">
        <p className="text-center text-sm font-semibold text-[#0072c6] max-w-4xl mx-auto">
          {t("ccrRankExposureBanner")}
        </p>
      </div>
    </>
  );
}
