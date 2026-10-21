import type { Content } from "@/content/types";
import { ContactJourney } from "../ContactJourney";

/**
 * The home page ends on the brief itself. The cover carries the document's
 * identity and the offer, so the spread can stand alone in the page flow.
 */
export function Order({ c }: { c: Content }) {
  return (
    <section className="section br-section" id="dossier" aria-labelledby="dossier-titre">
      <div className="wrap">
        <ContactJourney c={c} headingId="dossier-titre" />
      </div>
    </section>
  );
}
