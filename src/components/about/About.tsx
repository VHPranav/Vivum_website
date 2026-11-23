"use client";

import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Content } from "@/content";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { FillText } from "@/components/motion/Text";
import { useLenis } from "@/components/SmoothScroll";

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
 * "One group, four areas" (after Tresmares' timeline, redesigned): pinned while you scroll through
 * the four areas. Left: animated numeral, area name, points and link. Right: the area's photo,
 * cross-fading. Bottom: tabs whose progress lines fill as each area is scrolled through.
 */
export function Journey({ journey, locale }: { journey: A["journey"]; locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [i, setI] = useState(0);
  const n = journey.steps.length;
  usePinnedIndex(root, n, setI);
  const step = journey.steps[i];

  useGSAP(
    () => {
      const bars = gsap.utils.toArray<HTMLElement>("[data-bar]");
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress * n;
          bars.forEach((b, k) => gsap.set(b, { scaleX: Math.max(0, Math.min(1, p - k)) }));
        },
      });
    },
    { scope: root },
  );

  const jump = (k: number) => {
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const target = top + (el.offsetHeight - window.innerHeight) * ((k + 0.5) / n);
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "instant" : "smooth" });
  };

  return (
    <section ref={root} id="journey" aria-label={journey.title} className="relative scroll-mt-20 bg-paper lg:h-[var(--journey-height)] lg:scroll-mt-0" style={{ "--journey-height": `${n * 90 + 40}svh` } as React.CSSProperties}>
      <div className="container-page py-16 lg:hidden">
        <p className="label">{journey.label}</p>
        <h2 id="journey-mobile-title" className="mt-3 text-3xl leading-tight font-light text-navy">{journey.title}</h2>
        <ol className="mt-10 space-y-12">
          {journey.steps.map((s) => (
            <li key={s.n}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={s.image} alt="" fill sizes="(min-width: 768px) 90vw, 100vw" quality={90} className="object-cover" />
              </div>
              <p className="mt-5 text-sm text-green-deep">{s.n}</p>
              <h3 className="mt-2 text-2xl leading-tight text-navy">{s.name}</h3>
              <ul className="mt-4 space-y-3 text-base leading-relaxed text-ink">
                {s.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <Link href={localePath(locale, s.href)} className="link-u mt-5 inline-block text-sm font-medium text-navy">Explore {s.tab.toLowerCase()}</Link>
            </li>
          ))}
        </ol>
      </div>
      <div className="sticky top-0 hidden h-svh flex-col overflow-hidden pt-[13svh] pb-[5svh] lg:flex">
        <div className="container-page flex items-end justify-between gap-6">
          <div>
            <p className="label">{journey.label}</p>
            <h2 id="journey-title" className="mt-3 font-serif text-[clamp(2rem,1rem+2.4vw,3.4rem)] leading-[1.02] font-light tracking-[-0.02em] text-navy">
              {journey.title}
            </h2>
          </div>

        </div>

        <div className="container-page mt-[4svh] grid min-h-0 flex-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="relative h-[clamp(5rem,2rem+9vw,11rem)] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={step.n}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0 font-serif text-[clamp(5rem,2rem+9vw,11rem)] leading-none font-light tracking-[-0.02em] text-green-deep"
                >
                  {step.n}
                </motion.p>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step.n} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }}>
                <h3 className="mt-4 font-serif text-[clamp(1.6rem,1rem+1.4vw,2.4rem)] leading-tight text-navy">{step.name}</h3>
                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {step.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={localePath(locale, step.href)} className="link-u mt-7 inline-block text-[0.875rem] font-medium text-navy">
                  Explore {step.tab.toLowerCase()}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative hidden h-full max-h-[58svh] min-h-0 overflow-hidden rounded-[1.75rem] lg:col-span-7 lg:block">
            {journey.steps.map((s, k) => (
              <div key={s.image} aria-hidden className={`absolute inset-0 transition-[opacity,transform] duration-[1.2s] ease-[var(--ease-calm)] ${k === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}>
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" quality={90} className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <ul className="container-page mt-[4svh] grid grid-cols-4 gap-3 md:gap-6" aria-label="Areas">
          {journey.steps.map((s, k) => (
            <li key={s.n}>
              <button type="button" onClick={() => jump(k)} aria-current={k === i ? "true" : undefined} className="group w-full text-left">
                <span aria-hidden className="block h-px w-full overflow-hidden bg-line">
                  <span data-bar className="block h-full w-full origin-left scale-x-0 bg-green-deep" />
                </span>
                <span className={`mt-3 flex items-baseline gap-2 text-[0.8125rem] transition-colors duration-500 md:text-sm ${k === i ? "text-navy" : "text-ink/45 group-hover:text-ink/75"}`}>
                  <span className="font-serif text-xs text-gold">{s.n}</span>
                  {s.tab}
                </span>
              </button>
            </li>
          ))}
        </ul>
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
          <h2 id="partner-title" className="max-w-[12ch] font-serif text-[clamp(2.25rem,0.9rem+3.4vw,4.5rem)] leading-[1] font-light tracking-[-0.02em] text-navy">
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
        <div className="space-y-5 text-base leading-relaxed text-ink md:text-lg lg:col-span-3 lg:col-start-7">
          {partner.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <div className="mt-[8vw] px-5 md:px-10 lg:grid lg:grid-cols-12">
        <FillText className="font-serif text-[clamp(1.9rem,1rem+2.4vw,3.4rem)] leading-[1.05] font-light tracking-[-0.02em] text-navy lg:col-span-6 lg:col-start-7">{partner.statement}</FillText>
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
          s.video ? (
            <BgVideo key={s.src} src={s.video} poster={s.src} active={k === i} />
          ) : (
            <div key={s.src} aria-hidden className={`absolute inset-0 transition-opacity duration-[1.2s] ${k === i ? "opacity-100" : "opacity-0"}`}>
              <Image src={s.src} alt="" fill sizes="100vw" quality={90} className="object-cover" />
            </div>
          )
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
                className="max-w-[20ch] text-center font-serif text-[clamp(2rem,1rem+2.9vw,3.6rem)] leading-[1.05] font-light tracking-[-0.02em]"
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
                <p className="mx-auto max-w-[34ch] text-center font-serif text-[clamp(1.8rem,1rem+2.6vw,3.6rem)] leading-[1.05] font-light tracking-[-0.02em] text-white">
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
