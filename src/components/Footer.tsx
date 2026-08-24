import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { t } = useLang();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // CTA section animation
      const cta = footer.querySelector('.footer-cta');
      if (cta) {
        gsap.set(cta.children, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: cta,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(cta.children, {
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

      // Footer links animation
      const cols = footer.querySelectorAll('.footer-col');
      gsap.set(cols, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: footer.querySelector('.footer-links'),
        start: 'top 85%',
        onEnter: () => {
          gsap.to(cols, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-charcoal">
      {/* Pre-footer CTA */}
      <div className="bg-mustard px-8 md:px-16 lg:px-20 py-16 md:py-24 text-center footer-cta">
        <h2 className="display-lg text-charcoal mb-6 max-w-2xl mx-auto">
          {t('footer.cta')}
        </h2>
        <MagneticButton href="#contact" className="btn btn-dark" data-cursor="Let's Go">
          {t('footer.btn')}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flip-rtl">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </MagneticButton>
      </div>

      {/* Footer content */}
      <div className="footer-links px-8 md:px-16 lg:px-20 py-14 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6">
          {/* Brand */}
          <div className="footer-col col-span-2 md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-coral flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>W</span>
              </div>
              <span className="text-cream font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>WEEKZA</span>
            </div>
            <p className="body-sm text-cream/40 max-w-[260px]">
              {t('footer.desc')}
            </p>
          </div>

          {[
            { title: t('footer.services'), items: ['Strategy', 'Branding', 'Development', 'SEO', 'Marketing', 'Automation'] },
            { title: t('footer.company'), items: ['About', 'Work', 'Pricing', 'Contact'] },
            { title: t('footer.legal'), items: ['Privacy', 'Terms', 'Cookies'] },
          ].map((col) => (
            <div key={col.title} className="footer-col md:col-span-2">
              <p className="label-sm text-cream/40 mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="body-sm text-cream/60 hover:text-cream transition-colors" data-cursor="Link">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-8 md:px-16 lg:px-20 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="body-sm text-cream/30">{t('footer.rights')}</span>
          <span className="body-sm text-cream/20">{t('footer.built')}</span>
        </div>
      </div>
    </footer>
  );
}
