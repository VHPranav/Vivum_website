"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { localePath, type Locale } from "@/i18n/config";
import type { AreaPage } from "@/content/en/areas";
import { AreaSymbol } from "@/components/AreaSymbol";
import { HeroMark } from "./HeroMark";
import { ApprovalFlag } from "@/components/ui/Kit";
import { SplitLines } from "@/components/motion/Text";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

type Other = { id: string; href: string; title: [string, string]; facts: AreaPage["facts"] };
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Area page after the Tresmares Capital solution pages:
 * symbol hero + facts row → scattered gallery with sticky text → grey table → other areas.
 */
export function AreaDetail({ id, page, others, locale, otherLabel }: { id: string; page: AreaPage; others: Other[]; locale: Locale; otherLabel: string }) {
  return (
    <>
      <AreaHero id={id} page={page} />
      <Gallery gallery={page.gallery} />
      <Table table={page.table} cta={page.cta} locale={locale} approval={page.approval} />
      <OtherAreas others={others} locale={locale} label={otherLabel} />
    </>
  );
}

function Facts({ facts, className = "" }: { facts: AreaPage["facts"]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6 ${className}`}>
      {facts.map((f) => (
        <div key={f.k} data-fact>
          <dt className="text-[0.675rem] font-bold tracking-[0.02em] text-ink uppercase">{f.k}</dt>
          <dd className="mt-1 text-[0.675rem] font-medium text-ink/70">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function AreaHero({ id, page }: { id: string; page: AreaPage }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const parts = root.current!.querySelectorAll("[data-symbol] > *");
      gsap.from(parts, { xPercent: 60, opacity: 0, duration: 1.6, stagger: 0.12, ease: "expo.out", delay: 0.15 });
      gsap.from("[data-fact]", { y: 14, opacity: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", delay: 0.7 });
      gsap.to("[data-symbol]", { yPercent: 18, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    },
    { scope: root },
  );
  return (
    <section ref={root} aria-labelledby="area-title" className="relative min-h-[100svh] overflow-hidden bg-white pt-[4.5rem]">
      <HeroMark id={id} className="absolute top-[calc(4.5rem+5svh)] right-5 h-[36svh] w-auto max-w-[62vw] text-navy md:right-6" />
      <div className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end px-5 pb-[8svh] md:px-6">
        <h1 id="area-title" className="max-w-[60vw] text-[clamp(2.75rem,1rem+5vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.02em] text-navy">
          <SplitLines as="span" on="load" delay={0.1} className="block">
            {page.title[0]}
          </SplitLines>
          <SplitLines as="span" on="load" delay={0.2} className="block">
            {page.title[1]}
          </SplitLines>
        </h1>
        <SplitLines as="p" on="load" delay={0.4} stagger={0.04} className="mt-[6svh] max-w-[17rem] text-[1.125rem] leading-[1.25] font-medium text-ink">
          {page.lede}
        </SplitLines>
        <Facts facts={page.facts} className="mt-[5svh]" />
      </div>
    </section>
  );
}

/** Four photos scattered over a tall section, each drifting at its own speed; the text stays put. */
function Gallery({ gallery }: { gallery: AreaPage["gallery"] }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      root.current!.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        gsap.fromTo(el, { y: 0 }, { y: () => -Number(el.dataset.speed) * window.innerHeight, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    { scope: root },
  );
  const [a, b, c, d] = gallery.images;
  const img = (src: string, cls: string, speed: number, sizes: string) => (
    <div data-speed={speed} className={`absolute overflow-hidden bg-mist ${cls}`}>
      <Image src={src} alt="" fill sizes={sizes} quality={90} className="object-cover grayscale" />
    </div>
  );
  return (
    <section ref={root} className="relative h-[150vw] bg-white md:h-[120vw] lg:h-[110vw]">
      {img(a, "top-[2vw] left-5 aspect-square w-[34vw] md:left-6 md:w-[15vw]", 0.1, "15vw")}
      {img(b, "top-[12vw] right-0 aspect-[4/5] w-[40vw] md:w-[20vw]", 0.3, "20vw")}
      {img(c, "top-[64vw] left-0 aspect-[3/2] w-[60vw] md:top-[46vw] md:w-[30vw]", 0.2, "30vw")}
      {img(d, "top-[100vw] left-1/2 aspect-[4/5] w-[40vw] md:top-[62vw] md:w-[20vw]", 0.05, "20vw")}
      <div className="absolute inset-x-5 top-[40vw] bottom-[30vw] md:left-1/2 md:top-[25vw] md:right-auto md:bottom-[50vw] md:w-[20vw]">
        <p className="sticky top-[40svh] text-[1.125rem] leading-[1.25] font-medium text-ink">{gallery.text}</p>
      </div>
    </section>
  );
}

function Table({ table, cta, locale, approval }: { table: AreaPage["table"]; cta: AreaPage["cta"]; locale: Locale; approval: string }) {
  return (
    <section aria-label={table.columns[0]} className="bg-[#f2f2f2] px-5 py-[8vw] md:px-[2.4vw] md:py-[7vw]">
      <SplitLines as="p" className="max-w-[22rem] text-[1.125rem] leading-[1.25] font-medium text-ink">
        {table.intro}
      </SplitLines>
      <div className="mt-[6vw]">
        <div className="hidden grid-cols-12 border-b border-ink/15 pb-3 text-[0.675rem] text-ink/50 md:grid">
          <span className="col-span-5">{table.columns[0]}</span>
          <span className="col-span-3">{table.columns[1]}</span>
          <span className="col-span-2">{table.columns[2]}</span>
          <span className="col-span-2 text-right">{table.columns[3]}</span>
        </div>
        {table.groups.map((g) => (
          <div key={g.name} className="grid grid-cols-1 gap-4 border-b border-ink/15 py-8 md:grid-cols-12 md:py-10">
            <h3 className="text-[1.75rem] leading-[1.05] font-medium tracking-[-0.015em] text-ink md:col-span-5 md:max-w-[14ch] md:text-[clamp(1.5rem,0.6rem+1.6vw,2.25rem)]">{g.name}</h3>
            <ul className="space-y-3 md:col-span-7">
              {g.rows.map((r, i) => (
                <li key={i} className="grid grid-cols-7 gap-4 text-[0.75rem] leading-snug text-ink">
                  <span className="col-span-4 md:col-span-3">{r[0]}</span>
                  <span className="hidden md:col-span-2 md:block">{r[1]}</span>
                  <span className="col-span-3 text-right md:col-span-2">{r[2]}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        {table.note ? <p className="max-w-md text-[0.75rem] text-ink/60">{table.note}</p> : <span />}
        <Link href={localePath(locale, cta.href)} className="inline-flex min-h-12 items-center bg-navy px-7 text-[0.825rem] font-medium text-white transition-colors hover:bg-navy-ink">
          {cta.label}
        </Link>
      </div>
      <ApprovalFlag className="mt-6">Client approval required: {approval}</ApprovalFlag>
    </section>
  );
}

/** "Other solutions": big two-line names that open to show facts over a faint symbol. */
function OtherAreas({ others, locale, label }: { others: Other[]; locale: Locale; label: string }) {
  const [open, setOpen] = useState(0);
  return (
    <section aria-labelledby="other-areas" className="bg-white px-5 py-[8vw] md:px-[2.4vw]">
      <p id="other-areas" className="border-b border-ink/15 pb-3 text-[0.675rem] text-ink/50">
        {label}
      </p>
      <ul>
        {others.map((o, i) => {
          const isOpen = open === i;
          return (
            <li key={o.id} className="relative overflow-hidden border-b border-ink/15">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-start justify-between gap-6 py-8 text-left"
              >
                <span className="relative z-10 text-[clamp(2rem,1rem+3vw,3.75rem)] leading-[0.98] font-medium tracking-[-0.02em] text-ink">
                  {o.title[0]}
                  <br />
                  {o.title[1]}
                </span>
                <span aria-hidden className="relative z-10 mt-2 flex h-6 w-6 shrink-0 items-center justify-center border border-ink/20 text-[0.8rem] text-ink">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.7, ease }} className="overflow-hidden">
                    <AreaSymbol id={o.id} mono className="pointer-events-none absolute top-0 left-[38%] h-full w-auto text-ink/[0.06]" />
                    <div className="relative grid gap-8 pb-8 md:grid-cols-12 md:items-end">
                      <Facts facts={o.facts.slice(0, 4)} className="md:col-span-10 lg:!grid-cols-4" />
                      <Link href={localePath(locale, o.href)} className="link-u justify-self-start text-[0.825rem] font-medium text-navy md:col-span-2 md:justify-self-end">
                        Explore
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
