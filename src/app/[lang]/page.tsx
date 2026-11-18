import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { Hero } from "@/components/home/Hero";
import { AreaCards } from "@/components/home/AreaCards";
import { Statement } from "@/components/home/Statement";
import { AreaShowcase } from "@/components/home/AreaShowcase";
import { BenefitsScroller, ProcessFlow } from "@/components/home/Scroll";
import { PathTabs } from "@/components/home/PathTabs";
import { Partners } from "@/components/home/Partners";
import { ContactSection } from "@/components/forms/ContactSection";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { home } = getContent(lang);
  return { title: { absolute: home.meta.title }, description: home.meta.description, alternates: { canonical: localePath(lang, "/") } };
}

// Order: opening → four areas → About → Our services (pinned showcase) → Why work with us →
// How we work → Find your path → Partners & experience → Contact.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const h = c.home;

  return (
    <>
      <Hero hero={h.hero} ui={c.ui} />
      <AreaCards locale={lang} divisions={c.divisions} label={h.areas.label} />
      <Statement locale={lang} id="about" label={h.about.label} statement={h.about.statement} body={h.about.body} link={h.about.link} facts={h.about.facts} />
      <Statement locale={lang} id="services" label={h.services.label} statement={h.services.statement} />
      <AreaShowcase locale={lang} divisions={c.divisions} />
      <BenefitsScroller label={h.why.label} title={h.why.title} items={h.why.items} />
      <ProcessFlow label={h.how.label} title={h.how.title} steps={h.how.steps} tone="dark" />
      <PathTabs locale={lang} paths={h.paths} divisions={c.divisions} />
      <Partners partners={h.partners} />
      <ContactSection c={c} locale={lang} head={h.contact} marquee={h.contact.marquee} />
    </>
  );
}
