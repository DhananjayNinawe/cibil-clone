"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const STEPS_IMAGE =
  "https://www.cibil.com/microfinance-dispute-resolution/_jcr_content/root/contentcontainer/pagesection_83362557/contentcontainer/pagesectionwithbackg/image.coreimg.75.1440.jpeg/1756108892218/mfidisputeimg.jpeg";

export default function HowToFixSection() {
  const { t } = useLanguage();

  return (
    <section id="how-to-fix" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="font-bold text-gray-900 text-lg mb-6">{t("mfiHowToFixHeading")}</h2>

      <div className="overflow-hidden rounded-lg">
        <Image
          src={STEPS_IMAGE}
          alt={t("mfiFollowStepsHeading")}
          width={1440}
          height={557}
          unoptimized
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
