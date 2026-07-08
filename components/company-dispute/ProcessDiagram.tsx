"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const DIAGRAM_IMAGE =
  "https://www.cibil.com/company-dispute-resolution/_jcr_content/root/contentcontainer/pagesection_1926118715/columnrow/contentcontainer_1176380365/image_1433632198.coreimg.75.1440.jpeg/1684946337019/dispute.jpeg";

export default function ProcessDiagram() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="font-bold text-gray-900 tracking-wide mb-6">{t("disputeProcessHeading")}</h2>

      <div className="max-w-2xl">
        <Image
          src={DIAGRAM_IMAGE}
          alt={t("disputeProcessHeading")}
          width={1440}
          height={780}
          unoptimized
          sizes="(max-width: 672px) 100vw, 672px"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
