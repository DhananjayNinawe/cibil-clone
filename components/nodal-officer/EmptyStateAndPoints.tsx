"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SearchIcon } from "@/components/icons";

function EmptyStateIllustration() {
  return (
    <div className="flex flex-col items-center gap-3 py-16">
      <div className="w-40 h-2 rounded-full bg-gray-100" />
      <div className="w-56 h-2 rounded-full bg-gray-100" />
      <SearchIcon className="w-16 h-16 text-gray-200 my-2" />
      <div className="w-56 h-2 rounded-full bg-gray-100" />
      <div className="w-40 h-2 rounded-full bg-gray-100" />
    </div>
  );
}

export default function EmptyStateAndPoints() {
  const { t } = useLanguage();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
      <EmptyStateIllustration />

      <h2 className="font-bold text-gray-900 text-lg mb-6">{t("pointsToNoteHeading")}</h2>
      <ul className="text-left space-y-3 text-sm text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-[#00b0f0] mt-1">•</span>
          <span>{t("nodalPoint1")}</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#00b0f0] mt-1">•</span>
          <div>
            <p>{t("nodalPoint2")}</p>
            <ul className="mt-2 space-y-1.5 pl-4">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">↳</span>
                <span>{t("nodalSubPoint1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">↳</span>
                <span>{t("nodalSubPoint2")}</span>
              </li>
            </ul>
          </div>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#00b0f0] mt-1">•</span>
          <span>
            {t("nodalPoint3Prefix")}{" "}
            <Link href="/consumer-dispute-resolution" className="text-blue-700 hover:underline font-semibold">
              {t("disputeClickHere")}
            </Link>
          </span>
        </li>
      </ul>
    </section>
  );
}
