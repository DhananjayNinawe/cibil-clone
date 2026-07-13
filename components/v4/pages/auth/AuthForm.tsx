"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { AlertIcon, CheckIcon, LockIcon, type IconProps } from "@/components/v4/ui/Icons";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The form furniture shared by V4's two authentication pages.
 *
 * These two pages are the highest-stakes interaction on the site: everything else can be re-read,
 * but a form a reader cannot complete is a customer the business never acquires. So the accessible
 * behaviour lives *here*, once, rather than being re-typed on each page where it would drift — the
 * label/input/hint/error relationship, the `aria-describedby` wiring, the error summary, and the
 * button's pending and success states.
 *
 * Three rules the whole file exists to hold:
 *
 *   1. **A placeholder is not a label.** It disappears the instant the reader types, it is announced
 *      inconsistently, and it fails 1.4.3 in most browsers' default grey. Every field here has a real
 *      `<label for>`; a placeholder is only ever an *example*.
 *   2. **An error is text, not a colour.** The red border is the last signal, never the only one
 *      (WCAG 1.4.1): the message is written out, carries a glyph, and is bound to the input with
 *      `aria-describedby` so it is *announced on focus* rather than merely painted.
 *   3. **The field speaks when the reader has finished, not while they are typing.** Validation runs
 *      on blur and on submit. Validating every keystroke scolds someone in the middle of their own
 *      email address.
 */

/* ── Glyphs ──────────────────────────────────────────────────────────────────────────────────────
 *
 * Drawn here rather than added to `ui/Icons` because the reveal toggle is the only control on the
 * site that needs them, and V4's icon set is a shared surface. They are drawn to that set's spec —
 * 24px grid, 1.75px stroke, round caps, no fill — so they sit in the same system.
 */

function Glyph({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

const EyeIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M2.6 12S6.2 5.8 12 5.8 21.4 12 21.4 12 17.8 18.2 12 18.2 2.6 12 2.6 12Z" />
    <circle cx="12" cy="12" r="3.1" />
  </Glyph>
);

const EyeOffIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M10.7 6.1A9.9 9.9 0 0 1 12 5.8c5.8 0 9.4 6.2 9.4 6.2a17.4 17.4 0 0 1-2.7 3.4" />
    <path d="M6.5 7.7A17.3 17.3 0 0 0 2.6 12S6.2 18.2 12 18.2a9.7 9.7 0 0 0 3.6-.7" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    <path d="M3.5 3.5 20.5 20.5" />
  </Glyph>
);

/* ── The error message ───────────────────────────────────────────────────────────────────────── */

/**
 * The one place an error is drawn. Glyph plus text plus colour — three signals, so removing any one
 * of them (a colour-blind reader, a screen reader, a monochrome print) still leaves two.
 */
function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p
      id={id}
      className="mt-2 flex items-start gap-1.5 text-[0.8125rem] leading-snug font-semibold text-[var(--v4-error)]"
    >
      <AlertIcon size={15} className="mt-[1px] shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/* ── The text field ──────────────────────────────────────────────────────────────────────────── */

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  /** A control that lives inside the input's right edge — the reveal toggle. */
  adornment?: ReactNode;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

