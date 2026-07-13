/**
 * Translation coverage guard.
 *
 * The bug this exists to prevent: a page renders fine, the build passes, every check in AGENTS.md
 * is green — and the page is still entirely in English, because its copy lives in a `lib/` data
 * file that never went through `t()`. Regex scans of `components/` cannot see that, so this script
 * transpiles the real modules and compares the actual objects, locale by locale.
 *
 *   node scripts/check-i18n.mjs
 *
 * Exits non-zero and names the offenders if any check fails.
 */
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, ".i18n-check");
const LOCALES = ["hi", "mr", "ta"];

/** Values that are correct to leave in Latin script: brands, tokens, emails, URLs, codes. */
const ALLOWED_LATIN =
  /^(CIBIL|TransUnion|RBI|NBFC|PAN|GST|OTP|MSME|CERSAI|NPA|CIC|FIs?|KYC|CIR|SMS|WhatsApp|VISA|MASTERCARD|Part of TransUnion|CIBIL - Part of TransUnion|JAAG₹AN|DD \/ MM \/ YYYY)$/i;

/**
 * Proper nouns that stay in Latin script even inside a translated document — the registered
 * company name and the street address it is registered at. Transliterating these would make the
 * Grievance Officer's postal address undeliverable, so they are correct as-is.
 */
const PROPER_NOUNS = new Set(["TransUnion CIBIL Limited", "Senapati Bapat Marg, Lower Parel,"]);

const SKIP_VALUE = (s) =>
  !s.trim() ||
  ALLOWED_LATIN.test(s.trim()) ||
  PROPER_NOUNS.has(s.trim()) ||
  /^https?:\/\//.test(s) || // URLs
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) || // emails
  /^[\d\s\-–/.,()₹%+]+$/.test(s) || // pure numerals / amounts
  /^(RBI|DBOD|Press Release)[\w\s./()\-–]*$/i.test(s); // circular reference numbers

const HAS_DEVANAGARI = (s) => /[ऀ-ॿ]/.test(s);
const HAS_TAMIL = (s) => /[஀-௿]/.test(s);
const HAS_SCRIPT = { hi: HAS_DEVANAGARI, mr: HAS_DEVANAGARI, ta: HAS_TAMIL };
/** Three or more consecutive Latin words reads as untranslated English prose, not a stray token. */
const LOOKS_ENGLISH = (s) => /[A-Za-z]{3,}(\s+[A-Za-z'’,.-]+){2,}/.test(s);

const failures = [];
const fail = (check, msg) => failures.push(`[${check}] ${msg}`);

// ---------------------------------------------------------------------------
// Transpile lib/**/*.ts into runnable ESM so we can inspect the real objects.
// ---------------------------------------------------------------------------
const tsFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".ts")) tsFiles.push(p);
  }
})(join(ROOT, "lib"));

rmSync(OUT, { recursive: true, force: true });

for (const file of tsFiles) {
  const src = readFileSync(file, "utf8");
  let { outputText } = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  });

  // Rewrite specifiers for on-disk ESM: "@/lib/x" -> relative, and add the .mjs extension.
  // A bare "./x" may be a file (./en) or a directory index (./legalPageData) — resolve which.
  outputText = outputText.replace(/from\s+["']([^"']+)["']/g, (whole, spec) => {
    let target;
    if (spec.startsWith("@/lib/")) target = join(ROOT, "lib", spec.slice("@/lib/".length));
    else if (spec.startsWith(".")) target = resolve(dirname(file), spec);
    else return whole; // bare package import — leave alone

    const isDir = tsFiles.some((f) => f === join(target, "index.ts"));
    const resolved = isDir ? join(target, "index") : target;
    let rel = relative(dirname(file), resolved).replace(/\\/g, "/");
    if (!rel.startsWith(".")) rel = `./${rel}`;
    return `from "${rel}.mjs"`;
  });

  const dest = join(OUT, relative(join(ROOT, "lib"), file)).replace(/\.ts$/, ".mjs");
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, outputText);
}

const load = (p) => import(pathToFileURL(join(OUT, p)).href);

// ---------------------------------------------------------------------------
// Check 1 — the flat i18n catalog: key parity, and values never translated.
// ---------------------------------------------------------------------------
const { translations } = await load("i18n/index.mjs");
const enKeys = Object.keys(translations.en);

for (const loc of LOCALES) {
  const missing = enKeys.filter((k) => !(k in translations[loc]));
  if (missing.length) fail("catalog", `${loc}.ts is missing keys: ${missing.join(", ")}`);

  const untranslated = enKeys.filter((k) => {
    const en = translations.en[k];
    const val = translations[loc][k];
    return val === en && !SKIP_VALUE(en) && LOOKS_ENGLISH(en);
  });
  if (untranslated.length)
    fail("catalog", `${loc}.ts values still identical to English: ${untranslated.join(", ")}`);
}

// ---------------------------------------------------------------------------
// Check 2 — locale-keyed data modules: structure parity + real translation.
//
// Each entry is a `Record<Language, T>` exported from a lib data module. We walk en and the
// locale side by side: same shape, same ids — and every user-visible string actually translated.
// ---------------------------------------------------------------------------
const [blogCards, footerData, legal, privacy, gist] = await Promise.all([
  load("blogCards.mjs"),
  load("footerPageData.mjs"),
  load("legalPageData/index.mjs"),
  load("privacyPolicyData/index.mjs"),
  load("gistRbiSchemeData/index.mjs"),
]);

