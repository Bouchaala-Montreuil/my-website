import type { Content, LegalBlock, LegalPage } from "@/content/types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CONTACT_EMAIL } from "@/config";

/** Renders a string where {{token}} marks a field only the publisher can supply. */
function WithPlaceholders({ text }: { text: string }) {
  const parts = text.split(/(\{\{[^}]+\}\})/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\{\{([^}]+)\}\}$/);
        if (match) {
          return (
            <span className="todo" key={`${part}-${index}`}>
              {match[1]}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return (
      <p>
        <WithPlaceholders text={block.text} />
      </p>
    );
  }
  if (block.type === "h3") return <h3>{block.text}</h3>;
  if (block.type === "note") {
    return (
      <p style={{ fontSize: ".8125rem", color: "var(--muted)" }}>
        <WithPlaceholders text={block.text} />
      </p>
    );
  }
  return (
    <ul>
      {block.items.map((item) => (
        <li key={item}>
          <WithPlaceholders text={item} />
        </li>
      ))}
    </ul>
  );
}

export function LegalView({
  page,
  c,
  locale,
  currentPath,
}: {
  page: LegalPage;
  c: Content;
  locale: "fr";
  currentPath: string;
}) {
  return (
    <>
      <Header c={c} locale={locale} currentPath={currentPath} />
      <main id="contenu">
        <div className="wrap legal">
          <div className="legal__head">
            <p className="label" style={{ color: "var(--coral-deep)" }}>
              Feekza — document contractuel
            </p>
            <h1>{page.title}</h1>
            <p className="legal__meta">Dernière mise à jour : {page.updated}</p>
          </div>

          <div className="legal__notice" role="note">
            <strong>{page.notice.title}</strong>
            {page.notice.body}
          </div>

          <div className="legal__layout">
            <nav className="legal__toc" aria-label={page.tocLabel}>
              <p>{page.tocLabel}</p>
              <ol>
                {page.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="legal__body">
              {page.sections.map((section) => (
                <section key={section.id} aria-labelledby={section.id}>
                  <h2 id={section.id}>{section.heading}</h2>
                  {section.blocks.map((block, index) => (
                    <Block block={block} key={`${section.id}-${index}`} />
                  ))}
                </section>
              ))}

              <p style={{ marginTop: "2rem" }}>
                Une question sur ce document ?{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>

              <div style={{ marginTop: "2rem", borderTop: "1px solid var(--rule)", paddingTop: "1rem" }}>
                <p className="label" style={{ color: "var(--muted)" }}>
                  {page.otherPagesTitle}
                </p>
                <ul style={{ paddingInlineStart: "1.1rem", marginTop: ".5rem" }}>
                  {page.otherPages.map((other) => (
                    <li key={other.href}>
                      <a href={other.href}>{other.label}</a>
                    </li>
                  ))}
                  <li>
                    <a href="/">{page.backHome}</a>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer c={c} locale={locale} linkPrefix="/" />
    </>
  );
}
