"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";

/* Form primitives. Labels float, errors are wired with aria-describedby, and required
   fields are marked with aria-required — the register/login flows are the only place on
   this site where a user types anything, so they get the most careful controls. */

const CONTROL =
  "peer w-full rounded-[var(--v2-r-sm)] border bg-[rgba(255,255,255,0.03)] px-4 pb-2.5 pt-6 text-[15px] text-[var(--v2-text)] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-transparent focus:border-[var(--v2-cyan)] focus:bg-[rgba(0,176,240,0.05)] focus:shadow-[0_0_0_4px_rgba(0,176,240,0.12)]";

const LABEL =
  "pointer-events-none absolute left-4 top-4 origin-left text-sm text-[var(--v2-text-3)] transition-all duration-200 ease-[var(--v2-ease)] peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[var(--v2-cyan)] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]";

interface FieldWrapProps {
  id: string;
  /** Pre-translated. */
  label: ReactNode;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

function FieldShell({ id, error, hint, children, className = "" }: Omit<FieldWrapProps, "label" | "required">) {
  return (
    <div className={className}>
      <div className="relative">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-[var(--v2-error)]">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-[var(--v2-text-3)]">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> {
  label: ReactNode;
  error?: string;
  hint?: ReactNode;
  className?: string;
}

export function TextField({ label, error, hint, className, required, ...rest }: TextFieldProps) {
  const id = useId();

  return (
    <FieldShell id={id} error={error} hint={hint} className={className}>
      <input
        id={id}
        // A space, not "" — the floating label keys off :placeholder-shown, which needs a
        // non-empty placeholder to ever be *not* shown.
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        aria-required={required || undefined}
        className={`${CONTROL} ${
          error ? "border-[var(--v2-error)]" : "border-[var(--v2-line-2)]"
        }`}
        {...rest}
      />
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
    </FieldShell>
  );
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className"> {
  label: ReactNode;
  error?: string;
  hint?: ReactNode;
  options: { value: string; label: string }[];
  /** Pre-translated placeholder row. */
  placeholder?: string;
  className?: string;
}

export function SelectField({
  label,
  error,
  hint,
  options,
  placeholder,
  className,
  required,
  ...rest
}: SelectFieldProps) {
  const id = useId();

  return (
    <FieldShell id={id} error={error} hint={hint} className={className}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        aria-required={required || undefined}
        className={`${CONTROL} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%236c7c91%22 stroke-width=%222%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11 ${
          error ? "border-[var(--v2-error)]" : "border-[var(--v2-line-2)]"
        }`}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          // The native menu is painted by the OS, which does not inherit the page's dark
          // canvas — set the colours explicitly or the options are white-on-white.
          <option key={option.value} value={option.value} className="bg-[#0b1220] text-white">
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={id} className={`${LABEL} peer-valid:top-2 peer-valid:text-[11px]`}>
        {label}
      </label>
    </FieldShell>
  );
}

interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  error?: string;
  className?: string;
}

export function CheckboxField({ checked, onChange, children, error, className = "" }: CheckboxFieldProps) {
  const id = useId();

  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="v2-focus mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[5px] border border-[var(--v2-line-2)] bg-[rgba(255,255,255,0.04)] transition-all duration-200 checked:border-[var(--v2-cyan)] checked:bg-[var(--v2-cyan)] checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2304202c%22%3E%3Cpath d=%22M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z%22/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat"
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-[var(--v2-text-2)]">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-[var(--v2-error)]">
          {error}
        </p>
      )}
    </div>
  );
}
