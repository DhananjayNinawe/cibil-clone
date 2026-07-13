"use client";

import { useV3 } from "@/lib/v3/useV3";
import Button from "@/components/v3/ui/Button";
import Rule from "@/components/v3/ui/Rule";

/**
 * The accept / decline pair that closes the suit-filed and non-suit-filed terms.
 *
 * V1 gates its published default data behind these two controls, and both are painted the same
 * gold — which tells the reader nothing about which one is the way forward. Here the affirmative is
 * the stamped solid block and the decline steps back to an outline: same two actions, same two
 * labels from the catalog, only the hierarchy is new. Like V1's, they are inert — there is no
 * consent endpoint in this codebase, and inventing one would be inventing behaviour.
 *
 * They sit below a strong rule because that is what they are: the line at the foot of a document
 * that you sign under.
 */
export default function ConsentControls() {
  const { t } = useV3();

  return (
    <div className="mt-16">
      <Rule strong />

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button variant="solid" size="lg">
          {t("iAgreeBtn")}
        </Button>
        <Button variant="outline" size="lg">
          {t("iDisagreeBtn")}
        </Button>
      </div>
    </div>
  );
}
