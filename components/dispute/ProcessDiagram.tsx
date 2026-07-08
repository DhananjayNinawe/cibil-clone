"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

const DIAGRAM_IMAGE =
  "https://www.cibil.com/consumer-dispute-resolution/_jcr_content/root/contentcontainer/pagesection_83362557/contentcontainer/pagesectionwithbackg_1850981626/image.coreimg.75.1440.png/1753269038504/d1en.png";

export default function ProcessDiagram({ headingKey = "diagramHeading" }: { headingKey?: TranslationKey }) {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="font-bold text-gray-900 text-lg">{t(headingKey)}</h2>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-10">
        <h3 className="text-center font-bold text-gray-900 mb-10">{t("whatWeDoHeading")}</h3>

        <Image
          src={DIAGRAM_IMAGE}
          alt={t("whatWeDoHeading")}
          width={1440}
          height={720}
          unoptimized
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="w-full h-auto"
        />

        <p className="text-center text-xs text-gray-500 mt-10">{t("diagTurnaroundTime")}</p>
      </div>
    </section>
  );
}
