import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    'nav.discover': 'Discover',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.pricing': 'Pricing',
    'nav.contact': "Let's Talk",
    
    // Hero
    'hero.badge': 'Digital Growth Agency',
    'hero.title1': 'We',
    'hero.title2': 'Build',
    'hero.title3': 'Growth',
    'hero.subtitle': 'Not just websites. Complete digital systems that bring more customers, automate your business, and make you impossible to ignore.',
    'hero.cta1': 'Start a Project',
    'hero.cta2': 'See Our Work',
    'hero.stat1': 'Projects',
    'hero.stat2': 'Revenue',
    'hero.stat3': 'Retention',
    'hero.learn': 'Learn More',
    
    // Services
    'services.label': 'Discover',
    'services.title1': 'What',
    'services.title2': 'We',
    'services.title3': 'Do',
    'services.subtitle': 'Everything your business needs — strategy, brand, development, marketing, automation — integrated into one growth system.',
    'services.strategy': 'Strategy',
    'services.strategy.desc': 'Market analysis, competitor audits, and growth roadmaps that tell you exactly where to invest.',
    'services.brand': 'Brand Identity',
    'services.brand.desc': 'Logo, colors, typography, and guidelines that make your business instantly recognizable.',
    'services.web': 'Web Development',
    'services.web.desc': 'Fast, beautiful, conversion-optimized websites. You own everything we build.',
    'services.seo': 'SEO & Local',
    'services.seo.desc': 'Dominate local search. When people look for your service, they find you first.',
    'services.marketing': 'Marketing',
    'services.marketing.desc': 'Google Ads, social campaigns, and content that puts you in front of ready-to-buy customers.',
    'services.automation': 'Automation',
    'services.automation.desc': 'Bookings, follow-ups, and customer flows that run while you sleep.',
    
    // Portfolio
    'portfolio.label': 'Selected Work',
    'portfolio.title1': 'Results You',
    'portfolio.title2': 'Can Verify',
    'portfolio.subtitle': 'Real businesses. Real transformations. Every result is documented and verifiable.',
    'portfolio.cta': 'View Case Study',
    
    // About
    'about.label': 'About Us',
    'about.title': 'We exist because most agencies fail to deliver results.',
    'about.p1': 'We started Weekza after watching too many businesses get burned by agencies that delivered pretty websites that didn\'t move the needle.',
    'about.p2': 'Our team combines decades of experience in design, development, and marketing — but more importantly, we\'ve built and grown businesses ourselves.',
    'about.stat1': 'Projects Shipped',
    'about.stat2': 'Revenue Generated',
    'about.stat3': 'Client Retention',
    'about.stat4': 'Avg. Relationship',
    'about.how': 'How We Work',
    'about.v1': 'Outcomes Over Outputs',
    'about.v1.desc': 'We measure success by your revenue and customers — not deliverables.',
    'about.v2': 'No Templates',
    'about.v2.desc': 'Everything custom. Cookie-cutter solutions produce cookie-cutter results.',
    'about.v3': 'You Own Everything',
    'about.v3.desc': 'Your code, designs, data. No lock-ins, no dependencies on us.',
    'about.v4': 'Full Transparency',
    'about.v4.desc': 'You always know what we\'re doing, why, and how it\'s performing.',
    
    // Testimonials
    'testimonials.label': 'Client Stories',
    
    // Pricing
    'pricing.label': 'Investment',
    'pricing.title1': 'Transparent',
    'pricing.title2': 'Pricing',
    'pricing.subtitle': 'No hidden fees. No surprises. You know exactly what you\'re paying for.',
    'pricing.popular': 'Most Popular',
    'pricing.foundation': 'Foundation',
    'pricing.foundation.desc': 'Professional online presence for businesses getting started.',
    'pricing.growth': 'Growth',
    'pricing.growth.desc': 'Complete growth system for businesses ready to scale.',
    'pricing.enterprise': 'Enterprise',
    'pricing.enterprise.desc': 'Full digital transformation for ambitious businesses.',
    'pricing.cta': 'Get Started',
    'pricing.contact': 'Contact Us',
    
    // FAQ
    'faq.label': 'FAQ',
    'faq.title1': 'Common',
    'faq.title2': 'Questions',
    'faq.cant': "Can't find your answer?",
    'faq.ask': 'Ask us anything →',
    
    // Contact
    'contact.label': 'Contact',
    'contact.title1': "Let's Build",
    'contact.title2': 'Something',
    'contact.title3': 'Great',
    'contact.subtitle': 'Tell us about your business. We\'ll respond within 24 hours with ideas.',
    'contact.email': 'Email',
    'contact.response': 'Response',
    'contact.response.val': 'Within 24 hours',
    'contact.location': 'Location',
    'contact.location.val': 'Remote-first, global',
    'contact.name': 'Name',
    'contact.company': 'Company',
    'contact.budget': 'Budget',
    'contact.goals': 'Your Goals',
    'contact.goals.placeholder': 'What does success look like?',
    'contact.send': 'Send Message',
    'contact.sent': 'Message Sent!',
    'contact.sent.desc': "We'll be in touch within 24 hours.",
    
    // Footer
    'footer.cta': "Your competitors won't wait. Will you?",
    'footer.btn': 'Start Growing Today',
    'footer.desc': 'Digital growth agency. Building systems that turn businesses into market leaders.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.rights': '© 2024 Weekza. All rights reserved.',
    'footer.built': 'Built with the same care we put into client work.',
    
    // Loading
    'loading.text': 'Building Growth...',
  },
  
  fr: {
    // Nav
    'nav.discover': 'Découvrir',
    'nav.work': 'Projets',
    'nav.about': 'À Propos',
    'nav.pricing': 'Tarifs',
    'nav.contact': 'Parlons-en',
    
    // Hero
    'hero.badge': 'Agence de Croissance Digitale',
    'hero.title1': 'Nous',
    'hero.title2': 'Créons',
    'hero.title3': 'la Croissance',
    'hero.subtitle': 'Pas seulement des sites web. Des systèmes digitaux complets qui attirent plus de clients, automatisent votre business et vous rendent incontournable.',
    'hero.cta1': 'Démarrer un Projet',
    'hero.cta2': 'Voir Nos Projets',
    'hero.stat1': 'Projets',
    'hero.stat2': 'Revenus',
    'hero.stat3': 'Fidélisation',
    'hero.learn': 'En Savoir Plus',
    
    // Services
    'services.label': 'Découvrir',
    'services.title1': 'Ce Que',
    'services.title2': 'Nous',
    'services.title3': 'Faisons',
    'services.subtitle': 'Tout ce dont votre entreprise a besoin — stratégie, marque, développement, marketing, automatisation — intégré dans un système de croissance.',
    'services.strategy': 'Stratégie',
    'services.strategy.desc': 'Analyse de marché, audits concurrentiels et feuilles de route qui vous indiquent où investir.',
    'services.brand': 'Identité de Marque',
    'services.brand.desc': 'Logo, couleurs, typographie et guidelines qui rendent votre entreprise reconnaissable.',
    'services.web': 'Développement Web',
    'services.web.desc': 'Sites rapides, beaux, optimisés pour la conversion. Vous possédez tout.',
    'services.seo': 'SEO & Local',
    'services.seo.desc': 'Dominez les recherches locales. Quand on cherche votre service, on vous trouve.',
    'services.marketing': 'Marketing',
    'services.marketing.desc': 'Google Ads, campagnes sociales et contenu qui vous met devant des clients prêts à acheter.',
    'services.automation': 'Automatisation',
    'services.automation.desc': 'Réservations, relances et flux clients qui fonctionnent pendant que vous dormez.',
    
    // Portfolio
    'portfolio.label': 'Projets Sélectionnés',
    'portfolio.title1': 'Des Résultats',
    'portfolio.title2': 'Vérifiables',
    'portfolio.subtitle': 'De vraies entreprises. De vraies transformations. Chaque résultat est documenté.',
    'portfolio.cta': 'Voir l\'Étude de Cas',
    
    // About
    'about.label': 'À Propos',
    'about.title': 'Nous existons parce que la plupart des agences ne livrent pas de résultats.',
    'about.p1': 'Nous avons créé Weekza après avoir vu trop d\'entreprises déçues par des agences qui livraient de jolis sites sans impact.',
    'about.p2': 'Notre équipe combine des décennies d\'expérience en design, développement et marketing — mais surtout, nous avons construit et fait grandir des entreprises nous-mêmes.',
    'about.stat1': 'Projets Livrés',
    'about.stat2': 'Revenus Générés',
    'about.stat3': 'Fidélisation Client',
    'about.stat4': 'Relation Moyenne',
    'about.how': 'Comment Nous Travaillons',
    'about.v1': 'Résultats Avant Tout',
    'about.v1.desc': 'Nous mesurons le succès par vos revenus et clients — pas par les livrables.',
    'about.v2': 'Zéro Templates',
    'about.v2.desc': 'Tout est sur-mesure. Les solutions génériques donnent des résultats génériques.',
    'about.v3': 'Vous Possédez Tout',
    'about.v3.desc': 'Votre code, vos designs, vos données. Aucune dépendance envers nous.',
    'about.v4': 'Transparence Totale',
    'about.v4.desc': 'Vous savez toujours ce que nous faisons, pourquoi, et comment ça performe.',
    
    // Testimonials
    'testimonials.label': 'Témoignages Clients',
    
    // Pricing
    'pricing.label': 'Investissement',
    'pricing.title1': 'Tarifs',
    'pricing.title2': 'Transparents',
    'pricing.subtitle': 'Pas de frais cachés. Pas de surprises. Vous savez exactement ce que vous payez.',
    'pricing.popular': 'Plus Populaire',
    'pricing.foundation': 'Fondation',
    'pricing.foundation.desc': 'Présence en ligne professionnelle pour les entreprises qui démarrent.',
    'pricing.growth': 'Croissance',
    'pricing.growth.desc': 'Système de croissance complet pour les entreprises prêtes à scaler.',
    'pricing.enterprise': 'Entreprise',
    'pricing.enterprise.desc': 'Transformation digitale complète pour les entreprises ambitieuses.',
    'pricing.cta': 'Commencer',
    'pricing.contact': 'Nous Contacter',
    
    // FAQ
    'faq.label': 'FAQ',
    'faq.title1': 'Questions',
    'faq.title2': 'Fréquentes',
    'faq.cant': 'Vous ne trouvez pas votre réponse ?',
    'faq.ask': 'Posez-nous n\'importe quelle question →',
    
    // Contact
    'contact.label': 'Contact',
    'contact.title1': 'Construisons',
    'contact.title2': 'Quelque Chose',
    'contact.title3': 'de Grand',
    'contact.subtitle': 'Parlez-nous de votre entreprise. Nous répondons sous 24h avec des idées.',
    'contact.email': 'Email',
    'contact.response': 'Réponse',
    'contact.response.val': 'Sous 24 heures',
    'contact.location': 'Localisation',
    'contact.location.val': 'Remote-first, mondial',
    'contact.name': 'Nom',
    'contact.company': 'Entreprise',
    'contact.budget': 'Budget',
    'contact.goals': 'Vos Objectifs',
    'contact.goals.placeholder': 'À quoi ressemble le succès pour vous ?',
    'contact.send': 'Envoyer',
    'contact.sent': 'Message Envoyé !',
    'contact.sent.desc': 'Nous vous répondons sous 24 heures.',
    
    // Footer
    'footer.cta': 'Vos concurrents n\'attendent pas. Et vous ?',
    'footer.btn': 'Commencer à Grandir',
    'footer.desc': 'Agence de croissance digitale. Nous construisons des systèmes qui transforment les entreprises en leaders.',
    'footer.services': 'Services',
    'footer.company': 'Entreprise',
    'footer.legal': 'Légal',
    'footer.rights': '© 2024 Weekza. Tous droits réservés.',
    'footer.built': 'Construit avec le même soin que nos projets clients.',
    
    // Loading
    'loading.text': 'Création en cours...',
  },
  
  ar: {
    // Nav
    'nav.discover': 'اكتشف',
    'nav.work': 'أعمالنا',
    'nav.about': 'من نحن',
    'nav.pricing': 'الأسعار',
    'nav.contact': 'تواصل معنا',
    
    // Hero
    'hero.badge': 'وكالة النمو الرقمي',
    'hero.title1': 'نحن',
    'hero.title2': 'نبني',
    'hero.title3': 'النمو',
    'hero.subtitle': 'ليس مجرد مواقع ويب. أنظمة رقمية متكاملة تجلب المزيد من العملاء، تُؤتمت أعمالك، وتجعلك الخيار الأول.',
    'hero.cta1': 'ابدأ مشروعك',
    'hero.cta2': 'شاهد أعمالنا',
    'hero.stat1': 'مشروع',
    'hero.stat2': 'إيرادات',
    'hero.stat3': 'احتفاظ',
    'hero.learn': 'اعرف المزيد',
    
    // Services
    'services.label': 'اكتشف',
    'services.title1': 'ماذا',
    'services.title2': 'نحن',
    'services.title3': 'نفعل',
    'services.subtitle': 'كل ما يحتاجه عملك — استراتيجية، علامة تجارية، تطوير، تسويق، أتمتة — مدمج في نظام نمو واحد.',
    'services.strategy': 'الاستراتيجية',
    'services.strategy.desc': 'تحليل السوق، دراسة المنافسين، وخرائط طريق توضح أين تستثمر.',
    'services.brand': 'الهوية البصرية',
    'services.brand.desc': 'شعار، ألوان، خطوط، ودليل يجعل علامتك التجارية مميزة فوراً.',
    'services.web': 'تطوير الويب',
    'services.web.desc': 'مواقع سريعة، جميلة، محسّنة للتحويل. تملك كل شيء.',
    'services.seo': 'تحسين محركات البحث',
    'services.seo.desc': 'تصدّر نتائج البحث المحلية. عندما يبحث الناس عن خدمتك، يجدونك أولاً.',
    'services.marketing': 'التسويق',
    'services.marketing.desc': 'إعلانات جوجل، حملات التواصل الاجتماعي، ومحتوى يضعك أمام عملاء جاهزين للشراء.',
    'services.automation': 'الأتمتة',
    'services.automation.desc': 'حجوزات، متابعات، وتدفقات عملاء تعمل أثناء نومك.',
    
    // Portfolio
    'portfolio.label': 'أعمال مختارة',
    'portfolio.title1': 'نتائج يمكنك',
    'portfolio.title2': 'التحقق منها',
    'portfolio.subtitle': 'شركات حقيقية. تحولات حقيقية. كل نتيجة موثقة وقابلة للتحقق.',
    'portfolio.cta': 'عرض دراسة الحالة',
    
    // About
    'about.label': 'من نحن',
    'about.title': 'نحن موجودون لأن معظم الوكالات تفشل في تحقيق النتائج.',
    'about.p1': 'أسسنا Weekza بعد رؤية الكثير من الشركات تُحبط من وكالات قدمت مواقع جميلة دون أي تأثير.',
    'about.p2': 'فريقنا يجمع عقوداً من الخبرة في التصميم والتطوير والتسويق — لكن الأهم، نحن بنينا وطوّرنا شركات بأنفسنا.',
    'about.stat1': 'مشروع منجز',
    'about.stat2': 'إيرادات محققة',
    'about.stat3': 'احتفاظ بالعملاء',
    'about.stat4': 'متوسط العلاقة',
    'about.how': 'كيف نعمل',
    'about.v1': 'النتائج أولاً',
    'about.v1.desc': 'نقيس النجاح بإيراداتك وعملائك — ليس بالمخرجات.',
    'about.v2': 'بدون قوالب',
    'about.v2.desc': 'كل شيء مخصص. الحلول الجاهزة تعطي نتائج عادية.',
    'about.v3': 'تملك كل شيء',
    'about.v3.desc': 'الكود، التصاميم، البيانات. لا قيود، لا اعتماد علينا.',
    'about.v4': 'شفافية كاملة',
    'about.v4.desc': 'تعرف دائماً ماذا نفعل، لماذا، وكيف يؤدي.',
    
    // Testimonials
    'testimonials.label': 'قصص العملاء',
    
    // Pricing
    'pricing.label': 'الاستثمار',
    'pricing.title1': 'أسعار',
    'pricing.title2': 'شفافة',
    'pricing.subtitle': 'لا رسوم خفية. لا مفاجآت. تعرف بالضبط ما تدفع مقابله.',
    'pricing.popular': 'الأكثر شعبية',
    'pricing.foundation': 'الأساس',
    'pricing.foundation.desc': 'حضور احترافي عبر الإنترنت للشركات الناشئة.',
    'pricing.growth': 'النمو',
    'pricing.growth.desc': 'نظام نمو متكامل للشركات المستعدة للتوسع.',
    'pricing.enterprise': 'المؤسسات',
    'pricing.enterprise.desc': 'تحول رقمي شامل للشركات الطموحة.',
    'pricing.cta': 'ابدأ الآن',
    'pricing.contact': 'تواصل معنا',
    
    // FAQ
    'faq.label': 'الأسئلة الشائعة',
    'faq.title1': 'أسئلة',
    'faq.title2': 'متكررة',
    'faq.cant': 'لم تجد إجابتك؟',
    'faq.ask': 'اسألنا أي شيء ←',
    
    // Contact
    'contact.label': 'تواصل',
    'contact.title1': 'لنبني',
    'contact.title2': 'شيئاً',
    'contact.title3': 'عظيماً',
    'contact.subtitle': 'أخبرنا عن عملك. سنرد خلال 24 ساعة بأفكار.',
    'contact.email': 'البريد',
    'contact.response': 'الرد',
    'contact.response.val': 'خلال 24 ساعة',
    'contact.location': 'الموقع',
    'contact.location.val': 'عن بعد، عالمياً',
    'contact.name': 'الاسم',
    'contact.company': 'الشركة',
    'contact.budget': 'الميزانية',
    'contact.goals': 'أهدافك',
    'contact.goals.placeholder': 'كيف يبدو النجاح بالنسبة لك؟',
    'contact.send': 'إرسال الرسالة',
    'contact.sent': 'تم الإرسال!',
    'contact.sent.desc': 'سنتواصل معك خلال 24 ساعة.',
    
    // Footer
    'footer.cta': 'منافسوك لن ينتظروا. هل ستنتظر أنت؟',
    'footer.btn': 'ابدأ النمو اليوم',
    'footer.desc': 'وكالة نمو رقمي. نبني أنظمة تحول الشركات إلى قادة سوق.',
    'footer.services': 'الخدمات',
    'footer.company': 'الشركة',
    'footer.legal': 'قانوني',
    'footer.rights': '© 2024 Weekza. جميع الحقوق محفوظة.',
    'footer.built': 'صُنع بنفس العناية التي نضعها في مشاريع عملائنا.',
    
    // Loading
    'loading.text': 'جاري التحميل...',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
