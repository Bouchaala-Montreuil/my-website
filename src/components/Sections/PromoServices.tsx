import { SectionHead } from "../SectionHead";
import { ArrowRight } from "../Icons";
import { homePromo } from "@/content/services.fr";

export function PromoServices() {
  return (
    <section className="section" id="services" aria-labelledby="services-titre">
      <div className="wrap">
        <SectionHead head={homePromo.head} id="services-titre" />

        <ul className="promo-grid">
          {homePromo.items.map((item, index) => (
            <li key={item.href} className={index === 0 ? "promo promo--lead" : "promo"}>
              <p className="promo__index" aria-hidden="true">
                {item.index}
              </p>
              <p className="label promo__tag">{item.tag}</p>
              <h3>
                <a href={item.href}>{item.title}</a>
              </h3>
              <p className="promo__body">{item.body}</p>
              <a className="link-arrow" href={item.href}>
                {item.cta}
                <ArrowRight />
                <span className="sr-only"> — {item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
