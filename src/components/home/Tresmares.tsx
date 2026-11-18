"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { ApprovalFlag } from "@/components/ui/Kit";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { Rise } from "@/components/motion/Rise";
import { FillText } from "@/components/motion/Text";

/**
 * Facts (Tresmares "grid numbers — vertical"): sticky intro text on the left, two staggered
 * columns of outlined cards with large serif figures on the right, rising in as they arrive.
 */
export function FactsGrid({ locale, facts }: { locale: Locale; facts: Content["home"]["facts"] }) {
  const colA = facts.items.filter((_, i) => i % 2 === 0);
  const colB = facts.items.filter((_, i) => i % 2 === 1);
  const card = (f: { k: string; v: string }) => (
    <li key={f.v} data-rise className="-mt-px flex aspect-[4/5] flex-col justify-between border border-line bg-paper p-5 md:p-6">
      <span className="font-serif text-[clamp(2.4rem,1.2rem+3vw,4.5rem)] leading-none font-light tracking-[-0.02em] text-green-deep">{f.k}</span>
      <span className="text-[0.8125rem] leading-snug text-ink md:text-sm">{f.v}</span>
    </li>
  );
  return (
    <section aria-label="VIVUM in figures" className="py-24 md:py-40">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-3 lg:col-start-2">
          <div className="lg:sticky lg:top-[38svh]">
            <p className="text-[1.25rem] leading-[1.25] tracking-[-0.01em] text-navy-ink md:text-[1.5rem]">{facts.body}</p>
            <Link href={localePath(locale, facts.link.href)} className="link-u mt-6 inline-block text-[0.875rem] font-medium text-navy-ink">
              {facts.link.label}
            </Link>
          </div>
        </div>
        <Rise className="grid grid-cols-2 lg:col-span-5 lg:col-start-6">
          <ul className="flex flex-col">{colA.map(card)}</ul>
          <ul className="-ml-px flex flex-col pt-[62.5%]">{colB.map(card)}</ul>
        </Rise>
      </div>
    </section>
  );
}

/**
 * Network (Tresmares "map"): centred heading with accent words, a large ring of square photo
 * cards that turns once as the section scrolls past (only the top card's caption shows, sliding
 * in from the right), a centred paragraph inside the ring, and a halftone dot map with pulsing
 * location markers that show a tooltip on hover or tap.
 */
