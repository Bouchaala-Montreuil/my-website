import type { Content } from "@/content/types";
import { SectionHead } from "../SectionHead";
import { ArrowRight, Check } from "../Icons";
import { Amount } from "../Amount";

export function Price({ c }: { c: Content }) {
  return (
    <section className="section" id="prix" aria-labelledby="prix-titre">
      <div className="wrap">
        <SectionHead head={c.price.head} id="prix-titre" />

        <div className="price-grid mt-4">
          <div className="price-card">
            <div className="price-card__top">
              <h3 className="price-card__name">{c.price.cardName}</h3>
              <span className="tag tag--coral">{c.price.cardTag}</span>
            </div>

            <p className="price-card__amount">
              <strong><Amount value={c.price.amount} /></strong>
              <span>{c.price.unit}</span>
              <small>{c.price.amountNote}</small>
            </p>

            <ul>
              {c.price.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} />
                  {feature}
                </li>
              ))}
            </ul>

            <a className="btn btn--coral btn--wide" href="#dossier">
              {c.price.cta}
              <ArrowRight />
            </a>
            <p className="price-card__fine">{c.price.fine}</p>
          </div>

          <div className="price-side">
            <h3>{c.price.sideTitle}</h3>
            <p>{c.price.sideBody}</p>

            <div className="math">
              {c.price.math.map((row) => (
                <div className="math__row" key={row.label}>
                  <span>{row.label}</span>
                  <b>{row.value}</b>
                </div>
              ))}
              <div className="math__row math__row--total">
                <span>{c.price.mathTotal.label}</span>
                <b>{c.price.mathTotal.value}</b>
              </div>
            </div>

            <p style={{ marginBottom: ".6rem" }}>{c.price.mathFoot}</p>
            <p style={{ marginBottom: 0 }}>{c.price.ownership}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
