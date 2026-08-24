import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Maison Laurent',
    type: 'Fine Dining',
    result: '+212%',
    resultLabel: 'reservations',
    image: 'https://images.pexels.com/photos/8856502/pexels-photo-8856502.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200',
    bg: 'bg-teal',
    textColor: 'text-cream',
  },
  {
    title: 'Noir Coffee Lab',
    type: 'Specialty Café',
    result: '+340%',
    resultLabel: 'online sales',
    image: 'https://images.pexels.com/photos/16999510/pexels-photo-16999510.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200',
    bg: 'bg-coral',
    textColor: 'text-white',
  },
  {
    title: 'Dr. Chen Aesthetics',
    type: 'Medical Practice',
    result: '+178%',
    resultLabel: 'new patients',
    image: 'https://images.pexels.com/photos/5619462/pexels-photo-5619462.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200',
    bg: 'bg-navy',
    textColor: 'text-cream',
  },
  {
    title: 'APEX Performance',
    type: 'Fitness Studio',
    result: '+267%',
    resultLabel: 'memberships',
    image: 'https://images.pexels.com/photos/7031706/pexels-photo-7031706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200',
    bg: 'bg-mustard',
    textColor: 'text-charcoal',
  },
];

export default function Portfolio() {
  const { t, dir } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header
      const header = section.querySelector('.portfolio-header');
      if (header) {
        gsap.set(header.children, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: header,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(header.children, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
            });
          },
          once: true,
        });
      }

      // Project rows
      const rows = section.querySelectorAll('.project-row');
      rows.forEach((row, i) => {
        const content = row.querySelector('.project-content');
        const image = row.querySelector('.project-image');
        const img = row.querySelector('.project-image img');
        const result = row.querySelector('.result-number');

        if (!content || !image || !img) return;

        // Set initial states
        gsap.set(content?.children, { opacity: 0, x: i % 2 === 0 ? -50 : 50 });
        gsap.set(image, { clipPath: dir === 'rtl' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' });
        gsap.set(img, { scale: 1.3 });

        ScrollTrigger.create({
          trigger: row,
          start: 'top 70%',
          onEnter: () => {
            // Animate content
            gsap.to(content?.children, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
            });

            // Image reveal
            gsap.to(image, {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.2,
              ease: 'power3.inOut',
            });

            // Image scale
            gsap.to(img, {
              scale: 1,
              duration: 1.4,
              ease: 'power2.out',
            });

            // Counter animation
            if (result) {
              const target = parseInt(result.getAttribute('data-value') || '0');
              gsap.to({ val: 0 }, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                  result.textContent = '+' + Math.round(this.targets()[0].val) + '%';
                }
              });
            }
          },
          once: true,
        });

        // Parallax on scroll
        ScrollTrigger.create({
          trigger: row,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(img, { y: self.progress * 50 - 25 });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [dir]);

  return (
    <section id="work" ref={sectionRef}>
      {/* Header */}
      <div className="bg-charcoal px-8 md:px-16 lg:px-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto portfolio-header">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <p className="label-sm text-coral mb-4">{t('portfolio.label')}</p>
              <h2 className="display-xl text-cream">
                {t('portfolio.title1')} <br className="hidden md:block" />
                <span className="text-coral">{t('portfolio.title2')}</span>
              </h2>
            </div>
            <p className="body-xl text-cream/60 max-w-md">
              {t('portfolio.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Projects */}
      {projects.map((p, i) => (
        <div key={p.title} className={`project-row grid grid-cols-1 lg:grid-cols-2`}>
          {/* Content */}
          <div
            className={`project-content ${p.bg} flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-24 ${
              i % 2 === 1 ? 'lg:order-2' : ''
            }`}
          >
            <p className={`label-sm ${p.textColor} opacity-60 mb-4`}>{p.type}</p>
            <h3 className={`display-lg ${p.textColor} mb-4`}>{p.title}</h3>
            <div className="flex items-baseline gap-2 mb-8">
              <span
                className={`result-number display-xl ${p.textColor}`}
                data-value={p.result.replace(/[^0-9]/g, '')}
              >
                +0%
              </span>
              <span className={`body-lg ${p.textColor} opacity-70`}>{p.resultLabel}</span>
            </div>
            <MagneticButton
              href="#contact"
              className={`btn self-start ${p.textColor === 'text-charcoal' ? 'btn-outline-dark' : 'btn-outline-light'}`}
              data-cursor="View"
            >
              {t('portfolio.cta')}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flip-rtl">
                <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticButton>
          </div>
          
          {/* Image */}
          <div
            className={`project-image relative min-h-[400px] lg:min-h-[500px] overflow-hidden ${
              i % 2 === 1 ? 'lg:order-1' : ''
            }`}
          >
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
