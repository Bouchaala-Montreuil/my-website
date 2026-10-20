import type { Content } from "@/content/types";
import { SectionHead } from "../SectionHead";
import { ArrowRight } from "../Icons";

export function Proof({ c }: { c: Content }) {
  return (
    <section className="section on-ink" id="preuves" aria-labelledby="preuves-titre">
      <div className="wrap">
        <SectionHead head={c.proof.head} id="preuves-titre" />

        <div className="proof mt-4">
          <div className="proof__statement">
            <p>{c.proof.statement}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.6, color: "rgba(244,236,220,.78)" }}>
              {c.proof.body}
            </p>
          </div>

          <div>
            <ul>
              {c.proof.points.map((point, index) => (
                <li key={point.strong}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p style={{ margin: 0 }}>
                    <strong>{point.strong}</strong> {point.body}
                  </p>
                </li>
              ))}
            </ul>
            <a className="link-arrow mt-4" href="#dossier">
              {c.proof.cta}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
