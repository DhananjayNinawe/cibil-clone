"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PlayIcon } from "@/components/icons";

export default function VideoSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="border-2 border-[#00b0f0]/30 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-full sm:w-56 h-32 rounded bg-gradient-to-br from-[#1c2a3a] to-[#0a1420] shrink-0 flex items-center justify-center">
          <button
            aria-label="Play video"
            className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"
          >
            <PlayIcon className="w-6 h-6 text-red-600 ml-0.5" />
          </button>
        </div>
        <p className="text-sm text-gray-700">{t("watchVideoDesc")}</p>
      </div>
    </section>
  );
}
