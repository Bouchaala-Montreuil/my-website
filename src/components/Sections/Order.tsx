import type { Content } from "@/content/types";
import { SectionHead } from "../SectionHead";
import { ContactJourney } from "../ContactJourney";
import { Check } from "../Icons";
import { CONTACT_EMAIL } from "@/config";

export function Order({ c }: { c: Content }) {
  return (
    <section className="section on-ink" id="dossier" aria-labelledby="dossier-titre">
      <div className="wrap">
        <SectionHead head={c.order.head} id="dossier-titre" />

        <div className="dossier dossier--journey mt-4">
          <div className="dossier__side">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                margin: "0 0 .7rem",
                lineHeight: 1.2,
              }}
            >
              {c.order.sideTitle}
            </h3>
            <p>{c.order.sideBody}</p>

            <ul className="dossier__list">
              {c.order.bullets.map((bullet) => (
                <li key={bullet}>
                  <Check size={15} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <p style={{ marginTop: "1.25rem" }}>
              <a className="link-arrow" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <ContactJourney c={c} />
        </div>
      </div>
    </section>
  );
}
