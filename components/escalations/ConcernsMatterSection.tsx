"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ConcernsMatterSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("concernsMatterHeading")}</h2>
      <p className="text-gray-700 leading-relaxed">
        {t("concernsMatterPara1Prefix")} <span className="font-bold text-gray-900">{t("concernsMatterBrand")}</span>
        {t("concernsMatterPara1Suffix")}
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">{t("concernsMatterPara2")}</p>
    </section>
  );
}
