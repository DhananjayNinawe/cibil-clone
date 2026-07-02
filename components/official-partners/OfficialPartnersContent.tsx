"use client";

import { useLanguage } from "@/context/LanguageContext";
import { OFFICIAL_PARTNERS } from "@/lib/footerPageData";

export default function OfficialPartnersContent() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("officialPartnersTitle")}</h1>

      <div className="flex flex-col items-start mb-8">
        <span className="text-3xl font-bold text-[#00b0f0] tracking-tight">CIBIL</span>
        <span className="text-[10px] text-gray-500 font-medium">Part of TransUnion</span>
        <p className="text-sm text-gray-700 mt-3">{t("officialPartnersIntro")}</p>
      </div>

      {/* Partner logo grid (brand-name placeholders — no logo assets) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 py-8">
        {OFFICIAL_PARTNERS.map((name) => (
          <div
            key={name}
            className="h-16 rounded border border-gray-100 bg-gray-50 flex items-center justify-center text-center px-2 text-xs font-semibold text-gray-500"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Warnings / disclosure */}
      <div className="mt-10 space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>{t("officialPartnersWarn1")}</p>
        <p className="font-bold text-gray-900">{t("officialPartnersWarn2")}</p>
        <p>{t("officialPartnersWarn3")}</p>
        <p>{t("officialPartnersWarn4")}</p>
        <p>
          {t("officialPartnersReportPrefix")}{" "}
          <a href="#" className="text-blue-700 hover:underline">
            {t("officialPartnersClickingHere")}
          </a>
          .
        </p>
        <p>{t("officialPartnersWarn5")}</p>
        <p className="italic underline">{t("officialPartnersKpmgNote")}</p>
      </div>
    </section>
  );
}
