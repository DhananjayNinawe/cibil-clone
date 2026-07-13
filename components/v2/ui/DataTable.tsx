import type { ReactNode } from "react";

interface DataTableProps {
  /** Pre-translated column headers. */
  columns: ReactNode[];
  rows: ReactNode[][];
  /** Pre-translated accessible caption. Visually hidden but announced. */
  caption?: string;
  className?: string;
}

/**
 * Tabular data (nodal officers, suit-filed cases, RBI notifications).
 *
 * The table scrolls inside its own container instead of pushing the page sideways, and the
 * container is focusable so a keyboard user can actually reach that scroll region.
 */
export default function DataTable({ columns, rows, caption, className = "" }: DataTableProps) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={caption}
      className={`v2-focus overflow-x-auto rounded-[var(--v2-r-lg)] border border-[var(--v2-line)] bg-[var(--v2-surface)] backdrop-blur-md ${className}`}
    >
      <table className="w-full border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-[var(--v2-line-2)]">
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v2-cyan)]"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-[var(--v2-line)] transition-colors last:border-0 hover:bg-[rgba(0,176,240,0.05)]"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-5 py-4 align-top text-[var(--v2-text-2)] [&>strong]:text-[var(--v2-text)]"
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
