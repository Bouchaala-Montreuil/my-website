# Feekza — audit, research and direction

Working notes. Research date: 2026-10-20. All observations below come from the repository
(`main` @ 76ab44a), the live site at https://feekza.com, the public Stripe payment page, and
the sources cited. Sandbox limitations are listed at the end.

## 1. What exists today

- React 19 + Vite 7 + Tailwind 4, GSAP + ScrollTrigger, `vite-plugin-singlefile`.
- One long page, nine sections, client-side language switch (EN/FR/AR + RTL) driven by a
  flat 569-line translation dictionary.
- `docs/` contains the deployed build (`docs/index.html`, 436 KB, plus CNAME/robots/sitemap).
- Forms post to Formspree `xoejbykw`; payment links to Stripe
  `buy.stripe.com/14A3cv0gfbW59zE5Y91oI00`.
- Design system: cream / charcoal / coral / teal / mustard, Space Grotesk + Inter,
  rounded pills, custom cursor, magnetic buttons, loader, floating blobs.

### Evidence (measured in a headless Chromium 131, local static server of `docs/`)

| Check | Result |
| --- | --- |
| HTML served to crawlers | `<div id="root"></div>` only; zero `<h1>` in the served document |
| First contentful paint | 0.16–0.43 s locally, but the real hero is masked by the loader |
| LCP (local lab) | **2.95 s** — largest element is a hero line that only appears after the loader |
| Loader duration | ~2.8 s, plus a 9 s failsafe; "tap to skip" |
| Horizontal overflow | 20–50 px on 360/390/768/1440/1920 viewports (custom cursor ring, polaroids, wide image rows) |
| axe-core WCAG 2.x A/AA | 4 violation types: `label` (critical, 7), `select-name` (critical, 2), `color-contrast` (serious, 17–24), `label-content-name-mismatch` (1) |
| Contrast | cream on teal 3.56:1, mustard on teal 1.87:1, white on coral 3.45:1 |
| Keyboard | tab reaches the logo/links, but the mobile menu has no `aria-expanded`, no focus move, no Escape, no dialog semantics; FAQ buttons lack `aria-expanded`/`aria-controls` |
| Form errors | rendered as `⚠ Your name *` text, no `aria-live`, no focus management, inputs unassociated with labels |
| Contact form | **always shows success**, including when the network request fails (`catch {}`) |
| Images | six hot-linked Pexels photos, no `width`/`height`, one 433 KB PNG logo + 192 KB wordmark |
| Fonts | Google Fonts, three families / 11 weights, render-blocking, third-party (GDPR exposure in FR) |
| Legal | `/privacy`, `/terms`, `/cookies` links are translated but never rendered; no legal page exists (verified: `/privacy` returns GitHub Pages 404) |
| Analytics | none |

### Business facts verified against third parties

- The Stripe page title is "Subscribe to Site Web Feekza": it charges **$227.84 / month**,
  displays EUR 195 with "1 EUR = 1.1684 USD (includes 4 % conversion fee)", USD is the
  selected currency and the account behaves as US-based. A French visitor is therefore
  shown a different currency and an unpublished surcharge. This is a live pricing/payment
  inconsistency and needs the owner's decision.
- The offer itself: 195 €/month, up to 5 pages, hosting, pro email, 24/7 maintenance,
  unlimited changes, domain free for year 1 (~15 €/yr afterwards), first version in
  48–72 h, 6-month minimum then monthly with one month's notice, refund if the preview is
  rejected.
- No testimonials are published (the `Testimonials` component is intentionally unmounted
  and empty). No case studies, client names, awards or performance results exist anywhere.

### Contradictions to resolve (do not carry into the new site)

1. "You own everything … no lock-ins" vs "6-month commitment" and "if you stop paying the
   site goes into sleep mode". Ownership applies to content and domain, not to the built
   site while it is being financed. Copy must say exactly that.
2. Contact form budget ranges €3k–€25k contradict a 195 €/month product.
3. Order flow: step 5 promises "you will be redirected to Stripe" but opens a popup; the
   success screen says "Order received" even when Formspree fails and when no payment was
   made.
