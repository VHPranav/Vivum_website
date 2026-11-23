import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { Partner, ScrollStatements, Values } from "@/components/about/About";
import { Hero } from "@/components/home/Hero";
import { FactsGrid, PeopleRow } from "@/components/home/Tresmares";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { about } = getContent(lang);
  return { title: about.meta.title, description: about.meta.description, alternates: { canonical: localePath(lang, "/about") } };
}

// Company introduction → team → company figures → values → partner → video statements.
export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const { about } = c;
  return (
    <>
      <Hero locale={lang} hero={about.hero} about={about.intro} ui={c.ui} image={about.heroImage} statementId="who-we-are" wash />
      <PeopleRow people={c.home.people} />
      <FactsGrid locale={lang} facts={{ ...c.home.facts, body: about.factsIntro, link: { label: "Explore our services", href: "/#services" } }} />
      <Values values={about.values} />
      <Partner partner={about.partner} />
      <ScrollStatements scroll={about.scroll} />
    </>
  );
}
