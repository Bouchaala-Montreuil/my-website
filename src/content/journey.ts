/**
 * Copy for the contact journey — one place, three languages.
 *
 * The journey asks six short questions and only shows the ones that make sense
 * for the chosen service. Labels are deliberately written as answers a visitor
 * would give, not as database fields.
 */
import type { Locale } from "./types";

export type JourneyServiceId = "site" | "refonte" | "seo" | "social" | "ads" | "strategie" | "autre";

export interface JourneyOption {
  id: string;
  label: string;
  note?: string;
}

export interface JourneyCopy {
  kicker: string;
  title: string;
  stageNote: string;
  stepOf: (done: number, total: number) => string;
  back: string;
  next: string;
  skip: string;
  review: string;
  submit: string;
  sending: string;
  optional: string;
  requiredNote: string;
  recap: string;
  empty: string;
  edit: string;
  steps: {
    service: { label: string; question: string; hint: string };
    context: { label: string; question: string; hint: string };
    goal: { label: string; question: string; hint: string };
    budget: { label: string; question: string; hint: string };
    project: { label: string; question: string; hint: string };
    contact: { label: string; question: string; hint: string };
  };
  services: JourneyOption[];
  business: { label: string; placeholder: string };
  sector: { label: string; options: string[] };
  website: { label: string; placeholder: string; optional: string };
  problem: { label: string; options: string[] };
  zone: { label: string; options: string[] };
  platforms: { label: string; options: string[] };
  publishers: { label: string; options: string[] };
  channels: { label: string; options: string[] };
  history: { label: string; options: string[] };
  scope: { label: string; options: string[] };
  other: { label: string; placeholder: string };
  goals: JourneyOption[];
  budgets: string[];
  projectPlaceholder: string;
  projectExample: string;
  timeline: { label: string; options: string[] };
  fields: { name: string; email: string; phone: string; phoneOptional: string };
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  consentBefore: string;
  consentLink: string;
  consentAfter: string;
  errors: { service: string; business: string; website: string; goal: string; name: string; email: string; consent: string };
  errorTitle: string;
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
  summaryLabels: {
    service: string;
    business: string;
    goal: string;
    budget: string;
    project: string;
    contact: string;
  };
  subject: string;
  localeName: string;
}

