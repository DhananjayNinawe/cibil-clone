"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LightbulbIcon } from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/mfi.jpg";

const LINK_CLASS = "text-[#00b0f0] underline underline-offset-2 hover:text-[#0093c9]";
const BULLET_CLASS = "list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700 marker:text-[#00b0f0]";

/** Step 3 links the support address, which every locale embeds inline in the sentence. */
function CourierStep() {
  const { t } = useLanguage();
  const text = t("mfpStep3");
  const email = t("registeredOfficeEmail");
  const at = text.toLowerCase().indexOf(email.toLowerCase());

  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <a href={`mailto:${email}`} className={LINK_CLASS}>
        {text.slice(at, at + email.length)}
      </a>
      {text.slice(at + email.length)}
    </>
  );
}

export default function MicrofinanceContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero — copy on a grey field, photo bleeding off the right edge */}
      <section className="relative overflow-hidden bg-[#f2f2f2]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-md py-14 lg:max-w-lg lg:py-24">
            <h1 className="text-2xl leading-snug text-gray-900 sm:text-3xl">{t("mfpHeroTitle")}</h1>
            <Link
              href="/register"
              className="mt-7 inline-block w-fit rounded-full bg-[#f5c518] px-6 py-3 text-xs font-bold uppercase tracking-wide text-gray-900 transition-colors hover:bg-[#e8b800]"
            >
              {t("mfpHeroBtn")}
            </Link>
          </div>
        </div>
        <div className="relative h-56 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[26%]">
          <Image
            src={HERO_IMAGE}
            alt={t("mfpHeroTitle")}
            fill
            preload
            unoptimized
            sizes="(max-width: 1024px) 100vw, 26vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* What an MFI loan is */}
      <div className="bg-[#f5c518] px-4 py-4">
        <p className="mx-auto flex max-w-4xl items-start justify-center gap-2 text-center text-sm leading-relaxed text-gray-900">
          <LightbulbIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{t("mfpBanner")}</span>
        </p>
      </div>

      <section className="mx-auto max-w-[1600px] px-4 py-14 sm:px-8 lg:px-14">
        <h2 className="mb-5 text-2xl text-gray-900">{t("mfpWhatHeading")}</h2>
        <p className="leading-relaxed text-gray-700">
          {t("mfpWhatPara1")} <em>{t("mfpWhatPara1Italic")}</em>
        </p>
        <p className="mt-4 leading-relaxed text-gray-700">{t("mfpWhatPara2")}</p>

        <p className="mt-8 font-bold text-gray-900">{t("mfpIncludesHeading")}</p>
        <p className="mt-3 leading-relaxed text-gray-700">{t("mfpIncludesIntro")}</p>
        <ul className={`mt-3 ${BULLET_CLASS}`}>
          <li>{t("mfpInc1")}</li>
          <li>{t("mfpInc2")}</li>
          <li>{t("mfpInc3")}</li>
          <li>{t("mfpInc4")}</li>
        </ul>

        <h2 className="mt-12 mb-5 text-2xl text-gray-900">{t("mfpWhyHeading")}</h2>
        <ul className={BULLET_CLASS}>
          <li>
            <span className="font-bold text-gray-900">{t("mfpWhy1Bold")}</span> {t("mfpWhy1")}
          </li>
          <li>
            <span className="font-bold text-gray-900">{t("mfpWhy2Bold")}</span> {t("mfpWhy2")}
          </li>
          <li>
            <span className="font-bold text-gray-900">{t("mfpWhy3Bold")}</span> {t("mfpWhy3")}
          </li>
        </ul>

        <p className="mt-8 text-sm font-bold text-gray-900 italic">{t("mfpDisclaimer")}</p>
      </section>

      {/* Get it online */}
      <div className="bg-[#f5c518] px-4 py-4">
        <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-gray-900">
          {t("mfpAvailBanner")}{" "}
          <Link
            href="/register"
            className="inline-block font-semibold underline underline-offset-2 first-letter:uppercase"
          >
            {t("disputeClickHere")}
          </Link>{" "}
          {t("mfpGetStartedNow")}
        </p>
      </div>

      {/* Or by email / courier */}
      <section className="mx-auto max-w-[1600px] px-4 py-14 sm:px-8 lg:px-14">
        <p className="font-bold text-gray-900">{t("mfpStepsHeading")}</p>
        <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <a href="#" className={LINK_CLASS}>
              {t("downloadWord")}
            </a>{" "}
            {t("mfpStep1Suffix")}
          </li>
          <li>{t("mfpStep2")}</li>
          <li>
            <CourierStep />
          </li>
          <li>{t("mfpStep4")}</li>
        </ol>

        <p className="mt-10 text-sm text-gray-700">
          <Link href="/microfinance-dispute-resolution" className={`${LINK_CLASS} inline-block first-letter:uppercase`}>
            {t("disputeClickHere")}
          </Link>{" "}
          {t("mfpDisputeSuffix")}
        </p>
      </section>
    </>
  );
}
