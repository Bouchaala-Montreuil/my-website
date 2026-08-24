import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t, dir } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const image = imageRef.current;
    const stats = statsRef.current;

    if (!section || !title || !image || !stats) return;

    const ctx = gsap.context(() => {
      // Timeline for entrance
      const tl = gsap.timeline({ delay: 3.5 });

      // Title lines
      const titleLines = title.querySelectorAll('.title-line');
      gsap.set(titleLines, { opacity: 0, y: 100, rotateX: -20 });
      
      tl.to(titleLines, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Subtitle and CTAs
      const contentElements = title.querySelectorAll('.hero-content');
      gsap.set(contentElements, { opacity: 0, y: 40 });
      
      tl.to(contentElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.6');

      // Image reveal
      gsap.set(image, { clipPath: dir === 'rtl' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' });
      tl.to(image, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.4,
        ease: 'power3.inOut',
      }, '-=1.2');

      // Stats
      const statItems = stats.querySelectorAll('.stat-item');
      gsap.set(statItems, { opacity: 0, y: 30 });
      tl.to(statItems, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.8');

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(title, { y: self.progress * 100 });
          gsap.set(image.querySelector('img'), { y: self.progress * -50, scale: 1 + self.progress * 0.1 });
        },
      });

      // Floating shapes
      gsap.to('.hero-shape-1', {
        y: -30,
        rotation: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to('.hero-shape-2', {
        y: 20,
        rotation: -8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }, section);

    return () => ctx.revert();
  }, [dir]);

  return (
    <section ref={sectionRef} className="min-h-screen relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left — Text */}
        <div className="bg-teal flex flex-col justify-center px-8 md:px-16 lg:px-20 py-32 lg:py-20 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="hero-shape-1 absolute -top-20 -right-20 w-64 h-64 rounded-full bg-teal-dark/30 pointer-events-none" />
          <div className="hero-shape-2 absolute bottom-10 -left-10 w-40 h-40 rounded-full bg-teal-light/20 pointer-events-none" />

          <div ref={titleRef} className="relative z-10">
            <p className="hero-content label-sm text-cream/70 mb-6">
              {t('hero.badge')}
            </p>

            <h1 className="display-xxl text-cream mb-8" style={{ perspective: '1000px' }}>
              <span className="title-line block">{t('hero.title1')}</span>
              <span className="title-line block">{t('hero.title2')}</span>
              <span className="title-line block text-mustard">{t('hero.title3')}</span>
            </h1>

            <p className="hero-content body-xl text-cream/80 max-w-md mb-10">
              {t('hero.subtitle')}
            </p>

            <div className="hero-content flex flex-wrap gap-4">
              <MagneticButton href="#contact" className="btn btn-light" data-cursor="Start">
                {t('hero.cta1')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flip-rtl">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </MagneticButton>
              <MagneticButton href="#work" className="btn btn-outline-light" data-cursor="View">
                {t('hero.cta2')}
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Right — Image */}
        <div ref={imageRef} className="relative min-h-[50vh] lg:min-h-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/7675029/pexels-photo-7675029.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
            alt="Creative team working"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Stats overlay */}
          <div ref={statsRef} className="absolute bottom-0 left-0 right-0 bg-coral p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <StatPill value="147" label={t('hero.stat1')} />
                <StatPill value="€11M+" label={t('hero.stat2')} />
                <StatPill value="94%" label={t('hero.stat3')} />
              </div>
              <a href="#about" className="label-sm text-white/80 hover:text-white transition-colors flex items-center gap-2" data-cursor="More">
                {t('hero.learn')}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flip-rtl">
                  <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-item text-white">
      <span className="display-md block leading-none">{value}</span>
      <span className="body-sm opacity-80">{label}</span>
    </div>
  );
}
