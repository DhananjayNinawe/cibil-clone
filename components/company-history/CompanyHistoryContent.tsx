"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { COMPANY_HISTORY } from "@/lib/footerPageData";

const HERO_IMAGE_URL =
  "https://www.transunioncibil.com/content/dam/transunion-cibil/business/images/header/post/INT-IN-24-2815101-India-About-us-Web-Image-Desktop-Header.jpg";

export default function CompanyHistoryContent() {
  const { t, language } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-gray-100 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-14">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">{t("aboutUsEyebrow")}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t("companyHistoryTitle")}</h1>
          <p className="text-gray-600 mt-4 max-w-md">{t("aboutUsHeroDesc")}</p>
          <Link
            href="/about-us"
            className="inline-block mt-6 w-fit bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
          >
            {t("knowMoreBtn")}
          </Link>
        </div>
        <div className="relative w-full min-h-65 lg:min-h-full">
          <Image
            src={HERO_IMAGE_URL}
            alt={t("companyHistoryTitle")}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {COMPANY_HISTORY[language].map((entry, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-[180px_1fr] sm:items-center gap-4 sm:gap-10 border-b border-gray-200 py-8 last:border-b-0"
          >
            <p className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#00b0f0]">{entry.year}</p>
            <div className="text-sm text-gray-700 leading-relaxed space-y-3">
              {entry.paras.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {entry.bullets && (
                <ul className="list-disc pl-5 space-y-1 marker:text-[#00b0f0]">
                  {entry.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
