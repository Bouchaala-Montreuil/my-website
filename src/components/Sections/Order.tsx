import type { Content } from "@/content/types";
import { ContactJourney } from "../ContactJourney";

/**
 * The home page's dossier: same document masthead as the contact page, so the
 * brief reads as one artefact wherever it appears.
 */
export function Order({ c }: { c: Content }) {
  return (
    <section className="section brief-sheet" id="dossier" aria-labelledby="dossier-titre">
      <div className="wrap dossier dossier--journey">
        <div className="dossier__side">
          <p className="doc-section__label">
            <b aria-hidden="true">{c.order.head.num}</b>
            <span>{c.order.head.label}</span>
          </p>
          <h2 id="dossier-titre" className="dossier__title">
            {c.order.head.title}
          </h2>
          <div className="dossier__brief">
            <p>{c.order.head.note ?? c.order.sideBody}</p>
            <p className="b-side-note">
              <span className="b-mono">{c.order.sideTitle}</span>
              <span>{c.order.sideBody}</span>
            </p>
            <ul className="dossier__list">
              {c.order.bullets.map((bullet) => (
                <li key={bullet}>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ContactJourney c={c} />
      </div>
    </section>
  );
}
