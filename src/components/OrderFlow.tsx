import { useState, ReactNode } from 'react';
import { FORMSPREE_ENDPOINT, PAYMENT_LINK } from '../config';
import { useLang } from '../context/LanguageContext';

const CONTENT: Record<string, any> = {
  en: {
    required: 'Required — about 2 minutes',
    optional: 'Optional — 30 seconds',
    skip: 'Skip for now',
    back: 'Back',
    next: 'Continue',
    pay: 'Pay €195 — first month',
    payNote: 'Secure online payment · 6-month commitment · then cancel with 1 month notice',
    payFallback: 'No online payment yet? Send the order — we email you a secure payment link within 24h.',
    successTitle: 'Order received!',
    successDesc: 'Your first website version arrives within 48–72 hours. You preview it, approve it or ask for changes — the order only finalizes when you are satisfied.',
    steps: ['Your project', 'Style', 'Content', 'Details', 'Payment'],
    fields: {
      name: 'Your name *', email: 'Email *', phone: 'Phone (optional)',
      siteName: 'Website name *', purpose: 'What is the website for? *',
      functions: 'What must it do? *',
      colors: 'Colors you like', dislikes: 'Colors or styles to avoid',
      vibe: 'The vibe', refs: 'Up to 3 websites you like (URLs)',
      logo: 'Do you have a logo?',
      pages: 'Pages you need', texts: 'Texts & photos',
      languages: 'Languages', deadline: 'Deadline', notes: 'Anything else?'
    },
    purposes: ['Sell products', 'Take bookings', 'Present my business', 'Portfolio', 'Other'],
    functions: ['Contact form', 'Online booking', 'Payments / shop', 'Photo gallery', 'Blog', 'Multilingual'],
    vibes: ['Modern & minimal', 'Bold & colorful', 'Elegant & luxe', 'Playful & fun'],
    logoOpts: ['Yes, I have one', 'No — I need one'],
    pages: ['Home', 'About', 'Services', 'Gallery', 'Contact', 'Other'],
    textsOpts: ['I have my own', 'Write them for me'],
    languageOpts: ['French', 'English', 'Arabic', 'Other'],
    deadlineOpts: ['As soon as possible', 'This month', 'No rush'],
  },
  fr: {
    required: 'Requis — environ 2 minutes',
    optional: 'Optionnel — 30 secondes',
    skip: 'Passer pour l’instant',
    back: 'Retour',
    next: 'Continuer',
    pay: 'Payer 195 € — premier mois',
    payNote: 'Paiement en ligne sécurisé · engagement de 6 mois · puis résiliable avec 1 mois de préavis',
    payFallback: 'Pas encore de paiement en ligne ? Envoyez la commande — nous vous envoyons un lien de paiement sécurisé sous 24h.',
    successTitle: 'Commande reçue !',
    successDesc: 'Votre première version arrive sous 48–72 heures. Vous la prévisualisez, l’approuvez ou demandez des modifications — la commande n’est finalisée que lorsque vous êtes satisfait.',
    steps: ['Votre projet', 'Style', 'Contenu', 'Détails', 'Paiement'],
    fields: {
      name: 'Votre nom *', email: 'Email *', phone: 'Téléphone (optionnel)',
      siteName: 'Nom du site *', purpose: 'À quoi sert le site ? *',
      functions: 'Que doit-il faire ? *',
      colors: 'Couleurs que vous aimez', dislikes: 'Couleurs ou styles à éviter',
      vibe: 'L’ambiance', refs: 'Jusqu’à 3 sites que vous aimez (URLs)',
      logo: 'Avez-vous un logo ?',
      pages: 'Pages nécessaires', texts: 'Textes & photos',
      languages: 'Langues', deadline: 'Délai', notes: 'Autre chose ?'
    },
    purposes: ['Vendre des produits', 'Prendre des rendez-vous', 'Présenter mon activité', 'Portfolio', 'Autre'],
    functions: ['Formulaire de contact', 'Réservation en ligne', 'Paiements / boutique', 'Galerie photos', 'Blog', 'Multilingue'],
    vibes: ['Moderne & épuré', 'Audacieux & coloré', 'Élégant & luxe', 'Ludique & fun'],
    logoOpts: ['Oui, j’en ai un', 'Non — il m’en faut un'],
    pages: ['Accueil', 'À propos', 'Services', 'Galerie', 'Contact', 'Autre'],
    textsOpts: ['J’ai les miens', 'Écrivez-les pour moi'],
    languageOpts: ['Français', 'Anglais', 'Arabe', 'Autre'],
    deadlineOpts: ['Le plus vite possible', 'Ce mois-ci', 'Sans urgence'],
  },
  ar: {
    required: 'مطلوب — حوالي دقيقتين',
    optional: 'اختياري — ٣٠ ثانية',
    skip: 'تخطَّ الآن',
    back: 'رجوع',
    next: 'متابعة',
    pay: 'ادفع 195 يورو — الشهر الأول',
    payNote: 'دفع آمن عبر الإنترنت · التزام 6 أشهر · ثم إلغاء بإشعار شهر واحد',
    payFallback: 'لا يوجد دفع إلكتروني بعد؟ أرسل الطلب — سنرسل لك رابط دفع آمن خلال 24 ساعة.',
    successTitle: 'تم استلام الطلب!',
    successDesc: 'تصلك النسخة الأولى خلال 48–72 ساعة. تعاينها ووافق عليها أو اطلب تعديلات — الطلب لا يُنهى إلا عندما تكون راضيًا.',
    steps: ['مشروعك', 'الطراز', 'المحتوى', 'التفاصيل', 'الدفع'],
    fields: {
      name: 'اسمك *', email: 'البريد *', phone: 'الهاتف (اختياري)',
      siteName: 'اسم الموقع *', purpose: 'ما هو الموقع من أجله؟ *',
      functions: 'ماذا يجب أن يفعل؟ *',
      colors: 'ألوان تعجبك', dislikes: 'ألوان أو طرازات تجنّبها',
      vibe: 'الجو العام', refs: 'حتى 3 مواقع تعجبك (روابط)',
      logo: 'هل لديك شعار؟',
      pages: 'الصفحات المطلوبة', texts: 'النصوص والصور',
      languages: 'اللغات', deadline: 'الموعد', notes: 'شيء آخر؟'
    },
    purposes: ['بيع منتجات', 'حجز مواعيد', 'تقديم نشاطي', 'أعمال شخصية', 'أخرى'],
    functions: ['نموذج تواصل', 'حجز إلكتروني', 'مدفوعات / متجر', 'معرض صور', 'مدونة', 'عدة لغات'],
    vibes: ['عصري وبسيط', 'جريء وملون', 'أنيق وفاخر', 'مرح وممتع'],
    logoOpts: ['نعم، عندي شعار', 'لا — أحتاج شعارًا'],
    pages: ['الرئيسية', 'من نحن', 'الخدمات', 'معرض', 'اتصل بنا', 'أخرى'],
    textsOpts: ['عندي نصوصي', 'اكتبها لي'],
    languageOpts: ['الفرنسية', 'الإنجليزية', 'العربية', 'أخرى'],
    deadlineOpts: ['في أقرب وقت', 'هذا الشهر', 'لا إلحاح'],
  },
};

