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
  priceNote?: TranslationKey;
  recommended?: boolean;
}

const PLANS: PlanOption[] = [
  { key: "free", name: "planFreeAnnualName", desc: "planFreeAnnualDesc", price: "planFreeAnnualPrice", recommended: true },
  { key: "starter", name: "enquiryPlanStarterName", desc: "planStarterDesc", price: "planStarterPrice", priceNote: "planStarterPriceNote" },
  { key: "basic", name: "enquiryPlanBasicSubName", desc: "planBasicSubDesc", price: "planBasicPrice", priceNote: "planBasicSubPriceNote" },
];

export default function PlanOptionsSection() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("free");

  return (
    <section id="plans" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        {PLANS.map((plan) => (
          <label
            key={plan.key}
            className={`relative flex items-center justify-between border rounded-lg p-5 cursor-pointer transition-colors ${
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
                name="plan"
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
              {plan.priceNote && <p className="text-xs text-gray-500">{t(plan.priceNote)}</p>}
            </div>
          </label>
        ))}
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("dontGetCaughtHeading")}</h2>
        <p className="text-gray-600 mt-3">{t("dontGetCaughtDesc")}</p>
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
    </section>
  );
}
