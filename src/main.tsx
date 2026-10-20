import "./styles.css";

/**
 * The page ships as pre-rendered HTML. React is only needed for the menu, the
 * language state and the order form, so hydration is deferred until the page is
 * loaded (or until the visitor touches something). That keeps the initial
 * network race free for the document and the fonts, which is what Largest
 * Contentful Paint measures.
 */
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element missing");

let started = false;

async function hydrate(): Promise<void> {
  if (started) return;
  started = true;

  const [{ StrictMode, createElement }, { createRoot, hydrateRoot }, { ClientApp }] =
    await Promise.all([
      import("react"),
      import("react-dom/client"),
      import("./ClientApp"),
    ]);

  const tree = createElement(StrictMode, null, createElement(ClientApp));

  if (rootElement!.firstElementChild) {
    hydrateRoot(rootElement!, tree);
  } else {
    createRoot(rootElement!).render(tree);
  }
}

function schedule(): void {
  const idle = window.requestIdleCallback;
  if (typeof idle === "function") {
    idle(() => void hydrate(), { timeout: 1200 });
  } else {
    window.setTimeout(() => void hydrate(), 200);
  }
}

if (document.readyState === "complete") {
  schedule();
} else {
  window.addEventListener("load", schedule, { once: true });
}

// Never let a visitor interact with a page that has no handlers yet.
window.addEventListener("pointerdown", () => void hydrate(), { once: true, capture: true });
window.addEventListener("keydown", () => void hydrate(), { once: true, capture: true });
