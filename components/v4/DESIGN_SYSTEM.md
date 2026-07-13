# V4 — "Aperture"

> A credit bureau's job is to bring a scattered financial life into focus.
> So V4 is built like an optical instrument: light, precise, calm.

This is the design system for V4. It is self-contained: `app/v4/**`, `components/v4/**`, `lib/v4/**`.
It imports **data** from V1 (`lib/i18n`, `lib/searchIndex`, `lib/*Data`) and **nothing else** — no
V1 styling, no V1 components except `components/shared/*`, and **nothing at all** from `v2` or `v3`.

---

## 1. Why V4 looks like this

Three versions already exist, and each owns a visual territory. V4 is not allowed to trespass, and
would not want to — a fourth version that borrows a third version's moves is a reskin.

| | V1 | V2 | V3 | **V4** |
|---|---|---|---|---|
| Canvas | flat white / grey | near-black, lit | warm ivory paper | **bi-tonal**: porcelain *day* ⇄ matte deep-blue *night* |
| Depth | borders | glass, blur, glow | zero — hairline rules only | hairline + one ambient shadow + a 1px top lip |
| Radius | pills + `rounded-xl` | 10/16/24/34 + pills | **0 everywhere** | 6/10/14/20/28 — **never a pill** |
| Type | Intro | Intro, display at 300 | Instrument Serif + Inter + Plex | **Manrope + Geist Mono** |
| Emphasis | cyan word | cyan word | *italic* word | **gold rule under the word** |
| Data-viz | static gauge | glowing dial | engraved ruler | **single-hue ramp; gold marks _you_** |
| Nav | mega-menu | mega-menu | index overlay + ⌘K | **the Launcher**: menu and search are one surface |
| Motion | none | drift, spotlight, magnetic, loops | rules draw, type wipes | **focus**: things resolve, charts plot, figures tick |

### The three devices

**1. The bi-tonal page.** A V4 page alternates day and night bands. This is *structure*, not
decoration — it is what gives a long page a pulse without a single divider. Tone is a token
re-point (`.v4-tone-night`), so a section inverts and every child follows: no component ever needs
a dark variant of itself. It is also, for free, the dark-mode mechanism.

**2. The sequential ramp, and gold is you.** Every chart draws from one five-step ramp, pale cyan →
CIBIL deep blue. Never red-amber-green: ordered data deserves an ordered scale, and a single-hue
ramp survives colour-blindness, which a traffic light does not. CIBIL's gold is then reserved,
site-wide, for exactly one meaning: **this is you** — your score, your plan, your position, the
section you are reading. Gold never decorates. It points. *This is the rule the whole system hangs
on; if you spend gold on furniture, there is nothing left to point with.*

**3. Soft depth, hard edges.** A surface is a plane of light: `.v4-plane` = hairline border + one
ambient shadow + a 1px inner highlight along the top edge where the light lands. No glass, no blur,
no glow (V2's), but not flat either (V3's).

---

## 2. Tokens (`app/v4/v4.css`)

Everything is scoped to `.v4-root`. **Never** write an unscoped `:root` or bare `body {}` rule —
all four versions render in the same document.

### The adaptive layer — address these, never the raw colours

`--v4-bg` `--v4-bg-sunken` `--v4-surface` `--v4-surface-2` `--v4-fg` `--v4-fg-2` `--v4-fg-3`
`--v4-edge` `--v4-edge-2` `--v4-edge-3` `--v4-accent` `--v4-accent-hover` `--v4-accent-fg`
`--v4-mark` `--v4-focus` `--v4-elev-1..3` `--v4-lift`
Charts: `--v4-c1..--v4-c5`, `--v4-c-stroke`, `--v4-marker`, `--v4-marker-line`

`.v4-tone-night` re-points all of them. That is why a chart inside a night band lifts its own ramp
(the deep-blue end is 1.4:1 on night — invisible) without the chart knowing.

### Brand — not ours to change
`--v4-cyan #00b0f0` · `--v4-gold #f5c518` · `--v4-deep #0a3a52`. The logo is a trademark: place it,
never redraw it. Text draws are contrast-forced (`--v4-cyan-text #00749f`, `--v4-gold-text #7a5b00`)
because brand cyan on white is 2.3:1 and brand gold is 1.6:1 — they can *fill* a shape, they can
never *be* small text.

### Scale
- Radius `--v4-r-xs 6` `-sm 10` `-md 14` `-lg 20` `-xl 28`
- Motion `--v4-ease` (out) · `--v4-ease-both` (in-out) · `--v4-dur-1 160ms` `-2 420ms` `-3 760ms`
  `--v4-dur-plot 1400ms`
- Rhythm `--v4-gutter` · `--v4-max 1320px` · `--v4-max-wide 1560px` · `--v4-measure 66ch`

