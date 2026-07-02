"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PersonContactIcon, BankIcon, WarningTriangleIcon } from "@/components/icons";

function NumberBadge({ n }: { n: number }) {
  return (
    <span className="w-6 h-6 rounded-full bg-white text-[#0a3a52] text-xs font-bold flex items-center justify-center shrink-0 mx-auto mb-2">
      {n}
    </span>
  );
}

function TealBox({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#0a5a72] text-white rounded-lg p-4 text-sm text-center">{children}</div>;
}

export default function CompensationDiagram() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-[#e6f7fd] rounded-lg p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <TealBox>
              <p className="font-bold">{t("rbiGuidelinesBoxTitle")}</p>
              <p className="mt-1 text-white/90">{t("rbiGuidelinesBoxDesc")}</p>
            </TealBox>
            <p className="text-center text-xs font-semibold text-gray-600 border border-dashed border-[#00b0f0] rounded px-3 py-2">
              {t("ifExceeds30Days")}
            </p>
            <TealBox>
              <p className="font-bold">{t("hundredPerDay")}</p>
              <p className="mt-1 text-white/90">{t("hundredPerDayDesc")}</p>
            </TealBox>
          </div>

          <div>
            <PersonContactIcon className="w-8 h-8 text-[#0a3a52] mx-auto mb-3" />
            <div className="space-y-3">
              <TealBox>
                <NumberBadge n={1} />
                {t("compensationCreditedDesc")}
              </TealBox>
              <TealBox>
                <NumberBadge n={2} />
                <p>{t("noAccountInfoDesc")}</p>
                <Link href="/contact-us" className="text-[#f5c518] font-semibold hover:underline block mt-1">
                  {t("contactUsPageLink")}
                </Link>
              </TealBox>
              <p className="text-xs text-gray-500 text-center">{t("offlineChannelsNote")}</p>
            </div>
          </div>

          <div>
            <BankIcon className="w-8 h-8 text-[#0a3a52] mx-auto mb-3" />
            <div className="space-y-3">
              <TealBox>
                <NumberBadge n={1} />
                <p>{t("delayedCompensationDesc")}</p>
                <a href="#" className="text-[#f5c518] font-semibold hover:underline block mt-1">
                  {t("learnMoreLink")}
                </a>
              </TealBox>
              <TealBox>
                <NumberBadge n={2} />
                <p>{t("compensationTableDesc")}</p>
                <p className="mt-1">
                  <Link href="/login" className="text-[#f5c518] font-semibold hover:underline">
                    {t("logInLink")}
                  </Link>{" "}
                  {t("loginIfHaveAccount")}{" "}
                  <Link href="/register" className="text-[#f5c518] font-semibold hover:underline">
                    {t("signUpLink")}
                  </Link>{" "}
                  {t("signUpToAccessReport")}
                </p>
              </TealBox>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 mt-8">
          <WarningTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-700">{t("pointRbiGuidelines")}</p>
        </div>
      </div>
    </section>
  );
}
