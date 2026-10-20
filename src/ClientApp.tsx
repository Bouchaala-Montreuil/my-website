import { useEffect } from "react";
import { App } from "./App";
import { resolveRoute } from "./lib/routes";
import { initMotion } from "./lib/motion";

/** Resolves the route from the browser URL, then renders the shared app tree. */
export function ClientApp() {
  const route = resolveRoute(window.location.pathname);

  useEffect(() => {
    initMotion();

    // A slim header once the page has moved — the reference keeps the chrome
    // quiet and lets the type carry the page.
    const header = document.querySelector<HTMLElement>(".header");
    if (!header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      header.classList.toggle("header--scrolled", window.scrollY > 12);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [route.path]);

  return <App route={route} />;
}
