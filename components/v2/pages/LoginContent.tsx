"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { useReducedMotion } from "@/lib/v2/motion";
import { validateMobile, validateAgreed } from "@/lib/validators";
import { ChevronDownIcon } from "@/components/icons";
import AuthShell, { Spinner } from "@/components/v2/pages/auth/AuthShell";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Card from "@/components/v2/ui/Card";
import { CheckboxField, TextField } from "@/components/v2/ui/Field";
import { Eyebrow } from "@/components/v2/ui/Layout";
import Plate from "@/components/v2/ui/Plate";
import Reveal from "@/components/v2/motion/Reveal";

/* ------------------------------------------------------------------ marketing panel */

interface Slide {
  src: string;
  title: TranslationKey;
  subtitle: TranslationKey;
}

/** V1's three slides, in V1's order, with V1's keys and V1's art. */
const SLIDES: Slide[] = [
  { src: "/login/login-banner.svg", title: "loginScoreTitle", subtitle: "loginScoreSubtitle" },
  { src: "/login/login-banner-3.svg", title: "loginStayTitle", subtitle: "loginStaySubtitle" },
  { src: "/login/login-banner-4.svg", title: "loginSimulatorTitle", subtitle: "loginSimulatorSubtitle" },
];

const ROTATE_MS = 5000;

/**
 * The value-prop carousel.
 *
 * Same three slides, same 5s dwell, same pause-on-hover as V1 — the interval is still keyed on
 * `active`, so choosing a slide restarts the dwell rather than inheriting the tail of the last
 * one. Two things change: it also pauses while a reader is tabbing through the dots
 * (`focus-within`) or has asked for reduced motion, and each slide's dot carries a progress
 * rail instead of being a bare pill.
 */
