import type { Content } from "@/content/types";
import { ArrowRight, Check } from "../Icons";
import { Amount } from "../Amount";

export function Hero({ c }: { c: Content }) {
  return (
    <section className="hero" aria-labelledby="titre-accueil">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <div className="hero__eyebrow">
              <span className="tag tag--coral">
                <span className="tag__dot" aria-hidden="true" />
                {c.hero.badge}
              </span>
              <span className="tag">{c.hero.tag}</span>
            </div>

            <h1 id="titre-accueil">
              {c.hero.titleBefore} <em>{c.hero.titleAccent}</em>
              {c.hero.titleAfter}
            </h1>

            <p className="hero__lead">{c.hero.lead}</p>

            <div className="hero__cta">
              <a className="btn btn--coral" href="#dossier">
                {c.hero.ctaPrimary}
                <ArrowRight />
              </a>
              <a className="btn btn--ghost" href="#offre">
                {c.hero.ctaSecondary}
              </a>
            </div>
            <p className="hero__cta-note">
              <Check size={14} />
              {c.hero.ctaNote}
            </p>
          </div>

          <aside className="spec" aria-labelledby="fiche-offre">
            <div className="spec__head">
              <p className="spec__title" id="fiche-offre">
                {c.hero.specTitle}
              </p>
              <p className="spec__ref">{c.hero.specRef}</p>
            </div>

            <div className="spec__price">
              <strong><Amount value={c.hero.price} /></strong>
              <span>{c.hero.priceUnit}</span>
              <small>{c.hero.priceNote}</small>
            </div>

            <ul className="spec__rows">
              {c.hero.specRows.map((row) => (
                <li key={row.k}>
                  <span className="k">{row.k}</span>
                  <span className="v">
                    {row.v}
                    {row.note ? <em> {row.note}</em> : null}
                  </span>
                </li>
              ))}
            </ul>

            <a className="btn btn--coral" href="#dossier">
              {c.hero.specCta}
              <ArrowRight />
            </a>
            <p style={{ margin: ".7rem 0 0", textAlign: "center" }}>
              <span className="stamp">{c.hero.stamp}</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
