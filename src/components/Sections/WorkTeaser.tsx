import { SectionHead } from "../SectionHead";
import { ArrowRight } from "../Icons";
import { homeWork } from "@/content/services.fr";

export function WorkTeaser() {
  return (
    <section className="section section--tight" id="travaux" aria-labelledby="travaux-titre">
      <div className="wrap">
        <SectionHead head={homeWork.head} id="travaux-titre" />

        <div className="work-teaser">
          <div className="work-teaser__main">
            <h3>{homeWork.title}</h3>
            <p>{homeWork.body}</p>
            <a className="link-arrow" href={homeWork.cta.href}>
              {homeWork.cta.label}
              <ArrowRight />
            </a>
          </div>
          <dl className="work-teaser__metrics">
            {homeWork.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
