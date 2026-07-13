"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/main-banner.jpg";

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
}

const CATEGORIES: CategoryCard[] = [
  { labelKey: "creditAdviceTitle", href: "/credit-advice", bg: "bg-[#d9d9d9]" },
  { labelKey: "creditMythsTitle", href: "/credit-myths", bg: "bg-[#00b0f0]" },
  { labelKey: "watchLearnTitle", href: "/watch-and-learn", bg: "bg-[#f5c518]" },
  { labelKey: "blogCatLifeEvents", href: "#", bg: "bg-[#a6a6a6]" },
  { labelKey: "commercialCreditTitle", href: "/commercial-credit", bg: "bg-[#f5c518]" },
  { labelKey: "newToCreditTitle", href: "/new-to-credit", bg: "bg-[#a6a6a6]" },
];

export default function BlogMainContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_390px]">
        <div className="relative min-h-[420px] lg:min-h-[560px] overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 78vw"
            className="object-cover"
          />
          <div className="relative flex h-full flex-col justify-center px-4 sm:px-8 lg:px-16 py-16">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-light text-white leading-tight max-w-3xl">
              {t("blogHeroTitle")}
            </h1>
            <p className="text-sm text-white mt-5">{t("blogHeroSubtitle")}</p>
          </div>
        </div>

        <aside className="bg-[#4a4a4a] flex flex-col justify-center px-8 py-10">
          {FEATURED.map((f, i) => (
            <div key={f}>
              <p className="text-white text-[17px] font-semibold leading-snug">{f}</p>
              <p className="text-[10px] font-bold tracking-[0.15em] text-white mt-3">{t("blogTag")}</p>
              {i < FEATURED.length - 1 && <div className="my-6 h-px w-32 bg-white/40" />}
            </div>
          ))}
        </aside>
      </section>

      {/* Category cards */}
      <section className="bg-[#f0f0f0] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.labelKey} className="bg-white">
              <div className={`${cat.bg} text-gray-900 text-center py-7 text-2xl font-light`}>{t(cat.labelKey)}</div>
              <div className="py-6 flex justify-center">
                <Link
                  href={cat.href}
                  className="border-2 border-[#f5c518] text-gray-900 text-[11px] font-bold tracking-wide rounded-sm px-6 py-2 hover:bg-[#f5c518] transition-colors"
                >
                  {t("blogViewAll")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category / disclaimer */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold tracking-wide text-gray-900">{t("blogCategoryLabel")}</p>
          <a
            href="#"
            className="border border-gray-400 text-gray-800 text-sm rounded-sm px-5 py-1.5 hover:border-gray-600 transition-colors"
          >
            {t("blogViewAllPlain")}
          </a>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed text-justify mt-8">{t("blogDisclaimer")}</p>
      </section>
    </>
  );
}
