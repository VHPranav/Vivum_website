import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { Journey, Partner, ScrollStatements, Values } from "@/components/about/About";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { about } = getContent(lang);
  return { title: about.meta.title, description: about.meta.description, alternates: { canonical: localePath(lang, "/about") } };
}

// Mirrors the Tresmares Capital About page: journey → values → partner → pinned statements.
export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { about } = getContent(lang);
  return (
    <>
      <Journey journey={about.journey} />
      <Values values={about.values} />
      <Partner partner={about.partner} />
      <ScrollStatements scroll={about.scroll} />
    </>
  );
}
