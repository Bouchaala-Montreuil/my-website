# Animation & interaction coverage matrix

Reference `legencymedia.com` → target `feekza.com`, branch
`arena/5047b71f-my-website`. Inventory IDs refer to
[`reference-interaction-inventory.md`](./reference-interaction-inventory.md).

Status vocabulary: **Verified** (implemented and measured in a browser) ·
**Implemented** (present, reference timing not comparable) · **N/A** (reference
behaviour, no honest Feekza equivalent) · **Blocked** (reason recorded) ·
**Not implemented** (acknowledged gap).

## 1. Reference interactions → Feekza

| ID | Reference behaviour | Feekza implementation | Status | Evidence |
|---|---|---|---|---|
| 01 | Blue square page transition, 40/6/4 columns | `.page-transition`, built at click, staggered `--d` | **Verified** | 1 040 cells at 1440 px, 40 columns, final cell `matrix(1,0,0,1,0,0)`; lands on `/creation-site-web/`; absent under reduced motion |
| 02 | Pixel scroll transition | not built — no published timing | **Blocked** | class and `data-mode` only |
| 03 | Underline wipe, .735 s, origin flip | `.v2-textlink`, `.link-arrow`, prose links (`::after`, same cubic-bezier) | **Verified** | `scaleX(0)` → `scaleX(1)` on hover; declared `0.735s cubic-bezier(0.625, 0.05, 0, 1)` |
| 04 | Character roll, twin glyphs, blur .09em | `buildRoll()` + `@property --roll-fade`, on the header call to action | **Verified** | 15 twins; `--roll-fade` 0 → .73 at 400 ms → 1 at 820 ms; twins hidden and no filter under reduced motion |
| 05 | Line-level masked rise | `Split` masks each glyph and rises it with a stagger | **Implemented** | glyph level rather than line level |
| 06 | Pinned badge ≥1100 px | not shipped: a pinned copy of the only CTA would duplicate a link, and the reference's pin is a partner badge Feekza cannot claim | **N/A** | rules exist in CSS, no markup |
| 07 | Filter buttons, .6 s | no filterable index | **N/A** | — |
| 08 | Filter list scale/fade | no filterable index | **N/A** | — |
| 09 | Reset button | no filters | **N/A** | — |
| 10 | Unicorn Studio hero scene | not reproduced, proprietary asset | **Blocked** | canvas attributes verified |
| 11 | Dither canvas fade .5 s | `DitherImage` ordered-dither canvas over the plate | **Implemented** | component present; home uses the case plate |
| 12 | `.band-scene` layer | no equivalent band | **Not implemented** | — |
| 13 | Marquee | `.v2-marquee__track`, 34 s linear, paused on hover | **Implemented** | running `v2-marquee 34s`; reference cadence unknown |
| 14 | Case carousel, arrows + `1/1` | one case exists; arrows would be dead | **N/A** | — |
| 15 | Mobile menu | full-screen `.mobile-panel` dialog, 6 numbered links, focus trap, ESC | **Verified** | `role="dialog"`, 6 links, roll `transform .55s cubic-bezier(.19,1,.22,1)` |
| 16 | Services dropdown | menu panel lists every service, no hover mega-menu | **Implemented** | keyboard reachable |
| 22 | Smooth anchor scroll | same declaration | **Verified** | computed `scroll-behavior: smooth` |

Present on the reference: **17** → verified **5**, implemented (not comparable)
**4**, N/A **5**, blocked **2**, not implemented **1**.

## 2. Investigated categories with no evidence

| ID | Category | Finding |
|---|---|---|
| 17 | Card hover | no surviving rule; not copied |
| 18 | Custom cursor | no evidence anywhere — not added |
| 19 | Sticky/scroll header | no evidence (Feekza keeps its own sticky header) |
| 20 | Accordions | no evidence |
| 21 | Counters | none |

## 3. Feekza interactive element inventory

| Element | Interaction | Keyboard | Reduced motion |
|---|---|---|---|
| Skip link | focus reveal | ✔ | ✔ |
| Header brand | home | ✔ | n/a |
| Header nav, 6 links (≥1240 px) | hover colour, focus ring | ✔ | ✔ |
| Header CTA pill | roll on hover/focus | ✔ | static |
| Menu toggle | dialog, focus trap, ESC, inert background | ✔ | no motion |
| Locale FR/EN/AR | switch | ✔ | n/a |
| Hero CTA | anchor scroll | ✔ | ✔ |
| Hero / body text links | underline wipe | ✔ | no transition |
| Inclusion wall link | underline | ✔ | ✔ |
| Offer card links | underline, focus ring | ✔ | ✔ |
| Case plate | phone lifts on hover | ✔ | off |
| Marquee | 34 s loop, pauses on hover, `aria-hidden` | n/a | stopped |
| Steps 01–04 | scroll reveal | n/a | visible |
| Order form | 4 steps, validation, consent, submit | ✔ | no motion dependency |
| FAQ, 6 `details` | native disclosure | ✔ | ✔ |
| Footer links + mail | underline | ✔ | ✔ |
| Mobile CTA bar | fixed, hidden ≥1100 px | ✔ | ✔ |
| Page transition | covers internal navigation | n/a | disabled |
| Scroll reveals / parallax | geometry pass, transform only | n/a | disabled |

No navigation, form control or content depends on hover; the transition overlay
is `aria-hidden`, `pointer-events:none`, removed after the reveal.

## 4. Checks after this pass

| Check | Result |
|---|---|
| axe-core, `/` + `/creation-site-web/`, 390 and 1440 | 0 violations |
| Lighthouse desktop `/` | 100 / 100 / 100 / 100, LCP 0.4 s, CLS 0, TBT 0 ms |
| Horizontal overflow 390/768/1440 | none observed |
| Transition cleanup | overlay removed 900 ms after reveal, one document listener |
| Roll cleanup | one rAF per animation, stops at the end state |

## 5. Incompleteness

- Drivers on the reference are inside bundles that could not be fetched;
  INV-02, 05, 13 and 16 therefore cannot be verified.
- No live hover/scroll observation against the reference, so cadence columns say
  *unknown* instead of a number.
- Card hover and cursor behaviour were absent or unverifiable and were **not**
  invented into Feekza.
