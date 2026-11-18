import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Public, indexable pages. Division stubs are listed so their URLs are stable from day one.
const paths = ["/", "/wellbeing", "/education", "/workforce", "/consulting", "/about", "/partners", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${siteUrl}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.8 }));
}
