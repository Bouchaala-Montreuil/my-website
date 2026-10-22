/**
 * Copy for the FEEKZA brief — one place, three languages.
 *
 * The brief is written as a document: a cover with a sommaire that fills in,
 * and one question at a time on the desk. Service lines are written in the
 * first person, so the visitor picks their own sentence.
 */
import type { Locale } from "./types";

export type JourneyServiceId = "site" | "refonte" | "seo" | "social" | "ads" | "strategie" | "autre";

export interface JourneyOption {
  id: string;
  label: string;
  note?: string;
}

/** One adaptive question of the project chapter. */
export interface JourneyPrompt {
  question: string;
  hint: string;
  mode: "single" | "multi" | "text";
  options?: JourneyOption[];
  /** A second, quieter question asked in the same chapter. */
  extra?: { label: string; options: string[] };
  website?: "required" | "optional";
  placeholder?: string;
}

export interface JourneyCopy {
  localeName: string;
  subject: string;
  brand: {
    tag: string;
    ref: string;
    title: string;
    untitled: string;
    summary: string;
    offer: string[];
  };
  chapters: {
    service: string;
    context: string;
    goal: string;
    project: Record<JourneyServiceId, string>;
    budget: string;
    contact: string;
  };
  steps: {
    service: { question: string; hint: string };
    context: { question: string; hint: string };
    goal: { question: string; hint: string; lead: string };
    project: Record<JourneyServiceId, JourneyPrompt>;
    budget: { question: string; hint: string; note: string; options: string[] };
    contact: { question: string; hint: string };
  };
  services: JourneyOption[];
  business: { label: string; placeholder: string };
  sector: { label: string; optional: string; options: string[] };
  website: { label: string; placeholder: string; optional: string; required: string };
  problems: JourneyOption[];
  siteTypes: JourneyOption[];
  zones: JourneyOption[];
  platforms: JourneyOption[];
  publishers: string[];
  adOutcomes: JourneyOption[];
  adDestinations: string[];
  timeline: JourneyOption[];
  other: { label: string; placeholder: string };
  notes: { label: string; hint: string; placeholder: string };
  goals: JourneyOption[];
  fields: { name: string; email: string; phone: string; optional: string };
  placeholders: { name: string; email: string; phone: string };
  consentBefore: string;
  consentLink: string;
  requiredNote: string;
  back: string;
  next: string;
  pass: string;
  submit: string;
  sending: string;
  review: string;
  empty: string;
  errors: {
    service: string;
    business: string;
    website: string;
    goal: string;
    name: string;
    email: string;
    consent: string;
  };
  errorHint: string;
  failureTitle: string;
  failureBody: string;
  retry: string;
  mailto: string;
  successTitle: string;
  successBody: string;
  successSteps: string[];
  successNote: string;
  successAgain: string;
}

/* ── Français ─────────────────────────────────────────────────────────── */

