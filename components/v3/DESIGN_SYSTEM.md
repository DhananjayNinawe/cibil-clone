# V3 — "The Ledger"

V3 is a complete redesign of the site living under `/v3`.
**V1 is production and V2 is a finished redesign. Both are read-only.**

Everything V3 adds lives in exactly three places:

```
app/v3/**            routes (mirrors V1's tree: /foo → /v3/foo)
components/v3/**     components
lib/v3/**            data, hooks, motion, i18n
```

Never edit anything outside those three. Read V1 and V2 all you like — import V1's data, its
validators, its search index. Do not modify them, and do not import from `lib/v2` or
`components/v2`: the two redesigns must be able to evolve, or be deleted, without touching
each other.

---

## The idea, in one paragraph

**V3 is a printed financial broadsheet, not an interface.** Its material is paper and ink; its
structure is the rule — the hairline that separates one entry from the next. There are **no cards,
no glass, no glow, and no rounded corners anywhere**. Depth comes from paper tone and ruled lines,
never from a shadow under a floating box. Headlines are set in a serif at enormous scale and
emphasised with *italic*, never with colour. Every number is mono and tabular. Motion is type being
set and rules being drawn — nothing floats, nothing chases the cursor, nothing loops.

If you find yourself writing a rounded card with a shadow and a coloured icon chip, you are
building V2. Stop.

### The contrast that matters

|  | V2 (do not repeat) | V3 (build this) |
| --- | --- | --- |
| Canvas | near-black, lit room | warm ivory paper, ink type |
| Depth | glass, glow, blur, shadow | hairline rules and paper tone. No shadows. |
| Corners | 10–34px radii | **0. Everywhere.** |
| Type | one sans (Intro), weight 300 | serif display + sans body + **mono for every number/label** |
| Emphasis | a cyan word | an *italic* word |
| Cards | glass cards in equal grids | ruled rows, numbered entries, plated figures |
| Nav | mega-menu dropdowns | a hairline masthead + full-screen **Index** |
| Motion | drift, spotlight, magnetic pull | rules draw, type wipes, figures tally |

---

## The brand is not part of the redesign

V3 redesigns the **site**. It does not redesign the **brand**. The line is absolute:

| V3 chooses freely | V3 must not touch |
| --- | --- |
| grid, layout, spacing, section rhythm | the CIBIL logo |
| typefaces for *copy* and headlines | the logo's typeface, colour, proportions or lockup |
| tone of surface (paper / ink) | CIBIL's brand colours |
| motion, interaction, iconography | the "Information for Good®" lockup |

- **The logo is an asset, never a drawing.** Use `<Logo>` (`components/v3/ui/Logo.tsx`), which
  renders CIBIL's own PNG exactly as V1 does. Never set the wordmark in the site's serif — that
  invents a second logotype, which is a rebrand nobody asked for.
- **On an ink band, mount the logo, don't recolour it.** `<Logo tone="ink">` seats the
  light-background asset on a paper plate. The trademark ships untouched.
- **"Information for Good®" is a lockup, not a headline.** Use `/ifg-lockup-yellow-grey.svg`.
- **The palette is CIBIL's**: cyan `#00b0f0`, gold `#f5c518`, deep blue `#0a3a52`. V3's art
  direction is built *around* these, not instead of them. Contrast — not taste — is why
  `--v3-accent` is the deep blue on paper and the cyan on ink, and why `--v3-gold` darkens on
  ivory: brand cyan as text on ivory is ~2.3:1 and brand gold ~1.6:1. Both appear at full
  strength wherever they are a *fill* rather than type (`--v3-mark`, `--v3-gold-brand`).

## Non-negotiables