const fr: JourneyCopy = {
  kicker: "Un dossier, pas un formulaire",
  title: "Racontez-nous votre projet",
  stageNote: "Six questions. Pas de piège, pas de jargon.",
  stepOf: (done, total) => `Étape ${done} sur ${total}`,
  back: "Retour",
  next: "Continuer",
  skip: "Passer",
  review: "Vérifier",
  submit: "Envoyer le dossier",
  sending: "Envoi en cours…",
  optional: "facultatif",
  requiredNote: "Les champs marqués * sont nécessaires pour vous répondre.",
  recap: "Votre récapitulatif",
  empty: "Pas encore répondu",
  edit: "Modifier",
  steps: {
    service: {
      label: "Le besoin",
      question: "De quoi avez-vous besoin ?",
      hint: "Choisissez ce qui s’en approche le plus. Vous préciserez ensuite.",
    },
    context: {
      label: "L’activité",
      question: "Parlez-nous de votre entreprise",
      hint: "Deux réponses suffisent pour situer le contexte.",
    },
    goal: {
      label: "L’objectif",
      question: "Qu’est-ce que ça doit changer ?",
      hint: "Un seul cap. C’est lui qui décidera du reste.",
    },
    budget: {
      label: "Le budget",
      question: "Quel budget avez-vous en tête ?",
      hint: "Une fourchette suffit. Le devis reste gratuit.",
    },
    project: {
      label: "Le projet",
      question: "Qu’avez-vous en tête ?",
      hint: "Deux phrases suffisent. Les détails se règlent en visio.",
    },
    contact: {
      label: "Le contact",
      question: "Où peut-on vous répondre ?",
      hint: "Réponse sous 1 jour ouvré, par une vraie personne.",
    },
  },
  services: [
    { id: "site", label: "Créer un site", note: "Vitrine, claire, livrée en 48–72 h." },
    { id: "refonte", label: "Refondre un site", note: "Reprendre un site daté, sans repartir de zéro." },
    { id: "seo", label: "Référencement & Google", note: "Être trouvé par les bonnes recherches." },
    { id: "social", label: "Réseaux sociaux", note: "Publier régulièrement, sans y passer vos soirées." },
    { id: "ads", label: "Publicité en ligne", note: "Des campagnes qui ramènent des demandes." },
    { id: "strategie", label: "Stratégie marketing", note: "Un plan clair, du site aux réseaux." },
    { id: "autre", label: "Autre chose", note: "Dites-le en deux mots, on avisera." },
  ],
  business: { label: "Nom de l’entreprise", placeholder: "Ex. Maison Lafleur" },
  sector: {
    label: "Votre secteur",
    options: ["Commerce local", "Restauration", "Santé & bien-être", "Immobilier", "Services B2B", "E-commerce", "Autre"],
  },
  website: { label: "Votre site actuel", placeholder: "https://…", optional: "Si vous en avez un" },
  problem: {
    label: "Qu’est-ce qui ne fonctionne plus ?",
    options: ["Le design a vieilli", "Le site est lent", "Il n’est pas lisible sur mobile", "Il ne génère pas de demandes"],
  },
  zone: { label: "Où voulez-vous être visible ?", options: ["Autour de chez moi", "Partout en France", "À l’international"] },
  platforms: { label: "Quels réseaux comptent pour vous ?", options: ["Instagram", "LinkedIn", "TikTok", "Facebook", "YouTube"] },
  publishers: { label: "Qui publie aujourd’hui ?", options: ["Moi-même", "Personne", "Une équipe"] },
  channels: { label: "Quels canaux vous intéressent ?", options: ["Google Ads", "Meta", "TikTok", "LinkedIn"] },
  history: { label: "Avez-vous déjà fait de la publicité ?", options: ["Jamais", "Oui, avec des résultats", "Oui, sans résultats"] },
  scope: { label: "Quel périmètre ?", options: ["Site web", "SEO", "Réseaux sociaux", "Publicité", "Contenu", "E-mail"] },
  other: { label: "En deux mots", placeholder: "Ex. lancer une boutique de céramique en ligne…" },
  goals: [
    { id: "clients", label: "Attirer plus de clients", note: "Des demandes qui arrivent d’elles-mêmes." },
    { id: "leads", label: "Générer des demandes qualifiées", note: "Moins de contacts, mais les bons." },
    { id: "ventes", label: "Augmenter les ventes", note: "Vendre en ligne, sans friction." },
    { id: "visibilite", label: "Gagner en visibilité", note: "Être là où l’on vous cherche." },
    { id: "confiance", label: "Inspirer confiance", note: "Un site qui fait bonne impression." },
  ],
  budgets: ["195 € / mois", "200 – 500 € / mois", "500 – 1 000 € / mois", "Plus de 1 000 € / mois", "À définir ensemble"],
  projectPlaceholder: "Ex. nous ouvrons un second lieu en juin, le site doit suivre…",
  projectExample: "Deux phrases suffisent : ce que vous vendez, et ce qui bloque aujourd’hui.",
  timeline: { label: "Pour quand ?", options: ["Dès que possible", "Sous 1 mois", "Sous 3 mois", "Pas d’urgence"] },
  fields: { name: "Votre nom", email: "Votre e-mail", phone: "Téléphone", phoneOptional: "facultatif" },
  namePlaceholder: "Prénom et nom",
  emailPlaceholder: "vous@exemple.fr",
  phonePlaceholder: "06 00 00 00 00",
  consentBefore: "J’accepte que mes réponses soient utilisées pour me répondre.",
  consentLink: "Politique de confidentialité",
  consentAfter: "",
  errors: {
    service: "Choisissez ce qui s’en approche le plus.",
    business: "Indiquez le nom de votre entreprise.",
    website: "Indiquez l’adresse de votre site.",
    goal: "Choisissez l’objectif principal.",
    name: "Indiquez votre nom.",
    email: "Indiquez une adresse e-mail valide.",
    consent: "Cochez cette case pour envoyer le dossier.",
  },
  errorTitle: "Une réponse nous manque",
  errorHint: "Tout est conservé. Corrigez le champ indiqué et reprenez.",
  failureTitle: "L’envoi n’a pas abouti",
  failureBody: "Vos réponses sont toujours là. Réessayez, ou écrivez-nous directement.",
  retry: "Réessayer",
  mailto: "Envoyer par e-mail",
  successTitle: "C’est parti.",
  successBody: "Votre dossier nous est arrivé. Vous recevez une réponse écrite sous 1 jour ouvré, avec un périmètre clair et aucun engagement.",
  successSteps: ["Nous lisons votre dossier aujourd’hui.", "Vous recevez un périmètre écrit sous 1 jour ouvré.", "Si ça vous convient, on lance la première version."],
  successNote: "Aucun paiement n’est demandé pour envoyer un dossier.",
  successAgain: "Envoyer un autre dossier",
  summaryLabels: { service: "Besoin", business: "Entreprise", goal: "Objectif", budget: "Budget", project: "Projet", contact: "Contact" },
  subject: "Dossier",
  localeName: "Français",
};