const fr: JourneyCopy = {
  localeName: "Français",
  subject: "Brief",
  brand: {
    tag: "Brief",
    ref: "Réf.",
    title: "Votre brief",
    untitled: "Votre activité",
    summary: "Sommaire du brief",
    offer: ["195 € TTC / mois", "Sans frais de lancement", "Réponse écrite sous 1 jour ouvré"],
  },
  chapters: {
    service: "La demande",
    context: "Votre activité",
    goal: "L’objectif",
    project: {
      site: "Votre site",
      refonte: "Votre site",
      seo: "Votre visibilité",
      social: "Vos réseaux",
      ads: "Votre campagne",
      strategie: "Votre priorité",
      autre: "Votre projet",
    },
    budget: "Le budget",
    contact: "Vos coordonnées",
  },
  steps: {
    service: {
      question: "Qu’est-ce qu’on pourrait construire pour votre activité ?",
      hint: "Choisissez la phrase qui vous ressemble. La suite s’adapte.",
    },
    context: {
      question: "Quelle activité faites-vous vivre ?",
      hint: "Le nom suffit pour commencer. Le reste se précisera à la lecture.",
    },
    goal: {
      question: "Qu’est-ce que ça doit changer ?",
      hint: "Un seul cap. C’est lui qui décidera du reste.",
      lead: "Je veux",
    },
    project: {
      site: {
        question: "Quel genre de site vous faut-il ?",
        hint: "On part de là. Le format exact se décide à la lecture du brief.",
        mode: "single",
        options: [
          { id: "vitrine", label: "Une vitrine", note: "Cinq pages claires, qui présentent et rassurent." },
          { id: "boutique", label: "Une boutique en ligne", note: "Vendre, encaisser, livrer." },
          { id: "page", label: "Une page pour une campagne", note: "Une seule page, pensée pour convertir." },
          { id: "avis", label: "Je ne sais pas encore", note: "On propose le format dans la réponse." },
        ],
      },
      refonte: {
        question: "Qu’est-ce qui ne va plus, aujourd’hui ?",
        hint: "Un seul point suffit pour commencer.",
        mode: "single",
        options: [
          { id: "design", label: "Le design a vieilli", note: "Il ne ressemble plus à l’entreprise." },
          { id: "lent", label: "Le site est lent", note: "Les visiteurs partent avant la fin du chargement." },
          { id: "mobile", label: "Il est illisible sur téléphone", note: "La majorité du trafic est pourtant là." },
          { id: "demandes", label: "Il ne génère pas de demandes", note: "Il est visité, mais personne n’écrit." },
        ],
        website: "required",
      },
      seo: {
        question: "Où voulez-vous être trouvé ?",
        hint: "La zone décide de la stratégie, pas l’inverse.",
        mode: "single",
        options: [
          { id: "local", label: "Autour de chez moi", note: "Un rayon de quelques kilomètres." },
          { id: "france", label: "Partout en France", note: "Des recherches nationales." },
          { id: "monde", label: "À l’international", note: "D’autres langues, d’autres marchés." },
        ],
        website: "required",
      },
      social: {
        question: "Quels réseaux comptent pour vous ?",
        hint: "Plusieurs choix possibles. On ne travaille que ceux qui servent.",
        mode: "multi",
        options: [
          { id: "instagram", label: "Instagram", note: "Image, coulisses, produits." },
          { id: "linkedin", label: "LinkedIn", note: "Crédibilité et prospection." },
          { id: "tiktok", label: "TikTok", note: "Portée organique, formats courts." },
          { id: "facebook", label: "Facebook", note: "Communauté locale et événements." },
          { id: "youtube", label: "YouTube", note: "Formats longs, recherche." },
        ],
        extra: { label: "Qui publie aujourd’hui ?", options: ["Moi-même", "Personne", "Une équipe"] },
      },
      ads: {
        question: "Qu’attendez-vous de la publicité ?",
        hint: "L’objectif décide du canal, du budget et du message.",
        mode: "single",
        options: [
          { id: "demandes", label: "Des demandes entrantes", note: "Des gens qui écrivent ou appellent." },
          { id: "ventes", label: "Des ventes directes", note: "Un panier qui se remplit." },
          { id: "appels", label: "Des appels", note: "Pour un commerce ou un service local." },
          { id: "notoriete", label: "De la notoriété", note: "Être vu par la bonne audience." },
        ],
        extra: { label: "Sur quoi la campagne pointe ?", options: ["Mon site actuel", "Une page dédiée", "Pas encore décidé"] },
        website: "optional",
      },
      strategie: {
        question: "Quelle est la priorité des trois prochains mois ?",
        hint: "Le plan se construit autour de cette date.",
        mode: "single",
        options: [
          { id: "asap", label: "Dès que possible", note: "On met tout sur la première version." },
          { id: "mois", label: "Sous un mois", note: "Un lancement cadencé, sans bâclage." },
          { id: "trimestre", label: "Sous trois mois", note: "Le temps de faire les choses dans l’ordre." },
          { id: "rien", label: "Pas d’urgence", note: "On commence par ce qui rapporte le plus." },
        ],
      },
      autre: {
        question: "Dites-le en deux mots.",
        hint: "On répond avec un point de départ concret, pas une plaquette.",
        mode: "text",
        placeholder: "Ex. lancer une boutique de céramique en ligne…",
      },
    },
    budget: {
      question: "Un budget de départ ?",
      hint: "Facultatif. Dites juste ce qui vous paraît raisonnable.",
      note: "Le devis reste gratuit, et aucune carte n’est demandée.",
      options: ["195 € / mois", "200 – 500 € / mois", "500 – 1 000 € / mois", "Plus de 1 000 € / mois", "À définir ensemble"],
    },
    contact: {
      question: "Où peut-on vous répondre ?",
      hint: "Réponse écrite sous 1 jour ouvré, par une vraie personne.",
    },
  },
  services: [
    { id: "site", label: "Construire mon site.", note: "Vitrine claire, livrée en 48–72 h." },
    { id: "refonte", label: "Refondre mon site actuel.", note: "Reprendre un site daté, sans repartir de zéro." },
    { id: "seo", label: "Me rendre visible sur Google.", note: "Être trouvé par les bonnes recherches." },
    { id: "social", label: "Animer mes réseaux sociaux.", note: "Publier régulièrement, sans y passer mes soirées." },
    { id: "ads", label: "Lancer de la publicité en ligne.", note: "Des campagnes qui ramènent des demandes." },
    { id: "strategie", label: "Construire une stratégie marketing.", note: "Un plan clair, du site aux réseaux." },
    { id: "autre", label: "Autre chose.", note: "Dites-le en deux mots, on avisera." },
  ],
  business: { label: "Le nom de votre entreprise", placeholder: "Ex. Maison Lafleur" },
  sector: {
    label: "Votre secteur",
    optional: "facultatif",
    options: ["Commerce local", "Restauration", "Santé & bien-être", "Immobilier", "Services B2B", "E-commerce", "Autre"],
  },
  website: { label: "Votre site actuel", placeholder: "https://…", optional: "facultatif", required: "obligatoire" },
  problems: [],
  siteTypes: [],
  zones: [],
  platforms: [],
  publishers: [],
  adOutcomes: [],
  adDestinations: [],
  timeline: [],
  other: { label: "En deux mots", placeholder: "Ex. lancer une boutique de céramique en ligne…" },
  notes: {
    label: "Le contexte, en deux phrases",
    hint: "Facultatif. Les détails se règlent à la lecture.",
    placeholder: "Ex. nous ouvrons un second lieu en juin, le site doit suivre…",
  },
  goals: [
    { id: "clients", label: "Attirer plus de clients", note: "Des demandes qui arrivent d’elles-mêmes." },
    { id: "leads", label: "Générer des demandes qualifiées", note: "Moins de contacts, mais les bons." },
    { id: "ventes", label: "Augmenter mes ventes", note: "Vendre en ligne, sans friction." },
    { id: "visibilite", label: "Gagner en visibilité", note: "Être là où l’on me cherche." },
    { id: "confiance", label: "Inspirer confiance", note: "Un site qui fait bonne impression." },
  ],
  fields: { name: "Votre nom", email: "Votre e-mail", phone: "Téléphone", optional: "facultatif" },
  placeholders: { name: "Prénom et nom", email: "vous@exemple.fr", phone: "06 00 00 00 00" },
  consentBefore: "J’accepte que mes réponses soient utilisées pour me répondre.",
  consentLink: "Politique de confidentialité",
  requiredNote: "Les champs marqués * sont nécessaires pour vous répondre.",
  back: "Retour",
  next: "Continuer",
  pass: "Passer",
  submit: "Envoyer mon brief",
  sending: "Envoi en cours…",
  review: "Ce que nous avons compris",
  empty: "—",
  errors: {
    service: "Choisissez la phrase qui vous ressemble.",
    business: "Indiquez le nom de votre entreprise.",
    website: "Indiquez l’adresse de votre site.",
    goal: "Choisissez l’objectif principal.",
    name: "Indiquez votre nom.",
    email: "Indiquez une adresse e-mail valide.",
    consent: "Cochez cette case pour envoyer le brief.",
  },
  errorHint: "Tout est conservé. Corrigez le champ indiqué et reprenez.",
  failureTitle: "L’envoi n’a pas abouti",
  failureBody: "Vos réponses sont toujours là. Réessayez, ou écrivez-nous directement.",
  retry: "Réessayer",
  mailto: "Envoyer par e-mail",
  successTitle: "C’est parti.",
  successBody:
    "Votre brief nous est arrivé. Vous recevez une réponse écrite sous 1 jour ouvré, avec un périmètre clair et aucun engagement.",
  successSteps: [
    "Nous lisons votre brief aujourd’hui.",
    "Vous recevez un périmètre écrit sous 1 jour ouvré.",
    "Si ça vous convient, on lance la première version.",
  ],
  successNote: "Aucun paiement n’est demandé pour envoyer un brief.",
  successAgain: "Écrire un autre brief",
};

