import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    q: { en: 'How long does a project take?', fr: 'Combien de temps dure un projet ?', ar: 'كم تستغرق المشاريع؟' },
    a: { 
      en: 'Foundation: 3-4 weeks. Growth: 5-7 weeks. Enterprise: 8-12 weeks.',
      fr: 'Fondation: 3-4 semaines. Croissance: 5-7 semaines. Entreprise: 8-12 semaines.',
      ar: 'الأساس: 3-4 أسابيع. النمو: 5-7 أسابيع. المؤسسات: 8-12 أسبوع.'
    }
  },
  {
    q: { en: 'Do we own everything you create?', fr: 'Possédons-nous tout ce que vous créez ?', ar: 'هل نملك كل ما تنشئونه؟' },
    a: { 
      en: 'Yes. All code, designs, content, and assets. No lock-ins, ever.',
      fr: 'Oui. Tout le code, designs, contenu et assets. Aucun engagement.',
      ar: 'نعم. كل الكود والتصاميم والمحتوى والأصول. لا قيود أبداً.'
    }
  },
  {
    q: { en: 'What industries do you work with?', fr: 'Avec quels secteurs travaillez-vous ?', ar: 'ما هي القطاعات التي تعملون معها؟' },
    a: { 
      en: 'Restaurants, cafés, medical practices, fitness, retail, construction, hotels, and professional services.',
      fr: 'Restaurants, cafés, cabinets médicaux, fitness, retail, construction, hôtels, et services professionnels.',
      ar: 'المطاعم، المقاهي، العيادات الطبية، اللياقة البدنية، البيع بالتجزئة، البناء، الفنادق، والخدمات المهنية.'
    }
  },
  {
    q: { en: 'What happens after launch?', fr: 'Que se passe-t-il après le lancement ?', ar: 'ماذا يحدث بعد الإطلاق؟' },
    a: { 
      en: 'All plans include post-launch support. We also offer monthly retainers for ongoing optimization.',
      fr: 'Tous les plans incluent un support post-lancement. On propose aussi des contrats mensuels.',
      ar: 'جميع الخطط تشمل دعماً بعد الإطلاق. نقدم أيضاً عقوداً شهرية للتحسين المستمر.'
    }
  },
  {
    q: { en: 'Do you offer payment plans?', fr: 'Proposez-vous des facilités de paiement ?', ar: 'هل تقدمون خطط دفع؟' },
    a: { 
      en: 'Yes. Milestone-based payments and monthly installments available.',
      fr: 'Oui. Paiements par étapes et mensualités disponibles.',
      ar: 'نعم. دفعات على مراحل وأقساط شهرية متاحة.'
    }
  },
];

export default function FAQ() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const answersRef = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const left = section.querySelector('.faq-left');
      const right = section.querySelector('.faq-right');

      if (left && right) {
        gsap.set(left.children, { opacity: 0, x: -40 });
        gsap.set(right.children, { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(left.children, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
            });
            gsap.to(right.children, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power3.out',
              delay: 0.2,
            });
          },
          once: true,
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate answer open/close
  useEffect(() => {
    answersRef.current.forEach((el, i) => {
      if (el) {
        if (open === i) {
          gsap.to(el, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
        } else {
          gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
        }
      }
    });
  }, [open]);

  return (
    <section id="faq" ref={sectionRef} className="bg-cream px-8 md:px-16 lg:px-20 py-20 md:py-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left */}
        <div className="lg:col-span-4 faq-left">
          <p className="label-sm text-coral mb-4">{t('faq.label')}</p>
          <h2 className="display-lg text-charcoal mb-6">
            {t('faq.title1')} <span className="text-coral">{t('faq.title2')}</span>
          </h2>
          <p className="body-lg text-charcoal/60">{t('faq.cant')}</p>
          <a href="#contact" className="inline-flex items-center gap-2 text-coral font-semibold mt-4 hover:underline"
             style={{ fontFamily: 'var(--font-display)' }}
             data-cursor="Ask">
            {t('faq.ask')}
          </a>
        </div>

        {/* Right */}
        <div className="lg:col-span-8 faq-right">
          {faqData.map((f, i) => (
            <div key={i} className="border-t-2 border-charcoal/10 last:border-b-2">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                data-cursor="Toggle"
              >
                <span className={`body-lg transition-colors ${
                  open === i ? 'text-charcoal' : 'text-charcoal/70 group-hover:text-charcoal'
                }`} style={{ fontFamily: 'var(--font-display)' }}>
                  {f.q[lang as keyof typeof f.q]}
                </span>
                <span className={`text-xl leading-none text-coral transition-transform duration-300 ${
                  open === i ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>
              <div
                ref={(el) => { if (el) answersRef.current.set(i, el); }}
                className="overflow-hidden"
                style={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
              >
                <p className="body-md text-charcoal/60 pb-6 pr-12">
                  {f.a[lang as keyof typeof f.a]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
