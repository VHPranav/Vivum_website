import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Poppins, Source_Serif_4 } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isLocale, localeLabels, locales } from "@/i18n/config";
import { getContent } from "@/content";
import { siteUrl } from "@/lib/site";
import "../globals.css";

// Headings — closest Google match to the identity sheet's "Late Serif": a classic, high-legibility serif.
const serif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  // Variable font: one file covers every weight used (300–500).
  variable: "--font-source-serif",
  display: "swap",
});

// Body and subheads — Poppins, as on the identity sheet. latin-ext covers Montenegrin (č, ć, š, ž, đ).
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "VIVUM Group", template: "%s — VIVUM Group" },
};

export const viewport: Viewport = { themeColor: "#fbfaf6" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);

  return (
    <html lang={localeLabels[lang].htmlLang} className={`${serif.variable} ${poppins.variable}`}>
      <body>
        <SmoothScroll>
          <Header locale={lang} nav={c.nav} ui={c.ui} divisions={c.divisions} />
          <main id="main">{children}</main>
          <Footer locale={lang} footer={c.footer} />
        </SmoothScroll>
      </body>
    </html>
  );
}
