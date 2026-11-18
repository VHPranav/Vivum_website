import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { StubPage } from "@/components/StubPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/education">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getContent(lang).pages.education;
  return { title: page.title, description: page.lede, alternates: { canonical: localePath(lang, "/education") } };
}

export default async function Page({ params }: PageProps<"/[lang]/education">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  return <StubPage c={c} locale={lang} page={c.pages.education} service="education" submitLabel="Request student guidance" />;
}
