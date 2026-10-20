import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Add your real client testimonials here (EN/FR/AR quotes).
// Section is currently unmounted in App.tsx until real testimonials exist.
const testimonials: Array<{
  quote: { en: string; fr: string; ar: string };
  name: string;
  role: string;
  result: string;
}> = [];

export default function Testimonials() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Quote transition animation
  useEffect(() => {
    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [active]);

  // Entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.testimonial-content > *');
      gsap.set(elements, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const current = testimonials[active];

  return (
    <section ref={sectionRef} className="bg-pink px-8 md:px-16 lg:px-20 py-20 md:py-32 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-deep/20 animate-float" />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-charcoal/5 animate-float-delay" />

      <div className="max-w-5xl mx-auto text-center testimonial-content relative z-10">
        <p className="label-sm text-charcoal/60 mb-6">{t('testimonials.label')}</p>

        {/* Quote */}
        <div ref={quoteRef} key={active}>
          <p className="display-md text-charcoal leading-relaxed max-w-3xl mx-auto mb-10">
            "{current.quote[lang as keyof typeof current.quote]}"
          </p>

          <div className="mb-4">
            <span className="font-semibold text-charcoal" style={{ fontFamily: 'var(--font-display)' }}>
              {current.name}
            </span>
            <span className="text-charcoal/50 mx-2">—</span>
            <span className="text-charcoal/60">{current.role}</span>
          </div>

          <span className="inline-block px-4 py-2 rounded-full bg-charcoal text-cream text-sm font-semibold pulse-glow"
                style={{ fontFamily: 'var(--font-display)' }}>
            {current.result}
          </span>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-500 rounded-full ${
                active === i 
                  ? 'w-8 h-3 bg-charcoal' 
                  : 'w-3 h-3 bg-charcoal/25 hover:bg-charcoal/40'
              }`}
              aria-label={`Testimonial ${i + 1}`}
              data-cursor="Select"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
