/**
 * Renders `text` with every occurrence of a query token emphasised, so a reader can see why a
 * result matched. Tokens are compared case-insensitively but the original casing is preserved.
 */
export default function HighlightedText({ text, query }: { text: string; query: string }) {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    // Longest first: with "credit report" typed, "credit report" wins over the bare "credit".
    .sort((a, b) => b.length - a.length);

  if (tokens.length === 0) return <>{text}</>;

  const haystack = text.toLowerCase();
  const matched = new Array<boolean>(text.length).fill(false);

  for (const token of tokens) {
    let from = haystack.indexOf(token);
    while (from !== -1) {
      for (let i = from; i < from + token.length; i++) matched[i] = true;
      from = haystack.indexOf(token, from + token.length);
    }
  }

  const runs: { text: string; hit: boolean }[] = [];
  for (let i = 0; i < text.length; i++) {
    const last = runs[runs.length - 1];
    if (last && last.hit === matched[i]) last.text += text[i];
    else runs.push({ text: text[i], hit: matched[i] });
  }

  return (
    <>
      {runs.map((run, index) =>
        run.hit ? (
          <mark key={index} className="bg-transparent font-bold text-inherit">
            {run.text}
          </mark>
        ) : (
          <span key={index}>{run.text}</span>
        ),
      )}
    </>
  );
}
