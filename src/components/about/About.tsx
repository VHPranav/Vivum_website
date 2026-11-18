"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Content } from "@/content";
import { ApprovalFlag } from "@/components/ui/Kit";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { FillText } from "@/components/motion/Text";

type A = Content["about"];
const ease = [0.22, 1, 0.36, 1] as const;

/** Index of the active step while a tall section is pinned and scrolled through. */
function usePinnedIndex(root: React.RefObject<HTMLElement | null>, count: number, onChange: (i: number) => void) {
  useGSAP(
    () => {
      let cur = -1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(count - 1, Math.floor(self.progress * count));
          if (i !== cur) {
            cur = i;
            onChange(i);
          }
        },
      });
    },
    { scope: root },
  );
}

/**
 * "Our journey so far" (Tresmares timeline): filled title, giant serif numerals spanning the page
 * with a grayscale image set in front, two dotted text columns and a row of tabs. The section is
 * pinned; scrolling (or clicking a tab) moves through the steps.
 */
export function Journey({ journey }: { journey: A["journey"] }) {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  usePinnedIndex(root, journey.steps.length, setI);
  const step = journey.steps[i];

  const jump = (k: number) => {
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * ((k + 0.5) / journey.steps.length), behavior: "smooth" });
  };

  return (
    <section ref={root} aria-labelledby="journey-title" className="relative bg-[#f5f5f3]" style={{ height: `${100 + journey.steps.length * 60}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-[14svh]">
        <FillText as="h1" id="journey-title" className="mx-auto max-w-[14ch] text-center font-serif text-[clamp(2.6rem,1rem+4.4vw,6rem)] leading-[0.98] font-light tracking-[-0.03em] text-navy">
          {journey.title}
        </FillText>

        <div className="relative mt-[4svh] flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={step.n}
              aria-hidden
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.7, ease }}
              className="pointer-events-none absolute inset-x-0 text-center font-serif text-[clamp(10rem,4rem+26vw,30rem)] leading-[0.8] font-light tracking-[-0.06em] text-green-deep"
            >
              {step.n}
            </motion.p>
          </AnimatePresence>
          {/* Grayscale image in front of the numerals, multiplied into them as on Tresmares. */}
          <div className="relative aspect-[16/9] w-[min(46vw,40rem)] overflow-hidden mix-blend-multiply">
            <Image src={journey.image} alt="" fill sizes="46vw" quality={90} className="object-cover grayscale" />
          </div>
        </div>

        <div className="container-page pb-[6svh]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step.n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease }} className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
              {step.points.map((p) => (
                <p key={p} className="flex gap-2 text-sm leading-snug text-ink">
                  <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" />
                  {p}
                </p>
              ))}
            </motion.div>
          </AnimatePresence>
          <ul className="mx-auto mt-8 flex max-w-3xl justify-between gap-2" aria-label="Areas">
            {journey.steps.map((s, k) => (
              <li key={s.n}>
                <button type="button" onClick={() => jump(k)} aria-current={k === i ? "true" : undefined} className={`font-serif text-base transition-colors duration-500 md:text-lg ${k === i ? "text-green-deep" : "text-ink/35 hover:text-ink/70"}`}>
                  {s.tab}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <ApprovalFlag>{journey.approval}</ApprovalFlag>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * "Our values" (Tresmares content-scroll-left): pinned dark full screen. The background image
 * changes per value; the value list sits top-left (active in white), the body text bottom-right
 * and a small italic metaphor bottom-left.
 */
export function Values({ values }: { values: A["values"] }) {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  usePinnedIndex(root, values.items.length, setI);
  const v = values.items[i];

  return (
    <section ref={root} aria-labelledby="values-label" className="relative bg-black text-white" style={{ height: `${values.items.length * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {values.items.map((it, k) => (
          <div key={it.src} aria-hidden className={`absolute inset-0 transition-opacity duration-[1.2s] ease-[var(--ease-calm)] ${k === i ? "opacity-100" : "opacity-0"}`}>
            <Image src={it.src} alt="" fill sizes="100vw" quality={90} className={`object-cover transition-transform duration-[2.4s] ease-[var(--ease-calm)] ${k === i ? "scale-100" : "scale-105"}`} />
          </div>
        ))}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-black/30" />

        <div className="relative flex h-full flex-col justify-between px-5 pt-[14svh] pb-8 md:px-10">
          <div className="flex gap-8 md:gap-[4vw]">
            <p id="values-label" className="pt-2 text-xs text-white/80">
              {values.label}
            </p>
            <ul>
              {values.items.map((it, k) => (
                <li key={it.name} className={`font-serif text-[clamp(1.6rem,1rem+1.6vw,2.4rem)] leading-tight transition-colors duration-700 ${k === i ? "text-white" : "text-white/35"}`}>
                  {it.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={`n-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="max-w-[13rem] text-[0.6875rem] leading-snug text-white/70 italic">
                {v.note}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`b-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease }}
                className="max-w-sm text-lg leading-snug text-white md:mr-[12vw] md:text-xl"
              >
                {v.body}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * "Your best partner" (Tresmares hero-right-media): giant title and lede on the left with a tall
 * image filling the right half; then a small image beside two paragraphs; then a filled statement.
 */
export function Partner({ partner }: { partner: A["partner"] }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo("[data-tall]", { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root },
  );
  return (
    <section ref={root} aria-labelledby="partner-title" className="bg-white pb-[10vw]">
      <div className="grid lg:grid-cols-2">
        <div className="px-5 pt-[16vw] md:px-10 lg:pl-[8.3vw]">
          <h2 id="partner-title" className="max-w-[9ch] font-serif text-[clamp(3rem,1rem+5.5vw,7rem)] leading-[0.92] font-light tracking-[-0.04em] text-navy">
            {partner.title}
          </h2>
          <p className="mt-[3vw] max-w-sm text-lg leading-snug text-ink">{partner.lede}</p>
        </div>
        <div className="relative mt-12 h-[70svh] overflow-hidden lg:mt-0 lg:h-[110svh]">
          <div data-tall className="absolute -inset-y-[10%] inset-x-0">
            <Image src={partner.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" quality={90} className="object-cover" />
          </div>
        </div>
      </div>
      <div className="mt-[8vw] grid gap-10 px-5 md:px-10 lg:grid-cols-12">
        <div className="relative aspect-[4/3] w-full max-w-sm lg:col-span-3 lg:col-start-2">
          <Image src={partner.smallImage} alt="" fill sizes="(min-width: 1024px) 22vw, 90vw" quality={90} className="object-cover" />
        </div>
        <div className="space-y-5 text-[0.9375rem] leading-relaxed text-ink lg:col-span-3 lg:col-start-7">
          {partner.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <div className="mt-[8vw] px-5 md:px-10 lg:grid lg:grid-cols-12">
        <FillText className="font-serif text-[clamp(1.9rem,1rem+2.4vw,3.4rem)] leading-[1.05] font-light tracking-[-0.025em] text-navy lg:col-span-6 lg:col-start-7">{partner.statement}</FillText>
      </div>
    </section>
  );
}

/**
 * Pinned background statements (Tresmares content-scroll-bg): full-screen images cross-fade under
 * a dark veil while each centred statement fills in; then a short list of points.
 */
export function ScrollStatements({ scroll }: { scroll: A["scroll"] }) {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const n = scroll.statements.length;
  usePinnedIndex(root, n + 1, (k) => setI(Math.min(k, n)));
  const showPoints = i >= n;

  return (
    <section ref={root} aria-label="How we work" className="relative bg-black text-white" style={{ height: `${(n + 1) * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {[...scroll.statements, scroll.pointsBg].map((s, k) => (
          <BgVideo key={s.video} src={s.video} poster={s.src} active={k === i} />
        ))}
        <div aria-hidden className={`absolute inset-0 transition-colors duration-700 ${showPoints ? "bg-black/35" : "bg-black/45"}`} />

        <div className="relative flex h-full items-center justify-center px-5 md:px-10">
          <AnimatePresence mode="wait">
            {!showPoints ? (
              <motion.h2
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease }}
                className="max-w-[20ch] text-center font-serif text-[clamp(2rem,1rem+2.9vw,3.6rem)] leading-[1.05] font-light tracking-[-0.025em]"
              >
                {scroll.statements[i].text}
              </motion.h2>
            ) : (
              <motion.div
                key="points"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                className="absolute inset-0 flex flex-col justify-between px-5 pt-[18svh] pb-[8svh] md:px-[10vw]"
              >
                <p className="mx-auto max-w-[34ch] text-center font-serif text-[clamp(1.8rem,1rem+2.6vw,3.6rem)] leading-[1.05] font-light tracking-[-0.025em] text-white">
                  {scroll.intro}
                </p>
                <ul className="grid gap-8 md:grid-cols-3 md:gap-[6vw]">
                  {scroll.points.map((p, k) => (
                    <li key={p} className="max-w-xs">
                      <PointIcon i={k} />
                      <p className="mt-6 text-base leading-snug text-white md:text-[1.0625rem]">{p}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/** Small solid geometric marks above each point, as on Tresmares. */
function PointIcon({ i }: { i: number }) {
  const shapes = [
    <path key="a" d="M2 2h12l8 8v12H10L2 14Z" />,
    <path key="b" d="M2 2h10c0 6 10 6 10 12v8H12c0-6-10-6-10-12Z" />,
    <path key="c" d="M2 22a10 10 0 0 1 20 0h-6a4 4 0 0 0-8 0Z" />,
  ];
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
      {shapes[i % shapes.length]}
    </svg>
  );
}

/** Full-bleed background clip: plays only while its step is active (poster image until loaded). */
function BgVideo({ src, poster, active }: { src: string; poster: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
    else v.pause();
  }, [active]);
  return (
    <div aria-hidden className={`absolute inset-0 transition-opacity duration-[1.2s] ${active ? "opacity-100" : "opacity-0"}`}>
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
    </div>
  );
}
