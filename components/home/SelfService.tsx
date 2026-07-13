"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SERVICE_BANNER =
  "https://www.cibil.com/content/dam/cibil/homepage/shared/service-banner.png";

export default function SelfService() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t("selfServiceHeadingPrefix")} <span className="text-[#00b0f0]">{t("selfServiceHeadingBrand")}</span>
          </h2>

          <div className="mt-6 space-y-4 text-sm text-gray-700 max-w-lg">
            <p>
              {t("selfServiceReportDispute")}{" "}
              <a href="/consumer-dispute-resolution" className="text-[#0072c6] font-semibold underline hover:no-underline">
                {t("hereLink")}
              </a>
            </p>
            <p>
              {t("selfServiceMfiDispute")}{" "}
              <a href="/microfinance-dispute-resolution" className="text-[#0072c6] font-semibold underline hover:no-underline">
                {t("hereLink")}
              </a>
            </p>
            <p>
              {t("selfServiceUploadDocs")}{" "}
              <a href="#" className="text-[#0072c6] font-semibold underline hover:no-underline">
                {t("hereLink")}
              </a>
            </p>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <Image
            src={SERVICE_BANNER}
            alt=""
            aria-hidden
            width={640}
            height={340}
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
}