4. The FAQ JSON-LD is in English while the page is `lang="fr"`.
5. "24/7 maintenance" + "24h response" + "decades of experience" are unverifiable claims
   inherited from the previous build. The new copy keeps only commitments the business
   controls (delivery windows, revision window, refund rule) and drops biography claims.

## 2. Market research (observed 2026-10-20)

| Source | Fact used |
| --- | --- |
| La Fabrique du Net, tarifs agences, updated 2026-10-14 | median French website project 5 200 €; 50 % between 3 000 € and 15 000 €; custom build median 18 000 € |
| Madra observatory, 2026-09-09, 8 French subscription offers | median advertised price 59 € HT/month, median real first-year cost 929 € TTC; 3 of 8 add 250–500 € setup fees; one imposes 24 months |
| Simplébo tarifs (2026-10-20) | entry 30–36 € HT/month **+ 200–240 € launch fee**, up to 150 € + 800 €; 10 000+ clients, 4.9/5 with 1 585 Google + 2 460 Trustpilot reviews, partner logos |
| WebGazelle forfait (2026-10-20) | 99,90 € HT/month, **24-month minimum**, loyalty points, site becomes yours only after the term |
| sdr-web.fr, 2026-08-09 | subscription market: 60–240 €/month over 24–60 months, setup fees 400–2 000 €, cancellation by registered letter up to 4 months |
| peechy.fr, 2026-10-12 | agency subscription example 150–500 € HT/month for design + hosting + maintenance + changes |

Observed conventions: monthly price displayed HT, launch fee, 12–24-month commitment,
"all included" claims, testimonial walls, local-SEO add-ons, free audit as lead magnet.

Underserved / differentiation space:
- **Published total cost over time** (setup fee + mensualités) rather than a teaser price.
- **Short commitment** (6 months vs 24–48).
- **No setup fee** and unlimited content changes (the market charges per change or per hour).
- **A real preview before the project is locked** (refund rule) instead of a signed quote.
- **Genuine multilingual FR/EN/AR** with RTL — relevant for the owner's own audience and for
  import/export SMEs, and almost nobody in the French subscription segment does it well.
- **Honest absence of social proof**, replaced by a precise specification of deliverables.

Positioning hypothesis (to validate): *the fixed-scope, fixed-price website subscription for
small businesses that need a credible site this week and expect it to keep changing — with
no setup fee, a six-month commitment instead of two years, and a preview you can reject.*

## 3. Strategy

- Primary audience: French TPE/independants (artisans, restaurateurs, thérapeutes,
  consultants, petites boutiques) with no site or an outdated one, no internal web skills.
- Secondary: Arabic-speaking entrepreneurs and FR/EN/AR businesses needing a trilingual
  site; and businesses leaving a 24-month contract.
- Main conversion: start the order (scope + payment of the first month). Secondary: ask a
  question by email/form; read the exact terms.
- Trust needed: price and total cost, what is in/out of scope, commitment and exit, who
  hosts and who owns what, how the preview/refund works, response times, security of payment.
- Success metrics to instrument later: order starts, order completions, contact enquiries,
  pricing/terms engagement, refund rate. (Not instrumented in this build: no analytics
  account, and adding third-party analytics would require consent.)

### Sitemap

- `/` FR home (default, x-default)
- `/en/`, `/ar/` localized homes
- `/mentions-legales/`, `/confidentialite/`, `/cgv/` (FR)
- `404.html`

## 4. Art direction

Three directions were considered:

1. **Atelier** — warm paper, high-contrast serif, stamps, very editorial. Strong humanity,
   risk of reading as a luxury boutique rather than a service provider.
2. **Blueprint** — ink-blue technical drawing, mono annotations, measurements. Maximum
   transparency feel, risk of coldness.
3. **Kiosk** — poster scale, saturated blocks, sticker type. Memorable, risk of looking
   loud/cheap for conservative trades.

Chosen: **“Le Dossier”**, a controlled hybrid of 1 and 2. Warm paper substrate, hairline
rules, numbered sections, mono spec labels, Fraunces display with Instrument Sans body, one
coral accent for actions and one ochre seal. The concept is the product's own promise:
everything is written down, itemised and signed. No stock photography, no gradients, no
glass, no floating cards, no cursor replacement. Photography is replaced by specification
diagrams and typographic compositions, which is the honest option given there are no
published client projects.

## 5. Implementation decisions

