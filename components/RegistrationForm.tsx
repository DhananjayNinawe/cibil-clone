"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { EyeIcon, InfoIcon } from "@/components/icons";
import {
  validateEmail,
  validateMobile,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateIdType,
  validateIdNumber,
  validateDob,
  validatePincode,
  validateAgreed,
} from "@/lib/validators";

interface FormState {
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  idType: string;
  idNumber: string;
  dob: string;
  pincode: string;
  agreed: boolean;
}

interface FormErrors {
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  idType?: string;
  idNumber?: string;
  dob?: string;
  pincode?: string;
  agreed?: string;
}

// English values stored in form state so validation works across all languages
const ID_TYPES = [
  { key: "passAdhan", value: "aadhaar" },
  { key: "passPan", value: "pan" },
  { key: "passPassport", value: "passport" },
  { key: "passVoterId", value: "voter-id" },
  { key: "passDrivingLicense", value: "driving-license" },
] as const;

function validateAll(form: FormState): FormErrors {
  return {
    email: validateEmail(form.email),
    mobile: validateMobile(form.mobile),
    password: validatePassword(form.password),
    confirmPassword: validateConfirmPassword(form.confirmPassword, form.password),
    firstName: validateName(form.firstName, "First name"),
    lastName: validateName(form.lastName, "Last name"),
    idType: validateIdType(form.idType),
    idNumber: validateIdNumber(form.idNumber, form.idType),
    dob: validateDob(form.dob),
    pincode: validatePincode(form.pincode),
    agreed: validateAgreed(form.agreed),
  };
}

function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some(Boolean);
}

const INITIAL_FORM: FormState = {
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  idType: "",
  idNumber: "",
  dob: "",
  pincode: "",
  agreed: false,
};

