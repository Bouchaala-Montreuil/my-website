import type { Content } from "@/content/types";
import { ArrowRight, Check } from "../Icons";
import { Amount } from "../Amount";
import { Split } from "../Split";

export function Hero({ c }: { c: Content }) {
  return (
    <section className="hero" aria-labelledby="titre-accueil">
      <div className="wrap">
        <div className="hero__top">
          <p className="hero__eyebrow">
            <span className="hero__rule" aria-hidden="true" />
            {c.hero.badge}
          </p>
          <p className="hero__tag">{c.hero.tag}</p>
        </div>

        <h1 className="hero__title" id="titre-accueil">
          <Split text={c.hero.titleBefore} mode="load" step={18} />{" "}
          <em>
            <Split text={c.hero.titleAccent} mode="load" step={18} offset={120} />
          </em>
          {c.hero.titleAfter && !/^[.,;:!?…]/.test(c.hero.titleAfter) ? " " : null}
          <Split text={c.hero.titleAfter} mode="load" step={18} offset={240} />
        </h1>

        <div className="hero__bottom">
          <div className="hero__intro">
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

          <aside className="hero__rail" aria-label={c.hero.specTitle}>
            <p className="hero__rail-label">
              {c.hero.specTitle}
              <span>{c.hero.specRef}</span>
            </p>
            <p className="hero__rail-price">
              <Amount value={c.hero.price} />
              <span className="hero__rail-unit">{c.hero.priceUnit}</span>
            </p>
            <ul>
              {c.hero.specRows.slice(0, 3).map((row) => (
                <li key={row.k}>
                  <span>{row.k}</span>
                  <b>{row.v}</b>
                </li>
              ))}
            </ul>
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
