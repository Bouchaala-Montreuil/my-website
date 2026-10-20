import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Content, FormService, Locale } from "@/content/types";
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from "@/config";
import { JOURNEY, type JourneyServiceId } from "@/content/journey";
import { ArrowRight, Check, MailIcon } from "./Icons";

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

/* ── Icons ─────────────────────────────────────────────────────────────── */

function NeedIcon({ id, size = 24 }: { id: JourneyServiceId | ""; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (id) {
    case "site":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
          <path d="M3 9h18M6.5 6.8h.01M9.2 6.8h.01M11.9 6.8h.01M7 13h6M7 16h4" />
        </svg>
      );
    case "refonte":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="13" height="12" rx="1.5" />
          <path d="M7 7V5.5A1.5 1.5 0 0 1 8.5 4H19a1.5 1.5 0 0 1 1.5 1.5V15a1.5 1.5 0 0 1-1.5 1.5h-3" />
          <path d="m10.5 13 2.2-2.2M12.7 10.8l-2.2 4.4 4.4-2.2" />
        </svg>
      );
    case "seo":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="m15 15 5 5M8 10.5h5M10.5 8v5" />
        </svg>
      );
    case "social":
      return (
        <svg {...common}>
          <path d="M4 5.5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" />
          <path d="M20 9h1.2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H20v2.5L17 18h-3" />
        </svg>
      );
    case "ads":
      return (
        <svg {...common}>
          <path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1Z" />
          <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
        </svg>
      );
    case "strategie":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "autre":
      return (
        <svg {...common}>
          <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.5 10.4 12 5 10.6 10.4 9 12 3.5Z" />
          <path d="M18.5 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 4v16M4 12h16" />
        </svg>
      );
  }
}

/* ── Small pieces ──────────────────────────────────────────────────────── */

function ChoiceCard({
  label,
  note,
  icon,
  selected,
  onClick,
  index,
  multi,
}: {
  label: string;
  note?: string;
  icon?: ReactNode;
  selected: boolean;
  onClick: () => void;
  index: number;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      className="j-choice"
      aria-pressed={selected}
      onClick={onClick}
      style={{ "--i": index } as CSSProperties}
    >
      {icon && <span className="j-choice__icon">{icon}</span>}
      <span className="j-choice__text">
        <span className="j-choice__label">{label}</span>
        {note && <span className="j-choice__note">{note}</span>}
      </span>
      <span className={`j-choice__tick${multi ? " j-choice__tick--multi" : ""}`} aria-hidden="true">
        <Check size={13} />
      </span>
    </button>
  );
}

