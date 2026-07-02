"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";

function QaBlock({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-gray-900 mb-3">{q}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function LrdContent() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
      <div>
        <QaBlock q={t("lrdQ1")}>
          <p>{t("lrdA1")}</p>
        </QaBlock>

        <QaBlock q={t("lrdQ2")}>
          <ul className="space-y-3 list-disc pl-5">
            <li>
              <span className="font-bold">{t("lrdA2Ownership")}</span>
              <br />
              {t("lrdA2OwnershipDesc")}
            </li>
            <li>
              <span className="font-bold">{t("lrdA2Incorrect")}</span>
              <br />
              {t("lrdA2IncorrectDesc")}
            </li>
            <li>
              <span className="font-bold">{t("lrdA2Inaccurate")}</span>
              <br />
              {t("lrdA2InaccurateDesc")}{" "}
              <a href="#" className="text-blue-700 hover:underline">
                {t("lrdA2ClickHere")}
              </a>{" "}
              {t("lrdA2ClickHereSuffix")}
            </li>
          </ul>
        </QaBlock>

        <QaBlock q={t("lrdQ3")}>
          <p>{t("lrdA3")}</p>
        </QaBlock>

        <QaBlock q={t("lrdQ4")}>
          <p>{t("lrdA4")}</p>
        </QaBlock>

        <QaBlock q={t("lrdQ5")}>
          <p>{t("lrdA5Intro")}</p>
          <div className="h-16 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400">
            [ Dispute process diagram ]
          </div>
          <p>
            <a href="#" className="text-blue-700 hover:underline">
              {t("lrdA5VideoLink")}
            </a>
          </p>
          <p className="italic">{t("lrdA5Note")}</p>
          <p>
            <span className="font-bold">{t("lrdA5Received")}</span> {t("lrdA5ReceivedDesc")}
          </p>
          <p>{t("lrdA5Once")}</p>
          <p>{t("lrdA5Time")}</p>
          <p>
            <Link href="/consumer-dispute-resolution" className="text-blue-700 hover:underline">
              {t("lrdA5UnderstandLink")}
            </Link>{" "}
            {t("lrdA5UnderstandSuffix")}
          </p>
        </QaBlock>

        <QaBlock q={t("lrdQ6")}>
          <p>{t("lrdA6")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ7")}>
          <p>{t("lrdA7")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ8")}>
          <p>{t("lrdA8Para1")}</p>
          <p>{t("lrdA8Para2")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ9")}>
          <p>{t("lrdA9")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ10")}>
          <p>{t("lrdA10")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ11")}>
          <p>{t("lrdA11")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ12")}>
          <p>{t("lrdA12")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ13")}>
          <p>{t("lrdA13")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ14")}>
          <p>{t("lrdA14")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ15")}>
          <p>{t("lrdA15")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ16")}>
          <p>{t("lrdA16")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ17")}>
          <p>{t("lrdA17Intro")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("lrdA17Bullet1")}</li>
            <li>{t("lrdA17Bullet2")}</li>
          </ul>
          <p>{t("lrdA17Suffix")}</p>
        </QaBlock>
        <QaBlock q={t("lrdQ18")}>
          <p>{t("lrdA18")}</p>
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
