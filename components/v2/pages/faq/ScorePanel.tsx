"use client";

import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Button from "@/components/v2/ui/Button";
import Card from "@/components/v2/ui/Card";
import { GaugeIcon } from "@/components/icons";

export type ScorePanelVariant = "score-report" | "subscribe" | "rank";

interface VariantConfig {
  subtitle: TranslationKey;
  cta: TranslationKey;
  href: string;
}

/** Same three variants, same copy and same destinations as V1's CreditSidebarCard. */
const VARIANTS: Record<ScorePanelVariant, VariantConfig> = {
  "score-report": {
    subtitle: "sidebarUnlimitedAccess",
    cta: "sidebarGetScoreReportBtn",
    href: toV2("/register"),
  },
  subscribe: {
    subtitle: "sidebarMonitorReady",
    cta: "sidebarSubscribeNowBtn",
    href: toV2("/choose-subscription"),
  },
  rank: {
    subtitle: "sidebarRankReport",
    cta: "sidebarGetYoursNowBtn",
    href: toV2("/register"),
  },
};

/**
 * The conversion card that rides alongside every FAQ.
 *
 * V1 stacks a white cap on a solid navy block and calls it a card. Here it is a glass panel
 * lit from within: a cyan dial mark, the question, the promise, the gold pill. It sits in the
 * sticky rail on desktop and lands under the answers on a phone — either way it is the one
 * warm thing on a cold page, which is exactly what a conversion surface should be.
 */
export default function ScorePanel({ variant = "subscribe" }: { variant?: ScorePanelVariant }) {
  const { t } = useV2();
  const config = VARIANTS[variant];

  return (
    <Card as="aside" spotlight padding="lg" className="text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,197,24,0.28),transparent_65%)] blur-2xl"
      />

      <div className="relative">
        <span
          aria-hidden
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(0,176,240,0.35)] bg-[var(--v2-cyan-dim)] text-[var(--v2-cyan)]"
        >
          <GaugeIcon className="h-6 w-6" />
        </span>

        <p className="mt-5 text-[17px] font-bold leading-snug text-[var(--v2-text)]">
          {t("sidebarWaitTitle")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--v2-text-2)]">{t(config.subtitle)}</p>

        <Button href={config.href} size="sm" full arrow className="mt-7">
          {t(config.cta)}
        </Button>
      </div>
    </Card>
  );
}
