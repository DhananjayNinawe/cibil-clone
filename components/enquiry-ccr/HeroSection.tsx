"use client";

import { useLanguage } from "@/context/LanguageContext";

function LoanApplicationPlaceholder() {
  return (
    <div className="relative w-full h-full min-h-[240px] overflow-hidden bg-gradient-to-br from-[#f0e2c8] to-[#d8c298]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-24 rounded bg-white/40 rotate-6" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#f5ecdc]">
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("ccrHeroTitle")}</h1>
          <p className="text-gray-600 mt-4 max-w-md text-sm">{t("ccrHeroPara1")}</p>
          <p className="text-gray-600 mt-3 max-w-md text-sm">{t("ccrHeroPara2")}</p>
          <a
            href="#plans"
            className="inline-block mt-6 w-fit bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-3 transition-colors"
          >
            {t("ccrHeroBtn")}
          </a>
        </div>
        <LoanApplicationPlaceholder />
      </section>

      <div className="bg-[#f5c518] py-2.5 px-4">
        <p className="text-center text-xs sm:text-sm text-gray-900 max-w-4xl mx-auto">
          {t("disputeFreeServiceBanner")}
        </p>
      </div>
    </>
  );
}
