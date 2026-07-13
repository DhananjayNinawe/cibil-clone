"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { renderRichText } from "@/lib/richText";
import FaqAccordion, { FaqItem } from "@/components/faq/FaqAccordion";

const DAM = "https://www.cibil.com/content/dam/cibil/consumer/facr";

const BTN =
  "inline-block w-fit rounded-full bg-[#ffd700] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#e8c400]";

function HeroSection() {
  const { t } = useLanguage();

  return (
    <>
      <section className="grid grid-cols-1 items-center bg-white lg:grid-cols-2">
        <div className="px-6 py-12 sm:px-10 lg:py-0 lg:pl-18 lg:pr-8">
          <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-[44px]">{t("fcsHeroTitle")}</h1>
          <Link href="/register" className={`${BTN} mt-8`}>
            {t("getFreeScoreBtn")}
          </Link>
          <p className="mt-8 text-sm text-gray-700">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/login" className="ml-1 font-bold text-black underline">
              {t("logInLink")}
            </Link>
          </p>
          <p className="mt-6 max-w-md text-[13px] leading-relaxed text-gray-600">{t("fcsHeroEligibility")}</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src={`${DAM}/banner-image.png`}
            alt={t("fcsBannerAlt")}
            width={480}
            height={480}
            priority
            unoptimized
            className="h-auto w-full max-w-120"
          />
        </div>
      </section>
      <div className="bg-[#fff3c0] px-4 py-3.5">
        <p className="text-center text-sm text-[#6f4116]">{t("fcsFreeBanner")}</p>
      </div>
    </>
  );
}

function WhatYouGet() {
  const { t } = useLanguage();

  const items: { icon: string; text: TranslationKey }[] = [
    { icon: "cibil_score", text: "fcsGet1" },
    { icon: "cibil_payment", text: "fcsGet2" },
    { icon: "personal_info", text: "fcsGet3" },
    { icon: "all_enquiry", text: "fcsGet4" },
    { icon: "loan_credit", text: "fcsGet5" },
  ];

  return (
    <section className="grid grid-cols-1 items-center gap-10 bg-white px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-0 lg:pl-18 lg:pr-10">
      <div>
        <h2 className="max-w-md text-[26px] font-bold leading-[1.6] text-gray-900 lg:text-[30px]">
          {t("fcsWhatYouGetHeading")}
        </h2>
        <Link href="/register" className={`${BTN} mt-8`}>
          {t("getStartedNowBtn")}
        </Link>
      </div>
      <ul className="space-y-7">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-4">
            <Image
              src={`${DAM}/${item.icon}.svg`}
              alt=""
              width={54}
              height={54}
              unoptimized
              className="h-13.5 w-13.5 shrink-0"
            />
            <div className="pt-2 text-sm leading-relaxed text-gray-700">{renderRichText(t(item.text))}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function VideoBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#fff3c0] px-6 py-14 sm:px-10">
      {/* Decorative circles bleeding off the left edge, as on the source page. */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#ffeb9e]" aria-hidden />
      <div className="pointer-events-none absolute left-2 top-28 h-12 w-12 rounded-full bg-[#ffd700]" aria-hidden />

      <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:justify-between lg:pl-24 lg:pr-10">
        <div className="max-w-xl">
          <p className="text-lg leading-[1.9] text-gray-800 lg:text-xl">{t("fcsVideoBannerTitle")}</p>
          <Link href="/watch-and-learn" className={`${BTN} mt-6`}>
            {t("watchNowBtn")}
          </Link>
        </div>
        <Image
          src={`${DAM}/Watch_and_learn.svg`}
          alt={t("fcsWatchLearnAlt")}
          width={260}
          height={200}
          unoptimized
          className="h-auto w-full max-w-65 shrink-0"
        />
      </div>
    </section>
  );
}

export default function FcsContent() {
  const { t } = useLanguage();

  const faqs: { q: TranslationKey; a: TranslationKey }[] = [
    { q: "fcsFaq1", a: "fcsA1" },
    { q: "fcsFaq2", a: "fcsA2" },
    { q: "fcsFaq3", a: "fcsA3" },
    { q: "fcsFaq4", a: "fcsA4" },
    { q: "fcsFaq5", a: "fcsA5" },
    { q: "fcsFaq6", a: "fcsA6" },
    { q: "fcsFaq7", a: "fcsA7" },
    { q: "fcsFaq8", a: "fcsA8" },
    { q: "fcsFaq9", a: "fcsA9" },
    { q: "fcsFaq10", a: "fcsA10" },
  ];
  const faqItems: FaqItem[] = faqs.map(({ q, a }) => ({ question: t(q), answer: renderRichText(t(a)) }));

  return (
    <>
      <HeroSection />
      <WhatYouGet />

      <section className="bg-[#f7f9fa] px-6 py-16">
        <div className="mx-auto max-w-311">
          <h2 className="mb-10 text-center text-[26px] font-bold text-gray-900 lg:text-[32px]">{t("fcsFaqHeading")}</h2>
          <FaqAccordion items={faqItems} defaultOpenFirst />
        </div>
      </section>

      <VideoBanner />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-311">
          <h2 className="mb-10 text-center text-[26px] font-bold text-gray-900 lg:text-[30px]">{t("fcsTermsHeading")}</h2>
          <div className="grid grid-cols-1 gap-8 text-sm leading-relaxed text-gray-600 sm:grid-cols-3">
            {(["fcsTerm1", "fcsTerm2", "fcsTerm3"] as const).map((key, i) => (
              <p key={key} className={`flex items-start gap-2 ${i > 0 ? "sm:border-l sm:border-gray-200 sm:pl-8" : ""}`}>
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b0f0]" aria-hidden />
                <span>{t(key)}</span>
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
