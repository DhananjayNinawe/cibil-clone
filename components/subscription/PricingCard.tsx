import Link from "next/link";
import { CheckCircleIcon, CrossCircleIcon } from "@/components/icons";

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  saveBadge?: string;
  features: PricingFeature[];
  featuresIncludeLabel: string;
  subscribeLabel: string;
  highlighted?: boolean;
}

export default function PricingCard({
  name,
  price,
  period,
  saveBadge,
  features,
  featuresIncludeLabel,
  subscribeLabel,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`bg-white rounded-lg border p-6 flex flex-col h-full ${
        highlighted ? "border-[#f5c518] shadow-md" : "border-gray-200 shadow-sm"
      }`}
    >
      <p className="text-sm text-gray-500 mb-1">{name}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{price}</p>
        {saveBadge && (
          <span className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2.5 py-0.5">
            {saveBadge}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-5">{period}</p>

      <Link
        href="/register"
        className="w-full text-center border-2 border-[#f5c518] rounded-full py-2.5 text-sm font-bold text-gray-800 hover:bg-[#f5c518] transition-colors mb-6"
      >
        {subscribeLabel}
      </Link>

      <p className="text-sm text-gray-500 mb-3">{featuresIncludeLabel}</p>
      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature.label} className="flex items-center gap-2 text-sm text-gray-700">
            {feature.included ? <CheckCircleIcon /> : <CrossCircleIcon />}
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
