"use client";

import { useLanguage } from "@/context/LanguageContext";

function OfficeMeetingPlaceholder() {
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden bg-gradient-to-br from-[#4a6a7a] to-[#1a2a33]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white/15" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{t("concernsHeroTitle")}</h1>
        <p className="text-gray-600 mt-4 max-w-md">{t("concernsHeroDesc")}</p>
      </div>
      <OfficeMeetingPlaceholder />
    </section>
  );
}
