import { SectionHead } from "../SectionHead";
import { ArrowRight } from "../Icons";
import { homePromo } from "@/content/services.fr";

export function PromoServices() {
  return (
    <section className="section" id="services" aria-labelledby="services-titre">
      <div className="wrap">
        <SectionHead head={homePromo.head} id="services-titre" />

        <ul className="svc-rows">
          {homePromo.items.map((item) => (
            <li key={item.href} className="svc-row">
              <a href={item.href}>
                <span className="svc-row__index" aria-hidden="true">
                  {item.index}
                </span>
                <span className="svc-row__title">
                  {item.title}
                  <span className="svc-row__tag">{item.tag}</span>
                </span>
                <span className="svc-row__body">{item.body}</span>
                <span className="svc-row__arrow" aria-hidden="true">
                  <ArrowRight />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
