"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { ReportChartIcon, DocumentAlertIcon, ScaleIcon, PhoneCheckIcon } from "@/components/icons";

interface Step {
  label: TranslationKey;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  { label: "step1Label", icon: <ReportChartIcon /> },
  { label: "step2Label", icon: <DocumentAlertIcon /> },
  { label: "step3Label", icon: <ScaleIcon /> },
  { label: "step4Label", icon: <PhoneCheckIcon /> },
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
            <div className="w-24 h-24 rounded-full bg-[#0a3a52] flex items-center justify-center">{step.icon}</div>
            <p className="font-bold text-gray-800 mt-4">{t(step.label)}</p>
            <div className="text-sm text-gray-600 mt-2 max-w-[200px]">
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
