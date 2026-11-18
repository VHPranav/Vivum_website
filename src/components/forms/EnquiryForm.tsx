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
  "w-full rounded-xl border bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/60 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-azure/25";

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
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.75rem] border border-line bg-white p-6 md:p-10" role="status" aria-live="polite">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-green-deep" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 className="mt-5 font-serif text-2xl font-light text-navy md:text-3xl">{copy.successTitle}</h3>
        <p className="mt-3 text-muted">{copy.successBody}</p>
        <p className="mt-4 text-sm text-ink">
          {copy.routedTo}: <strong className="font-medium">{r.team}</strong>
        </p>
        <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
          {state.summary.map((s) => (
            <div key={s.label} className="grid gap-1 py-3 sm:grid-cols-3">
              <dt className="text-muted">{s.label}</dt>
              <dd className="break-words text-ink sm:col-span-2">{s.value}</dd>
            </div>
          ))}
        </dl>
        {reviewMode && <p className="mt-5 rounded-xl bg-[#f7efd6] px-4 py-3 text-xs leading-relaxed text-[#6b5413]">{copy.previewNote}</p>}
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
      className="relative rounded-[1.75rem] border border-line bg-white p-5 sm:p-8 md:p-10">
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
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {errors._form ?? copy.errorSummary}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="grid gap-x-5 gap-y-6 md:grid-cols-2">
        {fields.map((f) => {
          const err = errors[f.name];
          const border = err ? "border-red-400" : "border-line";
          const label = (
            <>
              {f.label}
              {f.required ? <span className="text-red-700" aria-hidden> *</span> : <span className="font-normal text-muted"> ({copy.optional})</span>}
            </>
          );
          return (
            <div key={f.name} className={f.wide ? "md:col-span-2" : ""}>
              {f.type === "choice" ? (
                <fieldset aria-describedby={describe(f)}>
                  <legend className="mb-3 text-sm font-medium text-ink">{label}</legend>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {f.options!.map((o) => {
                      const checked = (service || values[f.name]) === o.value;
                      return (
                        <label
                          key={o.value}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-azure/40 ${
                            checked ? "border-navy bg-sky/60" : `${border} bg-white hover:border-navy/40`
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
                            <span className="block text-sm text-ink">{o.label}</span>
                            {o.hint && <span className="block text-xs text-muted">{o.hint}</span>}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ) : (
                <>
                  <label htmlFor={`${kind}-${f.name}`} className="mb-2 block text-sm font-medium text-ink">
                    {label}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      id={`${kind}-${f.name}`}
                      name={f.name}
                      rows={5}
                      maxLength={f.max}
                      required={f.required}
                      defaultValue={values[f.name]}
                      aria-invalid={!!err}
                      aria-describedby={describe(f)}
                      className={`${inputBase} ${border} resize-y`}
                    />
                  ) : f.type === "select" ? (
                    <select
                      id={`${kind}-${f.name}`}
                      name={f.name}
                      required={f.required}
                      defaultValue={values[f.name] ?? ""}
                      aria-invalid={!!err}
                      aria-describedby={describe(f)}
                      className={`${inputBase} ${border} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 8%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%230d3b7a%22 stroke-width=%221.4%22/></svg>')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10`}
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
                      defaultValue={values[f.name]}
                      aria-invalid={!!err}
                      aria-describedby={describe(f)}
                      className={`${inputBase} ${border}`}
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

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted" aria-live="polite">
          {copy.routedTo}: <span className="font-medium text-ink">{route.team}</span>
          {reviewMode && !route.verified && <span className="block text-[#6b5413]">Proposed inbox {route.email}, not yet confirmed</span>}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-navy px-7 py-3 text-[0.8125rem] font-medium tracking-wide text-white transition-colors hover:bg-navy-deep disabled:opacity-60"
        >
          {pending ? copy.sending : submitLabel}
          <Arrow />
        </button>
      </div>
    </form>
  );
}
