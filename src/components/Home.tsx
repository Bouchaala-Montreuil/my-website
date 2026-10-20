import type { Content, Locale } from "@/content/types";
import { HomeV2 } from "./HomeV2";

export function Home({
  c,
  locale,
  currentPath,
}: {
  c: Content;
  locale: Locale;
  currentPath: string;
}) {
  return <HomeV2 c={c} locale={locale} currentPath={currentPath} />;
}
