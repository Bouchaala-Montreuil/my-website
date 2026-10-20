import type { Content, PageBlock, PageDoc } from "@/content/types";
import { content } from "@/content";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ContactJourney } from "./ContactJourney";
import { ArrowRight, Check } from "./Icons";
import { Split } from "./Split";
import { DitherImage } from "./DitherImage";

function Blocks({ blocks }: { blocks: PageBlock[] }) {
  return (
    <div className="doc-blocks">
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p className="doc-p" key={index}>
              {block.text}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul className="doc-list" key={index}>
              {block.items.map((item) => (
                <li key={item}>
                  <Check size={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "steps") {
          return (
            <ol className="doc-steps" key={index}>
              {block.items.map((item, stepIndex) => (
                <li key={item.title}>
                  <span className="doc-steps__num" aria-hidden="true">
                    {String(stepIndex + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "metrics") {
          return (
            <ul className="doc-metrics" key={index}>
              {block.items.map((item) => (
                <li key={item.label}>
                  <span className="doc-metrics__value">{item.value}</span>
                  <span className="doc-metrics__label">{item.label}</span>
                  {item.note && <span className="doc-metrics__note">{item.note}</span>}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "note") {
          return (
            <p className="doc-note" key={index}>
              {block.text}
            </p>
          );
        }
        if (block.type === "gallery") {
          return (
            <div
              className={`doc-gallery${block.layout === "single" ? " doc-gallery--single" : ""}`}
              key={index}
            >
              {block.items.map((item) => (
                <figure key={item.src} data-mask>
                  {block.layout === "single" ? (
                    <DitherImage
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  )}
                  {item.caption && <figcaption>{item.caption}</figcaption>}
                </figure>
              ))}
            </div>
          );
        }
        if (block.type === "links") {
          return (
            <ul className="doc-links" key={index}>
              {block.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} rel="noopener noreferrer" target="_blank">
                    {item.label}
                    <ArrowRight />
                    <span className="sr-only"> (nouvel onglet)</span>
                  </a>
                  {item.note && <p>{item.note}</p>}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <blockquote className="doc-quote" key={index}>
            <p>{block.text}</p>
            <footer>{block.source}</footer>
          </blockquote>
        );
      })}
    </div>
  );
}

export function PageView({
  page,
  currentPath,
  c = content.fr,
}: {
  page: PageDoc;
  currentPath: string;
  c?: Content;
}) {
  const hasForm = Boolean(page.formService);

  return (
    <>
      <Header c={c} locale="fr" currentPath={currentPath} inPageAnchors />
      <main id="contenu">
        <header className="doc-hero">
          <div className="wrap doc-hero__grid">
            <div>
              <p className="label doc-hero__eyebrow">{page.eyebrow}</p>
              <Split as="h1" className="doc-hero__title" text={page.h1} mode="load" step={14} />
              <p className="doc-hero__lead">{page.lead}</p>
              <a className="btn btn--coral" href={page.primaryCta.href}>
                {page.primaryCta.label}
                <ArrowRight />
              </a>
              <p className="doc-hero__note">{page.primaryCta.note}</p>
            </div>

            <aside className="doc-facts" aria-labelledby="faits">
              <div className="doc-facts__head">
                <p id="faits">{page.factsTitle}</p>
                <span aria-hidden="true">✦</span>
              </div>
              <dl>
                {page.facts.map((fact) => (
                  <div key={fact.k}>
                    <dt>{fact.k}</dt>
                    <dd>{fact.v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </header>

        <div className="doc-body">
          {page.sections.map((section) => (
            <section className="doc-section" key={section.id} aria-labelledby={section.id} data-reveal>
              <div className="wrap doc-section__grid">
                <p className="doc-section__label">
                  <b aria-hidden="true">{section.num}</b>
                  <span>{section.label}</span>
                </p>
                <div>
                  <h2 id={section.id}>{section.title}</h2>
                  {section.note && <p className="doc-section__note">{section.note}</p>}
                  <Blocks blocks={section.blocks} />
                </div>
              </div>
            </section>
          ))}
        </div>

        {page.limits && page.limits.length > 0 && (
        <section className="section on-ink" id="limites" aria-labelledby="limites-titre">
          <div className="wrap">
            <div className="doc-limits__head">
              <p className="doc-section__label doc-section__label--light">
                <b aria-hidden="true">!</b>
                <span>Limites</span>
              </p>
              <h2 id="limites-titre">{page.limitsTitle ?? "Limites"}</h2>
              <p>{page.limitsNote}</p>
            </div>
            <ul className="doc-limits">
              {page.limits.map((limit) => (
                <li key={limit.title}>
                  <h3>{limit.title}</h3>
                  <p>{limit.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        )}

        {page.formService && (
          <div className="doc-midcta">
            <div className="wrap doc-midcta__inner">
              <p>
                <strong>Le périmètre vous convient ?</strong> Décrivez votre activité en deux
                minutes ; nous répondons sous un jour ouvré.
              </p>
              <a className="btn btn--coral" href="#dossier">
                Ouvrir un dossier
                <ArrowRight />
              </a>
            </div>
          </div>
        )}

        {page.faq && page.faq.length > 0 && (
        <section className="section" aria-labelledby="faq-page-titre">
          <div className="wrap doc-faq__grid">
            <div>
              <p className="doc-section__label">
                <b aria-hidden="true">?</b>
                <span>Questions</span>
              </p>
              <h2 id="faq-page-titre">{page.faqTitle ?? "Questions fréquentes"}</h2>
              <p className="doc-section__note">
                Une question qui n’est pas là ? Écrivez-nous, nous répondons sous un jour ouvré.
              </p>
            </div>
            <div className="doc-faq">
              {(page.faq ?? []).map((item) => (
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
        </section>
        )}

        {hasForm ? (
          <section className="section on-ink" id="dossier" aria-labelledby="dossier-titre">
            <div className="wrap dossier dossier--journey">
              <div className="dossier__side">
                <p className="doc-section__label doc-section__label--light">
                  <b aria-hidden="true">→</b>
                  <span>Dossier</span>
                </p>
                <h2 id="dossier-titre" className="dossier__title">
                  {page.formTitle}
                </h2>
                <p>{page.formLead}</p>
                <ul className="dossier__list">
                  <li>
                    <Check size={15} />
                    <span>Aucun paiement n’est demandé pour envoyer le dossier.</span>
                  </li>
                  <li>
                    <Check size={15} />
                    <span>Vous recevez un périmètre écrit avant de décider.</span>
                  </li>
                  <li>
                    <Check size={15} />
                    <span>Vos réponses restent modifiables jusqu’à l’envoi.</span>
                  </li>
                </ul>
              </div>
              <ContactJourney c={c} service={page.formService} />
            </div>
          </section>
        ) : (
          <section className="section on-ink" id="dossier" aria-labelledby="dossier-titre">
            <div className="wrap doc-cta">
              <div>
                <h2 id="dossier-titre">{page.formTitle ?? "Un projet en tête ?"}</h2>
                <p>
                  {page.formLead ??
                    "Décrivez votre activité en deux minutes. Vous recevez un périmètre écrit avant tout paiement."}
                </p>
              </div>
              <a className="btn btn--coral" href="/#dossier">
                Ouvrir un dossier
                <ArrowRight />
              </a>
            </div>
          </section>
        )}

        {page.related.length > 0 && (
        <section className="section section--tight" aria-labelledby="related-titre">
          <div className="wrap">
            <h2 id="related-titre" className="label" style={{ color: "var(--muted)" }}>
              {page.relatedTitle}
            </h2>
            <ul className="doc-related">
              {page.related.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <span>{item.label}</span>
                    <ArrowRight />
                  </a>
                  <p>{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        )}
      </main>
      <Footer c={c} locale="fr" linkPrefix="/" />
    </>
  );
}
