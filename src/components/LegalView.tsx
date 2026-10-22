import type { Content, LegalBlock, LegalPage } from "@/content/types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CONTACT_EMAIL } from "@/config";
import { LEGAL_IDENTITY } from "@/legal-identity";
import { Split } from "./Split";

/**
 * Fills {{token}} from the publisher's identity file.
 * Returns null when a value is still unpublished: the caller then drops the
 * whole line, so the page never shows a placeholder to a visitor.
 */
function fill(text: string): string | null {
  let missing = false;
  const out = text.replace(/\{\{([^}]+)\}\}/g, (_match, token: string) => {
    const value = LEGAL_IDENTITY[token.trim()];
    if (!value) {
      missing = true;
      return "";
    }
    return value;
  });
  return missing ? null : out;
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    const text = fill(block.text);
    return text ? <p>{text}</p> : null;
  }
  if (block.type === "h3") return <h3>{block.text}</h3>;
  if (block.type === "note") {
    const text = fill(block.text);
    return text ? <p style={{ fontSize: ".8125rem", color: "var(--muted)" }}>{text}</p> : null;
  }
  const items = block.items
    .map((item) => fill(item))
    .filter((item): item is string => Boolean(item));
  if (items.length === 0) return null;
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
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
            <Split as="h1" className="legal__title" text={page.title} mode="load" step={12} />
            <p className="legal__meta">Dernière mise à jour : {page.updated}</p>
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
