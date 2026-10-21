import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Content, FormService, Locale } from "@/content/types";
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from "@/config";
import { JOURNEY, type JourneyServiceId } from "@/content/journey";
import { ArrowRight, MailIcon } from "./Icons";

/**
 * The FEEKZA brief — six questions, set as a printed form.
 *
 * Art direction: a working document, not an interface. One dark running head,
 * a narrow numeral margin, answers set as rules rather than cards, and the
 * brief assembling in the right column. The only colour is ink, paper, and an
 * electric blue used for three things: the progress hairline, the chosen
 * marker, and focus. The brand mark appears once — six strokes that complete
 * as the six questions are answered.
 *
 * Behaviour is unchanged: conditional questions, validation, Formspree
 * submission, duplicate guard, failure fallback, success state.
 */

const TOTAL_STEPS = 6;
const STEP_IDS = ["service", "context", "goal", "budget", "project", "contact"] as const;

type Errors = Partial<Record<"service" | "business" | "website" | "goal" | "name" | "email" | "consent", string>>;

interface Answers {
  service: JourneyServiceId | "";
  business: string;
  sector: string;
  website: string;
  problem: string;
  zone: string;
  platforms: string[];
  publishers: string;
  channels: string[];
  history: string;
  scope: string[];
  other: string;
  goal: string;
  budget: string;
  notes: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

const EMPTY: Answers = {
  service: "",
  business: "",
  sector: "",
  website: "",
  problem: "",
  zone: "",
  platforms: [],
  publishers: "",
  channels: [],
  history: "",
  scope: [],
  other: "",
  goal: "",
  budget: "",
  notes: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LEGACY_SERVICE: Record<JourneyServiceId, FormService> = {
  site: "site-web",
  refonte: "site-web",
  seo: "seo",
  social: "marketing",
  ads: "marketing",
  strategie: "marketing",
  autre: "marketing",
};

/* The mark, in the six strokes that make it. Used once, small, as progress. */
const STROKES = [
  "M18 18 V250",
  "M18 18 H206",
  "M206 18 L172 54",
  "M172 54 H72 V104",
  "M72 104 H160 L126 140 H72",
  "M72 140 V196 L18 250",
];

function Mark({ step }: { step: number }) {
  const done = step + 1;
  return (
    <svg className="b-mark" viewBox="2 2 220 262" aria-hidden="true" focusable="false">
      <polygon
        className={`b-mark__solid${done >= 6 ? " is-on" : ""}`}
        points="18,18 206,18 172,54 72,54 72,104 160,104 126,140 72,140 72,196 18,250"
      />
      {STROKES.map((d, index) => (
        <path key={d} d={d} className={`b-mark__s${index < done ? " is-on" : ""}`} />
      ))}
    </svg>
  );
}

/* ── Small building blocks ─────────────────────────────────────────────── */

function FieldLabel({
  htmlFor,
  children,
  note,
  quiet,
}: {
  htmlFor: string;
  children: ReactNode;
  note?: ReactNode;
  quiet?: boolean;
}) {
  const required = note === "*";
  return (
    <label className={`b-label${quiet ? " sr-only" : ""}`} htmlFor={htmlFor}>
      <span>
        {children}
        {required && (
          <span className="b-label__req" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {note && !required && <span className="b-label__note">{note}</span>}
    </label>
  );
}

/** A set of answers as words on rules, the way a form lists options. */
function Vocab({
  legend,
  options,
  value,
  onPick,
  optional,
  error,
  columns = false,
}: {
  legend: string;
  options: string[];
  value: string | string[];
  onPick: (option: string) => void;
  optional?: string;
  error?: string;
  columns?: boolean;
}) {
  const isOn = (option: string) => (Array.isArray(value) ? value.includes(option) : value === option);
  return (
    <fieldset className="b-vocab" data-invalid={error ? "true" : undefined}>
      <legend className="b-label">
        <span>{legend}</span>
        {optional && <span className="b-label__note">{optional}</span>}
      </legend>
      <div className={`b-words${columns ? " b-words--cols" : ""}`}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`b-word${isOn(option) ? " is-on" : ""}`}
            aria-pressed={isOn(option)}
            onClick={() => onPick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <p className="b-error">{error}</p>}
    </fieldset>
  );
}

/* ── Main ──────────────────────────────────────────────────────────────── */

export function ContactJourney({ c, service }: { c: Content; service?: FormService }) {
  const j = JOURNEY[c.locale as Locale];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [touched, setTouched] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const stepBodyRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const advanceTimer = useRef<number | null>(null);
  const submittedRef = useRef(false);
  const firstRender = useRef(true);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as keyof Errors];
      return next;
    });
  };

  const toggleIn = (key: "platforms" | "channels" | "scope", option: string) => {
    setAnswers((prev) => {
      const list = prev[key];
      return { ...prev, [key]: list.includes(option) ? list.filter((item) => item !== option) : [...list, option] };
    });
  };

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (status === "success") {
      successRef.current?.focus({ preventScroll: true });
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, status]);

  const needsWebsite = answers.service === "refonte" || answers.service === "seo";

  const validateStep = (target: number): Errors => {
    const next: Errors = {};
    if (target === 0 && !answers.service) next.service = j.errors.service;
    if (target === 1) {
      if (!answers.business.trim()) next.business = j.errors.business;
      if (needsWebsite && !answers.website.trim()) next.website = j.errors.website;
    }
    if (target === 2 && !answers.goal) next.goal = j.errors.goal;
    if (target === 5) {
      if (!answers.name.trim()) next.name = j.errors.name;
      if (!EMAIL_RE.test(answers.email.trim())) next.email = j.errors.email;
      if (!answers.consent) next.consent = j.errors.consent;
    }
    return next;
  };

  const focusFirstProblem = () => {
    requestAnimationFrame(() => {
      const root = stepBodyRef.current;
      const invalid = root?.querySelector<HTMLElement>("[aria-invalid='true'], [data-invalid='true']");
      if (invalid) {
        invalid.focus({ preventScroll: false });
        return;
      }
      headingRef.current?.focus({ preventScroll: true });
    });
  };

  const goTo = (target: number, direction: 1 | -1) => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    setDir(direction);
    setStep(target);
  };

  const advance = () => {
    const next = validateStep(step);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setTouched(true);
      focusFirstProblem();
      return;
    }
    setErrors({});
    goTo(Math.min(step + 1, TOTAL_STEPS - 1), 1);
  };

  const chooseSingle = (key: "service" | "goal" | "budget", value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as keyof Errors];
      return next;
    });
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 340;
    advanceTimer.current = window.setTimeout(() => {
      if (key === "service" && !value) return;
      if (key === "goal" && !value) return;
      goTo(Math.min(step + 1, TOTAL_STEPS - 1), 1);
    }, delay);
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (step < TOTAL_STEPS - 1) {
      advance();
      return;
    }
    if (status === "sending" || submittedRef.current) return;
    const next = validateStep(5);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setTouched(true);
      focusFirstProblem();
      return;
    }
    setErrors({});
    setStatus("sending");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    const need = answers.service as JourneyServiceId;
    const serviceLabel = j.services.find((s) => s.id === need)?.label ?? need;
    const budget = answers.budget || "—";
    const extras = [
      answers.platforms.length ? `Réseaux: ${answers.platforms.join(", ")}` : "",
      answers.channels.length ? `Canaux: ${answers.channels.join(", ")}` : "",
      answers.scope.length ? `Périmètre: ${answers.scope.join(", ")}` : "",
      answers.zone ? `Zone: ${answers.zone}` : "",
      answers.problem ? `Problème: ${answers.problem}` : "",
      answers.publishers ? `Publication: ${answers.publishers}` : "",
      answers.history ? `Historique pub: ${answers.history}` : "",
      answers.other ? `Autre: ${answers.other}` : "",
    ].filter(Boolean);

    const message = [
      `Nouveau dossier — feekza.com (${j.localeName})`,
      "--------------------------------",
      `Besoin: ${serviceLabel}`,
      `Entreprise: ${answers.business}`,
      `Secteur: ${answers.sector || "—"}`,
      `Site: ${answers.website || "—"}`,
      ...extras,
      `Objectif: ${j.goals.find((g) => g.id === answers.goal)?.label ?? "—"}`,
      `Budget: ${budget}`,
      `Échéance: ${answers.timeline || "—"}`,
      `Projet: ${answers.notes || "—"}`,
      `Nom: ${answers.name}`,
      `Email: ${answers.email}`,
      `Téléphone: ${answers.phone || "—"}`,
    ].join("\n");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          _subject: `${j.subject} — ${answers.business || answers.name}`,
          _replyto: answers.email,
          type: "contact-journey",
          locale: c.locale,
          service: LEGACY_SERVICE[need] ?? service ?? "site-web",
          need,
          needLabel: serviceLabel,
          business: answers.business,
          sector: answers.sector,
          website: answers.website,
          platforms: answers.platforms,
          channels: answers.channels,
          scope: answers.scope,
          zone: answers.zone,
          problem: answers.problem,
          publishers: answers.publishers,
          adHistory: answers.history,
          other: answers.other,
          goal: j.goals.find((g) => g.id === answers.goal)?.label ?? answers.goal,
          budget,
          timeline: answers.timeline,
          notes: answers.notes,
          name: answers.name,
          email: answers.email,
          phone: answers.phone,
          consent: true,
          consentAt: new Date().toISOString(),
          message,
          company_url: honeypotRef.current?.value ?? "",
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      submittedRef.current = true;
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const mailtoHref = useMemo(() => {
    const serviceLabel = j.services.find((s) => s.id === answers.service)?.label ?? "";
    const subject = `${j.subject} — ${answers.business || serviceLabel}`;
    const body = [
      `Besoin: ${serviceLabel}`,
      `Entreprise: ${answers.business}`,
      `Objectif: ${j.goals.find((g) => g.id === answers.goal)?.label ?? "—"}`,
      `Budget: ${answers.budget || "—"}`,
      `Projet: ${answers.notes || "—"}`,
      `Nom: ${answers.name}`,
      `Email: ${answers.email}`,
      `Téléphone: ${answers.phone || "—"}`,
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [answers, j]);

  const reset = () => {
    submittedRef.current = false;
    setAnswers(EMPTY);
    setErrors({});
    setStatus("idle");
    setStep(0);
    setDir(1);
    setTouched(false);
  };

  const summary = [
    { key: "service", value: j.services.find((s) => s.id === answers.service)?.label ?? "" },
    { key: "business", value: answers.business },
    { key: "goal", value: j.goals.find((g) => g.id === answers.goal)?.label ?? "" },
    { key: "budget", value: answers.budget },
    { key: "contact", value: answers.name || answers.email },
  ] as const;

  const filled = summary.filter((row) => row.value).length;
  const current = j.steps[STEP_IDS[step] ?? "service"];
  const progress = `${((step + 1) / TOTAL_STEPS) * 100}%`;

  const Entries = ({ compact = false }: { compact?: boolean }) => (
    <dl className={`b-entries${compact ? " b-entries--compact" : ""}`}>
      {summary.map((row) => (
        <div key={row.key} className={row.value ? "is-filled" : "is-empty"}>
          <dt>{j.summaryLabels[row.key]}</dt>
          <dd>{row.value || j.empty}</dd>
        </div>
      ))}
    </dl>
  );

  /* ── Sent ─────────────────────────────────────────────────────────── */

  if (status === "success") {
    return (
      <div className="b b--done" dir={c.dir}>
        <div className="b-sheet">
          <div className="b-run b-run--done">
            <span className="b-run__id">
              <Mark step={5} />
              <span className="b-run__word">
                FEEKZA<i>·</i>Dossier
              </span>
            </span>
            <span className="b-run__pos">
              <b dir="ltr">06 / 06</b>
              <span className="b-run__step">{j.successTitle}</span>
            </span>
            <span className="b-run__bar" style={{ "--p": "100%" } as CSSProperties} />
          </div>

          <div className="b-done">
            <h3 className="b-done__title" ref={successRef} tabIndex={-1}>
              {j.successTitle}
            </h3>
            <p className="b-done__lead">{j.successBody}</p>

            <ol className="b-done__steps">
              {j.successSteps.map((item, index) => (
                <li key={item}>
                  <span className="b-done__n" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <Entries compact />

            <p className="b-done__note">{j.successNote}</p>

            <div className="b-actions">
              <button type="button" className="b-btn b-btn--ink" onClick={reset}>
                {j.successAgain}
                <ArrowRight size={14} />
              </button>
              <a className="b-link" href={mailtoHref}>
                <MailIcon size={13} /> {j.mailto}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Working ──────────────────────────────────────────────────────── */

  return (
    <div className="b" dir={c.dir}>
      <div className="b-sheet">
        <div className="b-run">
          <span className="b-run__id">
            <Mark step={step} />
            <span className="b-run__word">
              FEEKZA<i>·</i>Dossier
            </span>
          </span>
          <span className="b-run__pos">
            <b dir="ltr">
              {String(step + 1).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
            </b>
            <span className="b-run__step">{current.label}</span>
          </span>
          <span className="b-run__bar" style={{ "--p": progress } as CSSProperties} />
        </div>

        <div className="b-cols">
          <div className="b-main">
            <p className="sr-only" aria-live="polite">
              {j.stepOf(step + 1, TOTAL_STEPS)} — {current.question}
            </p>

            <form onSubmit={onSubmit} noValidate>
              <div className="b-step" key={step} data-dir={dir} ref={stepBodyRef}>
                <header className="b-head">
                  <p className="b-head__n" aria-hidden="true">
                    {String(step + 1).padStart(2, "0")}
                  </p>
                  <h3 className="b-q" ref={headingRef} tabIndex={-1}>
                    {current.question}
                  </h3>
                  <p className="b-hint">{current.hint}</p>
                </header>

                <div className="b-answers">
                  {/* 1 — the need */}
                  {step === 0 && (
                    <div className="b-list" role="group" aria-labelledby={`${uid}-service-label`}>
                      <span className="sr-only" id={`${uid}-service-label`}>
                        {current.question}
                      </span>
                      {j.services.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className={`b-row${answers.service === option.id ? " is-on" : ""}`}
                          aria-pressed={answers.service === option.id}
                          onClick={() => chooseSingle("service", option.id)}
                        >
                          <span className="b-row__mark" aria-hidden="true" />
                          <span className="b-row__label">{option.label}</span>
                          <span className="b-row__note">{option.note}</span>
                        </button>
                      ))}
                      {errors.service && (
                        <p className="b-error" role="alert">
                          {errors.service}
                        </p>
                      )}
                    </div>
                  )}

                  {/* 2 — the business */}
                  {step === 1 && (
                    <div className="b-fields">
                      <div className="b-field">
                        <FieldLabel htmlFor={`${uid}-business`} note="*">
                          {j.business.label}
                        </FieldLabel>
                        <input
                          id={`${uid}-business`}
                          className="b-input b-input--lg"
                          autoComplete="organization"
                          placeholder={j.business.placeholder}
                          value={answers.business}
                          aria-invalid={errors.business ? "true" : undefined}
                          aria-describedby={errors.business ? `${uid}-business-err` : undefined}
                          onChange={(event) => set("business", event.target.value)}
                        />
                        {errors.business && (
                          <p className="b-error" id={`${uid}-business-err`}>
                            {errors.business}
                          </p>
                        )}
                      </div>

                      <Vocab
                        legend={j.sector.label}
                        options={j.sector.options}
                        value={answers.sector}
                        optional={j.optional}
                        columns
                        onPick={(option) => set("sector", answers.sector === option ? "" : option)}
                      />

                      {(answers.service === "site" || answers.service === "refonte" || answers.service === "seo") && (
                        <div className="b-field b-reveal">
                          <FieldLabel htmlFor={`${uid}-website`} note={needsWebsite ? j.website.required : j.website.optional}>
                            {j.website.label}
                          </FieldLabel>
                          <input
                            id={`${uid}-website`}
                            className="b-input"
                            type="url"
                            inputMode="url"
                            autoComplete="url"
                            placeholder={j.website.placeholder}
                            value={answers.website}
                            aria-invalid={errors.website ? "true" : undefined}
                            aria-describedby={errors.website ? `${uid}-website-err` : undefined}
                            onChange={(event) => set("website", event.target.value)}
                          />
                          {errors.website && (
                            <p className="b-error" id={`${uid}-website-err`}>
                              {errors.website}
                            </p>
                          )}
                        </div>
                      )}

                      {answers.service === "refonte" && (
                        <Vocab
                          legend={j.problem.label}
                          options={j.problem.options}
                          value={answers.problem}
                          optional={j.optional}
                          onPick={(option) => set("problem", answers.problem === option ? "" : option)}
                        />
                      )}

                      {answers.service === "seo" && (
                        <Vocab
                          legend={j.zone.label}
                          options={j.zone.options}
                          value={answers.zone}
                          onPick={(option) => set("zone", answers.zone === option ? "" : option)}
                        />
                      )}

                      {answers.service === "social" && (
                        <>
                          <Vocab
                            legend={j.platforms.label}
                            options={j.platforms.options}
                            value={answers.platforms}
                            onPick={(option) => toggleIn("platforms", option)}
                          />
                          <Vocab
                            legend={j.publishers.label}
                            options={j.publishers.options}
                            value={answers.publishers}
                            optional={j.optional}
                            onPick={(option) => set("publishers", answers.publishers === option ? "" : option)}
                          />
                        </>
                      )}

                      {answers.service === "ads" && (
                        <>
                          <Vocab
                            legend={j.channels.label}
                            options={j.channels.options}
                            value={answers.channels}
                            onPick={(option) => toggleIn("channels", option)}
                          />
                          <Vocab
                            legend={j.history.label}
                            options={j.history.options}
                            value={answers.history}
                            optional={j.optional}
                            onPick={(option) => set("history", answers.history === option ? "" : option)}
                          />
                        </>
                      )}

                      {answers.service === "strategie" && (
                        <Vocab
                          legend={j.scope.label}
                          options={j.scope.options}
                          value={answers.scope}
                          onPick={(option) => toggleIn("scope", option)}
                        />
                      )}

                      {answers.service === "autre" && (
                        <div className="b-field b-reveal">
                          <FieldLabel htmlFor={`${uid}-other`} note="*">
                            {j.other.label}
                          </FieldLabel>
                          <textarea
                            id={`${uid}-other`}
                            className="b-area"
                            rows={2}
                            placeholder={j.other.placeholder}
                            value={answers.other}
                            onChange={(event) => set("other", event.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3 — the goal */}
                  {step === 2 && (
                    <div className="b-goals" role="group" aria-labelledby={`${uid}-goal-label`}>
                      <span className="sr-only" id={`${uid}-goal-label`}>
                        {current.question}
                      </span>
                      {j.goals.map((option, index) => (
                        <button
                          key={option.id}
                          type="button"
                          className={`b-goal${answers.goal === option.id ? " is-on" : ""}`}
                          aria-pressed={answers.goal === option.id}
                          onClick={() => chooseSingle("goal", option.id)}
                        >
                          <span className="b-goal__n" aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="b-goal__label">{option.label}</span>
                          <span className="b-goal__note">{option.note}</span>
                        </button>
                      ))}
                      {errors.goal && (
                        <p className="b-error" role="alert">
                          {errors.goal}
                        </p>
                      )}
                    </div>
                  )}

                  {/* 4 — the budget */}
                  {step === 3 && (
                    <div className="b-prices" role="group" aria-labelledby={`${uid}-budget-label`}>
                      <span className="sr-only" id={`${uid}-budget-label`}>
                        {current.question}
                      </span>
                      {j.budgets.map((option, index) => (
                        <button
                          key={option}
                          type="button"
                          className={`b-price${answers.budget === option ? " is-on" : ""}`}
                          aria-pressed={answers.budget === option}
                          onClick={() => chooseSingle("budget", option)}
                        >
                          <span className="b-price__n" aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="b-price__amount">{option}</span>
                          <span
                            className="b-price__rule"
                            aria-hidden="true"
                            style={{ "--len": `${28 + index * 22}%` } as CSSProperties}
                          />
                        </button>
                      ))}
                      <p className="b-prices__foot">
                        <span>EUR · TTC · par mois</span>
                        <button type="button" className="b-link" onClick={() => goTo(4, 1)} disabled={status === "sending"}>
                          {j.skip}
                        </button>
                      </p>
                    </div>
                  )}

                  {/* 5 — the project */}
                  {step === 4 && (
                    <div className="b-fields">
                      <div className="b-field">
                        <FieldLabel htmlFor={`${uid}-notes`} quiet>
                          {current.question} — {j.optional}
                        </FieldLabel>
                        <textarea
                          id={`${uid}-notes`}
                          className="b-area b-area--write"
                          rows={5}
                          placeholder={j.projectPlaceholder}
                          value={answers.notes}
                          onChange={(event) => set("notes", event.target.value)}
                        />
                        <p className="b-help">{j.projectExample}</p>
                      </div>

                      <Vocab
                        legend={j.timeline.label}
                        options={j.timeline.options}
                        value={answers.timeline}
                        optional={j.optional}
                        onPick={(option) => set("timeline", answers.timeline === option ? "" : option)}
                      />
                    </div>
                  )}

                  {/* 6 — the contact */}
                  {step === 5 && (
                    <div className="b-fields">
                      <div className="b-pair">
                        <div className="b-field">
                          <FieldLabel htmlFor={`${uid}-name`} note="*">
                            {j.fields.name}
                          </FieldLabel>
                          <input
                            id={`${uid}-name`}
                            className="b-input"
                            autoComplete="name"
                            placeholder={j.namePlaceholder}
                            value={answers.name}
                            aria-invalid={errors.name ? "true" : undefined}
                            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                            onChange={(event) => set("name", event.target.value)}
                          />
                          {errors.name && (
                            <p className="b-error" id={`${uid}-name-err`}>
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className="b-field">
                          <FieldLabel htmlFor={`${uid}-email`} note="*">
                            {j.fields.email}
                          </FieldLabel>
                          <input
                            id={`${uid}-email`}
                            className="b-input"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            placeholder={j.emailPlaceholder}
                            value={answers.email}
                            aria-invalid={errors.email ? "true" : undefined}
                            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                            onChange={(event) => set("email", event.target.value)}
                            onBlur={() => {
                              if (answers.email && !EMAIL_RE.test(answers.email)) {
                                setErrors((prev) => ({ ...prev, email: j.errors.email }));
                              }
                            }}
                          />
                          {errors.email && (
                            <p className="b-error" id={`${uid}-email-err`}>
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="b-field b-field--half">
                        <FieldLabel htmlFor={`${uid}-phone`} note={j.fields.phoneOptional}>
                          {j.fields.phone}
                        </FieldLabel>
                        <input
                          id={`${uid}-phone`}
                          className="b-input"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder={j.phonePlaceholder}
                          value={answers.phone}
                          onChange={(event) => set("phone", event.target.value)}
                        />
                      </div>

                      <label className={`b-consent${errors.consent ? " is-error" : ""}`}>
                        <input
                          id={`${uid}-consent`}
                          type="checkbox"
                          checked={answers.consent}
                          aria-invalid={errors.consent ? "true" : undefined}
                          aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
                          onChange={(event) => set("consent", event.target.checked)}
                          required
                        />
                        <span className="b-consent__box" aria-hidden="true" />
                        <span className="b-consent__text">
                          {j.consentBefore}{" "}
                          <a href="/confidentialite/" target="_blank" rel="noreferrer">
                            {j.consentLink}
                          </a>
                          {j.consentAfter}
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="b-error" id={`${uid}-consent-err`}>
                          {errors.consent}
                        </p>
                      )}
                      <p className="b-help">{j.requiredNote}</p>
                    </div>
                  )}
                </div>

                {/* honeypot — unchanged from the previous form */}
                <div className="hp" aria-hidden="true">
                  <label htmlFor={`${uid}-company-url`}>Company URL</label>
                  <input ref={honeypotRef} id={`${uid}-company-url`} name="company_url" tabIndex={-1} autoComplete="off" />
                </div>

                {status === "error" && (
                  <div className="b-alert" role="alert">
                    <p className="b-alert__title">{j.failureTitle}</p>
                    <p className="b-alert__body">{j.failureBody}</p>
                    <div className="b-actions">
                      <button type="button" className="b-btn b-btn--ink" onClick={() => setStatus("idle")}>
                        {j.retry}
                      </button>
                      <a className="b-link" href={mailtoHref}>
                        <MailIcon size={13} /> {j.mailto}
                      </a>
                    </div>
                  </div>
                )}

                <div className="b-nav">
                  {step > 0 ? (
                    <button type="button" className="b-back" onClick={() => goTo(step - 1, -1)} disabled={status === "sending"}>
                      <span aria-hidden="true" className="b-back__arrow">
                        <ArrowRight size={12} />
                      </span>
                      {j.back}
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < TOTAL_STEPS - 1 ? (
                    <button type="button" className="b-btn b-btn--ink" onClick={advance} disabled={status === "sending"}>
                      {j.next}
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button type="submit" className="b-btn b-btn--ink" disabled={status === "sending"}>
                      {status === "sending" ? j.sending : j.submit}
                      {status !== "sending" && <ArrowRight size={14} />}
                    </button>
                  )}
                </div>

                {touched && Object.keys(errors).length > 0 && (
                  <p className="b-error b-error--form" role="status">
                    {j.errorHint}
                  </p>
                )}
              </div>
            </form>
          </div>

          <aside className="b-side">
            <p className="b-side__cap">
              <span>{j.recap}</span>
              <span dir="ltr">
                {filled}/{summary.length}
              </span>
            </p>
            <Entries />
          </aside>
        </div>
      </div>
    </div>
  );
}
