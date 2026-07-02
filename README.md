# CIBIL Clone

A pixel-faithful clone of the [TransUnion CIBIL](https://www.cibil.com) website, built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. It spans 42 pages across the Personal site — the marketing home, auth/registration flow, subscription plans, the **Products & Services** section, the full **Consumer Grievance** section, the full **Knowledge Center** section, and every **footer** link (about/company-history, official partners, suit-filed cases, RBI notifications, regulatory disclosure, blog, and the code-of-conduct / ethics helpline).

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Full marketing site homepage — two-row site nav, CIBIL score hero with a live gauge, Products & Services cards, "Learn about credit" article grid, stats bar, self-service links, full site footer |
| `/login` | Login | Mobile-number OTP login card with illustration, plus a "Login with username" fallback |
| `/register` | Register | Full registration form with client-side validation |
| `/choose-subscription` | Choose Subscription | 4-tier pricing plans (Starter/Basic/Standard/Premium) with a mobile app promo section |
| `/cibil-score-report` | CIBIL Score & Report | Products & Services → Consumer. Hero + "did you know" banner, what-is explainer, CIBIL Dashboard feature grid, why-subscribe, "from the blog". Linked from Products & Services → "CIBIL Score and Report" |
| `/cibil-alerts` | CIBIL Alerts | "Stay informed & in control" hero, monitor-changes banner, Standard/Premium alert plans (Most Popular badge). Linked from Products & Services → "CIBIL Alerts" |
| `/score-simulator` | Score Simulator (product) | Teal hero, how-it-works, a Basic/Standard/Premium feature-comparison table, disclaimer + FAQ. Distinct from `/faq/score-simulator`. Linked from Products & Services → "Score Simulator" |
| `/company-credit-report` | CIBIL Rank & CCR (product) | Hero, 25%-off banner, Rank/CCR accordion + video, 3 benefit cards, BASIC/STANDARD/PREMIUM CCR plans, "things to understand" + FAQ tabs. Distinct from `/faq/company-credit-report`. Linked from Products & Services → "Company Credit Report" and "I Check CIBIL Rank" |
| `/microfinance` | CIBIL Microfinance Score & Report | Hero + MFI info banner, what-is / includes / why sections, avail-online banner, email/courier steps. Linked from Products & Services → "CIBIL MFI Score and Report" |
| `/about-us` | About Us | Corporate hero (eyebrow + title + "Know More" CTA), About TransUnion CIBIL copy, corporate footer variant |
| `/contact-us` | Contact Us | Support hero banner, 3-column Quick Links (Consumer/Commercial/Microfinance) with a sidebar CTA, contact/registered-office info, floating "Chat with CIBIL" widget. Linked from the header's "Support" nav item |
| `/consumer-dispute-resolution` | Consumer Dispute Resolution | Hero + free-service banner, 4-step "how to raise a dispute" guide, a linearized dispute-resolution process diagram, important points, a tabbed FAQ accordion, featured articles. Linked from the "Consumer Grievance" mega-menu's "Consumer Dispute Resolution" item |
| `/company-dispute-resolution` | Company Dispute Resolution | Hero + "Types of Disputes" sidebar, Company/Account Details field lists, Ownership & Duplicate Account sections, a 3-node dispute-resolution process diagram, closing CTA + registered office address. Linked from the "Consumer Grievance" mega-menu's "Company Dispute Resolution" item |
| `/microfinance-dispute-resolution` | Microfinance Dispute Resolution | Hero + free-service banner, 4-step "how to fix" guide, "how to get your CIBIL MFI report" cards, and — since the content is identical — reuses the same `ProcessDiagram`/`ImportantPoints` components from the consumer dispute page. Linked from "MFI Dispute Resolution" |
| `/complaints-and-escalations` | Complaints and Escalations | Hero, "Ways to Reach Us" (call/write/email/walk-in), dispute review timeline, and a 4-level escalation path (Nodal Officer → Principal Nodal Officer → RBI Integrated Ombudsman). Linked from "CIBIL Complaints and Escalations" |
| `/enquiry` | Consumer Enquiry | Explains what a credit enquiry is, a selectable pricing-plan list, key enquiry terms (ECN/purpose/date), "don't recognise this enquiry" actions, a video callout, and recommended reads. Linked from "Consumer Enquiry" |
| `/enquiryccr` | Commercial Enquiry | Company-side counterpart of `/enquiry` — dismissible notification banner, "why are you receiving this notification?" hero, CCR subscription plans (Basic/Standard/Premium), commercial key-terms (WON/purpose/date), and "don't recognise this enquiry" actions (PNO / Initiate a Dispute / Need help). Linked from "Commercial Enquiry" |
| `/framework-for-compensation` | Framework for Compensation | RBI compensation-framework explainer, PDF download cards, a compensation-flow diagram, a tabbed FAQ (only "Compensation Guidelines" has real content), and a closing banner. Linked from "Framework for Compensation" |
| `/nodal-officer-list` | Nodal Officer List | Bank/financial-institution search box (decorative — no backend data source, so it always shows an empty-state illustration) plus "Points to note". Linked from "CIBIL Nodal Officer List" |
| `/faq-brochure` | Understanding CIBIL | Tabbed intro (About TransUnion CIBIL / About CIBIL Score & Report) + brochure download prompt + sidebar card. Linked from Knowledge Center → "Understanding CIBIL" |
| `/faq/credit-score-and-loan-basics` | Credit Score & Loan Basics | Q&A explainer with a "Four Major Factors" grid (Age of Credit / Utilization / Payment History / Enquiries). Linked from "Credit Score and Loan Basics" |
| `/faq/loan-rejections-disputes` | Loan Rejections and Disputes | 18-question Q&A on rejections, report inaccuracies, and the dispute process. Linked from "Loan Rejections and Disputes" |
| `/faq/consumer-awareness` | Consumer Awareness Videos | 5 video cards (dispute how-to + MyCIBIL/Suppandi credit-education episodes). Linked from "Consumer Awareness" |
| `/faq/understand-your-credit-score-and-report` | Understand Your Credit Score & Report | Q&A covering CIR sections, add-on cards, guarantor loans, regional-language video links. Linked from "Understand Your Credit Score and Report" |
| `/faq/score-simulator` | Score Simulator FAQs | Q&A on the Score Simulator + legal disclaimer. Linked from "Frequently Asked Score Simulator Questions" |
| `/faq/purchase-post-purchase-help` | Purchase & Post-Purchase Help | Unlimited Access plans, myCIBIL account/Refresh Center, identity verification, report-only purchase. Linked from "Purchase and Post-Purchase Help" |
| `/freecibilscore` | Free CIBIL Score | Hero + "what you get" list + 10-item FAQ accordion + T&C. Linked from Knowledge Center → "Free CIBIL Score" **and** Products & Services → "Free CIBIL Score" (same page serves both) |
| `/faq/company-credit-report` | CIBIL Rank & CCR FAQs | CIBIL Rank / CCR Q&A with a limited-offer banner and a Rank-vs-Score comparison table. Linked from "CIBIL Rank and Company Credit Report FAQs" |
| `/credit-advice` | Credit Advice | Blog-listing grid (~62 article cards). Linked from Knowledge Center → "Credit Advice" |
| `/credit-myths` | Credit Myths | Blog-listing grid (2 cards). Linked from "Credit Myths" |
| `/watch-and-learn` | Watch and Learn | Blog-listing grid (4 cards). Linked from "Watch and Learn" |
| `/commercial-credit` | Commercial Credit | Blog-listing grid (15 cards, "READ MORE" CTA). Linked from "Commercial Credit" |
| `/new-to-credit` | New To Credit | Blog-listing grid (4 cards). Linked from "New To Credit" |
| `/jaagran` | CIBIL Jaagran | Rich landing page — brand hero, About/mission, "Why It Matters", free-score section, Videos + Blogs strips, and the "CIBIL Ki Kahaaniyaan" (Suppandi) comic-chapter grid. Linked from "CIBIL Jaagran" |
| `/cibil-saksham` | CIBIL Saksham | Course-catalog page — What is / Who is it for / "Each course includes" cards / 2 course blocks / Why Choose. Linked from "CIBIL Saksham" |
| `/about-us/company-history` | Company History | Corporate hero + a 2000→today milestone timeline. Linked from the footer "Company History" |
| `/official-partners` | Official Partners | Grid of ~26 partner brand-name tiles + a false-claims disclosure. Linked from the footer "Official Partners" |
| `/suit-filed-cases/suit-filed-cases` | Suit Filed Cases | Left section-nav + Terms/Disclaimer/Governing-law with I AGREE / I DISAGREE. Linked from the footer "Non Suit and Suit Filed Cases" |
| `/external-links/rbi-notifications` | RBI Notifications | Left section-nav + a 9-row RBI-circulars table (Sr / Category / Circular / Reference / Date). Linked from the footer "RBI Notifications" |
| `/regulatory` | Regulatory Disclosure | Title + intro + table shell (source table was too large/illegible to transcribe — see caveat). Linked from the footer "Regulatory Disclosure" |
| `/blog/main` | Blog | Featured-post hero + 6 category cards (linking to the Knowledge Center listing pages) + disclaimer. Linked from the footer "Blog" |
| `/external-links/business-code-of-conduct` | Code of Business Conduct | Standalone Ethics Helpline notice (logo only, no site nav/footer — matches the source). Linked from the footer "Code Of Conduct" |

All pages share a single `Header` and `Footer` component (see below) so visual and behavioral changes only need to be made in one place. The footer's "About TransUnion CIBIL" and "Support"/"Report a Vulnerability" links route to the existing `/about-us` and `/contact-us` pages.

## Features

- **Home page**
  - Two-row site navigation: Business/Personal tabs, primary nav (Products & Services, Knowledge Center, Consumer Grievance, Support, About), search, New User / Existing User CTAs, language switcher
  - Hover mega-menus on Products & Services / Knowledge Center / Consumer Grievance (multi-column link panels, data-driven via `MEGA_MENUS` in `Header.tsx`), and an expandable search bar on the search icon
  - All 5 nav tabs (including Support and About, which have no dropdown) get the same yellow hover highlight; "About" links to `/about-us`
  - Real CIBIL logo image (fetched from `cibil.com`, see [Logo Image](#logo-image) below) instead of a text-based recreation
  - Hero section with a live CSS/SVG **CIBIL score gauge** (reusable `ScoreGauge` component) and a "Get your free CIBIL Score & Report" CTA
  - Products & Services section — 3 cards (Individuals / Businesses / Microfinance)
  - "Learn about credit & CIBIL" section — filter pills + a video spotlight card + a 2x2 article grid (reuses `ScoreGauge` at a smaller size for the "Low CIBIL Score" article thumbnail)
  - Stats bar (years of experience, self-monitoring consumers, a customer quote, % improved scores)
  - Self Service section with dispute/verification links
  - Full multi-column footer with a gold accent border
- **Choose Subscription page**
  - Hero banner with call-to-action link to registration
  - 4 pricing plan cards (reusable `PricingCard` component) with per-plan feature checklists
  - CIBIL Mobile App promo section with app store badges
- **About Us page**
  - Corporate hero: eyebrow label, title, description, "Know More" CTA that jumps to the About section, plus a CSS-gradient cityscape placeholder (no real photo asset available — see caveat below)
  - "About TransUnion CIBIL" copy section
  - Corporate footer variant (`Footer` `variant="corporate"`) — About us / Information / Suit filed cases columns + an ISO/SOC 2/PCI-DSS certification line
- **Contact Us page**
  - Support hero banner (CSS-gradient placeholder — no real photo asset available, same caveat as About Us)
  - Quick Links: 3 columns (Consumer / Commercial / Microfinance), each with 4-5 link+description pairs, driven by a single `COLUMNS` config array in `QuickLinksSection.tsx`
  - Sidebar CTA card ("Wait—what about my credit?" → "GET YOURS NOW")
  - "Watch videos" / "Contact us" / Registered corporate office info rows
  - Floating "Chat with CIBIL" button (`ChatWidget`, page-scoped, not site-wide)
- **Consumer Dispute Resolution page**
  - Hero + FREE-service banner (same banner text is reused verbatim inside "Important Points to Note")
  - 4-step "how to raise a dispute" guide with icon badges, an eligibility note, Sign Up/Login prompts, and a video callout banner
  - Dispute-resolution process diagram — linearized left-to-right (not an exact branching flowchart recreation — see caveat below) reusing a single `FlowStep` component for all 6 stages
  - "Important Points to Note" checklist
  - Tabbed FAQ accordion (Account/Profile/Enquiry Information tabs — only Account Information has real content; the other two show a "coming soon" placeholder rather than fabricated data)
  - Featured articles
- **Company Dispute Resolution page**
  - Hero banner + "Types of Disputes" sidebar (Company/Account Details, Ownership, Duplicate Account)
  - Two-column Company Details / Account Details field lists (11 fields each) that can be disputed
  - Ownership and Duplicate Account explainer sections
  - A 3-node dispute-resolution process diagram (consumer ↔ CIBIL ↔ bank/financial institution loop, simplified from the source site's circular diagram)
  - Closing CTA + registered office address for postal dispute requests
- **Microfinance Dispute Resolution page**
  - Hero + FREE-service banner, a 4-step "how to fix discrepancies" guide styled with numbered badges, and "how to get your CIBIL MFI Report" instructions
  - Reuses `components/dispute/ProcessDiagram` (now takes an optional `headingKey` prop) and `components/dispute/ImportantPoints` verbatim, since this page's process diagram and important-points content are identical to the Consumer Dispute Resolution page
  - "Ways to Raise a Dispute" — Write To Us / Call Us / Visit Us cards
- **Complaints and Escalations page**
  - Hero, "Your Concerns Matter" copy, "Ways to Reach Us" (call/write/email/walk-in) plus a "Send Us a Letter" box
  - Dispute review timeline (21 days banks/CI + 9 days CIBIL = 30 days), linking to the Framework for Compensation page
  - 4-level escalation framework: Nodal Officer → Principal Nodal Officer → RBI Integrated Ombudsman, with named contacts, emails, and addresses transcribed from the source page
- **Consumer Enquiry page**
  - Hero explaining what a "Credit Enquiry" is, with a selectable (radio-style) pricing plan list and a "Don't let a credit enquiry catch you off guard" CTA
  - Key-terms glossary (ECN, Enquiry Purpose, Enquiry Date & Time), "Don't recognise this enquiry?" actions linking to the Nodal Officer List, Consumer Dispute Resolution, and Contact Us pages
  - Video callout + 3 recommended-reads article cards
- **Commercial Enquiry page**
  - Dismissible top notification banner + a "why are you receiving this notification?" hero for the company (CCR) flow
  - Selectable CCR subscription plans (Basic ₹3000 / Standard ₹6000 / Premium ₹12000) alongside a "How can you check details" panel
  - "CIBIL Rank exposure" info banner, commercial key-terms glossary (WON instead of ECN, commercial-loan purpose text), and "don't recognise this enquiry" actions linking to the Nodal Officer List, Company Dispute Resolution, and Contact Us pages
  - Reuses many `enquiry` translation keys (headings, "get started", "log in", "need help") to avoid duplication; only the CCR-specific strings are new
- **Framework for Compensation page**
  - Hero + RBI-circular explainer, downloadable-PDF cards (placeholders), and a 3-column compensation-flow diagram
  - Tabbed FAQ — only "Compensation Guidelines" has real content (all 5 questions, first one transcribed with its real answer); the other 5 tabs and FAQ items 2-5 show a "coming soon" placeholder rather than fabricated answers
- **Nodal Officer List page**
  - Bank/financial-institution name search box — decorative only, since there's no backend directory to search; it always renders an empty-state illustration, consistent with not fabricating data
  - "Points to note" checklist linking back to the Consumer Dispute Resolution page
- **Login page**
  - Mobile number + OTP request flow with validation
  - Expandable Terms & Conditions consent text
  - "Login with username" alternative action
  - Link to create a new account
- **Register page** (unchanged, existing form)
  - Email, 10-digit mobile number, password strength rules
  - Confirm password match check
  - First / last name (letters only)
  - ID type selector with per-type format validation (Aadhaar, PAN, Passport, Voter ID, Driving License)
  - Date of birth with 18+ age gate
  - 6-digit pincode
  - Terms & Conditions consent checkbox
- **Multi-language support** — English, Hindi, Marathi, Tamil (switchable via header dropdown), stored in separate per-language files
- **Fully responsive** — all pages adapt from mobile to desktop breakpoints
- **Password visibility toggles** on password and confirm-password fields
- **ID number masking** using `-webkit-text-security` (no extra `type="password"` fields that confuse browser heuristics)
- **Accessible form structure** — all inputs inside a single `<form>`, proper `autocomplete` attributes, `noValidate` with JS-driven validation

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| i18n | Custom context + per-language translation files (`lib/i18n/`) |

## Project Structure

```
cibil-clone/
├── app/
│   ├── layout.tsx                  # Root layout — wraps app in LanguageProvider
│   ├── page.tsx                    # Home page — site nav, score hero, products, articles, stats, self-service
│   ├── login/
│   │   └── page.tsx                # Login page — OTP login card + illustration
│   ├── register/
│   │   └── page.tsx                # Register page — full registration form
│   ├── choose-subscription/
│   │   └── page.tsx                # Subscription page — hero, pricing plans, app promo
│   ├── about-us/
│   │   └── page.tsx                # About Us page — hero, About TransUnion CIBIL copy, corporate footer
│   ├── contact-us/
│   │   └── page.tsx                # Contact Us page — hero, quick links grid, contact info, chat widget
│   ├── consumer-dispute-resolution/
│   │   └── page.tsx                # Dispute page — hero, how-to steps, process diagram, FAQ accordion, articles
│   ├── company-dispute-resolution/
│   │   └── page.tsx                # Company dispute page — hero, field lists, ownership/duplicate, process diagram
│   ├── microfinance-dispute-resolution/
│   │   └── page.tsx                # MFI dispute page — hero, how-to-fix steps, get-report cards, ways to raise a dispute
│   ├── complaints-and-escalations/
│   │   └── page.tsx                # Escalations page — concerns/ways-to-reach-us, timeline, 4-level escalation path
│   ├── enquiry/
│   │   └── page.tsx                # Consumer Enquiry page — plan options, key terms, don't-recognise actions, articles
│   ├── enquiryccr/
│   │   └── page.tsx                # Commercial Enquiry page — notification banner, CCR plans, key terms, don't-recognise
│   ├── framework-for-compensation/
│   │   └── page.tsx                # Compensation framework page — explainer, PDF cards, flow diagram, tabbed FAQ
│   ├── nodal-officer-list/
│   │   └── page.tsx                # Nodal Officer List page — search box (decorative empty state) + points to note
│   └── globals.css                 # Tailwind base styles
├── components/
│   ├── Header.tsx                   # Shared header (variant: "full" | "marketing" | "auth" | "site")
│   ├── Footer.tsx                    # Shared footer (variant: "simple" | "minimal" | "full" | "corporate", optional gold accentTop)
│   ├── RegistrationForm.tsx          # Registration form + validation wiring
│   ├── LoginForm.tsx                 # Login form + validation wiring
│   ├── icons.tsx                      # Shared inline SVG icons used across all pages
│   ├── home/
│   │   ├── ScoreGauge.tsx             # Reusable CIBIL score gauge (hero + article thumbnail)
│   │   ├── HeroSection.tsx            # Home page hero (score card + CTA)
│   │   ├── ProductsServices.tsx       # Individuals/Businesses/Microfinance product cards
│   │   ├── LearnAboutCredit.tsx       # Filter pills + video/article grid
│   │   ├── StatsBar.tsx               # Stats + customer quote band
│   │   └── SelfService.tsx            # Dispute/verification links section
│   ├── subscription/
│   │   ├── Hero.tsx                   # Choose Subscription page hero banner
│   │   ├── PricingCard.tsx            # Single reusable pricing plan card
│   │   ├── PricingPlans.tsx           # Pricing grid — composes 4x PricingCard
│   │   └── AppPromo.tsx               # Mobile app promo section
│   ├── login/
│   │   └── LoginIllustration.tsx      # Decorative illustration + carousel dots
│   ├── about/
│   │   ├── HeroSection.tsx            # About Us hero (eyebrow, title, CTA, cityscape placeholder)
│   │   └── AboutContent.tsx           # "About TransUnion CIBIL" copy section
│   ├── contact/
│   │   ├── HeroBanner.tsx             # Support hero banner (gradient placeholder)
│   │   ├── QuickLinksSection.tsx      # 3-column quick links grid + sidebar CTA card
│   │   ├── ContactInfoSection.tsx     # Watch videos / contact us / registered office rows
│   │   └── ChatWidget.tsx             # Floating "Chat with CIBIL" button
│   ├── dispute/
│   │   ├── HeroSection.tsx            # Dispute hero + FREE-service banner
│   │   ├── HowToInitiate.tsx          # 4-step guide + signup/login prompts + video banner
│   │   ├── ProcessDiagram.tsx         # Linearized dispute-resolution flow (reusable FlowStep)
│   │   ├── ImportantPoints.tsx        # Checklist of important points
│   │   ├── DisputeFaqSection.tsx      # Tabbed FAQ accordion
│   │   └── FeaturedArticles.tsx       # Related article cards
│   ├── company-dispute/
│   │   ├── HeroSection.tsx            # Company dispute hero banner
│   │   ├── IntroSection.tsx           # Intro copy + "Types of Disputes" sidebar
│   │   ├── FieldDetailsSection.tsx    # Company Details / Account Details field lists
│   │   ├── OwnershipDuplicateSection.tsx # Ownership + Duplicate Account sections
│   │   ├── ProcessDiagram.tsx         # 3-node dispute-resolution loop diagram
│   │   └── ClosingSection.tsx         # Closing CTA + registered office address
│   ├── mfi-dispute/
│   │   ├── HeroSection.tsx            # MFI dispute hero + FREE-service banner
│   │   ├── HowToFixSection.tsx        # 4-step "how to fix" guide with numbered badges
│   │   ├── GetReportSection.tsx       # "How to get your CIBIL MFI Report" cards
│   │   └── WaysToRaiseDispute.tsx     # Write To Us / Call Us / Visit Us cards
│   ├── escalations/
│   │   ├── HeroSection.tsx            # Escalations hero
│   │   ├── ConcernsMatterSection.tsx  # "Your Concerns Matter" copy
│   │   ├── WaysToReachUsSection.tsx   # Call/write/email/walk-in + "Send Us a Letter"
│   │   ├── TimelineSection.tsx        # Dispute review timeline
│   │   └── EscalationFrameworkSection.tsx # Nodal Officer → PNO → RBI Ombudsman levels
│   ├── enquiry/
│   │   ├── HeroSection.tsx            # Credit enquiry hero
│   │   ├── PlanOptionsSection.tsx     # Selectable pricing plan list + CTA
│   │   ├── EligibleBanner.tsx         # "Eligible for one FREE report" banner
│   │   ├── KeyTermsSection.tsx        # ECN / Enquiry Purpose / Enquiry Date & Time
│   │   ├── DontRecogniseSection.tsx   # Contact lender / raise dispute / need help actions
│   │   ├── VideoSection.tsx           # Video callout placeholder
│   │   └── RecommendedReadsSection.tsx # Related article cards
│   ├── enquiry-ccr/
│   │   ├── NotificationBanner.tsx     # Dismissible top alert banner
│   │   ├── HeroSection.tsx            # "Why are you receiving this notification?" hero
│   │   ├── PlanOptionsSection.tsx     # CCR subscription plans + how-to-check panel + exposure banner
│   │   ├── KeyTermsSection.tsx        # WON / Enquiry Purpose / Enquiry Date & Time
│   │   └── DontRecogniseSection.tsx   # PNO / Initiate a Dispute / Need help actions
│   ├── framework/
│   │   ├── HeroSection.tsx            # Compensation framework hero
│   │   ├── WhatIsFrameworkSection.tsx # Explainer + PDF download cards
│   │   ├── CompensationDiagram.tsx    # 3-column compensation-flow diagram
│   │   ├── FrameworkFaqSection.tsx    # Tabbed FAQ (only one tab has real content)
│   │   └── SafeguardBanner.tsx        # Closing banner
│   └── nodal-officer/
│       ├── SearchSection.tsx          # Bank/institution name search box
│       └── EmptyStateAndPoints.tsx    # Decorative empty state + "Points to note"
├── context/
│   └── LanguageContext.tsx           # Language state + t() translation helper
└── lib/
    ├── i18n/
    │   ├── index.ts                   # Aggregates languages + translations map
    │   ├── en.ts                      # English strings (source of truth for keys)
    │   ├── hi.ts                      # Hindi strings
    │   ├── mr.ts                      # Marathi strings
    │   └── ta.ts                      # Tamil strings
    └── validators.ts                 # Shared field validation functions (used by Login + Register)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm / bun)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. See the [Pages](#pages) table above for the full route list.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint
```

## Form Validation Rules

### Register (`/register`)

| Field | Rules |
|---|---|
| Email | Required, valid email format |
| Mobile | Required, exactly 10 digits, must start with 6-9 |
| Password | Required, min 8 chars, uppercase, lowercase, number, special character |
| Confirm Password | Required, must match Password |
| First / Last Name | Required, min 2 chars, letters only |
| ID Type | Required, must select one |
| ID Number | Required; Aadhaar → 12 digits, PAN → AAAAA9999A, Passport → A1234567, Voter ID → ABC1234567 |
| Date of Birth | Required, must be 18+ years old |
| Pincode | Required, exactly 6 digits |
| Terms | Must be checked |

### Login (`/login`)

| Field | Rules |
|---|---|
| Mobile | Required, exactly 10 digits, must start with 6-9 |
| Terms | Must be checked before "Send OTP" is enabled |

Errors appear on blur (field by field) and all at once on submit attempt. Shared validation logic lives in [`lib/validators.ts`](lib/validators.ts) so both forms stay consistent.

## Internationalisation

Each language lives in its own file under [`lib/i18n/`](lib/i18n). `en.ts` is the source of truth for translation keys (`TranslationKey`); every other language file is typed against it, so a missing translation key is a compile-time error.

To add a new language:

1. Create a new file, e.g. `lib/i18n/de.ts`, exporting `Record<TranslationKey, string>` with every key translated.
2. Add the language code to the `Language` type in `lib/i18n/index.ts`.
3. Add an entry to the `languages` array (`code`, `label`, `nativeLabel`).
4. Import and add the new translation object to the `translations` map.

To add a new translation key: add it to `lib/i18n/en.ts` first — TypeScript will then flag every other language file until the key is added there too.

## Logo Image

The header logo is fetched from `https://www.cibil.com/content/dam/cibil/content-fragments/header/cibil-logo.png` via `next/image`. Two things in `next.config.ts` / `Header.tsx` are load-bearing:

- **`images.remotePatterns`** in `next.config.ts` allow-lists `www.cibil.com` — required by `next/image` for any external `src`.
- **`unoptimized`** on the `<Image>` in `Header.tsx`. `cibil.com` sits behind Cloudflare bot protection that 403s Next's server-side image-optimizer fetch (it doesn't send a browser-like User-Agent). `unoptimized` skips the `/_next/image` proxy entirely, so the `<img>` tag points straight at the source URL and the *browser* fetches it directly — real browser requests aren't blocked, only the server-side proxy was.

## A Note on External Links

Several pages (Complaints and Escalations, Framework for Compensation, Consumer Enquiry, etc.) reference real-world destinations from the source site — RBI's complaint portal, `ssp.cibil.com` request-tracking links, PDF downloads, `rbi.org.in` pages. None of these are wired to their actual external URLs; every one renders as `href="#"` with the same visible label text. This is deliberate and consistent with how every other out-of-scope link in this project (footer links, social icons, mega-menu placeholders) has been handled from the start — the visual/textual fidelity is preserved without hyperlinking to unverified third-party destinations.

## A Note on Blog Card Titles

The Knowledge Center blog-listing pages (`/credit-advice`, `/credit-myths`, `/watch-and-learn`, `/commercial-credit`, `/new-to-credit`) render grids of blog article cards. The **card titles** (~85 in total, most on Credit Advice) are stored as plain English string arrays in [`lib/blogCards.ts`](lib/blogCards.ts) rather than in the i18n system. They're article-title *content*, not interface chrome, and translating 85 marketing headlines into all four languages would be disproportionate. All the surrounding page chrome (hero titles, "Topics", the "BLOG" / "BLOG POST" / "READ MORE" labels, the subscribe banner, and the legal disclaimer) **is** fully translated via i18n. The CIBIL Jaagran and Saksham pages follow the same split — section headings/body copy are i18n'd; the video/blog/comic thumbnail titles are inline English data.

## A Note on the Footer Pages

Two of the footer-linked pages depart from the usual full-chrome layout to match their real-world sources:

- **`/external-links/business-code-of-conduct`** is a **standalone** notice — logo only, no site header or footer — exactly as the source Ethics Helpline landing page is served.
- **`/regulatory`** renders an **honest shell** (title, intro, and the table's column headers) rather than fabricated data: the source Regulatory Disclosure document is an extremely long (~1000-row) table that wasn't legible in the reference, so the intro points readers to the official site and the table body shows a placeholder row instead of invented content.

The suit-filed and RBI-notifications pages share a `SuitFiledSideNav` left-hand section-nav. Factual page *content* (the 2000→today milestones, the ~26 partner brand names, and the 9 RBI-circular rows) lives as English data in [`lib/footerPageData.ts`](lib/footerPageData.ts), following the same content-vs-chrome split as the blog cards; all surrounding UI chrome is fully i18n'd.

## Reusable Components

- **`Header`** — one component serves all pages via a `variant` prop: `"site"` (home, about-us, contact-us, and every Consumer Grievance + Knowledge Center page — two-row nav + CTAs + hover mega-menus), `"full"` (register, login button + script/language tools), `"marketing"` (choose-subscription, plain "Login" link), `"auth"` (login page, script/language tools + gold border, no login button). Mega-menu links are data-driven (`MEGA_MENUS`) with an optional per-link `href` (defaults to `"#"`) — every item under "Consumer Grievance" and "Knowledge Center" now points at a real internal route.
- **`Footer`** — one component with `"simple"` / `"minimal"` / `"full"` / `"corporate"` variants, sharing a single `FullFooterLayout` internal layout (columns + contact card + bottom links + optional certification line) so `"full"` and `"corporate"` don't duplicate markup — plus an `accentTop` flag for the gold border. Footer link targets are data-driven via a `FOOTER_LINK_HREFS` map (`Partial<Record<TranslationKey, string>>`); a small `FooterLink` component resolves each column/bottom link's `href` from that map (defaulting to `"#"` for links without a built page), so the "About TransUnion CIBIL", "Company History", "Support", "Report a Vulnerability", "Code Of Conduct", "Official Partners", "Non Suit and Suit Filed Cases", "RBI Notifications", "Regulatory Disclosure", and "Blog" links all point at real internal routes.
- **`ScoreGauge`** — a single gauge component reused at two sizes: the hero score card and the "Can You Bounce Back From A Low CIBIL Score?" article thumbnail.
- **`PricingCard`** — a single card component driven entirely by props, reused 4 times on the Choose Subscription page for the Starter/Basic/Standard/Premium tiers.
- **`FlowStep`** / **`ProcessNode`** — single box/node components driven entirely by props, reused across the consumer and company dispute-resolution process diagrams.
- **`components/dispute/ProcessDiagram`** / **`ImportantPoints`** — reused wholesale (not just the pattern — the actual components) on the Microfinance Dispute Resolution page, since that page's process diagram and important-points content are identical to the Consumer Dispute Resolution page. `ProcessDiagram` takes an optional `headingKey` prop so the two pages can show different section headings over the same diagram.
- **`components/faq/`** — shared building blocks for the FAQ Knowledge Center pages: `CreditSidebarCard` (the "Wait—what about my credit?" card, with `"score-report"` / `"subscribe"` / `"rank"` variants that appear on almost every FAQ page), `FaqHero` (grey text band + gradient hero image, driven by translation keys incl. an optional bold title segment), and `FaqAccordion` (plus/minus expandable list, reused on the Free CIBIL Score page). Each page's long-form Q&A body lives in its own `components/<slug>/…Content.tsx` client component.
- **`components/blog-grid/BlogGrid`** — one component renders all 5 Knowledge Center blog-listing pages (Credit Advice / Credit Myths / Watch and Learn / Commercial Credit / New To Credit): hero band + "Topics" card grid + teal subscribe banner + legal disclaimer. Each page just passes a `titleKey`, a gradient, a CTA-label key, and its card-title array from `lib/blogCards.ts`.
- **`lib/validators.ts`** — field validators shared between `RegistrationForm` and `LoginForm`.
- **`components/icons.tsx`** — shared inline SVG icons (eye toggle, info, chevron, check/cross, phone, search, social icons, etc.) used across pages instead of being redefined per component.

## License

This project is for educational and demonstration purposes only. CIBIL and TransUnion are registered trademarks of TransUnion CIBIL Limited.
