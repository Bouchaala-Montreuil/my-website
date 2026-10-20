/**
 * Renders a price as "figure + currency sign" with the currency sign set in the
 * body face. Fraunces draws the euro sign with rules that run into the digits at
 * display sizes, so the sign is deliberately smaller and set in Instrument Sans.
 */
export function Amount({ value }: { value: string }) {
  // Handles "195 €" and "€ 195"; falls back to plain text for anything else.
  const match = value.match(/^([€$£])?\s?([\d\s.,]+)\s?([€$£])?$/);
  if (!match) return <>{value}</>;

  const [, leading, digits, trailing] = match;
  if (!digits.trim()) return <>{value}</>;

  return (
    <>
      {leading && <span className="amount__cur">{leading}</span>}
      <span className="amount__num">{digits.trim()}</span>
      {trailing && (
        <>
          {" "}
          <span className="amount__cur">{trailing}</span>
        </>
      )}
    </>
  );
}
