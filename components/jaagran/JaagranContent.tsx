"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { PlayIcon, PersonSilhouetteIcon, CheckCircleIcon } from "@/components/icons";

const JAAGRAN_VIDEOS = [
  "Know The Four Factors That Influence Your CIBIL Score",
  "Building Credit Profile for New-To-Credit users",
  "5 Simple Ways To Start Your Journey",
];

const JAAGRAN_BLOGS = [
  "New-to-credit? Here's how to maintain a healthy CIBIL score",
  "First-time users guide to establishing credit",
  "Set Yourself Up in Your 20s for Financial Stability in Your 40s",
  "How To Create Your Financial And Credit Roadmap",
  "Millennials Guide For Building A Healthy Credit Profile",
];

const KAHAANIYAAN = [
  "Suppandi and his dream car",
  "Suppandi wants a credit card",
  "Suppandi and Renu's dream college",
  "Suppandi and the neighbourhood store",
  "Suppandi and the CIBIL myths",
];

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg p-4">
      <CheckCircleIcon className="w-5 h-5 text-[#00b0f0] mt-0.5 shrink-0" />
      <div>
        <p className="font-bold text-sm text-gray-800">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}

export default function JaagranContent() {
  const { t } = useLanguage();

  const why: [TranslationKey, TranslationKey][] = [
    ["jaagranWhy1Title", "jaagranWhy1Desc"],
    ["jaagranWhy2Title", "jaagranWhy2Desc"],
    ["jaagranWhy3Title", "jaagranWhy3Desc"],
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-white to-[#dff3fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-3xl font-extrabold text-[#00b0f0] tracking-tight">
              CIBIL <span className="text-[#0a3a52]">JAAGRAN</span>
            </p>
            <p className="text-xs font-semibold tracking-widest text-gray-600 mt-2">{t("jaagranTagline")}</p>
            <Link
              href="/register"
              className="inline-block mt-6 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
            >
              {t("jaagranHeroCta")}
            </Link>
          </div>
          <div className="relative h-48 rounded-xl bg-gradient-to-br from-[#7fc8e8] to-[#3a8ab0] flex items-center justify-center">
            <PersonSilhouetteIcon className="w-20 h-20 text-white/30" />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("jaagranAboutHeading")}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t("jaagranAboutPara1")}</p>
          <p className="text-sm text-gray-600 leading-relaxed mt-4">{t("jaagranAboutPara2")}</p>
          <div className="border-l-2 border-[#00b0f0] pl-4 mt-6">
            <p className="text-sm font-semibold text-gray-800">{t("jaagranMissionLabel")}</p>
            <p className="text-sm text-gray-600">{t("jaagranMission")}</p>
          </div>
        </div>
        <div className="space-y-4">
          <Feature title={t("jaagranFeat1Title")} desc={t("jaagranFeat1Desc")} />
          <Feature title={t("jaagranFeat2Title")} desc={t("jaagranFeat2Desc")} />
          <Feature title={t("jaagranFeat3Title")} desc={t("jaagranFeat3Desc")} />
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-bold text-gray-900 mb-6">{t("jaagranWhyMattersHeading")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {why.map(([title, desc]) => (
              <div key={title}>
                <p className="font-bold text-sm text-gray-800">{t(title)}</p>
                <p className="text-xs text-gray-500 mt-1">{t(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't worry / free score */}
      <section className="bg-[#eef5fb] py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-semibold text-gray-800">{t("jaagranDontWorry")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[t("jaagranCheck1"), t("jaagranCheck2"), t("jaagranCheck3")].map((c) => (
              <div key={c} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-[#00b0f0]" />
                </div>
                <p className="text-xs text-gray-600">{c}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-full mt-8 inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-3 shadow-sm">
            <span className="text-sm text-gray-700">{t("jaagranCheckFree")}</span>
            <Link href="/register" className="bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs font-bold rounded-full px-5 py-2 transition-colors">
              {t("jaagranGetFreeScore")}
            </Link>
          </div>
        </div>
      </section>

      {/* Learn / videos + blogs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("jaagranLearnHeading")}</h2>

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">{t("jaagranVideosHeading")}</h3>
          <a href="#" className="text-sm text-blue-700 hover:underline">
            {t("jaagranWatchMore")} →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {JAAGRAN_VIDEOS.map((v) => (
            <div key={v}>
              <div className="relative h-32 rounded-lg bg-gradient-to-br from-[#1c2a3a] to-[#0a1420] flex items-center justify-center">
                <PlayIcon className="w-10 h-10 text-red-600" />
              </div>
              <p className="text-sm font-semibold text-gray-800 mt-2">{v}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">{t("jaagranBlogsHeading")}</h3>
          <a href="#" className="text-sm text-blue-700 hover:underline">
            {t("jaagranReadMoreBlogs")} →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {JAAGRAN_BLOGS.map((b) => (
            <div key={b}>
              <div className="h-28 rounded-lg bg-gradient-to-br from-[#cdeffb] to-[#8fd0ea]" />
              <p className="text-sm font-semibold text-gray-800 mt-2 leading-snug">{b}</p>
              <a href="#" className="text-xs text-blue-700 hover:underline">
                {t("jaagranReadNow")}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CIBIL Ki Kahaaniyaan */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <p className="text-sm text-gray-500">{t("jaagranIntroducing")}</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2 inline-block">
          {t("jaagranKahaaniyaan")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {KAHAANIYAAN.map((k, i) => (
            <div key={k}>
              <div className="h-40 rounded-lg bg-gradient-to-br from-[#3aa8d8] to-[#0a3a52] flex items-center justify-center p-4">
                <p className="text-[#f5c518] font-extrabold text-center uppercase text-sm">{k}</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {t("jaagranChapterLabel")} {i + 1}
              </p>
              <p className="text-sm font-semibold text-gray-800">{k}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
