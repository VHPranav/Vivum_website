import { NextResponse, type NextRequest } from "next/server";

// Keep in sync with src/i18n/config.ts (proxy should not import app modules).
const LOCALES = ["en"];
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  // /en/consulting → /consulting (English lives at clean URLs).
  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Other enabled locales are served as-is (/me/…).
  if (LOCALES.includes(first)) return;

  // Everything else is English: rewrite internally to /en/….
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, metadata files and anything with a file extension.
  matcher: ["/((?!_next|api|icon|apple-icon|sitemap.xml|robots.txt|.*\\.[\\w]+$).*)"],
};
