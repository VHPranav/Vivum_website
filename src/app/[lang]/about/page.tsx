import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { StubPage } from "@/components/StubPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getContent(lang).pages.about;
  return { title: page.title, description: page.lede, alternates: { canonical: localePath(lang, "/about") } };
}

export default async function Page({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  return <StubPage c={c} locale={lang} page={c.pages.about} service="general" submitLabel="Send enquiry" />;
}
