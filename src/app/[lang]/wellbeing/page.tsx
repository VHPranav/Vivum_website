import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { StubPage } from "@/components/StubPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/wellbeing">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getContent(lang).pages.wellbeing;
  return { title: page.label, description: page.lede, alternates: { canonical: localePath(lang, "/wellbeing") } };
}

export default async function Page({ params }: PageProps<"/[lang]/wellbeing">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  return <StubPage c={c} locale={lang} page={c.pages.wellbeing} kind="wellbeing" cta={c.divisions.find((d) => d.id === "wellbeing")?.pageCta} />;
}
