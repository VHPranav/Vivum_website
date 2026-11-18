import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { StubPage } from "@/components/StubPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/workforce">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getContent(lang).pages.workforce;
  return { title: page.title, description: page.lede, alternates: { canonical: localePath(lang, "/workforce") } };
}

export default async function Page({ params }: PageProps<"/[lang]/workforce">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  return <StubPage c={c} locale={lang} page={c.pages.workforce} service="workforce" submitLabel="Request employer quotation" />;
}
