"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { TranslationKey } from "@/lib/i18n";
import { validateMobile, validateAgreed } from "@/lib/validators";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, Folio } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import Rule from "@/components/v3/ui/Rule";
import { TextField, CheckboxField } from "@/components/v3/ui/Field";
import { ChevronDown } from "@/components/v3/ui/Icons";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * Login.
 *
 * V1 sets a rounded white card beside a rotating carousel; V3 sets a spread. The reasons to hold a
 * CIBIL account — V1's three carousel slides, same keys, same order — become a numbered ledger you
 * read down the left of the page, and the form is a single ruled column hung off a hairline on the
 * right. Nothing rotates: a carousel hides two thirds of its argument at any moment, and a printed
 * page has no reason to.
 *
 * The form itself is V1's, unchanged where it matters: the same two fields, the same validators
 * (`lib/validators.ts`), the same "touched or submitted" error timing, and the same terms text with
 * its read-more. What changed is where the flow speaks back. V1 fires `alert("OTP sent to …")`,
 * which is untranslatable, unstyleable and gone the moment it is dismissed. Here the confirmation
 * lands in the page, in a polite live region, in the reader's own language.
 */

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

/** V1's carousel slides, read as entries instead of rotated. */
const REASONS: { image: string; title: TranslationKey; body: TranslationKey }[] = [
  { image: "/login/login-banner.svg", title: "loginScoreTitle", body: "loginScoreSubtitle" },
  { image: "/login/login-banner-3.svg", title: "loginStayTitle", body: "loginStaySubtitle" },
  { image: "/login/login-banner-4.svg", title: "loginSimulatorTitle", body: "loginSimulatorSubtitle" },
];

/** V1's three courtesy links. Its "FAQs" is an `href="#"` dead end; V3 forbids those, so it points
    at the general FAQ set — the destination the label already promises. */
const COURTESY: { key: TranslationKey; href: string }[] = [
  { key: "faqs", href: "/faq/credit-score-and-loan-basics" },
  { key: "termsConditions", href: "/legal/terms-and-conditions" },
  { key: "privacyPolicy", href: "/privacy-policy" },
];

export default function LoginContent() {
  const { t, t3 } = useV3();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [termsExpanded, setTermsExpanded] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  /** The username route is not wired in this build — V1 says so in an `alert()`. */
  const [usernameNotice, setUsernameNotice] = useState(false);

  const update = (field: keyof FormState, value: string | boolean) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setSentTo(null);
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

    setUsernameNotice(false);
    setSentTo(form.mobile);
  };

  const showError = (field: keyof FormState) => (touched[field] || submitted) && errors[field];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: t("searchHome"), href: toV3("/") }, { label: t("login") }]}
        folio={t("sitemapMyAccount")}
        title={t("loginToAccount")}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            {/* ── The argument. A numbered ledger, read top to bottom. */}
            <div className="order-2 min-w-0 lg:order-1">
              <Folio index="01">{t3("v3KeyPoints")}</Folio>

              <ol className="mt-8 border-t border-[var(--v3-line-2)]">
                {REASONS.map((reason, i) => (
                  <Reveal key={reason.image} variant="rise" delay={i * 80} as="li">
                    <div className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-8 sm:grid-cols-[4rem_1fr] sm:gap-x-8 sm:py-10">
                      <span aria-hidden className="v3-num pt-1.5 text-sm text-[var(--v3-fg-3)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <h2 className="v3-h3 text-pretty">{t(reason.title)}</h2>
                        <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                          {t(reason.body)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>

              {/* The one image on the page: plated, cropped, still. */}
              <Reveal variant="plate" delay={120} className="mt-12 hidden sm:block">
                <div className="v3-plate v3-plate-mount relative aspect-[16/9]">
                  <Image
                    src={REASONS[0].image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    priority
                    className="object-contain p-8"
                  />
                </div>
              </Reveal>
            </div>

            {/* ── The form. One ruled column, hung off a hairline. */}
            <div className="order-1 min-w-0 lg:order-2 lg:border-l lg:border-[var(--v3-line)] lg:pl-12">
              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  label={t("enterRegisteredMobile")}
                  // The example number is a numeral token; it reads as a hint under the rule.
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
                  className="mt-8"
                  checked={form.agreed}
                  onChange={(checked) => {
                    update("agreed", checked);
                    setTouched((prev) => ({ ...prev, agreed: true }));
                  }}
                  error={showError("agreed") ? errors.agreed : undefined}
                >
                  {t("termsText")}{" "}
                  <Link href={toV3("/legal/terms-and-conditions")} className="v3-focus v3-link">
                    {t("termsLink")}
                  </Link>{" "}
                  {t("andText")}{" "}
                  <Link href={toV3("/privacy-policy")} className="v3-focus v3-link">
                    {t("privacyLink")}
                  </Link>{" "}
                  <span className={termsExpanded ? "" : "line-clamp-1"}>{t("termsFullText")}</span>
                </CheckboxField>

                {/* Outside the checkbox's label: a button inside a <label> would toggle the box. */}
                <button
                  type="button"
                  onClick={() => setTermsExpanded((v) => !v)}
                  aria-expanded={termsExpanded}
                  className="v3-focus v3-folio mt-3 ml-[30px] inline-flex items-center gap-1.5 text-[var(--v3-accent)]"
                >
                  {termsExpanded ? t("readLess") : t("readMore")}
                  <ChevronDown
                    className={`text-sm transition-transform duration-300 ${termsExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Everything the flow says back to the reader is announced from one live region. */}
                <div role="status" aria-live="polite" className="empty:hidden">
                  {sentTo && (
                    <Callout tone="success" className="mt-8">
                      <span className="v3-num block font-medium text-[var(--v3-fg)]">+91 {sentTo}</span>
                      {t("otpHint")}
                    </Callout>
                  )}

                  {usernameNotice && (
                    <Callout tone="note" className="mt-8">
                      {t("sectionContentComingSoon")}
                    </Callout>
                  )}
                </div>

                <Button type="submit" size="lg" full arrow className="mt-9">
                  {t("sendOtp")}
                </Button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <Rule className="flex-1" still />
                <span className="v3-folio">{t("orDivider")}</span>
                <Rule className="flex-1" still />
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                full
                onClick={() => {
                  setSentTo(null);
                  setUsernameNotice(true);
                }}
              >
                {t("loginWithUsername")}
              </Button>

              <Link
                href={toV3("/register")}
                className="v3-focus v3-link mx-auto mt-9 block w-fit text-sm font-medium"
              >
                {t("createAccountLink")}
              </Link>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--v3-line)] pt-8">
                {COURTESY.map((link) => (
                  <Link
                    key={link.key}
                    href={toV3(link.href)}
                    className="v3-focus v3-folio v3-link-draw text-[var(--v3-fg-2)]"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
