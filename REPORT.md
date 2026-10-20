# Feekza — multi-page rebuild: verified delivery report

Date: 20 October 2026 · Branch: `arena/5047b71f-my-website` · Stack: React 18 + Vite → static
prerender (no production deploy was performed).

---

## 1. Research

### feekza.com (original, read on 20 October 2026)

One page, three languages, a loading screen, a hero with €195/month, a six-month commitment,
a refund promise on a rejected preview, and "sleep mode" if unpaid. No legal page
(`/privacy` returned 404), no service detail, no case study, no contact page beyond the form.
Baseline measurements of that build: LCP 2.95 s, 20–50 px horizontal overflow, no `<h1>`, no
skip link, a form that displayed success even when submission failed, 7 unlabelled fields and
17–24 contrast failures.

### legencymedia.com (benchmark, read on 20 October 2026)

- <https://legencymedia.com/> — Webflow Enterprise partner for B2B marketing teams. Hero value
  proposition, three track-record figures, a 20+ name client wall, retainers (Core / Velocity /
  Premium) with "everything in X, plus", one case study with a **method and date footnote**,
  a Google rating with attributed quotes, "How we work" pillars, and guides with editorial
  covers. The partner badge links to a page where the claim can be verified.
- <https://legencymedia.com/services/webflow-enterprise/> — problem/solution pairs ("Standard
  agency" vs "The Legency approach"), what the build carries, what "enterprise" means here,
  an **"Honest limits"** block, a budget split into three separately owned lines, an adjacent
  checklist article, and a "Verify the partner profile ↗" link.
- <https://legencymedia.com/case-studies/> — filter tabs, a project count, cards with two or
  three metric triples, sector, stack tags, and "View case study".

What was reused: the **structure of trust** (dated proof, named limits, separated budget
lines, verification links). What was not reused: layout, typography, colour, imagery, copy,
branding, or any asset.

### Market context (public price pages, 20 October 2026)

- <https://simplebo.fr/tarifs> — 30–36 € HT/month, 200–240 € launch fee, 10 000+ clients claimed.
- <https://webgazelle.net/> — 99,90 € HT/month, 24-month minimum.
- <https://madra.io/observatoire-prix-site-internet-par-abonnement> — median advertised price
  59 € HT/month, median real first-year cost 929 € TTC.
- <https://www.lafabriquedunet.fr/agences/pages/agences-site-internet/tarifs> — median project
  5 200 €, custom projects around 18 000 €.
- <https://www.ovhcloud.com/fr/domains/> — `.fr` renewal order of magnitude: 7,79 € HT/year.
- <https://buy.stripe.com/14A3cv0gfbW59zE5Y91oI00> — USD 227.84/month by default, EUR 195
  selectable, 4 % conversion fee. **Kept as instructed**, with the euro amount surfaced on the
  site and the risk documented below.

---

## 2. Strategy

- **Priority customer.** An independent professional, artisan, small firm or association with
  no site or an outdated one, who wants a credible five-page site without learning a builder
  or signing an opaque quote.
- **Job to be done.** "Be found, look credible, receive requests" — not "run a platform".
- **Differentiation.** A written scope, a public price, a named limit on what is *not* done,
  and measurement with its conditions. The site itself is the proof: it publishes its own
  Lighthouse and axe results, with the date and the tool version.
- **First impression.** "Your website, in black and white" — a fixed 195 € TTC/month, five
  pages, 0 € setup, 48–72 h to first version, six-month term then one month's notice.
- **Evidence before contact.** Price and scope on the page, the actual build documented as a
  case study, legal pages, a dated budget guide, and a form that explains exactly what happens
  after sending.
- **Service pages.** Website creation (the product), SEO (a technical baseline included, an
  editorial mission quoted separately, no ranking guarantee), digital marketing (a framed
  mission, no commission on media spend). No separate pages for "maintenance" or "hosting":
  they are inside the offer, and adding pages for them would inflate the site.
- **Conversion paths.** Hero → dossier; service page → dossier; guide → service page or
  contact; footer → contact/legal. One form, one promise, no pop-ups, no exit intent.
- **Useful features kept.** A three-step brief, an error summary, a success state with the next
  steps, a mailto fallback that keeps the answers, and a Stripe link only after the visitor has
  chosen to pay.

