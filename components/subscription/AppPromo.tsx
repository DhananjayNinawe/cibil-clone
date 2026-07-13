"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const CTA_BANNER_URL = "https://www.cibil.com/content/dam/cibil/consumer/select-plan/cta-banner-mob.png";

export default function AppPromo() {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:w-1/2 md:py-16">
          <h2 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
            {t("appPromoTitle")}
            <br />
            {t("appPromoSubtitle")}
          </h2>
          <p className="mt-4 text-sm text-gray-600">{t("appPromoTagline")}</p>

          <Link
            href="/register"
            className="mt-7 inline-block rounded-full bg-[#f5c518] px-7 py-3 text-xs font-bold tracking-wide text-gray-900 transition-colors hover:bg-[#e8b800]"
          >
            {t("downloadAppBtn")}
          </Link>

          <p className="mt-8 text-xs text-gray-500">{t("downloadFrom")}</p>
          <div className="mt-2 flex items-center gap-3">
            <Link href="#" aria-label={t("getItOnGooglePlay")}>
              <Image src="/google-play-badge.svg" alt={t("getItOnGooglePlay")} width={135} height={40} />
            </Link>
            <Link href="#" aria-label={t("downloadOnAppStore")}>
              <Image src="/app-store-badge.svg" alt={t("downloadOnAppStore")} width={135} height={40} />
            </Link>
          </div>
        </div>

        {/* From md up the banner leaves the container and runs to the viewport's right edge. */}
        <div className="pb-10 md:absolute md:inset-y-0 md:left-1/2 md:right-[calc(50%-50vw)] md:flex md:items-end md:pb-0">
          <Image
            src={CTA_BANNER_URL}
            alt=""
            aria-hidden
            width={900}
            height={700}
            unoptimized
            className="ml-auto h-auto w-full max-w-md md:max-h-full md:w-auto md:max-w-none md:object-contain"
          />
        </div>
      </div>
    </div>
  );
}
