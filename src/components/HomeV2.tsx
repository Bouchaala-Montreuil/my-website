import type { Content, Locale } from "@/content/types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ArrowRight, Check } from "./Icons";
import { Amount } from "./Amount";
import { Split } from "./Split";
import { Order } from "./Sections/Order";
import { homePromo, homeWork } from "@/content/services.fr";

/**
 * Home page built against the reference's own design tokens.
 *
 * Every number in the accompanying CSS block is taken from the reference's
 * published stylesheet: colours (#0004f6 / #201d1d / #f2f2f2 / #9bff60),
 * type scale (h1 clamp(2.9rem, 5.05vw, 5.44rem)), container (1728 px,
 * gutter clamp(20px, 2.9vw, 50px)), section rhythm clamp(4rem, 8vw, 8rem),
 * radii 12/8 px, hover easing cubic-bezier(.625,.05,0,1).
 * The copy, the numbers and the images are Feekza's.
 */
export function HomeV2({
  c,
  locale,
  currentPath,
}: {
  c: Content;
  locale: Locale;
  currentPath: string;
}) {
  const scrollTarget = locale === "fr" ? "#dossier" : "#offre";

  return (
    <>
      <Header c={c} locale={locale} currentPath={currentPath} inPageAnchors />
      <main id="contenu" className="v2">
        {/* Hero — reference: badge, display headline, paragraph, track record */}
        <section className="v2-hero">
          <div className="v2-container">
            <p className="v2-badge">
              <span className="v2-badge__dot" aria-hidden="true" />
              {c.hero.badge}
            </p>

            <h1 className="v2-h1">
              <Split text={c.hero.titleBefore} mode="load" step={16} />{" "}
              <em className="v2-h1__accent">
                <Split text={c.hero.titleAccent} mode="load" step={16} offset={110} />
              </em>
              {c.hero.titleAfter && !/^[.,;:!?…]/.test(c.hero.titleAfter) ? " " : null}
              <Split text={c.hero.titleAfter} mode="load" step={16} offset={220} />
            </h1>

            <div className="v2-hero__base">
              <div className="v2-hero__copy">
                <p className="v2-lead">{c.hero.lead}</p>
                <div className="v2-actions">
                  <a className="v2-btn" href={scrollTarget}>
                    {c.hero.ctaPrimary}
                    <ArrowRight />
                  </a>
                  <a className="v2-textlink" href="#offre">
                    {c.hero.ctaSecondary}
                  </a>
                </div>
                <p className="v2-note">
                  <Check size={14} />
                  {c.hero.ctaNote}
                </p>
              </div>

              <div className="v2-hero__facts">
                <p className="v2-label v2-record__title">L’offre en un coup d’œil</p>
                <dl className="v2-record">
                  <div>
                    <dt>Prix</dt>
                    <dd>
                      <Amount value={c.hero.price} />
                      <span>{c.hero.priceUnit}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Délai</dt>
                    <dd>
                      48–72<span>h</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Pages</dt>
                    <dd>
                      5<span>max</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Engagement</dt>
                    <dd>
                      6<span>mois</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Inclusion wall — the reference's client-logo wall, honestly replaced */}
        <section className="v2-wall" aria-label="Inclus dans l’offre">
          <div className="v2-container">
            <div className="v2-wall__head">
              <span className="v2-label">Tout est compris</span>
              <a className="v2-textlink" href="#offre">
                Voir le détail de l’offre
              </a>
            </div>
            <ul className="v2-wall__grid">
              {[
                ["5", "pages maximum"],
                ["Hébergement", "inclus"],
                ["Certificat", "SSL"],
                ["Email", "professionnel"],
                ["Nom de domaine", "1re année"],
                ["Modifications", "comprises"],
                ["Référencement", "technique"],
                ["Formulaire", "fonctionnel"],
              ].map(([a, b]) => (
                <li key={a + b}>
                  <strong>{a}</strong>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Offer — reference: three retainer columns, each with a checklist */}
        <section className="v2-offer" id="offre">
          <div className="v2-container">
            <header className="v2-head">
              <div>
                <span className="v2-label">{homePromo.head.label}</span>
                <h2>{homePromo.head.title}</h2>
              </div>
              <p>{homePromo.head.note}</p>
            </header>

            <div className="v2-tiers">
              {homePromo.items.map((item) => (
                <article key={item.href} className="v2-tier">
                  <p className="v2-tier__meta">
                    <span>{item.index}</span>
                    {item.tag}
                  </p>
                  <h3>{item.title}</h3>
                  <p className="v2-tier__body">{item.body}</p>
                  <a className="v2-tier__link" href={item.href}>
                    {item.cta}
                    <ArrowRight />
                  </a>
                </article>
              ))}
            </div>

            {locale === "fr" && (
              <p className="v2-offer__foot">
                <Check size={14} /> Prix fixe, écrit. Aucun frais de lancement, aucune commission média.
              </p>
            )}
          </div>
        </section>

        {/* Result — reference: one big measured result, 1/1 carousel counter */}
        <section className="v2-result">
          <div className="v2-container">
            <div className="v2-result__top">
              <span className="v2-label">Résultat mesuré</span>
              <p className="v2-result__counter" aria-hidden="true">
                <span>←</span>
                <span>→</span>
                1/1
              </p>
            </div>

            <div className="v2-result__body">
              <div className="v2-result__figure">
                <p className="v2-result__num">99</p>
                <p className="v2-result__cap">
                  Performance Lighthouse mobile, mesurée sur ce site.
                </p>
              </div>

              <div className="v2-result__copy">
                <h2>{homeWork.title}</h2>
                <p>{homeWork.body}</p>
                <div className="v2-result__metrics">
                  {homeWork.metrics.map((m) => (
                    <div key={m.label}>
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
                <a className="v2-textlink" href={homeWork.cta.href}>
                  {homeWork.cta.label}
                  <ArrowRight />
                </a>
              </div>
            </div>

            <p className="v2-label v2-record__title">L’offre en un coup d’œil</p>
            <dl className="v2-record">

        <div>
          <dt>Prix</dt>
          <dd>
            <Amount value={c.hero.price} />
            <span>{c.hero.priceUnit}</span>
          </dd>
        </div>
        <div>
          <dt>Délai</dt>
          <dd>
            48–72<span>h</span>
          </dd>
        </div>
        <div>
          <dt>Pages</dt>
          <dd>
            5<span>max</span>
          </dd>
        </div>
        <div>
          <dt>Engagement</dt>
          <dd>
            6<span>mois</span>
          </dd>
        </div>
      </dl>
          </div>
        </section>

        {/* Work — image-led card, 12 px radius */}
        <section className="v2-work">
          <div className="v2-container">
            <a className="v2-case" href="/realisations/">
              <div className="v2-case__media">
                <img
                  className="v2-case__desk"
                  src="/case-feekza.webp"
                  alt="La page d’accueil de Feekza sur grand écran"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="v2-case__phone"
                  src="/case-feekza-mobile.webp"
                  alt="La même page sur téléphone"
                  width={390}
                  height={844}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="v2-case__meta">
                <h2>Ce site, conçu puis mesuré</h2>
                <p>
                  5 pages, trois langues, formulaire de dossier et paiement Stripe. 99/100 en
                  performance mobile, zéro violation axe-core.
                </p>
                <span className="v2-case__link">
                  Lire l’étude de cas
                  <ArrowRight />
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* Marquee — the reference runs a keyword strip across the page */}
        <div className="v2-marquee" aria-hidden="true">
          <div className="v2-marquee__track">
            {[0, 1].map((copy) => (
              <span key={copy}>
                Création de site <i>—</i> Référencement <i>—</i> Marketing <i>—</i> Mesure <i>—</i>
              </span>
            ))}
          </div>
        </div>

        {/* Process — reference numbers its steps 01 → 04 */}
        <section className="v2-process">
          <div className="v2-container">
            <header className="v2-head v2-head--split">
              <div>
                <span className="v2-label">{c.process.head.label}</span>
                <h2>{c.process.head.title}</h2>
              </div>
              <p>{c.process.head.note}</p>
            </header>

            <ol className="v2-steps">
              {c.process.steps.map((step, i) => (
                <li key={step.title}>
                  <span className="v2-steps__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  {step.when && <span className="v2-steps__meta">{step.when}</span>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Order c={c} />

        <div className="mobile-bar">
          <div className="mobile-bar__price">
            <strong>
              <Amount value={c.hero.price} />
            </strong>
            <span>{c.hero.priceUnit}</span>
          </div>
          <a className="btn btn--coral btn--sm" href="#dossier">
            {c.navCta}
          </a>
        </div>
      </main>
      <Footer c={c} locale={locale} />
    </>
  );
}
