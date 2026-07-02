"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

const COMPANY_DETAIL_FIELDS: TranslationKey[] = [
  "fieldCompanyName",
  "fieldRegisteredAddress",
  "fieldBranchAddress",
  "fieldTelephoneNumbers",
  "fieldPanCompany",
  "fieldPromoterDirector",
  "fieldRelationship",
  "fieldLegalConstitution",
  "fieldCity",
  "fieldState",
  "fieldPinCode",
];

const ACCOUNT_DETAIL_FIELDS: TranslationKey[] = [
  "fieldCreditType",
  "fieldAssetClassification",
  "fieldSanctionDate",
  "fieldSanctionedAmount",
  "fieldCurrentBalance",
  "fieldBankRemark",
  "fieldStatus",
  "fieldWillfulDefaulterDate",
  "fieldSuitFiledStatus",
  "fieldDateOfSuit",
  "fieldSuitAmount",
];

function FieldColumn({ heading, fields }: { heading: string; fields: TranslationKey[] }) {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-4">{heading}</h3>
      <ul className="space-y-4">
        {fields.map((field) => (
          <li key={field} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-[#00b0f0] mt-1">•</span>
            <span>{t(field)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FieldDetailsSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="font-bold text-gray-900">{t("companyDisputeSection1Heading")}</h2>
      <p className="font-semibold text-gray-800 mt-2 mb-8">{t("fieldsDisputedLabel")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <FieldColumn heading={t("companyDetailsHeading")} fields={COMPANY_DETAIL_FIELDS} />
        <FieldColumn heading={t("accountDetailsHeading")} fields={ACCOUNT_DETAIL_FIELDS} />
      </div>
    </section>
  );
}
