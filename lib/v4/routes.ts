/**
 * V4 mirrors V1's route tree one-for-one under /v4: "/cibil-score-report" becomes
 * "/v4/cibil-score-report", "/" becomes "/v4".
 *
 * Same reasoning as V2 and V3 before it: identical paths are what let V4 derive its nav, footer,
 * sitemap and search results from V1's own data files by mapping the hrefs, rather than
 * maintaining a fourth, drift-prone copy of the information architecture. V4 re-presents the
 * site; it does not re-file it.
 */
export const V4_ROOT = "/v4";

export function toV4(href: string): string {
  if (!href.startsWith("/")) return href; // external URL, mailto:, tel: — leave alone
  if (href === "/") return V4_ROOT;
  if (href === V4_ROOT || href.startsWith(`${V4_ROOT}/`)) return href;
  return `${V4_ROOT}${href}`;
}

/** Strips the /v4 prefix — used to look a V4 pathname up in V1-keyed data. */
export function fromV4(href: string): string {
  if (href === V4_ROOT) return "/";
  return href.startsWith(`${V4_ROOT}/`) ? href.slice(V4_ROOT.length) : href;
}
