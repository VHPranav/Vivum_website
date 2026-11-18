import type { Locale } from "@/i18n/config";
import * as common from "./en/common";
import { home } from "./en/home";
import { consulting } from "./en/consulting";
import { about } from "./en/about";
import { areaPages } from "./en/areas";
import { partnersPage } from "./en/partners";
import { pages, legalPages, contactPage } from "./en/pages";

const en = { ...common, home, consulting, about, areaPages, partnersPage, pages, legalPages, contactPage };

export type Content = typeof en;

// Add `me: meContent` here once src/content/me is translated and human-reviewed.
const content: Record<Locale, Content> = { en };

export function getContent(locale: Locale): Content {
  return content[locale];
}
