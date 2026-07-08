"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/enq26/banner.jpg";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("enquiryHeroTitle")}</h1>
        <p className="text-gray-600 mt-4 max-w-md">
          {t("enquiryHeroDescPrefix")} <span className="font-bold text-gray-800">{t("creditEnquiryBold")}</span>
          {t("enquiryHeroDescSuffix")}
        </p>
        <p className="text-gray-600 mt-2 max-w-md">{t("enquiryHeroPara2")}</p>
        <a
          href="#plans"
          className="inline-block mt-6 w-fit bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
        >
          {t("checkCreditProfileBtn")}
        </a>
        <p className="text-xs text-gray-500 italic mt-2">{t("enquiryScoreNote")}</p>
      </div>
      <div className="relative w-full min-h-55 overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