/* ── English ──────────────────────────────────────────────────────────── */

const en: JourneyCopy = {
  localeName: "English",
  subject: "Brief",
  brand: {
    tag: "Brief",
    ref: "Ref.",
    title: "Your brief",
    untitled: "Your business",
    summary: "Brief contents",
    offer: ["€195 incl. tax / month", "No setup fee", "Written reply within one working day"],
  },
  chapters: {
    service: "The request",
    context: "Your business",
    goal: "The goal",
    project: {
      site: "Your site",
      refonte: "Your site",
      seo: "Your visibility",
      social: "Your channels",
      ads: "Your campaign",
      strategie: "Your priority",
      autre: "Your project",
    },
    budget: "The budget",
    contact: "Your details",
  },
  steps: {
    service: {
      question: "What could we build for your business?",
      hint: "Pick the sentence that sounds like you. The rest adapts.",
    },
    context: {
      question: "What business do you run?",
      hint: "The name is enough to start. The rest can follow.",
    },
    goal: {
      question: "What should this change?",
      hint: "One direction. Everything else follows from it.",
      lead: "I want to",
    },
    project: {
      site: {
        question: "What kind of site do you need?",
        hint: "We start there. The exact format is settled when we read the brief.",
        mode: "single",
        options: [
          { id: "vitrine", label: "A brochure site", note: "Five clear pages that explain and reassure." },
          { id: "boutique", label: "An online shop", note: "Sell, take payment, ship." },
          { id: "page", label: "A campaign page", note: "One page, built to convert." },
          { id: "avis", label: "I don’t know yet", note: "We suggest the format in our reply." },
        ],
      },
      refonte: {
        question: "What is not working today?",
        hint: "One point is enough to start.",
        mode: "single",
        options: [
          { id: "design", label: "The design feels dated", note: "It no longer looks like the business." },
          { id: "lent", label: "The site is slow", note: "Visitors leave before it loads." },
          { id: "mobile", label: "It is unusable on a phone", note: "Where most of the traffic is." },
          { id: "demandes", label: "It brings no enquiries", note: "People visit, nobody writes." },
        ],
        website: "required",
      },
      seo: {
        question: "Where do you want to be found?",
        hint: "The area decides the strategy, not the other way round.",
        mode: "single",
        options: [
          { id: "local", label: "Around my area", note: "A radius of a few kilometres." },
          { id: "france", label: "Across the country", note: "National searches." },
          { id: "monde", label: "Internationally", note: "Other languages, other markets." },
        ],
        website: "required",
      },
      social: {
        question: "Which channels matter to you?",
        hint: "Several answers allowed. We only work the ones that earn their place.",
        mode: "multi",
        options: [
          { id: "instagram", label: "Instagram", note: "Image, process, products." },
          { id: "linkedin", label: "LinkedIn", note: "Credibility and prospecting." },
          { id: "tiktok", label: "TikTok", note: "Organic reach, short formats." },
          { id: "facebook", label: "Facebook", note: "Local community and events." },
          { id: "youtube", label: "YouTube", note: "Long form and search." },
        ],
        extra: { label: "Who posts today?", options: ["Me", "Nobody", "A team"] },
      },
      ads: {
        question: "What do you expect from advertising?",
        hint: "The objective decides the channel, the budget and the message.",
        mode: "single",
        options: [
          { id: "demandes", label: "Incoming enquiries", note: "People who write or call." },
          { id: "ventes", label: "Direct sales", note: "A basket that fills." },
          { id: "appels", label: "Calls", note: "For a local shop or service." },
          { id: "notoriete", label: "Awareness", note: "Be seen by the right audience." },
        ],
        extra: { label: "Where should the campaign point?", options: ["My current site", "A dedicated page", "Not decided yet"] },
        website: "optional",
      },
      strategie: {
        question: "What is the priority for the next three months?",
        hint: "The plan is built around that date.",
        mode: "single",
        options: [
          { id: "asap", label: "As soon as possible", note: "Everything goes into the first version." },
          { id: "mois", label: "Within a month", note: "A paced launch, nothing rushed." },
          { id: "trimestre", label: "Within three months", note: "Time to do things in order." },
          { id: "rien", label: "No rush", note: "We start with what pays back fastest." },
        ],
      },
      autre: {
        question: "Put it in two words.",
        hint: "We reply with a concrete starting point, not a brochure.",
        mode: "text",
        placeholder: "e.g. launch a ceramics shop online…",
      },
    },
    budget: {
      question: "A starting budget?",
      hint: "Optional. Just tell us what feels reasonable.",
      note: "The quote is free, and no card is ever asked for.",
      options: ["€195 / month", "€200 – 500 / month", "€500 – 1,000 / month", "More than €1,000 / month", "Let’s work it out"],
    },
    contact: {
      question: "Where can we reply?",
      hint: "Written reply within one working day, from a real person.",
    },
  },
  services: [
    { id: "site", label: "Build my website.", note: "Clear brochure site, delivered in 48–72 h." },
    { id: "refonte", label: "Redesign my current site.", note: "Bring a dated site back, without starting over." },
    { id: "seo", label: "Make me visible on Google.", note: "Be found for the searches that matter." },
    { id: "social", label: "Run my social channels.", note: "Publish consistently without living on it." },
    { id: "ads", label: "Launch online advertising.", note: "Campaigns that bring in enquiries." },
    { id: "strategie", label: "Build a marketing strategy.", note: "One clear plan, from site to social." },
    { id: "autre", label: "Something else.", note: "Two words will do — we’ll take it from there." },
  ],
  business: { label: "Your business name", placeholder: "e.g. Maison Lafleur" },
  sector: {
    label: "Your sector",
    optional: "optional",
    options: ["Local retail", "Food & drink", "Health & wellbeing", "Property", "B2B services", "E-commerce", "Other"],
  },
  website: { label: "Your current site", placeholder: "https://…", optional: "optional", required: "required" },
  problems: [],
  siteTypes: [],
  zones: [],
  platforms: [],
  publishers: [],
  adOutcomes: [],
  adDestinations: [],
  timeline: [],
  other: { label: "In two words", placeholder: "e.g. launch a ceramics shop online…" },
  notes: {
    label: "The context, in two sentences",
    hint: "Optional. Details come later.",
    placeholder: "e.g. we open a second space in June, the site has to follow…",
  },
  goals: [
    { id: "clients", label: "Attract more customers", note: "Enquiries that come on their own." },
    { id: "leads", label: "Generate qualified enquiries", note: "Fewer contacts, better ones." },
    { id: "ventes", label: "Increase my sales", note: "Sell online without friction." },
    { id: "visibilite", label: "Gain visibility", note: "Be where people look for me." },
    { id: "confiance", label: "Inspire trust", note: "A site that makes a good impression." },
  ],
  fields: { name: "Your name", email: "Your email", phone: "Phone", optional: "optional" },
  placeholders: { name: "First and last name", email: "you@example.com", phone: "06 00 00 00 00" },
  consentBefore: "I agree that my answers may be used to reply to me.",
  consentLink: "Privacy policy",
  requiredNote: "Fields marked * are needed to reply to you.",
  back: "Back",
  next: "Continue",
  pass: "Skip",
  submit: "Send my brief",
  sending: "Sending…",
  review: "What we understood",
  empty: "—",
  errors: {
    service: "Pick the sentence that sounds like you.",
    business: "Tell us your business name.",
    website: "Give us your site address.",
    goal: "Choose the main goal.",
    name: "Tell us your name.",
    email: "Give us a valid email address.",
    consent: "Tick this box to send the brief.",
  },
  errorHint: "Everything is kept. Fix the highlighted field and continue.",
  failureTitle: "The brief did not send",
  failureBody: "Your answers are still here. Try again, or write to us directly.",
  retry: "Try again",
  mailto: "Send by email",
  successTitle: "Off it goes.",
  successBody:
    "Your brief has reached us. You get a written reply within one working day, with a clear scope and no commitment.",
  successSteps: [
    "We read your brief today.",
    "You get a written scope within one working day.",
    "If it suits you, we start the first version.",
  ],
  successNote: "No payment is asked for to send a brief.",
  successAgain: "Write another brief",
};

