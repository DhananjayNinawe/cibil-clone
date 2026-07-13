"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

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
        {String(value)
          .padStart(2, "0")
          .split("")
          .map((d, i) => (
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

/** `inset` renders the banner as a card inside the page grid instead of a full-bleed band. */
export default function OfferBanner({ inset = false }: { inset?: boolean }) {
  const { t } = useLanguage();
  const time = useCountdown(OFFER_DEADLINE);

  const banner = (
    <div className={`bg-[#0a3a52] ${inset ? "px-6 sm:px-10 py-7" : "py-5 px-4"}`}>
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

  if (!inset) return banner;

  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">{banner}</div>;
}
