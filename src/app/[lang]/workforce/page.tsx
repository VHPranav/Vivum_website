import type { Metadata } from "next";
import { AreaRoute, areaMetadata } from "@/components/area/renderArea";

export async function generateMetadata({ params }: PageProps<"/[lang]/workforce">): Promise<Metadata> {
  return areaMetadata((await params).lang, "workforce");
}

export default async function Page({ params }: PageProps<"/[lang]/workforce">) {
  return <AreaRoute lang={(await params).lang} id="workforce" />;
}