const en: JourneyCopy = {
  kicker: "A brief, not a form",
  title: "Tell us about your project",
  stageNote: "Six questions. No traps, no jargon.",
  stepOf: (done, total) => `Step ${done} of ${total}`,
  back: "Back",
  next: "Continue",
  skip: "Skip",
  review: "Review",
  submit: "Send the brief",
  sending: "Sending…",
  optional: "optional",
  requiredNote: "Fields marked * are needed to reply to you.",
  recap: "Your brief so far",
  empty: "Not answered yet",
  edit: "Edit",
  steps: {
    service: { label: "The need", question: "What do you need?", hint: "Pick the closest one. You can refine it next." },
    context: { label: "The business", question: "Tell us about your business", hint: "Two answers are enough to set the scene." },
    goal: { label: "The goal", question: "What should this change?", hint: "One direction. Everything else follows from it." },
    budget: { label: "The budget", question: "What budget do you have in mind?", hint: "A range is fine. The quote is free either way." },
    project: { label: "The project", question: "What have you got in mind?", hint: "Two sentences are enough. Details come later on a call." },
    contact: { label: "The contact", question: "Where can we reach you?", hint: "Reply within one working day, from a real person." },
  },
  services: [
    { id: "site", label: "Build a website", note: "Clear, fast, delivered in 48–72 h." },
    { id: "refonte", label: "Redesign a website", note: "Bring an ageing site back, without starting over." },
    { id: "seo", label: "SEO & Google", note: "Be found for the searches that matter." },
    { id: "social", label: "Social media", note: "Publish consistently without living on it." },
    { id: "ads", label: "Online advertising", note: "Campaigns that bring in enquiries." },
    { id: "strategie", label: "Marketing strategy", note: "One clear plan, from site to social." },
    { id: "autre", label: "Something else", note: "Two words will do — we’ll take it from there." },
  ],
  business: { label: "Business name", placeholder: "e.g. Maison Lafleur" },
  sector: {
    label: "Your sector",
    options: ["Local retail", "Food & drink", "Health & wellbeing", "Property", "B2B services", "E-commerce", "Other"],
  },
  website: { label: "Your current website", placeholder: "https://…", optional: "If you have one" },
  problem: {
    label: "What no longer works?",
    options: ["It looks dated", "It’s slow", "It’s hard to read on mobile", "It brings no enquiries"],
  },
  zone: { label: "Where do you want to rank?", options: ["Around my area", "Across the country", "Internationally"] },
  platforms: { label: "Which platforms matter?", options: ["Instagram", "LinkedIn", "TikTok", "Facebook", "YouTube"] },
  publishers: { label: "Who publishes today?", options: ["Me", "Nobody", "A team"] },
  channels: { label: "Which channels interest you?", options: ["Google Ads", "Meta", "TikTok", "LinkedIn"] },
  history: { label: "Have you advertised before?", options: ["Never", "Yes, with results", "Yes, without results"] },
  scope: { label: "What should we cover?", options: ["Website", "SEO", "Social", "Advertising", "Content", "Email"] },
  other: { label: "In two words", placeholder: "e.g. launching an online ceramics shop…" },
  goals: [
    { id: "clients", label: "Bring in more customers", note: "Enquiries that arrive on their own." },
    { id: "leads", label: "Generate qualified leads", note: "Fewer contacts, better ones." },
    { id: "ventes", label: "Increase sales", note: "Sell online without friction." },
    { id: "visibilite", label: "Gain visibility", note: "Be there when people search." },
    { id: "confiance", label: "Build trust", note: "A site that makes the right impression." },
  ],
  budgets: ["€195 / month", "€200 – 500 / month", "€500 – 1,000 / month", "Over €1,000 / month", "Not sure yet"],
  projectPlaceholder: "e.g. we’re opening a second location in June and the site has to keep up…",
  projectExample: "Two sentences: what you sell, and what’s getting in the way.",
  timeline: { label: "By when?", options: ["As soon as possible", "Within a month", "Within three months", "No rush"] },
  fields: { name: "Your name", email: "Your email", phone: "Phone", phoneOptional: "optional" },
  namePlaceholder: "First and last name",
  emailPlaceholder: "you@example.com",
  phonePlaceholder: "+33 6 00 00 00 00",
  consentBefore: "I agree that my answers may be used to reply to me.",
  consentLink: "Privacy policy",
  consentAfter: "",
  errors: {
    service: "Pick the closest option.",
    business: "Tell us your business name.",
    website: "Add your website address.",
    goal: "Choose the main goal.",
    name: "Tell us your name.",
    email: "Enter a valid email address.",
    consent: "Tick this box to send the brief.",
  },
  errorTitle: "One answer is missing",
  errorHint: "Nothing is lost. Fix the field and carry on.",
  failureTitle: "The brief didn’t go through",
  failureBody: "Your answers are still here. Try again, or email us directly.",
  retry: "Try again",
  mailto: "Send by email",
  successTitle: "That’s in.",
  successBody: "Your brief reached us. You’ll get a written reply within one working day, with a clear scope and no commitment.",
  successSteps: ["We read your brief today.", "You get a written scope within one working day.", "If it works for you, we start the first version."],
  successNote: "No payment is needed to send a brief.",
  successAgain: "Send another brief",
  summaryLabels: { service: "Need", business: "Business", goal: "Goal", budget: "Budget", project: "Project", contact: "Contact" },
  subject: "Brief",
  localeName: "English",
};

