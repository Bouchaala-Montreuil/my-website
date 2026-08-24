import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const plans = [
    {
      name: t('pricing.foundation'),
      price: '3,500',
      desc: t('pricing.foundation.desc'),
      features: ['5-page website', 'Mobile responsive', 'Basic SEO', 'Contact forms', 'Analytics', '30-day support'],
      bg: 'bg-cream',
      text: 'text-charcoal',
      accent: 'text-teal',
      btnClass: 'btn-dark',
      popular: false,
    },
    {
      name: t('pricing.growth'),
      price: '7,500',
      desc: t('pricing.growth.desc'),
      features: ['10+ page website', 'Brand identity', 'Advanced SEO', 'Booking system', 'Email automation', 'Google Business', '90-day support'],
      bg: 'bg-coral',
      text: 'text-white',
      accent: 'text-mustard',
      btnClass: 'btn-light',
      popular: true,
    },
    {
      name: t('pricing.enterprise'),
      price: 'Custom',
      desc: t('pricing.enterprise.desc'),
      features: ['Everything in Growth', 'Custom integrations', 'Ad management', 'Monthly calls', 'Dedicated manager', 'Ongoing optimization'],
      bg: 'bg-navy',
      text: 'text-cream',
      accent: 'text-coral',
      btnClass: 'btn-outline-light',
      popular: false,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header
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

      // Cards with 3D entrance
      const cards = section.querySelectorAll('.pricing-card');
      gsap.set(cards, { opacity: 0, y: 80, rotateX: -15 });

      ScrollTrigger.create({
        trigger: section.querySelector('.pricing-cards'),
        start: 'top 75%',
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Card hover scale
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            scale: 1.02, 
            y: -10,
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            duration: 0.4, 
            ease: 'power2.out' 
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            scale: 1, 
            y: 0,
            boxShadow: 'none',
            duration: 0.4, 
            ease: 'power2.out' 
          });
        });
      });
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

      {/* Cards */}
      <div className="pricing-cards grid grid-cols-1 md:grid-cols-3" style={{ perspective: '1000px' }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card ${plan.bg} px-8 md:px-10 py-14 md:py-20 flex flex-col`}
            style={{ transformStyle: 'preserve-3d' }}
            data-cursor={plan.popular ? 'Popular' : 'Select'}
          >
            {plan.popular && (
              <span className="inline-block self-start px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 pulse-glow"
                    style={{ fontFamily: 'var(--font-display)' }}>
                {t('pricing.popular')}
              </span>
            )}

            <h3 className={`display-md ${plan.text} mb-3`}>{plan.name}</h3>

            <div className={`flex items-baseline gap-1 mb-4 ${plan.text}`}>
              {plan.price !== 'Custom' && <span className="body-lg opacity-60">€</span>}
              <span className="display-lg">{plan.price}</span>
            </div>

            <p className={`body-md ${plan.text} opacity-60 mb-8 pb-8 border-b ${
              plan.bg === 'bg-cream' ? 'border-charcoal/10' : 'border-white/15'
            }`}>
              {plan.desc}
            </p>

            <ul className="space-y-3 mb-10 flex-1">
              {plan.features.map((f) => (
                <li key={f} className={`body-md ${plan.text} opacity-80 flex items-start gap-2`}>
                  <span className={`${plan.accent} mt-0.5`}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <MagneticButton
              href="#contact"
              className={`btn ${plan.btnClass} justify-center`}
              data-cursor="Go"
            >
              {plan.price === 'Custom' ? t('pricing.contact') : t('pricing.cta')}
            </MagneticButton>
          </div>
        ))}
      </div>
    </section>
  );
}