export default function OrderFlow() {
  const { t, lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({
    name: '', email: '', phone: '', siteName: '', purpose: '', functions: [],
    colors: '', dislikes: '', vibe: '', refs: '', logo: '',
    pages: [], texts: '', languages: '', deadline: '', notes: '',
  });

  const set = (k: string, v: any) => setAnswers((a) => ({ ...a, [k]: v }));

  const toggle = (k: string, v: string) =>
    setAnswers((a) => ({
      ...a,
      [k]: (a[k] || []).includes(v) ? (a[k] || []).filter((x: string) => x !== v) : [...(a[k] || []), v],
    }));

  const validateStep0 = () => {
    if (!answers.name.trim() || !answers.email.trim() || !answers.siteName.trim()) return 'name';
    if (!answers.purpose) return 'purpose';
    if (!(answers.functions || []).length) return 'functions';
    return '';
  };

  const next = () => {
    if (step === 0) {
      const bad = validateStep0();
      if (bad) { setError(bad); return; }
    }
    setError('');
    setStep((s) => Math.min(s + 1, 4));
  };

  const submit = async () => {
    setSending(true);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...answers, type: 'website-order', lang }),
      });
    } catch { /* email fallback covers it */ }
    setSending(false);
    setDone(true);
  };

  const inputCls = 'w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-cream focus:border-coral focus:outline-none transition-colors';
  const labelCls = 'label-sm text-cream/60 mb-2 block';

  const Chip = ({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
        active ? 'bg-coral border-coral text-white' : 'border-white/20 text-cream/70 hover:border-cream/50'
      }`}
      data-cursor="Pick"
    >
      {children}
    </button>
  );

  const Field = ({ label, children }: { label: string; children: ReactNode }) => (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );

  const Select = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} pe-10 appearance-none cursor-pointer`}
        data-cursor="Select"
      >
        <option value="" className="bg-charcoal">—</option>
        {options.map((o: string) => <option key={o} value={o} className="bg-charcoal">{o}</option>)}
      </select>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none text-cream/60">
        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );

  return (
    <section id="order" className="bg-charcoal px-8 md:px-16 lg:px-20 py-20 md:py-28 relative noise">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="label-sm text-coral mb-4">{t('order.label')}</p>
          <h2 className="display-xl text-cream mb-6">
            {t('order.title1')} <span className="text-mustard">{t('order.title2')}</span>
          </h2>
          <p className="body-xl text-cream/60 max-w-xl mx-auto">{t('order.subtitle')}</p>
        </div>

        {done ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-6">✓</div>
            <h3 className="display-lg text-cream mb-4">{c.successTitle}</h3>
            <p className="body-lg text-cream/60 max-w-md mx-auto">{c.successDesc}</p>
          </div>
        ) : (
          <div className="bg-cream text-charcoal rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {c.steps.map((s: string, i: number) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? 'bg-teal text-white' : i === step ? 'bg-coral text-white' : 'bg-charcoal/10 text-charcoal/50'
                  }`} style={{ fontFamily: 'var(--font-display)' }}>
                    {i + 1}
                  </div>
                  <span className={`body-sm hidden sm:block ${i === step ? 'font-semibold' : 'opacity-50'}`}>{s}</span>
                  {i < c.steps.length - 1 && <div className="w-4 h-[2px] bg-charcoal/15 mx-1" />}
                </div>
              ))}
            </div>

            <p className={`label-sm mb-8 ${step === 0 ? 'text-coral' : 'text-charcoal/50'}`}>
              {step === 0 ? c.required : c.optional}
            </p>

            {/* STEP 0 — required */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label={c.fields.name}>
                    <input className={inputCls} value={answers.name} onChange={(e) => set('name', e.target.value)} data-cursor="Type" />
                  </Field>
                  <Field label={c.fields.email}>
                    <input type="email" className={inputCls} value={answers.email} onChange={(e) => set('email', e.target.value)} data-cursor="Type" />
                  </Field>
                  <Field label={c.fields.phone}>
                    <input className={inputCls} value={answers.phone} onChange={(e) => set('phone', e.target.value)} data-cursor="Type" />
                  </Field>
                  <Field label={c.fields.siteName}>
                    <input className={inputCls} value={answers.siteName} onChange={(e) => set('siteName', e.target.value)} data-cursor="Type" />
                  </Field>
                </div>
                <Field label={c.fields.purpose}>
                  <Select value={answers.purpose} onChange={(v) => set('purpose', v)} options={c.purposes} />
                </Field>
                <div>
                  <label className={labelCls}>{c.fields.functions}</label>
                  <div className="flex flex-wrap gap-3">
                    {c.functions.map((f: string) => (
                      <Chip key={f} active={(answers.functions || []).includes(f)} onClick={() => toggle('functions', f)}>{f}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1 — style (optional) */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label={c.fields.colors}>
                    <input className={inputCls} value={answers.colors} onChange={(e) => set('colors', e.target.value)} data-cursor="Type" />
                  </Field>
                  <Field label={c.fields.dislikes}>
                    <input className={inputCls} value={answers.dislikes} onChange={(e) => set('dislikes', e.target.value)} data-cursor="Type" />
                  </Field>
                </div>
                <Field label={c.fields.vibe}>
                  <Select value={answers.vibe} onChange={(v) => set('vibe', v)} options={c.vibes} />
                </Field>
                <Field label={c.fields.refs}>
                  <input className={inputCls} value={answers.refs} onChange={(e) => set('refs', e.target.value)} placeholder="site1.com, site2.com" data-cursor="Type" />
                </Field>
                <Field label={c.fields.logo}>
                  <Select value={answers.logo} onChange={(v) => set('logo', v)} options={c.logoOpts} />
                </Field>
              </div>
            )}

            {/* STEP 2 — content (optional) */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className={labelCls}>{c.fields.pages}</label>
                  <div className="flex flex-wrap gap-3">
                    {c.pages.map((p: string) => (
                      <Chip key={p} active={(answers.pages || []).includes(p)} onClick={() => toggle('pages', p)}>{p}</Chip>
                    ))}
                  </div>
                </div>
                <Field label={c.fields.texts}>
                  <Select value={answers.texts} onChange={(v) => set('texts', v)} options={c.textsOpts} />
                </Field>
                <Field label={c.fields.languages}>
                  <Select value={answers.languages} onChange={(v) => set('languages', v)} options={c.languageOpts} />
                </Field>
              </div>
            )}

            {/* STEP 3 — details (optional) */}
            {step === 3 && (
              <div className="space-y-6">
                <Field label={c.fields.deadline}>
                  <Select value={answers.deadline} onChange={(v) => set('deadline', v)} options={c.deadlineOpts} />
                </Field>
                <Field label={c.fields.notes}>
                  <textarea rows={4} className={`${inputCls} resize-none`} value={answers.notes} onChange={(e) => set('notes', e.target.value)} data-cursor="Type" />
                </Field>
              </div>
            )}

            {/* STEP 4 — payment */}
            {step === 4 && (
              <div className="text-center space-y-6 py-4">
                <div>
                  <span className="display-xl text-charcoal">€195</span>
                  <span className="body-lg text-charcoal/50">/mo</span>
                </div>
                <p className="body-md text-charcoal/60 max-w-md mx-auto">{c.payNote}</p>
                {PAYMENT_LINK ? (
                  <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-coral w-full justify-center" data-cursor="Pay">
                    {c.pay}
                  </a>
                ) : (
                  <p className="body-md text-charcoal/60">{c.payFallback}</p>
                )}
              </div>
            )}

            {error && <p className="text-coral text-sm mt-4 text-center">⚠ {c.fields[error]}</p>}

            {/* Nav buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-10">
              <button
                onClick={() => setStep((s) => Math.max(s - 1, 0))}
                disabled={step === 0}
                className="btn btn-outline-dark opacity-50 disabled:opacity-20"
                data-cursor="Back"
              >
                {c.back}
              </button>
              {step < 3 && (
                <div className="flex flex-wrap gap-3">
                  <button onClick={next} className="btn btn-dark" data-cursor="Next">{c.next}</button>
                  <button onClick={() => setStep((s) => s + 1)} className="btn btn-outline-dark opacity-70" data-cursor="Skip">{c.skip}</button>
                </div>
              )}
              {step === 3 && <button onClick={next} className="btn btn-dark" data-cursor="Next">{c.review ?? c.next}</button>}
              {step === 4 && (
                <button onClick={submit} disabled={sending} className="btn btn-coral" data-cursor="Send">
                  {sending ? '…' : PAYMENT_LINK ? c.pay : c.sendNoPay}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
