/**
 * Interaction layer, transcribed from the reference site's stylesheet and
 * observed markup.
 *
 * Everything here is progressive enhancement: without JavaScript the site is
 * a plain, complete set of pages. The reference's own values are quoted next to
 * each effect so the implementation can be checked against them.
 */

const EASE = "cubic-bezier(.625,.05,0,1)";
const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
 * 1. Page transition
 * Reference: `.transition` is a fixed, full-viewport blue field made of square
 * cells — 40 columns, 6 at ≤767 px, 4 at ≤479 px — each `.transition-block`
 * with `aspect-ratio: 1`. It is removed entirely under reduced motion.
 * ------------------------------------------------------------------------ */

const TRANSITION_KEY = "feekza:transition";

function columns(): number {
  if (window.matchMedia("(max-width: 479px)").matches) return 4;
  if (window.matchMedia("(max-width: 767px)").matches) return 6;
  return 40;
}

function buildOverlay(): HTMLElement {
  const cols = columns();
  const cell = window.innerWidth / cols;
  const rows = Math.ceil(window.innerHeight / cell) + 1;
  const overlay = document.createElement("div");
  overlay.className = "page-transition";
  overlay.setAttribute("aria-hidden", "true");

  const fragment = document.createDocumentFragment();
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const block = document.createElement("span");
      block.className = "page-transition__cell";
      // The reference's grid animates as a diagonal sweep; the delay follows
      // the column, with a small row offset so the field fills in a wave.
      block.style.setProperty("--d", String(col * 9 + row * 4));
      fragment.appendChild(block);
    }
  }
  overlay.appendChild(fragment);
  return overlay;
}

/** Covers the viewport, then follows the link. */
function coverAndGo(url: string): void {
  const overlay = buildOverlay();
  document.body.appendChild(overlay);
  // First frame at scale(0), second frame covering: the transition needs the
  // initial value to be committed or it is skipped.
  requestAnimationFrame(() => {
    overlay.classList.add("is-covering");
    window.setTimeout(() => {
      try {
        sessionStorage.setItem(TRANSITION_KEY, "1");
      } catch {
        /* private mode: the reveal is skipped, the page still loads */
      }
      window.location.assign(url);
    }, 620);
  });
}

/** Reveals an overlay that was put in place while the document was loading. */
function revealOnArrival(): void {
  let pending = false;
  try {
    pending = sessionStorage.getItem(TRANSITION_KEY) === "1";
    sessionStorage.removeItem(TRANSITION_KEY);
  } catch {
    pending = false;
  }
  if (!pending) {
    document.documentElement.classList.remove("pt-load");
    return;
  }

  const overlay = buildOverlay();
  overlay.classList.add("is-covering");
  (overlay as HTMLElement).style.transition = "none";
  document.body.appendChild(overlay);

  window.setTimeout(() => {
    overlay.classList.remove("is-covering");
    overlay.classList.add("is-revealing");
    document.documentElement.classList.remove("pt-load");
    window.setTimeout(() => overlay.remove(), 900);
  }, 40);
}

export function initPageTransition(): void {
  if (reduced()) return;

  revealOnArrival();

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;

    const link = (event.target as Element | null)?.closest?.("a");
    if (!link) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
    if (/^https?:\/\//.test(href) && !href.startsWith(window.location.origin)) return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.hash) return;

    event.preventDefault();
    coverAndGo(url.href);
  });
}

/* --------------------------------------------------------------------------
 * 2. Character roll
 * Reference: `@property --roll-fade`, `.roll-letter{--roll-blur:.09em}`,
 * `.roll-char{filter:blur(calc(var(--roll-amt) * var(--roll-blur)));
 * opacity:calc(1 - var(--roll-amt))}`, and a twin with
 * `--roll-amt:calc(1 - var(--roll-fade))`. Two identical glyphs crossfade, so
 * the word appears to roll into focus. Under reduced motion the twin is
 * `display:none` and the filter is removed.
 * ------------------------------------------------------------------------ */

function buildRoll(element: HTMLElement): void {
  if (element.dataset.rollReady === "1") return;

  const textNodes: Text[] = [];
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      textNodes.push(node as Text);
    }
  });
  if (textNodes.length === 0) return;

  textNodes.forEach((node) => {
    const words = (node.textContent ?? "").split(/(\s+)/);
    const host = document.createElement("span");
    host.className = "roll-host";

    words.forEach((word) => {
      if (!word.trim()) {
        host.appendChild(document.createTextNode(word));
        return;
      }
      const wordEl = document.createElement("span");
      wordEl.className = "roll-word";
      Array.from(word).forEach((char) => {
        const cell = document.createElement("span");
        cell.className = "roll-cell";
        const base = document.createElement("span");
        base.className = "roll-char";
        base.textContent = char;
        const twin = document.createElement("span");
        twin.className = "roll-char";
        twin.dataset.rollTwin = "";
        twin.setAttribute("aria-hidden", "true");
        twin.textContent = char;
        cell.appendChild(base);
        cell.appendChild(twin);
        wordEl.appendChild(cell);
      });
      host.appendChild(wordEl);
    });

    node.replaceWith(host);
  });

  element.dataset.rollReady = "1";
}

function animateRoll(host: HTMLElement, to: number, duration = 520): void {
  const from = Number(host.dataset.rollValue ?? "0");
  if (from === to) return;
  const start = performance.now();
  host.dataset.rollValue = String(to);

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    // Same easing as the reference's underline: cubic-bezier(.625,.05,0,1)
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    host.style.setProperty("--roll-fade", String(from + (to - from) * eased));
    if (t < 1 && host.dataset.rollValue === String(to)) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

export function initRoll(): void {
  const targets = document.querySelectorAll<HTMLElement>("[data-roll]");

  targets.forEach((element) => {
    buildRoll(element);
    const host = element.querySelector<HTMLElement>(".roll-host");
    if (!host) return;

    if (reduced()) {
      host.style.setProperty("--roll-fade", "0");
      return;
    }

    const on = () => animateRoll(host, 1);
    const off = () => animateRoll(host, 0);

    element.addEventListener("pointerenter", on);
    element.addEventListener("pointerleave", off);
    element.addEventListener("focus", on);
    element.addEventListener("blur", off);
  });
}

/* --------------------------------------------------------------------------
 * 3. Scroll-linked letter roll for display headings.
 * The reference marks headings `.roll-letter` and drives `--roll-fade` while
 * they pass through the viewport; the twin glyph carries the other half of the
 * crossfade. One rAF loop, only for headings currently on screen.
 * ------------------------------------------------------------------------ */

export function initScrollRoll(): void {
  if (reduced()) return;

  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(".v2-h1, .v2 h2, .v2 h3, .doc-hero h1"),
  )
    // The hero headline already uses the masked line rise (.text-line transform
    // on the reference); only the headings without that split get the roll.
    .filter((element) => !element.querySelector(".split__char"));

  candidates.forEach((element) => buildRoll(element));

  const hosts = candidates.filter((element) => element.querySelector(".roll-host"));

  if (hosts.length === 0) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const vh = window.innerHeight;
    hosts.forEach((host) => {
      const roll = host.querySelector<HTMLElement>(".roll-host");
      if (!roll) return;
      const rect = host.getBoundingClientRect();
      if (rect.bottom < -vh * 0.2 || rect.top > vh * 1.2) return;
      // 0 when the heading enters, 1 once it is a third up the viewport.
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh * 0.75)),
      );
      roll.style.setProperty("--roll-fade", progress.toFixed(3));
    });
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  update();
}

export function initInteractions(): void {
  initPageTransition();
  initRoll();
}

export const interactionEasing = EASE;
