"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { PlayIcon } from "@/components/icons";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";

function QaBlock({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-gray-900 mb-3">{q}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

function RegionalLangs() {
  const { t } = useLanguage();
  const langs: TranslationKey[] = ["langTamil", "langMalayalam", "langKannada", "langHindi", "langTelugu"];
  return (
    <p className="text-sm">
      {langs.map((l, i) => (
        <span key={l}>
          {i > 0 && <span className="text-gray-400"> | </span>}
          <a href="#" className="text-blue-700 hover:underline">
            {t(l)}
          </a>
        </span>
      ))}
    </p>
  );
}

function VideoThumb({ videoId, title }: { videoId: string; title: string }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Play video: ${title}`}
      className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black my-3"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 448px"
        className="object-cover"
      />
      <span className="relative w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
        <PlayIcon className="w-7 h-7 text-red-600 ml-0.5" />
      </span>
    </a>
  );
}

export default function UcsContent() {
  const { t } = useLanguage();

  const sections: [TranslationKey, TranslationKey][] = [
    ["ucsSectionScore", "ucsSectionScoreDesc"],
    ["ucsSectionPersonal", "ucsSectionPersonalDesc"],
    ["ucsSectionContact", "ucsSectionContactDesc"],
    ["ucsSectionEmployment", "ucsSectionEmploymentDesc"],
    ["ucsSectionAccount", "ucsSectionAccountDesc"],
    ["ucsSectionEnquiry", "ucsSectionEnquiryDesc"],
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
      <div>
        <QaBlock q={t("ucsQ1")}>
          <p>{t("ucsA1")}</p>
        </QaBlock>

        <QaBlock q={t("ucsQ2")}>
          <p>{t("ucsA2")}</p>
        </QaBlock>

        <QaBlock q={t("ucsQ3")}>
          <p>
            {t("ucsA3Prefix")}{" "}
            <a href="#" className="text-blue-700 hover:underline">
              {t("ucsA3Link")}
            </a>
            {t("ucsA3Suffix")}
          </p>
          <p>
            <a href="#" className="text-blue-700 hover:underline">
              {t("ucsVideoLinkLine")}
            </a>
          </p>
          <VideoThumb videoId="7cHGllcvWjY" title={t("ucsVideoReadReportTitle")} />
          <p>{t("ucsRegionalLangs")}</p>
          <RegionalLangs />
        </QaBlock>

        <QaBlock q={t("ucsQ4")}>
          <p>
            {t("ucsA4Prefix")}{" "}
            <a href="#" className="text-blue-700 hover:underline">
              {t("ucsA4Link")}
            </a>{" "}
            {t("ucsA4Suffix")}
          </p>
          <ul className="space-y-3 list-disc pl-5">
            {sections.map(([title, desc]) => (
              <li key={title}>
                <span className="font-bold">{t(title)}</span>
                <br />
                {t(desc)}
              </li>
            ))}
          </ul>
        </QaBlock>

        <QaBlock q={t("ucsQ5")}>
          <p>
            {t("ucsA5Prefix")}{" "}
            <a href="#" className="text-blue-700 hover:underline">
              {t("ucsA5Link")}
            </a>{" "}
            {t("ucsA5Suffix")}
          </p>
        </QaBlock>

        <QaBlock q={t("ucsQ6")}>
          <p>{t("ucsA6")}</p>
        </QaBlock>
        <QaBlock q={t("ucsQ7")}>
          <p>{t("ucsA7")}</p>
        </QaBlock>
        <QaBlock q={t("ucsQ8")}>
          <p>{t("ucsA8Para1")}</p>
          <p className="italic">
            {t("ucsA8Para2Italic")}{" "}
            <a href="/choose-subscription" className="text-blue-700 hover:underline">
              https://www.cibil.com/choose-subscription
            </a>
            )
          </p>
        </QaBlock>
        <QaBlock q={t("ucsQ9")}>
          <p>
            {t("ucsA9")}{" "}
            <a href="/choose-subscription" className="text-blue-700 hover:underline">
              https://www.cibil.com/choose-subscription
            </a>
          </p>
        </QaBlock>
        <QaBlock q={t("ucsQ10")}>
          <VideoThumb videoId="FS08WcDyBkA" title={t("ucsVideoEnquiryTitle")} />
          <p>{t("ucsEnquiriesRegional")}</p>
          <RegionalLangs />
        </QaBlock>
        <QaBlock q={t("ucsQ11")}>
          <p>
            {t("ucsA11")}{" "}
            <a href="#" className="text-blue-700 hover:underline">
              {t("ucsDownloadBrochure")}
            </a>
          </p>
        </QaBlock>
      </div>

      <div className="flex justify-center lg:justify-start">
        <div className="lg:sticky lg:top-40">
          <CreditSidebarCard variant="subscribe" />
        </div>
      </div>
    </section>
  );
}
