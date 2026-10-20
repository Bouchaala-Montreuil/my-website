import { content } from "@/content";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function NotFoundView({ currentPath }: { currentPath: string }) {
  const c = content.fr;
  return (
    <>
      <Header c={c} locale="fr" currentPath={currentPath} />
      <main id="contenu">
        <div className="wrap notfound">
          <div>
            <p className="label" style={{ color: "var(--coral-deep)" }}>
              Erreur 404
            </p>
            <h1>{c.notFound.title}</h1>
            <p className="lead" style={{ margin: "0 auto 1.5rem", color: "var(--muted)" }}>
              {c.notFound.body}
            </p>
            <a className="btn btn--coral" href="/">
              {c.notFound.cta}
            </a>
          </div>
        </div>
      </main>
      <Footer c={c} locale="fr" linkPrefix="/" />
    </>
  );
}
