# CIBIL Clone

A clone of the [TransUnion CIBIL](https://www.cibil.com) website, built with Next.js 16, React 19, TypeScript and Tailwind CSS v4, in four languages (English, Hindi, Marathi, Tamil).

The site exists **four times over**. V1 (at `/`) is the pixel-faithful clone of the real site. V2, V3 and V4 are three independent redesigns of the *same 49 pages*, each with its own visual language, navigation model and component kit — 196 routes in total. They share content and data, not styling: every version re-presents V1's four-language copy rather than rewriting it.

## The four versions

| | Route | Direction | Navigation | Type |
|---|---|---|---|---|
| **V1** | `/` | The real site — flat white, teal/gold brand chrome, bordered cards | Two-row nav + hover mega-menus | Intro |
| **V2** | `/v2` | Deep-navy editorial. Near-black, lit surfaces; glass, blur and glow; a glowing score dial | Mega-menu + search overlay | Intro |
| **V3** — *"The Ledger"* | `/v3` | A printed financial broadsheet. Warm ivory paper, ink type, hairline rules instead of cards, zero border-radius, serif headlines, mono figures | No dropdowns — a full-screen numbered Index + a ⌘K palette | Instrument Serif + Inter + IBM Plex Mono |
| **V4** — *"Aperture"* | `/v4` | An optical instrument. Bi-tonal: porcelain "day" bands where you read, matte deep-blue "night" bands where you look. Soft depth, hard edges, never a pill | The **Launcher** — the menu and the search box are one surface | Manrope + Geist Mono |

Each version is self-contained in three directories — `app/vN/**`, `components/vN/**`, `lib/vN/**` — and imports V1's *data* (`lib/i18n`, `lib/searchIndex`, `lib/*Data`, `lib/validators`) but none of its styling or components. Versions never import from each other, so any one of them can evolve or be deleted without touching the rest. Each has a design system doc that is the contract for working in it:

- [`components/v2/DESIGN_SYSTEM.md`](components/v2/DESIGN_SYSTEM.md)
- [`components/v3/DESIGN_SYSTEM.md`](components/v3/DESIGN_SYSTEM.md)
- [`components/v4/DESIGN_SYSTEM.md`](components/v4/DESIGN_SYSTEM.md)

**V1, V2 and V3 are read-only.** V1 is "production"; the finished redesigns are frozen. Read them, import their data — don't modify them.

CSS tokens are scoped (`.v2-root`, `.v3-root`, `.v4-root`), never on `:root` — all four versions render in the same document, so an unscoped token block would bleed into V1.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → V1;  /v2, /v3, /v4 for the redesigns
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (~199 static pages) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run check:i18n` | **The translation guard** — see [Internationalisation](#internationalisation) |

Node.js 18+.

## Pages

All 49 routes below exist four times: `/foo` (V1), `/v2/foo`, `/v3/foo`, `/v4/foo`. The home page is `/`, `/v2`, `/v3`, `/v4`.

### Home, auth and subscription

| Route | Page |
|---|---|
| `/` | Home — site nav, CIBIL score hero with a live gauge, Products & Services, "Learn about credit" grid, stats bar, self-service, footer |
| `/login` | Mobile-number OTP login, with a "Login with username" fallback and an illustration carousel |
| `/register` | Full registration form with client-side validation |
| `/choose-subscription` | 4-tier pricing plans (Starter/Basic/Standard/Premium), an FAQ, and a mobile-app promo |

### Products & Services

| Route | Page |
|---|---|
| `/cibil-score-report` | CIBIL Score & Report — hero, what-is explainer, Dashboard feature grid, why-subscribe |
| `/freecibilscore` | Free CIBIL Score — hero, "what you get", 10-item FAQ accordion, T&C |
| `/cibil-alerts` | CIBIL Alerts — Standard/Premium alert plans |
| `/score-simulator` | Score Simulator (product) — how-it-works + a Basic/Standard/Premium comparison table |
| `/company-credit-report` | CIBIL Rank & Company Credit Report — Rank/CCR accordion, benefits, CCR plans, FAQ tabs |
| `/microfinance` | CIBIL Microfinance Score & Report — what-is / includes / why, email + courier steps |

### Consumer Grievance

| Route | Page |
|---|---|
| `/consumer-dispute-resolution` | 4-step dispute guide, process diagram, important points, tabbed FAQ, articles |
| `/company-dispute-resolution` | Types of disputes, Company/Account field lists, ownership & duplicate accounts, process diagram |
| `/microfinance-dispute-resolution` | MFI 4-step fix guide + how to get your MFI report (reuses the consumer process diagram) |
| `/complaints-and-escalations` | Ways to reach us, dispute-review timeline, the 4-level escalation path up to the RBI Ombudsman |
| `/enquiry` | Consumer Enquiry — what an enquiry is, plan options, key terms (ECN), "don't recognise this?" |
| `/enquiryccr` | Commercial Enquiry — the CCR counterpart of `/enquiry` (WON instead of ECN) |
| `/framework-for-compensation` | RBI compensation framework — explainer, PDF cards, flow diagram, tabbed FAQ |
| `/nodal-officer-list` | **Searchable** nodal-officer directory (sample data — see [Data fidelity](#data-fidelity)) |

### Knowledge Center

| Route | Page |
|---|---|
| `/faq-brochure` | Understanding CIBIL — tabbed intro + brochure prompt |
| `/faq/credit-score-and-loan-basics` | Credit Score & Loan Basics — Q&A + "Four Major Factors" grid |
| `/faq/loan-rejections-disputes` | Loan Rejections and Disputes — 18-question Q&A |
| `/faq/understand-your-credit-score-and-report` | Understand Your Credit Score & Report |
| `/faq/score-simulator` | Score Simulator FAQs (distinct from the `/score-simulator` product page) |
| `/faq/company-credit-report` | CIBIL Rank & CCR FAQs + a Rank-vs-Score comparison table |
| `/faq/purchase-post-purchase-help` | Purchase & Post-Purchase Help |
| `/faq/consumer-awareness` | Consumer Awareness — 5 video cards |
| `/credit-advice` | Blog listing (~62 cards) |
| `/credit-myths` | Blog listing (2 cards) |
| `/watch-and-learn` | Blog listing (4 cards) |
| `/commercial-credit` | Blog listing (15 cards) |
| `/new-to-credit` | Blog listing (4 cards) |
| `/jaagran` | CIBIL Jaagran — brand hero, mission, videos, blogs, the "CIBIL Ki Kahaaniyaan" comic grid |
| `/cibil-saksham` | CIBIL Saksham — course catalog |

### Corporate, legal and footer pages

| Route | Page |
|---|---|
| `/about-us` | Corporate hero + About TransUnion CIBIL |
| `/about-us/company-history` | 2000 → today milestone timeline |
| `/contact-us` | Support hero, 3-column quick links, contact info, floating chat widget |
| `/official-partners` | ~26 partner tiles + a false-claims disclosure |
| `/blog/main` | Blog — featured hero + 6 category cards |
| `/legal/terms-and-conditions` | **Terms & Conditions** — full long-form legal text, translated (English authoritative) |
| `/privacy-policy` | **Privacy Policy** — full long-form legal text, translated (English authoritative) |
| `/suit-filed-cases/overview` | Suit-filed section overview |
| `/suit-filed-cases/suit-filed-cases` | Suit filed cases — terms/disclaimer with I AGREE / I DISAGREE |
| `/suit-filed-cases/non-suit-filed-cases` | Non-suit-filed cases |
| `/suit-filed-cases/gist-rbi-scheme` | Gist of the RBI scheme — translated legal text (English authoritative) |
| `/external-links/rbi-notifications` | 9-row RBI circulars table |
| `/external-links/business-code-of-conduct` | Ethics Helpline notice — standalone, no site chrome (matches the source) |
| `/regulatory` | Regulatory Disclosure — an honest shell, not fabricated data (see [Data fidelity](#data-fidelity)) |
| `/search` | Full ranked search results for `?q=` |
| `/sitemap` | Hand-maintained map of every route — see [The sitemap invariants](#the-sitemap-invariants) |

## Project structure

```
cibil-clone/
├── app/
│   ├── layout.tsx              # Root layout — self-hosted Intro font + LanguageProvider
│   ├── globals.css             # V1 / Tailwind base
│   ├── page.tsx  …             # V1: 49 routes
│   ├── v2/  ├── v2.css         # V2: layout.tsx (its own shell) + the same 49 routes
│   ├── v3/  ├── v3.css         # V3: ditto
│   └── v4/  └── v4.css         # V4: ditto
├── components/
│   ├── Header.tsx  Footer.tsx  # V1 chrome — variant-driven, data-driven mega-menus + search
│   ├── icons.tsx               # Shared inline SVGs (used by every version)
│   ├── shared/                 # TranslationNotice, OfferBanner, HighlightedText
│   ├── <feature>/              # V1 page sections — one directory per page/section
│   ├── v2/  ├── DESIGN_SYSTEM.md   ui/ layout/ motion/ pages/ home/
│   ├── v3/  ├── DESIGN_SYSTEM.md   ui/ layout/ motion/ pages/ home/ collection/
│   └── v4/  └── DESIGN_SYSTEM.md   ui/ layout/ motion/ pages/ home/ viz/
├── context/
│   └── LanguageContext.tsx     # Language state, persisted to localStorage; t() helper
├── lib/
│   ├── i18n/{en,hi,mr,ta}.ts   # The translation catalog — en.ts is the key source of truth
│   ├── legalPageData/          # Long-form docs: types + one file per locale + index
│   ├── privacyPolicyData/      #   → assembled into Record<Language, T>
│   ├── gistRbiSchemeData/      #
│   ├── blogCards.ts            # Blog headlines, per-locale
│   ├── footerPageData.ts       # Milestones, partners, RBI circulars — per-locale
│   ├── nodalOfficerData.ts     # SAMPLE nodal-officer rows (placeholder contacts)
│   ├── sitemapData.ts          # The route map — search derives from this
│   ├── searchIndex.ts          # Client-side page finder (index + synonyms + ranking)
│   ├── richText.tsx            # **bold** / [link](/href) / "- " lists inside translation strings
│   ├── validators.ts           # Field validators shared by LoginForm + RegistrationForm
│   └── v2/  v3/  v4/           # Per-version i18n (chrome only), nav, routes, motion, sitemap
└── scripts/
    └── check-i18n.mjs          # The translation guard behind `npm run check:i18n`
```

## Internationalisation

Four languages — English, Hindi, Marathi, Tamil — switchable from the header and **persisted to `localStorage`**, read through `useSyncExternalStore` so SSR still renders the default and hydration stays consistent. The choice survives reloads, direct URLs and crossing between versions.

User-visible text lives in two places, and both are fully translated:

1. **The catalog** — [`lib/i18n/{en,hi,mr,ta}.ts`](lib/i18n). `en.ts` is the source of truth for `TranslationKey`; `translations` is typed `Record<Language, Record<TranslationKey, string>>`, so a key missing from any locale is a compile error. Components read it via `const { t } = useLanguage()`.
2. **Locale-keyed data modules in `lib/`** — long-form page copy (Terms, Privacy Policy, the RBI scheme, blog headlines, the company timeline, RBI circulars). A 4,000-word contract is unreadable as flat key-value pairs, so these are keyed by locale instead: a directory per document (`types.ts` + one file per locale + `index.ts`) assembled into `Record<Language, T>`, and the component reads `DOC[language]`.

Point 2 was once this project's biggest hole: ~10,000 words of page copy sat outside the i18n system and twelve pages rendered in English in *every* locale, while the audits — which only grepped `components/` for JSX text — reported clean.

**Every user-visible string goes through `t()` or a locale-keyed module. That includes `alt`, `aria-label`, `title` and `placeholder`.** The only Latin-script literals allowed are proper nouns and non-linguistic tokens: brand names (CIBIL, TransUnion, RBI, NBFC, PAN), the JAAG₹AN wordmark, emails, URLs, prices, and input masks like `DD / MM / YYYY`.

### The check

```bash
npm run check:i18n
```

[`scripts/check-i18n.mjs`](scripts/check-i18n.mjs) transpiles the real `lib/` modules and compares the actual objects rather than grepping source — which is what lets it see into data files. It fails if a key is missing from `hi`/`mr`/`ta`, if a value is still byte-identical to the English, if a "translated" string carries no Devanagari/Tamil script but does carry English prose, if a locale-keyed module's structure drifts from `en` (different entry counts, keys, or a changed `id`/`href`/`image`), or if a component has user-visible text that never reaches `t()`.

### Legal text

The Terms, Privacy Policy and Gist-of-RBI-Scheme pages are binding legal text. They are translated so they can be *read* in every language, but **English remains authoritative** — each renders [`<TranslationNotice />`](components/shared/TranslationNotice.tsx), which says so on every locale except English. A translation of a contract must not silently become the contract. Any new legal or regulatory document gets the same banner.

### Adding a language

1. Create `lib/i18n/de.ts` exporting `Record<TranslationKey, string>`, every key translated.
2. Add the code to the `Language` type and the `languages` array in `lib/i18n/index.ts`, and the object to the `translations` map.
3. Add the locale to every `lib/*Data/` directory module and to each version's `lib/vN/i18n`.

## Search

Search is a **client-side page finder** — the site is a fixed set of static pages, so there is no backend and no request.

The index is **derived from [`lib/sitemapData.ts`](lib/sitemapData.ts)**, not hand-written. Because the sitemap rule (below) already forces every route into that file, a new page becomes searchable for free — there is no second list to keep in sync.

It is translated, not merely wrapped in translated chrome: each entry carries a synonym list ("password" → Login, "cancel" → Subscription Plans, "wilful defaulter" → Suit Filed) in all four locales, and every haystack folds in the English strings too — so a Hindi reader finds the dispute page whether they type "विवाद" or "dispute". Typing gives ranked suggestions with keyboard navigation and match highlighting; Enter opens the highlighted page, or `/search?q=` for the full ranked list.

Each version surfaces the same index its own way: V1 an expanding header panel, V2 a search overlay, V3 a ⌘K palette, V4 the Launcher (where menu and search are a single surface).

## The sitemap invariants

[`/sitemap`](app/sitemap/page.tsx) is **hand-maintained** from [`lib/sitemapData.ts`](lib/sitemapData.ts) — it is not generated by crawling `app/`. So it does not update itself.

**Add a `page.tsx` under `app/` → add a matching entry to `lib/sitemapData.ts` in the same change.** Two invariants must hold:

- **No orphans** — every route under `app/` is reachable from the sitemap.
- **No dead links** — every `href` in `sitemapData.ts` resolves to a real route. Never `"#"`.

[AGENTS.md](AGENTS.md) carries a one-liner that checks both and names the offenders. V2/V3/V4 derive their sitemaps from V1's by mapping hrefs (`toV2`/`toV3`/`toV4` in `lib/vN/routes.ts`), so the invariants carry across all four versions for free.

## Form validation

### Register (`/register`)

| Field | Rules |
|---|---|
| Email | Required, valid email format |
| Mobile | Required, exactly 10 digits, must start with 6-9 |
| Password | Required, min 8 chars, uppercase, lowercase, number, special character |
| Confirm Password | Required, must match Password |
| First / Last Name | Required, min 2 chars, letters only |
| ID Type | Required |
| ID Number | Aadhaar → 12 digits, PAN → AAAAA9999A, Passport → A1234567, Voter ID → ABC1234567 |
| Date of Birth | Required, 18+ |
| Pincode | Required, exactly 6 digits |
| Terms | Must be checked |

### Login (`/login`)

| Field | Rules |
|---|---|
| Mobile | Required, exactly 10 digits, must start with 6-9 |
| Terms | Must be checked before "Send OTP" is enabled |

Errors appear on blur, and all at once on submit. The logic lives in [`lib/validators.ts`](lib/validators.ts), shared by both forms and by all four versions. ID numbers are masked with `-webkit-text-security` rather than a second `type="password"` field, which confuses browser heuristics.

## Data fidelity

This is a clone, not a bureau. Where the real site is backed by data this repo does not have, the rule has been to **show an honest gap rather than invent content** — a credit bureau exists to report accurate data, and fabricating it in a demo is the one thing the subject matter cannot tolerate.

- **`lib/nodalOfficerData.ts` is sample data.** The institutions are real CIBIL members; the contact details are deliberate placeholders (`example.com`, `0000` phone numbers), and the page says so in a visible note. **Replace it with the real feed before this goes anywhere public — do not ship invented grievance contacts for real banks.**
- **`/regulatory` renders a shell** — title, intro and the table's column headers. The source document is a ~1000-row table that wasn't legible in the reference, so the intro points readers at the official site instead of showing invented rows.
- **Tabbed FAQs with partial content** (the dispute and compensation pages) show a "coming soon" placeholder in tabs whose source content wasn't transcribable, rather than fabricated answers.
- **External destinations are not hyperlinked.** RBI portals, `ssp.cibil.com` tracking links and PDF downloads render with their real label text but `href="#"` — visual fidelity without pointing at unverified third-party URLs. (V4 goes further: where a destination genuinely doesn't exist in this repo it renders as *text*, so no affordance lies.)
- **Score dials show the scale, not a score.** V2's hero dial shows the 300–900 range; V4's hero marker is hollow and labelled "your score goes here". A marketing dial pointing at an invented "780" would fabricate exactly the kind of data the site exists to report accurately.

## Images and fonts

The Intro font family is self-hosted (`app/fonts/`) — cibil.com ships it at 300/400/700 only, with no 600 face, so `font-semibold` resolves to Bold exactly as it does on the real site. V3 and V4 load their own faces inside their own layouts (V1's `app/layout.tsx` is read-only), with the Indic serifs at `preload: false` so an English reader downloads none of them.

Artwork is served from cibil.com. Two things are load-bearing:

- **`images.remotePatterns`** in [`next.config.ts`](next.config.ts) allow-lists the cibil.com / transunioncibil.com / ytimg.com paths in use — `next/image` requires it for any external `src`.
- **`unoptimized`** on those `<Image>`s. cibil.com sits behind Cloudflare bot protection that 403s Next's server-side image optimizer (it doesn't send a browser-like User-Agent). `unoptimized` skips the `/_next/image` proxy, so the browser fetches the asset directly — real browser requests aren't blocked, only the server-side proxy was.

## Known issues

- `npm run check:i18n` reports one **false positive**: `components/v2/pages/RegisterContent.tsx:249`, where the guard's JSX-text regex reads the TypeScript cast `) as Partial<` as user-visible copy. V2 is read-only, so it is left alone rather than silenced.
- **Page `metadata` is English-only** across all versions. It is evaluated server-side while the language lives in `localStorage`, so translating the tab title requires the locale in the URL or a cookie — a routing change of its own.

## License

For educational and demonstration purposes only. CIBIL and TransUnion are registered trademarks of TransUnion CIBIL Limited.