export default function RegistrationForm() {
  const { t } = useLanguage();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showIdNumber, setShowIdNumber] = useState(false);
  const [showDob, setShowDob] = useState(false);

  const update = (field: keyof FormState, value: string | boolean) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field] || submitted) {
      setErrors((prev) => ({ ...prev, ...validateAll(next) }));
    }
  };

  const blur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, ...validateAll(form) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true])
    ) as Partial<Record<keyof FormState, boolean>>;
    setTouched(allTouched);
    const errs = validateAll(form);
    setErrors(errs);
    if (!hasErrors(errs)) {
      // TODO: submit form
      alert("Registration successful!");
      setForm(INITIAL_FORM);
      setErrors({});
      setTouched({});
      setSubmitted(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setShowIdNumber(false);
      setShowDob(false);
    }
  };

  const showError = (field: keyof FormState) =>
    (touched[field] || submitted) && errors[field];

  const inputClass = (field: keyof FormState) =>
    `w-full border rounded px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors ${
      showError(field)
        ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
        : "border-gray-300 focus:border-[#00b0f0] focus:ring-1 focus:ring-[#00b0f0]"
    }`;

  const isValid = !hasErrors(validateAll(form));

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero */}
      <div className="bg-white py-10 px-4 text-center border-b border-gray-100">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 max-w-3xl mx-auto leading-tight">
          {t("heroText")}{" "}
          <span className="bg-[#f5c518] px-2 py-0.5 rounded font-bold text-gray-900">{t("brand")}</span>
        </h1>
      </div>

      {/* Form Card */}
      <div className="max-w-xl mx-auto px-4 mt-8">
        <div className="bg-white rounded shadow-sm border border-gray-200 p-6 sm:p-8">
          <h2 className="text-sm font-bold text-[#00b0f0] tracking-widest mb-1">{t("enterDetails")}</h2>
          <p className="text-xs text-gray-500 mb-6">{t("allFieldsRequired")}</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("emailAddress")}</label>
              <input
                type="email"
                className={inputClass("email")}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                onBlur={() => blur("email")}
                autoComplete="email"
              />
              {showError("email") && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
              {!showError("email") && (
                <p className="text-xs text-gray-500 mt-1">{t("emailHint")}</p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("mobileNumber")}</label>
              <input
                type="tel"
                className={inputClass("mobile")}
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value.replace(/\D/g, ""))}
                onBlur={() => blur("mobile")}
                maxLength={10}
                autoComplete="tel"
                inputMode="numeric"
              />
              {showError("mobile") && (
                <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
              )}
              <div className="flex items-start gap-2 mt-2 bg-yellow-50 border border-yellow-200 rounded px-3 py-2">
                <InfoIcon />
                <p className="text-xs text-gray-600">{t("otpHint")}</p>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("password")}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${inputClass("password")} pr-10`}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  onBlur={() => blur("password")}
                  autoComplete="new-password"
                />
                <EyeIcon visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
              </div>
              {showError("password") && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("confirmPassword")}</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`${inputClass("confirmPassword")} pr-10`}
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  onBlur={() => blur("confirmPassword")}
                  autoComplete="new-password"
                />
                <EyeIcon visible={showConfirmPassword} onToggle={() => setShowConfirmPassword((v) => !v)} />
              </div>
              {showError("confirmPassword") && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* First / Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("firstName")}</label>
                <input
                  type="text"
                  className={inputClass("firstName")}
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  onBlur={() => blur("firstName")}
                  autoComplete="given-name"
                />
                {showError("firstName") && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("lastName")}</label>
                <input
                  type="text"
                  className={inputClass("lastName")}
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  onBlur={() => blur("lastName")}
                  autoComplete="family-name"
                />
                {showError("lastName") && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* ID Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("idType")}</label>
              <div className="relative">
                <select
                  className={`${inputClass("idType")} appearance-none pr-8 bg-white cursor-pointer`}
                  value={form.idType}
                  onChange={(e) => update("idType", e.target.value)}
                  onBlur={() => blur("idType")}
                >
                  <option value="">{t("idTypePlaceholder")}</option>
                  {ID_TYPES.map(({ key, value }) => (
                    <option key={value} value={value}>
                      {t(key)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {showError("idType") && (
                <p className="text-xs text-red-500 mt-1">{errors.idType}</p>
              )}
            </div>

            {/* ID Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("idNumber")}</label>
              <div className="relative">
                <input
                  type="text"
                  className={`${inputClass("idNumber")} pr-10`}
                  style={
                    showIdNumber
                      ? undefined
                      : ({ WebkitTextSecurity: "disc" } as React.CSSProperties)
                  }
                  value={form.idNumber}
                  onChange={(e) => update("idNumber", e.target.value)}
                  onBlur={() => blur("idNumber")}
                  autoComplete="off"
                  spellCheck={false}
                />
                <EyeIcon visible={showIdNumber} onToggle={() => setShowIdNumber((v) => !v)} />
              </div>
              {showError("idNumber") && (
                <p className="text-xs text-red-500 mt-1">{errors.idNumber}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("dateOfBirth")}</label>
              <div className="relative">
                <input
                  type={showDob ? "text" : "date"}
                  placeholder="DD / MM / YYYY"
                  className={`${inputClass("dob")} pr-10`}
                  value={form.dob}
                  onChange={(e) => update("dob", e.target.value)}
                  onBlur={() => blur("dob")}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                    .toISOString()
                    .split("T")[0]}
                />
                <EyeIcon visible={showDob} onToggle={() => setShowDob((v) => !v)} />
              </div>
              {showError("dob") && (
                <p className="text-xs text-red-500 mt-1">{errors.dob}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("pincode")}</label>
              <input
                type="text"
                className={inputClass("pincode")}
                value={form.pincode}
                onChange={(e) => update("pincode", e.target.value.replace(/\D/g, ""))}
                onBlur={() => blur("pincode")}
                maxLength={6}
                inputMode="numeric"
              />
              {showError("pincode") && (
                <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={form.agreed}
                  onChange={(e) => {
                    update("agreed", e.target.checked);
                    setTouched((prev) => ({ ...prev, agreed: true }));
                  }}
                  className="mt-1 w-4 h-4 shrink-0 accent-[#00b0f0] cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                  {t("termsText")}{" "}
                  <a href="#" className="text-blue-600 hover:underline font-medium">{t("termsLink")}</a>{" "}
                  {t("andText")}{" "}
                  <a href="#" className="text-blue-600 hover:underline font-medium">{t("privacyLink")}</a>{" "}
                  {t("termsFullText")}
                </label>
              </div>
              {showError("agreed") && (
                <p className="text-xs text-red-500 mt-1">{errors.agreed}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-3 rounded text-sm font-semibold transition-colors ${
                isValid
                  ? "bg-[#e8a800] hover:bg-[#d49700] text-white cursor-pointer"
                  : "bg-[#f5d98b] text-white cursor-not-allowed"
              }`}
            >
              {t("acceptBtn")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
