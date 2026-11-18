"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { submitEnquiry } from "@/lib/enquiry";
import type { Field as FormField, FormKind, FormState } from "@/lib/forms";
import type { RouteId } from "@/lib/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { Arrow } from "@/components/ui/Kit";

type Area = { id: string; name: string; description: string };
const ease = [0.22, 1, 0.36, 1] as const;
const initial: FormState = { status: "idle" };

const line =
  "w-full min-w-0 border-0 border-b border-ink/20 bg-transparent px-0 pt-3 pb-3 text-[1.25rem] leading-snug font-normal tracking-[-0.02em] text-navy placeholder:text-ink/25 transition-colors focus:border-navy focus:outline-none md:text-[1.5rem]";

/**
 * Three-step enquiry in the site's own language (open spacing, quiet labels, no boxes):
 * 01 choose the area → 02 your details → 03 your message. Every field stays mounted so the
 * server action receives the full form; each step is checked before moving on.
 */
export function StepForm({
  locale,
  areas,
  copy,
  routes,
  reviewMode,
  defaultArea,
  fieldsByArea,
}: {
  locale: Locale;
  areas: Area[];
  copy: Content["formCopy"];
  routes: Record<RouteId, { team: string; email: string; verified: boolean }>;
  reviewMode: boolean;
  defaultArea?: string;
  fieldsByArea: Record<FormKind, FormField[]>;
}) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const form = useRef<HTMLFormElement>(null);
  const startedAt = useRef<HTMLInputElement>(null);
  const [area, setArea] = useState(defaultArea ?? "");
  const [step, setStep] = useState(defaultArea ? 1 : 0);
  const [local, setLocal] = useState<Record<string, string>>({});

  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  const serverErrors = state.status === "error" ? state.errors : {};
  const errors = { ...serverErrors, ...local };
  const routeId = (["wellbeing", "education", "workforce", "consulting"].includes(area) ? area : "general") as RouteId;
  const route = routes[routeId];
  const kind = routeId as FormKind;
  const fields = fieldsByArea[kind];
  const detailFields = fields.filter((f) => f.type !== "textarea" && f.name !== "service");
  const messageField = fields.find((f) => f.type === "textarea")!;
  const steps = ["Area", "Your details", "Your message"];

  // Jump back to the step holding a server-side error.
  useEffect(() => {
    if (state.status !== "error") return;
    const e = state.errors;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to the server's answer
    setStep(e.service ? 0 : fieldsByArea[kind].some((f) => f.type !== "textarea" && e[f.name]) ? 1 : 2);
  }, [state, fieldsByArea, kind]);

  const check = (names: string[]) => {
    const f = form.current!;
    const next: Record<string, string> = {};
    for (const n of names) {
      const el = f.elements.namedItem(n) as HTMLInputElement | null;
      if (n === "service" && !area) next.service = "Please choose an area.";
      else if (el && !el.checkValidity()) next[n] = el.type === "email" && el.value ? "Please enter a valid email address." : "This field is required.";
    }
    setLocal(next);
    return Object.keys(next).length === 0;
  };

  const go = (to: number) => {
    if (to > step && !check(step === 0 ? ["service"] : detailFields.map((f) => f.name))) return;
    setLocal({});
    setStep(to);
  };

  if (state.status === "success") {
    const r = routes[state.route];
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} role="status" aria-live="polite">
        <p className="text-[0.75rem] text-ink/50">{copy.routedTo}: {r.team}</p>
        <h3 className="mt-4 text-[clamp(2.25rem,1rem+3vw,4rem)] leading-[0.95] font-medium tracking-[-0.03em] text-navy">{state.preview ? "Preview complete — enquiry not sent." : copy.successTitle}</h3>
        <p className="mt-6 max-w-md text-[1.05rem] leading-snug text-ink/80">{state.preview ? "Your form has been checked. Delivery is not connected in this review build; no enquiry has been sent or stored." : copy.successBody}</p>
        {state.reference && <p className="mt-4 text-sm text-muted">Reference: {state.reference}</p>}
        <dl className="mt-10 max-w-xl">
          {state.summary.map((s) => (
            <div key={s.label} className="grid gap-1 py-3 sm:grid-cols-3">
              <dt className="text-[0.7rem] font-bold tracking-[0.02em] text-ink uppercase">{s.label}</dt>
              <dd className="text-[0.85rem] break-words text-ink/80 sm:col-span-2">{s.value}</dd>
            </div>
          ))}
        </dl>
        {state.preview && <p className="mt-6 max-w-xl bg-[#f7efd6] px-4 py-3 text-xs leading-relaxed text-[#6b5413]">{copy.previewNote}</p>}
      </motion.div>
    );
  }

  const err = (n: string) =>
    errors[n] ? (
      <p id={`${n}-error`} className="mt-2 text-[0.75rem] text-red-700">
        {errors[n]}
      </p>
    ) : null;

  return (
    <form
      ref={form}
      action={action}
      onSubmit={(e) => {
        e.preventDefault();
        if (!check([messageField.name, "consent"])) return;
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      noValidate
      className="relative"
    >
      <input type="hidden" name="_kind" value={kind} />
      <input type="hidden" name="_lang" value={locale} />
      <input type="hidden" name="_t" ref={startedAt} defaultValue="0" />
      <input type="hidden" name="service" value={area} />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Progress */}
      <ol className="grid grid-cols-3 gap-3" aria-label="Steps">
        {steps.map((s, i) => (
          <li key={s}>
            <button type="button" onClick={() => i < step && go(i)} disabled={i > step} aria-current={i === step ? "step" : undefined} className="block w-full text-left disabled:cursor-default">
              <span className={`flex items-center gap-2.5 text-xs transition-colors ${i === step ? "text-navy" : i < step ? "text-green-deep" : "text-ink/30"}`}>
                <span className="text-[0.65rem] tabular-nums">{i < step ? "✓" : `0${i + 1}`}</span>
                <span className={i === step ? "font-semibold" : "font-normal"}>{s}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      {state.status === "error" && serverErrors._form && (
        <p role="alert" className="mt-8 text-[0.85rem] text-red-700">
          {serverErrors._form}
        </p>
      )}

      <div className="relative mt-10 min-h-[22rem] md:mt-14">
        {/* 01 Area */}
        <Step show={step === 0}>
          <fieldset aria-describedby={errors.service ? "service-error" : undefined}>
            <legend className="text-[0.75rem] text-ink/50">What would you like to talk about?</legend>
            <ul className="mt-5 space-y-1">
              {[...areas, { id: "general", name: "General enquiry", description: "Anything else, or not sure yet." }].map((a, i) => {
                const on = area === a.id;
                return (
                  <li key={a.id}>
                    <label className={`group flex cursor-pointer items-center gap-4 py-5 transition-colors has-[:focus-visible]:bg-paper ${on ? "text-navy" : "text-ink"}`}>
                      <input
                        type="radio"
                        name="_area"
                        value={a.id}
                        checked={on}
                        onChange={() => {
                          setArea(a.id);
                          setLocal({});
                        }}
                        className="sr-only"
                      />
                      <span className="w-5 shrink-0 self-start pt-1 text-[0.65rem] text-ink/35">0{i + 1}</span>
                      <span className="flex-1">
                        <span className="block text-[clamp(1.2rem,0.85rem+1vw,1.75rem)] leading-tight font-medium tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-calm)] group-hover:translate-x-2">
                          {a.name}
                        </span>
                        <span className="mt-2 block max-w-[40ch] text-sm leading-relaxed text-ink/50">{a.description}</span>
                      </span>
                      <span aria-hidden className={`flex h-9 w-9 shrink-0 items-center justify-center transition-all ${on ? "text-green-deep" : "text-ink/30 group-hover:translate-x-1 group-hover:text-navy"}`}>
                        <Arrow className="h-2 w-3.5" />
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            {err("service")}
          </fieldset>
          <div className="mt-8 flex justify-end">
            <button type="button" onClick={() => go(1)} className="group inline-flex min-h-12 items-center gap-5 rounded-full bg-navy px-7 text-sm font-medium text-white transition-colors hover:bg-navy-ink">
              Continue <Arrow className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Step>

        {/* 02 Details */}
        <Step show={step === 1}>
          <h3 className="mb-3 text-2xl font-normal tracking-[-0.025em] text-navy md:text-3xl">A little about you.</h3>
          <p className="text-[0.75rem] text-ink/50">
            {copy.routedTo}: <span className="text-navy">{route.team}</span>
          </p>
          <div className="mt-8 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {detailFields.map((f) => (
              <Field key={f.name} label={`${f.label}${f.required ? " *" : ` (${copy.optional})`}`} name={f.name} error={err(f.name)}>
                {f.type === "select" ? (
                  <select id={`f-${f.name}`} name={f.name} required={f.required} defaultValue="" className={`${line} min-w-0 text-base md:text-lg`} aria-invalid={!!errors[f.name]}>
                    <option value="" disabled>Select…</option>
                    {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <input id={`f-${f.name}`} name={f.name} type={f.type === "number" ? "text" : f.type} inputMode={f.type === "number" ? "numeric" : undefined} pattern={f.type === "number" ? "[1-9][0-9]{0,4}" : undefined} required={f.required} maxLength={f.max} autoComplete={f.autoComplete} placeholder={f.name === "name" ? "Your full name" : f.name === "email" ? "you@example.com" : f.name === "phone" ? "+382 …" : f.label} className={line} aria-invalid={!!errors[f.name]} aria-describedby={f.hint ? `f-${f.name}-hint` : undefined} />
                )}
                {f.hint && <p id={`f-${f.name}-hint`} className="mt-1 text-xs leading-relaxed text-muted">{f.hint}</p>}
              </Field>
            ))}
          </div>
          <Nav onBack={() => go(0)} onNext={() => go(2)} />
        </Step>

        {/* 03 Message */}
        <Step show={step === 2}>
          <Field label={`${messageField.label}${messageField.required ? " *" : ` (${copy.optional})`}`} name={messageField.name} error={err(messageField.name)}>
            <textarea key={messageField.name} id={`f-${messageField.name}`} name={messageField.name} required={messageField.required} maxLength={messageField.max} rows={4} placeholder={messageField.hint ?? "Tell us a little about what you need…"} className={`${line} resize-y`} aria-invalid={!!errors[messageField.name]} />
          </Field>
          <label className="mt-8 flex max-w-xl items-start gap-3 text-[0.8rem] leading-relaxed text-ink/60">
            <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 shrink-0 accent-navy" aria-invalid={!!errors.consent} />
            <span>
              {copy.consent}{" "}
              <Link href={localePath(locale, "/privacy")} className="text-navy underline underline-offset-2">
                {copy.privacyLink}
              </Link>
              .
            </span>
          </label>
          {err("consent")}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <button type="button" onClick={() => go(1)} className="link-u text-[0.85rem] text-ink">
              Back
            </button>
            <div className="flex items-center gap-6">
              {reviewMode && !route.verified && <span className="hidden max-w-40 text-[0.65rem] leading-relaxed text-ink/40 xl:block">Proposed inbox {route.email}</span>}
              <button type="submit" disabled={pending} className="group inline-flex min-h-12 items-center gap-5 rounded-full bg-navy px-7 text-sm font-medium text-white transition-colors hover:bg-navy-ink disabled:opacity-60">
                {pending ? copy.sending : "Send enquiry"}
                <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </Step>
      </div>
    </form>
  );
}

/** Keeps every step mounted (so the form posts all fields) and fades the active one in. */
function Step({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.6, ease }}
      className={show ? "relative" : "pointer-events-none absolute inset-x-0 top-0 invisible"}
      aria-hidden={!show}
      inert={!show}
    >
      {children}
    </motion.div>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="block text-[0.65rem] font-medium tracking-[0.08em] text-ink/45 uppercase">
        {label}
      </label>
      {children}
      {error}
    </div>
  );
}

function Nav({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mt-12 flex items-center justify-between">
      <button type="button" onClick={onBack} className="link-u text-[0.85rem] text-ink">
        Back
      </button>
      <button type="button" onClick={onNext} className="group inline-flex min-h-12 items-center gap-5 rounded-full bg-navy px-7 text-sm font-medium text-white transition-colors hover:bg-navy-ink">
        Continue
        <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
      </button>
    </div>
  );
}
