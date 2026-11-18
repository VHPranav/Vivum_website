import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { Hero } from "@/components/home/Hero";
import { DivisionCards } from "@/components/home/DivisionCards";
import { HowWeWork, Network, Partners, Team, WhyVivum } from "@/components/home/Sections";
import { ContactSection } from "@/components/forms/ContactSection";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { home } = getContent(lang);
  return { title: { absolute: home.meta.title }, description: home.meta.description, alternates: { canonical: localePath(lang, "/") } };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const h = c.home;

  return (
    <>
      <Hero hero={h.hero} />
      <DivisionCards locale={lang} divisions={c.divisions} intro={h.divisions} />
      <WhyVivum why={h.why} />
      <HowWeWork how={h.how} />
      <Network locale={lang} network={h.network} />
      <Partners partners={h.partners} />
      <Team team={h.team} />
      <ContactSection c={c} locale={lang} head={h.contact} />
    </>
  );
}
