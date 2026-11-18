"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { localeLabels, localePath, plannedLocales, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { useLenis } from "./SmoothScroll";
import { Wordmark } from "./Wordmark";
import { Arrow } from "./ui/Kit";

type Props = { locale: Locale; nav: Content["nav"]; ui: Content["ui"]; divisions: Content["divisions"] };
const ease = [0.22, 1, 0.36, 1] as const;

export function Header({ locale, nav, ui, divisions }: Props) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const openedAt = useRef(0);
  const L = (href: string) => localePath(locale, href);

  // Solid after a little scroll; slides away while scrolling down, returns when scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Only flip on a clear movement, so the tiny trailing deltas of smooth scrolling don't reset it.
      if (y < 240 || y < last - 4) setHidden(false);
      else if (y > last + 4) setHidden(true);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (adjusting state during render, per React guidance).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMega(false);
  }

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  useEffect(() => {
    if (!open && !mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMega(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mega]);

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (!mega) openedAt.current = Date.now();
    setMega(true);
  };
  // A click right after hover-open should keep the menu open, not toggle it shut.
  const toggleMega = () => {
    if (Date.now() - openedAt.current < 500) return;
    setMega((v) => !v);
  };
  const closeMegaSoon = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 160);
  };

  const isActive = (href: string) => (href === "/" ? pathname === L("/") : pathname.startsWith(L(href)));
  const servicesActive = divisions.some((d) => isActive(d.href));
  const solid = scrolled || open || mega;

  const linkCls = (active: boolean) =>
    `relative rounded-full px-3.5 py-2 text-[0.875rem] transition-colors ${active ? "text-navy" : "text-ink/70 hover:text-navy"}`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        {ui.skipToContent}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-calm)] ${
          hidden && !open && !mega ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"}`}
        onMouseLeave={closeMegaSoon}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Link href={L("/")} aria-label="VIVUM Group home" className="relative z-10">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <Link href={L(nav.home.href)} aria-current={isActive("/") ? "page" : undefined} className={linkCls(isActive("/"))}>
                  {nav.home.label}
                </Link>
              </li>
              <li>
                <Link href={L(nav.about.href)} aria-current={isActive(nav.about.href) ? "page" : undefined} className={linkCls(isActive(nav.about.href))}>
                  {nav.about.label}
                </Link>
              </li>
              <li onMouseEnter={openMega}>
                <button
                  type="button"
                  aria-expanded={mega}
                  aria-controls="services-menu"
                  onClick={toggleMega}
                  className={`${linkCls(servicesActive || mega)} inline-flex items-center gap-1.5`}
                >
                  {nav.services.label}
                  <svg viewBox="0 0 10 6" aria-hidden className={`h-1.5 w-2.5 transition-transform duration-300 ${mega ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.4}>
                    <path d="m1 1 4 4 4-4" />
                  </svg>
                </button>
              </li>
              <li>
                <Link href={L(nav.partners.href)} aria-current={isActive(nav.partners.href) ? "page" : undefined} className={linkCls(isActive(nav.partners.href))}>
                  {nav.partners.label}
                </Link>
              </li>
              <li>
                <Link href={L(nav.contact.href)} aria-current={isActive(nav.contact.href) ? "page" : undefined} className={linkCls(isActive(nav.contact.href))}>
                  {nav.contact.label}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageSwitch locale={locale} ui={ui} />
            <Link
              href={L("/contact")}
              className="group hidden min-h-11 items-center gap-2.5 rounded-full bg-navy px-5 text-[0.8125rem] font-medium text-white transition-colors hover:bg-navy-deep sm:inline-flex"
            >
              {ui.contactCta}
              <Arrow />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy lg:hidden"
            >
              <span className="sr-only">{open ? ui.close : ui.menu}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Services mega menu — every area with its audience paths (Sphere-style routing). */}
        <AnimatePresence>
          {mega && (
            <motion.div
              id="services-menu"
              onMouseEnter={openMega}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-paper shadow-[0_30px_60px_-30px_rgba(11,29,58,0.25)] lg:block"
            >
              <div className="container-page grid grid-cols-4 gap-6 py-10">
                {divisions.map((d, i) => (
                  <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.5, ease }}>
                    <Link href={L(d.href)} className="group block">
                      <span className="font-serif text-sm text-gold">{d.n}</span>
                      <span className="mt-2 block font-serif text-[1.375rem] leading-snug text-navy">{d.name}</span>
                      <span className="mt-2 block text-[0.8125rem] leading-relaxed text-muted">{d.description}</span>
                    </Link>
                    <ul className="mt-5 space-y-2 border-t border-line pt-4">
                      {d.paths.map((p) => (
                        <li key={p.href}>
                          <Link href={L(p.href)} className="group inline-flex items-center gap-2 text-[0.8125rem] text-ink hover:text-navy">
                            <Arrow className="h-2 w-4 text-green-deep" />
                            {p.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-24 pb-10 lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="container-page">
              <ul>
                {[nav.home, nav.about].map((item, i) => (
                  <MobileItem key={item.href} i={i} href={L(item.href)} label={item.label} active={isActive(item.href)} />
                ))}
              </ul>
              <p className="label mt-8">{nav.services.label}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {divisions.map((d, i) => (
                  <motion.li key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + 0.05 * i, duration: 0.5, ease }}>
                    <Link href={L(d.href)} className="block rounded-2xl border border-line bg-white px-4 py-3.5">
                      <span className="block text-[0.6875rem] text-gold">{d.n}</span>
                      <span className="block font-serif text-lg leading-snug text-navy">{d.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ul className="mt-6">
                {[nav.partners, nav.contact].map((item, i) => (
                  <MobileItem key={item.href} i={i + 4} href={L(item.href)} label={item.label} active={isActive(item.href)} />
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileItem({ i, href, label, active }: { i: number; href: string; label: string; active: boolean }) {
  return (
    <motion.li initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }} className="border-b border-line">
      <Link href={href} aria-current={active ? "page" : undefined} className={`flex items-center justify-between py-4 font-serif text-[2rem] font-light ${active ? "text-navy" : "text-ink"}`}>
        {label}
        {active && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />}
      </Link>
    </motion.li>
  );
}

function LanguageSwitch({ locale, ui }: { locale: Locale; ui: Content["ui"] }) {
  return (
    <div className="flex items-center rounded-full border border-navy/15 p-0.5 text-[0.6875rem] font-medium tracking-wider" aria-label="Language">
      <span aria-current="true" className="rounded-full bg-navy px-2.5 py-1.5 text-white">
        {localeLabels[locale].short}
      </span>
      {plannedLocales.map((l) => (
        <span key={l} title={ui.languageSoon} aria-disabled="true" className="cursor-not-allowed px-2.5 py-1.5 text-ink/40">
          {localeLabels[l].short}
          <span className="sr-only"> ({ui.languageSoon})</span>
        </span>
      ))}
    </div>
  );
}