- Keep React + Vite + Tailwind. Remove GSAP (≈370 KB of JS, main-thread animation, INP risk)
  and `vite-plugin-singlefile`; replace with CSS transitions + IntersectionObserver.
- Prerender every route to static HTML with `react-dom/server` at build time. This fixes the
  empty-HTML SEO problem, the loader-delayed LCP, and gives per-page metadata/hreflang.
- Self-host fonts (privacy + no render-blocking third party). Drop Pexels hot-links.
- Rework forms: associated labels, error summary with focus, aria-live status, no fake
  success, mailto fallback that preserves data, honeypot + timing trap, consent.
- Typed per-locale content modules instead of a flat 569-key dictionary.
- Documented integration boundary for legal identity and for payment/VAT, which require the
  owner's verified data.

## 6. Unknowns requiring the owner

- Legal identity: entity name, legal form, SIRET/RCS, registered address, VAT status,
  publication director, hosting provider address, mediator.
- Whether 195 € is TTC or HT, and why Stripe charges USD with a 4 % conversion fee.
- Real delivery capacity: can 48–72 h be honoured repeatedly? Is 24/7 maintenance real?
- Any client reference, testimonial, or case study that may be published.
- Domain, email and hosting account ownership.

## Sandbox limitations

- Outbound network is limited to npm/PyPI/GitHub; `feekza.com`, Pexels and Formspree could
  not be reached from the sandbox. The live site was read through the page-fetch tool and
  the deployed `docs/` build was served locally instead. Browser tests therefore use local
  builds; Stripe was read through the page-fetch tool only, no payment was attempted.
- Lighthouse/Playwright binaries are not installable here (cdn.playwright.dev and
  storage.googleapis.com are blocked). Measurements use headless Chromium 131 with
  PerformanceObserver plus axe-core; this is lab data, not field data.

---

# Multi-page rebuild — 20 October 2026

## Why the scope changed

The single page answered "what is the offer". It did not answer "what exactly do I get",
"what happens if I write", "can I verify the claims", or "who is behind this". The reference
study of legencymedia.com (home, `/services/webflow-enterprise/`, `/case-studies/`) showed a
repeatable anatomy for a credible services site: proof with dates, a service page that names
its own limits, a budget split into owned lines, case studies with method footnotes, and
editorial pages that answer pre-sales questions. Those patterns were reused as *structure*,
not as visual design or copy.

## Final sitemap (15 indexed URLs + 404)

- `/` (FR), `/en/`, `/ar/` — the offer, translated.
- `/creation-site-web/`, `/referencement-seo/`, `/marketing-digital/` — service pages.
- `/realisations/` — the verifiable case study (this site) + measurement method.
- `/a-propos/` — who, how, limits.
- `/contact/` — the enquiry journey, with the same form.
- `/ressources/`, `/ressources/combien-coute-un-site-vitrine/`,
  `/ressources/checklist-avant-lancement/` — two dated guides with public sources.
- `/mentions-legales/`, `/confidentialite/`, `/cgv/` — FR-only legal pages.
- `404.html`.

Long-form pages are **FR-only**. EN and AR keep the concise single-page offer. hreflang is
declared only for the three language home pages; advertising alternates for pages that do not
exist would be worse than having none.

## Content model

`PageDoc` + `PageBlock` (`p`, `ul`, `steps`, `metrics`, `note`, `quote`, `links`, `gallery`)
replaced page-specific components. One renderer (`PageView`) serves services, work, about,
contact and both guides, so typography, spacing and semantics cannot drift between pages.
`PageDoc.schemaType` and `PageDoc.article` drive the structured-data type, and
`formService` decides whether the page ends with the order form, a link to it, or neither.

## Architecture decisions

- **One route table** (`src/lib/routes.ts`) feeds the client, the server prerender and the
  sitemap. The prerender script still lists paths (it cannot import TS), so both lists are
  kept in sync by a build check: a missing route would be caught by the route audit.
- **Deferred hydration.** The HTML is complete before JavaScript runs. `main.tsx` loads React
  after `load` (idle callback, 1.2 s max) or on the first pointer/key event. The entry chunk is
  ~7.7 KB instead of ~385 KB; the app chunk loads in parallel and hydrates. This moved mobile
  LCP from 2.8 s to 1.8–2.1 s in Lighthouse and keeps the page usable without JS.
