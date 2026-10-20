import type { Content } from "@/content/types";
import { ArrowRight, Check } from "../Icons";
import { Amount } from "../Amount";
import { Split } from "../Split";

export function Hero({ c }: { c: Content }) {
  return (
    <section className="hero" aria-labelledby="titre-accueil">
      <div className="wrap">
        <div className="hero__kicker">
          <span className="hero__rule" aria-hidden="true" />
          <span className="tag tag--bare">{c.hero.badge}</span>
          <span className="tag tag--bare tag--muted">{c.hero.tag}</span>
        </div>

        <h1 className="hero__title" id="titre-accueil">
          <Split text={c.hero.titleBefore} mode="load" step={18} />{" "}
          <em>
            <Split text={c.hero.titleAccent} mode="load" step={18} offset={120} />
          </em>
          {c.hero.titleAfter && !/^[.,;:!?…]/.test(c.hero.titleAfter) ? " " : null}
          <Split text={c.hero.titleAfter} mode="load" step={18} offset={240} />
        </h1>

        <div className="hero__body">
          <div className="hero__intro">
            <p className="hero__lead">{c.hero.lead}</p>

            <div className="hero__cta">
              <a className="btn btn--coral btn--sweep" href="#dossier">
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
              <strong>
                <Amount value={c.hero.price} />
              </strong>
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

            <a className="btn btn--coral btn--sweep" href="#dossier">
              {c.hero.specCta}
              <ArrowRight />
            </a>
            <p className="spec__stamp">
              <span className="stamp">{c.hero.stamp}</span>
            </p>
          </aside>
        </div>

        <dl className="hero__facts">
          {c.hero.specRows.slice(0, 4).map((row) => (
            <div key={row.k}>
              <dt>{row.k}</dt>
              <dd>{row.v}</dd>
            </div>
          ))}
          <div>
            <dt>{c.ticker[0]}</dt>
            <dd>
              <Amount value={c.hero.price} /> {c.hero.priceUnit}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
