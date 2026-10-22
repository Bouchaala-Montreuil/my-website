import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Content, Locale } from "@/content/types";
import { homePath } from "@/content";
import { CloseIcon, MenuIcon } from "./Icons";

interface HeaderProps {
  c: Content;
  currentPath: string;
  locale: Locale;
  /** False on pages that do not contain the home sections (legal, 404). */
  inPageAnchors?: boolean;
}

export function Header({ c, locale, currentPath, inPageAnchors = false }: HeaderProps) {
  const homeHref = homePath(locale);
  // On legal / 404 pages the section anchors must resolve against the home page.
  const anchor = (href: string) =>
    href.startsWith("#") && !inPageAnchors ? `${homeHref}${href}` : href;

  const isCurrent = (href: string) =>
    href.startsWith("/") && currentPath === (href.endsWith("/") ? href : `${href}/`);

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // The panel is modal: everything behind it must leave the a11y tree too.
    const behind = Array.from(document.querySelectorAll<HTMLElement>("main, .footer"));
    behind.forEach((element) => element.setAttribute("inert", ""));

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      const panel = panelRef.current;
      if (event.key !== "Tab" || !panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !panel.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      behind.forEach((element) => element.removeAttribute("inert"));
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="header" data-path={currentPath}>
      <div className="wrap header__inner" inert={open ? true : undefined}>
        <a className="brand" href={homeHref}>
          <img className="brand__mark" src="/brand/feekza-f.webp" alt="" width={360} height={381} />
          <span className="brand__word">
            <span className="brand__name">FEEKZA</span>
            <small>{c.locale === "fr" ? "votre marketing" : c.locale === "en" ? "your marketing" : "تسويقك"}</small>
          </span>
        </a>

        <nav className="nav" aria-label={c.menu.navLabel}>
          {c.nav.map((item) => (
            <a
              key={item.href}
              href={anchor(item.href)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="btn btn--coral btn--sm btn--cta" data-roll="" href={anchor("#dossier")}>
            {c.navCta}
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? c.menu.close : c.menu.open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span aria-hidden="true">{c.menu.label}</span>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="mobile-panel"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={c.menu.navLabel}
        >
          <div className="mobile-panel__top">
            <span className="brand__word" aria-hidden="true">
              Feekza
            </span>
            <button
              ref={closeRef}
              type="button"
              className="menu-toggle menu-toggle--light"
              onClick={() => setOpen(false)}
              aria-label={c.menu.close}
            >
              <CloseIcon />
              <span aria-hidden="true">{c.menu.close}</span>
            </button>
          </div>

          <nav className="menu-nav" aria-label={c.menu.navLabel}>
            {c.nav.map((item, index) => (
              <a
                key={item.href}
                href={anchor(item.href)}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                style={{ "--i": index } as CSSProperties}
              >
                <span className="menu-nav__num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="menu-nav__label roll" aria-hidden="true">
                  <span>{item.label}</span>
                  <span>{item.label}</span>
                </span>
                <span className="sr-only">{item.label}</span>
                <span className="menu-nav__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </nav>

          <div className="mobile-panel__foot">
            <a
              className="btn btn--coral btn--wide btn--sweep"
              href={anchor("#dossier")}
              onClick={() => setOpen(false)}
            >
              {c.navCta}
            </a>
          </div>

          <span className="menu-ghost" aria-hidden="true">
            Feekza
          </span>
        </div>
      )}
    </header>
  );
}
