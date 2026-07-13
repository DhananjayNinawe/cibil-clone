"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";
import { validateAgreed, validateMobile } from "@/lib/validators";
import { Container, Section } from "@/components/v4/ui/Layout";
import { BellIcon, ChartIcon, ChevronDownIcon, ScoreIcon, type IconProps } from "@/components/v4/ui/Icons";
import Notice from "@/components/v4/ui/Notice";
import { Reveal } from "@/components/v4/motion/Reveal";
import {
  CheckboxField,
  ErrorSummary,
  Field,
  SubmitButton,
  TrustStrip,
  type SubmitStatus,
  type SummaryItem,
} from "@/components/v4/pages/auth/AuthForm";

/**
 * Login.
 *
 * One field and one checkbox. That is the whole task, and the page is built to say so: no hero, no
 * mega-nav of products, no photograph of a woman looking pleased about her credit file — a single
 * plane of light with the form on it, and the page's own canvas around it.
 *
 * V1 puts its three value propositions in a five-second auto-rotating carousel beside the form. The
 * promises are worth keeping; the carousel is not. A thing that moves on its own beside the field
 * you are typing into is competing with the field you are typing into — and a reader who wants the
 * third promise has to wait ten seconds for it, or hunt for a dot. Here all three are simply
 * present, held still, in a quiet column that reads as reassurance rather than as an advert.
 */

interface ValueProp {
  Glyph: ComponentType<IconProps>;
  title: TranslationKey;
  subtitle: TranslationKey;
}

/** V1's three slides, in V1's order, with V1's keys — standing still. */
const PROMISES: ValueProp[] = [
  { Glyph: ScoreIcon, title: "loginScoreTitle", subtitle: "loginScoreSubtitle" },
  { Glyph: BellIcon, title: "loginStayTitle", subtitle: "loginStaySubtitle" },
  { Glyph: ChartIcon, title: "loginSimulatorTitle", subtitle: "loginSimulatorSubtitle" },
];

/** The three courtesy links under the form. V1 parks "FAQs" on `href="#"`; V4 never does. */
const COURTESY: { key: TranslationKey; href: string }[] = [
  { key: "faqs", href: "/faq/credit-score-and-loan-basics" },
  { key: "termsConditions", href: "/legal/terms-and-conditions" },
  { key: "privacyPolicy", href: "/privacy-policy" },
];

interface FormState {
  mobile: string;
  agreed: boolean;
}

/**
 * Hoisted, all three of them, rather than written inline at the `useState` call.
 *
 * A generic written inline — `useState<Partial<Record<FieldName, boolean>>>({})` — is a trap in this
 * repo: `scripts/check-i18n.mjs` scans each line for `>…<` to find hardcoded JSX text, and a line
 * carrying both an arrow function and a type argument hands it exactly that shape. The type alias is
 * clearer anyway; it just also happens to be the only spelling the checker can read.
 */
type FieldName = keyof FormState;
type FormErrors = Partial<Record<FieldName, string>>;
type Touched = Partial<Record<FieldName, boolean>>;

/** Focus order *is* error order: the summary must list problems in the order they appear. */
const FIELD_ORDER: FieldName[] = ["mobile", "agreed"];

const ID: Record<FieldName, string> = {
  mobile: "v4-login-mobile",
  agreed: "v4-login-terms",
};

const LABEL: Record<FieldName, TranslationKey> = {
  mobile: "enterRegisteredMobile",
  agreed: "termsLink",
};

const INITIAL_FORM: FormState = { mobile: "", agreed: false };

const ALL_TOUCHED: Touched = { mobile: true, agreed: true };

function validateAll(form: FormState): FormErrors {
  return {
    mobile: validateMobile(form.mobile),
    agreed: validateAgreed(form.agreed),
  };
}

function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some(Boolean);
}

