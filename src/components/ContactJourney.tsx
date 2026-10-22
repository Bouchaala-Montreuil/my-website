import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Content, FormService, Locale } from "@/content/types";
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from "@/config";
import { JOURNEY, type JourneyServiceId } from "@/content/journey";
import { ArrowRight, MailIcon } from "./Icons";
import { captureFirstTouch, readFirstTouch } from "@/lib/attribution";

/**
 * THE FEEKZA BRIEF
 *
 * A commission, not a questionnaire. The screen is a spread: the cover is
 * printed on ink and carries the document's identity, its sommaire and the
 * offer; the desk is paper and carries one question at a time. As the visitor
 * answers, their business becomes the title of the document and the sommaire
 * writes itself, line by line, including which chapter the project takes.
 *
 * The question adapts to the chosen service. Nothing is mandatory except what
 * is needed to reply. Submission, validation, spam guard and fallbacks are the
 * ones the site already shipped.
 */

const TOTAL_STEPS = 6;
const STEP_IDS = ["service", "context", "goal", "project", "budget", "contact"] as const;

type Errors = Partial<Record<"service" | "business" | "website" | "goal" | "name" | "email" | "consent", string>>;

interface Answers {
  service: JourneyServiceId | "";
  business: string;
  sector: string;
  website: string;
  goal: string;
  siteType: string;
  problem: string;
  zone: string;
  platforms: string[];
  publisher: string;
  adOutcome: string;
  adDestination: string;
  timeline: string;
  other: string;
  notes: string;
  budget: string;
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
  goal: "",
  siteType: "",
  problem: "",
  zone: "",
  platforms: [],
  publisher: "",
  adOutcome: "",
  adDestination: "",
  timeline: "",
  other: "",
  notes: "",
  budget: "",
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

const pad = (n: number) => String(n).padStart(2, "0");

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
    <svg className="br-mark" viewBox="2 2 220 262" aria-hidden="true" focusable="false">
      <polygon
        className={`br-mark__solid${done >= 6 ? " is-on" : ""}`}
        points="18,18 206,18 172,54 72,54 72,104 160,104 126,140 72,140 72,196 18,250"
      />
      {STROKES.map((d, index) => (
        <path key={d} d={d} className={`br-mark__s${index < done ? " is-on" : ""}`} />
      ))}
    </svg>
  );
}

