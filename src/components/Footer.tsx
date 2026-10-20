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
              <img className="brand__mark" src="/brand/feekza-f.webp" alt="" width={360} height={381} />
              <span className="brand__word">
                <span className="brand__name">FEEKZA</span>
                <small>{c.locale === "fr" ? "votre marketing" : c.locale === "en" ? "your marketing" : "تسويقك"}</small>
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
