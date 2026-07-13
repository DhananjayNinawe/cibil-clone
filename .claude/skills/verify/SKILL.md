---
name: verify
description: Build, run, and drive the cibil-clone Next.js app in a browser to observe a change working end-to-end.
---

# Verifying cibil-clone

Next.js 16 (Turbopack) + React 19 + Tailwind v4. Pages are in `app/`, presentational
components in `components/<page>/<Name>Content.tsx`. Most content components are
`"use client"` and pull copy from `lib/i18n/{en,hi,mr,ta}.ts` via `useLanguage()`,
with factual page data (timelines, tables, card lists) in `lib/*.ts`.

The surface is **rendered pixels**. Drive the page in a browser and screenshot it.
Don't run tests or `tsc` — neither proves the page renders.

## 1. Get a dev server

A dev server is often **already running on :3000**. Starting another one fails with
"Another next dev server is already running." Check before launching:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
npm run dev            # only if the above doesn't answer
```

## 2. Drive it with Playwright

Playwright (with Chromium) is already in `node_modules` — no install needed.

**Gotcha: the script must live inside the repo.** Node resolves `import { chromium }
from 'playwright'` relative to the *script's* directory, not cwd. A script in a temp
dir throws `ERR_MODULE_NOT_FOUND`. Write it to the repo root (e.g. `.drive.tmp.mjs`)
and delete it after.

**Gotcha: set a real Chrome user-agent.** Remote images are served from Cloudflare-
fronted `www.cibil.com` / `www.transunioncibil.com`, which **403s the default headless
UA**. Chromium then reports `net::ERR_BLOCKED_BY_ORB` and `naturalWidth === 0`, so every
remote image looks broken when it is actually fine in a real browser. Always pass:

```js
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: UA });
```

If you see images fail, confirm which side is at fault before calling it a bug:

```bash
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" -A "$UA" "<image-url>"   # 200 image/jpeg = fine
```

## 3. What to assert

Read back the *computed* result, not the source:

```js
await page.goto(url, { waitUntil: 'networkidle' });
// images really decoded?
await page.evaluate(() => [...document.querySelectorAll('img')]
  .map(i => ({ src: i.currentSrc.split('/').pop(), w: i.naturalWidth })));  // w > 0
// text/colors/sizes actually applied?
await page.evaluate(() => [...document.querySelectorAll('div.grid > p:first-child')]
  .map(p => ({ text: p.textContent.trim(), ...getComputedStyle(p) })));
page.on('requestfailed', ...); page.on('response', r => r.status() >= 400 && ...);
```

Then screenshot `fullPage: true` and **look at it**.

## 4. Probes worth doing

- **Mobile (390px)**: `document.documentElement.scrollWidth === clientWidth` catches
  horizontal overflow, the most common Tailwind regression here.
- **i18n**: copy comes from 4 locale files. A key added to `en.ts` but missing from
  `hi/mr/ta.ts` renders the raw key at runtime. Grep all four.
- **Adding a remote image host** requires a matching `remotePatterns` entry in
  `next.config.ts` or `next/image` throws at render.

## Reference pages

Live originals are at `www.cibil.com` (consumer) and `www.transunioncibil.com`
(business). To recover an exact asset URL, fetch the real page with a browser UA and
grep the markup — the paths are long and easy to mistype:

```bash
curl -sL -A "$UA" https://www.transunioncibil.com/about-us/company-history \
  | grep -oE '/content/dam/[^"]*\.(jpg|png)' | sort -u
```

Note `components/Header.tsx` only implements the **consumer** header
(`full | site | marketing | auth`). There is no business-site header variant, so
business pages will not match their reference chrome.
