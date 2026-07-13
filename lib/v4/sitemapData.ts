import { SITEMAP_COLUMNS, type SitemapColumn } from "@/lib/sitemapData";
import { toV4 } from "@/lib/v4/routes";

/**
 * V4's sitemap, derived from V1's rather than hand-copied.
 *
 * V1 guarantees two invariants (AGENTS.md): every route under `app/` appears in its sitemap, and
 * every href there resolves. Because /v4 mirrors the route tree exactly, mapping each href through
 * `toV4()` carries both invariants across for free — V4 cannot grow an orphan or a dead link
 * unless V1 has one. Re-typing the tree by hand is what would let them drift.
 *
 * (V1's own `lib/sitemapData.ts` deliberately does not list the /v2, /v3 or /v4 trees: they are
 * alternate presentations of the same pages, not new destinations, and each ships its own sitemap.
 * This is the precedent V2 set, V3 followed, and V4 follows — V1 is production and is read-only.)
 */
export const V4_SITEMAP_COLUMNS: SitemapColumn[] = SITEMAP_COLUMNS.map((column) => ({
  ...column,
  href: toV4(column.href),
  groups: column.groups.map((group) => ({
    ...group,
    href: group.href ? toV4(group.href) : undefined,
    links: group.links.map((link) => ({ ...link, href: toV4(link.href) })),
  })),
}));
