"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const HERO_IMAGE_URL =
  "https://www.cibil.com/contact-us/_jcr_content/root/contentcontainer/pagesection/image.coreimg.75.1440.jpeg/1683913902553/contact1.jpeg";

export default function HeroBanner() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="relative w-full aspect-1440/440 overflow-hidden">
        <Image
          src={HERO_IMAGE_URL}
          alt={t("contactHeroAlt")}
          fill
          priority
          unoptimized
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
      </div>
    </section>
  );
}
