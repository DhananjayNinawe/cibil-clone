"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/icons";

const HERO_BANNER_URL = "https://www.cibil.com/content/dam/cibil/homepage/shared/banner.svg";

function PinIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#00b0f0] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18s6-5.686 6-10A6 6 0 004 8c0 4.314 6 10 6 10zm0-7a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -right-72 -top-40 w-142 h-142 rounded-full bg-[#cdeffb] hidden md:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        {/* Text column on desktop; on mobile it splits so the score gauge slots between the note and the CTA. */}
        <div className="contents lg:flex lg:flex-col">
          <div className="order-1 lg:order-0 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {t("heroTitlePrefix")} <span className="text-[#00b0f0]">{t("heroTitleBrand")}</span>
              {t("heroTitleSuffix")}
              <br />
              {t("heroTitleLine2")}
            </h1>

            <div className="mt-6 inline-flex items-start gap-2 bg-[#e6f7fd] rounded-md px-4 py-2.5 text-left">
              <PinIcon />
              <p className="text-sm text-gray-700">
                {t("heroSafeNote")} <span className="font-bold">{t("heroSafeNoteBold")}</span>
              </p>
            </div>
          </div>

          <div className="order-3 lg:order-0 mt-8 lg:mt-0 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-10 border-t-2 border-[#00b0f0] mb-6 hidden lg:block" />

            <p className="text-gray-800 font-semibold">{t("heroBecomeReady")}</p>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-medium rounded-full px-6 py-3 transition-colors"
            >
              {t("heroCta")}
              <ArrowRightIcon />
            </Link>

            <p className="text-sm text-gray-600 mt-4">
              {t("heroAlreadyAccount")}{" "}
              <Link href="/login" className="text-[#0072c6] font-semibold underline">
                {t("heroLogIn")}
              </Link>
            </p>
          </div>
        </div>

        <div className="order-2 lg:order-0 mt-8 lg:mt-0 flex justify-center lg:justify-end">
          <Image
            src={HERO_BANNER_URL}
            alt={t("scoreCardTitle")}
            width={427}
            height={370}
            priority
            unoptimized
            className="w-full max-w-106.75 h-auto drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
