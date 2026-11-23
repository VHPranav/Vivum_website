import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { NetworkWheel } from "@/components/home/Tresmares";
import { AreaShowcase } from "@/components/home/AreaShowcase";
import { BenefitsScroller } from "@/components/home/Scroll";
import { Partners } from "@/components/home/Partners";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { ContactSection } from "@/components/forms/ContactSection";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { home } = getContent(lang);
  return { title: { absolute: home.meta.title }, description: home.meta.description, alternates: { canonical: localePath(lang, "/") } };
}

// Keep one services showcase and a routed enquiry form at the close.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const h = c.home;

  return (
    <>
      <Hero locale={lang} hero={h.hero} about={h.about} ui={c.ui} compactIntro />
      <Statement locale={lang} id="services" label={h.services.label} statement={h.services.statement} />
      <AreaShowcase locale={lang} divisions={c.divisions} />
      <BenefitsScroller label={h.why.label} title={h.why.title} items={h.why.items} />
      <NetworkWheel network={h.network} />
      <Partners partners={h.partners} />
      <UpcomingEvents locale={lang} />
      <ContactSection c={c} locale={lang} head={{ label: "Contact VIVUM", title: "What’s your next step?", lede: "Choose an area and tell us what you need." }} />
    </>
  );
}
