import type { Metadata } from "next";
import { AreaRoute, areaMetadata } from "@/components/area/renderArea";

export async function generateMetadata({ params }: PageProps<"/[lang]/consulting">): Promise<Metadata> {
  return areaMetadata((await params).lang, "consulting");
}

export default async function Page({ params }: PageProps<"/[lang]/consulting">) {
  return <AreaRoute lang={(await params).lang} id="consulting" />;
}
