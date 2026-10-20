/**
 * Pointer layer: a two-part cursor (dot + trailing ring), contextual states,
 * and magnetic buttons. Only runs for `(hover: hover) and (pointer: fine)`
 * devices and never under reduced motion, so touch and keyboard users get the
 * plain, native experience.
 *
 * The native cursor is only hidden after this module has successfully mounted
 * (`.has-cursor` on <html>), and text fields keep their I-beam.
 */

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* --------------------------------------------------------------------------
 * Typography magnet — the display line leans towards the pointer. Word level:
 * a char-level transform would fight the masked reveal and could clip glyphs.
 * ------------------------------------------------------------------------ */
function initTypeMagnet(): void {
  const heading = document.querySelector<HTMLElement>(".v2-h1");
  if (!heading) return;
  const words = Array.from(heading.querySelectorAll<HTMLElement>(".split__word"));
  if (words.length === 0) return;

  let frame = 0;
  let active = false;
  let mx = 0;
  let my = 0;

  const update = () => {
    frame = 0;
    words.forEach((word) => {
      const rect = word.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.hypot(dx, dy);
      const radius = 240;
      if (!active || dist > radius) {
        word.style.transform = "";
        return;
      }
      const pull = (1 - dist / radius) ** 2 * 7;
      const nx = dx / (dist || 1);
      const ny = dy / (dist || 1);
      // a touch of horizontal skew sells the "liquid type" without bending it
      word.style.transform = `translate3d(${(nx * pull).toFixed(2)}px, ${(ny * pull * 0.55).toFixed(2)}px, 0) skewX(${(nx * pull * 0.18).toFixed(2)}deg)`;
    });
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      mx = event.clientX;
      my = event.clientY;
      active = true;
      schedule();
    },
    { passive: true },
  );
  window.addEventListener("pointerleave", () => {
    active = false;
    schedule();
  });
}

/* --------------------------------------------------------------------------
 * Depth on the case plate: a restrained tilt, never more than 2.5 degrees.
 * ------------------------------------------------------------------------ */
function initTilt(): void {
  const panels = Array.from(document.querySelectorAll<HTMLElement>(".v2-case__media"));
  panels.forEach((panel) => {
    let frame = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      frame = 0;
      panel.style.transform = `perspective(1100px) rotateX(${tx.toFixed(2)}deg) rotateY(${ty.toFixed(2)}deg)`;
    };
    panel.addEventListener("pointermove", (event) => {
      const rect = panel.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      ty = px * 5;
      tx = -py * 4;
      panel.style.transition = "none";
      if (!frame) frame = requestAnimationFrame(apply);
    });
    const reset = () => {
      panel.style.transition = "transform .6s cubic-bezier(.19,1,.22,1)";
      panel.style.transform = "";
    };
    panel.addEventListener("pointerleave", reset);
  });
}

export function initPointer(): void {
  if (typeof window === "undefined") return;
  if (reduced()) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (document.documentElement.classList.contains("cursor-ready")) return;

  const root = document.documentElement;
  root.classList.add("has-cursor", "cursor-ready");

  const layer = document.createElement("div");
  layer.className = "cursor";
  layer.setAttribute("aria-hidden", "true");

  const ring = document.createElement("span");
  ring.className = "cursor__ring";
  const dot = document.createElement("span");
  dot.className = "cursor__dot";
  const label = document.createElement("span");
  label.className = "cursor__label";

  ring.appendChild(label);
  layer.append(ring, dot);
  document.body.appendChild(layer);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let rx = x;
  let ry = y;
  let dx = x;
  let dy = y;
  let frame = 0;
  let visible = false;

  const render = () => {
    frame = 0;
    // The ring lags the pointer, the dot tracks it closely: two speeds read as
    // weight rather than as lag.
    rx += (x - rx) * 0.16;
    ry += (y - ry) * 0.16;
    dx += (x - dx) * 0.55;
    dy += (y - dy) * 0.55;
    ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0)`;
    dot.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
    if (Math.abs(x - rx) > 0.2 || Math.abs(y - ry) > 0.2) {
      frame = requestAnimationFrame(render);
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  const onMove = (event: PointerEvent) => {
    x = event.clientX;
    y = event.clientY;
    if (!visible) {
      visible = true;
      layer.classList.add("is-visible");
      rx = x;
      ry = y;
    }
    schedule();
  };

  const state = (element: Element | null) => {
    layer.classList.remove("is-link", "is-view", "is-text");
    label.textContent = "";
    if (!element) return;

    const target = element.closest<HTMLElement>(
      "[data-cursor], a, button, summary, summary *",
    );
    if (!target) return;

    const kind = target.dataset.cursor;
    if (kind === "field") {
      layer.classList.add("is-field");
      label.textContent = target.dataset.cursorLabel ?? "Champ";
      return;
    }
    if (kind === "view") {
      layer.classList.add("is-view");
      label.textContent = target.dataset.cursorLabel ?? "Voir";
      return;
    }
    if (target.matches("input, textarea, select")) {
      layer.classList.add("is-text");
      return;
    }
    layer.classList.add("is-link");
    if (target.closest(".on-ink, [data-on-ink], .footer")) {
      layer.classList.add("is-ink");
    }
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", (event) => {
    layer.classList.add("is-press");

    // One ripple per press, anywhere on the page: feedback that reads as ink
    // rather than as a UI effect, and it never blocks the click.
    const ripple = document.createElement("span");
    ripple.className = "pointer-ripple";
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 700);
  });
  window.addEventListener("pointerup", () => layer.classList.remove("is-press"));
  document.addEventListener("pointerover", (event) => state(event.target as Element));
  document.addEventListener("pointerleave", () => {
    visible = false;
    layer.classList.remove("is-visible");
  });

  initTypeMagnet();
  initTilt();

  /* Magnetic controls: the element leans towards the pointer by at most 7 px. */
  const magnets = Array.from(
    document.querySelectorAll<HTMLElement>(".v2-btn, .header .btn--cta, .menu-toggle"),
  );

  magnets.forEach((element) => {
    element.classList.add("is-magnetic");
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const mx = event.clientX - (rect.left + rect.width / 2);
      const my = event.clientY - (rect.top + rect.height / 2);
      const pull = 0.16;
      element.style.setProperty("--mx", `${Math.max(-7, Math.min(7, mx * pull)).toFixed(2)}px`);
      element.style.setProperty("--my", `${Math.max(-7, Math.min(7, my * pull)).toFixed(2)}px`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--mx", "0px");
      element.style.setProperty("--my", "0px");
    });
  });
}
