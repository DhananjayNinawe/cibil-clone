"use client";

import { useLanguage } from "@/context/LanguageContext";
import { QuoteIcon } from "@/components/icons";

function StatCard({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <div className="bg-white rounded-lg p-6 h-full">
      <p className="text-3xl font-bold text-gray-900">
        {value}
        {unit && <span className="text-lg font-semibold text-gray-500 ml-1">{unit}</span>}
      </p>
      <p className="text-sm text-gray-500 mt-2">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#cdeffb] py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard value={t("statYearsValue")} unit={t("statYearsUnit")} label={t("statYearsLabel")} />
        <StatCard value={t("statUsersValue")} label={t("statUsersLabel")} />

        <div className="bg-white rounded-lg p-6 h-full">
          <QuoteIcon className="w-7 h-7 text-[#00b0f0]" />
          <p className="text-sm text-gray-700 mt-2">{t("statQuote")}</p>
          <p className="text-sm font-semibold text-gray-900 mt-3">{t("statQuoteAuthor")}</p>
        </div>

        <StatCard value={t("statImprovedValue")} label={t("statImprovedLabel")} />
      </div>
    </section>
  );
}
