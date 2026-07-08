"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const HERO_IMAGE_URL = "https://www.cibil.com/content/dam/cibil/consumer/credit-advice.jpg";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{t("concernsHeroTitle")}</h1>
        <p className="text-gray-600 mt-4 max-w-md">{t("concernsHeroDesc")}</p>
      </div>
      <div className="relative w-full h-full min-h-55 overflow-hidden">
        <Image
          src={HERO_IMAGE_URL}
          alt={t("concernsHeroTitle")}
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
