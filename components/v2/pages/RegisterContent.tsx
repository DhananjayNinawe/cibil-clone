"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
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
import AuthShell, { RevealToggle, Spinner } from "@/components/v2/pages/auth/AuthShell";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Card from "@/components/v2/ui/Card";
import { CheckboxField, SelectField, TextField } from "@/components/v2/ui/Field";
import { Eyebrow } from "@/components/v2/ui/Layout";
import Plate from "@/components/v2/ui/Plate";
import Reveal from "@/components/v2/motion/Reveal";
import SplitText from "@/components/v2/motion/SplitText";

/* ------------------------------------------------------------------ marketing panel */

/** The same three promises the login carousel makes — here they hold still, as a rail. */
const PROMISES: { title: TranslationKey; subtitle: TranslationKey }[] = [
  { title: "loginScoreTitle", subtitle: "loginScoreSubtitle" },
  { title: "loginStayTitle", subtitle: "loginStaySubtitle" },
  { title: "loginSimulatorTitle", subtitle: "loginSimulatorSubtitle" },
];

function RegisterPanel() {
  const { t, tv } = useV2();

  return (
    <div className="mx-auto max-w-xl lg:mx-0">
      <Reveal variant="fade">
        <Eyebrow>{tv("v2HeroKicker")}</Eyebrow>
      </Reveal>

      {/* V1 sets this line as the page's banner headline; V2 keeps the words and the gold mark
          on the brand, and hands the <h1> to the form the reader came here to fill. */}
      <h2 className="v2-h2 mt-8 text-[var(--v2-text)] text-balance">
        <SplitText text={t("heroText")} />{" "}
        <span className="whitespace-nowrap rounded-[10px] bg-[var(--v2-gold)] px-3 py-0.5 font-bold text-[#0a0a0a]">
          {t("brand")}
        </span>
      </h2>

      <Reveal variant="up" delay={200}>
        <p className="v2-lede mt-7 max-w-md text-pretty">
          {t("heroSafeNote")}{" "}
          <strong className="font-bold text-[var(--v2-text)]">{t("heroSafeNoteBold")}</strong>
        </p>
      </Reveal>

      <ul className="mt-12">
        {PROMISES.map((promise, index) => (
          <Reveal
            as="li"
            key={promise.title}
            variant="up"
            delay={index * 90}
            className="flex gap-6 border-t border-[var(--v2-line)] py-6 last:border-b"
          >
            <span
              aria-hidden
              className="v2-eyebrow mt-1 shrink-0 text-[var(--v2-text-3)] tabular-nums"
            >
              {`0${index + 1}`}
            </span>
            <span>
              <span className="block text-[15px] font-bold text-[var(--v2-text)]">
                {t(promise.title)}
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-[var(--v2-text-2)]">
                {t(promise.subtitle)}
              </span>
            </span>
          </Reveal>
        ))}
      </ul>

      <Reveal variant="blur" delay={120}>
        <Plate
          src="/login/login-banner.svg"
          alt=""
          width={520}
          height={380}
          className="mt-14 hidden max-w-md lg:block"
          imageClassName="p-6"
        />
      </Reveal>
    </div>
  );
}

/* -------------------------------------------------------------------------- the form */

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

// English values in state, so the validators read the same token in every language — V1's rule.
const ID_TYPES = [
  { key: "passAdhan", value: "aadhaar" },
  { key: "passPan", value: "pan" },
  { key: "passPassport", value: "passport" },
  { key: "passVoterId", value: "voter-id" },
  { key: "passDrivingLicense", value: "driving-license" },
] as const;

/** V1's rules, imported wholesale from lib/validators — including the ID-type-dependent one. */
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

/** Eleven inputs is a wall. Numbered groups + a hairline give the eye somewhere to rest. */
function Group({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="border-t border-[var(--v2-line)] pt-8 first:border-t-0 first:pt-0">
      <div className="flex gap-5">
        <span
          aria-hidden
          className="v2-eyebrow mt-4 hidden w-6 shrink-0 text-[var(--v2-text-3)] tabular-nums sm:block"
        >
          {index}
        </span>
        <div className="min-w-0 flex-1 space-y-5">{children}</div>
      </div>
    </div>
  );
}

type Status = "idle" | "pending" | "done";

