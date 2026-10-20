import { App } from "./App";
import { resolveRoute } from "./lib/routes";

/** Resolves the route from the browser URL, then renders the shared app tree. */
export function ClientApp() {
  const route = resolveRoute(window.location.pathname);
  return <App route={route} />;
}