- **Script priority.** The module script carries `fetchpriority="low"` so the document and the
  two preloaded fonts win the initial connection.
- **Header.** Six sections no longer fit above 1100 px; the menu panel takes over below that.
  The panel sets `inert` on `main` and the footer, traps focus, closes on Escape and restores
  focus. The current page is marked with `aria-current="page"`.
- **Mobile bar clearance.** The fixed bar is 60 px high; `scroll-padding-bottom` and extra
  section padding keep the final submit button above it (verified at 390 px).
- **Form context.** `OrderForm` takes a `service` prop; the payload now carries
  `service: "site-web" | "seo" | "marketing"` and the subject line names the request. Success
  and failure paths were both exercised with a stubbed `fetch`.
- **Structured data.** Service pages emit `Service` + `BreadcrumbList`; only the creation page
  carries the 195 € `Offer` (SEO and marketing are quoted separately). Guides emit
  `WebPage` + `Article` + `BreadcrumbList` with published/modified dates. Contact is a
  `WebPage`, not a service.

## Verification (all on the built `dist/`, served with gzip)

| Check | Result |
| --- | --- |
| Routes | 16 HTML files, all internal links 200, no missing hash targets |
| axe-core 4.14, WCAG 2.0/2.1/2.2 A+AA | 0 violations, 16 pages × 390/1440 px |
| Lighthouse 12.8.2 mobile (Slow 4G, Moto G, CPU ×4) | 99 / 100 / 100 / 100 — FCP 1.2 s, LCP 1.8–2.1 s, TBT 0–10 ms, CLS 0 |
| Lighthouse 12.8.2 desktop | 100 / 100 / 100 / 100 — LCP 0.6 s, CLS 0–0.001 |
| Widths 320–1920 px | no document overflow; only the intentional `.compare` scroll table |
| Keyboard | skip link, menu trap + Escape, FAQ Enter/Space, form errors and step focus |
| Form | validation, consent, POST payload, success, failure fallback + mailto, Stripe link |
| Metadata | unique titles/descriptions, canonical per route, hreflang only where translated |
| Sitemap / robots | 15 URLs + sitemap directive |

Published claims were re-derived from these runs: mobile 99, LCP 2.1 s (worst page),
0 axe violations on 16 pages × 2 widths.

## Remaining defects / limits

- EN and AR are still single-page offers; translating four long pages is a content project,
  not a code change.
- Legal pages contain visible "editor to complete" placeholders for identity, VAT and hosting.
- The Stripe link still charges in USD with a 4 % conversion fee; the site warns about the
  euro amount, but the checkout itself is not changed.
- Lighthouse is lab data. No field data exists until the site receives traffic and, if the
  owner chooses, a privacy-respecting measurement.
- The case study covers one project (this site). It is labelled as such rather than padded
  with invented clients.

## 20 Oct 2026 — motion pass against the reference

