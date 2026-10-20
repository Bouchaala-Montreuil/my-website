export type Locale = "fr" | "en" | "ar";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpecRow {
  k: string;
  v: string;
  note?: string;
}

export interface SectionHead {
  num: string;
  label: string;
  title: string;
  note?: string;
}

export interface IncludedItem {
  title: string;
  body: string;
  note?: string;
}

export interface ProcessStep {
  when: string;
  title: string;
  body: string;
  todo: string;
}

export interface PriceRow {
  label: string;
  value: string;
  strong?: boolean;
}

export interface CompareRow {
  label: string;
  cells: string[];
  highlight?: boolean;
}

export interface GuaranteeStep {
  when: string;
  body: string;
}

export interface FaqItem {
  q: string;
  a: string[];
}

export interface ProofPoint {
  strong: string;
  body: string;
}

export interface FormErrors {
  name: string;
  email: string;
  activity: string;
  purpose: string;
  pages: string;
  consent: string;
  generic: string;
}

export interface FormCopy {
  stepLabel: string;
  steps: string[];
  stepTitles: string[];
  stepHints: string[];
  requiredNote: string;
  optionalNote: string;
  fields: {
    name: string;
    email: string;
    activity: string;
    purpose: string;
    pages: string;
    languages: string;
    texts: string;
    photos: string;
    deadline: string;
    notes: string;
  };
  optional: string;
  required: string;
  purposes: string[];
  pages: string[];
  languages: string[];
  textOptions: string[];
  photoOptions: string[];
  deadlineOptions: string[];
  purposesOther: string;
  notesPlaceholder: string;
  emailHelp: string;
  activityHelp: string;
  next: string;
  back: string;
  review: string;
  reviewTitle: string;
  reviewHint: string;
  edit: string;
  consent: string;
  consentLink: string;
  submit: string;
  submitting: string;
  paymentTitle: string;
  paymentOptions: { value: "euro-link" | "stripe-now"; label: string; note: string }[];
  stripeNote: string;
  errors: FormErrors;
  errorSummary: string;
  errorSummaryHint: string;
  statusSending: string;
  successTitle: string;
  successBody: string;
  successSteps: string[];
  successNote: string;
  successAgain: string;
  failureTitle: string;
  failureBody: string;
  retry: string;
  mailto: string;
  requiredMark: string;
  none: string;
}

export interface Content {
  locale: Locale;
  dir: "ltr" | "rtl";
  htmlLang: string;
  localeName: string;
  localeShort: string;
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  skipLink: string;
  nav: NavItem[];
  navCta: string;
  menu: { open: string; close: string; label: string; navLabel: string; language: string };
  hero: {
    eyebrow: string;
    tag: string;
    badge: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaNote: string;
    specTitle: string;
    specRef: string;
    price: string;
    priceUnit: string;
    priceNote: string;
    specRows: SpecRow[];
    specCta: string;
    stamp: string;
  };
  ticker: string[];
  included: {
    head: SectionHead;
    items: IncludedItem[];
  };
  process: {
    head: SectionHead;
    steps: ProcessStep[];
    footnote: string;
  };
  scope: {
    head: SectionHead;
    inTitle: string;
    outTitle: string;
    inItems: string[];
    outItems: string[];
    foot: string;
  };
  price: {
    head: SectionHead;
    cardName: string;
    cardTag: string;
    amount: string;
    unit: string;
    amountNote: string;
    features: string[];
    cta: string;
    fine: string;
    sideTitle: string;
    sideBody: string;
    math: PriceRow[];
    mathTotal: PriceRow;
    mathFoot: string;
    ownership: string;
  };
  market: {
    head: SectionHead;
    caption: string;
    columns: string[];
    rows: CompareRow[];
    sourcesLabel: string;
    scrollHint: string;
    sources: { text: string; href: string }[];
    callout: string;
  };
  guarantee: {
    head: SectionHead;
    sealTitle: string;
    sealNote: string;
    steps: GuaranteeStep[];
    foot: string;
    cta: string;
  };
  proof: {
    head: SectionHead;
    statement: string;
    body: string;
    points: ProofPoint[];
    cta: string;
  };
  faq: {
    head: SectionHead;
    aside: string;
    link: string;
    items: FaqItem[];
  };
  order: {
    head: SectionHead;
    sideTitle: string;
    sideBody: string;
    bullets: string[];
    form: FormCopy;
  };
  footer: {
    about: string;
    briefLink: string;
    servicesTitle: string;
    companyTitle: string;
    legalTitle: string;
    contactTitle: string;
    services: NavItem[];
    company: NavItem[];
    legal: NavItem[];
    emailLabel: string;
    responseLabel: string;
    responseValue: string;
    rights: string;
    built: string;
    updated: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
}

export interface LegalPage {
  slug: string;
  title: string;
  description: string;
  updated: string;
  tocLabel: string;
  notice: { title: string; body: string };
  sections: { id: string; heading: string; blocks: LegalBlock[] }[];
  backHome: string;
  otherPagesTitle: string;
  otherPages: { label: string; href: string }[];
}

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "note"; text: string };

/* ---------- Long-form pages (services, work, about) ---------- */

export type PageBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "metrics"; items: { value: string; label: string; note?: string }[] }
  | { type: "note"; text: string }
  | { type: "quote"; text: string; source: string }
  | { type: "links"; items: { label: string; href: string; note?: string }[] }
  | {
      type: "gallery";
      layout?: "pair" | "single";
      items: { src: string; alt: string; width: number; height: number; caption?: string }[];
    };

export interface PageSection {
  id: string;
  num: string;
  label: string;
  title: string;
  note?: string;
  blocks: PageBlock[];
}

export type FormService = "site-web" | "seo" | "marketing";

export interface PageDoc {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  factsTitle: string;
  facts: { k: string; v: string }[];
  primaryCta: { label: string; href: string; note: string };
  sections: PageSection[];
  limitsTitle?: string;
  limitsNote?: string;
  limits?: { title: string; body: string }[];
  faqTitle?: string;
  faq?: FaqItem[];
  article?: { published: string; updated: string; author: string };
  /** Overrides the structured-data type when the page is not a service. */
  schemaType?: "Service" | "WebPage";
  formService?: FormService;
  formTitle?: string;
  formLead?: string;
  relatedTitle: string;
  related: { label: string; href: string; note: string }[];
}

export interface HomeServiceCard {
  index: string;
  tag: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}

export interface HomePromo {
  head: SectionHead;
  items: HomeServiceCard[];
}

export interface HomeWork {
  head: SectionHead;
  title: string;
  body: string;
  metrics: { value: string; label: string }[];
  cta: { label: string; href: string };
}
