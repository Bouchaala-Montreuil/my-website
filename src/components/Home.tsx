import type { Content, Locale } from "@/content/types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Hero } from "./Sections/Hero";
import { Included } from "./Sections/Included";
import { Process } from "./Sections/Process";
import { Scope } from "./Sections/Scope";
import { Price } from "./Sections/Price";
import { Market } from "./Sections/Market";
import { Guarantee } from "./Sections/Guarantee";
import { Proof } from "./Sections/Proof";
import { Faq } from "./Sections/Faq";
import { Order } from "./Sections/Order";
import { PromoServices } from "./Sections/PromoServices";
import { WorkTeaser } from "./Sections/WorkTeaser";
import { Amount } from "./Amount";

export function Home({
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
      <main id="contenu">
        <Hero c={c} />

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <ul className="marquee__set" key={copy}>
                {c.ticker.map((item) => (
                  <li key={item}>
                    <span className="marquee__dot" />
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {locale === "fr" && <PromoServices />}

        <Included c={c} />
        <Process c={c} />
        <Scope c={c} />
        <Price c={c} />
        <Market c={c} />
        <Guarantee c={c} />
        <Proof c={c} />

        {locale === "fr" && <WorkTeaser />}

        <Faq c={c} />
        <Order c={c} />

        <div className="mobile-bar">
          <div className="mobile-bar__price">
            <strong><Amount value={c.hero.price} /></strong>
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
