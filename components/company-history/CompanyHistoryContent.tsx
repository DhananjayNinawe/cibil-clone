"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { COMPANY_HISTORY } from "@/lib/footerPageData";

export default function CompanyHistoryContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-14">
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
        <div className="relative w-full h-full min-h-[220px] overflow-hidden bg-gradient-to-br from-[#8fd0ea] via-[#bfe6d8] to-[#c7ccd1]" />
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {COMPANY_HISTORY.map((entry, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-6 border-b border-gray-200 py-8 last:border-b-0">
            <p className="text-4xl sm:text-5xl font-extrabold text-[#00b0f0]">{entry.year}</p>
            <div className="text-sm text-gray-700 leading-relaxed space-y-3">
              {entry.paras.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {entry.bullets && (
                <ul className="list-disc pl-5 space-y-1">
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
