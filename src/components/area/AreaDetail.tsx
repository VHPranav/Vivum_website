"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { localePath, type Locale } from "@/i18n/config";
import type { AreaPage } from "@/content/en/areas";
import { AreaSymbol } from "@/components/AreaSymbol";
import { Clouds } from "@/components/home/Clouds";
import { ApprovalFlag } from "@/components/ui/Kit";
import { SplitLines } from "@/components/motion/Text";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

type Other = { id: string; href: string; title: [string, string]; facts: AreaPage["facts"] };
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Area page after the Tresmares Capital solution pages:
 * symbol hero + facts row → scattered gallery with sticky text → grey table → other areas.
 */
export function AreaDetail({ page, others, locale, otherLabel }: { page: AreaPage; others: Other[]; locale: Locale; otherLabel: string }) {
  return (
    <>
      <AreaHero page={page} image={page.gallery.images[0]} />
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

function AreaHero({ page, image }: { page: AreaPage; image: string }) {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-fact]", { y: 14, opacity: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", delay: 0.7 });
    },
    { scope: root },
  );
  return (
    <section ref={root} aria-labelledby="area-title" className="relative min-h-[100svh] overflow-hidden bg-paper pt-[4.5rem]">
      <div aria-hidden className="absolute inset-0">
        <Image src={image} alt="" fill preload sizes="100vw" quality={90} className="object-cover" />
        <Clouds progressRef={progress} className="absolute inset-0 [&[data-fallback]]:hidden" />
      </div>
      <div className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end px-5 pb-[8svh] md:px-6">
        {/* soft cloud bank behind the copy so it reads over any photo */}
        <div aria-hidden className="pointer-events-none absolute bottom-[-10%] left-[-15%] h-[85%] w-[80%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(251,250,246,0.97),rgba(251,250,246,0.85)_50%,rgba(251,250,246,0)_100%)] blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-paper/95 to-paper/0" />
        <h1 id="area-title" className="relative max-w-[60vw] text-[clamp(2.75rem,1rem+5vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.02em] text-navy">
          <SplitLines as="span" on="load" delay={0.1} className="block">
            {page.title[0]}
          </SplitLines>
          <SplitLines as="span" on="load" delay={0.2} className="block">
            {page.title[1]}
          </SplitLines>
        </h1>
        <SplitLines as="p" on="load" delay={0.4} stagger={0.04} className="relative mt-[6svh] max-w-[17rem] text-[1.125rem] leading-[1.25] font-medium text-ink">
          {page.lede}
        </SplitLines>
        <Facts facts={page.facts} className="relative mt-[5svh]" />
      </div>
    </section>
  );
}

/**
 * Four large photos scattered around the heading (Tresmares gallery). Laid out in rows with clear
 * gaps so text never sits on a photo; each photo drifts only slightly on scroll.
 */
function Gallery({ gallery }: { gallery: AreaPage["gallery"] }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      root.current!.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        const d = Number(el.dataset.speed);
        gsap.fromTo(el, { yPercent: d }, { yPercent: -d, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    { scope: root },
  );
  const [a, b, c, d] = gallery.images;
  const img = (src: string, cls: string, speed: number, sizes: string) => (
    <div className={`overflow-hidden bg-mist ${cls}`}>
      <div data-speed={speed} className="relative h-[112%] -translate-y-[6%]">
        <Image src={src} alt="" fill loading="eager" sizes={sizes} quality={90} className="object-cover grayscale" />
      </div>
    </div>
  );
  return (
    <section ref={root} className="bg-white py-[6vw]">
      {/* row 1: two photos */}
      <div className="flex items-start justify-between gap-5 px-5 md:pl-6 md:pr-0">
        {img(a, "aspect-square w-[36vw] md:w-[22vw]", 5, "(min-width: 768px) 22vw, 36vw")}
        {img(b, "mt-[14vw] aspect-[4/5] w-[38vw] md:mt-[6vw] md:w-[26vw]", 5, "(min-width: 768px) 26vw, 38vw")}
      </div>
      {/* row 2: heading + text, clear of the photos */}
      <div className="px-5 py-[12vw] md:ml-[27vw] md:w-[50vw] md:px-0 md:py-[8vw]">
        <h2 className="text-[clamp(2.25rem,1rem+3.6vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.025em] text-ink">{gallery.heading}</h2>
        <p className="mt-[3vw] text-[1.125rem] leading-[1.3] font-medium text-ink md:ml-[20vw] md:max-w-[22rem]">{gallery.text}</p>
      </div>
      {/* row 3: two photos */}
      <div className="flex items-start justify-between gap-5 pr-5 md:pr-[6vw]">
        {img(c, "aspect-[3/2] w-[54vw] md:w-[38vw]", 5, "(min-width: 768px) 38vw, 54vw")}
        {img(d, "mt-[20vw] aspect-[4/5] w-[30vw] md:mt-[10vw] md:w-[24vw]", 5, "(min-width: 768px) 24vw, 30vw")}
      </div>
    </section>
  );
}

function Table({ table, cta, locale, approval }: { table: AreaPage["table"]; cta: AreaPage["cta"]; locale: Locale; approval: string }) {
  return (
    <section aria-label={table.columns[0]} className="bg-[#f2f2f2] px-5 py-[8vw] md:px-[2.4vw] md:py-[7vw]">
      <div className="grid gap-10 md:grid-cols-2">
        <SplitLines as="p" className="max-w-[30rem] text-[1.25rem] leading-[1.3] font-medium text-ink md:text-[1.6rem]">
          {table.intro}
        </SplitLines>
        <h2 className="text-[clamp(3rem,1rem+7vw,8.5rem)] leading-[0.92] font-medium tracking-[-0.035em] text-ink">
          <SplitLines as="span" className="block">{table.heading[0]}</SplitLines>
          <SplitLines as="span" className="block">{table.heading[1]}</SplitLines>
        </h2>
      </div>
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
      <ApprovalFlag className="mt-6">{approval}</ApprovalFlag>
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
            <li key={o.id} onMouseEnter={() => setOpen(i)} className="relative overflow-hidden border-b border-ink/15">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(i)}
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
