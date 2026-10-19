import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    { title: t('how.s1'), desc: t('how.s1.desc') },
    { title: t('how.s2'), desc: t('how.s2.desc') },
    { title: t('how.s3'), desc: t('how.s3.desc') },
    { title: t('how.s4'), desc: t('how.s4.desc') },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector('.how-header');
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

      const cards = section.querySelectorAll('.how-card');
      gsap.set(cards, { opacity: 0, y: 50 });

      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={sectionRef} className="bg-cream px-8 md:px-16 lg:px-20 py-20 md:py-28">
      <div className="max-w-7xl mx-auto how-header">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-sm text-coral mb-4">{t('how.label')}</p>
          <h2 className="display-xl text-charcoal">
            {t('how.title1')} <span className="text-coral">{t('how.title2')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((s, i) => (
            <div key={s.title} className="how-card relative">
              <span
                className="display-lg text-coral/30 block mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {i + 1}
              </span>
              <h3 className="display-md text-charcoal mb-3">{s.title}</h3>
              <p className="body-md text-charcoal/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
