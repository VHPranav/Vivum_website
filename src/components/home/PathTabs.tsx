"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import type { DivisionId } from "@/content/en/common";
import { Arrow } from "@/components/ui/Kit";
import { Media } from "@/components/ui/Media";
import { SplitLines } from "@/components/motion/Text";
import { areaTone } from "./AreaCards";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * "Who are you?" — routes each audience to its own next step (Sphere's hire/find-a-job split,
 * extended to every area). Big tab list rotates on its own until someone picks one, with the
 * image revealed by a wipe (Prime Exits "choose exit strategy").
 */
export function PathTabs({ locale, paths, divisions }: { locale: Locale; paths: Content["home"]["paths"]; divisions: Content["divisions"] }) {
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const items = paths.items;
  const current = items[i];
  const division = divisions.find((d) => d.id === current.area)!;

  useEffect(() => {
    if (!inView || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => window.clearInterval(id);
  }, [inView, touched, items.length]);

  const pick = (k: number) => {
    setTouched(true);
    setI(k);
  };

  return (
    <section ref={ref} id="paths" aria-labelledby="paths-title" className="scroll-mt-20 bg-cream/60 py-24 md:py-36">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[1.75rem]">
            <AnimatePresence initial={false}>
              <motion.div
                key={i}
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.9, ease }}
                className="absolute inset-0"
              >
                {/* Portrait crop, ~40% of the page width on desktop. */}
                <Media need={division.imageNeed} tone={areaTone[division.id as DivisionId]} sizes="(min-width: 1920px) 760px, 40vw" className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="label flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
            {paths.label}
          </p>
          <SplitLines as="h2" id="paths-title" className="display-m mt-5 text-navy">
            {paths.title}
          </SplitLines>

          <ul className="mt-10 border-t border-line" role="tablist" aria-label={paths.title}>
            {items.map((p, k) => {
              const on = k === i;
              return (
                <li key={p.who} className="border-b border-line">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => pick(k)}
                    className={`flex w-full items-baseline gap-4 py-4 text-left font-serif text-[1.5rem] leading-tight font-light transition-colors duration-500 md:text-[2.1rem] ${
                      on ? "text-navy" : "text-navy/30 hover:text-navy/60"
                    }`}
                  >
                    <span className="font-sans text-xs text-gold tabular-nums">{String(k + 1).padStart(2, "0")}</span>
                    {p.who}
                    {on && !touched && (
                      <span aria-hidden className="ml-auto h-px w-10 self-center overflow-hidden bg-line">
                        <motion.span key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5, ease: "linear" }} className="block h-full origin-left bg-green" />
                      </span>
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        role="tabpanel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-5 pb-6 pl-9 sm:flex-row sm:items-center sm:justify-between">
                          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
                          <Link
                            href={localePath(locale, p.href)}
                            className="group inline-flex min-h-11 shrink-0 items-center gap-2.5 self-start rounded-full bg-navy px-5 text-[0.8125rem] font-medium text-white hover:bg-navy-deep sm:self-auto"
                          >
                            {p.cta}
                            <Arrow />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
