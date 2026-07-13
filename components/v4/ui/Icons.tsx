import type { SVGProps } from "react";

/**
 * V4's icon set.
 *
 * One system, drawn to one spec: a 24×24 grid, a 1.75px stroke, round caps and joins, no fills, no
 * two-tone, no duotone accent. They are geometric rather than illustrative — an instrument's
 * engraving, not a sticker — which is what keeps a page of them quiet.
 *
 * Drawn here rather than imported from `@/components/icons` (V1's set, which V2 also uses) because
 * that set is a mixed bag of fill weights and 20/24px grids inherited from the original site, and a
 * "premium icon system" that is inconsistent at the stroke level is not one. V3 reached the same
 * conclusion and drew its own.
 *
 * Every icon here is decorative by default: it sits beside a real text label and is hidden from the
 * accessibility tree (`aria-hidden`). An icon that is the *only* content of a control gets its
 * label from the control's `aria-label`, never from the glyph.
 */

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: IconProps) {
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

/* ── The four tasks ──────────────────────────────────────────────────────────────────────────── */

/** Score: a dial needle on an arc — the instrument, reduced to two strokes. */
export const ScoreIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 17.5a9 9 0 1 1 17 0" />
    <path d="M12 17.5 16 10" />
    <circle cx="12" cy="17.5" r="1.4" />
  </Icon>
);

/** Dispute: a document with a correction mark. */
export const DisputeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="m9 14 2 2 4-4" />
  </Icon>
);

/** Plans: stacked plates, seen edge-on. */
export const PlansIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3 9 4.5-9 4.5-9-4.5z" />
    <path d="m3 12.5 9 4.5 9-4.5" />
    <path d="m3 17 9 4.5 9-4.5" />
  </Icon>
);

/** Support: a headset. */
export const SupportIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2z" />
    <path d="M4 15a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2z" />
    <path d="M20 17v1a3 3 0 0 1-3 3h-3" />
  </Icon>
);

/* ── Navigation and controls ─────────────────────────────────────────────────────────────────── */

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Icon>
);

export const ArrowUpIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20V5" />
    <path d="m6 11 6-6 6 6" />
  </Icon>
);

/** The one glyph that means "this leaves the site" — used on every external link. */
export const ExternalIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 5h10v10" />
    <path d="M19 5 5 19" />
  </Icon>
);

export const GlobeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Icon>
);

export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);

export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

/* ── Meaning ─────────────────────────────────────────────────────────────────────────────────── */

export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const AlertIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4.5 2.8 20h18.4z" />
    <path d="M12 10v4" />
    <path d="M12 17.2v.1" />
  </Icon>
);

export const InfoIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <path d="M12 8v.1" />
  </Icon>
);

export const BellIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9" />
    <path d="M10 18a2 2 0 0 0 4 0" />
  </Icon>
);

export const DocumentIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M8.5 13h7M8.5 16.5h4.5" />
  </Icon>
);

export const ChartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <path d="m7.5 15.5 3.5-4 3 2.5 4.5-6" />
  </Icon>
);

export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </Icon>
);

export const BuildingIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
    <path d="M15 10h2a2 2 0 0 1 2 2v9" />
    <path d="M3 21h18" />
    <path d="M9 7.5h2M9 11.5h2M9 15.5h2" />
  </Icon>
);

export const UsersIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3 19.5a6 6 0 0 1 12 0" />
    <path d="M16 5.6a3.2 3.2 0 0 1 0 5.8" />
    <path d="M17.5 14.4A6 6 0 0 1 21 19.5" />
  </Icon>
);

export const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4.5" y="10" width="15" height="10.5" rx="2" />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
  </Icon>
);

export const DownloadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4.5 19.5h15" />
  </Icon>
);

export const PlayIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5 16 12l-6 3.5z" />
  </Icon>
);

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Icon>
);

export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Icon>
);

export const ScaleIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4v16" />
    <path d="M6 8h12" />
    <path d="M6 8 3 15h6z" />
    <path d="m18 8-3 7h6z" />
  </Icon>
);

/** The Launcher's own mark: an aperture — four blades around an opening. V4's one house glyph. */
export const ApertureIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 3.5 12 12l7.4 4.3" />
    <path d="M4.6 16.3 12 12l-7.4-4.3" />
    <path d="M19.4 7.7 12 12l0 8.5" />
  </Icon>
);

/** Maps a `NavTask.icon` name to its glyph. Keeps the icon choice in data, not in JSX. */
export const TASK_ICONS = {
  score: ScoreIcon,
  dispute: DisputeIcon,
  plans: PlansIcon,
  support: SupportIcon,
} as const;
