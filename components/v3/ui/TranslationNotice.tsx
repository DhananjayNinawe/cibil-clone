"use client";

import { useV3 } from "@/lib/v3/useV3";
import Callout from "@/components/v3/ui/Callout";

/**
 * The legal-translation notice — V3's rendering of V1's `components/shared/TranslationNotice`.
 *
 * The Terms, the Privacy Policy and the Gist of the RBI Scheme are binding legal instruments. They
 * are translated so they can actually be *read* in every language, but a translation of a contract
 * must never quietly become the contract: on every locale except English, the document carries this
 * notice saying the English original prevails. On English there is nothing to disclaim, so it
 * renders nothing — same key, same behaviour as V1, set as a marginal note rather than a tinted box.
 *
 * `regulatory` is the one tone in the Callout scale reserved for a disclosure of exactly this kind:
 * a clay rule down the left edge, no fill, no icon. It reads as part of the document, which is what
 * a legal caveat is.
 */
export default function TranslationNotice({ className = "" }: { className?: string }) {
  const { t, language } = useV3();

  if (language === "en") return null;

  return (
    <Callout tone="regulatory" className={className}>
      {t("legalTranslationNotice")}
    </Callout>
  );
}
