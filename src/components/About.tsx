import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t, dir } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const values = [
    { title: t('about.v1'), desc: t('about.v1.desc') },
    { title: t('about.v2'), desc: t('about.v2.desc') },
    { title: t('about.v3'), desc: t('about.v3.desc') },
    { title: t('about.v4'), desc: t('about.v4.desc') },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Split intro animation
      const introContent = section.querySelector('.about-intro');
      const introImage = section.querySelector('.about-image');
      
      if (introContent && introImage) {
        gsap.set(introContent.children, { opacity: 0, x: dir === 'rtl' ? 60 : -60 });
        gsap.set(introImage, { clipPath: dir === 'rtl' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' });

        ScrollTrigger.create({
          trigger: introContent,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(introContent.children, {
              opacity: 1,
              x: 0,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
            });
            gsap.to(introImage, {
              clipPath: 'inset(0 0% 0 0%)',
              duration: 1.4,
              ease: 'power3.inOut',
            });
          },
          once: true,
        });
      }

      // Stats counter animation
      const stats = section.querySelectorAll('.stat-counter');
      stats.forEach((stat) => {
        const value = stat.getAttribute('data-value') || '0';
        const isNumeric = /^\d+/.test(value);
        
        ScrollTrigger.create({
          trigger: stat,
          start: 'top 85%',
          onEnter: () => {
            if (isNumeric) {
              const num = parseInt(value);
              gsap.to({ val: 0 }, {
                val: num,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                  stat.textContent = Math.round(this.targets()[0].val) + (value.includes('%') ? '%' : value.includes('M') ? 'M+' : '+');
                }
              });
            }
          },
          once: true,
        });
      });

      // Value cards
      const cards = section.querySelectorAll('.value-card');
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });
      
      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Card hover 3D effect
      cards.forEach((card) => {
        card.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 15;
          const rotateY = (centerX - x) / 15;
          
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      });
    }, section);

    return () => ctx.revert();
  }, [dir, t]);

  return (
    <section id="about" ref={sectionRef}>
      {/* Split intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="about-image relative min-h-[400px] lg:min-h-[600px] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/7799011/pexels-photo-7799011.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
            alt="Abstract design"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="about-intro bg-cream-dark flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-24">
          <p className="label-sm text-coral mb-4">{t('about.label')}</p>
          <h2 className="display-lg text-charcoal mb-8">{t('about.title')}</h2>
          <p className="body-lg text-charcoal/70 mb-6">{t('about.p1')}</p>
          <p className="body-lg text-charcoal/70">{t('about.p2')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-coral grid grid-cols-2 md:grid-cols-4">
        {[
          { val: '147', label: t('about.stat1') },
          { val: '€11M', label: t('about.stat2') },
          { val: '94%', label: t('about.stat3') },
          { val: '4.8yr', label: t('about.stat4') },
        ].map((s) => (
          <div key={s.label} className="p-8 md:p-10 text-center border-r border-white/15 last:border-r-0">
            <div
              className="stat-counter display-lg text-white mb-1"
              data-value={s.val.replace(/[^0-9]/g, '')}
            >
              0
            </div>
            <div className="body-sm text-white/70">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="bg-teal-dark px-8 md:px-16 lg:px-20 py-16 md:py-24 relative noise">
        <div className="max-w-7xl mx-auto relative z-10">
          <h3 className="display-md text-cream mb-12">{t('about.how')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
            {values.map((v) => (
              <div
                key={v.title}
                className="value-card p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
                data-cursor="Read"
              >
                <h4 className="display-md text-mustard mb-2">{v.title}</h4>
                <p className="body-md text-cream/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
