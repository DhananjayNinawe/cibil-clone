"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneIcon, ChevronDownIcon } from "@/components/icons";
import { validateMobile, validateAgreed } from "@/lib/validators";

interface FormState {
  mobile: string;
  agreed: boolean;
}

interface FormErrors {
  mobile?: string;
  agreed?: string;
}

function validateAll(form: FormState): FormErrors {
  return {
    mobile: validateMobile(form.mobile),
    agreed: validateAgreed(form.agreed),
  };
}

function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some(Boolean);
}

const INITIAL_FORM: FormState = { mobile: "", agreed: false };

export default function LoginForm() {
  const { t } = useLanguage();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [termsExpanded, setTermsExpanded] = useState(false);

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
    setTouched({ mobile: true, agreed: true });
    const errs = validateAll(form);
    setErrors(errs);
    if (!hasErrors(errs)) {
      // TODO: wire up real OTP dispatch
      alert(`OTP sent to +91 ${form.mobile}`);
    }
  };

  const showError = (field: keyof FormState) => (touched[field] || submitted) && errors[field];

  const isValid = !hasErrors(validateAll(form));

  const inputClass = `w-full border rounded px-3 py-2.5 pl-10 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors ${
    showError("mobile")
      ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
      : "border-gray-300 focus:border-[#00b0f0] focus:ring-1 focus:ring-[#00b0f0]"
  }`;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8 w-full max-w-md">
      <h1 className="text-xl font-bold text-gray-800 mb-6">{t("loginToAccount")}</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label className="block text-sm text-gray-700 mb-1.5">{t("enterRegisteredMobile")}</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <PhoneIcon />
          </span>
          <input
            type="tel"
            className={inputClass}
            placeholder={t("mobilePlaceholder")}
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value.replace(/\D/g, ""))}
            onBlur={() => blur("mobile")}
            maxLength={10}
            inputMode="numeric"
            autoComplete="tel"
          />
        </div>
        {showError("mobile") && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}

        <div className="mt-4">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="login-terms"
              checked={form.agreed}
              onChange={(e) => {
                update("agreed", e.target.checked);
                setTouched((prev) => ({ ...prev, agreed: true }));
              }}
              className="mt-1 w-4 h-4 shrink-0 accent-[#00b0f0] cursor-pointer"
            />
            <label htmlFor="login-terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
              {t("termsText")}{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                {t("termsLink")}
              </a>{" "}
              {t("andText")}{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                {t("privacyLink")}
              </a>{" "}
              <span className={termsExpanded ? "" : "line-clamp-1"}>{t("termsFullText")}</span>{" "}
              <button
                type="button"
                onClick={() => setTermsExpanded((v) => !v)}
                className="inline-flex items-center text-blue-600 font-medium ml-1"
              >
                {termsExpanded ? t("readLess") : t("readMore")}
                <ChevronDownIcon className={`w-3 h-3 ml-0.5 transition-transform ${termsExpanded ? "rotate-180" : ""}`} />
              </button>
            </label>
          </div>
          {showError("agreed") && <p className="text-xs text-red-500 mt-1 ml-6">{errors.agreed}</p>}
        </div>

        <button
          type="submit"
          className={`w-full mt-5 py-3 rounded-full text-sm font-bold transition-colors ${
            isValid
              ? "bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 cursor-pointer"
              : "bg-[#fbe8ab] text-white cursor-not-allowed"
          }`}
        >
          {t("sendOtp")}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">{t("orDivider")}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <button
        type="button"
        onClick={() => alert("Username login is not available in this demo.")}
        className="w-full py-3 rounded-full text-sm font-bold border-2 border-[#f5c518] text-gray-800 hover:bg-[#f5c518] transition-colors"
      >
        {t("loginWithUsername")}
      </button>

      <Link
        href="/register"
        className="block text-center text-sm text-blue-600 hover:underline font-medium mt-6"
      >
        {t("createAccountLink")}
      </Link>

      <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
        <a href="#" className="text-xs text-gray-600 hover:text-[#00b0f0] hover:underline font-medium">
          {t("faqs")}
        </a>
        <Link href="/register" className="text-xs text-gray-600 hover:text-[#00b0f0] hover:underline font-medium">
          {t("termsConditions")}
        </Link>
        <a href="#" className="text-xs text-gray-600 hover:text-[#00b0f0] hover:underline font-medium">
          {t("privacyPolicy")}
        </a>
      </div>
    </div>
  );
}