export function Field({ id, label, hint, error, adornment, className = "", ...input }: FieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  // Both, in reading order: the hint explains what to type, the error says what went wrong. A field
  // that drops its hint the moment it errors takes away the information the reader needs most.
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.9375rem] font-bold text-[var(--v4-fg)]">
        {label}
      </label>

      <div className="relative mt-2">
        <input
          id={id}
          className={`v4-input ${adornment ? "pr-12" : ""}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          {...input}
        />
        {adornment}
      </div>

      {hint ? (
        <p id={hintId} className="v4-caption mt-2">
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

/* ── The select ──────────────────────────────────────────────────────────────────────────────── */

type SelectProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className" | "children">;

export function SelectField({
  id,
  label,
  error,
  children,
  className = "",
  ...select
}: SelectProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.9375rem] font-bold text-[var(--v4-fg)]">
        {label}
      </label>

      <div className="relative mt-2">
        <select
          id={id}
          className="v4-input cursor-pointer appearance-none pr-10"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...select}
        >
          {children}
        </select>
        {/* The chevron is decoration on a native control that already announces itself. */}
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--v4-fg-3)]">
          <Glyph size={16}>
            <path d="M6 9.5 12 15.5 18 9.5" />
          </Glyph>
        </span>
      </div>

      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

/* ── The checkbox ────────────────────────────────────────────────────────────────────────────── */

export function CheckboxField({
  id,
  checked,
  onChange,
  error,
  children,
  className = "",
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          // Native, not a styled <div role="checkbox">: it is reachable by Tab, toggled by Space,
          // announced with its state, and it inherits the platform's own high-contrast treatment.
          className={`mt-[3px] h-[18px] w-[18px] shrink-0 cursor-pointer rounded-[3px] accent-[var(--v4-deep)] ${
            error ? "shadow-[0_0_0_2px_var(--v4-error)]" : ""
          }`}
        />
        <label
          htmlFor={id}
          className="cursor-pointer text-[0.8125rem] leading-relaxed text-[var(--v4-fg-2)]"
        >
          {children}
        </label>
      </div>

      {error ? (
        <div className="ml-[30px]">
          <FieldError id={errorId}>{error}</FieldError>
        </div>
      ) : null}
    </div>
  );
}

/* ── The reveal toggle ───────────────────────────────────────────────────────────────────────── */

/**
 * Show/hide, for a password or an ID number.
 *
 * A real `<button type="button">` — not an icon with an onClick, which no keyboard reaches and no
 * screen reader announces — carrying an `aria-label` that *changes with its state*, so a reader who
 * cannot see the glyph still knows whether pressing it will reveal or conceal.
 *
 * `type="button"` is load-bearing: a bare <button> inside a <form> defaults to type="submit", and
 * this one would otherwise submit the registration every time someone peeked at their password.
 */
export function RevealToggle({
  visible,
  onToggle,
  label,
}: {
  visible: boolean;
  onToggle: () => void;
  /** The already-composed, already-translated label. See the note in RegisterContent. */
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={visible}
      className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-[var(--v4-r-sm)] text-[var(--v4-fg-3)] transition-colors hover:text-[var(--v4-fg)]"
    >
      {visible ? <EyeOffIcon size={19} /> : <EyeIcon size={19} />}
    </button>
  );
}

/* ── The error summary ───────────────────────────────────────────────────────────────────────── */

export interface SummaryItem {
  /** The id of the input this entry points at — the same id its `<label for>` already uses. */
  id: string;
  label: string;
  message: string;
}

/**
 * What a submit that failed says back.
 *
 * A reader who presses "Accept and Continue" at the bottom of an eleven-field form and is silently
 * returned to it has been told nothing. So the form answers in three places at once: focus moves to
 * the first bad field (the page does that), each field carries its own message (`Field` does that),
 * and this summary — `role="alert"`, so it is announced the moment it appears — lists every problem
 * with a link straight to the field that has it.
 *
 * The links are real in-page anchors and they also move focus explicitly: following a fragment to a
 * focusable element focuses it in modern browsers, but not in every one, and "not in every one" is
 * how a reader ends up scrolled to a field their caret is not in.
 */
export function ErrorSummary({ id, items }: { id: string; items: SummaryItem[] }) {
  const { t4 } = useV4();

  if (items.length === 0) return null;

  const focusField = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    const el = document.getElementById(target);
    el?.focus();
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  return (
    <div
      id={id}
      role="alert"
      tabIndex={-1}
      className="flex items-start gap-3.5 rounded-[var(--v4-r-md)] border p-4 sm:p-5"
      style={{
        background: "var(--v4-error-fill)",
        borderColor: "color-mix(in srgb, var(--v4-error) 34%, transparent)",
      }}
    >
      <AlertIcon size={19} className="mt-0.5 shrink-0 text-[var(--v4-error)]" />

      <div className="min-w-0">
        {/* The summary needs to say what it *is* before it lists what is wrong — an alert that opens
            straight into a list of field names tells a screen-reader user that something happened
            but not what. */}
        <p className="font-bold text-[var(--v4-ink)]">{t4("v4FormErrorsTitle")}</p>

        <ul className="mt-1.5 min-w-0 space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className="text-[0.8125rem] leading-snug">
            <a
              href={`#${item.id}`}
              onClick={(event) => focusField(event, item.id)}
              className="font-bold text-[var(--v4-error)] underline underline-offset-[3px]"
            >
              {item.label}
            </a>
            <span className="ml-2 text-[var(--v4-fg-2)]">{item.message}</span>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

/* ── The submit button ───────────────────────────────────────────────────────────────────────── */

export type SubmitStatus = "idle" | "pending" | "done";

/**
 * The submit, with its three states drawn rather than defaulted.
 *
 * It is never *disabled* for being invalid — only for being busy. A greyed-out button that will not
 * say why is the cruellest control in interface design: pressing it is precisely how a reader who
 * has not touched a field finds out what is missing. It only reads quieter until the form is valid.
 *
 * `aria-busy` while pending, and the pending label is announced from a live region rather than by
 * swapping the button's own text — a button whose accessible name changes under a screen-reader
 * user's cursor is a button that appears to have vanished.
 */
export function SubmitButton({
  status,
  valid,
  children,
}: {
  status: SubmitStatus;
  valid: boolean;
  children: ReactNode;
}) {
  const pending = status === "pending";

  // No margin of its own: the two forms space their children differently, and a button that brings
  // its own gap fights whichever of them wins the cascade.
  const classes = `v4-btn v4-btn-primary v4-btn-lg w-full ${valid || pending ? "" : "opacity-70"}`;

  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={classes}>
      {pending ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {status === "done" ? <CheckIcon size={17} /> : null}
      <span>{children}</span>
    </button>
  );
}

/* ── The trust strip ─────────────────────────────────────────────────────────────────────────── */

/**
 * A lock and the certifications the company actually holds. It is the last thing under the form on
 * purpose: the moment a reader hesitates over handing across a mobile number or a PAN is the moment
 * their eye is at the bottom of the form, not the top of the page.
 */
export function TrustStrip({ className = "" }: { className?: string }) {
  const { t } = useV4();

  return (
    <p
      className={`flex items-center justify-center gap-2 text-center text-[0.6875rem] font-semibold tracking-[0.06em] text-[var(--v4-fg-3)] ${className}`}
    >
      <LockIcon size={14} className="shrink-0" />
      <span>{t("footerCertifications")}</span>
    </p>
  );
}
