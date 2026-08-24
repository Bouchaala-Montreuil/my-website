import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';

export default function Navigation() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: t('nav.discover'), href: '#services' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.pricing'), href: '#pricing' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    
    // Animate menu
    if (menuRef.current) {
      if (open) {
        gsap.fromTo(menuRef.current, 
          { opacity: 0 },
          { opacity: 1, duration: 0.4 }
        );
        gsap.fromTo(menuRef.current.querySelectorAll('.menu-item'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.2 }
        );
      }
    }
  }, [open]);

  // Entrance animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power3.out' }
      );
    }
  }, []);

  const cycleLang = () => {
    const langs: Array<'en' | 'fr' | 'ar'> = ['en', 'fr', 'ar'];
    const idx = langs.indexOf(lang);
    setLang(langs[(idx + 1) % langs.length]);
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-charcoal/95 backdrop-blur-lg' : ''
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-[70px]">
          {/* Logo */}
          <MagneticButton href="#" className="flex items-center gap-2 relative z-50" data-cursor="Home">
            <div className="w-9 h-9 rounded-xl bg-coral flex items-center justify-center transition-transform hover:scale-110 duration-300">
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>W</span>
            </div>
            <span className="text-cream font-bold text-lg tracking-tight hidden sm:block" style={{ fontFamily: 'var(--font-display)' }}>
              WEEKZA
            </span>
          </MagneticButton>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <MagneticButton
                key={l.label}
                href={l.href}
                className="px-4 py-2 text-cream/70 hover:text-cream text-sm font-medium transition-colors rounded-full hover:bg-white/5"
                strength={0.2}
              >
                {l.label}
              </MagneticButton>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <button
              onClick={cycleLang}
              className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/70 hover:text-cream hover:border-cream/40 transition-all text-xs font-bold uppercase"
              data-cursor="Switch"
            >
              {lang}
            </button>

            <MagneticButton
              href="#contact"
              className="btn btn-coral text-sm py-2 px-5 hidden sm:inline-flex"
              data-cursor="Contact"
            >
              {t('nav.contact')}
            </MagneticButton>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
              aria-label="Menu"
              data-cursor="Menu"
            >
              <span className={`w-5 h-[2px] bg-cream transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`w-5 h-[2px] bg-cream transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-[2px] bg-cream transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-charcoal flex items-center justify-center transition-all duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="menu-item display-md text-cream hover:text-coral transition-colors"
              data-cursor="View"
            >
              {l.label}
            </a>
          ))}
          <MagneticButton
            href="#contact"
            onClick={() => setOpen(false)}
            className="menu-item btn btn-coral mt-4"
            data-cursor="Contact"
          >
            {t('nav.contact')}
          </MagneticButton>

          {/* Language options in mobile menu */}
          <div className="menu-item flex gap-3 mt-6">
            {(['en', 'fr', 'ar'] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold uppercase transition-all ${
                  lang === l
                    ? 'bg-coral border-coral text-white'
                    : 'border-cream/30 text-cream/50 hover:text-cream hover:border-cream/60'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
