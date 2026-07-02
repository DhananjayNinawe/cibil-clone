"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { DocumentIcon, PlayIcon, ClockIcon } from "@/components/icons";

function IncludeCard({ icon, label, bg }: { icon: React.ReactNode; label: string; bg: string }) {
  return (
    <div className={`rounded-xl ${bg} p-4 flex items-center gap-3`}>
      <span className="shrink-0">{icon}</span>
      <p className="font-bold text-sm text-gray-800 leading-tight">{label}</p>
    </div>
  );
}

function CourseBlock({
  title,
  bold,
  desc,
  ctaKey,
}: {
  title: string;
  bold: string;
  desc: string;
  ctaKey: TranslationKey;
}) {
  const { t } = useLanguage();
  return (
    <div className="mb-10">
      <p className="font-bold text-gray-900 underline underline-offset-4">{title}</p>
      <p className="font-bold text-gray-800 mt-3">{bold}</p>
      <p className="text-sm text-gray-700 mt-1 leading-relaxed">{desc}</p>
      <p className="text-xs text-gray-500 italic mt-3">{t("sakshamCourseNote")}</p>
      <Link
        href="/register"
        className="inline-block mt-4 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-xs font-bold rounded px-5 py-2.5 transition-colors"
      >
        {t(ctaKey)}
      </Link>
    </div>
  );
}

export default function SakshamContent() {
  const { t } = useLanguage();

  const why: [TranslationKey, TranslationKey][] = [
    ["sakshamWhy1Bold", "sakshamWhy1"],
    ["sakshamWhy2Bold", "sakshamWhy2"],
    ["sakshamWhy3Bold", "sakshamWhy3"],
    ["sakshamWhy4Bold", "sakshamWhy4"],
  ];

  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-14 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{t("sakshamTitle")}</h1>
          <p className="text-lg text-gray-700 mt-2">{t("sakshamSubtitle")}</p>
          <Link
            href="#courses"
            className="inline-block mt-6 w-fit mx-auto lg:mx-0 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
          >
            {t("learnMoreUpper")}
          </Link>
        </div>
        <div className="relative w-full h-full min-h-[220px] overflow-hidden bg-gradient-to-br from-[#bcd0c0] to-[#5a7a60] flex items-center justify-center" />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("sakshamWhatHeading")}</h2>
        <p className="text-gray-700 leading-relaxed">{t("sakshamWhatDesc")}</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">{t("sakshamWhoHeading")}</h2>
        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-700">
          <li>
            <span className="font-bold">{t("sakshamWho1Bold")}</span> {t("sakshamWho1")}
          </li>
          <li>
            <span className="font-bold">{t("sakshamWho2Bold")}</span> {t("sakshamWho2")}
          </li>
        </ul>

        <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-6">{t("sakshamIncludesHeading")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <IncludeCard icon={<DocumentIcon className="w-6 h-6 text-orange-500" />} label={t("sakshamInc1")} bg="bg-yellow-50" />
          <IncludeCard icon={<PlayIcon className="w-6 h-6 text-purple-500" />} label={t("sakshamInc2")} bg="bg-purple-50" />
          <IncludeCard icon={<DocumentIcon className="w-6 h-6 text-green-600" />} label={t("sakshamInc3")} bg="bg-green-50" />
          <IncludeCard icon={<DocumentIcon className="w-6 h-6 text-red-500" />} label={t("sakshamInc4")} bg="bg-red-50" />
          <IncludeCard icon={<DocumentIcon className="w-6 h-6 text-amber-600" />} label={t("sakshamInc5")} bg="bg-gray-50" />
        </div>

        <div className="bg-[#eef5fb] rounded-lg p-4 flex items-start gap-3 mt-6">
          <ClockIcon className="w-5 h-5 text-[#00b0f0] mt-0.5 shrink-0" />
          <p className="text-sm text-gray-700 italic">
            <span className="font-bold">Note:</span> {t("sakshamAccessNote").replace(/^Note:\s*/, "")}
          </p>
        </div>

        <h2 id="courses" className="text-2xl font-bold text-gray-900 mt-14 mb-6">
          {t("sakshamCoursesHeading")}
        </h2>
        <CourseBlock title={t("sakshamCourse1Title")} bold={t("sakshamCourse1Bold")} desc={t("sakshamCourse1Desc")} ctaKey="learnMoreUpper" />
        <CourseBlock title={t("sakshamCourse2Title")} bold={t("sakshamCourse2Bold")} desc={t("sakshamCourse2Desc")} ctaKey="learnNowUpper" />

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t("sakshamWhyHeading")}</h2>
        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-700">
          {why.map(([bold, rest]) => (
            <li key={bold}>
              <span className="font-bold">{t(bold)}</span> {t(rest)}
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 italic mt-4">{t("sakshamWhyNote")}</p>
      </section>
    </>
  );
}
