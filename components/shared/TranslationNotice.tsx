"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Shown above the Terms, Privacy Policy and RBI-scheme documents when the reader is not on English.
 *
 * Those three are binding legal texts. We translate them so they can actually be *read* in every
 * language, but a translation of a contract must not silently become the contract — so each
 * translated page carries this notice saying the English original prevails. On English there is
 * nothing to disclaim, so the banner renders nothing.
 */
export default function TranslationNotice() {
  const { t, language } = useLanguage();

  if (language === "en") return null;

  return (
    <p
      role="note"
      className="mb-6 rounded border-l-4 border-[#00b0f0] bg-[#e6f7fd] px-4 py-3 text-sm text-gray-700"
    >
      {t("legalTranslationNotice")}
    </p>
  );
}