---

## 3. Type

**Manrope speaks, Geist Mono counts.** Loaded in `app/v4/layout.tsx`; Noto Sans Devanagari/Tamil sit
*behind* them in the stack (`preload: false`) so an English reader never downloads a byte of either.

`.v4-display` (700, -0.033em) · `.v4-h1` · `.v4-h2` · `.v4-h3` · `.v4-lede` · `.v4-body`
`.v4-label` — the universal eyebrow: mono, uppercase, tracked, **in the ink, not the accent**
`.v4-num` — **mandatory on every number.** Tabular figures, or columns go ragged and counters shove
their own labels sideways as they tick.
`.v4-mark-word` — the gold rule under an emphasised word.

Indic: `:lang(hi|mr|ta)` resets the mono label's letter-spacing (tracking breaks Devanagari
conjuncts), raises line-height, and drops the gold rule clear of the descending matras.

---

## 4. Components

| Need | Use |
|---|---|
| Page frame | `ui/Layout` — `<Container width>`, `<Section tone space>`, `<SectionHead>` |
| Interior page opening | `ui/PageHero` — breadcrumb + label + h1 + lede + actions + optional `aside`. **Never a stock photo.** |
| Surface | `.v4-plane` / `.v4-plane-flat` (+ `.v4-plane-lift` for interactive) |
| Action | `ui/Button` — `<Button>`, `<ButtonLink>`, `<TextLink>` |
| FAQ | `ui/Disclosure` — `<DisclosureList><Disclosure question>` |
| Tabs | `ui/Tabs` — full ARIA, roving tabindex |
| Table | `ui/Ledger` — `<Ledger caption columns rows rowKey>` |
| Banner | `ui/Notice` — `tone="info|success|warning"`, glyph + fill (colour is never the only signal) |
| Process | `ui/Steps` — `<Steps><Step n title>` (an `<ol>`, because the order is the meaning) |
| Long doc | `ui/Rail` — sticky "on this page", marks the current section in gold |
| Reveal / counter | `motion/Reveal` — `<Reveal variant index>`, `<Tick value>` |
| Icons | `ui/Icons` — one 24px grid, 1.75px stroke. Never import V1's `components/icons`. |
| Charts | `viz/*` — draw from `--v4-c1..c5`; mark with gold |

---

## 5. The rules

1. **No hardcoded user-visible text. Ever.** `t()` for V1's copy (all business copy), `t4()` for
   V4's chrome. That includes `alt`, `aria-label`, `title`, `placeholder`. `npm run check:i18n`
   fails the build on a literal. New chrome strings go in `lib/v4/i18n/{en,hi,mr,ta}.ts` — **all
   four, actually translated.** Copying English into `hi` compiles and silently ships an English page.
2. **Never invent a fact.** No product, no statistic, no claim originates in V4. The score runs
   300–900 and "above 700 is generally considered good" because V1's own copy says so. The hero's
   gold marker is *hollow* — an invitation, not a prediction. A bureau that draws you a score you
   have not earned is lying on its front page.
3. **Never `href="#"`.** Every link resolves. V1's nav parks "Knowledge Center" and "Consumer
   Grievance" on `#`; V4 gives them real homes (see `lib/v4/nav.ts`).
4. **Every internal href goes through `toV4()`.** Otherwise V4 links into V1 and the reader falls
   out of the version.
5. **Motion is subtraction.** The final state is what SSR renders; the animation removes from it.
   No-JS shows the finished page (reveals are gated behind `@media (scripting: enabled)`), and
   `prefers-reduced-motion` kills all of it.
6. **Accessibility is not a pass at the end.** Real `<button>`/`<a>` semantics, one visible focus
   ring that survives on both tones, `aria-expanded`/`aria-controls` on every disclosure, focus trap
   + Escape + focus restore on the Launcher, a text alternative for every graphic, and no colour-only
   signals. Contrast is *measured*, not eyeballed — every token in §2 was checked against every
   surface it lands on.
7. **Do not touch V1, V2 or V3.** Not `app/layout.tsx`, not `app/globals.css`, not `lib/i18n/*`, not
   `lib/sitemapData.ts`. V4 adds; it does not edit.

---

## 6. Routes & sitemap

V4 mirrors V1's 49 routes under `/v4` (`lib/v4/routes.ts`). `lib/v4/sitemapData.ts` **derives** the
sitemap by mapping V1's `SITEMAP_COLUMNS` through `toV4()`, so V4 cannot grow an orphan or a dead
link unless V1 has one. V1's own sitemap deliberately does not list `/v2`, `/v3` or `/v4`: they are
alternate presentations of the same pages, not new destinations, and each ships its own sitemap.
