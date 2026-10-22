import { ar } from "./ar";
import { en } from "./en";
import { fr } from "./fr";
import type { Content, Locale } from "./types";

export const content: Record<Locale, Content> = { fr, en, ar };
// Only the French site is published. The English and Arabic drafts are kept in
// the repository but are no longer routed, linked or advertised: a half
// translated page is worse than no page.
export const locales: Locale[] = ["fr"];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return value === "fr" || value === "en" || value === "ar";
}

export function homePath(locale: Locale): string {
  return locale === "fr" ? "/" : `/${locale}/`;
}
