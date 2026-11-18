"use server";

import { getContent } from "@/content";
import { isLocale } from "@/i18n/config";
import { formFields, routeFor, type FormKind, type FormState } from "./forms";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Server-side validation for every enquiry form.
 * Delivery is intentionally NOT wired yet: recipient mailboxes are unconfirmed (brief §11).
 * Once VIVUM confirms them, send to contactRoutes[route].email via the chosen provider here,
 * store the minimal lead record, and return an error state if delivery fails.
 */
export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const kind = String(formData.get("_kind")) as FormKind;
  const lang = String(formData.get("_lang"));
  if ((kind !== "general" && kind !== "consulting") || !isLocale(lang)) {
    return { status: "error", errors: { _form: "Something went wrong. Please reload the page and try again." }, values: {} };
  }
  const c = getContent(lang);
  const fields = formFields(kind, c);

  const values: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const raw = String(formData.get(field.name) ?? "").trim();
    values[field.name] = raw.slice(0, field.max);
    if (field.required && !raw) {
      errors[field.name] = `${field.label}: ${c.formCopy.required.toLowerCase()}.`;
      continue;
    }
    if (!raw) continue;
    if (raw.length > field.max) errors[field.name] = `${field.label}: please keep it under ${field.max} characters.`;
    if (field.type === "email" && !EMAIL.test(raw)) errors[field.name] = "Please enter a valid email address.";
    if (field.options && !field.options.some((o) => o.value === raw)) errors[field.name] = `${field.label}: please choose an option.`;
  }

  if (formData.get("consent") !== "yes") errors.consent = "Please confirm you have read the privacy notice.";

  // Spam protection: hidden honeypot field and a minimum fill time.
  const startedAt = Number(formData.get("_t"));
  const tooFast = !Number.isFinite(startedAt) || Date.now() - startedAt < 2500;
  if (String(formData.get("website") ?? "") !== "" || tooFast) {
    errors._form = "We could not accept this submission. Please wait a moment and try again.";
  }

  if (Object.keys(errors).length) return { status: "error", errors, values };

  const route = routeFor(kind, values);
  const summary = fields
    .filter((f) => values[f.name])
    .map((f) => ({ label: f.label, value: f.options?.find((o) => o.value === values[f.name])?.label ?? values[f.name] }));

  return { status: "success", route, summary };
}