const ar: JourneyCopy = {
  kicker: "ملف تعريفي، لا استمارة",
  title: "حدّثنا عن مشروعك",
  stageNote: "ستة أسئلة. بلا تعقيد ولا مصطلحات.",
  stepOf: (done, total) => `الخطوة ${done} من ${total}`,
  back: "رجوع",
  next: "متابعة",
  skip: "تخطّي",
  review: "مراجعة",
  submit: "إرسال الملف",
  sending: "جارٍ الإرسال…",
  optional: "اختياري",
  requiredNote: "الحقول المعلّمة بـ * ضرورية للرد عليك.",
  recap: "ملخّصك",
  empty: "لم يُجب بعد",
  edit: "تعديل",
  steps: {
    service: { label: "الحاجة", question: "ما الذي تحتاجه؟", hint: "اختر الأقرب، وستفصّل لاحقًا." },
    context: { label: "النشاط", question: "حدّثنا عن شركتك", hint: "إجابتان تكفيان لتحديد السياق." },
    goal: { label: "الهدف", question: "ما الذي يجب أن يتغيّر؟", hint: "وجهة واحدة، والباقي يتبعها." },
    budget: { label: "الميزانية", question: "ما الميزانية التي تفكر فيها؟", hint: "نطاق تقريبي يكفي. العرض مجاني." },
    project: { label: "المشروع", question: "ما الذي يدور في ذهنك؟", hint: "جملتان تكفيان، والتفاصيل تأتي في مكالمة." },
    contact: { label: "التواصل", question: "أين نرد عليك؟", hint: "الرد خلال يوم عمل واحد، من شخص حقيقي." },
  },
  services: [
    { id: "site", label: "إنشاء موقع", note: "واضح وسريع، خلال 48–72 ساعة." },
    { id: "refonte", label: "إعادة تصميم موقع", note: "نحدّث موقعك دون البدء من الصفر." },
    { id: "seo", label: "تحسين الظهور على Google", note: "أن تجدك عمليات البحث المناسبة." },
    { id: "social", label: "شبكات التواصل", note: "نشر منتظم دون أن يستهلك وقتك." },
    { id: "ads", label: "الإعلانات الرقمية", note: "حملات تجلب طلبات حقيقية." },
    { id: "strategie", label: "استراتيجية تسويقية", note: "خطة واحدة من الموقع إلى الشبكات." },
    { id: "autre", label: "شيء آخر", note: "كلمتان تكفيان، ونكمل نحن." },
  ],
  business: { label: "اسم الشركة", placeholder: "مثال: دار الياسمين" },
  sector: { label: "قطاع نشاطك", options: ["تجارة محلية", "مطاعم", "صحة وعافية", "عقارات", "خدمات للشركات", "تجارة إلكترونية", "آخر"] },
  website: { label: "موقعك الحالي", placeholder: "https://…", optional: "إن وُجد" },
  problem: { label: "ما الذي لم يعد يعمل؟", options: ["التصميم قديم", "الموقع بطيء", "غير مقروء على الهاتف", "لا يجلب طلبات"] },
  zone: { label: "أين تريد الظهور؟", options: ["حول منطقتي", "في كل البلد", "دوليًا"] },
  platforms: { label: "أي شبكات تهمّك؟", options: ["Instagram", "LinkedIn", "TikTok", "Facebook", "YouTube"] },
  publishers: { label: "من ينشر حاليًا؟", options: ["أنا", "لا أحد", "فريق"] },
  channels: { label: "أي قنوات تهمّك؟", options: ["Google Ads", "Meta", "TikTok", "LinkedIn"] },
  history: { label: "هل أعلنت سابقًا؟", options: ["أبدًا", "نعم، بنتائج", "نعم، بلا نتائج"] },
  scope: { label: "ما النطاق؟", options: ["الموقع", "SEO", "الشبكات", "الإعلانات", "المحتوى", "البريد"] },
  other: { label: "بكلمتين", placeholder: "مثال: إطلاق متجر خزف إلكتروني…" },
  goals: [
    { id: "clients", label: "جذب عملاء أكثر", note: "طلبات تصل من تلقاء نفسها." },
    { id: "leads", label: "طلبات مؤهّلة", note: "تواصل أقل، لكنه الأفضل." },
    { id: "ventes", label: "زيادة المبيعات", note: "بيع إلكتروني بلا عوائق." },
    { id: "visibilite", label: "زيادة الظهور", note: "أن تكون حاضرًا عند البحث." },
    { id: "confiance", label: "بناء الثقة", note: "موقع يترك انطباعًا صحيحًا." },
  ],
  budgets: ["195 € شهريًا", "200 – 500 € شهريًا", "500 – 1 000 € شهريًا", "أكثر من 1 000 € شهريًا", "نحددها معًا"],
  projectPlaceholder: "مثال: نفتح فرعًا ثانيًا في يونيو ويجب أن يواكب الموقع ذلك…",
  projectExample: "جملتان: ماذا تبيع، وما الذي يعيقك اليوم.",
  timeline: { label: "متى؟", options: ["في أقرب وقت", "خلال شهر", "خلال ثلاثة أشهر", "لا استعجال"] },
  fields: { name: "اسمك", email: "بريدك الإلكتروني", phone: "الهاتف", phoneOptional: "اختياري" },
  namePlaceholder: "الاسم واللقب",
  emailPlaceholder: "you@example.com",
  phonePlaceholder: "+33 6 00 00 00 00",
  consentBefore: "أوافق على استخدام إجاباتي للرد عليّ.",
  consentLink: "سياسة الخصوصية",
  consentAfter: "",
  errors: {
    service: "اختر الأقرب.",
    business: "اذكر اسم شركتك.",
    website: "أضف عنوان موقعك.",
    goal: "اختر الهدف الرئيسي.",
    name: "اذكر اسمك.",
    email: "أدخل بريدًا إلكترونيًا صحيحًا.",
    consent: "علّم هذا المربع لإرسال الملف.",
  },
  errorTitle: "تنقصنا إجابة",
  errorHint: "لم يُفقد شيء. صحّح الحقل وتابع.",
  failureTitle: "لم يتم الإرسال",
  failureBody: "إجاباتك محفوظة. أعد المحاولة أو راسلنا مباشرة.",
  retry: "إعادة المحاولة",
  mailto: "الإرسال بالبريد",
  successTitle: "تم.",
  successBody: "وصلنا ملفك. ستتلقى ردًا مكتوبًا خلال يوم عمل واحد، بنطاق واضح ودون أي التزام.",
  successSteps: ["نقرأ ملفك اليوم.", "تتلقى نطاقًا مكتوبًا خلال يوم عمل.", "إن ناسبك، نطلق النسخة الأولى."],
  successNote: "لا يُطلب أي دفع لإرسال الملف.",
  successAgain: "إرسال ملف آخر",
  summaryLabels: { service: "الحاجة", business: "الشركة", goal: "الهدف", budget: "الميزانية", project: "المشروع", contact: "التواصل" },
  subject: "ملف",
  localeName: "العربية",
};

export const JOURNEY: Record<Locale, JourneyCopy> = { fr, en, ar };
