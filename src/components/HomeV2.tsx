import type { Content, Locale } from "@/content/types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ArrowRight, Check } from "./Icons";
import { Amount } from "./Amount";
import { Split } from "./Split";
import { InkField } from "./InkField";
import { Order } from "./Sections/Order";
import { CONTACT_EMAIL } from "@/config";

/**
 * The home page, ordered by what a visitor needs to decide.
 *
 * 1. what is sold, for whom, at what price          → hero
 * 2. what is included                                → the wall
 * 3. the website offer, and only then the rest       → #offre
 * 4. what can actually be proven                     → #preuves
 * 5. what protects the buyer                         → #previsualisation
 * 6. how it happens                                  → process
 * 7. the objections, answered                        → #questions
 * 8. the way in                                      → #dossier
 *
 * Website creation is the offer. SEO and marketing are a second, clearly
 * separated path for the visitor who already has a site.
 */

const INCLUDED: [string, string][] = [
  ["5", "pages maximum"],
  ["Hébergement", "inclus"],
  ["Certificat", "SSL"],
  ["Email", "professionnel"],
  ["Nom de domaine", "1re année"],
  ["Modifications", "comprises"],
  ["Référencement", "technique"],
  ["Formulaire", "fonctionnel"],
];

const SECONDARY = [
  {
    title: "Référencement",
    body: "Le socle technique est déjà dans chaque site. Le travail éditorial — intentions, plan de pages, contenus, maillage — se chiffre après un audit écrit.",
    href: "/referencement-seo/",
    cta: "Voir la méthode",
  },
  {
    title: "Marketing digital",
    body: "Fiche Google, pages locales, campagnes Google Ads. Un objectif, un canal, une mesure. Le budget publicitaire reste chez vous, sans commission.",
    href: "/marketing-digital/",
    cta: "Voir le cadre",
  },
];

const FAQ = [
  {
    q: "Combien de temps avant d’être en ligne ?",
    a: "La première version arrive sous 48–72 heures après réception de vos textes, photos et informations. La mise en ligne suit votre validation. Le délai ne court pas avant que nous ayons vos éléments : personne ne peut tenir un délai honnête sans eux.",
  },
  {
    q: "Que se passe-t-il si la première version ne me plaît pas ?",
    a: "Vous demandez des modifications, que nous appliquons sous 24 heures. Si, après ces révisions, la version ne vous convient toujours pas, le montant réglé vous est remboursé et le projet s’arrête.",
  },
  {
    q: "Le site m’appartient-il ?",
    a: "Vos contenus, vos photos et votre nom de domaine vous appartiennent. Le code et l’hébergement restent gérés par Feekza pendant l’abonnement. Si vous partez, nous vous remettons vos contenus et transférons le domaine.",
  },
  {
    q: "Pourquoi pas un constructeur de site à 15 € par mois ?",
    a: "C’est moins cher, et c’est un choix valable si vous avez le temps de le faire vous-même. Notre offre, c’est quelqu’un qui conçoit, héberge, corrige et maintient — sans que vous appreniez un outil. Si l’autonomie complète est votre priorité, un constructeur sera plus adapté, et nous vous le dirons.",
  },
  {
    q: "Travaillez-vous avec des artisans et des indépendants ?",
    a: "Oui, c’est notre clientèle principale : indépendants, artisans, professions libérales, petites entreprises et associations. Le périmètre de cinq pages est volontairement étroit pour que le prix et le délai restent tenables.",
  },
];

