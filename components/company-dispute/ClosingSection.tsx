"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ClosingSection() {
  const { t } = useLanguage();

  return (
    <section id="raise-dispute" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-5">
      <p className="text-gray-700 leading-relaxed">
        {t("easiestWayText")} <span className="font-bold text-gray-900">{t("pleaseClickBoldText")}</span>
      </p>

      <a
        href="#"
        className="inline-block bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
      >
        {t("raiseDisputeBtn")}
      </a>

      <p className="font-bold text-gray-900 leading-relaxed">{t("commercialEntitiesNote")}</p>

      <p className="text-gray-700">{t("alternativelyWriteText")}</p>
      <p className="font-bold text-gray-900">{t("companyDisputeAddress")}</p>
    </section>
  );
}
