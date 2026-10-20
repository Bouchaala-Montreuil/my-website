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
    'nav.discover': 'The Offer',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.pricing': 'Order',
    'nav.contact': 'Order Now',
    
    // Hero
    'hero.badge': 'Custom Websites',
    'hero.title1': 'Your Website,',
    'hero.title2': 'Built &',
    'hero.title3': 'Maintained.',
    'hero.subtitle': 'One price. One website. Everything handled — design, hosting, email, maintenance and changes, forever. €195/month.',
    'hero.cta1': 'Order Your Website',
    'hero.cta2': 'What’s Included',
    'hero.stat1': 'First version',
    'hero.stat2': 'Maintenance',
    'hero.stat3': 'Per month, all-in',
    'hero.learn': 'Learn More',
    
    // Included
    'included.label': 'The Offer',
    'included.title1': 'Everything',
    'included.title2': 'included',
    'included.title3': 'in €195/mo',
    'included.subtitle': 'No hidden fees. No surprises. One price covers it all — forever.',
    'included.design': 'Custom Website',
    'included.design.desc': 'Designed from scratch for your business. Up to 5 pages, zero templates.',
    'included.hosting': 'Hosting',
    'included.hosting.desc': 'Fast, secure hosting on us. No extra bills, ever.',
    'included.maintenance': '24/7 Maintenance',
    'included.maintenance.desc': 'Updates, backups and fixes around the clock.',
    'included.mods': 'Any Modification',
    'included.mods.desc': 'Text, photos, colors — change anything, anytime.',
    'included.email': 'Professional Email',
    'included.email.desc': 'contact@yourbusiness.com, included.',
    'included.domain': 'Domain, Year 1 Free',
    'included.domain.desc': 'Then you pay the registrar directly (~€15/year).',
    
    // How it works
    'how.label': 'The Process',
    'how.title1': 'How it',
    'how.title2': 'works',
    'how.s1': 'Order',
    'how.s1.desc': 'Answer a few questions and pay online. 2 minutes, from anywhere.',
    'how.s2': 'Preview',
    'how.s2.desc': 'Within 48–72 hours your first version is ready — a private link to review.',
    'how.s3': 'Refine',
    'how.s3.desc': 'Approve it, or ask for changes. Revisions within 24 hours.',
    'how.s4': 'Launch',
    'how.s4.desc': 'You approve → the order finalizes → your site goes live.',
    
    // Portfolio
    'portfolio.label': 'Examples',
    'portfolio.title1': 'Websites we',
    'portfolio.title2': 'build',
    'portfolio.subtitle': 'Every site is custom — designed, built and maintained for you.',
    'portfolio.cta': 'Discuss This Project',
    'portfolio.p1.title': 'Business Sites',
    'portfolio.p1.type': 'Complete Website',
    'portfolio.p1.highlight': 'Complete',
    'portfolio.p1.label': 'Everything included — from design to launch.',
    'portfolio.p2.title': 'Landing Pages',
    'portfolio.p2.type': 'One Page',
    'portfolio.p2.highlight': 'Focused',
    'portfolio.p2.label': 'One page, one goal: more customers.',
    'portfolio.p3.title': 'Showcase Sites',
    'portfolio.p3.type': 'Gallery',
    'portfolio.p3.highlight': 'Beautiful',
    'portfolio.p3.label': 'Your work, your photos, your story.',
    'portfolio.p4.title': 'Multi-language Sites',
    'portfolio.p4.type': 'EN · FR · AR',
    'portfolio.p4.highlight': 'Native',
    'portfolio.p4.label': 'Built in your clients’ languages.',
    
    // Order flow
    'order.label': 'Order',
    'order.title1': 'Order your',
    'order.title2': 'website',
    'order.subtitle': 'Answer a few questions, pay online, and see your first version in 48–72 hours.',
    
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
    'pricing.title1': 'One price.',
    'pricing.title2': 'All included',
    'pricing.subtitle': 'No tiers, no upsells. One website, one price, everything in.',
    'pricing.plan': 'Feekza Website',
    'pricing.plan.desc': 'The complete custom website. Nothing else to pay, ever.',
    'pricing.plan.f1': 'Custom website, up to 5 pages',
    'pricing.plan.f2': 'Hosting + professional email',
    'pricing.plan.f3': '24/7 maintenance & updates',
    'pricing.plan.f4': 'Any modification, anytime',
    'pricing.plan.f5': 'Domain free the first year',
    'pricing.plan.f6': 'First version in 48–72 hours',
    'pricing.plan.f7': '6-month commitment, then cancel',
    'pricing.cta': 'Order Now',
    'pricing.note': 'Satisfied or refunded. Cancel after 6 months with 1 month’s notice.',
    'pricing.permonth': '/mo',
    
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
    'footer.contact': 'Contact',
    'footer.response': 'Fast response',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.cookies': 'Cookies',
    
    // Loading
    'loading.text': 'Building Growth...',
  },
  
  fr: {
    // Nav
    'nav.discover': 'L’Offre',
    'nav.work': 'Projets',
    'nav.about': 'À Propos',
    'nav.pricing': 'Commander',
    'nav.contact': 'Commander',
    
    // Hero
    'hero.badge': 'Sites sur Mesure',
    'hero.title1': 'Votre Site,',
    'hero.title2': 'Construit &',
    'hero.title3': 'Maintenu.',
    'hero.subtitle': 'Un prix. Un site. Tout géré — design, hébergement, email, maintenance et modifications, pour toujours. 195 €/mois.',
    'hero.cta1': 'Commandez Votre Site',
    'hero.cta2': 'Ce Qui Est Inclus',
    'hero.stat1': 'Première version',
    'hero.stat2': 'Maintenance',
    'hero.stat3': 'Par mois, tout compris',
    'hero.learn': 'En Savoir Plus',
    
    // Included
    'included.label': 'L’Offre',
    'included.title1': 'Un prix.',
    'included.title2': 'Tout',
    'included.title3': 'inclus.',
    'included.subtitle': 'Aucun frais caché. Aucune surprise. Un prix couvre tout — pour toujours.',
    'included.design': 'Site sur mesure',
    'included.design.desc': 'Conçu sur mesure pour votre activité. Jusqu’à 5 pages, zéro template.',
    'included.hosting': 'Hébergement',
    'included.hosting.desc': 'Hébergement rapide et sécurisé. Plus jamais de facture supplémentaire.',
    'included.maintenance': 'Maintenance 24/7',
    'included.maintenance.desc': 'Mises à jour, sauvegardes et corrections à toute heure.',
    'included.mods': 'Modifications illimitées',
    'included.mods.desc': 'Textes, photos, couleurs — changez tout, quand vous voulez.',
    'included.email': 'Email professionnel',
    'included.email.desc': 'contact@votreentreprise.com, inclus.',
    'included.domain': 'Domaine offert 1 an',
    'included.domain.desc': 'Puis vous payez le registrar directement (~15 €/an).',
    
    // How it works
    'how.label': 'Le Processus',
    'how.title1': 'Comment',
    'how.title2': 'ça marche',
    'how.s1': 'Commande',
    'how.s1.desc': 'Répondez à quelques questions et payez en ligne. 2 minutes, de partout.',
    'how.s2': 'Prévisualisation',
    'how.s2.desc': 'Sous 48–72 heures, votre première version est prête — un lien privé pour la consulter.',
    'how.s3': 'Ajustements',
    'how.s3.desc': 'Approuvez-la ou demandez des modifications. Révisions sous 24 heures.',
    'how.s4': 'Lancement',
    'how.s4.desc': 'Vous approuvez → la commande est finalisée → votre site est en ligne.',
    
    // Portfolio
    'portfolio.label': 'Exemples',
    'portfolio.title1': 'Des sites',
    'portfolio.title2': 'sur mesure',
    'portfolio.subtitle': 'Chaque site est unique — conçu, construit et maintenu pour vous.',
    'portfolio.cta': 'Discuter de ce projet',
    'portfolio.p1.title': 'Sites d’entreprise',
    'portfolio.p1.type': 'Site complet',
    'portfolio.p1.highlight': 'Complet',
    'portfolio.p1.label': 'Tout inclus — du design au lancement.',
    'portfolio.p2.title': 'Pages de destination',
    'portfolio.p2.type': 'Une page',
    'portfolio.p2.highlight': 'Ciblé',
    'portfolio.p2.label': 'Une page, un objectif : plus de clients.',
    'portfolio.p3.title': 'Sites vitrine',
    'portfolio.p3.type': 'Galerie',
    'portfolio.p3.highlight': 'Magnifique',
    'portfolio.p3.label': 'Votre travail, vos photos, votre histoire.',
    'portfolio.p4.title': 'Sites multilingues',
    'portfolio.p4.type': 'EN · FR · AR',
    'portfolio.p4.highlight': 'Natif',
    'portfolio.p4.label': 'Créés dans les langues de vos clients.',

    // Order flow
    'order.label': 'Commande',
    'order.title1': 'Commandez',
    'order.title2': 'votre site',
    'order.subtitle': 'Répondez à quelques questions, payez en ligne, et recevez votre première version sous 48–72 heures.',
    
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
    'pricing.title1': 'Un prix.',
    'pricing.title2': 'Tout inclus',
    'pricing.subtitle': 'Pas de niveaux, pas de suppléments. Un site, un prix, tout compris.',
    'pricing.plan': 'Site Feekza',
    'pricing.plan.desc': 'Le site sur mesure complet. Rien d’autre à payer, jamais.',
    'pricing.plan.f1': 'Site sur mesure, jusqu’à 5 pages',
    'pricing.plan.f2': 'Hébergement + email professionnel',
    'pricing.plan.f3': 'Maintenance & mises à jour 24/7',
    'pricing.plan.f4': 'Modifications à tout moment',
    'pricing.plan.f5': 'Domaine offert la première année',
    'pricing.plan.f6': 'Première version sous 48–72 heures',
    'pricing.plan.f7': '6 mois d’engagement, puis résiliable',
    'pricing.cta': 'Commander',
    'pricing.note': 'Satisfait ou remboursé. Résiliable après 6 mois avec 1 mois de préavis.',
    'pricing.permonth': '/mois',
    
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
    'footer.contact': 'Contact',
    'footer.response': 'Réponse rapide',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.cookies': 'Cookies',
    
    // Loading
    'loading.text': 'Création en cours...',
  },
  
  ar: {
    // Nav
    'nav.discover': 'العرض',
    'nav.work': 'أعمالنا',
    'nav.about': 'من نحن',
    'nav.pricing': 'اطلب',
    'nav.contact': 'اطلب الآن',
    
    // Hero
    'hero.badge': 'مواقع مخصصة',
    'hero.title1': 'موقعك،',
    'hero.title2': 'يُبنى',
    'hero.title3': 'ويُصان.',
    'hero.subtitle': 'سعر واحد. موقع واحد. كل شيء مُدار — التصميم والاستضافة والبريد والصيانة والتعديلات، للأبد. 195 يورو/شهر.',
    'hero.cta1': 'اطلب موقعك',
    'hero.cta2': 'ماذا يشمل',
    'hero.stat1': 'النسخة الأولى',
    'hero.stat2': 'صيانة',
    'hero.stat3': 'شهريًا، كل شيء',
    'hero.learn': 'اعرف المزيد',
    
    // Included
    'included.label': 'العرض',
    'included.title1': 'سعر واحد.',
    'included.title2': 'كل شيء',
    'included.title3': 'مشمول.',
    'included.subtitle': 'لا رسوم خفية. لا مفاجآت. سعر واحد يشمل كل شيء — للأبد.',
    'included.design': 'موقع مخصص',
    'included.design.desc': 'مصمم من الصفر لنشاطك. حتى 5 صفحات، بدون قوالب.',
    'included.hosting': 'استضافة',
    'included.hosting.desc': 'استضافة سريعة وآمنة على حسابنا. لا فواتير إضافية أبدًا.',
    'included.maintenance': 'صيانة 24/7',
    'included.maintenance.desc': 'تحديثات ونسخ احتياطية وإصلاحات على مدار الساعة.',
    'included.mods': 'تعديلات بلا حدود',
    'included.mods.desc': 'نصوص وصور وألوان — غيّر أي شيء في أي وقت.',
    'included.email': 'بريد احترافي',
    'included.email.desc': 'بريد باسم نشاطك التجاري، مشمول.',
    'included.domain': 'النطاق مجاني السنة الأولى',
    'included.domain.desc': 'بعدها تدفع للمسجل مباشرة (~15 يورو/سنة).',
    
    // How it works
    'how.label': 'العملية',
    'how.title1': 'كيف',
    'how.title2': 'تعمل',
    'how.s1': 'الطلب',
    'how.s1.desc': 'أجب عن بعض الأسئلة وادفع أونلاين. دقيقتان، من أي مكان.',
    'how.s2': 'المعاينة',
    'how.s2.desc': 'خلال 48–72 ساعة، نسختك الأولى جاهزة — رابط خاص لمراجعتها.',
    'how.s3': 'التعديل',
    'how.s3.desc': 'وافق أو اطلب تعديلات. التعديلات خلال 24 ساعة.',
    'how.s4': 'الإطلاق',
    'how.s4.desc': 'توافق → تُنهى الطلب → موقعك ينطلق.',
    
    // Portfolio
    'portfolio.label': 'أمثلة',
    'portfolio.title1': 'مواقع',
    'portfolio.title2': 'نصنعها',
    'portfolio.subtitle': 'كل موقع فريد — مصمم ومبني ومُصان من أجلك.',
    'portfolio.cta': 'ناقش هذا المشروع',
    'portfolio.p1.title': 'مواقع الشركات',
    'portfolio.p1.type': 'موقع متكامل',
    'portfolio.p1.highlight': 'شامل',
    'portfolio.p1.label': 'كل شيء مشمول — من التصميم إلى الإطلاق.',
    'portfolio.p2.title': 'صفحات الهبوط',
    'portfolio.p2.type': 'صفحة واحدة',
    'portfolio.p2.highlight': 'مركّز',
    'portfolio.p2.label': 'صفحة واحدة، هدف واحد: عملاء أكثر.',
    'portfolio.p3.title': 'مواقع العرض',
    'portfolio.p3.type': 'معرض',
    'portfolio.p3.highlight': 'رائع',
    'portfolio.p3.label': 'عملك وصورك وقصتك.',
    'portfolio.p4.title': 'مواقع متعددة اللغات',
    'portfolio.p4.type': 'فرنسية · إنجليزية · عربية',
    'portfolio.p4.highlight': 'أصلي',
    'portfolio.p4.label': 'مبنية بلغات عملائك.',

    // Order flow
    'order.label': 'الطلب',
    'order.title1': 'اطلب',
    'order.title2': 'موقعك',
    'order.subtitle': 'أجب عن بعض الأسئلة، ادفع أونلاين، واستلم نسختك الأولى خلال 48–72 ساعة.',
    
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
    'pricing.title1': 'سعر واحد.',
    'pricing.title2': 'كل شيء مشمول',
    'pricing.subtitle': 'لا مستويات ولا إضافات. موقع واحد، سعر واحد، كل شيء داخل.',
    'pricing.plan': 'موقع فيكزا',
    'pricing.plan.desc': 'الموقع المخصص الكامل. لا شيء آخر للدفع، أبدًا.',
    'pricing.plan.f1': 'موقع مخصص حتى 5 صفحات',
    'pricing.plan.f2': 'استضافة + بريد احترافي',
    'pricing.plan.f3': 'صيانة وتحديثات 24/7',
    'pricing.plan.f4': 'تعديلات في أي وقت',
    'pricing.plan.f5': 'النطاق مجاني السنة الأولى',
    'pricing.plan.f6': 'النسخة الأولى خلال 48–72 ساعة',
    'pricing.plan.f7': '6 أشهر التزام، ثم إلغاء',
    'pricing.cta': 'اطلب الآن',
    'pricing.note': 'غير راضٍ؟ نسترجع المال. إلغاء بعد 6 أشهر بإشعار شهر واحد.',
    'pricing.permonth': '/شهر',
    
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
    'footer.contact': 'تواصل',
    'footer.response': 'رد سريع',
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
