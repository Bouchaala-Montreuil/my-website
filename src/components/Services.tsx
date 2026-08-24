import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    { title: t('services.strategy'), desc: t('services.strategy.desc'), icon: '◆' },
    { title: t('services.brand'), desc: t('services.brand.desc'), icon: '●' },
    { title: t('services.web'), desc: t('services.web.desc'), icon: '■' },
    { title: t('services.seo'), desc: t('services.seo.desc'), icon: '▲' },
    { title: t('services.marketing'), desc: t('services.marketing.desc'), icon: '◇' },
    { title: t('services.automation'), desc: t('services.automation.desc'), icon: '○' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = section.querySelectorAll('.services-header > *');
      gsap.set(headerElements, { opacity: 0, y: 50 });
      
      ScrollTrigger.create({
        trigger: section.querySelector('.services-header'),
        start: 'top 80%',
        onEnter: () => {
          gsap.to(headerElements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Service cards with stagger
      const cards = section.querySelectorAll('.service-card');
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Card hover effects
      cards.forEach((card) => {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('.service-title');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, { scale: 1.2, rotation: 90, duration: 0.4, ease: 'power2.out' });
          gsap.to(title, { color: '#D4A843', duration: 0.3 });
          gsap.to(card, { backgroundColor: 'rgba(255,255,255,0.08)', duration: 0.3 });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' });
          gsap.to(title, { color: '#F5EDE3', duration: 0.3 });
          gsap.to(card, { backgroundColor: 'transparent', duration: 0.3 });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef}>
      {/* Header on cream */}
      <div className="bg-cream px-8 md:px-16 lg:px-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto services-header">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <p className="label-sm text-coral mb-4">{t('services.label')}</p>
              <h2 className="display-xl text-charcoal">
                {t('services.title1')} <br className="hidden md:block" />
                {t('services.title2')} <span className="text-coral">{t('services.title3')}</span>
              </h2>
            </div>
            <p className="body-xl text-charcoal/70 max-w-md">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Grid on navy */}
      <div className="bg-navy px-8 md:px-16 lg:px-20 py-16 md:py-24 relative noise">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 relative z-10">
          {services.map((s) => (
            <div
              key={s.title}
              className="service-card p-8 md:p-10 border-b border-r border-white/10 transition-all duration-300"
              data-cursor="Explore"
            >
              <span className="service-icon text-coral text-2xl mb-6 block inline-block">{s.icon}</span>
              <h3 className="service-title display-md text-cream mb-3 transition-colors">
                {s.title}
              </h3>
              <p className="body-md text-cream/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
