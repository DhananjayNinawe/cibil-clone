"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#e6f7fd] pt-12 pb-10 px-4 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 max-w-3xl mx-auto leading-tight">
        {t("homeHeroMonitor")}{" "}
        <span className="text-[#00b0f0]">{t("homeHeroBrand")}</span> {t("homeHeroSuffix")}
      </h1>
      <p className="mt-4 text-base sm:text-lg font-semibold text-gray-800">
        <Link href="/register" className="text-[#0072c6] hover:underline">
          {t("homeClickHere")}
        </Link>{" "}
        {t("homeFreeReport")}
      </p>
    </div>
  );
}
