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
    'services.subtitle': 'Four services, one goal: make your business impossible to ignore.',
    'services.web': 'Website Creation & Maintenance',
    'services.web.desc': 'Custom, fast websites — built for you and kept running. You own everything.',
    'services.social': 'Social Media Management',
    'services.social.desc': 'Posts, content creation and community management — your feed, alive every day.',
    'services.design': 'Design',
    'services.design.desc': 'Logos, banners, business cards and more — one consistent image everywhere.',
    'services.ads': 'Facebook Ads',
    'services.ads.desc': 'Targeted Facebook & Instagram campaigns, measured to the euro.',
    
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
    'pricing.from': 'From ',
    'pricing.single': 'Single Service',
    'pricing.single.desc': 'One service, on its own. Perfect for testing the waters.',
    'pricing.single.f1': 'Any 1 service',
    'pricing.single.f2': 'Website: €195/mo',
    'pricing.single.f3': 'Monthly report',
    'pricing.single.f4': 'Cancel anytime',
    'pricing.combo': 'Combo — Any 2',
    'pricing.combo.desc': 'Pick any 2 services, both 30% off.',
    'pricing.combo.f1': 'Any 2 services',
    'pricing.combo.f2': '30% off both',
    'pricing.combo.f3': 'From €210/mo',
    'pricing.combo.f4': 'Monthly report',
    'pricing.combo.f5': 'Priority support',
    'pricing.full': 'Feekza 360',
    'pricing.full.desc': 'All 4 services — the complete growth machine.',
    'pricing.full.f1': 'All 4 services',
    'pricing.full.f2': '40% off everything',
    'pricing.full.f3': '€387/mo flat',
    'pricing.full.f4': 'Weekly reports',
    'pricing.full.f5': 'Dedicated contact',
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
    'services.subtitle': 'Quatre services, un objectif : rendre votre entreprise impossible à ignorer.',
    'services.web': 'Création & Maintenance Web',
    'services.web.desc': 'Sites sur-mesure, rapides — construits et maintenus. Vous possédez tout.',
    'services.social': 'Gestion Réseaux Sociaux',
    'services.social.desc': 'Posts, création de contenu et gestion de communauté — votre fil, vivant chaque jour.',
    'services.design': 'Design',
    'services.design.desc': 'Logos, bannières, cartes de visite et plus — une image cohérente partout.',
    'services.ads': 'Publicité Facebook',
    'services.ads.desc': 'Campagnes Facebook & Instagram ciblées, mesurées à l’euro.',
    
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
    'pricing.from': 'Dès ',
    'pricing.single': 'Service Unique',
    'pricing.single.desc': 'Un seul service, à la carte. Parfait pour essayer.',
    'pricing.single.f1': 'Tout service au choix',
    'pricing.single.f2': 'Site web : 195 €/mois',
    'pricing.single.f3': 'Rapport mensuel',
    'pricing.single.f4': 'Résiliable à tout moment',
    'pricing.combo': 'Combo — 2 au choix',
    'pricing.combo.desc': 'Choisissez 2 services, -30% sur les deux.',
    'pricing.combo.f1': '2 services au choix',
    'pricing.combo.f2': '-30% sur les deux',
    'pricing.combo.f3': 'Dès 210 €/mois',
    'pricing.combo.f4': 'Rapport mensuel',
    'pricing.combo.f5': 'Support prioritaire',
    'pricing.full': 'Feekza 360',
    'pricing.full.desc': 'Les 4 services — la machine de croissance complète.',
    'pricing.full.f1': 'Les 4 services',
    'pricing.full.f2': '-40% sur tout',
    'pricing.full.f3': '387 €/mois fixes',
    'pricing.full.f4': 'Rapports hebdomadaires',
    'pricing.full.f5': 'Contact dédié',
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
    'services.subtitle': 'أربع خدمات، هدف واحد: جعل عملك مستحيل التجاهل.',
    'services.web': 'إنشاء المواقع وصيانتها',
    'services.web.desc': 'مواقع مخصصة وسريعة — تُبنى ويتم صيانتها. تملك كل شيء.',
    'services.social': 'إدارة وسائل التواصل',
    'services.social.desc': 'منشورات وإنشاء محتوى وإدارة مجتمع — حسابك حي كل يوم.',
    'services.design': 'التصميم',
    'services.design.desc': 'شعارات وبانرات وبطاقات عمل وأكثر — صورة متسقة في كل مكان.',
    'services.ads': 'إعلانات فيسبوك',
    'services.ads.desc': 'حملات فيسبوك وإنستغرام مستهدفة، مقاسة باليورو.',
    
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
    'pricing.from': 'ابتداءً من ',
    'pricing.single': 'خدمة واحدة',
    'pricing.single.desc': 'خدمة واحدة فقط، على حدة. مثالية للتجربة.',
    'pricing.single.f1': 'أي خدمة واحدة',
    'pricing.single.f2': 'الموقع: 195 يورو/شهر',
    'pricing.single.f3': 'تقرير شهري',
    'pricing.single.f4': 'إلغاء في أي وقت',
    'pricing.combo': 'كومبو — خدمتان',
    'pricing.combo.desc': 'اختر خدمتين، خصم 30% على كلتيهما.',
    'pricing.combo.f1': 'خدمتان من اختيارك',
    'pricing.combo.f2': 'خصم 30% على الاثنتين',
    'pricing.combo.f3': 'ابتداءً من 210 يورو/شهر',
    'pricing.combo.f4': 'تقرير شهري',
    'pricing.combo.f5': 'دعم أولوي',
    'pricing.full': 'فيكزا 360',
    'pricing.full.desc': 'الخدمات الأربع — آلة النمو الكاملة.',
    'pricing.full.f1': 'الخدمات الأربع',
    'pricing.full.f2': 'خصم 40% على كل شيء',
    'pricing.full.f3': '387 يورو/شهر ثابت',
    'pricing.full.f4': 'تقارير أسبوعية',
    'pricing.full.f5': 'مختص مخصص',
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
