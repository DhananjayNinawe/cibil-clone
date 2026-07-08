"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const HERO_IMAGE_URL =
  "https://www.transunioncibil.com/content/dam/transunion-cibil/corporate/images/header/About-Us-2hero-D-220916.jpg";

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
      <div className="relative w-full min-h-65 lg:min-h-full">
        <Image
          src={HERO_IMAGE_URL}
          alt={t("aboutUsHeroTitle")}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
