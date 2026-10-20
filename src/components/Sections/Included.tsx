import type { Content } from "@/content/types";
import { SectionHead } from "../SectionHead";

export function Included({ c }: { c: Content }) {
  return (
    <section className="section" id="offre" aria-labelledby="offre-titre">
      <div className="wrap">
        <SectionHead head={c.included.head} id="offre-titre" />

        <div className="grid-3 mt-4">
          {c.included.items.map((item, index) => (
            <article
              className="item"
              key={item.title}
            >
              <span className="item__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {item.note ? <span className="item__note">{item.note}</span> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
