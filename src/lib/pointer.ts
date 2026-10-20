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
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", () => layer.classList.add("is-press"));
  window.addEventListener("pointerup", () => layer.classList.remove("is-press"));
  document.addEventListener("pointerover", (event) => state(event.target as Element));
  document.addEventListener("pointerleave", () => {
    visible = false;
    layer.classList.remove("is-visible");
  });

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
