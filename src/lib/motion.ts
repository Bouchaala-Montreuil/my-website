/**
 * Motion runtime. Everything is progressive enhancement: the server-rendered
 * page is complete and readable before this file runs. The `.js` class (set in
 * the document head) is what allows the CSS to pre-hide elements, so a visitor
 * without JavaScript or with reduced motion never loses content.
 */

let started = false;

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initMotion(): void {
  if (started) return;
  started = true;

  const root = document.documentElement;

  if (reduced()) {
    root.classList.add("motion-reduced");
    document
      .querySelectorAll<HTMLElement>("[data-split], [data-reveal], [data-mask]")
      .forEach((element) => element.classList.add("is-in"));
    return;
  }

  root.classList.add("motion-on");

  const items = new Set<HTMLElement>();

  const collect = () => {
    document
      .querySelectorAll<HTMLElement>("[data-split='scroll'], [data-reveal], [data-mask]")
      .forEach((element) => items.add(element));
  };

  // A geometry check on scroll is used instead of IntersectionObserver: it is
  // immune to clipped or transformed boxes (a clipped figure has no
  // intersection area at all) and costs one rect per element.
  const show = (element: HTMLElement) => {
    element.classList.add("is-in");
    items.delete(element);
  };

  let frame = 0;
  const check = () => {
    frame = 0;
    const limit = window.innerHeight * 0.92;
    for (const element of Array.from(items)) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= limit && rect.bottom >= 0) show(element);
    }
  };
  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(check);
  };

  collect();
  check();

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });

  // Broad pass: tag the content blocks that sit below the fold so sections
  // arrive as they are scrolled to, with a small stagger inside a group.
  const auto = document.querySelectorAll<HTMLElement>(
    ".promo, .step, .work-teaser, .price__card, .market__row, .guarantee, .proof__item, .faq details, .doc-links li, .doc-metrics li",
  );
  auto.forEach((element, index) => {
    if (element.hasAttribute("data-reveal") || element.classList.contains("is-in")) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    element.setAttribute("data-reveal", "");
    element.style.setProperty("--d", `${(index % 4) * 70}ms`);
    items.add(element);
  });

  // Safety net: if a visitor never scrolls, show everything after a while.
  window.setTimeout(() => {
    document
      .querySelectorAll<HTMLElement>("[data-split], [data-reveal], [data-mask]")
      .forEach((element) => element.classList.add("is-in"));
  }, 6000);

  // Scroll-linked movement. One rAF, transform only.
  const layers = Array.from(
    document.querySelectorAll<HTMLElement>("[data-parallax]"),
  );

  if (layers.length > 0) {
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const layer of layers) {
        const rect = layer.getBoundingClientRect();
        if (rect.bottom < -vh * 0.2 || rect.top > vh * 1.2) continue;
        const speed = Number(layer.dataset.parallax) || 0.08;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        layer.style.setProperty(
          "--py",
          `${(-progress * speed * 100).toFixed(2)}px`,
        );
      }
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
  }

  // Re-scan after client-side navigation.
  window.addEventListener("feekza:navigate", () => {
    window.setTimeout(() => {
      collect();
      check();
    }, 40);
  });
}
