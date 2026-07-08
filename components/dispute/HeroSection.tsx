"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/dispute-new.png";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-14">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{t("disputeHeroTitle")}</h1>
          <p className="text-gray-600 mt-4 max-w-md">{t("disputeHeroDesc")}</p>
          <Link
            href="#how-to-initiate"
            className="inline-block mt-6 w-fit bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
          >
            {t("disputeHeroBtn")}
          </Link>
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

      <div className="bg-[#0a3a52] py-2.5 px-4">
        <p className="text-center text-xs sm:text-sm text-white max-w-4xl mx-auto">{t("disputeFreeServiceBanner")}</p>
      </div>
    </>
  );
}
