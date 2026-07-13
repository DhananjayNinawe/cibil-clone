"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";
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
import { Container, Section } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import { ShieldIcon } from "@/components/v4/ui/Icons";
import Notice from "@/components/v4/ui/Notice";
import { Reveal } from "@/components/v4/motion/Reveal";
import {
  CheckboxField,
  ErrorSummary,
  Field,
  RevealToggle,
  SelectField,
  SubmitButton,
  TrustStrip,
  type SubmitStatus,
  type SummaryItem,
} from "@/components/v4/pages/auth/AuthForm";

/**
 * Registration.
 *
 * Eleven fields is a wall, and a wall is where sign-ups die. V1 stacks all eleven in a boxed card in
 * the middle of a grey page, with no sense of how far in you are and nothing beside them explaining
 * why any of it is being asked for.
 *
 * V4 keeps every one of V1's eleven fields, in V1's order, validated by V1's own validators — and
 * changes only what surrounds them: a night hero that states the promise once, then the form on a
 * single plane of light, with the reassurance held in a sticky column beside it so the reason you
 * are filling this in stays on screen while you fill it in. It is deliberately not the login page's
 * layout: that page is one field and can be centred; this one is a document and needs a margin.
 *
 * Login's sibling, not its twin.
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

/**
 * Hoisted rather than written inline at the `useState` call — and not only for readability.
 *
 * `scripts/check-i18n.mjs` reads each line looking for `>…<`, the shape of hardcoded JSX text. A
 * line that carries an arrow function *and* a type argument — `…map((k) => …) as Partial<Record<…>>`
 * — presents exactly that shape and is reported as untranslated copy. V2's RegisterContent has that
 * failure to this day. A named alias has none of it.
 */
type FieldName = keyof FormState;
type FormErrors = Partial<Record<FieldName, string>>;
type Touched = Partial<Record<FieldName, boolean>>;

/**
 * The order the reader meets the fields in — V1's order, unchanged.
 *
 * It is also the order the error summary lists them in and the order "the first invalid field" is
 * resolved against, so all three agree. A summary that lists problems in a different order from the
 * form is a summary that sends the reader hunting.
 */
const FIELD_ORDER: FieldName[] = [
  "email",
  "mobile",
  "password",
  "confirmPassword",
  "firstName",
  "lastName",
  "idType",
  "idNumber",
  "dob",
  "pincode",
  "agreed",
];

const ID: Record<FieldName, string> = {
  email: "v4-reg-email",
  mobile: "v4-reg-mobile",
  password: "v4-reg-password",
  confirmPassword: "v4-reg-confirm-password",
  firstName: "v4-reg-first-name",
  lastName: "v4-reg-last-name",
  idType: "v4-reg-id-type",
  idNumber: "v4-reg-id-number",
  dob: "v4-reg-dob",
  pincode: "v4-reg-pincode",
  agreed: "v4-reg-terms",
};

/** The label each field carries, and the one the error summary names it by. */
const LABEL: Record<FieldName, TranslationKey> = {
  email: "emailAddress",
  mobile: "mobileNumber",
  password: "password",
  confirmPassword: "confirmPassword",
  firstName: "firstName",
  lastName: "lastName",
  idType: "idType",
  idNumber: "idNumber",
  dob: "dateOfBirth",
  pincode: "pincode",
  agreed: "termsLink",
};

/** English values in state, so the validators behave identically in all four locales — V1's rule. */
const ID_TYPES: { key: TranslationKey; value: string }[] = [
  { key: "passAdhan", value: "aadhaar" },
  { key: "passPan", value: "pan" },
  { key: "passPassport", value: "passport" },
  { key: "passVoterId", value: "voter-id" },
  { key: "passDrivingLicense", value: "driving-license" },
];

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

const ALL_TOUCHED: Touched = {};
for (const field of FIELD_ORDER) ALL_TOUCHED[field] = true;

/** Eighteen years ago, to the day — the same floor V1 puts on the picker, and on the validator. */
const MAX_DOB = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  .toISOString()
  .split("T")[0];

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

