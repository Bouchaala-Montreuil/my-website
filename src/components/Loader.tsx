import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLang } from '../context/LanguageContext';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const progressBar = progressRef.current;
    const text = textRef.current;

    if (!container || !logo || !progressBar || !text) return;

    const tl = gsap.timeline();

    // Initial state
    gsap.set([logo, text, progressBar.parentElement], { opacity: 0, y: 30 });
    gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left' });

    // Animate in
    tl.to(logo, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to(text, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .to(progressBar.parentElement, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');

    // Progress animation
    const progressTl = gsap.timeline({ delay: 0.8 });

    progressTl.to({ val: 0 }, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: function () {
        const val = Math.round(this.targets()[0].val);
        setProgress(val);
        gsap.set(progressBar, { scaleX: val / 100 });
      },
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete: () => onComplete(),
        });

        exitTl
          .to([text, progressBar.parentElement], {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in',
            stagger: 0.1,
          })
          .to(logo, {
            scale: 12,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in',
          }, '-=0.2')
          .to(container, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
          }, '-=0.4');
      },
    });

    // Logo pulse glow
    gsap.to(logo.querySelector('.logo-circle'), {
      boxShadow: '0 0 50px rgba(232, 93, 74, 0.5)',
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
      progressTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-charcoal flex flex-col items-center justify-center"
    >
      {/* Soft background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-coral/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-teal/5 blur-3xl animate-float-delay" />
      </div>

      {/* Logo — CIRCLE with orbiting dot */}
      <div ref={logoRef} className="relative mb-8">
        {/* Main circle */}
        <div className="logo-circle w-20 h-20 rounded-full bg-coral flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
            W
          </span>
        </div>

        {/* Orbiting dot — spins on a larger circular path */}
        <div className="absolute inset-[-12px] animate-spin" style={{ animationDuration: '2.5s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-mustard shadow-[0_0_10px_rgba(212,168,67,0.6)]" />
        </div>

        {/* Second slower orbit — subtle */}
        <div className="absolute inset-[-24px] animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-light/60" />
        </div>
      </div>

      {/* Text */}
      <div ref={textRef} className="text-center mb-8">
        <h1 className="text-cream text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          WEEKZA
        </h1>
        <p className="text-cream/50 text-sm">{t('loading.text')}</p>
      </div>

      {/* Progress bar */}
      <div className="w-48">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-coral to-mustard rounded-full"
          />
        </div>
        <div className="text-center">
          <span className="text-cream/60 text-sm tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
