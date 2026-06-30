# CIBIL Clone

A pixel-faithful clone of the [TransUnion CIBIL](https://www.cibil.com) credit profile registration page, built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Features

- **Registration form** with full client-side validation
  - Email, 10-digit mobile number, password strength rules
  - Confirm password match check
  - First / last name (letters only)
  - ID type selector with per-type format validation (Aadhaar, PAN, Passport, Voter ID, Driving License)
  - Date of birth with 18+ age gate
  - 6-digit pincode
  - Terms & Conditions consent checkbox
- **Multi-language support** — English, Hindi, Marathi, Tamil (switchable via header dropdown)
- **Password visibility toggles** on password and confirm-password fields
- **ID number masking** using `-webkit-text-security` (no extra `type="password"` fields that confuse browser heuristics)
- **Accessible form structure** — all inputs inside a single `<form>`, proper `autocomplete` attributes, `noValidate` with JS-driven validation
- **Form reset** after successful submission

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| i18n | Custom context + translation map (`lib/i18n.ts`) |

## Project Structure

```
cibil-clone/
├── app/
│   ├── layout.tsx          # Root layout — wraps app in LanguageProvider
│   ├── page.tsx            # Home page — composes Header, RegistrationForm, Footer
│   └── globals.css         # Tailwind base styles
├── components/
│   ├── Header.tsx          # Sticky header with logo, login button, language switcher
│   ├── RegistrationForm.tsx# Main form with validation logic
│   └── Footer.tsx          # Copyright and policy links
├── context/
│   └── LanguageContext.tsx # Language state + t() translation helper
└── lib/
    └── i18n.ts             # Translation strings for en / hi / mr / ta
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

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint
```

## Form Validation Rules

| Field | Rules |
|---|---|
| Email | Required, valid email format |
| Mobile | Required, exactly 10 digits |
| Password | Required, min 8 chars, uppercase, lowercase, number, special character |
| Confirm Password | Required, must match Password |
| First / Last Name | Required, min 2 chars, letters only |
| ID Type | Required, must select one |
| ID Number | Required; Aadhaar → 12 digits, PAN → AAAAA9999A, Passport → A1234567, Voter ID → ABC1234567 |
| Date of Birth | Required, must be 18+ years old |
| Pincode | Required, exactly 6 digits |
| Terms | Must be checked |

Errors appear on blur (field by field) and all at once on submit attempt.

## Internationalisation

Languages are defined in [`lib/i18n.ts`](lib/i18n.ts). To add a new language:

1. Add the language code to the `Language` type.
2. Add an entry to the `languages` array with `code`, `label`, and `nativeLabel`.
3. Add a full translation object under that code in `translations`.

## License

This project is for educational and demonstration purposes only. CIBIL and TransUnion are registered trademarks of TransUnion CIBIL Limited.
