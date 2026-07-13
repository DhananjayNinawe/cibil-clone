"use client";

import { useV2 } from "@/lib/v2/useV2";
import Button from "@/components/v2/ui/Button";

/**
 * The accept / decline pair that closes both the suit-filed and non-suit-filed terms.
 *
 * V1 paints both buttons gold, which tells the reader nothing about which one is the way forward.
 * Here the affirmative keeps the gold — V1's conversion colour — and the decline steps back to a
 * ghost. Same two actions, same two labels; only the hierarchy is new. Like V1's, they are inert:
 * there is no consent endpoint behind them.
 */
export default function ConsentControls() {
  const { t } = useV2();

  return (
    <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-[var(--v2-line)] pt-10">
      <Button variant="primary" magnetic>
        {t("iAgreeBtn")}
      </Button>
      <Button variant="ghost">{t("iDisagreeBtn")}</Button>
    </div>
  );
}
