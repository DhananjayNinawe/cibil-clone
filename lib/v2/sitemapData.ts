import { SITEMAP_COLUMNS, type SitemapColumn } from "@/lib/sitemapData";
import { toV2 } from "@/lib/v2/routes";

/**
 * V2's sitemap, derived from V1's rather than hand-copied.
 *
 * V1 already guarantees two invariants (AGENTS.md): every route under app/ appears here,
 * and every href resolves. Because /v2 mirrors the route tree exactly, mapping each href
 * through `toV2()` carries both invariants across for free — V2 cannot grow an orphan or a
 * dead link unless V1 has one. Re-typing the tree by hand is what would let them drift.
 */
export const V2_SITEMAP_COLUMNS: SitemapColumn[] = SITEMAP_COLUMNS.map((column) => ({
  ...column,
  href: toV2(column.href),
  groups: column.groups.map((group) => ({
    ...group,
    href: group.href ? toV2(group.href) : undefined,
    links: group.links.map((link) => ({ ...link, href: toV2(link.href) })),
  })),
}));
