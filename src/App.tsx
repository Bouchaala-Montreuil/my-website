import { content } from "@/content";
import type { Route } from "@/lib/routes";
import { Home } from "@/components/Home";
import { LegalView } from "@/components/LegalView";
import { PageView } from "@/components/PageView";
import { NotFoundView } from "@/components/NotFoundView";
import { BrandLoader } from "@/components/BrandLoader";

export function App({ route }: { route: Route }) {
  const skipLink =
    route.kind === "home" ? content[route.locale].skipLink : content.fr.skipLink;

  let view;
  if (route.kind === "home") {
    const c = content[route.locale];
    view = <Home c={c} locale={route.locale} currentPath={route.path} />;
  } else if (route.kind === "page") {
    view = <PageView page={route.page} currentPath={route.path} />;
  } else if (route.kind === "legal") {
    view = <LegalView page={route.page} c={content.fr} locale="fr" currentPath={route.path} />;
  } else {
    view = <NotFoundView currentPath={route.path} />;
  }

  return (
    <>
      <a className="skip-link" href="#contenu">
        {skipLink}
      </a>
      {view}
      <BrandLoader />
    </>
  );
}
