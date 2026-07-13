import { SITEMAP_COLUMNS, type SitemapColumn } from "@/lib/sitemapData";
import { toV3 } from "@/lib/v3/routes";

/**
 * V3's sitemap, derived from V1's rather than hand-copied.
 *
 * V1 guarantees two invariants (AGENTS.md): every route under app/ appears there, and every
 * href resolves. Because /v3 mirrors the route tree exactly, mapping each href through `toV3()`
 * carries both invariants across for free — V3 cannot grow an orphan or a dead link unless V1
 * has one. Re-typing the tree by hand is what would let them drift.
 *
 * (V1's own `lib/sitemapData.ts` deliberately does not list the /v2 or /v3 trees: they are
 * alternate presentations of the same pages, not new destinations, and each ships its own
 * sitemap. This is the precedent V2 set and V3 follows — V1 is production and is read-only.)
 */
export const V3_SITEMAP_COLUMNS: SitemapColumn[] = SITEMAP_COLUMNS.map((column) => ({
  ...column,
  href: toV3(column.href),
  groups: column.groups.map((group) => ({
    ...group,
    href: group.href ? toV3(group.href) : undefined,
    links: group.links.map((link) => ({ ...link, href: toV3(link.href) })),
  })),
}));
