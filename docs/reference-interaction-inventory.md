# Reference interaction inventory — legencymedia.com

Compiled 20 October 2026 from the reference's delivered stylesheet
(`/_astro/global.Btqt_PqA.css`), its prerendered DOM (home, service, case
study pages) and the captures in `image-search/`.

## How this was gathered — and what could not be

| Method | Result |
|---|---|
| Headless browser at 1440 / 768 / 390 | **Blocked.** The sandbox cannot open `legencymedia.com` (`curl` → `000`); only GitHub, npm and PyPI are reachable. Hover, scroll and cursor behaviour could not be observed live. |
| Stylesheet over the proxy | **Worked.** Global CSS and page inline `<style>` read as text; every timing, easing, property and breakpoint below is copied from that source. |
| Rendered DOM | **Worked.** Shows duplicated glyphs in headings, the `1/1` carousel counter, the repeated marquee sentence, filter controls, consent banner, WebGL canvas attributes. |
| Rendered screenshots | Three usable reference captures in `image-search/`; the rest of that folder is unrelated stock imagery. |

Nothing below is asserted without either delivered code or delivered DOM to
support it. Where a category exists but no effect could be evidenced, it is
listed as unverified rather than filled in.

## Inventory

**INV-01 — Page transition field** · all pages · verified
`.transition` fixed, `inset:0`, `z-index:100`, `pointer-events:none`, `display:grid`;
40 columns, 6 at ≤767 px, 4 at ≤479 px; `.transition-block` `aspect-ratio:1`,
`width:100%`, background `--blue` `#0004f6`; `display:none` under reduced motion.
Driven by script at navigation time.

**INV-02 — Pixel scroll transition** · inline styles · verified as present
`.pixelated-scroll-transition`, `data-mode="reveal"` — panels resolve to columns
to pixels. No durations in the delivered CSS.

**INV-03 — Inline link underline wipe** · body links · verified
`[data-underline-link]` / `[data-underline-link="alt"]`; two pseudo-elements,
`height:.0625em`, `background:currentColor`, `bottom:-.0625em`;
`scaleX(0)` origin `100%` → hover `scaleX(1)` origin `0`;
**0.735 s**, `cubic-bezier(.625,.05,0,1)`; the `alt` variant starts drawn with
`.3 s` delay and reverses on hover; gated by `(hover:hover) and (pointer:fine)`;
removed under reduced motion.

**INV-04 — Character roll** · headings and links · verified
`@property --roll-fade{inherits:true;initial-value:0}`;
`.roll-letter{--roll-blur:.09em}`;
`.roll-char{filter:blur(calc(var(--roll-amt) * var(--roll-blur)));opacity:calc(1 - var(--roll-amt));will-change:filter,opacity}`;
twin `[data-roll-twin]{--roll-amt:calc(1 - var(--roll-fade))}`.
The DOM doubles every heading character (`W W e e b b f f…`), so the twin is
used on headings, not only links. Reduced motion: no filter, twin hidden.

**INV-05 — Line reveal on headings** · hero and section titles · partially verified
`.text-line{will-change:transform}` — line-level transforms from script. Masks,
stagger and duration are not in CSS.

**INV-06 — Pinned badge** · ≥1100 px · verified
`.badge-pin`: fixed, right/bottom `var(--pad-x)`, `z-index:60`,
`drop-shadow(0 6px 20px #0000002e)`; hidden `opacity:0;visibility:hidden;translateY(12px)`
→ `.is-shown` `opacity:1;translateY(0)`; transition **.45 s**; `display:none` ≤1099 px.

**INV-07 — Filter buttons** · case studies, blog · verified
`.filter-btn` transitions colour and background at **.6 s**
`cubic-bezier(.625,.05,0,1)`; active adds `box-shadow:0 0 0 2px var(--ink)` and
inverts colour.

**INV-08 — Filter result list** · same · verified
`active`: opacity 1, `scale(1) rotate(.001deg)`, .6 s;
`transition-out`: opacity 0, `scale(.9)`, **.45 s**;
`not-active`: opacity 0, hidden, `position:absolute`, `scale(.9)`.

**INV-09 — Reset button** · same · verified
`.reset-btn` fades in only when a filter is active, `.6 s` all.

**INV-10 — WebGL hero scene** · home hero · verified as present, not reproducible
`[data-us-project-src$="secondary-hero.json"]` — Unicorn Studio canvas,
absolute `inset:0`, `pointer-events:none`; on boot `.us-booted`
`background-image:none; left:34%`; `left:0` ≤860 px; `transition:background-image .4s`.
Proprietary scene asset; motion cannot be inspected.

**INV-11 — Dither canvas** · editorial covers · verified
`.live-dither__canvas`: absolute `inset:0`, `opacity:0`,
`transition:opacity .5s`; `.is-live` → `opacity:1`.

**INV-12 — Band scene** · section backgrounds · verified as present
`.band-scene`: absolute `inset:0`, `pointer-events:none`; siblings `z-index:1`.

**INV-13 — Marquee** · between sections · verified in DOM
“Webflow, search and conversion -” repeated eight times. Timing not in CSS.

**INV-14 — Case carousel** · client result · verified in DOM
Arrow controls and a `1/1` counter; inert with one slide. Timing unknown.

**INV-15 — Mobile menu** · small viewports · present in DOM
Hamburger, panel with grouped links, close control. Entry animation unknown.

**INV-16 — Services dropdown / mega list** · header · present in DOM
“Services” expands to a long list. Behaviour and timing unknown.

**INV-17 — Card hover states** · work and blog cards · unverified
No card hover rule survives in the delivered CSS; may live in script.

**INV-18 — Custom cursor** · site-wide · no evidence
No `cursor:none`, no follower node, no cursor rule. Treated as absent.

**INV-19 — Sticky header / scroll state** · no CSS evidence.

**INV-20 — Accordions** · no evidence on the pages inspected.

**INV-21 — Animated counters** · no evidence; figures render as text.

**INV-22 — Smooth anchor scroll** · `html{scroll-behavior:smooth}` · verified.

**INV-23 — Consent banner** · first visit · UI only, `#consent-banner`, key `lm-consent`.

## Limitations recorded rather than filled in

1. No live session: hover, scroll and cursor could not be observed.
2. Animation drivers live in bundles that are not addressable by URL here.
3. The Unicorn Studio scene is proprietary and cannot be reproduced.
4. `prefers-reduced-motion` handling is visible only for transition, underline,
   roll and badge.
