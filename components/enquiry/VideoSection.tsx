"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PlayIcon } from "@/components/icons";

const VIDEO_THUMBNAIL = "https://i.ytimg.com/vi/HuCJuXSSzH0/sddefault.jpg";
const VIDEO_URL = "https://www.youtube.com/watch?v=HuCJuXSSzH0";

export default function VideoSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="border-2 border-[#00b0f0]/30 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-6">
        <a
          href={VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("a11yPlayVideo")}
          className="relative w-full sm:w-56 h-32 rounded overflow-hidden shrink-0 flex items-center justify-center bg-black"
        >
          <Image
            src={VIDEO_THUMBNAIL}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 224px"
            className="object-cover"
          />
          <span className="relative w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <PlayIcon className="w-6 h-6 text-red-600 ml-0.5" />
          </span>
        </a>
        <p className="text-sm text-gray-700">{t("watchVideoDesc")}</p>
      </div>
    </section>
  );
}
