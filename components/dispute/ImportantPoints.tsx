"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { CheckCircleIcon } from "@/components/icons";

const POINTS: TranslationKey[] = [
  "pointNoCorrection",
  "pointRbiGuidelines",
  "pointResolveWithin30",
  "disputeFreeServiceBanner",
];

export default function ImportantPoints() {
  const { t } = useLanguage();

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="font-bold text-gray-900 text-lg mb-8">{t("importantPointsHeading")}</h2>
      <ul className="space-y-6">
        {POINTS.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-[#00b0f0] mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700 leading-relaxed">{t(point)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
