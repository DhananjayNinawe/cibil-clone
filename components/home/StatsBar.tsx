"use client";

import { useLanguage } from "@/context/LanguageContext";
import { QuoteIcon } from "@/components/icons";

const STAT_ACCENT = "#0f5f8a";
const STAT_LABEL = "#4b5f6e";

function StatCard({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <div className="bg-white rounded-xl p-7 h-full">
      <p className="font-light leading-none tracking-tight" style={{ color: STAT_ACCENT }}>
        <span className="text-6xl">{value}</span>
        {unit && <span className="text-2xl align-baseline">{unit}</span>}
      </p>
      <p className="text-sm leading-snug mt-5" style={{ color: STAT_LABEL }}>
        {label}
      </p>
    </div>
  );
}

export default function StatsBar() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#cdeffb] py-14 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard value={t("statYearsValue")} unit={t("statYearsUnit")} label={t("statYearsLabel")} />
        <StatCard value={t("statUsersValue")} unit={t("statUsersUnit")} label={t("statUsersLabel")} />

        <div className="bg-white rounded-xl p-7 h-full">
          <QuoteIcon className="w-9 h-9 float-left mr-3 mt-1 text-[#0f5f8a]" />
          <p className="text-[15px] leading-snug" style={{ color: STAT_LABEL }}>
            {t("statQuote")}
          </p>
          <p className="clear-both text-sm font-bold mt-6" style={{ color: STAT_ACCENT }}>
            {t("statQuoteAuthor")}
          </p>
        </div>

        <StatCard value={t("statImprovedValue")} label={t("statImprovedLabel")} />
      </div>
    </section>
  );
}
