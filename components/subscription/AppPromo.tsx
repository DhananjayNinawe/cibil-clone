"use client";

import { useLanguage } from "@/context/LanguageContext";

function PhoneMockup() {
  return (
    <div className="relative w-56 sm:w-64 mx-auto">
      <div className="rounded-[2rem] border-[6px] border-gray-900 bg-white shadow-xl overflow-hidden aspect-[9/18]">
        <div className="bg-[#00b0f0] px-4 py-3 flex items-center justify-between">
          <span className="text-white font-bold text-sm">CIBIL</span>
          <div className="w-2 h-2 rounded-full bg-white/70" />
        </div>
        <div className="p-4 flex flex-col items-center">
          <p className="text-xs text-gray-500 self-start">Hello, Rakesh G.</p>
          <div className="mt-4 w-28 h-28 rounded-full border-8 border-[#00b0f0] border-r-yellow-400 border-b-green-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">750</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">is your CIBIL Score</p>
          <div className="mt-4 w-full bg-[#00b0f0] rounded-full py-1.5 text-center">
            <span className="text-white text-xs font-semibold">Refresh Now</span>
          </div>
          <div className="mt-4 w-full space-y-2">
            <div className="h-2 rounded bg-gray-100" />
            <div className="h-2 rounded bg-gray-100 w-3/4" />
            <div className="h-2 rounded bg-gray-100 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppPromo() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#fdf1c8] to-[#fce9a8] py-14 px-4">
      <div className="absolute -left-6 top-8 w-16 h-16 rounded-full bg-[#f5c518]/60 hidden sm:block" />
      <div className="absolute left-10 bottom-10 w-8 h-8 rounded-full bg-[#00b0f0]/40 hidden sm:block" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-snug">
            {t("appPromoTitle")}
            <br />
            {t("appPromoSubtitle")}
          </h2>
          <p className="mt-4 text-gray-600">{t("appPromoTagline")}</p>

          <button className="mt-6 bg-white border border-gray-300 rounded-full px-6 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors">
            {t("downloadAppBtn")}
          </button>

          <p className="mt-6 text-xs text-gray-500">{t("downloadFrom")}</p>
          <div className="mt-2 flex items-center justify-center md:justify-start gap-3">
            <div className="flex items-center gap-1.5 bg-black text-white rounded-md px-3 py-1.5">
              <span className="text-[9px] leading-tight">
                GET IT ON
                <br />
                <span className="text-sm font-semibold">Google Play</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-black text-white rounded-md px-3 py-1.5">
              <span className="text-[9px] leading-tight">
                Download on the
                <br />
                <span className="text-sm font-semibold">App Store</span>
              </span>
            </div>
          </div>
        </div>

        <PhoneMockup />
      </div>
    </div>
  );
}
