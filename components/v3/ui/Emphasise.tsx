import type { ReactNode } from "react";

interface EmphasiseProps {
  /** Pre-translated headline. */
  text: string;
  /** Pre-translated word or phrase inside it to set in italic. */
  word?: string;
}

/**
 * The italic emphasis device, applied to a headline that arrives as one translated string.
 *
 * V3 emphasises with an *italic* word rather than a coloured one, and the front page can do that
 * structurally because its headline is split across three catalog keys. Most of the site's
 * headlines are a single key — "Monitor Your Company's Credit Health with CIBIL Rank" — and a
 * translated sentence cannot be sliced by word position without breaking in Hindi, Marathi and
 * Tamil, where the word order is different.
 *
 * So the emphasis is located by *content*: the caller names a phrase that is itself a catalog key
 * ("CIBIL Rank", "CIBIL Alerts", "Score Simulator"), and the phrase is found in the headline in
 * whatever position that locale puts it. Matching is case-insensitive, because V1's catalog writes
 * the same phrase as "CIBIL RANK" in one key and "CIBIL Rank" in another; the headline's own
 * casing is preserved, since the slice comes from the headline.
 *
 * If the phrase is not in the headline — a locale phrased it differently, a key was reworded —
 * the headline renders plain. A missing italic is invisible; a mangled sentence is not.
 *
 * (`.v3-em` resolves to italic in Latin and to the accent colour in Devanagari and Tamil, which
 * have no italic tradition. See v3.css.)
 */
export default function Emphasise({ text, word }: EmphasiseProps): ReactNode {
  const at = word ? text.toLowerCase().indexOf(word.toLowerCase()) : -1;
  if (at < 0 || !word) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <span className="v3-em">{text.slice(at, at + word.length)}</span>
      {text.slice(at + word.length)}
    </>
  );
}
