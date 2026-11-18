"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import type { DivisionId } from "@/content/en/common";
import { ApprovalFlag } from "@/components/ui/Kit";
import { Media } from "@/components/ui/Media";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { Rise } from "@/components/motion/Rise";
import { SplitLines } from "@/components/motion/Text";
import { areaTone } from "./AreaCards";

/**
 * Facts (Tresmares "grid numbers — vertical"): sticky intro text on the left, two staggered
 * columns of outlined cards with large serif figures on the right, rising in as they arrive.
 */
export function FactsGrid({ locale, facts }: { locale: Locale; facts: Content["home"]["facts"] }) {
  const colA = facts.items.filter((_, i) => i % 2 === 0);
  const colB = facts.items.filter((_, i) => i % 2 === 1);
  const card = (f: { k: string; v: string }) => (
    <li key={f.v} data-rise className="-mt-px flex aspect-[4/5] flex-col justify-between border border-line bg-paper p-5 md:p-6">
      <span className="font-serif text-[clamp(2.4rem,1.2rem+3vw,4.5rem)] leading-none font-light tracking-[-0.03em] text-green-deep">{f.k}</span>
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
 * Network wheel (Tresmares "map"): a ring of tiles turns as you scroll through a pinned section;
 * the tile reaching the top shows its name.
 */
export function NetworkWheel({ network }: { network: Content["home"]["network"] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = network.items.length;
  const step = 360 / n;

  useGSAP(
    () => {
      const total = step * (n - 1);
      const st = { trigger: root.current, start: "top top", end: "bottom bottom", scrub: prefersReducedMotion() ? false : 0.6 };
      gsap.fromTo(
        "[data-wheel]",
        { rotate: 0 },
        {
          rotate: -total,
          ease: "none",
          scrollTrigger: {
            ...st,
            onUpdate: (self) => setActive(Math.round((self.progress * total) / step) % n),
          },
        },
      );
      gsap.from("[data-wheel-wrap]", { y: 220, opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true } });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="network-title" className="relative h-[240svh] bg-gradient-to-b from-paper via-mist/50 to-paper">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="container-page relative z-10 pt-[16svh] text-center">
          <p className="label">{network.label}</p>
          <SplitLines as="h2" id="network-title" className="display-m mx-auto mt-5 max-w-[16ch] text-navy">
            {network.title}
          </SplitLines>
          <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted">{network.body}</p>
          <p className="mt-6 font-serif text-xl text-green-deep md:text-2xl" aria-live="polite">
            {network.items[active].name}
          </p>
        </div>

        <div
          data-wheel-wrap
          aria-hidden
          className="absolute left-1/2 [--card:clamp(96px,11vw,180px)] [--r:clamp(280px,40vw,640px)]"
          style={{ top: "calc(100% + var(--r) * 0.7)" }}
        >
          <div data-wheel className="relative h-0 w-0">
            {network.items.map((it, i) => {
              const a = -90 + i * step;
              return (
                <div key={it.name} className="absolute top-0 left-0" style={{ transform: `rotate(${a}deg) translate(var(--r)) rotate(90deg)` }}>
                  <div
                    className={`-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.25rem] shadow-[0_20px_40px_-20px_rgba(11,29,58,0.35)] transition-[transform,opacity] duration-500 ${
                      i === active ? "scale-110 opacity-100" : "scale-100 opacity-80"
                    }`}
                    style={{ width: "var(--card)", height: "calc(var(--card) * 1.2)" }}
                  >
                    <Media need={`${it.name} photograph`} tone={areaTone[it.area as DivisionId]} sizes="180px" labelClass="hidden" className="h-full w-full" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-ink/70 to-transparent p-3 text-[0.6875rem] leading-tight text-white md:text-xs">{it.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** People (Tresmares "teams"): draggable row of portrait cards that rise in. */
export function PeopleRow({ people }: { people: Content["home"]["people"] }) {
  const viewport = useRef<HTMLDivElement>(null);
  return (
    <section aria-labelledby="people-title" className="py-24 md:py-36">
      <div className="container-page text-center">
        <p className="label">{people.label}</p>
        <SplitLines as="h2" id="people-title" className="display-m mx-auto mt-5 max-w-[18ch] text-navy">
          {people.title}
        </SplitLines>
        <ApprovalFlag className="mt-5">{people.approval}</ApprovalFlag>
      </div>
      <div ref={viewport} className="mt-14 overflow-hidden" data-lenis-prevent-touch>
        <Rise>
          <motion.ul drag="x" dragConstraints={viewport} dragElastic={0.08} className="flex w-max cursor-grab gap-4 px-5 active:cursor-grabbing md:px-10" style={{ touchAction: "pan-y" }}>
            {people.members.map((m, i) => (
              <li key={m.role} data-rise className="relative aspect-[0.81] w-[72vw] shrink-0 overflow-hidden rounded-[1.5rem] select-none sm:w-[20rem] lg:w-[24rem]">
                {/* Portrait crop 0.81:1 at card width. */}
                <Media need={`Approved portrait: ${m.role}`} tone={i === 0 ? "navy" : "azure"} sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 72vw" labelClass="top-4 left-4" className="pointer-events-none h-full w-full" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-ink/80 via-navy-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
                  <p className="text-[0.8125rem] text-white/75">{m.role}</p>
                  <p className="mt-1 font-serif text-[1.6rem] leading-tight">{m.name}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </Rise>
      </div>
    </section>
  );
}
