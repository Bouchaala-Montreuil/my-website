import { ar } from "./ar";
import { en } from "./en";
import { fr } from "./fr";
import type { Content, Locale } from "./types";

export const content: Record<Locale, Content> = { fr, en, ar };
export const locales: Locale[] = ["fr", "en", "ar"];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return value === "fr" || value === "en" || value === "ar";
}

export function homePath(locale: Locale): string {
  return locale === "fr" ? "/" : `/${locale}/`;
}
