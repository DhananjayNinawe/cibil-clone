"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="px-4 pt-12 pb-8 text-center">
      <h1 className="mx-auto max-w-3xl text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
        {t("homeHeroMonitor")} <span className="text-[#00b0f0]">{t("homeHeroBrand")}</span>{" "}
        {t("homeHeroSuffix")}
      </h1>
    </div>
  );
}