export default function LoginContent() {
  const { t, t4 } = useV4();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [termsExpanded, setTermsExpanded] = useState(false);
  /** The username route is not wired in this build — V1 says as much, from an `alert()`. */
  const [usernameNotice, setUsernameNotice] = useState(false);

  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const update = (field: FieldName, value: string | boolean) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setStatus("idle");
    // Re-validate as they type only once the field has already spoken — correcting an error the
    // reader is in the middle of fixing is help; announcing one they have not finished making is not.
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
    setUsernameNotice(false);

    const errs = validateAll(form);
    setErrors(errs);

    if (hasErrors(errs)) {
      // Focus the first thing that is wrong. Without this the reader is bounced back to a form that
      // looks unchanged, with the caret still on a submit button that appears to do nothing.
      // `getElementById` rather than a ref map: the id is already the one the <label for> points at,
      // so it is guaranteed to exist and guaranteed to be the labelled control.
      const first = FIELD_ORDER.find((field) => errs[field]);
      if (first) document.getElementById(ID[first])?.focus();
      return;
    }

    // V1 dispatches the OTP from an alert(). Same trigger, same guard — the answer lands in the
    // page, where it is announced, and can be read at the reader's own pace.
    setStatus("pending");
    timer.current = window.setTimeout(() => setStatus("done"), 700);
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

  return (
    <Section space="lg" className="overflow-hidden">
      {/* The optical field. It does not move: a bureau that shimmers is a bureau that is hiding
          something, and this is the page where the reader is deciding whether to trust one. */}
      <div className="v4-field" aria-hidden="true" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">
          {/* ── The task ───────────────────────────────────────────────────────────────────── */}
          <Reveal>
            <p className="v4-label">
              <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
              <span className="ml-2.5">{t("login")}</span>
            </p>

            <h1 className="v4-h1 mt-4">{t("loginToAccount")}</h1>

            <div className="v4-plane mt-8 p-6 sm:p-8">
              <form onSubmit={handleSubmit} noValidate>
                {/* Announced the moment it appears, so a reader who submitted from the bottom of the
                    form hears what is wrong without having to go looking for it. */}
                <ErrorSummary id="v4-login-errors" items={summary} />

                <Field
                  id={ID.mobile}
                  label={t("enterRegisteredMobile")}
                  error={errorFor("mobile")}
                  className={summary.length ? "mt-6" : ""}
                  type="tel"
                  // An *example*, not a label — the label is above, and it stays there.
                  placeholder={t("mobilePlaceholder")}
                  value={form.mobile}
                  onChange={(event) => update("mobile", event.target.value.replace(/\D/g, ""))}
                  onBlur={() => blur("mobile")}
                  maxLength={10}
                  inputMode="numeric"
                  // WCAG 1.3.5. Not a convenience: for a reader with a motor impairment, ten digits
                  // typed by hand is ten chances to mistype them.
                  autoComplete="tel"
                  required
                />

                <CheckboxField
                  id={ID.agreed}
                  className="mt-6"
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
                  <span
                    id="v4-login-terms-full"
                    className={termsExpanded ? "" : "line-clamp-1"}
                  >
                    {t("termsFullText")}
                  </span>
                </CheckboxField>

                {/* Outside the <label>: a button nested in a label is a button that toggles the
                    checkbox every time it is pressed. */}
                <button
                  type="button"
                  onClick={() => setTermsExpanded((v) => !v)}
                  aria-expanded={termsExpanded}
                  aria-controls="v4-login-terms-full"
                  className="mt-2 ml-[30px] inline-flex items-center gap-1 text-xs font-bold text-[var(--v4-accent)] hover:text-[var(--v4-accent-hover)]"
                >
                  {termsExpanded ? t("readLess") : t("readMore")}
                  <ChevronDownIcon
                    size={13}
                    className={`transition-transform duration-200 ${termsExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {/* One polite live region for everything the flow says back — the pending state and
                    the result both. Polite, not assertive: nothing here is an emergency. */}
                <div role="status" aria-live="polite" className="empty:hidden">
                  {status === "pending" ? <span className="v4-sr">{t4("v4Loading")}</span> : null}

                  {status === "done" ? (
                    <Notice tone="success" className="mt-6">
                      <span className="v4-num block font-bold text-[var(--v4-ink)]">
                        +91 {form.mobile}
                      </span>
                      {t("otpHint")}
                    </Notice>
                  ) : null}

                  {usernameNotice ? (
                    <Notice tone="info" className="mt-6">
                      {t("sectionContentComingSoon")}
                    </Notice>
                  ) : null}
                </div>

                <div className="mt-7">
                  <SubmitButton status={status} valid={valid}>
                    {t("sendOtp")}
                  </SubmitButton>
                </div>
              </form>

              <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-[var(--v4-edge)]" />
                <span className="v4-caption lowercase">{t("orDivider")}</span>
                <span className="h-px flex-1 bg-[var(--v4-edge)]" />
              </div>

              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setUsernameNotice(true);
                }}
                className="v4-btn v4-btn-secondary v4-btn-lg w-full"
              >
                {t("loginWithUsername")}
              </button>

              <Link
                href={toV4("/register")}
                className="v4-link mx-auto mt-6 block w-fit text-center text-sm"
              >
                {t("createAccountLink")}
              </Link>

              <div className="mt-7 border-t border-[var(--v4-edge)] pt-6">
                <TrustStrip />
              </div>
            </div>

            {/* Not a <nav>: three courtesy links, and the shell already owns the page's named
                navigation landmarks. */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {COURTESY.map((link) => (
                <Link
                  key={link.key}
                  href={toV4(link.href)}
                  className="v4-caption font-semibold hover:text-[var(--v4-fg)]"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </Reveal>

          {/* ── The reassurance ────────────────────────────────────────────────────────────── */}
          <aside className="lg:pt-14">
            <Reveal index={1}>
              <p className="v4-label">
                <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
                <span className="ml-2.5">{t("infoForGood")}</span>
              </p>

              <ul className="mt-7">
                {PROMISES.map(({ Glyph, title, subtitle }) => (
                  <li
                    key={title}
                    className="flex items-start gap-4 border-t border-[var(--v4-edge)] py-6 first:border-t-0 first:pt-0"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--v4-r-xs)] bg-[var(--v4-surface-2)] text-[var(--v4-accent)]">
                      <Glyph size={19} />
                    </span>
                    <div className="min-w-0">
                      <h2 className="v4-h3">{t(title)}</h2>
                      <p className="v4-body mt-1.5 text-[0.9375rem]">{t(subtitle)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
