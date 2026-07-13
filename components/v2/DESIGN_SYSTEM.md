# V2 design system

V2 is a complete redesign of the site living under `/v2`. **V1 is production and is read-only.**
Everything V2 adds lives in exactly three places:

```
app/v2/**            routes (mirrors V1's tree: /foo → /v2/foo)
components/v2/**     components
lib/v2/**            data, hooks, motion, i18n
```

Never edit anything outside those three. Read V1 all you like — import its data, its icons, its
validators, its translation catalog. Do not modify them.

## Non-negotiables

1. **No hardcoded user-visible text. Ever.** Every string goes through `t()` (V1's catalog) or
   `tv()` (V2's own chrome catalog), including `alt`, `aria-label`, `title` and `placeholder`.
   The only Latin-script literals allowed are brand names (CIBIL, TransUnion, RBI, NBFC, PAN),
   emails, URLs, prices and numerals.
2. **Do not add translation keys.** V1's catalog already holds every string the product says, in
   four languages. A faithful redesign needs no new copy. If a page seems to need a string with
   no key, restructure to use an existing one — or report it rather than inventing English-only text.
3. **Reuse V1's data files** (`lib/blogCards.ts`, `lib/nodalOfficerData.ts`, `lib/privacyPolicyData/`,
   `lib/legalPageData/`, `lib/gistRbiSchemeData/`, `lib/footerPageData.ts`, `lib/searchIndex.ts`,
   `lib/validators.ts`, `components/icons.tsx`). Import them. Never copy their content into a new file.
4. **Every internal href goes through `toV2()`** (`lib/v2/routes.ts`), so V2 never links into V1.
5. **`next/image` for remote art must set `unoptimized`.** `next.config.ts` is V1's file and only
   whitelists some cibil.com paths; the optimizer rejects the rest. V1 hits the same wall.

## Page shape

`app/v2/<path>/page.tsx` — server component, exports `metadata`, renders one content component:

```tsx
import type { Metadata } from "next";
import FooContent from "@/components/v2/pages/FooContent";

export const metadata: Metadata = { title: "…", description: "…" };

export default function Page() {
  return <FooContent />;
}
```

`components/v2/pages/FooContent.tsx` — `"use client"`, because it needs `t()`.
Do **not** add a `layout.tsx` under `app/v2/*`: the shell (nav, footer, scroll rail, skip link) is
already provided by `app/v2/layout.tsx`.

## Translation hook

```tsx
const { t, tv, language } = useV2();   // from "@/lib/v2/useV2"
t("heroCta")        // V1 catalog — typed against TranslationKey
tv("v2ScrollHint")  // V2 chrome catalog — typed against V2TranslationKey
```

## Tokens (CSS custom properties, defined on `.v2-root` in `app/v2/v2.css`)

| Purpose | Token |
| --- | --- |
| Canvas / raised / deep | `--v2-bg`, `--v2-bg-2`, `--v2-elev-1`, `--v2-elev-2` |
| Brand | `--v2-cyan` `#00b0f0`, `--v2-cyan-soft`, `--v2-gold` `#f5c518`, `--v2-deep` `#0a3a52` |
| Semantic | `--v2-success`, `--v2-warning`, `--v2-error` |
| Text | `--v2-text`, `--v2-text-2`, `--v2-text-3` |
| Lines / surfaces | `--v2-line`, `--v2-line-2`, `--v2-surface`, `--v2-surface-2` |
| Radii | `--v2-r-sm` … `--v2-r-xl` |
| Shadows | `--v2-shadow-1..3`, `--v2-glow-cyan`, `--v2-glow-gold` |
| Motion | `--v2-ease`, `--v2-dur-1..3` |

Use them in Tailwind arbitrary values: `text-[var(--v2-text-2)]`, `rounded-[var(--v2-r-lg)]`.

Utility classes: `.v2-display` `.v2-h2` `.v2-h3` `.v2-lede` `.v2-eyebrow` (type), `.v2-glass`
`.v2-rim` `.v2-noise` `.v2-hairline` (surface), `.v2-spotlight` `.v2-sheen` `.v2-underline`
`.v2-focus` (effects), `.v2-prose` (long-form copy).

## Components

**Layout** — `@/components/v2/ui/Layout`
`<Container width="default|wide|narrow">`, `<Section space="sm|md|lg|xl" tone="canvas|raised|deep">`,
`<SectionHeading eyebrow index="01" title lede align>`, `<Eyebrow>`, `<Divider>`

**Surfaces** — `<Card spotlight interactive padding>`, `<Plate src alt surface="light|dark" glow>`
(use `Plate` for any CIBIL artwork that might have a light background), `<Badge tone pulse>`,
`<Callout tone="info|note|warning|success" title>`, `<Prose>`, `<Backdrop tone grid noise>`

**Controls** — `<Button href variant="primary|secondary|ghost|link" size arrow magnetic full>`,
`<TextField>`, `<SelectField>`, `<CheckboxField>` (all from `ui/Field`)

**Patterns** — `<PageHero title titleAccent eyebrow lede actions breadcrumbs media tone size>`,
`<Breadcrumbs items>`, `<Accordion items multiple>`, `<Tabs items label>`, `<Steps steps layout="rail|flow">`,
`<SideNav links>`, `<DataTable columns rows caption>`, `<ArticleCard title category image href video>`,
`<StatBlock value unit label>`

**Motion** — `<Reveal variant="up|fade|blur|scale|mask|left|right" delay>`, `<SplitText text>`,
`<Parallax speed>`, `<Marquee duration>`, `<CountUp value>`
Hooks in `lib/v2/motion.ts`: `useInView`, `useSpotlight`, `useMagnetic`, `useParallax`,
`useScrollProgress`, `useScrolled`, `useCountUp`, `useReducedMotion`.

All motion is already reduced-motion-safe — do not add raw `animation:` to content.

## Quality bar

Every page opens on a `<PageHero>` with breadcrumbs, then earns its own composition. A page that
is a hero followed by a grid of identical cards has not been designed. Vary the rhythm: asymmetric
grids, editorial two-column spreads, numbered rails, oversized type, full-bleed bands, sticky side
navigation, a table that isn't a box.

Accessibility is part of the bar, not a follow-up: one `<h1>` per page, headings in order, real
landmarks, `v2-focus` on anything focusable, `aria-*` from `t()`, tables with `<caption>`.

Before you finish: `npx tsc --noEmit` must pass.