---

## 3. Three art directions, and the one that shipped

1. **"Vitrine"** — a classic premium agency site: large photography, a portfolio grid, a dark
   hero, animated counters. Rejected: no client photographs exist, and stock imagery would
   fabricate the exact evidence the brand cannot yet show. It would also contradict the
   "no invented proof" rule.
2. **"Signal"** — technical and product-like: a mono typeface everywhere, tight dark panels,
   dashboard-style metrics. Rejected: it reads as a SaaS product, and the price model
   (a service with a human on the other end) disappears.
3. **"Le Dossier" (chosen)** — an editorial, print-like system: warm paper, hairline rules,
   numbered sections, mono specification labels, a Fraunces display face against Instrument
   Sans, one coral accent for actions and one ochre seal. Every claim is laid out like a
   clause in a document. Photography is replaced by specification tables, typographic
   composition and a real screenshot of the product.

Design system: `--ink #1B2026`, `--paper #F4ECDC`, `--paper-2 #EBE1CC`, `--paper-3 #FBF6EA`,
`--coral #E85051` (4.83:1 with `--on-coral #15181D`), `--coral-deep #A82C2B`,
`--coral-wash #F7DDD4`, `--ochre #FCB94D`, `--teal #14504E`, `--muted #5C6157`. Fraunces
(variable, self-hosted), Instrument Sans (variable), IBM Plex Mono (labels). Arabic switches to
Noto Kufi / Noto Sans Arabic and `dir="rtl"`. Spacing is a single clamp scale, all rules are
1–1.5 px solid, shadows are offset paper blocks rather than blurs.

---

## 4. Sitemap and what each page does

| URL | Role |
| --- | --- |
| `/`, `/en/`, `/ar/` | The offer, translated; hero, services, included, process, scope, price, comparator, proof, FAQ, form |
| `/creation-site-web/` | The product: audience, deliverables, four steps, technical standards, price, limits, FAQ, form |
| `/referencement-seo/` | What is in the baseline, what is a separate mission, what cannot be promised |
| `/marketing-digital/` | Frame, channels, measurement, no commission on media spend |
| `/realisations/` | The only project that can be documented (this site): before/after, metrics with conditions, method, what will and will not be published |
| `/a-propos/` | Who works, how, the commercial choices, the limits |
| `/contact/` | What happens after sending, direct email, what makes a useful reply |
| `/ressources/` | Index of guides + editorial policy |
| `/ressources/combien-coute-un-site-vitrine/` | Dated price comparison with five public sources and a three-year calculation |
| `/ressources/checklist-avant-lancement/` | Twenty launch checks (domain, content, forms, speed, backups) |
| `/mentions-legales/`, `/confidentialite/`, `/cgv/` | Legal, with clearly marked "editor to complete" fields |
| `404.html` | Useful not-found page, noindex |

Long-form pages are FR-only; EN and AR keep the single-page offer. hreflang is declared only
for the three home pages.

---

## 5. Architecture decisions

- **Content model instead of page components.** `PageDoc` + `PageBlock` (`p`, `ul`, `steps`,
  `metrics`, `note`, `quote`, `links`, `gallery`) with one `PageView` renderer. Typography,
  spacing and semantics are shared; pages cannot drift.
- **One route table** (`src/lib/routes.ts`) feeds the client, the prerender and the sitemap
  priorities. 15 routes + 404 are written as static HTML; the CSS is inlined; the CSS link is
  removed after inlining.
- **Deferred hydration.** `main.tsx` no longer imports React at the top level. The HTML paints
  first; the app chunk is loaded after `load` (idle callback, 1.2 s cap) or on the first
  pointer/key event. Entry chunk: ~7.7 KB instead of ~385 KB. Mobile LCP moved from 2.8 s to
  1.8–2.1 s in Lighthouse; the page remains readable without JS.
- **Script priority.** The module script carries `fetchpriority="low"` so the document and the
  two preloaded fonts win the first connection.
- **Structured data by page type.** `Service` + `BreadcrumbList` for services, an `Offer`
  with `priceSpecification` (195 EUR, `P1M`) only on the creation page, `WebPage` + `Article` +
  `BreadcrumbList` for guides, `WebPage` for contact/legal, `Organization` + `WebSite` +
  `Service` + `FAQPage` on the home pages.
