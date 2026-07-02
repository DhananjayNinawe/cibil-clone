"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function CityscapePlaceholder() {
  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden bg-gradient-to-br from-[#8fd0ea] via-[#bfe6d8] to-[#f3e6b8]">
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#4a6b5c]/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-1 px-2 h-1/2">
        {[40, 65, 50, 80, 55, 70, 45, 90, 60].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-[#3a4a52]/60 rounded-t-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#5a6b6a]/50" />
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-gray-100 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-16">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">
          {t("aboutUsEyebrow")}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t("aboutUsHeroTitle")}</h1>
        <p className="text-gray-600 mt-4 max-w-md">{t("aboutUsHeroDesc")}</p>
        <Link
          href="#about"
          className="inline-block mt-6 w-fit bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
        >
          {t("knowMoreBtn")}
        </Link>
      </div>
      <CityscapePlaceholder />
    </section>
  );
}
