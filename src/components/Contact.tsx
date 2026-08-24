import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t, dir } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' });
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate form out
    const formEl = sectionRef.current?.querySelector('.contact-form');
    if (formEl) {
      gsap.to(formEl, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => setSubmitted(true),
      });
    } else {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const leftContent = section.querySelector('.contact-left');
      const rightContent = section.querySelector('.contact-right');

      if (leftContent) {
        gsap.set(leftContent.children, { opacity: 0, x: dir === 'rtl' ? 50 : -50 });
        ScrollTrigger.create({
          trigger: leftContent,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(leftContent.children, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
            });
          },
          once: true,
        });
      }

      if (rightContent) {
        gsap.set(rightContent, { opacity: 0, x: dir === 'rtl' ? -50 : 50 });
        ScrollTrigger.create({
          trigger: rightContent,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(rightContent, {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              delay: 0.2,
            });
          },
          once: true,
        });
      }

      // Floating shapes
      gsap.to('.contact-shape', {
        y: -20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
      });
    }, section);

    return () => ctx.revert();
  }, [dir]);

  // Success animation
  useEffect(() => {
    if (submitted) {
      const success = sectionRef.current?.querySelector('.success-message');
      if (success) {
        gsap.fromTo(success,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );
      }
    }
  }, [submitted]);

  return (
    <section id="contact" ref={sectionRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <div className="contact-left bg-teal flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-24 relative overflow-hidden">
          <div className="contact-shape absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-teal-dark/40 pointer-events-none" />
          <div className="contact-shape absolute top-20 -right-10 w-32 h-32 rounded-full bg-teal-light/20 pointer-events-none" />
          
          <div className="relative z-10">
            <p className="label-sm text-cream/60 mb-4">{t('contact.label')}</p>
            <h2 className="display-xl text-cream mb-8">
              {t('contact.title1')} <br />
              {t('contact.title2')} <span className="text-mustard">{t('contact.title3')}</span>
            </h2>
            <p className="body-xl text-cream/70 mb-12 max-w-md">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-6">
              {[
                { icon: '✉️', label: t('contact.email'), value: 'hello@weekza.com' },
                { icon: '⚡', label: t('contact.response'), value: t('contact.response.val') },
                { icon: '🌍', label: t('contact.location'), value: t('contact.location.val') },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="label-sm text-cream/50">{c.label}</div>
                    <div className="body-lg text-cream">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="contact-right bg-charcoal px-8 md:px-16 lg:px-20 py-16 md:py-24">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="contact-form space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label={`${t('contact.name')} *`}
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <InputField
                  label={`${t('contact.email')} *`}
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label={t('contact.company')}
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                />
                <div>
                  <label className="label-sm text-cream/50 mb-2 block">{t('contact.budget')}</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-cream focus:border-coral focus:outline-none transition-colors appearance-none cursor-pointer"
                    data-cursor="Select"
                  >
                    <option value="" className="bg-charcoal">Select...</option>
                    <option value="3-5k" className="bg-charcoal">€3k – €5k</option>
                    <option value="5-10k" className="bg-charcoal">€5k – €10k</option>
                    <option value="10-25k" className="bg-charcoal">€10k – €25k</option>
                    <option value="25k+" className="bg-charcoal">€25k+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label-sm text-cream/50 mb-2 block">{t('contact.goals')} *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-cream focus:border-coral focus:outline-none transition-colors resize-none"
                  placeholder={t('contact.goals.placeholder')}
                  data-cursor="Type"
                />
              </div>
              <MagneticButton className="btn btn-coral w-full justify-center" data-cursor="Send">
                {t('contact.send')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flip-rtl">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </MagneticButton>
            </form>
          ) : (
            <div className="success-message text-center py-16">
              <div className="text-5xl mb-6">✓</div>
              <h3 className="display-md text-cream mb-3">{t('contact.sent')}</h3>
              <p className="body-lg text-cream/60">{t('contact.sent.desc')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label-sm text-cream/50 mb-2 block">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-cream focus:border-coral focus:outline-none transition-colors"
        data-cursor="Type"
      />
    </div>
  );
}
