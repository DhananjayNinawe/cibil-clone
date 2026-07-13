/**
 * V2 mirrors V1's route tree one-for-one under /v2: "/cibil-score-report" becomes
 * "/v2/cibil-score-report", "/" becomes "/v2".
 *
 * Keeping the paths identical is what lets V2 derive its nav, footer, sitemap and search
 * results from V1's own data files (lib/sitemapData.ts, lib/searchIndex.ts) by mapping the
 * hrefs, instead of maintaining a second, drift-prone copy of the information architecture.
 */
export const V2_ROOT = "/v2";

export function toV2(href: string): string {
  if (!href.startsWith("/")) return href; // external URL, mail/tel — leave alone
  if (href === "/") return V2_ROOT;
  if (href.startsWith(`${V2_ROOT}/`) || href === V2_ROOT) return href;
  return `${V2_ROOT}${href}`;
}

/** Strips the /v2 prefix — used to look a V2 pathname up in V1-keyed data. */
export function fromV2(href: string): string {
  if (href === V2_ROOT) return "/";
  return href.startsWith(`${V2_ROOT}/`) ? href.slice(V2_ROOT.length) : href;
}
