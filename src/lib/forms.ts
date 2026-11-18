// Form definitions shared by the client form and the server-side validator, so both enforce
// the same fields. Fields follow master brief v2.0 §11 / Appendix G (no health data, no IDs).

import type { Content } from "@/content";
import type { RouteId } from "./site";

export type FieldType = "text" | "email" | "tel" | "textarea" | "select" | "choice";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: { value: string; label: string; hint?: string }[];
  autoComplete?: string;
  hint?: string;
  max: number;
  /** Layout: span both columns on wide screens. */
  wide?: boolean;
};

export type FormKind = "general" | "consulting";

export function formFields(kind: FormKind, c: Content): Field[] {
  const f = c.formCopy;
  const base = {
    name: { name: "name", label: f.name, type: "text", required: true, autoComplete: "name", max: 120 },
    email: { name: "email", label: f.email, type: "email", required: true, autoComplete: "email", max: 200 },
    phone: { name: "phone", label: f.phone, type: "tel", required: false, autoComplete: "tel", max: 40 },
  } satisfies Record<string, Field>;

  if (kind === "general") {
    return [
      {
        name: "service",
        label: "Service",
        type: "choice",
        required: true,
        max: 20,
        wide: true,
        options: [
          ...c.divisions.map((d) => ({ value: d.id, label: d.name, hint: d.conversion })),
          { value: "general", label: "General enquiry", hint: "Anything else" },
        ],
      },
      base.name,
      base.email,
      base.phone,
      { name: "country", label: f.country, type: "text", required: false, autoComplete: "country-name", max: 80 },
      { name: "message", label: f.message, type: "textarea", required: true, max: 2000, wide: true },
    ];
  }

  const k = c.consulting.form.fields;
  return [
    base.name,
    base.email,
    { name: "organisation", label: k.organisation, type: "text", required: true, autoComplete: "organization", max: 160 },
    { name: "role", label: k.role, type: "text", required: false, autoComplete: "organization-title", max: 120 },
    { name: "size", label: k.size, type: "select", required: true, max: 120, options: k.sizes.map((s) => ({ value: s, label: s })) },
    {
      name: "category",
      label: k.category,
      type: "select",
      required: true,
      max: 120,
      options: [...c.consulting.services.categories.map((s) => ({ value: s.id, label: s.name })), { value: "unsure", label: "Not sure yet" }],
    },
    { name: "challenge", label: k.challenge, type: "textarea", required: true, max: 2000, hint: k.challengeHint, wide: true },
    { name: "timing", label: k.timing, type: "select", required: false, max: 80, options: k.timings.map((s) => ({ value: s, label: s })) },
    base.phone,
  ];
}

/** Which team receives the enquiry. */
export function routeFor(kind: FormKind, values: Record<string, string>): RouteId {
  if (kind === "consulting") return "consulting";
  const s = values.service;
  return s === "wellbeing" || s === "education" || s === "workforce" || s === "consulting" ? s : "general";
}

export type FormState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string>; values: Record<string, string> }
  | { status: "success"; route: RouteId; summary: { label: string; value: string }[] };
