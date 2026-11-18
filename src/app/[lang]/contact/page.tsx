import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { ContactSection } from "@/components/forms/ContactSection";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { contactPage } = getContent(lang);
  return { title: contactPage.title, description: contactPage.lede, alternates: { canonical: localePath(lang, "/contact") } };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  return (
    <div className="bg-gradient-to-b from-sky/60 to-paper pt-12 md:pt-16">
      <ContactSection c={c} locale={lang} head={c.contactPage} as="h1" />
    </div>
  );
}
