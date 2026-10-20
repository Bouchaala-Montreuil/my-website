import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { buildHead, type HeadData } from "./lib/seo";
import { resolveRoute } from "./lib/routes";

export interface RenderedPage {
  html: string;
  head: HeadData;
}

export function renderPage(pathname: string): RenderedPage {
  const route = resolveRoute(pathname);
  const html = renderToString(
    <StrictMode>
      <App route={route} />
    </StrictMode>,
  );
  return { html, head: buildHead(route) };
}
