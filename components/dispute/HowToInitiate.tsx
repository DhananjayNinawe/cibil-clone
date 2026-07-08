"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

const STEP_BASE =
  "https://www.cibil.com/consumer-dispute-resolution/_jcr_content/root/contentcontainer/pagesection_83362557/contentcontainer/pagesectionwithbackg/contentcontainer/columnrow";

interface Step {
  label: TranslationKey;
  image: string;
}

const STEPS: Step[] = [
  { label: "step1Label", image: `${STEP_BASE}/item_1764741897337.coreimg.svg/1764742170853/frame34.svg` },
  { label: "step2Label", image: `${STEP_BASE}/item_1764741902134.coreimg.svg/1764742215793/frame35.svg` },
  { label: "step3Label", image: `${STEP_BASE}/item_1764741906358.coreimg.svg/1764742249099/frame36.svg` },
  { label: "step4Label", image: `${STEP_BASE}/item_1764741911591.coreimg.svg/1764742281557/frame37.svg` },
];

export default function HowToInitiate() {
  const { t } = useLanguage();

  return (
    <section id="how-to-initiate" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-bold text-gray-900">{t("howToInitiateHeading")}</h2>

      <div className="text-center mt-10">
        <h3 className="text-lg font-semibold text-gray-800 inline-block border-b-2 border-[#00b0f0] pb-3">
          {t("followStepsHeading")}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center text-center">
            <Image
              src={step.image}
              alt={t(step.label)}
              width={192}
              height={192}
              unoptimized
              className="w-40 h-40 sm:w-48 sm:h-48"
            />
            <p className="font-bold text-gray-800 mt-4">{t(step.label)}</p>
            <div className="text-sm text-gray-600 mt-2 max-w-50">
              {i === 0 && (
                <>
                  <p>{t("step1Line1")}</p>
                  <p className="mt-1">
                    <Link href="/login" className="text-[#0072c6] hover:underline font-medium">
                      {t("login")}
                    </Link>{" "}
                    {t("step1LoginSuffix")}
                  </p>
                  <p>
                    <Link href="/register" className="text-[#0072c6] hover:underline font-medium">
                      {t("step1EnrollLink")}
                    </Link>{" "}
                    {t("step1EnrollSuffix")}
                  </p>
                </>
              )}
              {i === 1 && <p>{t("step2Desc")}</p>}
              {i === 2 && <p>{t("step3Desc")}</p>}
              {i === 3 && (
                <p>
                  <Link href="/login" className="text-[#0072c6] hover:underline font-medium">
                    {t("login")}
                  </Link>{" "}
                  {t("step4Desc")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#00b0f0]/40 mt-12 pt-6 text-center">
        <p className="font-semibold text-gray-800">{t("disputeEligibilityNote")}</p>
      </div>

      <div className="text-center mt-10 space-y-2">
        <p className="text-gray-700">
          <Link href="/register" className="text-[#0072c6] hover:underline font-semibold">
            {t("signUpLink")}
          </Link>{" "}
          {t("signUpPromptMiddle")}{" "}
          <Link href="/login" className="text-[#0072c6] hover:underline font-semibold">
            {t("heroLogIn")}
          </Link>{" "}
          {t("loginPromptSuffix")}
        </p>
        <p className="text-gray-700">
          {t("alternateDisputeText")}{" "}
          <a href="#" className="text-[#0072c6] hover:underline font-semibold">
            {t("disputeClickHere")}
          </a>
          .
        </p>
      </div>

      <div className="bg-[#0a3a52] rounded mt-12 py-3 px-4">
        <p className="text-center text-sm text-white">
          {t("checkoutVideoText")}{" "}
          <a href="#" className="text-[#f5c518] font-semibold hover:underline">
            {t("checkoutVideoLink")}
          </a>{" "}
          {t("checkoutVideoSuffix")}
        </p>
      </div>
    </section>
  );
}
