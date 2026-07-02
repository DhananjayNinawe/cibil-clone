"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ScoreGauge from "@/components/home/ScoreGauge";
import { ArrowRightIcon } from "@/components/icons";

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
      <div className="absolute -right-24 top-0 w-[420px] h-[420px] rounded-full bg-[#cdeffb] hidden md:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {t("heroTitlePrefix")} <span className="text-[#00b0f0]">{t("heroTitleBrand")}</span>
            {t("heroTitleSuffix")}
            <br />
            {t("heroTitleLine2")}
          </h1>

          <div className="inline-flex items-start gap-2 mt-6 bg-[#e6f7fd] rounded-md px-4 py-2.5">
            <PinIcon />
            <p className="text-sm text-gray-700">
              {t("heroSafeNote")} <span className="font-bold">{t("heroSafeNoteBold")}</span>
            </p>
          </div>

          <div className="w-10 border-t-2 border-[#00b0f0] my-6" />

          <p className="text-gray-800 font-semibold">{t("heroBecomeReady")}</p>
          <p className="text-sm text-gray-600 mt-2">
            {t("heroAlreadyAccount")}{" "}
            <Link href="/login" className="text-[#0072c6] font-semibold hover:underline">
              {t("heroLogIn")}
            </Link>
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-3 transition-colors"
          >
            {t("heroCta")}
            <ArrowRightIcon />
          </Link>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-8 py-8 w-full max-w-xs">
            <p className="text-center text-sm font-semibold text-gray-700 mb-4">{t("scoreCardTitle")}</p>
            <ScoreGauge score={736} size={180} />
            <p className="text-center text-3xl font-bold text-gray-900 mt-3">736</p>
            <p className="text-center text-xs text-gray-400 mt-4">{t("scoreCardNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