function ChipGroup({
  legend,
  options,
  value,
  onToggle,
  optional,
}: {
  legend: string;
  options: string[];
  value: string[];
  onToggle: (option: string) => void;
  optional?: string;
}) {
  return (
    <fieldset className="j-fieldset">
      <legend className="j-legend">
        {legend}
        {optional && <span className="j-optional"> — {optional}</span>}
      </legend>
      <div className="j-chips">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="j-chip"
            aria-pressed={value.includes(option)}
            onClick={() => onToggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function SingleChips({
  legend,
  options,
  value,
  onChange,
  optional,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (option: string) => void;
  optional?: string;
}) {
  return (
    <fieldset className="j-fieldset">
      <legend className="j-legend">
        {legend}
        {optional && <span className="j-optional"> — {optional}</span>}
      </legend>
      <div className="j-chips">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="j-chip"
            aria-pressed={value === option}
            onClick={() => onChange(value === option ? "" : option)}
          >
            {option}
          </button>
        ))}
      </div>
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
  ] as const;

  const activeService = j.services.find((s) => s.id === answers.service);

  if (status === "success") {
    return (
      <div className="journey journey--done">
        <div className="journey__stage" aria-hidden="true">
          <div className="j-stage__top">
            <span className="j-lockup">
              <img src="/brand/feekza-f.webp" alt="" width={360} height={381} />
              <span>FEEKZA</span>
            </span>
            <span className="j-stage__count" dir="ltr">✓</span>
          </div>
          <div className="j-stage__ring">
            <svg viewBox="0 0 320 320">
              <circle className="j-ring j-ring--soft" cx="160" cy="160" r="132" />
              <circle className="j-ring j-ring--done" cx="160" cy="160" r="132" />
            </svg>
            <span className="j-stage__glyph j-stage__glyph--done">
              <Check size={46} />
            </span>
          </div>
          <div className="j-stage__meta">
            <p className="j-stage__eyebrow">{j.successTitle}</p>
            <p className="j-stage__service">{activeService?.label ?? j.stageNote}</p>
          </div>
        </div>

        <div className="journey__panel">
          <div className="success j-success">
            <div className="success__mark" aria-hidden="true">
              <Check size={26} />
            </div>
            <h3 ref={successRef} tabIndex={-1}>
              {j.successTitle}
            </h3>
            <p>{j.successBody}</p>
            <ol className="success__steps">
              {j.successSteps.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="j-success__note">{j.successNote}</p>
            <div className="j-actions">
              <button type="button" className="j-btn j-btn--ghost" onClick={reset}>
                {j.successAgain}
              </button>
              <a className="j-btn j-btn--line" href={mailtoHref}>
                <MailIcon size={15} /> {j.mailto}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="journey" dir={c.dir}>
      {/* Stage — decorative on desktop, compact bar on mobile */}
      <aside className="journey__stage" aria-hidden="true">
        <div className="j-stage__top">
          <span className="j-lockup">
            <img src="/brand/feekza-f.webp" alt="" width={360} height={381} />
            <span>FEEKZA</span>
          </span>
          <span className="j-stage__count" dir="ltr">
            {String(step + 1).padStart(2, "0")} <i>/</i> {String(TOTAL_STEPS).padStart(2, "0")}
          </span>
        </div>

        <div className="j-stage__ring">
          <svg viewBox="0 0 320 320">
            <circle className="j-ring j-ring--soft" cx="160" cy="160" r="150" />
            <circle className="j-ring j-ring--ticks" cx="160" cy="160" r="126" />
            <circle
              className="j-ring j-ring--progress"
              cx="160"
              cy="160"
              r="150"
              strokeDasharray={2 * Math.PI * 150}
              strokeDashoffset={2 * Math.PI * 150 * (1 - (step + 1) / TOTAL_STEPS)}
            />
          </svg>
          <span className="j-stage__glyph">
            {answers.service ? (
              <NeedIcon id={answers.service} size={44} />
            ) : (
              <img src="/brand/feekza-f.webp" alt="" width={360} height={381} />
            )}
          </span>
        </div>

        <div className="j-stage__meta">
          <p className="j-stage__eyebrow">{activeService ? activeService.label : j.stageNote}</p>
          <p className="j-stage__service">{j.steps[STEP_IDS[step] ?? "service"].label}</p>
        </div>

        <dl className="j-recap">
          {summary.map((row) => (
            <div key={row.key} className={row.value ? "is-filled" : ""}>
              <dt>{j.summaryLabels[row.key]}</dt>
              <dd>{row.value || j.empty}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <div className="journey__panel">
        <div className="j-progress">
          <div className="j-progress__bar">
            <span style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
          </div>
          <p className="j-progress__count">
            {j.stepOf(step + 1, TOTAL_STEPS)} <span aria-hidden="true">·</span> {j.steps[STEP_IDS[step] ?? 'service'].label}
          </p>
        </div>

        <p className="sr-only" aria-live="polite">
          {j.stepOf(step + 1, TOTAL_STEPS)} — {j.steps[STEP_IDS[step] ?? 'service'].question}
        </p>

        <form onSubmit={onSubmit} noValidate>
          <div className="j-step" key={step} data-dir={dir} ref={stepBodyRef}>
            <header className="j-step__head">
              <h3 className="j-step__title" ref={headingRef} tabIndex={-1}>
                {j.steps[STEP_IDS[step] ?? 'service'].question}
              </h3>
              <p className="j-step__hint">
                {j.steps[STEP_IDS[step] ?? 'service'].hint}
              </p>
            </header>

            {step === 0 && (
              <div className="j-choices j-choices--service" role="group" aria-labelledby={`${uid}-service-label`} data-invalid={errors.service ? "true" : undefined}>
                <span className="sr-only" id={`${uid}-service-label`}>
                  {j.steps.service.question}
                </span>
                {j.services.map((option, index) => (
                  <ChoiceCard
                    key={option.id}
                    label={option.label}
                    note={option.note}
                    icon={<NeedIcon id={option.id as JourneyServiceId} />}
                    selected={answers.service === option.id}
                    index={index}
                    onClick={() => chooseSingle("service", option.id)}
                  />
                ))}
                {errors.service && (
                  <p className="j-error" role="alert">
                    {errors.service}
                  </p>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="j-fields">
                <div className="j-field">
                  <label className="j-label" htmlFor={`${uid}-business`}>
                    {j.business.label} <span className="j-req">*</span>
                  </label>
                  <input
                    id={`${uid}-business`}
                    className="j-input"
                    autoComplete="organization"
                    placeholder={j.business.placeholder}
                    value={answers.business}
                    aria-invalid={errors.business ? "true" : undefined}
                    aria-describedby={errors.business ? `${uid}-business-err` : undefined}
                    onChange={(event) => set("business", event.target.value)}
                  />
                  {errors.business && (
                    <p className="j-error" id={`${uid}-business-err`}>
                      {errors.business}
                    </p>
                  )}
                </div>

                <SingleChips
                  legend={j.sector.label}
                  options={j.sector.options}
                  value={answers.sector}
                  onChange={(value) => set("sector", value)}
                  optional={j.optional}
                />

                {(answers.service === "site" || answers.service === "refonte" || answers.service === "seo") && (
                  <div className="j-field">
                    <label className="j-label" htmlFor={`${uid}-website`}>
                      {j.website.label}{" "}
                      {needsWebsite ? <span className="j-req">*</span> : <span className="j-optional">— {j.website.optional}</span>}
                    </label>
                    <input
                      id={`${uid}-website`}
                      className="j-input"
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
                      <p className="j-error" id={`${uid}-website-err`}>
                        {errors.website}
                      </p>
                    )}
                  </div>
                )}

                {answers.service === "refonte" && (
                  <SingleChips
                    legend={j.problem.label}
                    options={j.problem.options}
                    value={answers.problem}
                    onChange={(value) => set("problem", value)}
                    optional={j.optional}
                  />
                )}

                {answers.service === "seo" && (
                  <SingleChips
                    legend={j.zone.label}
                    options={j.zone.options}
                    value={answers.zone}
                    onChange={(value) => set("zone", value)}
                  />
                )}

                {answers.service === "social" && (
                  <>
                    <ChipGroup
                      legend={j.platforms.label}
                      options={j.platforms.options}
                      value={answers.platforms}
                      onToggle={(option) => toggleIn("platforms", option)}
                    />
                    <SingleChips
                      legend={j.publishers.label}
                      options={j.publishers.options}
                      value={answers.publishers}
                      onChange={(value) => set("publishers", value)}
                      optional={j.optional}
                    />
                  </>
                )}

                {answers.service === "ads" && (
                  <>
                    <ChipGroup
                      legend={j.channels.label}
                      options={j.channels.options}
                      value={answers.channels}
                      onToggle={(option) => toggleIn("channels", option)}
                    />
                    <SingleChips
                      legend={j.history.label}
                      options={j.history.options}
                      value={answers.history}
                      onChange={(value) => set("history", value)}
                      optional={j.optional}
                    />
                  </>
                )}

                {answers.service === "strategie" && (
                  <ChipGroup
                    legend={j.scope.label}
                    options={j.scope.options}
                    value={answers.scope}
                    onToggle={(option) => toggleIn("scope", option)}
                  />
                )}

                {answers.service === "autre" && (
                  <div className="j-field">
                    <label className="j-label" htmlFor={`${uid}-other`}>
                      {j.other.label} <span className="j-req">*</span>
                    </label>
                    <textarea
                      id={`${uid}-other`}
                      className="j-textarea"
                      rows={3}
                      placeholder={j.other.placeholder}
                      value={answers.other}
                      onChange={(event) => set("other", event.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="j-choices j-choices--goal" role="group" aria-labelledby={`${uid}-goal-label`} data-invalid={errors.goal ? "true" : undefined}>
                <span className="sr-only" id={`${uid}-goal-label`}>
                  {j.steps.goal.question}
                </span>
                {j.goals.map((option, index) => (
                  <ChoiceCard
                    key={option.id}
                    label={option.label}
                    note={option.note}
                    selected={answers.goal === option.id}
                    index={index}
                    onClick={() => chooseSingle("goal", option.id)}
                  />
                ))}
                {errors.goal && (
                  <p className="j-error" role="alert">
                    {errors.goal}
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="j-choices j-choices--budget" role="group" aria-labelledby={`${uid}-budget-label`}>
                <span className="sr-only" id={`${uid}-budget-label`}>
                  {j.steps.budget.question}
                </span>
                {j.budgets.map((option, index) => (
                  <ChoiceCard
                    key={option}
                    label={option}
                    selected={answers.budget === option}
                    index={index}
                    onClick={() => chooseSingle("budget", option)}
                  />
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="j-fields">
                <div className="j-field">
                  <label className="j-label" htmlFor={`${uid}-notes`}>
                    {j.steps.project.question} <span className="j-optional">— {j.optional}</span>
                  </label>
                  <textarea
                    id={`${uid}-notes`}
                    className="j-textarea j-textarea--tall"
                    rows={5}
                    placeholder={j.projectPlaceholder}
                    value={answers.notes}
                    onChange={(event) => set("notes", event.target.value)}
                  />
                  <p className="j-help">{j.projectExample}</p>
                </div>
                <SingleChips
                  legend={j.timeline.label}
                  options={j.timeline.options}
                  value={answers.timeline}
                  onChange={(value) => set("timeline", value)}
                  optional={j.optional}
                />
              </div>
            )}

            {step === 5 && (
              <div className="j-fields">
                <div className="j-row">
                  <div className="j-field">
                    <label className="j-label" htmlFor={`${uid}-name`}>
                      {j.fields.name} <span className="j-req">*</span>
                    </label>
                    <input
                      id={`${uid}-name`}
                      className="j-input"
                      autoComplete="name"
                      placeholder={j.namePlaceholder}
                      value={answers.name}
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                      onChange={(event) => set("name", event.target.value)}
                    />
                    {errors.name && (
                      <p className="j-error" id={`${uid}-name-err`}>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="j-field">
                    <label className="j-label" htmlFor={`${uid}-email`}>
                      {j.fields.email} <span className="j-req">*</span>
                    </label>
                    <input
                      id={`${uid}-email`}
                      className="j-input"
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
                      <p className="j-error" id={`${uid}-email-err`}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="j-field j-field--half">
                  <label className="j-label" htmlFor={`${uid}-phone`}>
                    {j.fields.phone} <span className="j-optional">— {j.fields.phoneOptional}</span>
                  </label>
                  <input
                    id={`${uid}-phone`}
                    className="j-input"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={j.phonePlaceholder}
                    value={answers.phone}
                    onChange={(event) => set("phone", event.target.value)}
                  />
                </div>

                <div className={`j-consent${errors.consent ? " is-error" : ""}`}>
                  <input
                    id={`${uid}-consent`}
                    type="checkbox"
                    checked={answers.consent}
                    aria-invalid={errors.consent ? "true" : undefined}
                    aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
                    onChange={(event) => set("consent", event.target.checked)}
                    required
                  />
                  <label htmlFor={`${uid}-consent`}>
                    {j.consentBefore}{" "}
                    <a href="/confidentialite/" target="_blank" rel="noreferrer">
                      {j.consentLink}
                    </a>
                    {j.consentAfter}
                  </label>
                </div>
                {errors.consent && (
                  <p className="j-error" id={`${uid}-consent-err`}>
                    {errors.consent}
                  </p>
                )}

                <p className="j-note">{j.requiredNote}</p>
              </div>
            )}
          </div>

          {/* honeypot — unchanged from the previous form */}
          <div className="hp" aria-hidden="true">
            <label htmlFor={`${uid}-company-url`}>Company URL</label>
            <input ref={honeypotRef} id={`${uid}-company-url`} name="company_url" tabIndex={-1} autoComplete="off" />
          </div>

          {status === "error" && (
            <div className="j-alert" role="alert">
              <strong>{j.failureTitle}</strong>
              <p>{j.failureBody}</p>
              <div className="j-actions">
                <button type="button" className="j-btn j-btn--ghost" onClick={() => setStatus("idle")}>
                  {j.retry}
                </button>
                <a className="j-btn j-btn--line" href={mailtoHref}>
                  <MailIcon size={15} /> {j.mailto}
                </a>
              </div>
            </div>
          )}

          <div className="j-footer">
            {step > 0 ? (
              <button
                type="button"
                className="j-btn j-btn--ghost"
                onClick={() => goTo(step - 1, -1)}
                disabled={status === "sending"}
              >
                {j.back}
              </button>
            ) : (
              <span />
            )}

            <div className="j-footer__right">
              {step === 3 && (
                <button type="button" className="j-skip" onClick={() => goTo(4, 1)} disabled={status === "sending"}>
                  {j.skip}
                </button>
              )}
              {step === 4 && (
                <button type="button" className="j-skip" onClick={() => goTo(5, 1)} disabled={status === "sending"}>
                  {j.skip}
                </button>
              )}
              {step < TOTAL_STEPS - 1 ? (
                <button type="button" className="j-btn j-btn--primary" onClick={advance} disabled={status === "sending"}>
                  {j.next}
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" className="j-btn j-btn--primary" disabled={status === "sending"}>
                  {status === "sending" ? j.sending : j.submit}
                  {status !== "sending" && <ArrowRight size={16} />}
                </button>
              )}
            </div>
          </div>

          {touched && Object.keys(errors).length > 0 && (
            <p className="j-note j-note--error" role="status">
              {j.errorHint}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
