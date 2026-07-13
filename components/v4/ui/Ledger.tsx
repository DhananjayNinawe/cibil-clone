"use client";

import type { ReactNode } from "react";

/**
 * The table.
 *
 * A real `<table>` with a real `<caption>`, `<th scope>` on every header, and the whole thing
 * wrapped in a focusable scroll container. That last part is the one everybody misses: a table
 * that overflows horizontally inside a `div` with `overflow-x: auto` cannot be scrolled by a
 * keyboard user at all unless the container is focusable, which is why it carries `tabIndex={0}`
 * and its own accessible name (WCAG 2.1.1).
 *
 * Numeric columns are right-aligned and set in tabular figures, because a column of numbers that
 * does not line up on its decimal point is a column you cannot compare down.
 */

export interface Column<Row> {
  key: string;
  header: string;
  /** Right-aligned, mono, tabular. Use for money, scores, dates, counts. */
  numeric?: boolean;
  render: (row: Row) => ReactNode;
}

export function Ledger<Row>({
  caption,
  columns,
  rows,
  rowKey,
  className = "",
}: {
  /** Names the table for a screen reader. Visually hidden by default — pass `showCaption`. */
  caption: string;
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row, index: number) => string;
  className?: string;
}) {
  return (
    <div
      className={`v4-scroll-x v4-plane-flat ${className}`}
      tabIndex={0}
      role="group"
      aria-label={caption}
    >
      <table className="w-full border-collapse text-left">
        <caption className="v4-sr">{caption}</caption>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`v4-label whitespace-nowrap border-b border-[var(--v4-edge-2)] px-5 py-4 ${
                  col.numeric ? "text-right" : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={rowKey(row, i)}
              className="border-b border-[var(--v4-edge)] last:border-b-0 hover:bg-[var(--v4-surface-2)]"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-5 py-4 align-top text-[0.9375rem] text-[var(--v4-fg-2)] ${
                    col.numeric ? "v4-num text-right" : ""
                  }`}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
