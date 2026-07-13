"use client";

import { useState } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";

export interface PlanRow {
  /** Stable id for the radio group — not user-visible, never translated. */
  key: string;
  name: TranslationKey;
  desc: TranslationKey;
  price: TranslationKey;
  /** "one-time", "for 1 month" — the unit the price is quoted in. */
  priceNote?: TranslationKey;
  recommended?: boolean;
}

interface PlanLedgerProps {
  plans: PlanRow[];
  /** The radio group's `name`. A DOM token, not copy. */
  group: string;
  /** Pre-translated accessible name for the group of options. */
  legend: string;
  className?: string;
}

/**
 * The plan options, set as a ruled comparison rather than three cards in a row.
 *
 * A price list is a ledger: the names run down the left, the figures down the right in the mono
 * voice, and a hairline separates one entry from the next. Read that way the three plans can
 * actually be *compared* — ₹0 against ₹118 against ₹550, aligned on the same column — which is
 * exactly what three equal rounded boxes make impossible.
 *
 * The recommended option is marked the way a printed table marks one: a rule down its edge and a
 * label above the name. No badge, no fill, no glow. Selecting a row draws its bottom rule in ink.
 */
export default function PlanLedger({ plans, group, legend, className = "" }: PlanLedgerProps) {
  const { t } = useV3();
  const [selected, setSelected] = useState(plans[0]?.key ?? "");

  return (
    <fieldset className={`m-0 border-0 p-0 ${className}`}>
      <legend className="sr-only">{legend}</legend>

      <div className="border-t border-[var(--v3-line-3)]">
        {plans.map((plan) => {
          const isSelected = plan.key === selected;

          return (
            <label
              key={plan.key}
              className={`v3-row relative grid cursor-pointer grid-cols-[1rem_1fr_auto] items-start gap-x-5 border-b py-6 pl-5 sm:gap-x-8 sm:py-7 ${
                isSelected ? "border-[var(--v3-fg)]" : "border-[var(--v3-line)]"
              }`}
            >
              {/* The recommendation, as a rule down the edge of the entry. */}
              {plan.recommended && (
                <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-[var(--v3-accent)]" />
              )}

              <input
                type="radio"
                name={group}
                value={plan.key}
                checked={isSelected}
                onChange={() => setSelected(plan.key)}
                className="v3-focus mt-1.5 h-[14px] w-[14px] shrink-0 cursor-pointer appearance-none border border-[var(--v3-line-3)] transition-colors checked:border-[var(--v3-accent)] checked:bg-[var(--v3-accent)]"
              />

              <span className="min-w-0">
                {plan.recommended && (
                  <span className="v3-folio mb-2 block text-[var(--v3-accent)]">
                    {t("recommendedBadge")}
                  </span>
                )}
                <span className="block text-base font-medium text-[var(--v3-fg)]">{t(plan.name)}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-[var(--v3-fg-2)]">
                  {t(plan.desc)}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="v3-num block text-xl text-[var(--v3-fg)] sm:text-2xl">
                  {t(plan.price)}
                </span>
                {plan.priceNote && <span className="v3-caption mt-1.5 block">{t(plan.priceNote)}</span>}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