- **Accessibility as a build constraint.** Semantic headings without skips, skip link, visible
  focus, `aria-current`, a modal menu with `inert` on `main` and footer, focus restoration,
  native `<details>` FAQ, error summary with focus, `lang`/`dir` per locale.
- **Form context.** `OrderForm` accepts a `service` prop; the POST body carries
  `service` and a service-specific `_subject`. Success, failure and retry were exercised with
  a stubbed `fetch`.
- **Assets.** Self-hosted subset fonts, one 125 KB WebP case image with `width`/`height`,
  `loading="lazy"`, `fetchPriority="low"`, no third-party request, no analytics.

---

## 6. Actual test results

Conditions: local static server with gzip and cache headers (`/tmp/bt/serve.mjs`), Chromium
131.0.6778.0, Lighthouse 12.8.2, axe-core 4.14, viewport 390 × 844 and 1440 × 900 unless
stated. These are **lab** measurements, not field data.

| Check | Result |
| --- | --- |
| Prerendered routes | 15 + `404.html` = 16 HTML files |
| Internal links | 16 pages crawled: all targets 200, no missing hash targets |
| axe-core, WCAG 2.0/2.1/2.2 A+AA | **0 violations**, 16 pages × 2 widths (32 runs) |
| Lighthouse mobile — `/` | **99 / 100 / 100 / 100**, FCP 1.2 s, LCP 1.8 s, TBT 10 ms, CLS 0 |
| Lighthouse mobile — `/creation-site-web/` | **99 / 100 / 100 / 100**, LCP 1.95 s, TBT 0 ms, CLS 0 |
| Lighthouse mobile — `/ressources/combien-coute…/` | **99 / 100 / 100 / 100**, LCP 1.95 s, TBT 0 ms, CLS 0 |
| Lighthouse mobile — `/realisations/` (heaviest) | **99 / 100 / 100 / 100**, LCP 2.1 s, TBT 0 ms, CLS 0 |
| Lighthouse desktop — `/`, `/realisations/` | **100 / 100 / 100 / 100**, LCP 0.6 s, CLS 0–0.001 |
| Widths 320 / 360 / 768 / 1024 / 1440 / 1920 | No document overflow on any route. The comparator table scrolls inside its own container by design; the honeypot input is clipped in a 1 px box. |
| Keyboard | Skip link visible at 8 px on Tab, Enter moves to `#contenu`; menu traps focus across 10 controls and restores it on Escape; FAQ opens with Enter and closes with Space |
| Form — success | POST 200 → "Dossier bien reçu", next steps, `service` field present, Stripe `href` with `prefilled_email` |
| Form — failure | Network error → "L'envoi n'a pas abouti", retry, mailto fallback with the answers |
| Form — validation | Empty fields → error summary focused, fields marked `aria-invalid`, step jump |
| Metadata | Unique titles and descriptions; canonical per route; hreflang only on the 3 home pages; JSON-LD parses on every page |
| Sitemap / robots | 15 URLs with priorities; `robots.txt` points to the sitemap |
| Console | 0 errors on content pages; `404.html` is served with a 404 status by the test server, which Chromium logs as a resource error (hosting artefact, not an app error) |

---

## 7. Critique pass — ten weaknesses found and fixed

1. **Header broke between 920 and 1080 px**: six nav items wrapped the brand onto three lines,
   the AR locale was clipped and the CTA wrapped. Raised the nav breakpoint to 1100 px, added
   `nowrap`, and verified 960/1100/1200/1440.
2. **The sticky mobile bar covered the final submit button** on the home form (button
   792–844 px, bar from 784 px). Added `scroll-padding-bottom` and section padding on mobile;
   the button now sits at 712–764 px, above the bar.
3. **Hydration delayed LCP to 2.8 s.** Deferred React until after load or first interaction,
   and marked the script `fetchpriority="low"`. Mobile performance moved 96 → 99, LCP → 1.8–2.1 s.
4. **A false technical claim**: the case study said axe-core 4.10; the installed and executed
   version is 4.14. Corrected in copy.
5. **The contact page was typed as a `Service`** and guides emitted two `Article` nodes. Added
   `schemaType`, made the Article a separate node, and re-ran the metadata audit.
