"use client";

import { useLanguage } from "@/context/LanguageContext";
import { HeadsetIcon, MailIcon, BankIcon } from "@/components/icons";

function ReachItem({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#0a3a52] flex items-center justify-center mb-4">{icon}</div>
      <p className="font-bold text-gray-900 mb-2">{title}</p>
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
    </div>
  );
}

export default function WaysToReachUsSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-10">{t("waysToReachUsHeading")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <ReachItem icon={<HeadsetIcon />} title={t("callUsTitle")}>
          <p>{t("concernsCallTimings")}</p>
          <p>{t("mfiCallTimings")}</p>
        </ReachItem>

        <ReachItem icon={<MailIcon />} title={t("writeToUsTitle")}>
          <a href="#" className="text-blue-700 hover:underline font-semibold">
            {t("submitRequestLink")}
          </a>
        </ReachItem>

        <ReachItem icon={<MailIcon />} title={t("emailTitle")}>
          <p>{t("concernsEmailLabel")}</p>
          <a href={`mailto:${t("concernsEmail")}`} className="text-blue-700 hover:underline">
            {t("concernsEmail")}
          </a>
          <p className="font-bold mt-2">{t("mandatoryInfoHeading")}</p>
          <p>{t("mandatoryInfoDesc")}</p>
        </ReachItem>

        <ReachItem icon={<BankIcon className="w-7 h-7 text-white" />} title={t("walkInSupportTitle")}>
          <p>{t("walkInTimings")}</p>
          <p className="font-bold mt-2">{t("addressLabel")}</p>
          <p>{t("concernsOfficeAddress")}</p>
        </ReachItem>
      </div>

      <div className="border-2 border-[#00b0f0]/40 rounded-lg p-6 mt-12 max-w-md flex items-start gap-4">
        <MailIcon className="w-8 h-8 text-[#00b0f0] shrink-0" />
        <div>
          <p className="font-bold text-gray-900 mb-1">{t("sendLetterHeading")}</p>
          <p className="text-sm text-gray-700">{t("sendLetterDesc")}</p>
          <p className="text-sm text-gray-700">{t("sendLetterAddress")}</p>
        </div>
      </div>
    </section>
  );
}
