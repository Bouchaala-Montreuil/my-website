# Feekza motion system

A single motion language for every page, built on the tokens already in
`src/styles.css` (`--r-ease`, 12 px radii, one blue, one ink) so the site reads
as one hand rather than a set of effects.

## 1. Principles

1. **Ink and paper move, colour stays.** Motion is expressed with ink, paper and
   the single electric blue. No new colours, no glows.
2. **One ease family.** `cubic-bezier(.625,.05,0,1)` for state changes,
   `cubic-bezier(.19,1,.22,1)` for entrances. Nothing else is allowed.
3. **Short, then still.** Interface motion lives between 120 ms and 520 ms;
   entrances up to 1 s. Nothing loops except the marquee and the dither canvas.
4. **Motion never owns content.** Every animated element is visible without
   JavaScript and without animation.
5. **Hierarchy over quantity.** Four levels, described below; no element gets
   motion from more than one level.

## 2. Duration and easing scale

| Token | Value | Used for |
|---|---|---|
| press | 120 ms | button and cursor press |
| micro | 250–350 ms | hover colour, arrows, accordion sign, cursor states |
| state | 520 ms | character roll, magnetic release |
| wipe | 735 ms | link underline (reference value) |
| entrance | 900–1150 ms | headline rise, clip-path image reveal |
| field | 420 ms + stagger | page transition cells |

Easings: `state` = `.625,.05,0,1`; `entrance` = `.19,1,.22,1`; the transition
field uses `.76,0,.24,1` for a symmetric fill/empty.

## 3. Levels

- **Signature** — the page transition field, the character roll on the primary
  action, and the display headline's masked rise. These three define Feekza.
- **Section** — clip-path reveals on media, staggered reveals on cards and
  steps, parallax on the case plate. They support reading order, never reverse it.
- **Micro** — underline wipes, arrow travel, magnetic pull, accordion sign,
  cursor state changes.
- **Functional** — focus rings, form validation, menu open/close, sticky header.

## 4. Pointer rules

- The cursor is two parts: a 7 px blue dot tracking at 0.55 and a 34 px ring
  lagging at 0.16. The lag is the brand gesture — weight, not delay.
- States: default (34 px hairline), link/button (54 px, blue border),
  media (84 px filled blue with a label), text field (18 px, native I-beam kept),
  press (28 px). The label exists only on media.
- The native cursor is hidden **only after** the module mounts; if the script
  fails, the system cursor remains. Inputs, textareas and selects keep theirs.
- Magnetic pull is limited to 7 px and released on `pointerleave`; it is applied
  to the header action, the hero action and the menu toggle, never to navigation
  links.
- No custom cursor on touch, and none under reduced motion.

## 5. Scroll rules

- Entrances trigger once, at 92 % of the viewport height, and never replay.
- The case plate wipes open with `clip-path: inset(0 0 100% 0)` and settles from
  `scale(1.06)`: one gesture, no separate fade.
- Parallax is transform-only, capped at ±8 % of the layer height.
- No scroll hijacking, no pinned sections, no scroll-linked typography.

## 6. Reduced motion

`prefers-reduced-motion: reduce` disables the transition field, the cursor,
magnetism, the clip reveal, the character roll, the accordion animation and all
scroll transitions, and shows every element in its final state. The site remains
complete and readable: motion is never the carrier of information.

## 7. Performance

- Only `transform`, `opacity`, `filter` and `clip-path` are animated.
- One `requestAnimationFrame` loop at a time; each stops when its element leaves
  its resting state.
- The page transition builds its cells at click time and removes the whole layer
  after the reveal.
- Measured after this pass (desktop Lighthouse, `/`): **100 / 100 / 100 / 100**,
  LCP 0.5 s, CLS 0, TBT 0 ms. axe-core: 0 violations at 390 and 1440 px.

## 8. Verification log

| Effect | Method | Result |
|---|---|---|
| Page transition | click nav link, inspect overlay | 1 040 cells, 40 columns, lands on target |
| Character roll | hover the header action | `--roll-fade` 0 → .73 → 1, 15 twins |
| Underline | hover a text link | `scaleX(0) → scaleX(1)`, 735 ms |
| Cursor | force `hover:hover`, move pointer | dot and ring translate, `is-link` over buttons, `is-view` + label over the case plate |
| Magnetic | pointer inside the hero action | `--mx: 7px` clamp, returns to 0 |
| Image reveal | scroll to the plate | `clip-path` from `inset(0 0 100% 0)` to `inset(0)` |
| Accordion | open a `details` | `faq-answer .34s`, sign rotates 45° |
| Reduced motion | emulate media feature | no cursor, no clip, no overlay, no filter |
| Touch | `(hover:none)` | cursor layer `display:none` |

## 9. Limits

- The cursor cannot be screenshotted in the headless shell: it reports
  `(hover:none)`, which correctly hides the layer. Behaviour was verified through
  computed state and class transitions instead.
- The dither canvas is heavy on first paint; it runs once per image, not per frame.
- No sound, no video, no WebGL: none of them had a purpose on this site.
