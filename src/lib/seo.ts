import { content, homePath, locales } from "@/content";
import type { Content } from "@/content/types";
import { SITE_URL, CONTACT_EMAIL, OFFER_AMOUNT_EUR, STRIPE_PAYMENT_LINK } from "@/config";
import type { Route } from "./routes";

const OG_IMAGE = `${SITE_URL}/og-feekza.png`;

function absolute(path: string): string {
  return `${SITE_URL}${path}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function alternates(): string {
  const links = locales.map(
    (locale) =>
      `<link rel="alternate" hreflang="${locale}" href="${absolute(homePath(locale))}" />`,
  );
  links.push(
    `<link rel="alternate" hreflang="x-default" href="${absolute(homePath("fr"))}" />`,
  );
  return links.join("\n    ");
}

function faqJsonLd(c: Content) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: c.htmlLang,
    mainEntity: c.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
    })),
  };
}

function homeJsonLd(c: Content, path: string) {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Feekza",
      url: SITE_URL,
      email: CONTACT_EMAIL,
      logo: `${SITE_URL}/logo-feekza.png`,
      image: OG_IMAGE,
      description:
        "Création et maintenance de sites web sur mesure pour indépendants et petites entreprises.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: absolute(path),
      name: "Feekza",
      inLanguage: c.htmlLang,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "Site web sur mesure, hébergé et maintenu",
      serviceType: "Création et maintenance de site internet",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "France" },
      availableLanguage: ["fr", "en", "ar"],
      offers: {
        "@type": "Offer",
        price: OFFER_AMOUNT_EUR,
        priceCurrency: "EUR",
        url: absolute(path),
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: OFFER_AMOUNT_EUR,
          priceCurrency: "EUR",
          valueAddedTaxIncluded: true,
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: "MON",
        },
      },
    },
    faqJsonLd(c),
  ];
  return { "@context": "https://schema.org", "@graph": graph };
}

function breadcrumb(path: string, label: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Feekza",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: absolute(path),
      },
    ],
  };
}

function pageJsonLd(route: Extract<Route, { kind: "page" }>) {
  const { page, path } = route;
  const isService = page.schemaType ? page.schemaType === "Service" : Boolean(page.formService);
  const graph: Record<string, unknown>[] = [
    {
      "@type": isService ? "Service" : "WebPage",
      "@id": `${absolute(path)}#page`,
      name: page.h1,
      description: page.metaDescription,
      url: absolute(path),
      inLanguage: "fr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      provider: isService ? { "@id": `${SITE_URL}/#organization` } : undefined,
      areaServed: isService ? { "@type": "Country", name: "France" } : undefined,
      availableLanguage: isService ? ["fr", "en", "ar"] : undefined,
      offers: page.slug === "creation-site-web"
        ? {
            "@type": "Offer",
            price: "195",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "195",
              priceCurrency: "EUR",
              billingDuration: "P1M",
              unitText: "par mois",
            },
            url: absolute("/creation-site-web/"),
          }
        : undefined,
    },
    breadcrumb(path, page.eyebrow),
  ];
  if (page.article) {
    graph.push({
      "@type": "Article",
      "@id": `${absolute(path)}#article`,
      headline: page.h1,
      description: page.metaDescription,
      datePublished: page.article.published,
      dateModified: page.article.updated,
      inLanguage: "fr",
      author: { "@type": "Organization", name: page.article.author },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: { "@id": `${absolute(path)}#page` },
      image: OG_IMAGE,
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

function legalJsonLd(c: Content, path: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: absolute(path),
    inLanguage: c.htmlLang,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@type": "Organization", name: "Feekza", url: SITE_URL },
  };
}

export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  extra: string;
  bodyClass: string;
  htmlLang: string;
  dir: "ltr" | "rtl";
}

export function buildHead(route: Route): HeadData {
  if (route.kind === "home") {
    const c = content[route.locale];
    const json = JSON.stringify(homeJsonLd(c, route.path));
    const extra = [
      alternates(),
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Feekza" />`,
      `<meta property="og:locale" content="${c.locale === "fr" ? "fr_FR" : c.locale === "en" ? "en_US" : "ar_AR"}" />`,
      ...locales
        .filter((locale) => locale !== c.locale)
        .map(
          (locale) =>
            `<meta property="og:locale:alternate" content="${locale === "fr" ? "fr_FR" : locale === "en" ? "en_US" : "ar_AR"}" />`,
        ),
      `<meta property="og:url" content="${absolute(route.path)}" />`,
      `<meta property="og:title" content="${escapeHtml(c.meta.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(c.meta.description)}" />`,
      `<meta property="og:image" content="${OG_IMAGE}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${escapeHtml(c.meta.ogAlt)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeHtml(c.meta.title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(c.meta.description)}" />`,
      `<meta name="twitter:image" content="${OG_IMAGE}" />`,
      `<link rel="preload" href="/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin />`,
      `<link rel="preload" href="/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin />`,
      `<link rel="preload" href="/fonts/plex-mono-400.woff2" as="font" type="font/woff2" crossorigin />`,
      route.locale === "ar"
        ? `<link rel="preload" href="/fonts/noto-kufi-arabic.woff2" as="font" type="font/woff2" crossorigin />`
        : "",
      `<script type="application/ld+json">${json}</script>`,
    ]
      .filter(Boolean)
      .join("\n    ");
    return {
      title: c.meta.title,
      description: c.meta.description,
      canonical: absolute(route.path),
      extra,
      bodyClass: "home",
      htmlLang: c.htmlLang,
      dir: c.dir,
    };
  }

  if (route.kind === "page") {
    const { page } = route;
    const json = JSON.stringify(pageJsonLd(route));
    const extra = [
      `<meta name="robots" content="index,follow" />`,
      `<meta property="og:type" content="${page.article ? "article" : "website"}" />`,
      `<meta property="og:site_name" content="Feekza" />`,
      page.article
        ? `<meta property="article:published_time" content="${page.article.published}" />\n      <meta property="article:modified_time" content="${page.article.updated}" />`
        : "",
      `<meta property="og:locale" content="fr_FR" />`,
      `<meta property="og:url" content="${absolute(route.path)}" />`,
      `<meta property="og:title" content="${escapeHtml(page.metaTitle)}" />`,
      `<meta property="og:description" content="${escapeHtml(page.metaDescription)}" />`,
      `<meta property="og:image" content="${OG_IMAGE}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${escapeHtml(page.h1)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeHtml(page.metaTitle)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(page.metaDescription)}" />`,
      `<meta name="twitter:image" content="${OG_IMAGE}" />`,
      `<link rel="preload" href="/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin />`,
      `<link rel="preload" href="/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin />`,
      `<link rel="preload" href="/fonts/plex-mono-400.woff2" as="font" type="font/woff2" crossorigin />`,
      `<script type="application/ld+json">${json}</script>`,
    ].join("\n    ");
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      canonical: absolute(route.path),
      extra,
      bodyClass: "doc-page",
      htmlLang: "fr",
      dir: "ltr",
    };
  }

  if (route.kind === "legal") {
    const c = content.fr;
    const json = JSON.stringify(legalJsonLd(c, route.path, route.page.title));
    const extra = [
      `<meta name="robots" content="index,follow" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:url" content="${absolute(route.path)}" />`,
      `<meta property="og:title" content="${escapeHtml(`${route.page.title} — Feekza`)}" />`,
      `<meta property="og:description" content="${escapeHtml(route.page.description)}" />`,
      `<meta name="twitter:card" content="summary" />`,
      `<meta property="og:site_name" content="Feekza" />`,
      `<script type="application/ld+json">${json}</script>`,
    ].join("\n    ");
    return {
      title: `${route.page.title} — Feekza`,
      description: route.page.description,
      canonical: absolute(route.path),
      extra,
      bodyClass: "legal-page",
      htmlLang: "fr",
      dir: "ltr",
    };
  }

  return {
    title: "Page introuvable — Feekza",
    description: "Cette page n’existe pas ou a été déplacée.",
    canonical: `${SITE_URL}/404.html`,
    extra: `<meta name="robots" content="noindex,follow" />`,
    bodyClass: "notfound-page",
    htmlLang: "fr",
    dir: "ltr",
  };
}

export const stripeLink = STRIPE_PAYMENT_LINK;
