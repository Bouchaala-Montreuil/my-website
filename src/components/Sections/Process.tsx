import type { Content } from "@/content/types";
import { SectionHead } from "../SectionHead";

export function Process({ c }: { c: Content }) {
  return (
    <section className="section on-ink" id="processus" aria-labelledby="processus-titre">
      <div className="wrap">
        <SectionHead head={c.process.head} id="processus-titre" />

        <ol className="steps mt-4" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {c.process.steps.map((step, index) => (
            <li className="step" key={step.title}>
              <div className="step__head">
                <span className="step__num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="step__when">{step.when}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <p className="step__todo">{step.todo}</p>
            </li>
          ))}
        </ol>

        <p className="mt-4" style={{ color: "rgba(244,236,220,.72)", fontSize: ".875rem", maxWidth: "62ch" }}>
          {c.process.footnote}
        </p>
      </div>
    </section>
  );
}
