import type { Content } from "@/content/types";
import { SectionHead } from "../SectionHead";

export function Scope({ c }: { c: Content }) {
  return (
    <section className="section" id="perimetre" aria-labelledby="perimetre-titre">
      <div className="wrap">
        <SectionHead head={c.scope.head} id="perimetre-titre" />

        <div className="scope mt-4">
          <div className="scope__col scope__col--in">
            <h3>
              <span aria-hidden="true">✓</span>
              {c.scope.inTitle}
            </h3>
            <ul>
              {c.scope.inItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="scope__col scope__col--out">
            <h3>
              <span aria-hidden="true">+</span>
              {c.scope.outTitle}
            </h3>
            <ul>
              {c.scope.outItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="scope__foot">{c.scope.foot}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
