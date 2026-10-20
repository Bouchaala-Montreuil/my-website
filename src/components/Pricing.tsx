import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector('.pricing-header');
      if (header) {
        gsap.set(header.children, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: header,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(header.children, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
            });
          },
          once: true,
        });
      }

      const card = section.querySelector('.pricing-card');
      if (card) {
        gsap.set(card, { opacity: 0, y: 80, rotateX: -15 });
        ScrollTrigger.create({
          trigger: card,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              ease: 'power3.out',
            });
          },
          once: true,
        });

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            y: -10,
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            duration: 0.4,
            ease: 'power2.out',
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: 'none',
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef}>
      {/* Header */}
      <div className="bg-cream px-8 md:px-16 lg:px-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto text-center pricing-header">
          <p className="label-sm text-coral mb-4">{t('pricing.label')}</p>
          <h2 className="display-xl text-charcoal mb-6">
            {t('pricing.title1')} <span className="text-coral">{t('pricing.title2')}</span>
          </h2>
          <p className="body-xl text-charcoal/60 max-w-lg mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>
      </div>

      {/* Single plan */}
      <div className="bg-cream px-8 md:px-16 lg:px-20 pb-20 md:pb-28">
        <div className="max-w-md mx-auto" style={{ perspective: '1000px' }}>
          <div className="pricing-card bg-coral px-8 md:px-10 py-14 flex flex-col" style={{ transformStyle: 'preserve-3d' }} data-cursor="Order">
            <h3 className="display-md text-white mb-3">{t('pricing.plan')}</h3>

            <div className="flex items-baseline gap-1 mb-4 text-white">
              <span className="body-lg opacity-70">€</span>
              <span className="display-lg">195</span>
              <span className="body-lg opacity-70">{t('pricing.permonth')}</span>
            </div>

            <p className="body-md text-white opacity-70 mb-8 pb-8 border-b border-white/20">
              {t('pricing.plan.desc')}
            </p>

            <ul className="space-y-3 mb-10 flex-1">
              {[
                t('pricing.plan.f1'),
                t('pricing.plan.f2'),
                t('pricing.plan.f3'),
                t('pricing.plan.f4'),
                t('pricing.plan.f5'),
                t('pricing.plan.f6'),
                t('pricing.plan.f7'),
              ].map((f) => (
                <li key={f} className="body-md text-white opacity-90 flex items-start gap-2">
                  <span className="text-mustard mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <MagneticButton href="#order" className="btn btn-dark justify-center" data-cursor="Order">
              {t('pricing.cta')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flip-rtl">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticButton>
          </div>
        </div>

        <p className="body-md text-charcoal/50 text-center mt-8">{t('pricing.note')}</p>
      </div>
    </section>
  );
}
