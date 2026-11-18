"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { submitEnquiry } from "@/lib/enquiry";
import type { Field, FormKind, FormState } from "@/lib/forms";
import type { RouteId } from "@/lib/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { Arrow } from "@/components/ui/Kit";

type Props = {
  kind: FormKind;
  locale: Locale;
  fields: Field[];
  copy: Content["formCopy"];
  submitLabel: string;
  routes: Record<RouteId, { team: string; email: string; verified: boolean }>;
  reviewMode: boolean;
  defaultService?: string;
};

const initial: FormState = { status: "idle" };

const inputBase =
  "w-full min-w-0 border-0 border-b border-ink/20 bg-transparent px-0 pt-3 pb-3 text-lg leading-snug tracking-[-0.02em] text-navy placeholder:text-ink/25 transition-colors focus:border-navy focus:outline-none md:text-xl";

export function EnquiryForm({ kind, locale, fields, copy, submitLabel, routes, reviewMode, defaultService }: Props) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const startedAt = useRef<HTMLInputElement>(null);
  const [service, setService] = useState(defaultService ?? "");

  // Anti-spam: record when the form was first shown (the server rejects instant submissions).
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};
  const routeId: RouteId = kind !== "general" ? kind : ((["wellbeing", "education", "workforce", "consulting"].includes(service) ? service : "general") as RouteId);
  const route = routes[routeId];

  if (state.status === "success") {
    const r = routes[state.route];
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-4" role="status" aria-live="polite">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 className="mt-5 font-serif text-2xl font-light text-navy md:text-3xl">{state.preview ? "Preview complete — enquiry not sent." : copy.successTitle}</h3>
        <p className="mt-3 text-muted">{state.preview ? "Your form has been checked. Delivery is not connected in this review build; no enquiry has been sent or stored." : copy.successBody}</p>
        <p className="mt-4 text-sm text-ink">
          {copy.routedTo}: <strong className="font-medium">{r.team}</strong>
        </p>
        {state.reference && <p className="mt-4 text-sm text-muted">Reference: {state.reference}</p>}
        <dl className="mt-6 text-sm">
          {state.summary.map((s) => (
            <div key={s.label} className="grid gap-1 py-3 sm:grid-cols-3">
              <dt className="text-muted">{s.label}</dt>
              <dd className="break-words text-ink sm:col-span-2">{s.value}</dd>
            </div>
          ))}
        </dl>
        {state.preview && <p className="mt-5 rounded-xl bg-white px-4 py-3 text-xs leading-relaxed text-navy/70">{copy.previewNote}</p>}
      </motion.div>
    );
  }

  const describe = (f: Field) => [f.hint && `${f.name}-hint`, errors[f.name] && `${f.name}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <form
      action={action}
      // Submit manually so React does not auto-reset the form: after a validation error the
      // visitor's selections and consent stay as they were. (`action` remains for no-JS.)
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      noValidate
      className="relative">
      <input type="hidden" name="_kind" value={kind} />
      <input type="hidden" name="_lang" value={locale} />
      <input type="hidden" name="_t" ref={startedAt} defaultValue="0" />
      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <AnimatePresence>
        {state.status === "error" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="alert" className="mb-6 text-sm text-red-700">
            {errors._form ?? copy.errorSummary}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
        {fields.map((f) => {
          const err = errors[f.name];
          const fieldTone = err ? "text-red-700" : "";
          const label = (
            <>
              {f.label}
              {f.required ? <span className="text-navy" aria-hidden> *</span> : <span className="font-normal text-muted"> ({copy.optional})</span>}
            </>
          );
          return (
            <div key={f.name} className={f.wide ? "md:col-span-2" : ""}>
              {f.type === "choice" ? (
                <fieldset aria-describedby={describe(f)}>
                  <legend className="mb-3 text-[0.65rem] font-medium tracking-[0.08em] text-ink/45 uppercase">{label}</legend>
                  <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {f.options!.map((o) => {
                      const checked = (service || values[f.name]) === o.value;
                      return (
                        <label
                          key={o.value}
                          className={`flex cursor-pointer items-start gap-3 py-3 transition-colors has-[:focus-visible]:bg-white ${
                            checked ? "text-navy" : "text-muted hover:text-navy"
                          }`}
                        >
                          <input
                            type="radio"
                            name={f.name}
                            value={o.value}
                            checked={checked}
                            onChange={() => setService(o.value)}
                            className="mt-1 accent-navy"
                            required={f.required}
                          />
                          <span>
                            <span className="block text-base leading-snug">{o.label}</span>
                            {o.hint && <span className="block text-xs text-muted">{o.hint}</span>}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ) : (
                <>
                  <label htmlFor={`${kind}-${f.name}`} className="mb-1 block text-[0.65rem] font-medium tracking-[0.08em] text-ink/45 uppercase">
                    {label}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      id={`${kind}-${f.name}`}
                      name={f.name}
                      placeholder="Tell us a little about what you need…"
                      rows={4}
                      maxLength={f.max}
                      required={f.required}
                      defaultValue={values[f.name]}
                      aria-invalid={!!err}
                      aria-describedby={describe(f)}
                      className={`${inputBase} ${fieldTone} resize-y`}
                    />
                  ) : f.type === "select" ? (
                    <select
                      id={`${kind}-${f.name}`}
                      name={f.name}
                      required={f.required}
                      defaultValue={values[f.name] ?? ""}
                      aria-invalid={!!err}
                      aria-describedby={describe(f)}
                      className={`${inputBase} ${fieldTone} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 8%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%230d3b7a%22 stroke-width=%221.4%22/></svg>')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {f.options!.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`${kind}-${f.name}`}
                      name={f.name}
                      type={f.type === "number" ? "text" : f.type}
                      inputMode={f.type === "number" ? "numeric" : undefined}
                      maxLength={f.max}
                      required={f.required}
                      autoComplete={f.autoComplete}
                      placeholder={f.type === "email" ? "you@example.com" : f.label}
                      defaultValue={values[f.name]}
                      aria-invalid={!!err}
                      aria-describedby={describe(f)}
                      className={`${inputBase} ${fieldTone}`}
                    />
                  )}
                </>
              )}
              {f.hint && (
                <p id={`${f.name}-hint`} className="mt-1.5 text-xs text-muted">
                  {f.hint}
                </p>
              )}
              {err && (
                <p id={`${f.name}-error`} className="mt-1.5 text-xs text-red-700">
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-7">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 shrink-0 accent-navy" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} />
          <span>
            {copy.consent}{" "}
            <Link href={localePath(locale, "/privacy")} className="text-navy underline underline-offset-2">
              {copy.privacyLink}
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 ml-7 text-xs text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted" aria-live="polite">
          {copy.routedTo}: <span className="font-medium text-ink">{route.team}</span>
          {reviewMode && !route.verified && <span className="block text-navy/70">Proposed inbox {route.email}, not yet confirmed</span>}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-full bg-navy px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
        >
          {pending ? copy.sending : submitLabel}
          <Arrow />
        </button>
      </div>
    </form>
  );
}