1. **No hardcoded user-visible text. Ever.** Every string goes through `t()` (V1's catalog) or
   `t3()` (V3's own chrome catalog) — including `alt`, `aria-label`, `title` and `placeholder`.
   `npm run check:i18n` scans `components/**` and will fail the build on a literal. The only Latin
   literals allowed are brand names (CIBIL, TransUnion, RBI, NBFC, PAN), emails, URLs, prices and
   numerals.
2. **Do not add translation keys to `lib/i18n`.** V1's catalog already holds every string the
   product says, in four languages. A faithful redesign needs no new copy. If a page seems to need
   a string with no key, restructure to use an existing one — never invent English-only text.
   (V3's *chrome* catalog, `lib/v3/i18n`, is the only place V3 may add a string, and a key added to
   `en.ts` must be genuinely translated in `hi.ts`, `mr.ts` and `ta.ts`.)
3. **Reuse V1's data.** `lib/blogCards.ts`, `lib/nodalOfficerData.ts`, `lib/privacyPolicyData/`,
   `lib/legalPageData/`, `lib/gistRbiSchemeData/`, `lib/footerPageData.ts`, `lib/searchIndex.ts`,
   `lib/validators.ts`, `lib/richText.tsx`. Import them. Never copy their content into a new file.
4. **Every internal href goes through `toV3()`** (`lib/v3/routes.ts`), so V3 never links into V1.
5. **`next/image` on remote art must set `unoptimized`** — `next.config.ts` is V1's file and only
   whitelists some cibil.com paths. (Use `<Plate>`, which already does this.)
6. **Preserve every fact.** A port may re-compose a page freely, but it may not drop a paragraph, a
   table row, a step, a phone number or a disclosure. Content is sacred; layout is not.

---

## Page shape

`app/v3/<path>/page.tsx` — server component, exports `metadata`, renders one content component:

```tsx
import type { Metadata } from "next";
import FooContent from "@/components/v3/pages/FooContent";

export const metadata: Metadata = { title: "…", description: "…" };

export default function Page() {
  return <FooContent />;
}
```

`components/v3/pages/FooContent.tsx` — `"use client"`, because it needs `t()`.
Do **not** add a `layout.tsx` under `app/v3/*`: the shell (masthead, index, footer, skip link) is
already provided by `app/v3/layout.tsx`.

Every page opens on `<PageHeader>` with breadcrumbs, and closes on a rule.

## Translation hook

```tsx
const { t, t3, language } = useV3();   // from "@/lib/v3/useV3"
t("heroCta")       // V1 catalog — typed against TranslationKey
t3("v3Contents")   // V3 chrome catalog — typed against V3TranslationKey
```

---

## Tokens

CSS custom properties, defined on `.v3-root` in `app/v3/v3.css`. **Use the adaptive tokens, never
the raw palette** — that is what lets any section invert to an ink band for free.

| Purpose | Token |
| --- | --- |
| Surface | `--v3-bg`, `--v3-bg-raised`, `--v3-bg-sunken` |
| Text | `--v3-fg`, `--v3-fg-2`, `--v3-fg-3` |
| Rules | `--v3-line`, `--v3-line-2`, `--v3-line-3` |
| Accent (pine) | `--v3-accent`, `--v3-accent-hover`, `--v3-accent-contrast` |
| Gold thread | `--v3-gold` |
| Archival data | `--v3-clay`, `--v3-ochre`, `--v3-olive`, `--v3-pine` |
| Semantic | `--v3-success`, `--v3-warning`, `--v3-error` |
| Rhythm | `--v3-gutter`, `--v3-max`, `--v3-measure` |
| Motion | `--v3-ease`, `--v3-ease-rule`, `--v3-dur-1..3` |

`<Section tone="ink">` re-points all of the above at the dark end of the scale. Children need to
know nothing about it — which is exactly why a child must never hardcode `text-black`.

Utility classes: `.v3-display` `.v3-h1` `.v3-h2` `.v3-h3` `.v3-lede` `.v3-em` `.v3-folio`
`.v3-caption` `.v3-num` (type) · `.v3-plate` `.v3-plate-mount` `.v3-columns` `.v3-grain` (surface)
· `.v3-link` `.v3-link-draw` `.v3-row` `.v3-focus` (interaction) · `.v3-prose` (long-form).

**`.v3-num` on every number.** Prices, scores, dates, counts, table figures, step numbers.

---

## Components

**Layout** — `@/components/v3/ui/Layout`
`<Container width="default|wide|text|bleed">`, `<Section space tone="paper|sunken|ink" ruled>`,
`<SectionHead folio index title lede aside>`, `<Folio index>`
`<Rule strong still>` — from `@/components/v3/ui/Rule` (own file: it holds an observer)

**Patterns** — `<PageHeader title folio lede actions breadcrumbs media size>`,
`<Breadcrumbs items>`, `<Accordion items multiple numbered>`, `<Tabs items label>`,
`<Steps steps layout="rail|score">`, `<Ledger columns rows caption numericFrom>` (the table),
`<MarginRail links>` (sticky "Contents" for long pages), `<ArticleCard title category image href video lead>`,
`<Callout tone="note|warning|success|regulatory" title>`, `<Prose full>`

**Controls** — `<Button href variant="solid|outline|quiet|link" size arrow full>`,
`<TextField> <SelectField> <CheckboxField>` (from `ui/Field`)

**Icons** — `@/components/v3/ui/Icons`. Hairline strokes only. Prefer a numeral or a word to an icon.

**Motion** — `<Reveal variant="rise|fade|wipe|plate|rule" delay as>`, `<SetType lines>` (headlines),
`<Tally value suffix>` (figures), `<Plate src alt mount drift ratio fit>` (artwork).
Hooks in `lib/v3/motion.ts`: `useInView`, `useTally`, `useScrollProgress`, `useScrolled`,
`useActiveSection`, `usePlateDrift`, `useScrollLock`, `useReducedMotion`.

All motion is already reduced-motion-safe — never add a raw `animation:` to content.

> ⚠ **`<Reveal variant="wipe">` and `variant="plate"` wrap their children in an extra element**,
> because IntersectionObserver measures a *clipped* box and a clipped target never intersects. So
> on those two variants, `className` lands on the wrapper and must not be a layout container for
> the children (no `flex`, no `grid`). Padding/margin are fine. The other variants behave normally.

---

## The quality bar

Every page must earn its own composition. **A page that is a hero followed by a grid of identical
cards has not been designed.** Before building one, sketch three layouts and take the strongest.

Vary the rhythm, and never repeat the same rhythm twice in a row:

- an asymmetric editorial spread (wide left column, narrow right)
- a numbered ledger of full-width ruled entries
- a two-column document with a sticky `<MarginRail>` (use this for every long/legal page)
- a lead-plus-list newspaper spread (one large item, the rest a ruled list)
- a full-bleed ink band, for the one moment a page raises its voice
- a table that is ruled, not boxed
- oversized type in open space

Accessibility is part of the bar, not a follow-up: exactly one `<h1>` per page, headings in order,
real landmarks, `v3-focus` on everything focusable, every `aria-*` from `t()`, tables with a
`<caption>`, and a visible focus ring you can actually see on paper.

Before you finish: `npx tsc --noEmit` and `npm run check:i18n` must both pass.
