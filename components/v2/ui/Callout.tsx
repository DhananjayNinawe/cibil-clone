import type { ReactNode } from "react";
import { InfoIcon, LightbulbIcon, WarningTriangleIcon, CheckIcon } from "@/components/icons";

type Tone = "info" | "note" | "warning" | "success";

const TONES: Record<Tone, { wrap: string; accent: string; Icon: ({ className }: { className?: string }) => ReactNode }> = {
  info: {
    wrap: "border-[rgba(0,176,240,0.28)] bg-[rgba(0,176,240,0.07)]",
    accent: "text-[var(--v2-cyan)]",
    Icon: ({ className }) => <LightbulbIcon className={className} />,
  },
  note: {
    wrap: "border-[var(--v2-line-2)] bg-[var(--v2-surface)]",
    accent: "text-[var(--v2-text-2)]",
    // InfoIcon takes no props in V1's icon set, so it is boxed to keep the shape uniform.
    Icon: ({ className }) => (
      <span className={className}>
        <InfoIcon />
      </span>
    ),
  },
  warning: {
    wrap: "border-[rgba(245,197,24,0.3)] bg-[rgba(245,197,24,0.08)]",
    accent: "text-[var(--v2-gold)]",
    Icon: ({ className }) => <WarningTriangleIcon className={className} />,
  },
  success: {
    wrap: "border-[rgba(61,220,151,0.3)] bg-[rgba(61,220,151,0.08)]",
    accent: "text-[var(--v2-success)]",
    Icon: ({ className }) => <CheckIcon className={className} />,
  },
};

interface CalloutProps {
  children: ReactNode;
  tone?: Tone;
  /** Pre-translated heading. Optional — most callouts are a single sentence. */
  title?: ReactNode;
  className?: string;
}

/** The "important, but not the point" surface: eligibility notes, free-service banners, RBI caveats. */
export default function Callout({ children, tone = "info", title, className = "" }: CalloutProps) {
  const { wrap, accent, Icon } = TONES[tone];

  return (
    <div
      role="note"
      className={`flex gap-4 rounded-[var(--v2-r-md)] border p-5 backdrop-blur-sm ${wrap} ${className}`}
    >
      <span aria-hidden className={`mt-0.5 shrink-0 ${accent}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 text-sm leading-relaxed text-[var(--v2-text-2)]">
        {title && <p className={`mb-1 font-bold ${accent}`}>{title}</p>}
        {children}
      </div>
    </div>
  );
}
