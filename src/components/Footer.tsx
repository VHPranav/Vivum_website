import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { contactRoutes, displayEmail, legalName, reviewMode, whatsappNumber } from "@/lib/site";
import { ApprovalFlag } from "./ui/Kit";
import { FillText } from "./motion/Text";
import { FooterCarousel, type CarouselItem } from "./FooterCarousel";

/**
 * Footer as on Tresmares: a pale, almost full-height closing panel — centred statement that fills
 * in as you scroll, a "Contact us" link, a row of square images (here: the four areas), small
 * square contact icons, and a thin bottom bar with legal links and the copyright line.
 */
export function Footer({ locale, footer, carousel }: { locale: Locale; footer: Content["footer"]; carousel: CarouselItem[] }) {
  const L = (href: string) => localePath(locale, href);
  const email = displayEmail("general");
  return (
    <footer className="bg-[#f1f0ec] text-ink">
      <div className="container-page pt-28 md:pt-40">
        <div className="text-center">
          <FillText as="p" className="mx-auto max-w-[20ch] font-serif text-[clamp(2rem,1rem+2.9vw,3.6rem)] leading-[1.05] font-light tracking-[-0.02em] text-navy">
            {footer.statement}
          </FillText>
          <Link href={L("/contact")} className="link-u mt-8 inline-block text-[0.875rem] font-medium text-navy-ink">
            {footer.cta}
          </Link>
        </div>

      </div>

      {/* Full-width image carousel, as in the Tresmares footer. */}
      <div className="mt-20 md:mt-28">
        <FooterCarousel items={carousel.map((it) => ({ ...it, href: L(it.href) }))} />
      </div>

      <div className="container-page">
        <div className="mt-16 flex justify-center gap-4 md:mt-24">
          <Link href={L("/contact")} aria-label={`Email${email ? ` ${email}` : ""}`} className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-navy hover:text-navy">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden>
              <rect x="1.5" y="3" width="13" height="10" />
              <path d="m2 3.5 6 5 6-5" />
            </svg>
          </Link>
          {whatsappNumber ? (
            <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`} aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink hover:border-navy hover:text-navy">
              <WhatsAppIcon />
            </a>
          ) : (
            <span aria-label="WhatsApp (number to be confirmed)" title="WhatsApp number to be confirmed" className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink/35">
              <WhatsAppIcon />
            </span>
          )}
        </div>
        {reviewMode && !contactRoutes.general.verified && (
          <div className="mt-4 text-center">
            <ApprovalFlag>mailbox and WhatsApp number</ApprovalFlag>
          </div>
        )}
      </div>

      <div className="mt-24 border-t border-ink/10 md:mt-32">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-ink/70 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {footer.groups.flatMap((g) => (g.title === "Our services" ? [] : g.links)).map((l) => (
              <li key={l.href}>
                <Link href={L(l.href)} className="hover:text-navy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-ink/45">
            © {new Date().getFullYear()} {legalName} · English · Crnogorski (in preparation)
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden>
      <path d="M2.2 13.8 3 11a6 6 0 1 1 2.2 2.1Z" />
      <path d="M6 5.6c0 2.4 1.9 4.4 4.4 4.4l.8-1.1-1.4-.7-.6.6A3.2 3.2 0 0 1 7.3 7l.6-.6-.7-1.4Z" />
    </svg>
  );
}
