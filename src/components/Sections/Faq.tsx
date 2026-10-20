import type { Content } from "@/content/types";
import { SectionHead } from "../SectionHead";
import { CONTACT_EMAIL } from "@/config";

export function Faq({ c }: { c: Content }) {
  return (
    <section className="section" id="questions" aria-labelledby="questions-titre">
      <div className="wrap">
        <SectionHead head={c.faq.head} id="questions-titre" />

        <div className="faq mt-4">
          <div className="faq__aside">
            <p>{c.faq.aside}</p>
            <a className="link-arrow" href={`mailto:${CONTACT_EMAIL}`}>
              {c.faq.link}
            </a>
          </div>

          <div>
            {c.faq.items.map((item) => (
              <details key={item.q}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq__sign" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="faq__answer">
                  {item.a.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
