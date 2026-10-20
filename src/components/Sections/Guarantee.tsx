import type { Content } from "@/content/types";
import { SectionHead } from "../SectionHead";
import { ArrowRight, SealIcon } from "../Icons";

export function Guarantee({ c }: { c: Content }) {
  return (
    <section className="section" id="previsualisation" aria-labelledby="previsualisation-titre">
      <div className="wrap">
        <SectionHead head={c.guarantee.head} id="previsualisation-titre" />

        <div className="guarantee mt-4">
          <div className="guarantee__seal">
            <SealIcon />
            <p>{c.guarantee.sealTitle}</p>
            <small>{c.guarantee.sealNote}</small>
          </div>

          <div>
            <ol className="timeline">
              {c.guarantee.steps.map((step) => (
                <li key={step.when + step.body}>
                  <span className="timeline__when">{step.when}</span>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <p style={{ color: "var(--muted)", fontSize: ".8125rem", marginTop: "1rem", maxWidth: "60ch" }}>
              {c.guarantee.foot}
            </p>
            <a className="link-arrow mt-3" href="#dossier">
              {c.guarantee.cta}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
