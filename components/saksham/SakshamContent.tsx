"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/saksham-banner.jpg";

/** Ships as one raster: the "Each course includes:" heading, the five cards, and the 60-day note. */
const COURSE_IMAGE =
  "https://www.cibil.com/cibil-saksham/_jcr_content/root/contentcontainer/pagesection/basicimage.coreimg.png/1762406676567/saksham-course.png";

const BULLET_CLASS = "list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700 marker:text-[#00b0f0]";
const CTA_CLASS =
  "mt-4 inline-block w-fit rounded-full bg-[#f5c518] px-6 py-3 text-xs font-bold uppercase tracking-wide text-gray-900 transition-colors hover:bg-[#e8b800]";

/** Every locale writes these notes as "<label>: <body>", and the label alone is bold. */
function NoteLine({ text, className = "" }: { text: string; className?: string }) {
  const at = text.indexOf(":");

  return (
    <p className={`text-xs italic text-gray-700 underline underline-offset-2 ${className}`}>
      {at === -1 ? (
        text
      ) : (
        <>
          <span className="font-bold">{text.slice(0, at + 1)}</span>
          {text.slice(at + 1)}
        </>
      )}
    </p>
  );
}

function CourseBlock({
  titleKey,
  boldKey,
  descKey,
  ctaKey,
}: {
  titleKey: TranslationKey;
  boldKey: TranslationKey;
  descKey: TranslationKey;
  ctaKey: TranslationKey;
}) {
  const { t } = useLanguage();

  return (
    <div className="mt-8">
      <p className="text-sm font-bold text-gray-900 underline underline-offset-4">{t(titleKey)}</p>
      <p className="mt-4 text-sm font-bold text-gray-900">{t(boldKey)}</p>
      <p className="mt-1 text-sm leading-relaxed text-gray-700">{t(descKey)}</p>
      <NoteLine text={t("sakshamCourseNote")} className="mt-4" />
      <Link href="/register" className={CTA_CLASS}>
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

  /** The course raster carries its text as pixels, so restate it for screen readers. */
  const courseImageAlt = [
    t("sakshamIncludesHeading"),
    [t("sakshamInc1"), t("sakshamInc2"), t("sakshamInc3"), t("sakshamInc4"), t("sakshamInc5")].join(", "),
    t("sakshamAccessNote"),
  ].join(" ");

  return (
    <>
      {/* Hero — copy on a grey field, photo bleeding off the right edge */}
      <section className="relative overflow-hidden bg-[#f2f2f2]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-md py-14 lg:py-24">
            <h1 className="text-3xl leading-snug text-gray-900 sm:text-4xl">{t("sakshamTitle")}</h1>
            <p className="mt-3 text-lg leading-snug text-gray-700">{t("sakshamSubtitle")}</p>
            <Link href="#courses" className={CTA_CLASS}>
              {t("learnMoreUpper")}
            </Link>
          </div>
        </div>
        <div className="relative h-56 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[26%]">
          <Image
            src={HERO_IMAGE}
            alt={`${t("sakshamTitle")} — ${t("sakshamSubtitle")}`}
            fill
            preload
            unoptimized
            sizes="(max-width: 1024px) 100vw, 26vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-14 sm:px-8 lg:px-14">
        <h2 className="mb-5 text-2xl text-gray-900">{t("sakshamWhatHeading")}</h2>
        <p className="leading-relaxed text-gray-700">{t("sakshamWhatDesc")}</p>

        <h2 className="mt-10 mb-5 text-2xl text-gray-900">{t("sakshamWhoHeading")}</h2>
        <ul className={BULLET_CLASS}>
          <li>
            <span className="font-bold text-gray-900">{t("sakshamWho1Bold")}</span> {t("sakshamWho1")}
          </li>
          <li>
            <span className="font-bold text-gray-900">{t("sakshamWho2Bold")}</span> {t("sakshamWho2")}
          </li>
        </ul>

        {/* Heading, cards and 60-day note all live inside the official artwork */}
        <Image
          src={COURSE_IMAGE}
          alt={courseImageAlt}
          width={1280}
          height={264}
          unoptimized
          sizes="100vw"
          className="mt-14 h-auto w-full"
        />

        <h2 id="courses" className="mt-14 text-2xl text-gray-900">
          {t("sakshamCoursesHeading")}
        </h2>
        <CourseBlock
          titleKey="sakshamCourse1Title"
          boldKey="sakshamCourse1Bold"
          descKey="sakshamCourse1Desc"
          ctaKey="learnMoreUpper"
        />
        <CourseBlock
          titleKey="sakshamCourse2Title"
          boldKey="sakshamCourse2Bold"
          descKey="sakshamCourse2Desc"
          ctaKey="learnNowUpper"
        />

        <h2 className="mt-12 mb-5 text-2xl text-gray-900">{t("sakshamWhyHeading")}</h2>
        <ul className={BULLET_CLASS}>
          {why.map(([bold, rest]) => (
            <li key={bold}>
              <span className="font-bold text-gray-900">{t(bold)}</span> {t(rest)}
            </li>
          ))}
        </ul>
        <NoteLine text={t("sakshamWhyNote")} className="mt-6" />
      </section>
    </>
  );
}