/** Card titles are `Record<Language, string>` per card, so pivot them into one Record per array. */
const pivotCards = (cards) =>
  Object.fromEntries(LOCALES.concat("en").map((l) => [l, cards.map((c) => c.title[l])]));

const DATA = {
  "blogCards.CREDIT_ADVICE_CARDS": pivotCards(blogCards.CREDIT_ADVICE_CARDS),
  "blogCards.CREDIT_MYTHS_CARDS": pivotCards(blogCards.CREDIT_MYTHS_CARDS),
  "blogCards.WATCH_LEARN_CARDS": pivotCards(blogCards.WATCH_LEARN_CARDS),
  "blogCards.COMMERCIAL_CREDIT_CARDS": pivotCards(blogCards.COMMERCIAL_CREDIT_CARDS),
  "blogCards.NEW_TO_CREDIT_CARDS": pivotCards(blogCards.NEW_TO_CREDIT_CARDS),
  "footerPageData.COMPANY_HISTORY": footerData.COMPANY_HISTORY,
  "footerPageData.SUIT_FILED_OVERVIEW": footerData.SUIT_FILED_OVERVIEW,
  "footerPageData.RBI_CIRCULARS": footerData.RBI_CIRCULARS,
  "legalPageData.TERMS_INTRO": legal.TERMS_INTRO,
  "legalPageData.TERMS_SECTIONS": legal.TERMS_SECTIONS,
  "privacyPolicyData.PRIVACY_POLICY": privacy.PRIVACY_POLICY,
  "privacyPolicyData.PRIVACY_POLICY_LAST_UPDATED": privacy.PRIVACY_POLICY_LAST_UPDATED,
  "gistRbiSchemeData.GIST_RBI_SCHEMES": gist.GIST_RBI_SCHEMES,
};

/** Fields that must stay byte-identical across locales — they are keys/anchors, not prose. */
const STRUCTURAL = new Set(["id", "image", "href", "reference", "sr", "year"]);

function compare(name, loc, en, val, path = "") {
  const at = `${name}${path}`;

  if (Array.isArray(en)) {
    if (!Array.isArray(val)) return fail("data", `${at}: ${loc} is not an array`);
    if (en.length !== val.length)
      return fail("data", `${at}: ${loc} has ${val.length} entries, en has ${en.length}`);
    en.forEach((item, i) => compare(name, loc, item, val[i], `${path}[${i}]`));
    return;
  }

  if (en && typeof en === "object") {
    if (!val || typeof val !== "object") return fail("data", `${at}: ${loc} is not an object`);
    const enk = Object.keys(en).sort();
    const vk = Object.keys(val).sort();
    if (enk.join() !== vk.join())
      return fail("data", `${at}: ${loc} keys [${vk}] differ from en [${enk}]`);
    for (const k of enk) {
      if (STRUCTURAL.has(k)) {
        if (en[k] !== val[k])
          fail("data", `${at}.${k}: ${loc} changed a structural field ("${val[k]}" ≠ "${en[k]}")`);
        continue;
      }
      compare(name, loc, en[k], val[k], `${path}.${k}`);
    }
    return;
  }

  if (typeof en !== "string") return; // numbers/booleans — nothing to translate

  if (SKIP_VALUE(en)) return;

  if (val === en && LOOKS_ENGLISH(en))
    return fail("data", `${at}: ${loc} is byte-identical to English — "${en.slice(0, 70)}…"`);

  // The strongest signal: a translated string must contain the target script.
  if (LOOKS_ENGLISH(val) && !HAS_SCRIPT[loc](val))
    fail("data", `${at}: ${loc} has no ${loc === "ta" ? "Tamil" : "Devanagari"} — "${val.slice(0, 70)}…"`);
}

for (const [name, record] of Object.entries(DATA)) {
  for (const loc of LOCALES) {
    if (!(loc in record)) {
      fail("data", `${name}: missing locale "${loc}"`);
      continue;
    }
    compare(name, loc, record.en, record[loc]);
  }
}

// ---------------------------------------------------------------------------
// Check 3 — hardcoded user-visible text in components (JSX text + a11y attrs).
// ---------------------------------------------------------------------------
const tsxFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".tsx")) tsxFiles.push(p);
  }
})(join(ROOT, "components"));

for (const file of tsxFiles) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  readFileSync(file, "utf8")
    .split(/\r?\n/)
    .forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      const hits = [];
      for (const m of line.matchAll(/>([^<>{}\n]{3,})</g)) hits.push(m[1].trim());
      for (const m of line.matchAll(/\b(alt|placeholder|title|aria-label)="([^"]{3,})"/g))
        hits.push(m[2].trim());
      for (const s of hits) {
        if (!/[A-Za-z]{3,}/.test(s) || SKIP_VALUE(s)) continue;
        // `<PdfCard title="frameworkPdfCardTitle" />` passes a TranslationKey to a React prop, which
        // the child resolves through t(). A value that *is* a catalog key is a reference, not copy.
        if (s in translations.en) continue;
        fail("component", `${rel}:${i + 1} hardcoded text: "${s.slice(0, 60)}"`);
      }
    });
}

// ---------------------------------------------------------------------------
rmSync(OUT, { recursive: true, force: true });

if (failures.length) {
  console.error(`✗ ${failures.length} translation problem(s):\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log("✓ translations complete: catalog, locale data and components all clean");