/* ── العربية ──────────────────────────────────────────────────────────── */

const ar: JourneyCopy = {
  localeName: "العربية",
  subject: "بريف",
  brand: {
    tag: "بريف",
    ref: "مرجع",
    title: "بريفك",
    untitled: "نشاطك",
    summary: "فهرس البريف",
    offer: ["195 € شاملة الضريبة / شهرياً", "بدون رسوم تأسيس", "ردّ مكتوب خلال يوم عمل"],
  },
  chapters: {
    service: "الطلب",
    context: "نشاطك",
    goal: "الهدف",
    project: {
      site: "موقعك",
      refonte: "موقعك",
      seo: "ظهورك",
      social: "شبكاتك",
      ads: "حملتك",
      strategie: "أولويتك",
      autre: "مشروعك",
    },
    budget: "الميزانية",
    contact: "بيانات التواصل",
  },
  steps: {
    service: {
      question: "ماذا يمكننا أن نبني لنشاطك؟",
      hint: "اختر الجملة التي تشبهك. البقية تتكيّف.",
    },
    context: {
      question: "ما النشاط الذي تديره؟",
      hint: "الاسم يكفي للبداية. الباقي يظهر عند القراءة.",
    },
    goal: {
      question: "ما الذي يجب أن يتغيّر؟",
      hint: "اتجاه واحد. هو الذي يحدّد الباقي.",
      lead: "أريد أن",
    },
    project: {
      site: {
        question: "أي نوع من المواقع تحتاج؟",
        hint: "نبدأ من هنا. الشكل الدقيق يُحدّد عند قراءة البريف.",
        mode: "single",
        options: [
          { id: "vitrine", label: "موقع تعريفي", note: "خمس صفحات واضحة تعرض وتطمئن." },
          { id: "boutique", label: "متجر إلكتروني", note: "بيع، دفع، توصيل." },
          { id: "page", label: "صفحة لحملة", note: "صفحة واحدة مبنية للتحويل." },
          { id: "avis", label: "لا أعرف بعد", note: "نقترح الشكل في الرد." },
        ],
      },
      refonte: {
        question: "ما الذي لم يعد يعمل اليوم؟",
        hint: "نقطة واحدة تكفي للبداية.",
        mode: "single",
        options: [
          { id: "design", label: "التصميم قديم", note: "لم يعد يشبه الشركة." },
          { id: "lent", label: "الموقع بطيء", note: "الزوار يغادرون قبل التحميل." },
          { id: "mobile", label: "غير مقروء على الهاتف", note: "معظم الزيارات من هناك." },
          { id: "demandes", label: "لا يجلب طلبات", note: "يُزار، لكن لا أحد يكتب." },
        ],
        website: "required",
      },
      seo: {
        question: "أين تريد أن تظهر؟",
        hint: "النطاق يحدّد الاستراتيجية، وليس العكس.",
        mode: "single",
        options: [
          { id: "local", label: "حول منطقتي", note: "دائرة من عدة كيلومترات." },
          { id: "france", label: "في كل فرنسا", note: "بحث وطني." },
          { id: "monde", label: "دولياً", note: "لغات وأسواق أخرى." },
        ],
        website: "required",
      },
      social: {
        question: "أي شبكات تهمّك؟",
        hint: "يمكن اختيار أكثر من واحدة. نعمل فقط ما يستحق.",
        mode: "multi",
        options: [
          { id: "instagram", label: "إنستغرام", note: "صورة، كواليس، منتجات." },
          { id: "linkedin", label: "لينكدإن", note: "مصداقية واستقطاب." },
          { id: "tiktok", label: "تيك توك", note: "وصول عضوي، مقاطع قصيرة." },
          { id: "facebook", label: "فيسبوك", note: "مجتمع محلي وفعاليات." },
          { id: "youtube", label: "يوتيوب", note: "محتوى طويل وبحث." },
        ],
        extra: { label: "من ينشر اليوم؟", options: ["أنا", "لا أحد", "فريق"] },
      },
      ads: {
        question: "ماذا تنتظر من الإعلان؟",
        hint: "الهدف يحدّد القناة والميزانية والرسالة.",
        mode: "single",
        options: [
          { id: "demandes", label: "طلبات واردة", note: "أشخاص يكتبون أو يتصلون." },
          { id: "ventes", label: "مبيعات مباشرة", note: "سلة تمتلئ." },
          { id: "appels", label: "اتصالات هاتفية", note: "لمتجر أو خدمة محلية." },
          { id: "notoriete", label: "شهرة", note: "أن يراك الجمهور المناسب." },
        ],
        extra: { label: "إلى أين توجّه الحملة؟", options: ["موقعي الحالي", "صفحة مخصّصة", "لم يُحدّد بعد"] },
        website: "optional",
      },
      strategie: {
        question: "ما أولويتك في الأشهر الثلاثة القادمة؟",
        hint: "الخطة تُبنى حول هذا التاريخ.",
        mode: "single",
        options: [
          { id: "asap", label: "في أسرع وقت", note: "كل شيء في النسخة الأولى." },
          { id: "mois", label: "خلال شهر", note: "إطلاق متدرّج دون استعجال." },
          { id: "trimestre", label: "خلال ثلاثة أشهر", note: "وقت لترتيب الأمور." },
          { id: "rien", label: "لا استعجال", note: "نبدأ بما يعطي أكثر." },
        ],
      },
      autre: {
        question: "قلها بكلمتين.",
        hint: "نجيب بنقطة بداية ملموسة، لا بكتيّب.",
        mode: "text",
        placeholder: "مثال: إطلاق متجر سيراميك على الإنترنت…",
      },
    },
    budget: {
      question: "ميزانية البداية؟",
      hint: "اختياري. قل فقط ما يبدو معقولاً.",
      note: "العرض مجاني، ولا نطلب أي بطاقة.",
      options: ["195 € / شهرياً", "200 – 500 € / شهرياً", "500 – 1 000 € / شهرياً", "أكثر من 1 000 € / شهرياً", "نحدّدها معاً"],
    },
    contact: {
      question: "أين نجيبك؟",
      hint: "ردّ مكتوب خلال يوم عمل، من شخص حقيقي.",
    },
  },
  services: [
    { id: "site", label: "أبني موقعي.", note: "موقع تعريفي واضح، يُسلّم في 48–72 ساعة." },
    { id: "refonte", label: "أجدّد موقعي الحالي.", note: "إحياء موقع قديم دون البدء من الصفر." },
    { id: "seo", label: "أظهر على Google.", note: "أن أُوجد في البحث المناسب." },
    { id: "social", label: "أنشّط شبكاتي الاجتماعية.", note: "نشر منتظم دون أن أقضي أمسياتي فيه." },
    { id: "ads", label: "أطلق إعلانات على الإنترنت.", note: "حملات تجلب طلبات." },
    { id: "strategie", label: "أبني استراتيجية تسويق.", note: "خطة واضحة من الموقع إلى الشبكات." },
    { id: "autre", label: "شيء آخر.", note: "كلمتان تكفيان، ونتولى الباقي." },
  ],
  business: { label: "اسم شركتك", placeholder: "مثال: Maison Lafleur" },
  sector: {
    label: "قطاعك",
    optional: "اختياري",
    options: ["تجارة محلية", "مطاعم", "صحة وعافية", "عقارات", "خدمات للشركات", "تجارة إلكترونية", "آخر"],
  },
  website: { label: "موقعك الحالي", placeholder: "https://…", optional: "اختياري", required: "إلزامي" },
  problems: [],
  siteTypes: [],
  zones: [],
  platforms: [],
  publishers: [],
  adOutcomes: [],
  adDestinations: [],
  timeline: [],
  other: { label: "بكلمتين", placeholder: "مثال: إطلاق متجر سيراميك على الإنترنت…" },
  notes: {
    label: "السياق في جملتين",
    hint: "اختياري. التفاصيل تأتي لاحقاً.",
    placeholder: "مثال: نفتح مكاناً ثانياً في يونيو، والموقع يجب أن يواكب…",
  },
  goals: [
    { id: "clients", label: "جذب عملاء أكثر", note: "طلبات تأتي من تلقاء نفسها." },
    { id: "leads", label: "طلبات مؤهّلة", note: "تواصل أقل، لكنه أفضل." },
    { id: "ventes", label: "زيادة مبيعاتي", note: "بيع عبر الإنترنت دون عوائق." },
    { id: "visibilite", label: "زيادة الظهور", note: "أن أكون حيث يبحثون عني." },
    { id: "confiance", label: "إلهام الثقة", note: "موقع يترك انطباعاً جيداً." },
  ],
  fields: { name: "اسمك", email: "بريدك الإلكتروني", phone: "الهاتف", optional: "اختياري" },
  placeholders: { name: "الاسم واللقب", email: "you@example.com", phone: "06 00 00 00 00" },
  consentBefore: "أوافق على استخدام إجاباتي للردّ عليّ.",
  consentLink: "سياسة الخصوصية",
  requiredNote: "الحقول المعلّمة بـ * ضرورية للردّ عليك.",
  back: "رجوع",
  next: "متابعة",
  pass: "تخطّي",
  submit: "أرسل البريف",
  sending: "جارٍ الإرسال…",
  review: "ما فهمناه من بريفك",
  empty: "—",
  errors: {
    service: "اختر الجملة التي تشبهك.",
    business: "اذكر اسم شركتك.",
    website: "اذكر عنوان موقعك.",
    goal: "اختر الهدف الرئيسي.",
    name: "اذكر اسمك.",
    email: "اذكر بريداً إلكترونياً صحيحاً.",
    consent: "علّم هذا المربع لإرسال البريف.",
  },
  errorHint: "كل شيء محفوظ. صحّح الحقل المشار إليه وتابع.",
  failureTitle: "لم يتم الإرسال",
  failureBody: "إجاباتك ما زالت هنا. أعد المحاولة، أو اكتب إلينا مباشرة.",
  retry: "إعادة المحاولة",
  mailto: "الإرسال بالبريد",
  successTitle: "تم.",
  successBody: "وصلنا بريفك. تستلم ردّاً مكتوباً خلال يوم عمل، بنطاق واضح ودون أي التزام.",
  successSteps: [
    "نقرأ بريفك اليوم.",
    "تستلم نطاقاً مكتوباً خلال يوم عمل.",
    "إن ناسبك، نبدأ النسخة الأولى.",
  ],
  successNote: "لا نطلب أي دفع لإرسال بريف.",
  successAgain: "اكتب بريفاً آخر",
};

export const JOURNEY: Record<Locale, JourneyCopy> = { fr, en, ar };
