import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isLocale, localeLabels, locales } from "@/i18n/config";
import { getContent } from "@/content";
import { siteUrl } from "@/lib/site";
import "../globals.css";


// Body and subheads — Plus Jakarta Sans (trial in place of the brand sheet's Poppins; client to confirm).
// latin-ext covers Montenegrin (č, ć, š, ž, đ).
const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-face",
  display: "swap",
});

const introScript = `document.documentElement.classList.add("js");`;

// Which area page each network photo links to (same order as home.network.items).
const carouselArea = ["/wellbeing", "/wellbeing", "/wellbeing", "/consulting", "/consulting", "/consulting", "/consulting", "/consulting", "/workforce", "/workforce", "/education", "/education"];

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "VIVUM Group", template: "%s — VIVUM Group" },
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png", sizes: "64x64" }],
    apple: [{ url: "/brand/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = { themeColor: "#fbfaf6" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);

  return (
    <html lang={localeLabels[lang].htmlLang} className={`${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Must run before first paint (next/script defers inline code): marks JS as available so
            split text stays hidden until it animates. React logs a harmless dev-only notice about it. */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <SmoothScroll>
          <Header locale={lang} nav={c.nav} ui={c.ui} divisions={c.divisions} />
          <main id="main">{children}</main>
          <Footer
            locale={lang}
            footer={c.footer}
            carousel={c.home.network.items.map((it, k) => ({ src: it.src, caption: it.name, href: carouselArea[k] ?? "/" }))}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
