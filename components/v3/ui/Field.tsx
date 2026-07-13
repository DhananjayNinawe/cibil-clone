"use client";

import { useId } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { Check, ChevronDown } from "@/components/v3/ui/Icons";

/**
 * V3's form controls.
 *
 * An input here is a *ruled line you write on*, not a box you type into: label above in the mono
 * voice, a hairline under the field, and nothing else. It is how a paper form works, it removes
 * an entire layer of borders and fills from every page that carries a form, and it makes the
 * focus state unmissable — the rule thickens and turns pine.
 *
 * Every label, hint, placeholder and error arrives pre-translated. These components never hold
 * a literal.
 */

const FIELD_BASE =
  "w-full bg-transparent border-0 border-b border-[var(--v3-line-2)] pb-2.5 pt-1 text-[var(--v3-fg)] " +
  "placeholder:text-[var(--v3-fg-3)] focus:outline-none focus:border-[var(--v3-accent)] " +
  "focus:border-b-2 focus:pb-2 transition-colors duration-200";

const LABEL = "v3-folio block mb-2";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Pre-translated. */
  label: string;
  error?: string;
  hint?: string;
}

export function TextField({ label, error, hint, className = "", required, ...rest }: TextFieldProps) {
  const id = useId();
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <label htmlFor={id} className={LABEL}>
        {label}
        {/* An asterisk is a glyph, not language — but it still needs to be announced, and the
            `required` attribute below is what does that. This is purely the visual mark. */}
        {required && <span aria-hidden className="ml-1 text-[var(--v3-clay)]">*</span>}
      </label>

      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`${FIELD_BASE} ${error ? "border-[var(--v3-error)]" : ""}`}
        {...rest}
      />

      {hint && !error && (
        <p id={`${id}-hint`} className="v3-caption mt-2">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="v3-caption mt-2 text-[var(--v3-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

export function SelectField({ label, error, children, className = "", required, ...rest }: SelectFieldProps) {
  const id = useId();

  return (
    <div className={className}>
      <label htmlFor={id} className={LABEL}>
        {label}
        {required && <span aria-hidden className="ml-1 text-[var(--v3-clay)]">*</span>}
      </label>

      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${FIELD_BASE} appearance-none pr-8 ${error ? "border-[var(--v3-error)]" : ""}`}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-1 bottom-3 text-sm text-[var(--v3-fg-3)]" />
      </div>

      {error && (
        <p id={`${id}-error`} className="v3-caption mt-2 text-[var(--v3-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  error?: string;
  className?: string;
}

/** A square that gets a tick struck into it. No rounding, no fill animation. */
export function CheckboxField({ checked, onChange, children, error, className = "" }: CheckboxFieldProps) {
  const id = useId();

  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <span className="relative mt-0.5 shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className="v3-focus peer h-[18px] w-[18px] cursor-pointer appearance-none border border-[var(--v3-line-3)] bg-transparent transition-colors checked:border-[var(--v3-accent)] checked:bg-[var(--v3-accent)]"
          />
          <Check className="pointer-events-none absolute inset-0 m-auto hidden h-3 w-3 text-[var(--v3-accent-contrast)] peer-checked:block" />
        </span>

        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-[var(--v3-fg-2)]">
          {children}
        </label>
      </div>

      {error && (
        <p id={`${id}-error`} className="v3-caption mt-2 text-[var(--v3-error)]">
          {error}
        </p>
      )}
    </div>
  );
}