export function HomeV2({
  c,
  locale,
  currentPath,
}: {
  c: Content;
  locale: Locale;
  currentPath: string;
}) {
  return (
    <>
      <Header c={c} locale={locale} currentPath={currentPath} inPageAnchors />
      <main id="contenu" className="v2">
        {/* 1 — what it is, for whom, at what price */}
        <section className="v2-hero">
          <div className="v2-container">
            <p className="v2-badge">
              <span className="v2-badge__dot" aria-hidden="true" />
              Sites web pour indépendants, artisans et petites entreprises
            </p>

            <h1 className="v2-h1">
              <Split text="Votre site web," mode="load" step={16} />{" "}
              <em className="v2-h1__accent">
                <Split text="en 72 heures." mode="load" step={16} offset={110} />
              </em>
            </h1>

            <InkField />

            <div className="v2-hero__base">
              <div className="v2-hero__copy">
                <p className="v2-lead">
                  Jusqu’à 5 pages conçues pour votre activité, hébergées et maintenues pour
                  195 € TTC par mois. Aucun frais de lancement, six mois d’engagement, puis un
                  mois de préavis. Première version sous 48–72 heures.
                </p>
                <div className="v2-actions">
                  <a className="v2-btn" href="#dossier">
                    Ouvrir un dossier
                    <ArrowRight />
                  </a>
                  <a className="v2-textlink" href="#offre">
                    Voir ce qui est compris
                  </a>
                </div>
                <p className="v2-note">
                  <Check size={14} />
                  Deux minutes. Aucune carte bancaire demandée pour envoyer le dossier.
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

        {/* 2 — the inclusion wall */}
        <section className="v2-wall" aria-label="Inclus dans l’offre">
          <div className="v2-container">
            <div className="v2-wall__head">
              <span className="v2-label">Tout est compris</span>
              <a className="v2-textlink" href="#offre">
                Voir le détail de l’offre
              </a>
            </div>
            <ul className="v2-wall__grid">
              {INCLUDED.map(([a, b]) => (
                <li key={a + b}>
                  <strong>{a}</strong>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 — the website offer, first and alone */}
        <section className="v2-offer" id="offre">
          <div className="v2-container">
            <header className="v2-head">
              <div>
                <span className="v2-label">01 — Création de site</span>
                <h2>Un site vitrine complet, à prix fixe.</h2>
              </div>
              <p>
                Cinq pages — accueil, services, à propos, réalisations, contact — conçues pour
                votre activité, pas un thème acheté. Révisions comprises, hébergement et
                maintenance inclus.
              </p>
            </header>

            <div className="v2-primary">
              <ul className="v2-primary__list">
                <li>
                  <strong>195 € TTC par mois</strong>, sans frais de lancement. 2 340 € sur les
                  douze premiers mois, tout compris.
                </li>
                <li>
                  <strong>Première version sous 48–72 h</strong> après réception de vos textes et
                  photos. Vous validez avant la mise en ligne.
                </li>
                <li>
                  <strong>Un périmètre écrit</strong> avant le premier euro : ce qui est inclus, ce
                  qui ne l’est pas, et comment vous sortez.
                </li>
              </ul>
              <div className="v2-primary__foot">
                <a className="v2-btn" href="/creation-site-web/">
                  Voir le détail du service
                  <ArrowRight />
                </a>
                <a className="v2-textlink" href="#dossier">
                  Ouvrir un dossier
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3b — the second path, explicitly second */}
        <section className="v2-secondary" aria-labelledby="second-path">
          <div className="v2-container">
            <header className="v2-head v2-head--split">
              <div>
                <span className="v2-label">02 — Déjà un site ?</span>
                <h2 id="second-path">Vous cherchez plus qu’un site ?</h2>
              </div>
              <p>
                Deux prestations à la demande, sur devis écrit et après audit. Elles ne sont pas
                nécessaires pour commander un site, et nous le disons quand elles ne servent à
                rien.
              </p>
            </header>

            <ul className="v2-secondary__list">
              {SECONDARY.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <a className="v2-tier__link" href={item.href}>
                    {item.cta}
                    <ArrowRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — what can actually be proven */}
        <section className="v2-proof" id="preuves">
          <div className="v2-container">
            <header className="v2-head v2-head--split">
              <div>
                <span className="v2-label">03 — Preuves</span>
                <h2>Ce que nous pouvons prouver aujourd’hui.</h2>
              </div>
              <p>
                Pas de logo client, pas de témoignage inventé, pas de chiffre sans outil. Ce qui
                suit est vérifiable en deux clics.
              </p>
            </header>

            <div className="v2-proof__grid">
              <article className="v2-proof__card">
                <p className="v2-proof__num">
                  0<span> requête tierce</span>
                </p>
                <h3>Ce site, inspectable</h3>
                <p>
                  Aucune police distante, aucun traceur, aucun cookie publicitaire : le site ne
                  contacte aucun autre domaine, sauf Formspree au moment où vous envoyez le
                  dossier. Les quatorze pages sont pré-rendues — le texte existe même sans
                  JavaScript — et l’accessibilité a été vérifiée page par page (axe-core, WCAG
                  2.2 AA).
                </p>
                <a className="v2-tier__link" href="/realisations/">
                  Voir les mesures et la méthode
                  <ArrowRight />
                </a>
              </article>

              <article className="v2-proof__card">
                <p className="v2-proof__num">
                  3<span> places</span>
                </p>
                <h3>Nos premiers dossiers</h3>
                <p>
                  Feekza n’a pas encore de client à publier. Plutôt que d’inventer des références,
                  nous ouvrons trois places de premier dossier : le même prix, le même périmètre,
                  et une étude de cas publiée avec votre accord écrit — contexte, décisions,
                  mesure avant et après. Sans accord, rien n’est publié.
                </p>
                <a className="v2-tier__link" href="/realisations/">
                  Ce qui sera publié
                  <ArrowRight />
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* 5 — what protects the buyer */}
        <section className="v2-guarantee" id="previsualisation">
          <div className="v2-container">
            <header className="v2-head v2-head--split">
              <div>
                <span className="v2-label">04 — Cadre</span>
                <h2>Ce qui vous protège avant de payer.</h2>
              </div>
              <p>Quatre engagements écrits, appliqués sans exception.</p>
            </header>

            <ul className="v2-guarantee__list">
              <li>
                <strong>Un périmètre écrit avant le premier euro.</strong> Ce qui est inclus, ce qui
                ne l’est pas, le prix, le délai, le mode de paiement.
              </li>
              <li>
                <strong>Révisions sous 24 h.</strong> Vous indiquez ce qui doit changer, nous
                l’appliquons, sans compter les allers-retours.
              </li>
              <li>
                <strong>Remboursé si la version ne vous convient pas</strong> après les révisions.
                Le projet s’arrête, le montant réglé vous est rendu.
              </li>
              <li>
                <strong>Sortie écrite à six mois.</strong> Ensuite mensuel, résiliable avec un mois
                de préavis, sans reconduction forcée.
              </li>
            </ul>
          </div>
        </section>

        {/* 6 — how it happens */}
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

        {/* 7 — the objections */}
        <section className="v2-faq" id="questions">
          <div className="v2-container">
            <header className="v2-head v2-head--split">
              <div>
                <span className="v2-label">05 — Questions</span>
                <h2>Ce qu’on nous demande avant de signer.</h2>
              </div>
              <p>
                Une question qui n’est pas là ? Écrivez à{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> — nous répondons sous un
                jour ouvré, même sans projet.
              </p>
            </header>

            <div className="faq v2-faq__list">
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>
                    <span>{item.q}</span>
                    <span className="faq__sign" aria-hidden="true" />
                  </summary>
                  <div className="faq__answer">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
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