function LoginPanel() {
  const { t, tv } = useV2();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [active, paused, reduced]);

  return (
    <div
      className="mx-auto max-w-xl lg:mx-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Reveal variant="fade">
        <Eyebrow>{tv("v2HeroKicker")}</Eyebrow>
      </Reveal>

      {/* One grid cell for every slide: the panel sizes to the tallest and crossfades in place,
          so the dots never jump as the copy changes length between languages. */}
      <div className="mt-8 grid">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== active}
            className={`col-start-1 row-start-1 transition-opacity duration-700 ease-[var(--v2-ease)] ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <h2 className="v2-h2 text-[var(--v2-text)] text-balance">{t(slide.title)}</h2>
            <p className="v2-lede mt-5 max-w-md text-pretty">{t(slide.subtitle)}</p>

            <Plate
              src={slide.src}
              alt=""
              width={520}
              height={400}
              priority={i === 0}
              className="mt-10 max-w-md"
              imageClassName="p-6"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={t(slide.title)}
            aria-current={active === i}
            onClick={() => setActive(i)}
            className="v2-focus group py-2"
          >
            <span
              className={`block h-[3px] rounded-full transition-all duration-500 ease-[var(--v2-ease)] ${
                active === i
                  ? "w-14 bg-[var(--v2-cyan)] shadow-[0_0_14px_rgba(0,176,240,0.8)]"
                  : "w-6 bg-[var(--v2-line-2)] group-hover:bg-[var(--v2-text-3)]"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- the form */

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

type Status = "idle" | "pending" | "sent";

export default function LoginContent() {
  const { t } = useV2();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [termsExpanded, setTermsExpanded] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  /** The username route is not wired in this build — V1 says so in an alert(). */
  const [usernameNotice, setUsernameNotice] = useState(false);

  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const update = (field: keyof FormState, value: string | boolean) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setStatus("idle");
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
    if (hasErrors(errs)) return;

    // V1 fires the OTP from an alert(). Same trigger, same guard — it lands in the page
    // instead, where it can be announced and read at the reader's own pace.
    setUsernameNotice(false);
    setStatus("pending");
    timer.current = window.setTimeout(() => setStatus("sent"), 700);
  };

  const showError = (field: keyof FormState) => (touched[field] || submitted) && errors[field];

  const isValid = !hasErrors(validateAll(form));
  const pending = status === "pending";

  return (
    <AuthShell aside={<LoginPanel />}>
      <Reveal variant="up">
        <Card padding="lg" spotlight className="mx-auto max-w-lg lg:mx-0">
          <h1 className="v2-h3 text-[var(--v2-text)]">{t("loginToAccount")}</h1>

          <form onSubmit={handleSubmit} noValidate className="mt-8">
            <TextField
              label={t("enterRegisteredMobile")}
              // The example number is a numeral token, and it survives as a hint: the floating
              // label already occupies the input, so a placeholder there would never be seen.
              hint={t("mobilePlaceholder")}
              error={showError("mobile") ? errors.mobile : undefined}
              type="tel"
              value={form.mobile}
              onChange={(e) => update("mobile", e.target.value.replace(/\D/g, ""))}
              onBlur={() => blur("mobile")}
              maxLength={10}
              inputMode="numeric"
              autoComplete="tel"
              required
            />

            <CheckboxField
              className="mt-6"
              checked={form.agreed}
              onChange={(checked) => {
                update("agreed", checked);
                setTouched((prev) => ({ ...prev, agreed: true }));
              }}
              error={showError("agreed") ? errors.agreed : undefined}
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
              <span className={termsExpanded ? "" : "line-clamp-1"}>{t("termsFullText")}</span>
            </CheckboxField>

            <button
              type="button"
              onClick={() => setTermsExpanded((v) => !v)}
              aria-expanded={termsExpanded}
              className="v2-focus mt-2 ml-[30px] inline-flex items-center gap-1 text-xs font-bold text-[var(--v2-cyan)] hover:text-[var(--v2-cyan-soft)]"
            >
              {termsExpanded ? t("readLess") : t("readMore")}
              <ChevronDownIcon
                className={`h-3 w-3 transition-transform duration-300 ${termsExpanded ? "rotate-180" : ""}`}
              />
            </button>

            {/* Everything the flow says back to the reader is announced from one live region. */}
            <div role="status" aria-live="polite" className="empty:hidden">
              {status === "sent" && (
                <Callout tone="success" className="mt-6">
                  <span className="block font-bold text-[var(--v2-text)] tabular-nums">
                    +91 {form.mobile}
                  </span>
                  {t("otpHint")}
                </Callout>
              )}

              {usernameNotice && (
                <Callout tone="note" className="mt-6">
                  {t("sectionContentComingSoon")}
                </Callout>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              full
              disabled={pending}
              // Never actually disabled while invalid: pressing it is how a reader who has not
              // touched a field finds out what is missing. It only *reads* quieter.
              className={`mt-7 ${isValid ? "" : "opacity-55 hover:shadow-[var(--v2-glow-gold)]"}`}
            >
              <span className="inline-flex items-center gap-2.5">
                {pending && <Spinner />}
                {t("sendOtp")}
              </span>
            </Button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-[var(--v2-line)]" />
            <span className="text-xs text-[var(--v2-text-3)] lowercase">{t("orDivider")}</span>
            <span className="h-px flex-1 bg-[var(--v2-line)]" />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="lg"
            full
            onClick={() => {
              setStatus("idle");
              setUsernameNotice(true);
            }}
          >
            {t("loginWithUsername")}
          </Button>

          <Link
            href={toV2("/register")}
            className="v2-focus v2-underline mx-auto mt-7 block w-fit text-sm font-bold text-[var(--v2-cyan)]"
          >
            {t("createAccountLink")}
          </Link>

          {/* Deliberately not a <nav>: three courtesy links, and V2 already has a named
              navigation landmark in the shell. V1's "FAQs" link is an href="#" dead end —
              it points at the general FAQ set here, since the sitemap forbids "#". */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-[var(--v2-line)] pt-7">
            {[
              { key: "faqs" as const, href: "/faq/credit-score-and-loan-basics" },
              { key: "termsConditions" as const, href: "/legal/terms-and-conditions" },
              { key: "privacyPolicy" as const, href: "/privacy-policy" },
            ].map((link) => (
              <Link
                key={link.key}
                href={toV2(link.href)}
                className="v2-focus v2-underline text-xs font-bold text-[var(--v2-text-3)] hover:text-[var(--v2-cyan)]"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </Card>
      </Reveal>
    </AuthShell>
  );
}
