"use client";

import { useLanguage } from "@/context/LanguageContext";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";

function QaBlock({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-bold text-gray-900 mb-3">{q}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function ScoreSimContent() {
  const { t } = useLanguage();

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
        <div>
          <QaBlock q={t("ssQ1")}>
            <p>{t("ssA1")}</p>
          </QaBlock>

          <QaBlock q={t("ssQ2")}>
            <p>{t("ssA2Intro")}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t("ssA2Bullet1")}</li>
              <li>{t("ssA2Bullet2")}</li>
              <li>{t("ssA2Bullet3")}</li>
              <li>{t("ssA2Bullet4")}</li>
              <li>{t("ssA2Bullet5")}</li>
            </ul>
            <p>{t("ssA2Outro")}</p>
          </QaBlock>

          <QaBlock q={t("ssQ3")}>
            <p>
              {t("ssA3Para1Prefix")}{" "}
              <a href="#" className="text-blue-700 hover:underline">
                {t("ssA3Para1Link")}
              </a>
              .
            </p>
            <p>
              {t("ssA3Para2Prefix")}{" "}
              <a href="#" className="text-blue-700 hover:underline">
                {t("ssA3Para2Link")}
              </a>
            </p>
          </QaBlock>

          <QaBlock q={t("ssQ4")}>
            <p>{t("ssA4")}</p>
          </QaBlock>

          <QaBlock q={t("ssQ5")}>
            <p>{t("ssA5")}</p>
          </QaBlock>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CreditSidebarCard variant="subscribe" />
        </div>
      </section>

      <div className="border-t border-b border-[#00b0f0]/30 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="italic font-semibold">{t("ssDisclaimerLabel")}</span> {t("ssDisclaimer")}
          </p>
        </div>
      </div>
    </>
  );
}
