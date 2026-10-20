import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    q: { en: 'What does €195/month include?', fr: 'Que comprend 195 €/mois ?', ar: 'ماذا يشمل 195 يورو/شهر؟' },
    a: {
      en: 'A custom website (up to 5 pages), hosting, a professional email address, 24/7 maintenance, and any modification — plus your domain free the first year.',
      fr: 'Un site sur mesure (jusqu’à 5 pages), l’hébergement, un email professionnel, la maintenance 24/7 et toutes les modifications — plus votre domaine offert la première année.',
      ar: 'موقع مخصص (حتى 5 صفحات)، الاستضافة، بريد احترافي، صيانة 24/7، وأي تعديل — والنطاق مجاني في السنة الأولى.'
    }
  },
  {
    q: { en: 'Is there a commitment?', fr: 'Y a-t-il un engagement ?', ar: 'هل هناك التزام؟' },
    a: {
      en: 'Yes — 6 months minimum, then cancel anytime with 1 month’s notice.',
      fr: 'Oui — 6 mois minimum, puis résiliable à tout moment avec 1 mois de préavis.',
      ar: 'نعم — 6 أشهر كحد أدنى، ثم إلغاء في أي وقت بإشعار شهر واحد.'
    }
  },
  {
    q: { en: 'How long does delivery take?', fr: 'Combien de temps prend la livraison ?', ar: 'كم يستغرق التسليم؟' },
    a: {
      en: 'Your first version within 48–72 hours. Revisions within 24 hours.',
      fr: 'Votre première version sous 48–72 heures. Révisions sous 24 heures.',
      ar: 'نسختك الأولى خلال 48–72 ساعة. التعديلات خلال 24 ساعة.'
    }
  },
  {
    q: { en: 'What if I don’t like the preview?', fr: "Et si la prévisualisation ne me plaît pas ?", ar: 'ماذا لو لم تعجبني المعاينة؟' },
    a: {
      en: 'Ask for changes — or a full refund, no questions asked. The order only finalizes when you approve the preview.',
      fr: 'Demandez des modifications — ou un remboursement complet, sans justification. La commande n’est finalisée qu’à votre approbation.',
      ar: 'اطلب تعديلات — أو استردادًا كاملاً دون أسئلة. الطلب لا يُنهى إلا بموافقتك على المعاينة.'
    }
  },
  {
    q: { en: 'What happens if I stop paying?', fr: 'Que se passe-t-il si je cesse de payer ?', ar: 'ماذا لو توقفت عن الدفع؟' },
    a: {
      en: 'Your site goes into sleep mode (offline, kept 30 days). Your domain — after year one — and your content always stay yours.',
      fr: 'Votre site passe en mode veille (hors ligne, conservé 30 jours). Votre domaine — après la première année — et votre contenu restent toujours vôtres.',
      ar: 'موقعك يدخل وضع السكون (غير متصل، محفوظ 30 يومًا). نطاقك — بعد السنة الأولى — ومحتواك يبقيان ملكك دائمًا.'
    }
  },
  {
    q: { en: 'Can I add features later?', fr: 'Puis-je ajouter des fonctions plus tard ?', ar: 'هل يمكنني إضافة ميزات لاحقًا؟' },
    a: {
      en: 'Yes. Extra features (online shop, booking system…) are quoted separately — you always know the price before we start.',
      fr: 'Oui. Les fonctions supplémentaires (boutique en ligne, réservation…) sont devisées à part — vous connaissez toujours le prix avant de commencer.',
      ar: 'نعم. الميزات الإضافية (متجر إلكتروني، نظام حجز…) تُقدَّر بشكل منفصل — تعرف السعر دائمًا قبل البدء.'
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
