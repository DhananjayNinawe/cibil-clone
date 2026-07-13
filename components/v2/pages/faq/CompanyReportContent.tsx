"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import FaqLayout from "@/components/v2/pages/faq/FaqLayout";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import Badge from "@/components/v2/ui/Badge";
import Plate from "@/components/v2/ui/Plate";
import { Container, Section } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/P-Custom-Scorecards-2hero-D-310816.jpg";

/** Offer expiry — midnight at the end of 31st July 2026, same deadline V1's banner counts down to. */
const OFFER_DEADLINE = new Date("2026-07-31T23:59:59+05:30").getTime();

function useCountdown(deadline: number) {
  // Null until the effect runs: the server has no "now" that will still be true on the client,
  // so the first paint deliberately renders zeros rather than a figure that hydrates differently.
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
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5">
        {String(value)
          .padStart(2, "0")
          .split("")
          .map((digit, index) => (
            <span
              key={index}
              className="v2-rim flex h-11 w-9 items-center justify-center rounded-[var(--v2-r-sm)] bg-[var(--v2-elev-2)] text-lg font-bold tabular-nums text-[var(--v2-text)]"
            >
              {digit}
            </span>
          ))}
      </div>
      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--v2-text-3)]">{label}</span>
    </div>
  );
}

/** V1's navy offer banner, re-cut as a glass band that belongs on the dark canvas. */
function OfferBand() {
  const { t } = useV2();
  const time = useCountdown(OFFER_DEADLINE);

  return (
    <Section space="sm" tone="canvas">
      <Container>
        <Reveal variant="up">
          <div className="v2-glass v2-rim relative flex flex-col items-center gap-8 overflow-hidden rounded-[var(--v2-r-lg)] p-8 sm:p-10 lg:flex-row lg:justify-between">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(245,197,24,0.22),transparent_65%)] blur-2xl"
            />

            <div className="relative flex flex-col items-center gap-4 lg:items-start">
              <p className="text-center text-2xl font-light leading-tight text-[var(--v2-text)] sm:text-3xl lg:text-left">
                {t("ccrfOfferPrefix")}{" "}
                <span className="font-bold text-[var(--v2-gold)]">{t("ccrfOfferPercent")}</span>{" "}
                {t("ccrfOfferSuffix")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v2-text-3)]">
                  {t("ccrfUseCode")}
                </span>
                <span className="rounded-full border border-dashed border-[var(--v2-gold)] px-4 py-1.5 text-sm font-bold tracking-[0.18em] text-[var(--v2-gold)]">
                  {t("ccrfCode")}
                </span>
              </div>
              <p className="text-xs text-[var(--v2-text-3)]">{t("ccrfOfferValid")}</p>
            </div>

            <div className="relative flex flex-col items-center gap-4 lg:items-end">
              <Badge tone="gold" pulse>
                {t("ccrfLimitedOffer")}
              </Badge>
              <div className="flex items-start gap-4">
                <CountdownUnit value={time?.days ?? 0} label={t("ccrfCountdownDay")} />
                <CountdownUnit value={time?.hours ?? 0} label={t("ccrfCountdownHr")} />
                <CountdownUnit value={time?.minutes ?? 0} label={t("ccrfCountdownMin")} />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * Rank vs Score.
 *
 * V1 answers this question with a JPEG of a table — unreadable to a screen reader, unselectable,
 * and unusable on a phone. Every line of that table already exists as a translated key (V1 only
 * ever used them to build the image's alt text), so V2 sets it as real, side-by-side type.
 */
const RANK_ROWS: TranslationKey[] = [
  "ccrfDiffRank1",
  "ccrfDiffRank2",
  "ccrfDiffRank3",
  "ccrfDiffRank4",
];
const SCORE_ROWS: TranslationKey[] = ["ccrfDiffScore1", "ccrfDiffScore2", "ccrfDiffScore4"];

function DifferenceColumns() {
  const { t } = useV2();

  const column = (heading: string, rows: TranslationKey[], accent: string) => (
    <div className="rounded-[var(--v2-r-md)] border border-[var(--v2-line)] bg-[var(--v2-surface)] p-6">
      <p className={`v2-eyebrow ${accent}`}>{heading}</p>
      <ul className="mt-5">
        {rows.map((row) => (
          <li key={row}>{t(row)}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="my-2">
      <p className="v2-eyebrow text-[var(--v2-text-3)]">{t("ccrfDiffTitle")}</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {column(t("ccrfDiffRankHeader"), RANK_ROWS, "text-[var(--v2-gold)]")}
        {column(t("ccrfDiffScoreHeader"), SCORE_ROWS, "text-[var(--v2-cyan)]")}
      </div>
    </div>
  );
}

export default function CompanyReportContent() {
  const { t } = useV2();

  const items: AccordionItem[] = [
    { id: "ccrfQ1", question: t("ccrfQ1"), answer: <p>{t("ccrfA1")}</p> },
    { id: "ccrfQ2", question: t("ccrfQ2"), answer: <p>{t("ccrfA2")}</p> },
    { id: "ccrfQ3", question: t("ccrfQ3"), answer: <p>{t("ccrfA3")}</p> },
    {
      id: "ccrfQ4",
      question: t("ccrfQ4"),
      answer: (
        <p>
          {t("ccrfA4")} <Link href={toV2("/register")}>{t("ccrfA4Link")}</Link>
        </p>
      ),
    },
    { id: "ccrfQ5", question: t("ccrfQ5"), answer: <p>{t("ccrfA5")}</p> },
    { id: "ccrfQ6", question: t("ccrfQ6"), answer: <DifferenceColumns /> },
    { id: "ccrfQ7", question: t("ccrfQ7"), answer: <p>{t("ccrfA7")}</p> },
    {
      id: "ccrfQ8",
      question: t("ccrfQ8"),
      answer: (
        <p>
          {t("ccrfA8Prefix")}{" "}
          <Link href={toV2("/company-dispute-resolution")}>{t("ccrfA8Link")}</Link>{" "}
          {t("ccrfA8Suffix")}
        </p>
      ),
    },
  ];

  return (
    <FaqLayout
      slug="company-credit-report"
      eyebrow={t("megaBusinessesHeading")}
      title={t("ccrfHeroTitle")}
      tone="gold"
      size="md"
      panel="rank"
      band={<OfferBand />}
      cta={{ label: t("getRankReportBtn"), href: toV2("/register") }}
      media={<Plate src={HERO_IMAGE} alt={t("ccrfHeroTitle")} width={720} height={480} priority />}
    >
      <Accordion items={items} multiple defaultOpen={0} />
    </FaqLayout>
  );
}
