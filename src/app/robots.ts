import type { MetadataRoute } from "next";
import { reviewMode, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // The review build must not be indexed.
  if (reviewMode) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
