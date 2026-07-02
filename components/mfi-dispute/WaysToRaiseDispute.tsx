"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MailIcon, HeadsetIcon, BankIcon } from "@/components/icons";

function WayCard({
  icon,
  title,
  lines,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  lines: React.ReactNode[];
  note?: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-[#0a3a52] flex items-center justify-center mb-4">{icon}</div>
      <p className="font-bold text-gray-900 mb-2">{title}</p>
      {lines.map((line, i) => (
        <p key={i} className="text-sm text-gray-700">
          {line}
        </p>
      ))}
      {note && <p className="text-xs text-gray-500 mt-4">{note}</p>}
    </div>
  );
}

export default function WaysToRaiseDispute() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-bold text-gray-900 text-lg mb-8">{t("waysToRaiseDisputeHeading")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <WayCard
            icon={<MailIcon />}
            title={t("writeToUsTitle")}
            lines={[
              <a key="email" href={`mailto:${t("registeredOfficeEmail")}`} className="text-blue-700 hover:underline">
                {t("mfiWriteToUsEmail")}
              </a>,
            ]}
            note={t("mfiWriteToUsNote")}
          />
          <WayCard
            icon={<HeadsetIcon />}
            title={t("callUsTitle")}
            lines={[t("mfiHelplineNumber")]}
            note={t("mfiCallTimings")}
          />
          <WayCard
            icon={<BankIcon className="w-7 h-7 text-white" />}
            title={t("visitUsTitle")}
            lines={[t("mfiVisitAddress")]}
            note={t("mfiVisitTimings")}
          />
        </div>
      </div>
    </section>
  );
}
