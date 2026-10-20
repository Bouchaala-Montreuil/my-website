/**
 * Brand loader — the F from the logo, lit and wiped in, then the lockup.
 *
 * The mark is the real brand asset (public/brand/feekza-f.webp), not a
 * redrawing: it is dropped on the same near-black it was drawn on and
 * screen-blended, so the glow sits in the field instead of in a box. A light
 * sweep travels through the shape via a CSS mask, the wordmark staggers, the
 * tagline opens its tracking, and the whole thing lifts to reveal the page.
 *
 * Shown once per session, never for reduced motion, skippable on first input
 * (see index.html and ClientApp.tsx). Pure CSS so it resolves even if the
 * bundle is slow; a safety keyframe takes it away regardless.
 */
export function BrandLoader() {
  return (
    <div className="brand-loader" aria-hidden="true">
      <div className="brand-loader__inner">
        <div className="brand-loader__mark">
          <img src="/brand/feekza-f.webp" alt="" width={360} height={381} decoding="async" />
          <span className="brand-loader__sheen" />
        </div>

        <p className="brand-loader__word">
          {"FEEKZA".split("").map((letter, index) => (
            <span key={`${letter}-${index}`} style={{ "--i": index } as React.CSSProperties}>
              {letter}
            </span>
          ))}
        </p>
        <p className="brand-loader__tag">Votre marketing</p>
      </div>
      <span className="brand-loader__bar" />
    </div>
  );
}
