"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function EligibleBanner() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#e6f7fd] py-3 px-4">
      <p className="text-center text-sm font-semibold text-[#0072c6] max-w-4xl mx-auto">
        {t("eligibleFreeReportBanner")}
      </p>
    </div>
  );
}
