// Form definitions shared by the client form and the server-side validator, so both enforce
// the same fields. One tailored form per area (Sandra, 12 Nov) plus a general form with an area
// selector. No health data or identity documents are collected.

import type { Content } from "@/content";
import type { RouteId } from "./site";

export type FieldType = "text" | "email" | "tel" | "textarea" | "select" | "choice" | "number";

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

export const formKinds = ["general", "wellbeing", "consulting", "workforce", "education"] as const;
export type FormKind = (typeof formKinds)[number];

const opts = (list: string[]) => list.map((s) => ({ value: s, label: s }));

export function formFields(kind: FormKind, c: Content): Field[] {
  const f = c.formCopy;
  const name: Field = { name: "name", label: f.name, type: "text", required: true, autoComplete: "name", max: 120 };
  const email: Field = { name: "email", label: f.email, type: "email", required: true, autoComplete: "email", max: 200 };
  const phone: Field = { name: "phone", label: f.phone, type: "tel", required: false, autoComplete: "tel", max: 40 };
  const country: Field = { name: "country", label: f.country, type: "text", required: false, autoComplete: "country-name", max: 80 };
  const message = (required: boolean, hint?: string): Field => ({ name: "message", label: f.message, type: "textarea", required, max: 2000, wide: true, hint });

  switch (kind) {
    case "general":
      return [
        {
          name: "service",
          label: "Area of interest",
          type: "choice",
          required: true,
          max: 20,
          wide: true,
          options: [...c.divisions.map((d) => ({ value: d.id, label: d.name })), { value: "general", label: "General enquiry" }],
        },
        name,
        email,
        phone,
        country,
        message(true),
      ];
    case "wellbeing":
      return [
        name,
        email,
        phone,
        country,
        { name: "interest", label: "I am interested in", type: "select", required: true, max: 80, options: opts(["A consultation", "Treatments", "A programme", "Not sure yet"]) },
        { name: "dates", label: "Preferred dates", type: "text", required: false, max: 120, hint: "For example: second half of May" },
        message(false, "Please do not share medical details here; we discuss them in the consultation."),
      ];
    case "consulting": {
      const k = c.consulting.form.fields;
      return [
        name,
        email,
        { name: "organisation", label: k.organisation, type: "text", required: true, autoComplete: "organization", max: 160 },
        { name: "role", label: k.role, type: "text", required: false, autoComplete: "organization-title", max: 120 },
        { name: "size", label: k.size, type: "select", required: true, max: 120, options: opts(k.sizes) },
        {
          name: "category",
          label: k.category,
          type: "select",
          required: true,
          max: 120,
          options: [...c.consulting.services.categories.map((s) => ({ value: s.id, label: s.name })), { value: "unsure", label: "Not sure yet" }],
        },
        { name: "challenge", label: k.challenge, type: "textarea", required: true, max: 2000, hint: k.challengeHint, wide: true },
        { name: "timing", label: k.timing, type: "select", required: false, max: 80, options: opts(k.timings) },
        phone,
      ];
    }
    case "workforce":
      return [
        { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization", max: 160 },
        name,
        email,
        phone,
        { name: "roles", label: "Roles needed", type: "text", required: true, max: 300, hint: "For example: 4 cooks, 2 housekeeping staff" },
        { name: "headcount", label: "Number of employees required", type: "number", required: true, max: 6 },
        { name: "location", label: "Work location", type: "text", required: true, max: 120 },
        { name: "timing", label: "Expected start", type: "select", required: true, max: 80, options: opts(["Within 1 month", "1–3 months", "3–6 months", "Later / planning ahead"]) },
        message(false),
      ];
    case "education":
      return [
        name,
        email,
        phone,
        { ...country, required: true },
        { name: "level", label: "Study level", type: "select", required: true, max: 80, options: opts(["Bachelor’s", "Master’s", "Doctoral", "Not sure yet"]) },
        { name: "programme", label: "Programme of interest", type: "text", required: false, max: 160 },
        { name: "intake", label: "Preferred intake", type: "text", required: false, max: 80, hint: "For example: October 2027" },
        message(false),
      ];
  }
}

/** Which team receives the enquiry. */
export function routeFor(kind: FormKind, values: Record<string, string>): RouteId {
  if (kind !== "general") return kind;
  const s = values.service;
  return s === "wellbeing" || s === "education" || s === "workforce" || s === "consulting" ? s : "general";
}

export type FormState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string>; values: Record<string, string> }
  | { status: "success"; route: RouteId; summary: { label: string; value: string }[]; preview: boolean; reference?: string };
