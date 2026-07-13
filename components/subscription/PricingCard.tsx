import Link from "next/link";
import { CheckCircleIcon, CrossCircleIcon } from "@/components/icons";

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingCardProps {
  name: string;
  price: string;
  /** Struck-through list price shown above `price` when the plan is discounted. */
  wasPrice?: string;
  /** Billing duration, rendered after a "/" separator. */
  duration: string;
  saveBadge?: string;
  features: PricingFeature[];
  subscribeLabel: string;
  /** Renders the plan header on the dark brand panel with a filled CTA (used by Premium). */
  highlighted?: boolean;
}

export default function PricingCard({
  name,
  price,
  wasPrice,
  duration,
  saveBadge,
  features,
  subscribeLabel,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#9fdcf4] bg-white">
      {/* Plan header: name, price, CTA */}
      <div className={`px-6 pt-6 pb-7 ${highlighted ? "bg-[#0b5b84]" : ""}`}>
        <p className={`text-lg ${highlighted ? "text-white" : "text-gray-700"}`}>{name}</p>

        {/* Kept in the flow even when empty so prices line up across cards. */}
        <p
          className={`mt-4 text-sm line-through ${highlighted ? "text-white/70" : "text-gray-400"} ${
            wasPrice ? "" : "invisible"
          }`}
          aria-hidden={!wasPrice}
        >
          {wasPrice ?? "—"}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className={`text-3xl font-bold ${highlighted ? "text-white" : "text-gray-900"}`}>{price}</span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className={`text-sm ${highlighted ? "text-white/90" : "text-gray-600"}`}>/ {duration}</span>
          {saveBadge && (
            <span className="rounded-full bg-[#7ddaa8] px-2.5 py-0.5 text-[11px] font-bold text-[#0a3a52]">
              {saveBadge}
            </span>
          )}
        </div>

        <Link
          href="/register"
          className={`mt-6 block rounded-full py-2.5 text-center text-xs font-bold tracking-wide transition-colors ${
            highlighted
              ? "bg-[#f5c518] text-gray-900 hover:bg-[#e8b800]"
              : "border border-[#f5c518] text-gray-800 hover:bg-[#f5c518]"
          }`}
        >
          {subscribeLabel}
        </Link>
      </div>

      {/* Feature list */}
      <ul className={`flex-1 space-y-4 px-6 py-6 ${highlighted ? "" : "border-t border-gray-200"}`}>
        {features.map((feature) => (
          <li key={feature.label} className="flex items-center gap-3 text-sm text-gray-700">
            {feature.included ? (
              <CheckCircleIcon className="h-4.5 w-4.5 shrink-0 text-[#00b0f0]" />
            ) : (
              <CrossCircleIcon className="h-4.5 w-4.5 shrink-0 text-[#e8503a]" />
            )}
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
