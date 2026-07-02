"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

const FEATURED = [
  "Building a Strong Financial Foundation: Essential Money Skills for Young Indians",
  "New-to-credit? Here's how to maintain a healthy CIBIL score",
  "A First-Time User's Guide to Establishing Credit",
  "Safeguarding your Credit Profile",
];

interface CategoryCard {
  labelKey: TranslationKey;
  href: string;
  bg: string;
  text: string;
}

const CATEGORIES: CategoryCard[] = [
  { labelKey: "creditAdviceTitle", href: "/credit-advice", bg: "bg-gray-200", text: "text-gray-900" },
  { labelKey: "creditMythsTitle", href: "/credit-myths", bg: "bg-[#00b0f0]", text: "text-white" },
  { labelKey: "watchLearnTitle", href: "/watch-and-learn", bg: "bg-[#f5c518]", text: "text-gray-900" },
  { labelKey: "blogCatLifeEvents", href: "#", bg: "bg-gray-400", text: "text-white" },
  { labelKey: "commercialCreditTitle", href: "/commercial-credit", bg: "bg-[#f5c518]", text: "text-gray-900" },
  { labelKey: "newToCreditTitle", href: "/new-to-credit", bg: "bg-gray-400", text: "text-white" },
];

export default function BlogMainContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-[#3a5a4a] to-[#1a2a22] grid grid-cols-1 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-16 min-h-[360px]">
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight max-w-2xl">{t("blogHeroTitle")}</h1>
          <p className="text-white/80 mt-4">{t("blogHeroSubtitle")}</p>
        </div>
        <div className="bg-[#3a3a3a] px-6 py-8 flex flex-col justify-center gap-6">
          {FEATURED.map((f) => (
            <div key={f} className="border-b border-white/10 pb-4 last:border-b-0">
              <p className="text-white font-semibold leading-snug">{f}</p>
              <p className="text-[10px] font-bold tracking-widest text-white/60 mt-2">{t("blogTag")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category cards */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.labelKey} className="bg-white">
              <div className={`${cat.bg} ${cat.text} text-center py-6 text-2xl`}>{t(cat.labelKey)}</div>
              <div className="py-5 flex justify-center">
                <Link
                  href={cat.href}
                  className="border-2 border-[#f5c518] text-gray-900 text-xs font-bold rounded px-6 py-2 hover:bg-[#f5c518] transition-colors"
                >
                  {t("blogViewAll")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category / disclaimer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <p className="text-sm font-bold tracking-wide text-gray-800">{t("blogCategoryLabel")}</p>
          <a href="#" className="border border-gray-300 text-gray-700 text-sm rounded px-4 py-1.5 hover:border-gray-400">
            {t("blogViewAllPlain")}
          </a>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mt-6">{t("blogDisclaimer")}</p>
      </section>
    </>
  );
}
