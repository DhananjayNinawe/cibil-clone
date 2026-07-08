"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

/** Offer expiry — midnight at the end of 31st July 2026. */
const OFFER_DEADLINE = new Date("2026-07-31T23:59:59+05:30").getTime();

function useCountdown(deadline: number) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [deadline]);

  if (remaining === null) return null;
  const totalMinutes = Math.floor(remaining / 60_000);
  return {
    days: Math.floor(totalMinutes / (60 * 24)),
    hours: Math.floor((totalMinutes % (60 * 24)) / 60),
    minutes: totalMinutes % 60,
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {String(value).padStart(2, "0").split("").map((d, i) => (
          <span
            key={i}
            className="bg-white text-[#0a3a52] text-lg font-bold rounded w-7 h-9 flex items-center justify-center"
          >
            {d}
          </span>
        ))}
      </div>
      <span className="text-white/80 text-[10px] uppercase tracking-wide mt-1">{label}</span>
    </div>
  );
}

function OfferBanner() {
  const { t } = useLanguage();
  const time = useCountdown(OFFER_DEADLINE);

  return (
    <div className="bg-[#0a3a52] py-5 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
        <div className="flex flex-col items-center lg:items-start gap-3">
          <p className="text-white text-xl sm:text-2xl font-semibold text-center lg:text-left">
            {t("ccrfOfferPrefix")} <span className="text-[#f5c518] font-extrabold">{t("ccrfOfferPercent")}</span>{" "}
            {t("ccrfOfferSuffix")}
          </p>
          <div className="flex items-center gap-3">
            <span className="bg-white text-gray-900 text-sm font-bold rounded px-4 py-2">{t("ccrfUseCode")}</span>
            <span className="border border-white/70 text-white text-sm font-bold rounded px-4 py-2">{t("ccrfCode")}</span>
          </div>
          <p className="text-white/70 text-xs">{t("ccrfOfferValid")}</p>
        </div>

        <div className="flex flex-col items-center lg:items-end gap-3">
          <p className="text-[#f5c518] text-lg font-bold tracking-wide">{t("ccrfLimitedOffer")}</p>
          <div className="flex items-start gap-4">
            <CountdownUnit value={time?.days ?? 0} label={t("ccrfCountdownDay")} />
            <CountdownUnit value={time?.hours ?? 0} label={t("ccrfCountdownHr")} />
            <CountdownUnit value={time?.minutes ?? 0} label={t("ccrfCountdownMin")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DifferenceTable() {
  const { t } = useLanguage();
  return (
    <div className="bg-gray-100 rounded-lg p-4 sm:p-6 my-4">
      <Image
        src="https://www.cibil.com/faq/company-credit-report/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image_1566811398.coreimg.75.1440.jpeg/1688980173202/faq-ccr-10cr-50cr.jpeg"
        alt={`${t("ccrfDiffTitle")} ${t("ccrfDiffRankHeader")} ${t("ccrfDiffScoreHeader")}`}
        width={720}
        height={1100}
        unoptimized
        sizes="(max-width: 640px) 100vw, 640px"
        className="w-full h-auto mx-auto"
      />
    </div>
  );
}

export default function CcrfContent() {
  const { t } = useLanguage();

  return (
    <>
      <OfferBanner />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        <div>
          <QaBlock q={t("ccrfQ1")}>
            <p>{t("ccrfA1")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ2")}>
            <p>{t("ccrfA2")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ3")}>
            <p>{t("ccrfA3")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ4")}>
            <p>
              {t("ccrfA4")}{" "}
              <a href="#" className="text-blue-700 hover:underline">
                {t("ccrfA4Link")}
              </a>
            </p>
          </QaBlock>
          <QaBlock q={t("ccrfQ5")}>
            <p>{t("ccrfA5")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ6")}>
            <DifferenceTable />
          </QaBlock>
          <QaBlock q={t("ccrfQ7")}>
            <p>{t("ccrfA7")}</p>
          </QaBlock>
          <QaBlock q={t("ccrfQ8")}>
            <p>
              {t("ccrfA8Prefix")}{" "}
              <Link href="/company-dispute-resolution" className="text-blue-700 hover:underline">
                {t("ccrfA8Link")}
              </Link>{" "}
              {t("ccrfA8Suffix")}
            </p>
          </QaBlock>
        </div>

        <div className="flex justify-center lg:justify-start">
          <div className="lg:sticky lg:top-40">
            <CreditSidebarCard variant="rank" />
          </div>
        </div>
      </section>
    </>
  );
}
