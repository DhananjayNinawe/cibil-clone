/**
 * V3 mirrors V1's route tree one-for-one under /v3: "/cibil-score-report" becomes
 * "/v3/cibil-score-report", "/" becomes "/v3".
 *
 * Same reasoning as V2 (lib/v2/routes.ts): identical paths are what let V3 derive its nav,
 * footer, sitemap and search results from V1's own data files by mapping the hrefs, instead
 * of maintaining a third, drift-prone copy of the information architecture.
 */
export const V3_ROOT = "/v3";

export function toV3(href: string): string {
  if (!href.startsWith("/")) return href; // external URL, mail/tel — leave alone
  if (href === "/") return V3_ROOT;
  if (href.startsWith(`${V3_ROOT}/`) || href === V3_ROOT) return href;
  return `${V3_ROOT}${href}`;
}

/** Strips the /v3 prefix — used to look a V3 pathname up in V1-keyed data. */
export function fromV3(href: string): string {
  if (href === V3_ROOT) return "/";
  return href.startsWith(`${V3_ROOT}/`) ? href.slice(V3_ROOT.length) : href;
}
