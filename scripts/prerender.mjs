/**
 * Static prerender: takes the Vite client build (dist/) plus the SSR bundle
 * (dist-ssr/), renders every route to HTML, inlines the stylesheet and writes
 * the deployable tree to dist/ and docs/ (GitHub Pages serves docs/).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const docs = path.join(root, "docs");
const SITE_URL = "https://feekza.com";

const { renderPage } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

// Inline the single CSS bundle to remove a render-blocking round trip.
const cssMatch = template.match(
  /<link rel="stylesheet"[^>]*href="\/?(assets\/[^"]+\.css)"[^>]*>/i,
);
let cssInline = "";
if (cssMatch) {
  cssInline = fs.readFileSync(path.join(dist, cssMatch[1]), "utf8");
}

const favicon = `
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />`;

const htmlLangAttributes = (head) =>
  ` lang="${head.htmlLang}" dir="${head.dir}"`;

/** Injects the built page into the Vite template. */
function buildHtml(routePath, html, head) {
  let out = template;

  out = out.replace(/<html[^>]*>/, `<html${htmlLangAttributes(head)}>`);
  out = out.replace("<!--seo-->", () =>
    [
      `<title>${escapeHtml(head.title)}</title>`,
      `<meta name="description" content="${escapeHtml(head.description)}" />`,
      `<link rel="canonical" href="${head.canonical}" />`,
      `<meta name="generator" content="Feekza static build" />`,
      head.extra,
      favicon.trim(),
      cssInline ? `<style>${cssInline}</style>` : "",
    ]
      .filter(Boolean)
      .join("\n    "),
  );
  out = out.replace(/<link rel="stylesheet"[^>]*>/i, "");
  out = out.replace("<!--app-html-->", () => html);

  // Hydration can wait: the page is pre-rendered, so let fonts and text win the
  // bandwidth race on slow connections instead of the JS bundle.
  out = out.replace(
    /<script type="module" crossorigin src=/g,
    '<script type="module" crossorigin fetchpriority="low" src=',
  );

  if (routePath === "/404/") {
    out = out.replace(
      /<meta name="robots"[^>]*>/,
      '<meta name="robots" content="noindex,follow" />',
    );
  }
  return out;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const routes = [
  "/",
  "/en/",
  "/ar/",
  "/creation-site-web/",
  "/referencement-seo/",
  "/marketing-digital/",
  "/realisations/",
  "/a-propos/",
  "/contact/",
  "/ressources/",
  "/ressources/combien-coute-un-site-vitrine/",
  "/ressources/checklist-avant-lancement/",
  "/mentions-legales/",
  "/confidentialite/",
  "/cgv/",
];

// Service and company pages outrank legal boilerplate in the sitemap.
const priorityFor = (route) => {
  if (route === "/") return "1.0";
  if (route === "/en/" || route === "/ar/") return "0.8";
  if (route === "/realisations/") return "0.8";
  if (route === "/creation-site-web/" || route === "/referencement-seo/" || route === "/marketing-digital/")
    return "0.9";
  if (route === "/a-propos/" || route === "/contact/") return "0.7";
  if (route === "/ressources/") return "0.6";
  if (route.startsWith("/ressources/")) return "0.5";
  return "0.3";
};

function writeFile(target, contents) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents);
}

for (const route of routes) {
  const { html, head } = renderPage(route);
  const page = buildHtml(route, html, head);
  const target =
    route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  writeFile(target, page);
  console.log(`prerendered ${route} → ${path.relative(root, target)} (${Math.round(page.length / 1024)} KB)`);
}

// 404 page
{
  const { html, head } = renderPage("/404/");
  const page = buildHtml("/404/", html, head);
  writeFile(path.join(dist, "404.html"), page);
}

// robots.txt
writeFile(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

// sitemap.xml with hreflang alternates
const urls = routes;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((route) => {
    const priority = priorityFor(route);
    const alternates =
      route === "/" || route === "/en/" || route === "/ar/"
        ? ["fr", "en", "ar"]
            .map(
              (locale) =>
                `    <xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${locale === "fr" ? "/" : `/${locale}/`}" />`,
            )
            .join("\n") +
          `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />\n`
        : "";
    return `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <lastmod>2026-10-20</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n${alternates}  </url>`;
  })
  .join("\n")}
</urlset>
`;
writeFile(path.join(dist, "sitemap.xml"), sitemap);

// Mirror to docs/ (GitHub Pages publishes docs/)
fs.mkdirSync(docs, { recursive: true });
const keep = new Set(["CNAME"]);
for (const entry of fs.readdirSync(docs)) {
  if (keep.has(entry)) continue;
  fs.rmSync(path.join(docs, entry), { recursive: true, force: true });
}
for (const entry of fs.readdirSync(dist)) {
  fs.cpSync(path.join(dist, entry), path.join(docs, entry), { recursive: true });
}
if (!fs.existsSync(path.join(docs, "CNAME"))) {
  fs.writeFileSync(path.join(docs, "CNAME"), "feekza.com\n");
}
writeFile(path.join(docs, ".nojekyll"), "");

console.log("copied build to docs/");