**What could be inspected.** The sandbox has no outbound route to legencymedia.com, so the
reference could not be run in this browser: no computed styles, no timeline scrub, no hover
capture. Evidence used instead: the rendered text of the homepage, `/services/webflow-enterprise/`
and `/case-studies/` (fetched 20 Oct 2026); the Awwwards profile ("bold typography, interactive
dithering and fluid motion"; built with GSAP, Barba.js, Astro); the Webflow "made in Webflow"
entry ("Interactions with GSAP"); and a published screenshot of an earlier iteration.

**Behaviours that are attested, and what was rebuilt.**

| Observed on the reference | Evidence | Implemented here |
| --- | --- | --- |
| Character-level heading reveals | Every heading in the fetched DOM contains each letter twice (`W W e e b b…`) | `Split` renders per-glyph spans behind a mask, staggered 14–18 ms, with a real `sr-only` sentence for AT |
| Grotesque display + serif italic accent | Screenshot; "bold typography" | Instrument Sans 600 with Fraunces italic accents |
| Infinite keyword marquee | "Webflow, search and conversion -" repeated in the DOM | `Marquee` with two identical sets, 42 s linear, pauses on hover |
| Full-screen menu | "Legency Menu Close", Site/Services columns | Overlay panel, staggered rows, duplicated label that rolls on hover |
| Carousel with arrows and `1/1` counter | `←→ 1/1` in the homepage DOM | Not rebuilt: Feekza has one case, a slider would be a prop |
| Page transitions | Barba.js listed in the Awwwards stack | Cross-document View Transitions (`@view-transition`), reduced-motion aware |
| Interactive dithering | Awwwards description; dithered blog covers | `DitherImage`: 440 px canvas, 4×4 Bayer matrix, pointer-sized hole revealing the photograph |
| Scroll-linked movement | GSAP interactions | Geometry-based reveals (transform only), image clip masks, parallax hook |
| Sticky, quiet chrome | Header pattern | Header gains a hairline and blur after 12 px of scroll |

**Not reproduced, and why.** No WebGL, no pinned horizontal scrollytelling, no cursor takeover:
none could be observed, and inventing them would be the "meaningless animation" the brief excludes.
Easing curves and durations are therefore an interpretation, not a measurement.

**Measured after the pass (Lighthouse 12.8.2, Chromium 131, gzip server, mobile preset).**
`/` 99 / 100 / 100 / 100, LCP 1.8 s, CLS 0; `/realisations/` 100 / 100 / 100 / 100, LCP 1.9 s;
desktop `/` 100, LCP 0.6 s. axe-core 4.14: 0 violations on 15 routes × 390/1440 px. Reduced motion
verified: no glyph transforms, no marquee, no reveal offsets.

---

## 20 Oct 2026 — palette and composition pass

**Hard constraint, recorded rather than worked around.** The reference still cannot be rendered in
this sandbox: `https://legencymedia.com/`, `https://cdn.prod.website-files.com/` and
`https://assets.awwwards.com/` all return HTTP 000 from the runner, and `fetch_page` returns HTTP 500
for its image assets. There are therefore **no computed styles, no colour picker values, no timing
curve measurements** from the live site. Everything below is derived from (a) the rendered DOM text
fetched server-side, (b) the Awwwards/Webflow metadata, and (c) a published capture of an earlier
iteration — and is labelled as an interpretation, not a measurement.

### Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#F1EFEA` | primary ground (warm off-white) |
| `--paper-2` | `#E7E4DC` | secondary ground |
| `--paper-3` | `#FBFAF7` | raised surface |
| `--ink` | `#101113` | main text, dark bands |
| `--ink-soft` | `#2B2D30` | body copy |
| `--muted` | `#5F6266` | secondary text, labels |
| `--accent` | `#2C4BFF` | primary accent, primary button |
| `--accent-deep` | `#1B33C9` | hover / pressed |
| `--accent-wash` | `#DFE3FF` | tint (tags only) |
| `--rule` / `--rule-strong` | `rgba(16,17,19,.13)` / `.34` | hairlines, dividers |
| `--fs-display` | `clamp(3.3rem, 8.9vw, 8rem)` | hero |
| `--section` / `--max` | `clamp(4rem, 8vw, 7.5rem)` / `1360px` | vertical rhythm, container |

**Rules that follow from the evidence.** One accent, used on primary actions, numerals and hairlines;
no gradients anywhere (the reference's surfaces are flat); no drop shadows — separation is done with
1 px rules and ground changes; pill buttons; square-cornered surfaces; a boxed wordmark. Feekza's own
coral/ochre pair is retired; `--coral`/`--ochre` remain as aliases so no component silently keeps the
old palette.

### Composition changes

- Header: boxed wordmark, hairline under the bar only after scroll, pill primary CTA, `FR · EN · AR`
  collapsed into a single segmented control.
- Hero: label row with rule + locale line, display heading at 0.88 leading, then an asymmetric
  two-column base — prose and buttons on the left, a ruled "fiche offre" rail on the right — closed by
  a five-cell fact table spanning the grid.
- Services: the three-card grid is gone. Three full-width rows, each with index, title, tag, body and a
  circular arrow; hovering inverts the row to ink, shifts its padding and moves the arrow.
- Dark bands, the four-step list, the offer table and the footer now share one hairline language.

### Still not claimed

No pixel-level comparison against the reference is possible in this environment. The QC loop compares
Feekza at 390 / 768 / 1440 against the *documented* system above, not against a rendering of the
reference. Motion timings remain an interpretation (see the table above).
