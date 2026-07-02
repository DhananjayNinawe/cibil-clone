"use client";

import { useLanguage } from "@/context/LanguageContext";

function SupportIllustration() {
  return (
    <svg viewBox="0 0 300 260" className="w-64 sm:w-72 mx-auto" role="img" aria-label="Person on a phone call using a laptop">
      <circle cx="230" cy="60" r="46" fill="#fdeeb0" />

      {/* laptop */}
      <rect x="90" y="170" width="110" height="8" rx="3" fill="#c7ccd1" />
      <path d="M100 130h90l8 40h-106z" fill="#2b3a4a" />
      <rect x="108" y="138" width="74" height="26" fill="#4fb3d9" />

      {/* legs */}
      <rect x="120" y="150" width="20" height="55" rx="8" fill="#3a2e6b" />
      <rect x="150" y="150" width="20" height="55" rx="8" fill="#3a2e6b" />

      {/* body */}
      <path d="M108 100q40 -24 76 0l6 60q-44 18 -88 0z" fill="#e07a5f" />

      {/* head */}
      <circle cx="146" cy="72" r="26" fill="#3a2e28" />
      <circle cx="146" cy="78" r="21" fill="#2b211d" />

      {/* arm + phone to ear */}
      <path d="M170 96q20 4 24 26l-14 8q-6 -16 -18 -20z" fill="#e07a5f" />
      <rect x="182" y="90" width="14" height="24" rx="4" fill="#222" />
    </svg>
  );
}

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
              <a href="#" className="text-[#0072c6] font-semibold hover:underline">
                {t("hereLink")}
              </a>
            </p>
            <p>
              {t("selfServiceMfiDispute")}{" "}
              <a href="#" className="text-[#0072c6] font-semibold hover:underline">
                {t("hereLink")}
              </a>
            </p>
            <p>
              {t("selfServiceUploadDocs")}{" "}
              <a href="#" className="text-[#0072c6] font-semibold hover:underline">
                {t("hereLink")}
              </a>
            </p>
          </div>
        </div>

        <div className="relative flex justify-center">
          <SupportIllustration />
        </div>
      </div>
    </section>
  );
}
