"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { localeLabels, localePath, plannedLocales, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { useLenis } from "./SmoothScroll";
import { Wordmark } from "./Wordmark";

// Pages whose hero is dark: the header starts in its light (white text) variant there.
const darkHeroPaths = ["/consulting"];

type Props = { locale: Locale; nav: Content["nav"]; ui: Content["ui"]; divisions: Content["divisions"] };

export function Header({ locale, nav, ui, divisions }: Props) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation (adjusting state during render, per React guidance).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const onDark = !scrolled && !open && darkHeroPaths.some((p) => pathname === localePath(locale, p));

  const isActive = (href: string) => {
    const full = localePath(locale, href);
    return href === "/" ? pathname === full : pathname.startsWith(full);
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        {ui.skipToContent}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height] duration-500 ${
          scrolled || open ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className={`container-page flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? "h-16" : "h-20 md:h-24"}`}>
          <Link href={localePath(locale, "/")} aria-label="VIVUM Group home" className="relative z-10">
            <Wordmark tone={onDark ? "light" : "dark"} />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(locale, item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative rounded-full px-3 py-2 text-[0.8125rem] tracking-wide transition-colors xl:px-4 ${
                      onDark
                        ? isActive(item.href)
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                        : isActive(item.href)
                          ? "text-navy"
                          : "text-ink/70 hover:text-navy"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-gold to-gold-soft xl:inset-x-4" aria-hidden />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitch locale={locale} ui={ui} onDark={onDark} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${onDark ? "border-white/30 text-white" : "border-navy/20 text-navy"}`}
            >
              <span className="sr-only">{open ? ui.close : ui.menu}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-24 pb-10 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page">
              <ul className="border-t border-line">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={localePath(locale, item.href)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex items-center justify-between py-4 font-serif text-[1.75rem] font-light ${isActive(item.href) ? "text-navy" : "text-ink"}`}
                    >
                      {item.label}
                      {isActive(item.href) && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="eyebrow mt-10 text-muted">Divisions</p>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {divisions.map((d) => (
                  <li key={d.id}>
                    <Link href={localePath(locale, d.href)} className="block rounded-xl border border-line bg-white px-3 py-3 text-[0.8125rem] leading-snug text-navy">
                      <span className="block text-[0.6875rem] text-muted">{d.n}</span>
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LanguageSwitch({ locale, ui, onDark }: { locale: Locale; ui: Content["ui"]; onDark: boolean }) {
  return (
    <div
      className={`flex items-center rounded-full border p-0.5 text-[0.6875rem] font-medium tracking-wider transition-colors ${onDark ? "border-white/25" : "border-navy/15"}`}
      aria-label="Language"
    >
      <span aria-current="true" className={`rounded-full px-2.5 py-1.5 ${onDark ? "bg-white text-navy" : "bg-navy text-white"}`}>
        {localeLabels[locale].short}
      </span>
      {plannedLocales.map((l) => (
        <span key={l} title={ui.languageSoon} aria-disabled="true" className={`cursor-not-allowed px-2.5 py-1.5 ${onDark ? "text-white/45" : "text-ink/40"}`}>
          {localeLabels[l].short}
          <span className="sr-only"> ({ui.languageSoon})</span>
        </span>
      ))}
    </div>
  );
}
