"use client";

import { useState } from "react";
import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import {
  validateAgreed,
  validateConfirmPassword,
  validateDob,
  validateEmail,
  validateIdNumber,
  validateIdType,
  validateMobile,
  validateName,
  validatePassword,
  validatePincode,
} from "@/lib/validators";
import { Container, Section } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import { TextField, SelectField, CheckboxField } from "@/components/v3/ui/Field";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * Registration.
 *
 * Eleven inputs is a wall, and V1 stacks them in a boxed card in the middle of a grey page. V3
 * sets the same eleven as a paper form: ruled underline fields, one column, in V1's order, with
 * the promise the account is being opened *for* standing in the margin beside them — a large serif
 * statement rather than a second column of chrome. The margin note is sticky, so the reason you
 * are filling the form in stays on screen while you fill it in.
 *
 * Nothing about the form's behaviour changes: the same eleven fields, the same validators from
 * `lib/validators.ts`, the same error timing (a field speaks up once it has been touched, or once
 * the form has been submitted), and the same 18-year floor on the date of birth. V1 finishes with
 * `alert("Registration successful!")`; here the same outcome — the form is cleared and the reader
 * is told what happens next — is announced in the page, in their language.
 */

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

type FormErrors = Partial<Record<keyof FormState, string>>;

/** English values in state so the validators work identically in every locale — V1's rule. */
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

/** 18 years ago, to the day — the same floor V1 puts on the date picker. */
const MAX_DOB = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  .toISOString()
  .split("T")[0];

export default function RegisterContent() {
  const { t } = useV3();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const update = (field: keyof FormState, value: string | boolean) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setDone(false);
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

    const allTouched: Partial<Record<keyof FormState, boolean>> = {};
    for (const field of Object.keys(form) as (keyof FormState)[]) {
      allTouched[field] = true;
    }
    setTouched(allTouched);

    const errs = validateAll(form);
    setErrors(errs);
    if (hasErrors(errs)) return;

    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setDone(true);
  };

  const errorFor = (field: keyof FormState) =>
    (touched[field] || submitted) && errors[field] ? errors[field] : undefined;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("createAccountLink") },
        ]}
        folio={t("sitemapMyAccount")}
        size="full"
        title={[
          t("heroText"),
          // The brand name is set roman, not italic. It is a word in a sentence here (V1 writes
          // the same line), but italicising a trademark is still restyling someone else's mark.
          t("brand"),
        ]}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* ── The margin. Why the form exists, set once, and left where you can see it. */}
            <aside className="order-2 min-w-0 lg:order-1">
              <div className="lg:sticky lg:top-32">
                <Reveal variant="wipe">
                  <p className="v3-h3 text-pretty">
                    {t("heroSafeNote")}{" "}
                    <span className="v3-em">{t("heroSafeNoteBold")}</span>
                  </p>
                </Reveal>

                <Reveal variant="rise" delay={120}>
                  <div className="mt-10 border-t border-[var(--v3-line-2)] pt-8">
                    <p className="text-sm text-[var(--v3-fg-2)]">
                      {t("heroAlreadyAccount")}{" "}
                      <Link
                        href={toV3("/login")}
                        className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
                      >
                        {t("heroLogIn")}
                      </Link>
                    </p>
                  </div>
                </Reveal>
              </div>
            </aside>

            {/* ── The form. Ruled lines you write on, in V1's order. */}
            <div className="order-1 min-w-0 lg:order-2 lg:border-l lg:border-[var(--v3-line)] lg:pl-12">
              <h2 className="v3-h3">{t("enterDetails")}</h2>
              <p className="v3-caption mt-2">{t("allFieldsRequired")}</p>

              {/* One polite live region for everything the flow says back. */}
              <div role="status" aria-live="polite" className="empty:hidden">
                {done && (
                  <Callout tone="success" className="mt-8">
                    {t("otpHint")}{" "}
                    <Link href={toV3("/login")} className="v3-focus">
                      {t("loginToAccount")}
                    </Link>
                  </Callout>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-8">
                <TextField
                  label={t("emailAddress")}
                  hint={t("emailHint")}
                  error={errorFor("email")}
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => blur("email")}
                  autoComplete="email"
                  required
                />

                <div>
                  <TextField
                    label={t("mobileNumber")}
                    error={errorFor("mobile")}
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => update("mobile", e.target.value.replace(/\D/g, ""))}
                    onBlur={() => blur("mobile")}
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                  />
                  <Callout tone="warning" className="mt-4">
                    {t("otpHint")}
                  </Callout>
                </div>

                <TextField
                  label={t("password")}
                  error={errorFor("password")}
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  onBlur={() => blur("password")}
                  autoComplete="new-password"
                  required
                />

                <TextField
                  label={t("confirmPassword")}
                  error={errorFor("confirmPassword")}
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  onBlur={() => blur("confirmPassword")}
                  autoComplete="new-password"
                  required
                />

                <div className="grid gap-8 sm:grid-cols-2">
                  <TextField
                    label={t("firstName")}
                    error={errorFor("firstName")}
                    type="text"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    onBlur={() => blur("firstName")}
                    autoComplete="given-name"
                    required
                  />
                  <TextField
                    label={t("lastName")}
                    error={errorFor("lastName")}
                    type="text"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    onBlur={() => blur("lastName")}
                    autoComplete="family-name"
                    required
                  />
                </div>

                <SelectField
                  label={t("idType")}
                  error={errorFor("idType")}
                  value={form.idType}
                  onChange={(e) => update("idType", e.target.value)}
                  onBlur={() => blur("idType")}
                  required
                >
                  <option value="">{t("idTypePlaceholder")}</option>
                  {ID_TYPES.map(({ key, value }) => (
                    <option key={value} value={value}>
                      {t(key)}
                    </option>
                  ))}
                </SelectField>

                <TextField
                  label={t("idNumber")}
                  error={errorFor("idNumber")}
                  type="text"
                  value={form.idNumber}
                  onChange={(e) => update("idNumber", e.target.value)}
                  onBlur={() => blur("idNumber")}
                  autoComplete="off"
                  spellCheck={false}
                  required
                />

                <TextField
                  label={t("dateOfBirth")}
                  error={errorFor("dob")}
                  type="date"
                  // A mask, not language — and the one Latin token the catalog itself allows.
                  placeholder="DD / MM / YYYY"
                  max={MAX_DOB}
                  value={form.dob}
                  onChange={(e) => update("dob", e.target.value)}
                  onBlur={() => blur("dob")}
                  className="v3-num"
                  required
                />

                <TextField
                  label={t("pincode")}
                  error={errorFor("pincode")}
                  type="text"
                  value={form.pincode}
                  onChange={(e) => update("pincode", e.target.value.replace(/\D/g, ""))}
                  onBlur={() => blur("pincode")}
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                />

                <CheckboxField
                  checked={form.agreed}
                  onChange={(checked) => {
                    update("agreed", checked);
                    setTouched((prev) => ({ ...prev, agreed: true }));
                  }}
                  error={errorFor("agreed")}
                >
                  {t("termsText")}{" "}
                  <Link href={toV3("/legal/terms-and-conditions")} className="v3-focus v3-link">
                    {t("termsLink")}
                  </Link>{" "}
                  {t("andText")}{" "}
                  <Link href={toV3("/privacy-policy")} className="v3-focus v3-link">
                    {t("privacyLink")}
                  </Link>{" "}
                  {t("termsFullText")}
                </CheckboxField>

                <Button type="submit" size="lg" full arrow>
                  {t("acceptBtn")}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
