import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import type { DivisionId } from "@/content/en/common";
import { AreaDetail } from "./AreaDetail";

export function areaMetadata(lang: string, id: DivisionId): Metadata {
  if (!isLocale(lang)) return {};
  const c = getContent(lang);
  const d = c.divisions.find((x) => x.id === id)!;
  return { title: d.name, description: c.areaPages[id].lede, alternates: { canonical: localePath(lang, d.href) } };
}

export function AreaRoute({ lang, id }: { lang: string; id: DivisionId }) {
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const others = c.divisions
    .filter((d) => d.id !== id)
    .map((d) => ({ id: d.id, href: d.href, title: c.areaPages[d.id].title, lede: d.description, facts: c.areaPages[d.id].facts }));
  return <AreaDetail page={c.areaPages[id]} others={others} locale={lang} otherLabel="Other areas" />;
}
