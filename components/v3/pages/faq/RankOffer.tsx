"use client";

import { useEffect, useState } from "react";
import { useV3 } from "@/lib/v3/useV3";
import { Container, Section } from "@/components/v3/ui/Layout";
import Reveal from "@/components/v3/motion/Reveal";

/** Offer expiry — midnight at the end of 31st July 2026. The same deadline V1's banner counts to. */
const OFFER_DEADLINE = new Date("2026-07-31T23:59:59+05:30").getTime();

function useCountdown(deadline: number) {
  // null until the effect runs: the server has no "now", and rendering one would hydrate wrong.
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [deadline]);

  const minutes = Math.floor((remaining ?? 0) / 60_000);
  return {
    days: Math.floor(minutes / (60 * 24)),
    hours: Math.floor((minutes % (60 * 24)) / 60),
    minutes: minutes % 60,
  };
}

/**
 * The CIBIL Rank offer, as a stamped notice.
 *
 * V1 runs a navy bar with white flip-clock tiles and a yellow pill. V3 sets the same offer on an
 * ink band: the discount is a serif figure, the promo code is a mono token boxed by a hairline,
 * and the countdown is three tabular numerals under mono labels — a printed deadline, not a
 * casino clock. Nothing pulses.
 */
export default function RankOffer() {
  const { t } = useV3();
  const time = useCountdown(OFFER_DEADLINE);

  const units: [number, string][] = [
    [time.days, t("ccrfCountdownDay")],
    [time.hours, t("ccrfCountdownHr")],
    [time.minutes, t("ccrfCountdownMin")],
  ];

  return (
    <Section space="sm" tone="ink">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal variant="rise">
            <p className="v3-folio">{t("ccrfLimitedOffer")}</p>

            <p className="v3-h2 mt-5 text-balance">
              {t("ccrfOfferPrefix")} <span className="v3-em">{t("ccrfOfferPercent")}</span>{" "}
              {t("ccrfOfferSuffix")}
            </p>

            <p className="mt-7 flex flex-wrap items-center gap-4">
              <span className="v3-folio">{t("ccrfUseCode")}</span>
              <span className="v3-num border border-[var(--v3-line-3)] px-4 py-2 text-sm font-medium tracking-[0.14em] text-[var(--v3-fg)]">
                {t("ccrfCode")}
              </span>
            </p>

            <p className="v3-caption mt-4">{t("ccrfOfferValid")}</p>
          </Reveal>

          <Reveal variant="rise" delay={120}>
            <dl className="flex items-end gap-8 border-t border-[var(--v3-line-2)] pt-6 lg:justify-end">
              {units.map(([value, label]) => (
                <div key={label}>
                  <dd className="v3-num text-4xl leading-none text-[var(--v3-fg)]">
                    {String(value).padStart(2, "0")}
                  </dd>
                  <dt className="v3-folio mt-2">{label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