export function NetworkWheel({ network }: { network: Content["home"]["network"] }) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const n = network.items.length;
  const step = 360 / n;

  useGSAP(
    () => {
      const names = gsap.utils.toArray<HTMLElement>("[data-name]");
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-ring]", start: "top bottom", end: "bottom top", scrub: prefersReducedMotion() ? false : true } });
      tl.fromTo(names.slice(0, -1), { opacity: 1, xPercent: 0 }, { opacity: 0, xPercent: -20, duration: 0.5, stagger: 1 }, 0);
      tl.fromTo(names.slice(1), { opacity: 0, xPercent: 20 }, { opacity: 1, xPercent: 0, duration: 0.5, stagger: 1 }, 0.5);
      tl.to("[data-circle]", { rotate: -360 + step, duration: tl.totalDuration() }, 0);
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="network-title" className="relative overflow-hidden bg-white pt-[20vw] pb-[10vw]">
      <div className="container-page text-center">
        <p className="label">{network.label}</p>
        <h2 id="network-title" className="mx-auto mt-6 max-w-[22ch] font-serif text-[clamp(2rem,1rem+2.9vw,3.6rem)] leading-[1.05] font-light tracking-[-0.02em] text-navy">
          {network.title[0]}
          <span className="text-green-deep">{network.title[1]}</span>
          {network.title[2]}
        </h2>
      </div>

      <div className="container-page mt-10 md:hidden">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
          {network.items.map((it) => (
            <li key={it.name} className="min-w-0">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-mist">
                <Image src={it.src} alt="" fill sizes="50vw" quality={90} className="object-cover" />
              </div>
              <p className="mt-3 text-sm leading-snug font-medium text-ink">{it.name}</p>
            </li>
          ))}
        </ul>
        <p className="my-10 text-base leading-relaxed text-ink">{network.body}</p>
      </div>
      <div data-ring className="relative mx-auto hidden h-[max(44vw,26rem)] w-screen overflow-hidden pt-[12.5vw] md:block">
        <div data-circle className="relative mx-auto aspect-square w-[max(90vw,44rem)]">
          {network.items.map((it, i) => (
            <div
              key={it.name}
              className="absolute top-1/2 left-1/2 w-[max(10vw,6rem)] origin-top-left"
              style={{ transform: `rotate(${i * step - 96}deg) translate(calc(max(45vw, 22rem) + max(5vw, 3rem))) rotate(96deg)` }}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-mist">
                <Image src={it.src} alt="" fill sizes="(min-width: 960px) 10vw, 96px" quality={90} className="object-cover" />
              </div>
              <p data-name className="mt-[1.667vw] text-center text-[clamp(0.875rem,0.5rem+1vw,1.5rem)] font-medium whitespace-nowrap text-ink">
                {it.name}
              </p>
            </div>
          ))}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[-20vw] h-[49vw] bg-[linear-gradient(180deg,rgba(255,255,255,0)_29.56%,#fff_58.5%)]" />
        <p className="absolute top-[31.25vw] left-1/2 w-[min(40vw,34rem)] min-w-[18rem] -translate-x-1/2 text-center text-[1rem] leading-snug text-ink md:text-[1.25rem]">{network.body}</p>
      </div>

      <div className="relative mx-auto aspect-[2400/1120] w-screen max-w-none">
        <Image src="/images/europe-dots.svg" alt="Map of Europe with VIVUM locations" fill unoptimized className="object-contain" />
        {network.locations.map((loc, i) => (
          <div key={loc.name} className="absolute" style={{ left: loc.left, top: loc.top }}>
            <button
              type="button"
              aria-label={`${loc.title}, ${loc.name}`}
              aria-expanded={open === i}
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
              onClick={() => setOpen(open === i ? null : i)}
              className="relative -ml-[0.42vw] -mt-[0.42vw] block h-[max(0.833vw,10px)] w-[max(0.833vw,10px)] rounded-full bg-green-deep"
            >
              <span aria-hidden className="absolute top-1/2 left-1/2 h-[max(2.5vw,28px)] w-[max(2.5vw,28px)] -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-green/40" />
            </button>
            <div
              role="tooltip"
              className={`absolute bottom-[calc(100%+1rem)] left-1/2 w-[max(13.3vw,13rem)] -translate-x-1/2 rounded-xl border border-line bg-white p-[max(1.667vw,1rem)] text-left shadow-[0_2.2vw_0.8vw_-1.7vw_rgba(0,0,0,0.04)] transition-all duration-500 ${
                open === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              <p className="font-serif text-lg text-navy">{loc.title}</p>
              <p className="mt-1 text-xs text-muted">{loc.name}</p>
              <p className="mt-2 text-sm leading-snug text-ink">{loc.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <ApprovalFlag>{network.approval}</ApprovalFlag>
      </div>
    </section>
  );
}

/**
 * Team (Tresmares "teams"): pale band with a centred statement that fills in, then an
 * edge-to-edge draggable row of tall portrait cards. Hover deepens the card's gradient and
 * reveals the role and name at the top; a round "Drag" cursor follows the pointer over the row.
 */
export function PeopleRow({ people }: { people: Content["home"]["people"] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [over, setOver] = useState(false);

  const move = (e: React.PointerEvent) => {
    if (cursor.current) gsap.to(cursor.current, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power3.out" });
  };

  return (
    <section aria-labelledby="people-statement" className="bg-[#f3f3f1] pt-[13.333vw] pb-[0.417vw]">
      <div className="container-page text-center">
        <FillText as="h2" id="people-statement" className="mx-auto max-w-[24ch] font-serif text-[clamp(2rem,1rem+2.9vw,3.6rem)] leading-[1.05] font-light tracking-[-0.02em] text-navy">
          {people.statement}
        </FillText>
        <span aria-hidden className="mx-auto mt-[4vw] block h-1.5 w-1.5 rounded-full bg-green" />
        <ApprovalFlag className="mt-4">{people.approval}</ApprovalFlag>
      </div>

      <div
        ref={viewport}
        className="mt-[3vw] overflow-hidden lg:cursor-none"
        data-lenis-prevent-touch
        onPointerEnter={() => setOver(true)}
        onPointerLeave={() => setOver(false)}
        onPointerMove={move}
      >
        <Rise>
          <motion.ul drag="x" dragConstraints={viewport} dragElastic={0.06} className="flex w-max gap-[0.417vw] px-[0.417vw]" style={{ touchAction: "pan-y" }}>
            {people.members.map((m) => (
              <li key={m.src} data-rise className="group relative w-[min(77.5vw,20rem)] shrink-0 overflow-hidden bg-[#ececec] select-none lg:w-[23vw]">
                <div aria-hidden className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(222,222,222,0.85),rgba(243,243,243,0)_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Role and name: always shown on touch screens, revealed on hover on desktop. */}
                <div className="relative z-[2] flex min-h-32 flex-col items-center justify-center bg-paper px-4 py-5 text-center transition-opacity duration-500 lg:h-[13.917vw] lg:min-h-0 lg:justify-end lg:bg-transparent lg:p-[2.5vw] lg:opacity-0 lg:group-hover:opacity-100">
                  <p className="text-[0.8125rem] text-ink/70">{m.role}</p>
                  <p className="mt-2 font-serif text-[1.4rem] leading-tight text-ink transition-transform duration-[1.2s] ease-[var(--ease-calm)] lg:mt-[0.625vw] lg:translate-y-[10%] lg:group-hover:translate-y-0">{m.name}</p>
                </div>
                <div className="relative h-[min(90vw,24rem)] lg:static lg:h-[25vw]">
                  <Image src={m.src} alt={`Portrait placeholder: ${m.role}`} fill sizes="(min-width: 1024px) 23vw, 78vw" quality={90} draggable={false} className="pointer-events-none object-cover object-bottom" />
                </div>
              </li>
            ))}
          </motion.ul>
        </Rise>
      </div>

      {/* Drag cursor (desktop only) */}
      <div aria-hidden className="pointer-events-none fixed top-0 left-0 z-[60] hidden lg:block" ref={cursor}>
        <div
          className={`-mt-[2.7vw] -ml-[2.7vw] flex h-[5.375vw] w-[5.375vw] items-center justify-center rounded-full bg-green-deep text-[0.75vw] font-bold tracking-wider text-white uppercase transition-transform duration-500 ease-[var(--ease-calm)] ${
            over ? "scale-100" : "scale-0"
          }`}
        >
          Drag
        </div>
      </div>
    </section>
  );
}