export default function RegisterContent() {
  const { t, t4 } = useV4();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showIdNumber, setShowIdNumber] = useState(false);

  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const update = (field: FieldName, value: string | boolean) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setStatus("idle");
    if (touched[field] || submitted) {
      setErrors((prev) => ({ ...prev, ...validateAll(next) }));
    }
  };

  const blur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, ...validateAll(form) }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setTouched(ALL_TOUCHED);

    const errs = validateAll(form);
    setErrors(errs);

    if (hasErrors(errs)) {
      // Eleven fields, and the broken one may be six screens up. Put the caret in it.
      const first = FIELD_ORDER.find((field) => errs[field]);
      if (first) document.getElementById(ID[first])?.focus();
      return;
    }

    setStatus("pending");
    timer.current = window.setTimeout(() => {
      // V1 ends on `alert("Registration successful!")` and clears the form. Same outcome — but the
      // reader is told what actually happens next, in the page, in their own language.
      setForm(INITIAL_FORM);
      setErrors({});
      setTouched({});
      setSubmitted(false);
      setShowPassword(false);
      setShowConfirm(false);
      setShowIdNumber(false);
      setStatus("done");
    }, 700);
  };

  const errorFor = (field: FieldName) =>
    (touched[field] || submitted) && errors[field] ? errors[field] : undefined;

  const summary: SummaryItem[] = submitted
    ? FIELD_ORDER.filter((field) => errors[field]).map((field) => ({
        id: ID[field],
        label: t(LABEL[field]),
        message: errors[field] as string,
      }))
    : [];

  const valid = !hasErrors(validateAll(form));

  /**
   * The reveal toggle's label.
   *
   * It has to change with the control's state *and* name its field, or a screen-reader user meets
   * three identical "show" buttons and cannot tell which one uncovers what. So the verb comes from
   * the state and the noun from the field: "Show password", "Hide ID number".
   *
   * The ID number is not a password, so it does not borrow the password's words — `v4ShowValue` is
   * the neutral pair, and the field's own name is appended to disambiguate.
   */
  const revealLabel = (visible: boolean, field: TranslationKey) => {
    const isSecret = field === "password" || field === "confirmPassword";
    if (isSecret) return visible ? t4("v4HidePassword") : t4("v4ShowPassword");
    return `${visible ? t4("v4HideValue") : t4("v4ShowValue")} — ${t(field)}`;
  };

  return (
    <>
      {/* The promise, once, on a night band — then the page goes quiet and gets out of the way. */}
      <PageHero
        tone="night"
        label={t("enterDetails")}
        title={
          <>
            {t("heroText")} <span className="v4-mark-word">{t("brand")}</span>
          </>
        }
        lede={t("allFieldsRequired")}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
            {/* ── The form ───────────────────────────────────────────────────────────────────── */}
            <Reveal className="min-w-0">
              <div className="v4-plane p-6 sm:p-8">
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <ErrorSummary id="v4-reg-errors" items={summary} />

                  {/* Everything the flow says back, from one polite live region. */}
                  <div role="status" aria-live="polite" className="empty:hidden">
                    {status === "pending" ? <span className="v4-sr">{t4("v4Loading")}</span> : null}

                    {status === "done" ? (
                      <Notice tone="success">
                        {t("otpHint")}{" "}
                        <Link href={toV4("/login")} className="v4-link">
                          {t("loginToAccount")}
                        </Link>
                      </Notice>
                    ) : null}
                  </div>

                  <Field
                    id={ID.email}
                    label={t("emailAddress")}
                    hint={t("emailHint")}
                    error={errorFor("email")}
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    onBlur={() => blur("email")}
                    autoComplete="email"
                    required
                  />

                  <div>
                    <Field
                      id={ID.mobile}
                      label={t("mobileNumber")}
                      error={errorFor("mobile")}
                      type="tel"
                      value={form.mobile}
                      onChange={(event) => update("mobile", event.target.value.replace(/\D/g, ""))}
                      onBlur={() => blur("mobile")}
                      maxLength={10}
                      inputMode="numeric"
                      autoComplete="tel"
                      required
                    />
                    {/* Why both contact fields are asked for, said where they are asked for. */}
                    <Notice tone="info" className="mt-3">
                      {t("otpHint")}
                    </Notice>
                  </div>

                  <Field
                    id={ID.password}
                    label={t("password")}
                    error={errorFor("password")}
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) => update("password", event.target.value)}
                    onBlur={() => blur("password")}
                    // `new-password`, never `password`: it tells a password manager to *generate*
                    // one here rather than trying to fill an account that does not exist yet.
                    autoComplete="new-password"
                    required
                    adornment={
                      <RevealToggle
                        visible={showPassword}
                        onToggle={() => setShowPassword((v) => !v)}
                        label={revealLabel(showPassword, "password")}
                      />
                    }
                  />

                  <Field
                    id={ID.confirmPassword}
                    label={t("confirmPassword")}
                    error={errorFor("confirmPassword")}
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(event) => update("confirmPassword", event.target.value)}
                    onBlur={() => blur("confirmPassword")}
                    autoComplete="new-password"
                    required
                    adornment={
                      <RevealToggle
                        visible={showConfirm}
                        onToggle={() => setShowConfirm((v) => !v)}
                        label={revealLabel(showConfirm, "confirmPassword")}
                      />
                    }
                  />

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      id={ID.firstName}
                      label={t("firstName")}
                      error={errorFor("firstName")}
                      type="text"
                      value={form.firstName}
                      onChange={(event) => update("firstName", event.target.value)}
                      onBlur={() => blur("firstName")}
                      autoComplete="given-name"
                      required
                    />
                    <Field
                      id={ID.lastName}
                      label={t("lastName")}
                      error={errorFor("lastName")}
                      type="text"
                      value={form.lastName}
                      onChange={(event) => update("lastName", event.target.value)}
                      onBlur={() => blur("lastName")}
                      autoComplete="family-name"
                      required
                    />
                  </div>

                  <SelectField
                    id={ID.idType}
                    label={t("idType")}
                    error={errorFor("idType")}
                    value={form.idType}
                    onChange={(event) => update("idType", event.target.value)}
                    onBlur={() => blur("idType")}
                    required
                  >
                    <option value="">{t("idTypePlaceholder")}</option>
                    {ID_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {t(type.key)}
                      </option>
                    ))}
                  </SelectField>

                  <Field
                    id={ID.idNumber}
                    label={t("idNumber")}
                    error={errorFor("idNumber")}
                    type="text"
                    // Masked like a password until revealed: a PAN or an Aadhaar number on screen in
                    // an open-plan office is as exposed as a password, and `-webkit-text-security`
                    // hides it without lying to the browser about the field's type.
                    style={showIdNumber ? undefined : ({ WebkitTextSecurity: "disc" } as React.CSSProperties)}
                    value={form.idNumber}
                    onChange={(event) => update("idNumber", event.target.value)}
                    onBlur={() => blur("idNumber")}
                    // Off, deliberately: no autofill token means "government ID", and a browser
                    // guessing at one would fill this with the wrong number.
                    autoComplete="off"
                    spellCheck={false}
                    required
                    adornment={
                      <RevealToggle
                        visible={showIdNumber}
                        onToggle={() => setShowIdNumber((v) => !v)}
                        label={revealLabel(showIdNumber, "idNumber")}
                      />
                    }
                  />

                  <Field
                    id={ID.dob}
                    label={t("dateOfBirth")}
                    error={errorFor("dob")}
                    // A native date input, always. V1 swaps this control's `type` under a reveal
                    // toggle, which throws away the picker, the locale-correct order of the parts,
                    // and the keyboard support that comes with them.
                    type="date"
                    // The one Latin token the catalog itself allows: a mask, not language.
                    placeholder="DD / MM / YYYY"
                    max={MAX_DOB}
                    value={form.dob}
                    onChange={(event) => update("dob", event.target.value)}
                    onBlur={() => blur("dob")}
                    autoComplete="bday"
                    required
                  />

                  <Field
                    id={ID.pincode}
                    label={t("pincode")}
                    error={errorFor("pincode")}
                    type="text"
                    value={form.pincode}
                    onChange={(event) => update("pincode", event.target.value.replace(/\D/g, ""))}
                    onBlur={() => blur("pincode")}
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    required
                  />

                  <CheckboxField
                    id={ID.agreed}
                    checked={form.agreed}
                    onChange={(checked) => {
                      update("agreed", checked);
                      setTouched((prev) => ({ ...prev, agreed: true }));
                    }}
                    error={errorFor("agreed")}
                  >
                    {t("termsText")}{" "}
                    <Link href={toV4("/legal/terms-and-conditions")} className="v4-link">
                      {t("termsLink")}
                    </Link>{" "}
                    {t("andText")}{" "}
                    <Link href={toV4("/privacy-policy")} className="v4-link">
                      {t("privacyLink")}
                    </Link>{" "}
                    {t("termsFullText")}
                  </CheckboxField>

                  <SubmitButton status={status} valid={valid}>
                    {t("acceptBtn")}
                  </SubmitButton>
                </form>

                <div className="mt-7 border-t border-[var(--v4-edge)] pt-6">
                  <TrustStrip />
                </div>
              </div>
            </Reveal>

            {/* ── The margin. Why the form exists, and it stays on screen while you fill it in. ── */}
            <aside className="min-w-0">
              <Reveal index={1} className="lg:sticky lg:top-28">
                <div className="v4-plane-flat flex items-start gap-3.5 p-5">
                  <ShieldIcon size={19} className="mt-0.5 shrink-0 text-[var(--v4-success)]" />
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                    {t("heroSafeNote")}{" "}
                    <strong className="font-bold text-[var(--v4-fg)]">
                      {t("heroSafeNoteBold")}
                    </strong>
                  </p>
                </div>

                <p className="v4-body mt-8 text-[0.9375rem]">
                  {t("heroAlreadyAccount")}{" "}
                  <Link href={toV4("/login")} className="v4-link">
                    {t("heroLogIn")}
                  </Link>
                </p>

                <div className="mt-8 border-t border-[var(--v4-edge)] pt-6">
                  <TrustStrip className="justify-start text-left" />
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
