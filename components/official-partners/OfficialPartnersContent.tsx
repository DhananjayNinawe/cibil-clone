"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { renderRichText } from "@/lib/richText";

const CIBIL_LOGO_URL = "https://www.cibil.com/content/dam/cibil/content-fragments/header/cibil-logo.png";

/** Single artwork holding every partner logo, as published on cibil.com. */
const PARTNER_LOGOS_URL =
  "https://www.cibil.com/official-partners/_jcr_content/root/contentcontainer/pagesection/image.coreimg.75.1440.png/1781601071300/logo16jun.png";

export default function OfficialPartnersContent() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-360 px-6 py-10 sm:px-8 lg:px-11">
      <h1 className="text-[26px] font-bold leading-snug text-gray-900">{t("officialPartnersTitle")}</h1>

      <Image
        src={CIBIL_LOGO_URL}
        alt="CIBIL - Part of TransUnion"
        width={182}
        height={82}
        preload
        unoptimized
        className="mt-12 h-auto w-50"
      />
      <p className="mt-3 text-[13px] text-gray-700">{t("officialPartnersIntro")}</p>

      <Image
        src={PARTNER_LOGOS_URL}
        alt={t("officialPartnersTitle")}
        width={934}
        height={642}
        preload
        unoptimized
        className="mx-auto mt-10 h-auto w-full"
      />

      <div className="mt-14 space-y-3.5 text-[13px] leading-relaxed text-gray-700 [&_a]:text-[#0f6cbd]">
        <p>{t("officialPartnersWarn1")}</p>
        <p className="font-bold text-gray-900">{t("officialPartnersWarn2")}</p>
        <p>{t("officialPartnersWarn3")}</p>
        <p>{t("officialPartnersWarn4")}</p>
        {renderRichText(t("officialPartnersReport"))}
        <p>{t("officialPartnersWarn5")}</p>
        {renderRichText(t("officialPartnersWarn6"))}
        <p className="italic underline">{t("officialPartnersKpmgNote")}</p>
      </div>
    </section>
  );
}