function FieldLabel({
  htmlFor,
  children,
  note,
}: {
  htmlFor: string;
  children: ReactNode;
  note?: ReactNode;
}) {
  const required = note === "*";
  return (
    <label className="br-label" htmlFor={htmlFor}>
      <span>
        {children}
        {required && (
          <span className="br-label__req" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {note && !required && <span className="br-label__note">{note}</span>}
    </label>
  );
}

/** A set of answers set as words on rules. */
function Vocab({
  legend,
  options,
  value,
  onPick,
  optional,
  columns = false,
}: {
  legend: string;
  options: string[];
  value: string;
  onPick: (option: string) => void;
  optional?: string;
  columns?: boolean;
}) {
  return (
    <fieldset className="br-vocab">
      <legend className="br-label">
        <span>{legend}</span>
        {optional && <span className="br-label__note">{optional}</span>}
      </legend>
      <div className={`br-words${columns ? " br-words--cols" : ""}`}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="br-word"
            aria-pressed={value === option}
            onClick={() => onPick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ContactJourney({
  c,
  service,
  headingId,
}: {
  c: Content;
  service?: FormService;
  headingId?: string;
}) {
  const j = JOURNEY[c.locale as Locale];
  const uid = useId();
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");
  const [touched, setTouched] = useState(false);
  const [focusTick, setFocusTick] = useState(0);
  const [docRef, setDocRef] = useState("");

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const successRef = useRef<HTMLHeadingElement | null>(null);
  const stepBodyRef = useRef<HTMLDivElement | null>(null);
  const submittedRef = useRef(false);
  const honeypotRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const now = new Date();
    setDocRef(`FZ-${pad(now.getDate())}${pad(now.getMonth() + 1)}${String(now.getFullYear()).slice(2)}`);
  }, []);

  /* The record is normally written on the first page of the visit (App);
     this call covers a journey mounted before that effect has run. */
  useEffect(() => {
    captureFirstTouch();
  }, []);

  const prompt = answers.service ? j.steps.project[answers.service] : null;

  /* Which chapter the project takes depends on the service. */
  const chapters = useMemo(() => {
    const project = answers.service ? j.chapters.project[answers.service] : j.chapters.project.autre;
    return [
      j.chapters.service,
      j.chapters.context,
      j.chapters.goal,
      project,
      j.chapters.budget,
      j.chapters.contact,
    ];
  }, [answers.service, j]);

  const goalLabel = j.goals.find((g) => g.id === answers.goal)?.label ?? "";
  const serviceLabel = j.services.find((s) => s.id === answers.service)?.label.replace(/\.$/, "") ?? "";

  const projectValue = (() => {
    switch (answers.service) {
      case "site":
        return answers.siteType;
      case "refonte":
        return answers.problem;
      case "seo":
        return answers.zone;
      case "social":
        return [answers.platforms.join(", "), answers.publisher].filter(Boolean).join(" · ");
      case "ads":
        return [answers.adOutcome, answers.adDestination].filter(Boolean).join(" · ");
      case "strategie":
        return answers.timeline;
      case "autre":
        return answers.other;
      default:
        return "";
    }
  })();

  const values = [
    serviceLabel,
    [answers.business, answers.sector].filter(Boolean).join(" · "),
    goalLabel,
    projectValue,
    answers.budget,
    answers.name,
  ];

  const filled = values.filter(Boolean).length;

  /* ── navigation ─────────────────────────────────────────────────────── */

  const needsSite = Boolean(prompt?.website);

  const validateStep = (target: number): Errors => {
    const next: Errors = {};
    if (target === 0 && !answers.service) next.service = j.errors.service;
    if (target === 1) {
      if (!answers.business.trim()) next.business = j.errors.business;
    }
    if (target === 2 && !answers.goal) next.goal = j.errors.goal;
    if (target === 3 && needsSite && prompt?.website === "required" && !answers.website.trim()) {
      next.website = j.errors.website;
    }
    if (target === 5) {
      if (!answers.name.trim()) next.name = j.errors.name;
      if (!EMAIL_RE.test(answers.email.trim())) next.email = j.errors.email;
      if (!answers.consent) next.consent = j.errors.consent;
    }
    return next;
  };

  /* After a failed check, put the cursor on the field that needs it.
     Runs after the commit, so aria-invalid is already on the element. */
  useEffect(() => {
    if (!focusTick) return;
    const root = stepBodyRef.current;
    const invalid = root?.querySelector<HTMLElement>("[aria-invalid='true']");
    (invalid ?? headingRef.current)?.focus({ preventScroll: false });
  }, [focusTick]);

  const goTo = (target: number, direction: 1 | -1) => {
    const next = Math.min(Math.max(target, 0), TOTAL_STEPS - 1);
    setDir(direction);
    setStep(next);
    setReached((prev) => Math.max(prev, next));
  };

  const advance = () => {
    const next = validateStep(step);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setTouched(true);
      setFocusTick((tick) => tick + 1);
      return;
    }
    setErrors({});
    goTo(step + 1, 1);
  };

  const pickService = (id: JourneyServiceId) => {
    setAnswers((prev) => ({
      ...prev,
      service: id,
      siteType: "",
      problem: "",
      zone: "",
      platforms: [],
      publisher: "",
      adOutcome: "",
      adDestination: "",
      timeline: "",
      other: "",
      website: id === "site" ? "" : prev.website,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.service;
      delete next.website;
      return next;
    });
  };

  const pickGoal = (id: string) => {
    setAnswers((prev) => ({ ...prev, goal: id }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.goal;
      return next;
    });
  };

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as keyof Errors];
      return next;
    });
  };

  const projectKey: keyof Answers | null =
    answers.service === "social"
      ? "platforms"
      : answers.service === "site"
        ? "siteType"
        : answers.service === "refonte"
          ? "problem"
          : answers.service === "seo"
            ? "zone"
            : answers.service === "ads"
              ? "adOutcome"
              : answers.service === "strategie"
                ? "timeline"
                : null;

  const isOn = (option: string) => {
    if (!projectKey) return false;
    const value = answers[projectKey];
    return Array.isArray(value) ? value.includes(option) : value === option;
  };

  const pickProject = (option: string) => {
    if (!projectKey) return;
    const multi = projectKey === "platforms";
    if (multi) {
      const list = answers.platforms;
      set("platforms", list.includes(option) ? list.filter((p) => p !== option) : [...list, option]);
      return;
    }
    set(projectKey, option as never);
  };

  /* ── submission ─────────────────────────────────────────────────────── */

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
      setFocusTick((tick) => tick + 1);
      return;
    }
    setErrors({});
    setStatus("sending");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    const need = answers.service as JourneyServiceId;

    const message = [
      `Nouveau brief — feekza.com (${j.localeName})${docRef ? ` — ${j.brand.ref} ${docRef}` : ""}`,
      "--------------------------------",
      `Demande: ${serviceLabel}`,
      `Entreprise: ${answers.business}`,
      `Secteur: ${answers.sector || "—"}`,
      `Objectif: ${goalLabel || "—"}`,
      `Projet: ${projectValue || "—"}`,
      `Site: ${answers.website || "—"}`,
      `Budget: ${answers.budget || "—"}`,
      `Contexte: ${answers.notes || "—"}`,
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
          type: "contact-brief",
          locale: c.locale,
          ref: docRef,
          service: LEGACY_SERVICE[need] ?? service ?? "site-web",
          need,
          needLabel: serviceLabel,
          business: answers.business,
          sector: answers.sector,
          website: answers.website,
          siteType: answers.siteType,
          problem: answers.problem,
          zone: answers.zone,
          platforms: answers.platforms,
          publisher: answers.publisher,
          adOutcome: answers.adOutcome,
          adDestination: answers.adDestination,
          timeline: answers.timeline,
          other: answers.other,
          goal: goalLabel || answers.goal,
          projectValue,
          budget: answers.budget || "—",
          notes: answers.notes,
          name: answers.name,
          email: answers.email,
          phone: answers.phone,
          consent: true,
          consentAt: new Date().toISOString(),
          source: readFirstTouch(),
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
    const subject = `${j.subject} — ${answers.business || serviceLabel || "feekza.com"}`;
    const body = [
      `Demande: ${serviceLabel || "—"}`,
      `Entreprise: ${answers.business || "—"}`,
      `Objectif: ${goalLabel || "—"}`,
      `Projet: ${projectValue || "—"}`,
      `Budget: ${answers.budget || "—"}`,
      `Contexte: ${answers.notes || "—"}`,
      `Nom: ${answers.name}`,
      `Email: ${answers.email}`,
      `Téléphone: ${answers.phone || "—"}`,
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [answers, docRef, goalLabel, j.subject, projectValue, serviceLabel]);

  const reset = () => {
    submittedRef.current = false;
    setAnswers(EMPTY);
    setErrors({});
    setStatus("idle");
    setStep(0);
    setReached(0);
    setDir(1);
    setTouched(false);
    setFocusTick(0);
  };

  /* Focus follows the question, the way a cursor follows a page. */
  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus({ preventScroll: true });
      return;
    }
    if (status === "sending") return;
    headingRef.current?.focus({ preventScroll: true });
  }, [step, status]);

  const current = STEP_IDS[step];
  const stepCopy: { question: string; hint: string } =
    current === "service"
      ? j.steps.service
      : current === "context"
        ? j.steps.context
        : current === "goal"
          ? j.steps.goal
          : current === "project"
            ? (prompt ?? j.steps.service)
            : current === "budget"
              ? j.steps.budget
              : j.steps.contact;

  /* ── success ────────────────────────────────────────────────────────── */

  if (status === "success") {
    return (
      <div className="br" dir={c.dir}>
        <aside className="br-cover">
          <div className="br-cover__top">
            <span className="br-brand">
              <Mark step={5} />
              <span className="br-brand__word">
                FEEKZA<i>·</i>
                {j.brand.tag}
              </span>
            </span>
            <span className="br-ref">
              {j.brand.ref} {docRef}
            </span>
          </div>
          <div className="br-title">
            <h2 className="br-title__doc">{j.brand.title}</h2>
            <p className="br-title__name">{answers.business || j.brand.untitled}</p>
          </div>
          <nav className="br-index" aria-label={j.brand.summary}>
            {chapters.map((chapter, index) => (
              <div
                key={chapter}
                className="br-chapter"
                data-state={index < step ? "done" : index === step ? "current" : "todo"}
              >
                <span className="br-chapter__n">{pad(index + 1)}</span>
                <span className="br-chapter__body">
                  <span className="br-chapter__label">{chapter}</span>
                  <span className="br-chapter__value">{values[index] || j.empty}</span>
                </span>
              </div>
            ))}
          </nav>
          <p className="br-offer">
            {j.brand.offer.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </aside>

        <div className="br-desk">
          <div className="br-done">
            <p className="br-kicker">
              {filled} / {TOTAL_STEPS}
            </p>
            <h3 className="br-done__title" ref={successRef} tabIndex={-1}>
              {j.successTitle}
            </h3>
            <p className="br-done__lead">{j.successBody}</p>
            <ol className="br-done__steps">
              {j.successSteps.map((line, index) => (
                <li key={line}>
                  <span className="br-done__n" aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
            <p className="br-note">{j.successNote}</p>
            <div className="br-actions">
              <button type="button" className="br-next" onClick={reset}>
                {j.successAgain}
                <ArrowRight size={14} />
              </button>
              <a className="br-mailto" href={mailtoHref}>
                <MailIcon size={14} /> {j.mailto}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── the brief ──────────────────────────────────────────────────────── */

  const total = TOTAL_STEPS;

  return (
    <div className="br" dir={c.dir}>
      <aside className="br-cover">
        <div className="br-cover__top">
          <span className="br-brand">
            <Mark step={step} />
            <span className="br-brand__word">
              FEEKZA<i>·</i>
              {j.brand.tag}
            </span>
          </span>
          <span className="br-ref">
            {j.brand.ref} {docRef}
          </span>
        </div>

        <div className="br-title">
          <h2 id={headingId} className="br-title__doc">
            {j.brand.title}
          </h2>
          <p className="br-title__name" data-empty={!answers.business}>
            {answers.business || j.brand.untitled}
          </p>
        </div>

        <p
          className="br-mobile-step"
          style={{ "--p": `${((step + 1) / total) * 100}%` } as CSSProperties}
        >
          <span className="br-mobile-step__n">
            <b>{pad(step + 1)}</b> / {pad(total)}
          </span>
          <span>{chapters[step]}</span>
        </p>

        <nav className="br-index" aria-label={j.brand.summary}>
          {chapters.map((chapter, index) => {
            const state = index === step ? "current" : values[index] ? "done" : index < step ? "open" : "todo";
            const canGo = index <= reached && index !== step;
            return (
              <button
                key={`${chapter}-${index}`}
                type="button"
                className="br-chapter"
                data-state={state}
                data-open={canGo || index === step ? "true" : undefined}
                aria-current={index === step ? "step" : undefined}
                disabled={!canGo}
                onClick={() => canGo && goTo(index, -1)}
              >
                <span className="br-chapter__n">{pad(index + 1)}</span>
                <span className="br-chapter__body">
                  <span className="br-chapter__label">{chapter}</span>
                  <span className="br-chapter__value">{values[index] || j.empty}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <p className="br-offer">
          {j.brand.offer.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </aside>

      <div className="br-desk">
        <form className="br-form" onSubmit={onSubmit} noValidate aria-busy={status === "sending"}>
          <div className="br-step" key={step} data-dir={dir} ref={stepBodyRef}>
            <div className="br-head">
              <p className="br-kicker" aria-hidden="true">
                {pad(step + 1)} / {pad(total)}
              </p>
              <h3 className="br-q" ref={headingRef} tabIndex={-1}>
                {stepCopy.question}
              </h3>
              <p className="br-hint">{stepCopy.hint}</p>
            </div>

            <div className="br-answers">
              {/* 01 — the request, as the visitor would say it */}
              {step === 0 && (
                <div className="br-menu" role="group" aria-label={j.steps.service.question}>
                  {j.services.map((option, index) => (
                    <button
                      key={option.id}
                      type="button"
                      className="br-line"
                      aria-pressed={answers.service === option.id}
                      onClick={() => pickService(option.id as JourneyServiceId)}
                    >
                      <span className="br-line__n" aria-hidden="true">
                        {pad(index + 1)}
                      </span>
                      <span className="br-line__label">{option.label}</span>
                      <span className="br-line__note">{option.note}</span>
                    </button>
                  ))}
                  {errors.service && (
                    <p className="br-error" role="alert">
                      {errors.service}
                    </p>
                  )}
                </div>
              )}

              {/* 02 — the business */}
              {step === 1 && (
                <div className="br-fields">
                  <div className="br-field">
                    <FieldLabel htmlFor={`${uid}-business`} note="*">
                      {j.business.label}
                    </FieldLabel>
                    <input
                      id={`${uid}-business`}
                      className="br-input br-input--xl"
                      autoComplete="organization"
                      placeholder={j.business.placeholder}
                      value={answers.business}
                      aria-invalid={errors.business ? "true" : undefined}
                      onChange={(event) => set("business", event.target.value)}
                    />
                    {errors.business && <p className="br-error">{errors.business}</p>}
                  </div>

                  <Vocab
                    legend={j.sector.label}
                    options={j.sector.options}
                    value={answers.sector}
                    optional={j.sector.optional}
                    columns
                    onPick={(option) => set("sector", answers.sector === option ? "" : option)}
                  />
                </div>
              )}

              {/* 03 — the goal, as the end of a sentence */}
              {step === 2 && (
                <div className="br-want">
                  <p className="br-want__lead" aria-hidden="true">
                    {j.steps.goal.lead}
                  </p>
                  <div className="br-want__list" role="group" aria-label={j.steps.goal.question}>
                    {j.goals.map((goal) => (
                      <button
                        key={goal.id}
                        type="button"
                        className="br-want__item"
                        aria-pressed={answers.goal === goal.id}
                        onClick={() => pickGoal(goal.id)}
                      >
                        <span className="br-want__label">{goal.label}</span>
                        <span className="br-want__note">{goal.note}</span>
                      </button>
                    ))}
                    {errors.goal && (
                      <p className="br-error" role="alert">
                        {errors.goal}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* 04 — the project, asked in the language of the chosen service */}
              {step === 3 && prompt && (
                <div className="br-project">
                  {prompt.mode === "text" ? (
                    <div className="br-field">
                      <label className="br-label" htmlFor={`${uid}-other`}>
                        {j.other.label}
                      </label>
                      <textarea
                        id={`${uid}-other`}
                        className="br-area"
                        rows={3}
                        placeholder={prompt.placeholder ?? j.other.placeholder}
                        value={answers.other}
                        onChange={(event) => set("other", event.target.value)}
                      />
                    </div>
                  ) : (
                    <div
                      className="br-options"
                      data-mode={prompt.mode}
                      role="group"
                      aria-label={prompt.question}
                    >
                      {prompt.options?.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className="br-option"
                          aria-pressed={isOn(option.label)}
                          onClick={() => pickProject(option.label)}
                        >
                          <span className="br-option__label">{option.label}</span>
                          {option.note && <span className="br-option__note">{option.note}</span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {prompt.extra && (
                    <div className="br-extra" role="group" aria-label={prompt.extra.label}>
                      <p className="br-label">{prompt.extra.label}</p>
                      <div className="br-extra__list">
                        {prompt.extra.options.map((option) => {
                          const key = answers.service === "social" ? "publisher" : "adDestination";
                          const on = answers[key] === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              className="br-chip"
                              aria-pressed={on}
                              onClick={() => set(key, on ? "" : option)}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {prompt.website && (
                    <div className="br-field br-field--site">
                      <FieldLabel
                        htmlFor={`${uid}-website`}
                        note={prompt.website === "required" ? "*" : j.website.optional}
                      >
                        {j.website.label}
                      </FieldLabel>
                      <input
                        id={`${uid}-website`}
                        className="br-input"
                        type="url"
                        inputMode="url"
                        autoComplete="url"
                        placeholder={j.website.placeholder}
                        value={answers.website}
                        aria-invalid={errors.website ? "true" : undefined}
                        onChange={(event) => set("website", event.target.value)}
                      />
                      {errors.website && <p className="br-error">{errors.website}</p>}
                    </div>
                  )}

                  {prompt.mode !== "text" && (
                    <div className="br-field br-field--notes">
                      <FieldLabel htmlFor={`${uid}-notes`} note={j.website.optional}>
                        {j.notes.label}
                      </FieldLabel>
                      <textarea
                        id={`${uid}-notes`}
                        className="br-area br-area--notes"
                        rows={2}
                        placeholder={j.notes.placeholder}
                        value={answers.notes}
                        onChange={(event) => set("notes", event.target.value)}
                      />
                      <p className="br-note">{j.notes.hint}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 05 — the budget, drawn as a ladder */}
              {step === 4 && (
                <div className="br-ladder" role="group" aria-label={j.steps.budget.question}>
                  {j.steps.budget.options.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      className="br-price"
                      style={{ "--w": `${((index + 1) / (j.steps.budget.options.length + 1)) * 100}%` } as CSSProperties}
                      aria-pressed={answers.budget === option}
                      onClick={() => set("budget", answers.budget === option ? "" : option)}
                    >
                      <span className="br-price__n" aria-hidden="true">
                        {pad(index + 1)}
                      </span>
                      <span className="br-price__label">{option}</span>
                      <span className="br-price__rule" aria-hidden="true" />
                    </button>
                  ))}
                  <p className="br-note">{j.steps.budget.note}</p>
                </div>
              )}

              {/* 06 — where to reply, with the brief in sight */}
              {step === 5 && (
                <div className="br-contact">
                  <div className="br-review">
                    <p className="br-review__title">{j.review}</p>
                    <dl>
                      {chapters.map((chapter, index) => (
                        <div key={chapter}>
                          <dt>{chapter}</dt>
                          <dd>{values[index] || j.empty}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="br-fields">
                  <div className="br-pair">
                    <div className="br-field">
                      <FieldLabel htmlFor={`${uid}-name`} note="*">
                        {j.fields.name}
                      </FieldLabel>
                      <input
                        id={`${uid}-name`}
                        className="br-input"
                        autoComplete="name"
                        placeholder={j.placeholders.name}
                        value={answers.name}
                        aria-invalid={errors.name ? "true" : undefined}
                        onChange={(event) => set("name", event.target.value)}
                      />
                      {errors.name && <p className="br-error">{errors.name}</p>}
                    </div>

                    <div className="br-field">
                      <FieldLabel htmlFor={`${uid}-email`} note="*">
                        {j.fields.email}
                      </FieldLabel>
                      <input
                        id={`${uid}-email`}
                        className="br-input"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder={j.placeholders.email}
                        value={answers.email}
                        aria-invalid={errors.email ? "true" : undefined}
                        onChange={(event) => set("email", event.target.value)}
                      />
                      {errors.email && <p className="br-error">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="br-field br-field--half">
                    <FieldLabel htmlFor={`${uid}-phone`} note={j.fields.optional}>
                      {j.fields.phone}
                    </FieldLabel>
                    <input
                      id={`${uid}-phone`}
                      className="br-input"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={j.placeholders.phone}
                      value={answers.phone}
                      onChange={(event) => set("phone", event.target.value)}
                    />
                  </div>

                  <label className={`br-consent${errors.consent ? " is-error" : ""}`}>
                    <input
                      type="checkbox"
                      checked={answers.consent}
                      aria-invalid={errors.consent ? "true" : undefined}
                      onChange={(event) => set("consent", event.target.checked)}
                    />
                    <span className="br-consent__box" aria-hidden="true" />
                    <span className="br-consent__text">
                      {j.consentBefore}{" "}
                      <a href="/confidentialite/">
                        {j.consentLink}
                      </a>
                    </span>
                  </label>

                  <p className="br-note">{j.requiredNote}</p>
                  {errors.consent && (
                    <p className="br-error" role="alert">
                      {errors.consent}
                    </p>
                  )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="br-hp" aria-hidden="true">
            <label htmlFor={`${uid}-company-url`}>Ne pas remplir ce champ</label>
            <input ref={honeypotRef} id={`${uid}-company-url`} name="company_url" tabIndex={-1} autoComplete="off" />
          </div>

          {status === "error" && (
            <div className="br-alert" role="alert">
              <p className="br-alert__title">{j.failureTitle}</p>
              <p className="br-alert__body">{j.failureBody}</p>
              <div className="br-actions">
                <button type="button" className="br-next" onClick={() => setStatus("idle")}>
                  {j.retry}
                </button>
                <a className="br-mailto" href={mailtoHref}>
                  <MailIcon size={14} /> {j.mailto}
                </a>
              </div>
            </div>
          )}

          {touched && Object.keys(errors).length > 0 && (
            <p className="br-error br-error--form" role="status">
              {j.errorHint}
            </p>
          )}

          <div className="br-nav">
            {step > 0 ? (
              <button
                type="button"
                className="br-back"
                disabled={status === "sending"}
                onClick={() => goTo(step - 1, -1)}
              >
                <span className="br-back__arrow" aria-hidden="true">
                  <ArrowRight size={12} />
                </span>
                {j.back}
              </button>
            ) : (
              <span />
            )}

            <div className="br-nav__right">
              {(step === 4 || (step === 3 && prompt?.mode !== "text")) && (
                <button
                  type="button"
                  className="br-pass"
                  disabled={status === "sending"}
                  onClick={() => goTo(step + 1, 1)}
                >
                  {j.pass}
                </button>
              )}
              {step < TOTAL_STEPS - 1 ? (
                <button type="button" className="br-next" onClick={advance} disabled={status === "sending"}>
                  {j.next}
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button type="submit" className="br-next" disabled={status === "sending"}>
                  {status === "sending" ? j.sending : j.submit}
                  {status !== "sending" && <ArrowRight size={14} />}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