export default function RegisterContent() {
  const { t } = useV2();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showIdNumber, setShowIdNumber] = useState(false);
  const [showDob, setShowDob] = useState(false);

  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Nobody under 18 may register — V1 caps the native picker at exactly that.
  const maxDob = useMemo(
    () =>
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0],
    [],
  );

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

  const reset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowIdNumber(false);
    setShowDob(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true])) as Partial<
      Record<keyof FormState, boolean>
    >;
    setTouched(allTouched);
    const errs = validateAll(form);
    setErrors(errs);
    if (hasErrors(errs)) {
      setStatus("idle");
      return;
    }

    // V1: alert("Registration successful!") then wipe the form. Same outcome — the form is
    // cleared and the reader is told what happens next — announced in the page, in their language.
    setStatus("pending");
    timer.current = window.setTimeout(() => {
      reset();
      setStatus("done");
    }, 800);
  };

  const showError = (field: keyof FormState) => (touched[field] || submitted) && errors[field];
  const errorFor = (field: keyof FormState) => (showError(field) ? errors[field] : undefined);

  const live = validateAll(form);
  const isValid = !hasErrors(live);
  const pending = status === "pending";

  // The progress cue: how much of the form is actually filled in *correctly*.
  const total = Object.keys(INITIAL_FORM).length;
  const complete = total - Object.values(live).filter(Boolean).length;
  const percent = Math.round((complete / total) * 100);

  return (
    <AuthShell aside={<RegisterPanel />}>
      <Reveal variant="up">
        <Card padding="lg" spotlight className="mx-auto max-w-xl lg:mx-0">
          <h1 className="v2-h3 text-[var(--v2-text)]">{t("enterDetails")}</h1>
          <p className="mt-2 text-xs text-[var(--v2-text-3)]">{t("allFieldsRequired")}</p>

          {/* A meter, not a wizard: the fields stay in one form, in V1's order — this only tells
              the reader how far along the wall of inputs they are. */}
          <div className="mt-6 flex items-center gap-4">
            <div
              role="progressbar"
              aria-label={t("enterDetails")}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--v2-surface-2)]"
            >
              <div
                className="h-full rounded-full bg-[var(--v2-cyan)] shadow-[0_0_12px_rgba(0,176,240,0.8)] transition-[width] duration-500 ease-[var(--v2-ease)]"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span aria-hidden className="text-xs font-bold text-[var(--v2-text-3)] tabular-nums">
              {complete}/{total}
            </span>
          </div>

          <div role="status" aria-live="polite" className="empty:hidden">
            {status === "done" && (
              <Callout tone="success" className="mt-7">
                {t("otpHint")}
                <Link
                  href={toV2("/login")}
                  className="v2-focus v2-underline mt-2 block w-fit font-bold text-[var(--v2-cyan)]"
                >
                  {t("loginToAccount")}
                </Link>
              </Callout>
            )}
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-8">
            <Group index="01">
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
                <Callout tone="warning" className="mt-3">
                  {t("otpHint")}
                </Callout>
              </div>

              <div className="relative">
                <TextField
                  label={t("password")}
                  error={errorFor("password")}
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  onBlur={() => blur("password")}
                  autoComplete="new-password"
                  style={{ paddingRight: "3rem" }}
                  required
                />
                <RevealToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
              </div>

              <div className="relative">
                <TextField
                  label={t("confirmPassword")}
                  error={errorFor("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  onBlur={() => blur("confirmPassword")}
                  autoComplete="new-password"
                  style={{ paddingRight: "3rem" }}
                  required
                />
                <RevealToggle
                  visible={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((v) => !v)}
                />
              </div>
            </Group>

            <Group index="02">
              <div className="grid gap-5 sm:grid-cols-2">
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
                placeholder={t("idTypePlaceholder")}
                error={errorFor("idType")}
                options={ID_TYPES.map(({ key, value }) => ({ value, label: t(key) }))}
                value={form.idType}
                onChange={(e) => update("idType", e.target.value)}
                onBlur={() => blur("idType")}
              />

              <div className="relative">
                <TextField
                  label={t("idNumber")}
                  error={errorFor("idNumber")}
                  type="text"
                  value={form.idNumber}
                  onChange={(e) => update("idNumber", e.target.value)}
                  onBlur={() => blur("idNumber")}
                  autoComplete="off"
                  spellCheck={false}
                  // Masked like a password until revealed — an ID number is as sensitive as one.
                  style={
                    {
                      paddingRight: "3rem",
                      ...(showIdNumber ? {} : { WebkitTextSecurity: "disc" }),
                    } as React.CSSProperties
                  }
                  required
                />
                <RevealToggle visible={showIdNumber} onToggle={() => setShowIdNumber((v) => !v)} />
              </div>

              <div className="relative">
                <TextField
                  label={t("dateOfBirth")}
                  error={errorFor("dob")}
                  type={showDob ? "text" : "date"}
                  placeholder="DD / MM / YYYY"
                  value={form.dob}
                  onChange={(e) => update("dob", e.target.value)}
                  onBlur={() => blur("dob")}
                  max={maxDob}
                  style={{ paddingRight: "3rem" }}
                  required
                />
                <RevealToggle visible={showDob} onToggle={() => setShowDob((v) => !v)} />
              </div>

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
            </Group>

            <Group index="03">
              <CheckboxField
                checked={form.agreed}
                onChange={(checked) => {
                  update("agreed", checked);
                  setTouched((prev) => ({ ...prev, agreed: true }));
                }}
                error={errorFor("agreed")}
              >
                {t("termsText")}{" "}
                <Link
                  href={toV2("/legal/terms-and-conditions")}
                  className="v2-focus font-bold text-[var(--v2-cyan)] hover:underline"
                >
                  {t("termsLink")}
                </Link>{" "}
                {t("andText")}{" "}
                <Link
                  href={toV2("/privacy-policy")}
                  className="v2-focus font-bold text-[var(--v2-cyan)] hover:underline"
                >
                  {t("privacyLink")}
                </Link>{" "}
                {t("termsFullText")}
              </CheckboxField>

              <Button
                type="submit"
                size="lg"
                full
                disabled={pending}
                // Pressable even while incomplete: that press is how the reader learns which
                // fields are still wrong. It just stops shouting until the form is valid — and it
                // stops shouting by losing its glow, not by fading out. At 55% opacity the gold
                // sank to ~4.1:1 against its own dark label, under AA for 13px bold text: the
                // button that is hardest to complete was the one hardest to read.
                className={isValid ? "" : "shadow-none"}
              >
                <span className="inline-flex items-center gap-2.5">
                  {pending && <Spinner />}
                  {t("acceptBtn")}
                </span>
              </Button>

              <p className="text-center text-sm text-[var(--v2-text-2)]">
                {t("heroAlreadyAccount")}{" "}
                <Link
                  href={toV2("/login")}
                  className="v2-focus v2-underline font-bold text-[var(--v2-cyan)]"
                >
                  {t("heroLogIn")}
                </Link>
              </p>
            </Group>
          </form>
        </Card>
      </Reveal>
    </AuthShell>
  );
}
