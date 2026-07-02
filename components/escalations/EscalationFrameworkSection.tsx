"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MailIcon, DocumentIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

function InfoLine({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-700 mt-2">
      <span className="mt-0.5 shrink-0 text-[#00b0f0]">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export default function EscalationFrameworkSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("escalationFrameworkHeading")}</h2>

      <div className="space-y-10">
        <div>
          <p className="font-bold text-gray-900">{t("level2Heading")}</p>
          <p className="font-bold text-gray-800 mt-2">{t("level2Name")}</p>
          <InfoLine icon={<MailIcon className="w-4 h-4" />}>
            <a href="#" className="text-blue-700 hover:underline">
              {t("level2Email")}
            </a>
          </InfoLine>
          <InfoLine icon={<DocumentIcon className="w-4 h-4" />}>
            {t("submitRequestLabel")}{" "}
            <a href="#" className="text-blue-700 hover:underline block">
              {t("submitRequestLinkText")}
            </a>
          </InfoLine>
          <InfoLine icon={<MapPinIcon className="w-4 h-4" />}>{t("sameOfficeAddressAbove")}</InfoLine>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-bold">{t("includeServiceRequestNumber")}</span> {t("inAllCommunication")}
          </p>
        </div>

        <div>
          <p className="font-bold text-gray-900">{t("level3Heading")}</p>
          <p className="font-bold text-gray-800 mt-2">{t("level3Name")}</p>
          <InfoLine icon={<MailIcon className="w-4 h-4" />}>
            <a href="#" className="text-blue-700 hover:underline">
              {t("level3Email")}
            </a>
          </InfoLine>
          <InfoLine icon={<PhoneIcon className="w-4 h-4" />}>{t("level3Phone")}</InfoLine>
          <InfoLine icon={<DocumentIcon className="w-4 h-4" />}>
            {t("submitRequestLabel")}{" "}
            <a href="#" className="text-blue-700 hover:underline block">
              {t("submitRequestLinkText")}
            </a>
          </InfoLine>
          <InfoLine icon={<MapPinIcon className="w-4 h-4" />}>{t("sameOfficeAddress")}</InfoLine>
          <p className="text-sm text-gray-700 mt-2 font-bold">{t("includeServiceRequestNumber")}</p>
          <p className="text-sm text-gray-700 mt-4">
            {t("viewGrievancePolicyPrefix")}{" "}
            <a href="#" className="text-blue-700 hover:underline font-bold">
              {t("grievancePolicyLink")}
            </a>
          </p>
        </div>

        <div>
          <p className="font-bold text-gray-900">{t("level4Heading")}</p>
          <p className="text-sm text-gray-700 italic mt-2">{t("level4Desc")}</p>
          <InfoLine icon={<DocumentIcon className="w-4 h-4" />}>{t("fileComplaintLabel")}</InfoLine>
          <a href="#" className="text-blue-700 hover:underline font-bold text-sm block mt-1 ml-6">
            {t("rbiComplaintPortalLink")}
          </a>
          <InfoLine icon={<MailIcon className="w-4 h-4" />}>
            <a href="#" className="text-blue-700 hover:underline">
              {t("rbiEmail")}
            </a>
          </InfoLine>
          <InfoLine icon={<MapPinIcon className="w-4 h-4" />}>
            <span className="font-bold">{t("addressLabel")}</span>
            <br />
            <span className="font-bold">{t("rbiOfficeName")}</span>
            <br />
            {t("rbiOfficeAddress1")}
            <br />
            {t("rbiOfficeAddress2")}
          </InfoLine>
          <InfoLine icon={<MapPinIcon className="w-4 h-4" />}>
            {t("bankingOmbudsmanLabel")}{" "}
            <a href="#" className="text-blue-700 hover:underline">
              {t("bankingOmbudsmanLinkText")}
            </a>
          </InfoLine>
        </div>
      </div>

      <div className="mt-12">
        <p className="font-bold text-gray-900">{t("everyStepHeading")}</p>
        <p className="text-gray-700 mt-2">{t("everyStepDesc")}</p>
      </div>
    </section>
  );
}
