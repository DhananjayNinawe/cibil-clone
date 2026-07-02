"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PersonSilhouetteIcon, ArrowRightIcon } from "@/components/icons";

function ProcessNode({ ringColor, children, label }: { ringColor: string; children: React.ReactNode; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-20 h-20 rounded-full bg-white border-4 ${ringColor} flex items-center justify-center shrink-0`}>
        {children}
      </div>
      {label && <span className="text-xs font-bold text-[#00b0f0]">{label}</span>}
    </div>
  );
}

function LabeledArrow({ label, reverse = false }: { label: string; reverse?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 max-w-[180px] shrink-0">
      <p className="text-[11px] text-gray-500 text-center leading-snug">{label}</p>
      <ArrowRightIcon className={`w-6 h-6 text-[#00b0f0] ${reverse ? "rotate-180" : ""}`} />
    </div>
  );
}

export default function ProcessDiagram() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="font-bold text-gray-900 tracking-wide mb-6">{t("disputeProcessHeading")}</h2>

      <div className="bg-gray-100 rounded-lg p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
          <ProcessNode ringColor="border-green-400">
            <PersonSilhouetteIcon className="w-9 h-9 text-gray-400" />
          </ProcessNode>

          <LabeledArrow label={t("submitFormLabel")} />

          <ProcessNode ringColor="border-[#f5c518]">
            <span className="text-sm font-bold text-[#00b0f0]">CIBIL</span>
          </ProcessNode>

          <LabeledArrow label={t("basedOnTypeLabel")} />

          <ProcessNode ringColor="border-[#00b0f0]" label="CIBIL">
            <PersonSilhouetteIcon className="w-9 h-9 text-[#00b0f0]" />
          </ProcessNode>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6 max-w-xl mx-auto">{t("acceptsRejectsLabel")}</p>

        <div className="flex justify-center mt-2">
          <LabeledArrow label={t("ifAcceptedLabel")} reverse />
        </div>

        <div className="border-t border-gray-300 mt-6 pt-3 text-center">
          <p className="text-xs font-semibold text-gray-700">{t("turnaroundTimeLabel")}</p>
          <p className="text-[11px] text-gray-400 mt-1">{t("turnaroundFootnote")}</p>
        </div>
      </div>
    </section>
  );
}
