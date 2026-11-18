import type { Metadata } from "next";
import { AreaRoute, areaMetadata } from "@/components/area/renderArea";

export async function generateMetadata({ params }: PageProps<"/[lang]/education">): Promise<Metadata> {
  return areaMetadata((await params).lang, "education");
}

export default async function Page({ params }: PageProps<"/[lang]/education">) {
  return <AreaRoute lang={(await params).lang} id="education" />;
}
