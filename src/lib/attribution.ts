/**
 * First-touch attribution, without a third-party tracker.
 *
 * The first page a visitor lands on, the site that sent them and any campaign
 * parameters are kept in sessionStorage for the length of the visit. The brief
 * sends that record with the form, so the inbox knows which page or campaign
 * produced which dossier — and nothing is collected for a visitor who never
 * submits anything.
 *
 * The record is written once per session: later pages in the same visit can
 * therefore not overwrite the entry point.
 */
const KEY = "feekza:first-touch";
const PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
];

export type FirstTouch = {
  landing: string;
  referrer: string;
  at: string;
  [key: string]: string;
};

export function captureFirstTouch(): void {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of PARAM_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 120);
    }
    const record: FirstTouch = {
      ...found,
      landing: window.location.pathname.slice(0, 120),
      referrer: (document.referrer || "").slice(0, 180),
      at: new Date().toISOString(),
    };
    sessionStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    /* storage blocked: the brief still works, attribution is lost */
  }
}

export function readFirstTouch(): FirstTouch | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}
