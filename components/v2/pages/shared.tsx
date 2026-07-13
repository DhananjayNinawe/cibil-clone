"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import Badge from "@/components/v2/ui/Badge";

/**
 * Two primitives the grievance / dispute / enquiry cluster reaches for on every page.
 *
 * They live here rather than in components/v2/ui because they are specific to how these
 * ported pages read: V1's copy is written as running prose with the link buried mid-sentence
 * ("… by following these steps."), and several of its anchors are placeholders (`href="#"`)
 * because the destination is a form this repo does not host. Both facts are preserved rather
 * than papered over — the copy is V1's, and a link that goes nowhere in V1 goes nowhere here.
 */

/**
 * The dispute-resolution flow chart. V1 renders the same asset on both the consumer and the
 * microfinance dispute pages (components/dispute/ProcessDiagram.tsx, reused by
 * app/microfinance-dispute-resolution), so it is declared once here rather than twice.
 */
export const DISPUTE_DIAGRAM_IMAGE =
  "https://www.cibil.com/consumer-dispute-resolution/_jcr_content/root/contentcontainer/pagesection_83362557/contentcontainer/pagesectionwithbackg_1850981626/image.coreimg.75.1440.png/1753269038504/d1en.png";

/** Cyan inline link. Internal hrefs must already have been passed through `toV2()`. */
export function InlineLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const classes = `v2-focus v2-underline font-bold text-[var(--v2-cyan)] ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // mailto:, tel: and V1's placeholder "#" anchors all stay plain <a>; only absolute web
  // URLs leave the site, and only those get a new tab.
  const offsite = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      target={offsite ? "_blank" : undefined}
      rel={offsite ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

/**
 * The "how to reach us" tile — a lit medallion over a contact block. Shared by the MFI
 * dispute page and the complaints page, which list the same channels in the same shape.
 */
export function ContactTile({
  icon,
  title,
  children,
  note,
  delay = 0,
}: {
  icon: ReactNode;
  /** Pre-translated. */
  title: string;
  children: ReactNode;
  /** Pre-translated fine print. */
  note?: string;
  delay?: number;
}) {
  return (
    <div
      className="v2-glass v2-rim relative flex h-full flex-col rounded-[var(--v2-r-lg)] p-7 transition-[transform,box-shadow] duration-500 ease-[var(--v2-ease)] hover:-translate-y-1.5 hover:shadow-[var(--v2-shadow-3)]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        aria-hidden
        className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#0a3a52] to-[#0f5773] text-white shadow-[var(--v2-glow-cyan)]"
      >
        {icon}
      </span>

      <h3 className="mt-6 text-base font-bold text-[var(--v2-text)]">{title}</h3>
      <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-[var(--v2-text-2)]">{children}</div>
      {note && <p className="mt-auto pt-5 text-xs leading-relaxed text-[var(--v2-text-3)]">{note}</p>}
    </div>
  );
}

export interface PlanChoice {
  id: string;
  /** All four strings are pre-translated by the caller. */
  name: string;
  desc: string;
  price: string;
  note?: string;
  recommended?: boolean;
}

/**
 * The subscription chooser both enquiry pages open with.
 *
 * A real radio group, not a list of divs with a click handler: arrow keys move between the
 * options, the whole row is the label, and the selected row is announced. The prices are
 * numerals and the plan names come from the catalog, so nothing here is hardcoded copy.
 */
export function PlanPicker({
  plans,
  label,
  recommendedLabel,
}: {
  plans: PlanChoice[];
  /** Accessible name for the group — pre-translated. */
  label: string;
  /** Pre-translated "Recommended" badge. */
  recommendedLabel: string;
}) {
  const name = useId();
  const [selected, setSelected] = useState(plans[0]?.id ?? "");

  return (
    <div role="radiogroup" aria-label={label} className="space-y-4">
      {plans.map((plan) => {
        const active = selected === plan.id;

        return (
          <label
            key={plan.id}
            className={`v2-rim relative flex cursor-pointer items-center justify-between gap-5 rounded-[var(--v2-r-md)] border p-5 backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 ease-[var(--v2-ease)] ${
              active
                ? "border-[var(--v2-cyan)] bg-[rgba(0,176,240,0.08)] shadow-[var(--v2-glow-cyan)]"
                : "border-[var(--v2-line)] bg-[var(--v2-surface)] hover:border-[var(--v2-line-2)]"
            }`}
          >
            {plan.recommended && (
              <Badge tone="cyan" pulse className="absolute -top-3 right-4">
                {recommendedLabel}
              </Badge>
            )}

            <span className="flex min-w-0 items-center gap-4">
              <input
                type="radio"
                name={name}
                value={plan.id}
                checked={active}
                onChange={() => setSelected(plan.id)}
                className="v2-focus h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-full border border-[var(--v2-line-2)] bg-[rgba(255,255,255,0.04)] transition-all duration-200 checked:border-[var(--v2-cyan)] checked:bg-[radial-gradient(circle,var(--v2-cyan)_38%,transparent_42%)]"
              />
              <span className="min-w-0">
                <span className="block text-[15px] font-bold text-[var(--v2-text)]">{plan.name}</span>
                <span className="mt-0.5 block text-xs text-[var(--v2-text-3)]">{plan.desc}</span>
              </span>
            </span>

            <span className="shrink-0 text-right">
              <span className="block text-lg font-bold tabular-nums text-[var(--v2-text)]">{plan.price}</span>
              {plan.note && <span className="mt-0.5 block text-xs text-[var(--v2-text-3)]">{plan.note}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}
