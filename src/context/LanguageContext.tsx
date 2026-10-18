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
    'hero.stat1': 'Languages',
    'hero.stat2': 'Code ownership',
    'hero.stat3': 'Response time',
    'hero.learn': 'Learn More',
    
    // Services
    'services.label': 'Discover',
    'services.title1': 'What',
    'services.title2': 'We',
    'services.title3': 'Do',
    'services.subtitle': 'Everything your business needs to be seen — content, video, funnels, communication, SEO and ads — integrated into one growth system.',
    'services.content': 'Content Creation',
    'services.content.desc': 'Scroll-stopping posts, carousels and scripts — a content engine, not random posts.',
    'services.video': 'Video Editing',
    'services.video.desc': 'Reels, TikToks, ads and long-form, edited to keep people watching to the end.',
    'services.funnels': 'Funnels & Pages',
    'services.funnels.desc': 'Landing pages and sales funnels that turn clicks into customers.',
    'services.comm': 'Communication Management',
    'services.comm.desc': 'Calendars, publishing, replies — your voice, consistent everywhere.',
    'services.seo': 'SEO & Local',
    'services.seo.desc': 'Dominate local search. When people look for your service, they find you first.',
    'services.ads': 'Ads Management',
    'services.ads.desc': 'Google Ads and social campaigns, measured to the euro — you see every result.',
    
    // Portfolio
    'portfolio.label': 'What We Build',
    'portfolio.title1': 'Built for',
    'portfolio.title2': 'Results',
    'portfolio.subtitle': 'Custom builds, real craft, zero templates — every site is fast, yours, and made to convert.',
    'portfolio.cta': 'Discuss This Project',
    'portfolio.p1.title': 'Conversion Websites',
    'portfolio.p1.type': 'Web Development',
    'portfolio.p1.highlight': 'Fast',
    'portfolio.p1.label': 'Core Web Vitals-ready builds designed to turn visitors into customers.',
    'portfolio.p2.title': 'Brand Identity',
    'portfolio.p2.type': 'Design Systems',
    'portfolio.p2.highlight': 'Distinct',
    'portfolio.p2.label': 'Logo, colors and typography that make you impossible to confuse.',
    'portfolio.p3.title': 'Ad Campaigns',
    'portfolio.p3.type': 'Google & Social',
    'portfolio.p3.highlight': 'Targeted',
    'portfolio.p3.label': 'Ads that reach ready-to-buy customers — measured to the euro.',
    'portfolio.p4.title': 'Automation',
    'portfolio.p4.type': 'Booking & Follow-up',
    'portfolio.p4.highlight': 'Effortless',
    'portfolio.p4.label': 'Bookings, follow-ups and flows that run while you sleep.',
    
    // About
    'about.label': 'About Us',
    'about.title': 'We exist because most agencies fail to deliver results.',
    'about.p1': 'We started Feekza after watching too many businesses get burned by agencies that delivered pretty websites that didn\'t move the needle.',
    'about.p2': 'Our team combines decades of experience in design, development, and marketing — but more importantly, we\'ve built and grown businesses ourselves.',
    'about.stat1': 'Languages',
    'about.stat2': 'Code ownership',
    'about.stat3': 'Response time',
    'about.stat4': 'Templates used',
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
    'pricing.permonth': '/mo',
    'pricing.starter': 'Content Starter',
    'pricing.starter.desc': 'A steady, professional social presence — handled for you.',
    'pricing.starter.f1': '12 posts / month',
    'pricing.starter.f2': '8 short videos edited',
    'pricing.starter.f3': 'Communication management',
    'pricing.starter.f4': 'Monthly performance report',
    'pricing.growth': 'Growth System',
    'pricing.growth.desc': 'Content plus funnels, SEO and ads — the full acquisition machine.',
    'pricing.growth.f1': 'Everything in Content Starter',
    'pricing.growth.f2': 'Sales funnels & landing pages',
    'pricing.growth.f3': 'SEO & local optimization',
    'pricing.growth.f4': 'Google & social ads management',
    'pricing.growth.f5': 'Monthly strategy call',
    'pricing.full': 'Full Partnership',
    'pricing.full.desc': 'Your entire digital operation, handled end to end.',
    'pricing.full.f1': 'Everything in Growth',
    'pricing.full.f2': 'Long-form video production',
    'pricing.full.f3': 'Dedicated manager',
    'pricing.full.f4': 'Weekly reporting',
    'pricing.full.f5': 'Priority support',
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
    'contact.budget.placeholder': 'Select a range',
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
    'footer.rights': '© {year} Feekza. All rights reserved.',
    'footer.built': 'Built with the same care we put into client work.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.cookies': 'Cookies',
    
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
    'hero.stat1': 'Langues',
    'hero.stat2': 'Code possédé',
    'hero.stat3': 'Temps de réponse',
    'hero.learn': 'En Savoir Plus',
    
    // Services
    'services.label': 'Découvrir',
    'services.title1': 'Ce Que',
    'services.title2': 'Nous',
    'services.title3': 'Faisons',
    'services.subtitle': 'Tout ce dont votre entreprise a besoin pour être vue — contenu, vidéo, funnels, communication, SEO et publicité — intégré dans un seul système de croissance.',
    'services.content': 'Création de contenu',
    'services.content.desc': 'Posts, carrousels et scripts qui arrêtent le scroll — un moteur de contenu, pas des posts au hasard.',
    'services.video': 'Montage vidéo',
    'services.video.desc': 'Reels, TikToks, pubs et formats longs, montés pour garder l’attention jusqu’au bout.',
    'services.funnels': 'Funnels & Pages',
    'services.funnels.desc': 'Des pages de vente et des funnels qui transforment les clics en clients.',
    'services.comm': 'Gestion de communication',
    'services.comm.desc': 'Calendriers, publications, réponses — votre voix, partout, en cohérence.',
    'services.seo': 'SEO & Local',
    'services.seo.desc': 'Dominez les recherches locales. Quand on cherche votre service, on vous trouve.',
    'services.ads': 'Gestion de publicité',
    'services.ads.desc': 'Google Ads et campagnes sociales, mesurées à l’euro — vous voyez chaque résultat.',
    
    // Portfolio
    'portfolio.label': 'Ce Que Nous Créons',
    'portfolio.title1': 'Fait pour',
    'portfolio.title2': 'Réussir',
    'portfolio.subtitle': 'Des créations sur-mesure, vrai savoir-faire, zéro template — chaque site est rapide, vous appartient, et conçu pour convertir.',
    'portfolio.cta': 'Discuter de ce projet',
    'portfolio.p1.title': 'Sites de Conversion',
    'portfolio.p1.type': 'Développement Web',
    'portfolio.p1.highlight': 'Rapide',
    'portfolio.p1.label': 'Des sites prêts pour Core Web Vitals, conçus pour transformer les visiteurs en clients.',
    'portfolio.p2.title': 'Identité de Marque',
    'portfolio.p2.type': 'Systèmes de Design',
    'portfolio.p2.highlight': 'Distinct',
    'portfolio.p2.label': 'Logo, couleurs et typographie qui vous rendent impossible à confondre.',
    'portfolio.p3.title': 'Campagnes Ads',
    'portfolio.p3.type': 'Google & Social',
    'portfolio.p3.highlight': 'Ciblé',
    'portfolio.p3.label': 'Des publicités qui atteignent des clients prêts à acheter — mesurées à l’euro.',
    'portfolio.p4.title': 'Automatisation',
    'portfolio.p4.type': 'Réservation & Relances',
    'portfolio.p4.highlight': 'Sans effort',
    'portfolio.p4.label': 'Réservations, relances et flux qui fonctionnent pendant que vous dormez.',
    
    // About
    'about.label': 'À Propos',
    'about.title': 'Nous existons parce que la plupart des agences ne livrent pas de résultats.',
    'about.p1': 'Nous avons créé Feekza après avoir vu trop d\'entreprises déçues par des agences qui livraient de jolis sites sans impact.',
    'about.p2': 'Notre équipe combine des décennies d\'expérience en design, développement et marketing — mais surtout, nous avons construit et fait grandir des entreprises nous-mêmes.',
    'about.stat1': 'Langues',
    'about.stat2': 'Code possédé',
    'about.stat3': 'Temps de réponse',
    'about.stat4': 'Templates utilisés',
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
    'pricing.permonth': '/mois',
    'pricing.starter': 'Contenu Essentiel',
    'pricing.starter.desc': 'Une présence sociale régulière et professionnelle — gérée pour vous.',
    'pricing.starter.f1': '12 publications / mois',
    'pricing.starter.f2': '8 vidéos courtes montées',
    'pricing.starter.f3': 'Gestion de communication',
    'pricing.starter.f4': 'Rapport mensuel de performance',
    'pricing.growth': 'Système de Croissance',
    'pricing.growth.desc': 'Le contenu plus les funnels, le SEO et les pubs — la machine d’acquisition complète.',
    'pricing.growth.f1': 'Tout le plan Contenu',
    'pricing.growth.f2': 'Funnels & landing pages',
    'pricing.growth.f3': 'SEO & optimisation locale',
    'pricing.growth.f4': 'Gestion pubs Google & réseaux',
    'pricing.growth.f5': 'Appel stratégique mensuel',
    'pricing.full': 'Partenariat Complet',
    'pricing.full.desc': 'Toute votre opération digitale, gérée de A à Z.',
    'pricing.full.f1': 'Tout le plan Croissance',
    'pricing.full.f2': 'Production vidéo longue',
    'pricing.full.f3': 'Manager dédié',
    'pricing.full.f4': 'Rapports hebdomadaires',
    'pricing.full.f5': 'Support prioritaire',
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
    'contact.budget.placeholder': 'Sélectionnez une fourchette',
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
    'footer.rights': '© {year} Feekza. Tous droits réservés.',
    'footer.built': 'Construit avec le même soin que nos projets clients.',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.cookies': 'Cookies',
    
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
    'hero.stat1': 'لغات',
    'hero.stat2': 'ملكية الكود',
    'hero.stat3': 'وقت الاستجابة',
    'hero.learn': 'اعرف المزيد',
    
    // Services
    'services.label': 'اكتشف',
    'services.title1': 'ماذا',
    'services.title2': 'نحن',
    'services.title3': 'نفعل',
    'services.subtitle': 'كل ما تحتاجه شركتك لتُرى — محتوى، فيديو، قُمع، تواصل، سيو وإعلانات — مدمج في نظام نمو واحد.',
    'services.content': 'إنشاء المحتوى',
    'services.content.desc': 'منشورات وكاروسيلات وسكربتات توقف التمرير — محرك محتوى وليس منشورات عشوائية.',
    'services.video': 'مونتاج الفيديو',
    'services.video.desc': 'ريلز وتيك توك وإعلانات وفيديوهات طويلة، مونتاجها يحافظ على المشاهدة حتى النهاية.',
    'services.funnels': 'القُمع والصفحات',
    'services.funnels.desc': 'صفحات هبوط وقُمع مبيعات تحوّل النقرات إلى عملاء.',
    'services.comm': 'إدارة التواصل',
    'services.comm.desc': 'تقويمات ومنشورات وردود — صوتك متسق في كل مكان.',
    'services.seo': 'تحسين محركات البحث',
    'services.seo.desc': 'تصدّر نتائج البحث المحلية. عندما يبحث الناس عن خدمتك، يجدونك أولاً.',
    'services.ads': 'إدارة الإعلانات',
    'services.ads.desc': 'إعلانات جوجل وحملات اجتماعية مقاسة باليورو — ترى كل نتيجة.',
    
    // Portfolio
    'portfolio.label': 'ماذا نبني',
    'portfolio.title1': 'مصمم',
    'portfolio.title2': 'للنجاح',
    'portfolio.subtitle': 'إبداعات مخصصة، حرفية حقيقية، صفر قوالب — كل موقع سريع، ملكك، ومصمم للتحويل.',
    'portfolio.cta': 'ناقش هذا المشروع',
    'portfolio.p1.title': 'مواقع التحويل',
    'portfolio.p1.type': 'تطوير الويب',
    'portfolio.p1.highlight': 'سريع',
    'portfolio.p1.label': 'مواقع جاهزة لمعايير الأداء ومصممة لتحويل الزوار إلى عملاء.',
    'portfolio.p2.title': 'الهوية البصرية',
    'portfolio.p2.type': 'أنظمة التصميم',
    'portfolio.p2.highlight': 'مميز',
    'portfolio.p2.label': 'شعار وألوان وخطوط تجعلك غير قابل للخلط.',
    'portfolio.p3.title': 'حملات إعلانية',
    'portfolio.p3.type': 'جوجل ووسائل التواصل',
    'portfolio.p3.highlight': 'مستهدفة',
    'portfolio.p3.label': 'إعلانات تصل لعملاء جاهزين للشراء — مقاسة باليورو.',
    'portfolio.p4.title': 'الأتمتة',
    'portfolio.p4.type': 'الحجوزات والمتابعة',
    'portfolio.p4.highlight': 'بدون جهد',
    'portfolio.p4.label': 'حجوزات ومتابعات وتدفقات تعمل أثناء نومك.',
    
    // About
    'about.label': 'من نحن',
    'about.title': 'نحن موجودون لأن معظم الوكالات تفشل في تحقيق النتائج.',
    'about.p1': 'أسسنا Feekza بعد رؤية الكثير من الشركات تُحبط من وكالات قدمت مواقع جميلة دون أي تأثير.',
    'about.p2': 'فريقنا يجمع عقوداً من الخبرة في التصميم والتطوير والتسويق — لكن الأهم، نحن بنينا وطوّرنا شركات بأنفسنا.',
    'about.stat1': 'لغات',
    'about.stat2': 'ملكية الكود',
    'about.stat3': 'وقت الاستجابة',
    'about.stat4': 'قوالب مستخدمة',
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
    'pricing.permonth': '/شهر',
    'pricing.starter': 'بداية المحتوى',
    'pricing.starter.desc': 'حضور اجتماعي منتظم واحترافي — مُدار بالنيابة عنك.',
    'pricing.starter.f1': '12 منشور / شهر',
    'pricing.starter.f2': '8 فيديوهات قصيرة مونتاجة',
    'pricing.starter.f3': 'إدارة التواصل',
    'pricing.starter.f4': 'تقرير أداء شهري',
    'pricing.growth': 'نظام النمو',
    'pricing.growth.desc': 'المحتوى مع القُمع والسيو والإعلانات — آلة الاكتساب الكاملة.',
    'pricing.growth.f1': 'كل ما في بداية المحتوى',
    'pricing.growth.f2': 'قُمع مبيعات وصفحات هبوط',
    'pricing.growth.f3': 'تحسين محركات البحث والمحلية',
    'pricing.growth.f4': 'إدارة إعلانات جوجل والشبكات',
    'pricing.growth.f5': 'مكالمة استراتيجية شهرية',
    'pricing.full': 'شراكة كاملة',
    'pricing.full.desc': 'عمليتك الرقمية بالكامل، مُدارة من البداية للنهاية.',
    'pricing.full.f1': 'كل ما في نظام النمو',
    'pricing.full.f2': 'إنتاج فيديو (صيغ طويلة)',
    'pricing.full.f3': 'مدير مخصص',
    'pricing.full.f4': 'تقارير أسبوعية',
    'pricing.full.f5': 'دعم أولوي',
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
    'contact.budget.placeholder': 'اختر نطاقًا',
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
    'footer.rights': '© {year} Feekza. جميع الحقوق محفوظة.',
    'footer.built': 'صُنع بنفس العناية التي نضعها في مشاريع عملائنا.',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'الشروط',
    'footer.cookies': 'الكوكيز',
    
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
