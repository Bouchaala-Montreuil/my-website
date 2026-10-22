import { defaultLocale } from "@/content";
import type { Locale, PageDoc } from "@/content/types";
import { legalPages } from "@/content/legal.fr";
import type { LegalPage } from "@/content/types";
import { servicePages } from "@/content/services.fr";
import { resourcePages } from "@/content/resources.fr";

export type Route =
  | { kind: "home"; locale: Locale; path: string }
  | { kind: "legal"; locale: Locale; page: LegalPage; path: string }
  | { kind: "page"; locale: Locale; page: PageDoc; path: string }
  | { kind: "notfound"; path: string };

/** Normalises a pathname to the trailing-slash form used by the built site. */
export function normalisePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const clean = pathname.split("?")[0].split("#")[0];
  return clean.endsWith("/") ? clean : `${clean}/`;
}

export function resolveRoute(pathname: string): Route {
  const path = normalisePath(pathname);

  if (path === "/") return { kind: "home", locale: defaultLocale, path: "/" };

  const slug = path.replace(/^\//, "").replace(/\/$/, "");

  const legal = legalPages.find((p) => p.slug === slug);
  if (legal) return { kind: "legal", locale: "fr", page: legal, path };

  const page = [...servicePages, ...resourcePages].find((p) => p.slug === slug);
  if (page) return { kind: "page", locale: "fr", page, path };

  // Unknown paths render a 404 rather than an empty page.
  return { kind: "notfound", path };
}

export const allRoutePaths: string[] = [
  "/",
  ...legalPages.map((page) => `/${page.slug}/`),
  ...[...servicePages, ...resourcePages].map((page) => `/${page.slug}/`),
];
