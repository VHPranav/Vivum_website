import type { Metadata } from "next";
import { AreaRoute, areaMetadata } from "@/components/area/renderArea";

export async function generateMetadata({ params }: PageProps<"/[lang]/wellbeing">): Promise<Metadata> {
  return areaMetadata((await params).lang, "wellbeing");
}

export default async function Page({ params }: PageProps<"/[lang]/wellbeing">) {
  return <AreaRoute lang={(await params).lang} id="wellbeing" />;
}
