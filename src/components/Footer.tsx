import type { Content, Locale } from "@/content/types";
import { homePath } from "@/content";
import { CONTACT_EMAIL } from "@/config";
import { MailIcon } from "./Icons";

export function Footer({
  c,
  locale,
  linkPrefix = "",
}: {
  c: Content;
  locale: Locale;
  /** Prefix used on pages without the home sections (legal, 404). */
  linkPrefix?: string;
}) {
  const hrefFor = (href: string) => (href.startsWith("#") ? `${linkPrefix}${href}` : href);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <a className="brand" href={homePath(locale)}>
              <span className="brand__mark" aria-hidden="true">
                F
              </span>
              <span className="brand__word">
                Feekza
                <small>{c.locale === "fr" ? "sites sur mesure" : c.locale === "en" ? "custom websites" : "مواقع مخصصة"}</small>
              </span>
            </a>
            <p className="footer__about">{c.footer.about}</p>
            <p className="label" style={{ color: "rgba(244,236,220,.55)" }}>
              {c.footer.updated}
            </p>
          </div>

          <div>
            <h3>{c.footer.servicesTitle}</h3>
            <ul>
              {c.footer.services.map((link) => (
                <li key={link.href + link.label}>
                  <a href={hrefFor(link.href)}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{c.footer.companyTitle}</h3>
            <ul>
              {c.footer.company.map((link) => (
                <li key={link.href + link.label}>
                  <a href={hrefFor(link.href)}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{c.footer.contactTitle}</h3>
            <ul>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="footer__mail">
                  <MailIcon size={14} /> {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={hrefFor("#dossier")}>{c.footer.briefLink}</a>
              </li>
            </ul>

            <h3 style={{ marginTop: "1.4rem" }}>{c.footer.legalTitle}</h3>
            <ul>
              {c.footer.legal.map((link) => (
                <li key={link.href}>
                  <a href={hrefFor(link.href)}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{c.footer.rights}</p>
          <p>{c.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
