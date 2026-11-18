import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { FactsGrid, NetworkWheel, PeopleRow } from "@/components/home/Tresmares";
import { AreaShowcase } from "@/components/home/AreaShowcase";
import { BenefitsScroller } from "@/components/home/Scroll";
import { Partners } from "@/components/home/Partners";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { home } = getContent(lang);
  return { title: { absolute: home.meta.title }, description: home.meta.description, alternates: { canonical: localePath(lang, "/") } };
}

// Follows the Tresmares Capital homepage section for section:
// cloud hero → About statement → figures → services statement → pinned four-area showcase →
// network wheel → people → closing footer. VIVUM additions from the client brief: Why work
// with us and Partners & experience. The routed enquiry form lives on /contact.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const h = c.home;

  return (
    <>
      <Hero locale={lang} hero={h.hero} about={h.about} ui={c.ui} />
      <FactsGrid locale={lang} facts={h.facts} />
      <Statement locale={lang} id="services" label={h.services.label} statement={h.services.statement} />
      <AreaShowcase locale={lang} divisions={c.divisions} />
      <BenefitsScroller label={h.why.label} title={h.why.title} items={h.why.items} />
      <NetworkWheel network={h.network} />
      <PeopleRow people={h.people} />
      <Partners partners={h.partners} />
    </>
  );
}
