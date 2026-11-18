// Locale setup. English is live and served at clean URLs (/consulting); the proxy rewrites
// them to /en/… internally. Montenegrin ("me") is planned: add it to `locales`, add
// src/content/me, and it will be served under /me/… automatically.

export const locales = ["en"] as const;
export const plannedLocales = ["me"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

export const localeLabels: Record<string, { short: string; name: string; htmlLang: string }> = {
  en: { short: "EN", name: "English", htmlLang: "en" },
  me: { short: "ME", name: "Crnogorski", htmlLang: "sr-Latn-ME" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Public URL for a path in a locale. The default locale has no prefix. */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}
