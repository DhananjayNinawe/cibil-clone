import type { ReactNode } from "react";

interface LedgerProps {
  /** Pre-translated column headings. */
  columns: string[];
  rows: ReactNode[][];
  /** Pre-translated. Required: a table without a caption is unusable with a screen reader. */
  caption: string;
  /** Show the caption. Off by default — most tables are already introduced by a heading. */
  showCaption?: boolean;
  /** Right-align the trailing columns, which are almost always figures. */
  numericFrom?: number;
  className?: string;
}

/**
 * A ledger table.
 *
 * Horizontal rules only — no vertical lines, no zebra fill, no outer box. That is how financial
 * tables have been set for two centuries, and it is *why* they are readable at this density:
 * the eye tracks along the row without a grid fighting it.
 *
 * Wrapped in its own `overflow-x-auto` so a wide table scrolls inside itself instead of pushing
 * the page sideways on a phone.
 */
export default function Ledger({
  columns,
  rows,
  caption,
  showCaption = false,
  numericFrom,
  className = "",
}: LedgerProps) {
  const isNumeric = (i: number) => numericFrom !== undefined && i >= numericFrom;

  return (
    <div className={`-mx-[var(--v3-gutter)] overflow-x-auto px-[var(--v3-gutter)] ${className}`}>
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <caption
          className={
            showCaption
              ? "v3-caption mb-4 text-left"
              : "sr-only"
          }
        >
          {caption}
        </caption>

        <thead>
          <tr>
            {columns.map((column, i) => (
              <th
                key={i}
                scope="col"
                className={`v3-folio border-b border-[var(--v3-line-3)] pb-3 pr-6 font-medium ${
                  isNumeric(i) ? "text-right" : ""
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="v3-row border-b border-[var(--v3-line)]">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`py-4 pr-6 align-top text-sm text-[var(--v3-fg-2)] ${
                    isNumeric(c) ? "v3-num text-right" : ""
                  } ${c === 0 ? "font-medium text-[var(--v3-fg)]" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
