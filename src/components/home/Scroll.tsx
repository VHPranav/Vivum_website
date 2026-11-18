"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { SplitLines } from "@/components/motion/Text";

/**
 * Benefits as a horizontal row that scrolls sideways while the section is pinned
 * (Prime Exits "trust"). Phones swipe the row natively.
 */
export function BenefitsScroller({ label, title, items }: { label: string; title: string; items: { title: string; body: string }[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const distance = () => (track.current ? track.current.scrollWidth - window.innerWidth : 0);
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
        });
        gsap.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="why-title" className="overflow-hidden py-24 md:py-32 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
            {label}
          </p>
          <SplitLines as="h2" id="why-title" className="display-m mt-5 max-w-[16ch] text-navy">
            {title}
          </SplitLines>
        </div>
        <div aria-hidden className="hidden h-px w-56 overflow-hidden bg-line lg:block">
          <span data-progress className="block h-full origin-left bg-gradient-to-r from-green to-lime" />
        </div>
      </div>
      <ul
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mt-16 md:px-10 lg:w-max lg:snap-none lg:overflow-visible lg:pr-[12vw]"
        data-lenis-prevent-touch
      >
        {items.map((it, i) => (
          <li
            key={it.title}
            className="relative flex min-h-[22rem] w-[82vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 sm:w-[24rem] md:min-h-[26rem] md:p-9 lg:w-[30rem]"
          >
            <span className="font-serif text-[4.5rem] leading-none font-light text-sky md:text-[6rem]" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-serif text-[1.75rem] leading-tight text-navy md:text-[2rem]">{it.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{it.body}</p>
            </div>
            <span aria-hidden className="absolute top-8 right-8 h-2 w-2 rounded-full bg-gradient-to-br from-green to-lime" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Numbered process with a line that fills as you read down; each step lights up as the line
 * reaches it (Prime Exits "exit flow").
 */
export function ProcessFlow({ label, title, steps, tone = "light" }: { label: string; title: string; steps: { title: string; body: string }[]; tone?: "light" | "dark" }) {
  const root = useRef<HTMLElement>(null);
  const dark = tone === "dark";

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-step]", { opacity: 1 });
        return;
      }
      gsap.fromTo("[data-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 60%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
        gsap.set(step, { opacity: 0.3 });
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          onEnter: () => gsap.to(step, { opacity: 1, duration: 0.5 }),
          onLeaveBack: () => gsap.to(step, { opacity: 0.3, duration: 0.5 }),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="flow-title" className={`py-24 md:py-36 ${dark ? "bg-navy-ink text-white" : ""}`}>
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className={`label flex items-center gap-2 ${dark ? "!text-white/60" : ""}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
              {label}
            </p>
            <SplitLines as="h2" id="flow-title" className={`display-m mt-5 max-w-[14ch] ${dark ? "text-white" : "text-navy"}`}>
              {title}
            </SplitLines>
          </div>
        </div>
        <ol data-steps className="relative lg:col-span-7 lg:col-start-6">
          <span aria-hidden className={`absolute top-2 bottom-2 left-[1.15rem] w-px ${dark ? "bg-white/15" : "bg-line"}`}>
            <span data-fill className="block h-full w-full origin-top bg-gradient-to-b from-green to-lime" />
          </span>
          {steps.map((s, i) => (
            <li key={s.title} data-step className="relative grid grid-cols-[2.5rem_1fr] gap-5 pb-14 last:pb-0 md:gap-8">
              <span
                className={`relative z-[1] flex h-[2.3rem] w-[2.3rem] items-center justify-center rounded-full border font-serif text-sm ${
                  dark ? "border-white/25 bg-navy-ink text-white" : "border-line bg-paper text-navy"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-0.5">
                <h3 className={`font-serif text-[1.6rem] leading-tight md:text-[2rem] ${dark ? "text-white" : "text-navy"}`}>{s.title}</h3>
                <p className={`mt-3 max-w-xl text-[0.9375rem] leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
