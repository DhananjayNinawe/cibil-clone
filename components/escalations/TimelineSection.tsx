"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TimelineSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("timelineHeading")}</h2>
      <p className="text-gray-700">
        {t("timelinePara1Prefix")} <span className="font-bold text-gray-900">{t("timelineUpTo30Days")}</span>
        {t("timelinePara1Suffix")}
      </p>
      <ul className="list-disc pl-6 mt-3 space-y-1 text-sm text-gray-700">
        <li>{t("timelineBanksCi")}</li>
        <li>{t("timelineCibilCic")}</li>
      </ul>
      <p className="text-gray-700 mt-4">
        {t("timelinePara2Prefix")}{" "}
        <span className="font-bold text-gray-900">{t("learnMoreBold")}</span>{" "}
        <Link href="/framework-for-compensation" className="text-blue-700 hover:underline">
          {t("frameworkCompensationLinkText")}
        </Link>
      </p>
    </section>
  );
}
