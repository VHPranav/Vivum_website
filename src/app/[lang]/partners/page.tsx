import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { PartnersPage } from "@/components/partners/PartnersPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/partners">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const c = getContent(lang);
  return { title: c.pages.partners.label, description: c.partnersPage.lede, alternates: { canonical: localePath(lang, "/partners") } };
}

// After the Tresmares Capital Portfolio page.
export default async function Page({ params }: PageProps<"/[lang]/partners">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  return <PartnersPage p={c.partnersPage} divisions={c.divisions} locale={lang} />;
}
