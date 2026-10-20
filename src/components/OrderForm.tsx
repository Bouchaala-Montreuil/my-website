import { useEffect, useMemo, useRef, useState } from "react";
import type { Content, FormService } from "@/content/types";
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT, STRIPE_CHARGES_USD, STRIPE_PAYMENT_LINK } from "@/config";
import { ArrowRight, Check, MailIcon } from "./Icons";

type FieldName = "name" | "email" | "activity" | "purpose" | "pages" | "consent";

interface Answers {
  name: string;
  email: string;
  activity: string;
  purpose: string;
  pages: string[];
  languages: string;
  texts: string;
  photos: string;
  deadline: string;
  notes: string;
  consent: boolean;
}

const emptyAnswers: Answers = {
  name: "",
  email: "",
  activity: "",
  purpose: "",
  pages: [],
  languages: "",
  texts: "",
  photos: "",
  deadline: "",
  notes: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SERVICE_LABELS: Record<FormService, string> = {
  "site-web": "Création de site web",
  seo: "Référencement (SEO)",
  marketing: "Marketing digital",
};

const SERVICE_SUBJECTS: Record<FormService, string> = {
  "site-web": "Dossier site web",
  seo: "Demande de référencement",
  marketing: "Demande de marketing digital",
};

function formatBrief(a: Answers, locale: string, service: FormService): string {
  const serviceLine = SERVICE_LABELS[service];
  return [
    "Nouveau dossier — feekza.com",
    "--------------------------------",
    `Nom: ${a.name}`,
    `Email: ${a.email}`,
    `Activité: ${a.activity}`,
    `Objectif: ${a.purpose}`,
    `Pages: ${a.pages.join(", ")}`,
    `Langue du site: ${a.languages || "—"}`,
    `Textes: ${a.texts || "—"}`,
    `Photos: ${a.photos || "—"}`,
    `Délai: ${a.deadline || "—"}`,
    `Précisions: ${a.notes || "—"}`,
    `Service: ${serviceLine}`,
    `Langue du dossier: ${locale}`,
  ].join("\n");
}

export function OrderForm({ c, service = "site-web" }: { c: Content; service?: FormService }) {
  const f = c.order.form;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [payment, setPayment] = useState<"euro-link" | "stripe-now">("euro-link");

  const summaryRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as FieldName];
      return next;
    });
  };

  const togglePage = (page: string) => {
    setAnswers((prev) => ({
      ...prev,
      pages: prev.pages.includes(page)
        ? prev.pages.filter((item) => item !== page)
        : [...prev.pages, page],
    }));
    setErrors((prev) => {
      if (!prev.pages) return prev;
      const next = { ...prev };
      delete next.pages;
      return next;
    });
  };

  const validate = (includeConsent: boolean): Partial<Record<FieldName, string>> => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!answers.name.trim()) next.name = f.errors.name;
    if (!EMAIL_RE.test(answers.email.trim())) next.email = f.errors.email;
    if (!answers.activity.trim()) next.activity = f.errors.activity;
    if (!answers.purpose) next.purpose = f.errors.purpose;
    if (answers.pages.length === 0) next.pages = f.errors.pages;
    if (includeConsent && !answers.consent) next.consent = f.errors.consent;
    return next;
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (status === "success") {
      successRef.current?.focus();
      successRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    stepHeadingRef.current?.focus({ preventScroll: false });
  }, [step, status]);

  const goNext = () => {
    const nextErrors = validate(false);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStep(0);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setStep((value) => Math.min(value + 1, 2));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(true);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Consent lives on the last step; everything else is on the first one.
      setStep("consent" in nextErrors ? 2 : 0);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setStatus("sending");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          _subject: `${SERVICE_SUBJECTS[service]} — ${answers.activity}`,
          service,
          type: "website-brief",
          locale: c.locale,
          name: answers.name,
          email: answers.email,
          activity: answers.activity,
          purpose: answers.purpose,
          pages: answers.pages,
          languages: answers.languages,
          texts: answers.texts,
          photos: answers.photos,
          deadline: answers.deadline,
          notes: answers.notes,
          paymentPreference: payment,
          consent: true,
          consentAt: new Date().toISOString(),
          message: formatBrief(answers, c.locale, service),
          company_url: honeypotRef.current?.value ?? "",
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  };

  const retry = () => {
    setStatus("idle");
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  const mailtoHref = useMemo(() => {
    const subject = `${SERVICE_SUBJECTS[service]} — ${answers.activity || c.order.form.fields.activity}`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      formatBrief(answers, c.locale, service),
    )}`;
  }, [answers, c.locale, c.order.form.fields.activity, service]);

  const stripeHref = useMemo(() => {
    const email = answers.email.trim();
    return email
      ? `${STRIPE_PAYMENT_LINK}?prefilled_email=${encodeURIComponent(email)}`
      : STRIPE_PAYMENT_LINK;
  }, [answers.email]);

  const errorEntries = (Object.entries(errors) as [FieldName, string][]).filter(
    ([, message]) => Boolean(message),
  );

  if (status === "success") {
    return (
      <div className="form-card" id="dossier-form">
        <div className="success" role="status" aria-live="polite">
          <div className="success__mark" aria-hidden="true">
            <Check size={26} />
          </div>
          <h3 ref={successRef} tabIndex={-1}>
            {f.successTitle}
          </h3>
          <p>{f.successBody}</p>

          <ol className="success__steps">
            {f.successSteps.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>

          {payment === "stripe-now" && (
            <div className="payment-box" style={{ textAlign: "start", marginTop: "1.25rem" }}>
              <h3>{f.paymentOptions[1].label}</h3>
              {STRIPE_CHARGES_USD && <p>{f.paymentOptions[1].note}</p>}
              <a className="btn btn--coral btn--wide" href={stripeHref} target="_blank" rel="noopener noreferrer">
                {f.paymentOptions[1].label}
              </a>
            </div>
          )}

          <p style={{ fontSize: ".8125rem", color: "var(--muted)", marginTop: "1rem" }}>{f.successNote}</p>

          <button type="button" className="btn btn--ghost btn--sm" onClick={() => {
            setAnswers(emptyAnswers);
            setErrors({});
            setPayment("euro-link");
            setStep(0);
            setStatus("idle");
          }}>
            {f.successAgain}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card" id="dossier-form">
      <div className="form-progress" aria-hidden="true">
        <ol>
          {f.steps.map((label, index) => (
            <li key={label} aria-current={index === step ? "step" : undefined} data-done={index < step}>
              <span className="dot">{index < step ? "✓" : index + 1}</span>
              <span>{label}</span>
              {index < f.steps.length - 1 && <span className="sep" />}
            </li>
          ))}
        </ol>
      </div>

      <p className="sr-only" aria-live="polite">
        {f.stepLabel} {step + 1} / {f.steps.length} — {f.steps[step]}
      </p>

      {errorEntries.length > 0 && (
        <div className="error-summary" ref={summaryRef} tabIndex={-1} role="alert">
          <h3>{f.errorSummary}</h3>
          <p style={{ margin: "0 0 .35rem", fontSize: ".8125rem" }}>{f.errorSummaryHint}</p>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#champ-${field}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate aria-labelledby="form-title">
        <h3 className="form-title" id="form-title" tabIndex={-1} ref={stepHeadingRef}>
          {f.stepTitles[step]}
        </h3>
        <p className="form-hint">{f.stepHints[step]}</p>

        {step === 0 && (
          <>
            <div className="field-row">
              <div className="field">
                <label htmlFor="champ-name">
                  {f.fields.name} <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="champ-name"
                  name="name"
                  className="input"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  value={answers.name}
                  onChange={(event) => set("name", event.target.value)}
                  onBlur={() => {
                    if (!answers.name.trim()) setErrors((prev) => ({ ...prev, name: f.errors.name }));
                  }}
                />
                {errors.name && (
                  <p className="field__error" id="err-name">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="champ-email">
                  {f.fields.email} <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="champ-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="input"
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "err-email help-email" : "help-email"}
                  value={answers.email}
                  onChange={(event) => set("email", event.target.value)}
                  onBlur={() => {
                    if (answers.email && !EMAIL_RE.test(answers.email)) {
                      setErrors((prev) => ({ ...prev, email: f.errors.email }));
                    }
                  }}
                />
                <p className="field__help" id="help-email">
                  {f.emailHelp}
                </p>
                {errors.email && (
                  <p className="field__error" id="err-email">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="champ-activity">
                {f.fields.activity} <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="champ-activity"
                name="activity"
                className="input"
                autoComplete="organization"
                required
                aria-required="true"
                aria-invalid={errors.activity ? "true" : undefined}
                aria-describedby={errors.activity ? "err-activity help-activity" : "help-activity"}
                value={answers.activity}
                onChange={(event) => set("activity", event.target.value)}
              />
              <p className="field__help" id="help-activity">
                {f.activityHelp}
              </p>
              {errors.activity && (
                <p className="field__error" id="err-activity">
                  {errors.activity}
                </p>
              )}
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="champ-purpose">
                  {f.fields.purpose} <span className="req" aria-hidden="true">*</span>
                </label>
                <select
                  id="champ-purpose"
                  name="purpose"
                  className="select"
                  required
                  aria-required="true"
                  aria-invalid={errors.purpose ? "true" : undefined}
                  aria-describedby={errors.purpose ? "err-purpose" : undefined}
                  value={answers.purpose}
                  onChange={(event) => set("purpose", event.target.value)}
                >
                  <option value="">—</option>
                  {f.purposes.map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
                {errors.purpose && (
                  <p className="field__error" id="err-purpose">
                    {errors.purpose}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="champ-languages">{f.fields.languages}</label>
                <select
                  id="champ-languages"
                  name="languages"
                  className="select"
                  value={answers.languages}
                  onChange={(event) => set("languages", event.target.value)}
                >
                  <option value="">—</option>
                  {f.languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset className="fieldset" aria-describedby={errors.pages ? "err-pages" : undefined}>
              <legend>
                {f.fields.pages} <span className="req" aria-hidden="true">*</span>
              </legend>
              <div className="chips" id="champ-pages">
                {f.pages.map((page) => {
                  const active = answers.pages.includes(page);
                  return (
                    <button
                      key={page}
                      type="button"
                      className="chip"
                      aria-pressed={active}
                      onClick={() => togglePage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              {errors.pages && (
                <p className="field__error" id="err-pages" style={{ marginTop: ".4rem" }}>
                  {errors.pages}
                </p>
              )}
            </fieldset>

            <p className="status" style={{ marginTop: ".25rem" }}>
              {f.requiredNote}
            </p>
          </>
        )}

        {step === 1 && (
          <>
            <fieldset className="fieldset">
              <legend>{f.fields.texts}</legend>
              <div className="chips" id="champ-texts">
                {f.textOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="chip"
                    aria-pressed={answers.texts === option}
                    onClick={() => set("texts", answers.texts === option ? "" : option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend>{f.fields.photos}</legend>
              <div className="chips" id="champ-photos">
                {f.photoOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="chip"
                    aria-pressed={answers.photos === option}
                    onClick={() => set("photos", answers.photos === option ? "" : option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="champ-deadline">{f.fields.deadline}</label>
              <select
                id="champ-deadline"
                name="deadline"
                className="select"
                value={answers.deadline}
                onChange={(event) => set("deadline", event.target.value)}
              >
                <option value="">—</option>
                {f.deadlineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="champ-notes">{f.fields.notes}</label>
              <textarea
                id="champ-notes"
                name="notes"
                className="textarea"
                rows={5}
                placeholder={f.notesPlaceholder}
                value={answers.notes}
                onChange={(event) => set("notes", event.target.value)}
              />
            </div>

            <p className="status">{f.optionalNote}</p>
          </>
        )}

        {step === 2 && (
          <div className="review">
            <h4 style={{ margin: "0 0 .2rem", fontSize: "1rem" }}>{f.reviewTitle}</h4>
            <p className="form-hint">{f.reviewHint}</p>

            <dl>
              <dt>{f.fields.name}</dt>
              <dd>{answers.name}</dd>
              <dt>{f.fields.email}</dt>
              <dd>{answers.email}</dd>
              <dt>{f.fields.activity}</dt>
              <dd>{answers.activity}</dd>
              <dt>{f.fields.purpose}</dt>
              <dd>{answers.purpose}</dd>
              <dt>{f.fields.pages}</dt>
              <dd>{answers.pages.join(", ")}</dd>
              <dt>{f.fields.languages}</dt>
              <dd>{answers.languages || f.none}</dd>
              <dt>{f.fields.texts}</dt>
              <dd>{answers.texts || f.none}</dd>
              <dt>{f.fields.photos}</dt>
              <dd>{answers.photos || f.none}</dd>
              <dt>{f.fields.deadline}</dt>
              <dd>{answers.deadline || f.none}</dd>
              <dt>{f.fields.notes}</dt>
              <dd>{answers.notes || f.none}</dd>
            </dl>

            <button
              type="button"
              className="review__edit"
              onClick={() => setStep(0)}
              style={{ marginBottom: "1rem" }}
            >
              {f.edit}
            </button>

            <fieldset className="fieldset">
              <legend>{f.paymentTitle}</legend>
              <div className="payment-options">
                {f.paymentOptions.map((option) => (
                  <label className="radio-card" key={option.value}>
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={payment === option.value}
                      onChange={() => setPayment(option.value)}
                    />
                    <span>
                      <b>{option.label}</b>
                      <span>{option.note}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {STRIPE_CHARGES_USD && <p className="form-hint">{f.stripeNote}</p>}

            <div className="check">
              <input
                id="champ-consent"
                name="consent"
                type="checkbox"
                required
                aria-required="true"
                aria-invalid={errors.consent ? "true" : undefined}
                aria-describedby={errors.consent ? "err-consent" : undefined}
                checked={answers.consent}
                onChange={(event) => set("consent", event.target.checked)}
              />
              <label htmlFor="champ-consent">
                {f.consent}{" "}
                <a href="/confidentialite/" target="_blank" rel="noreferrer">
                  {f.consentLink}
                </a>
                .
              </label>
            </div>
            {errors.consent && (
              <p className="field__error" id="err-consent">
                {errors.consent}
              </p>
            )}
          </div>
        )}

        <div className="hp" aria-hidden="true">
          <label htmlFor="champ-company-url">Company URL</label>
          <input ref={honeypotRef} id="champ-company-url" name="company_url" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="form-actions">
          {step > 0 ? (
            <button type="button" className="btn btn--ghost" onClick={() => setStep((value) => value - 1)}>
              {f.back}
            </button>
          ) : (
            <span />
          )}

          <div className="form-actions__right">
            {step < 2 ? (
              <button
                type="button"
                className="btn btn--coral"
                onClick={() => {
                  if (step === 0) {
                    goNext();
                  } else {
                    setStep(2);
                  }
                }}
              >
                {step === 0 ? f.next : f.review}
                <ArrowRight />
              </button>
            ) : (
              <button type="submit" className="btn btn--coral" disabled={status === "sending"}>
                {status === "sending" ? f.submitting : f.submit}
                {status !== "sending" && <ArrowRight />}
              </button>
            )}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {status === "sending" ? f.statusSending : ""}
        </p>

        {status === "error" && (
          <div className="fallback" role="alert">
            <h4>{f.failureTitle}</h4>
            <p>{f.failureBody}</p>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              <button type="button" className="btn btn--ghost btn--sm" onClick={retry}>
                {f.retry}
              </button>
              <a className="btn btn--coral btn--sm" href={mailtoHref}>
                <MailIcon />
                {f.mailto}
              </a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
