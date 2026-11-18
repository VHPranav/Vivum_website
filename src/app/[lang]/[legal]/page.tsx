import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getContent } from "@/content";
import { ApprovalFlag } from "@/components/ui/Kit";

const slugs = ["privacy", "terms", "cookies"] as const;
type Slug = (typeof slugs)[number];
const isSlug = (s: string): s is Slug => (slugs as readonly string[]).includes(s);

export const dynamicParams = false;
export function generateStaticParams() {
  return slugs.map((legal) => ({ legal }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[legal]">): Promise<Metadata> {
  const { lang, legal } = await params;
  if (!isLocale(lang) || !isSlug(legal)) return {};
  return { title: getContent(lang).legalPages[legal].title, robots: { index: false } };
}

export default async function LegalPage({ params }: PageProps<"/[lang]/[legal]">) {
  const { lang, legal } = await params;
  if (!isLocale(lang) || !isSlug(legal)) notFound();
  const page = getContent(lang).legalPages[legal];
  return (
    <section className="container-page pt-36 pb-24 md:pt-48 md:pb-32">
      <h1 className="heading-display text-navy">{page.title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{page.body}</p>
      <ApprovalFlag className="mt-6">legal text to be supplied and reviewed by VIVUM</ApprovalFlag>
    </section>
  );
}