6. **Service pages had a single call to action far from the middle of the page.** Added a
   compact CTA band after the limits block, only where a form exists.
7. **A two-image gallery produced an empty grid cell and misaligned baselines.** Replaced it
   with one composed 1600 × 1000 WebP (desktop + mobile), real capture, lazy-loaded.
8. **Published counts went stale when pages were added** ("10 pages", then 12). Re-derived
   from the final audit: 16 pages × 2 widths, 99 mobile.
9. **The open mobile menu left `main` and the footer in the accessibility tree.** They are now
   `inert` while the panel is open.
10. **Numeric ranges could split across lines** ("48–" / "72 heures"). Replaced with word
    joiners around the en dash and verified the hero at 390 and 1440 px.

Also fixed during the pass: `#dossier` links on legal/404 pages pointed to a missing anchor;
the home title was 62 characters and its description 188 (now 52 / 147); the footer of EN/AR
never links to FR-only pages (verified in the built HTML).

---

## 8. Remaining defects and limits

- **EN and AR are shorter.** The four long-form pages exist only in French. Translating them
  needs a content decision and review, not a code change.
- **Legal identity is incomplete.** The three legal pages carry visible "editor to complete"
  markers for entity, SIRET, address, publication director, host address, mediator and VAT.
- **Stripe is still a USD checkout.** The site states the euro price and warns that the
  checkout currency must be read before paying; the link itself was kept as instructed. The
  4 % conversion fee remains a commercial risk to confirm with the provider.
- **No field data.** Core Web Vitals figures are lab measurements. Real-user values require
  traffic and, if the owner wants them, a privacy-respecting measurement plan.
- **One case study.** It is this site, described as such. No invented clients, logos or
  testimonials were added.
- **Slower first interaction on very slow connections.** Because hydration waits for `load`,
  a visitor who taps the menu within ~0.5 s on a slow 4G connection may need to tap again.
  Measured locally: hydration starts right after load; the fallback is a static page that is
  fully readable.
- **The comparator table scrolls horizontally** inside its container at 320–360 px. This is
  intentional (four columns cannot reflow into a readable paragraph), but it is a horizontal
  scroll for keyboard users as well; the caption says so.

---

## 9. Repository diff

- 34 tracked files changed (403 insertions, 4 512 deletions) — the old single-page components,
  Tailwind/GSAP setup and inline utility styles were removed.
- New: `src/content/services.fr.ts` (1 211 lines), `src/content/resources.fr.ts` (765),
  `src/components/PageView.tsx` (323), `src/ClientApp.tsx`, `scripts/prerender.mjs`,
  `public/case-feekza.webp`, `public/fonts/*` (8 woff2 + licences), `PLANNING.md`,
  `REPORT.md`.
- `src/styles.css` grew to 3 766 lines (the full design system, including RTL, print, reduced
  motion and 320 px refinements).
- `docs/` is the deployable GitHub Pages mirror of `dist/` (15 routes + 404, sitemap, robots,
  CNAME, `.nojekyll`).
- `dist-ssr/` is now git-ignored; it is a build artefact.

---

## 10. Next improvements (ordered by commercial impact)

1. **Translate the four long pages to EN** (AR after review by a native reader), then extend
   hreflang and the sitemap. This opens the service pages to the two other audiences.
2. **Add real client case studies** as soon as a client authorises one: same structure, metrics
   with method and date, no logo wall until there are logos.
3. **Decide the Stripe currency.** Either a EUR price in Stripe or a reworded note that makes
   the USD settlement explicit at checkout. This is a billing decision, not a design one.
4. **Complete the legal pages** with the owner's identity, host and mediator.
5. **Add a measurement plan** (privacy-friendly, cookieless) to replace lab-only claims with
   field data after three months.
6. **Content cadence**: one guide per real pre-sales question, dated, with sources; no blog
   filler.
7. **Automate the audits** in CI: axe on every route at two widths, link check, and a
   Lighthouse budget for mobile LCP ≤ 2.5 s.

---

## How to run

```bash
npm ci
npm run dev          # Vite dev server
npm run build        # client build → SSR build → prerender → dist/ and docs/
```

The build fails if TypeScript fails. Prerendered output is what GitHub Pages serves from
`docs/`. No secrets are present in the repository; the Formspree endpoint and Stripe link are
public URLs already used by the live site.
