"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PersonContactIcon, ClockIcon, MailIcon } from "@/components/icons";

export default function DontRecogniseSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-10">{t("dontRecogniseHeading")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <PersonContactIcon className="w-7 h-7 text-[#00b0f0] mb-3" />
            <p className="font-bold text-gray-900 mb-2">{t("contactLenderTitle")}</p>
            <p className="text-sm text-gray-600">
              {t("contactLenderDescPrefix")}{" "}
              <Link href="/nodal-officer-list" className="text-blue-700 hover:underline">
                {t("hereLowercase")}
              </Link>
            </p>
          </div>

          <div>
            <ClockIcon className="w-7 h-7 text-[#00b0f0] mb-3" />
            <p className="font-bold text-gray-900 mb-2">{t("raiseDisputeCibilTitle")}</p>
            <p className="text-sm text-gray-600">
              {t("raiseDisputeCibilDesc")}{" "}
              <Link href="/consumer-dispute-resolution" className="text-blue-700 hover:underline font-semibold">
                {t("clickHereBold")}
              </Link>
            </p>
          </div>

          <div>
            <MailIcon className="w-7 h-7 text-[#00b0f0] mb-3" />
            <p className="font-bold text-gray-900 mb-2">{t("needHelpTitle")}</p>
            <p className="text-sm text-gray-600">
              {t("needHelpDescPrefix")}{" "}
              <Link href="/contact-us" className="text-blue-700 hover:underline">
                {t("disputeClickHere")}
              </Link>{" "}
              {t("needHelpDescSuffix")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
