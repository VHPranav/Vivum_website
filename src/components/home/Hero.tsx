"use client";

import { useRef } from "react";
import type { Content } from "@/content";
import { Button } from "@/components/ui/Kit";
import { Waves } from "@/components/ui/Waves";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { SplitLines } from "@/components/motion/Text";
import { LocalClock } from "@/components/motion/Bits";

/**
 * Opening section. Layout follows Tresmares' full-text hero (giant headline top-left, short text
 * block bottom-right, "Scroll" cue bottom-left) with Prime Exits' masked line entrance and live
 * local clock. The soft blue-green light zooms and fades as you scroll, as Tresmares' clouds do.
 */
export function Hero({ hero, ui }: { hero: Content["home"]["hero"]; ui: Content["ui"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-bg]", { scale: 1.25, opacity: 0.35, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-copy]", { yPercent: -14, ease: "none", scrollTrigger: st });
      gsap.utils.toArray<HTMLElement>("[data-blob]").forEach((b, i) => {
        gsap.to(b, { xPercent: i % 2 ? -12 : 14, yPercent: i % 2 ? 10 : -8, duration: 9 + i * 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
      gsap.fromTo("[data-cue]", { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 1.2, ease: "expo.inOut", repeat: -1, repeatDelay: 0.6, yoyo: true });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex flex-col overflow-hidden bg-paper pt-24 md:pt-28 lg:min-h-svh">
      <div data-hero-bg aria-hidden className="absolute inset-0 origin-[70%_40%]">
        <div data-blob className="absolute -top-[20%] right-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,#d6e6f4,transparent)]" />
        <div data-blob className="absolute top-[25%] -left-[20%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(closest-side,#e3efd6,transparent)]" />
        <div data-blob className="absolute right-[15%] bottom-[-25%] h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(closest-side,rgba(47,111,179,0.16),transparent)]" />
        <Waves className="absolute inset-x-0 bottom-0 h-44 w-[200%] md:h-64" />
      </div>

      <div data-hero-copy className="container-page relative flex flex-1 flex-col">
        <p className="label fade-rise flex items-center gap-2" style={{ animationDelay: "0.2s" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
          {hero.label}
        </p>

        <SplitLines as="h1" on="load" delay={0.15} className="display-xl mt-6 max-w-[13ch] text-navy md:mt-10">
          {hero.h1}
        </SplitLines>

        <div className="mt-8 grid items-end gap-8 pb-8 md:mt-14 md:gap-10 lg:flex-1 lg:grid-cols-12 lg:pb-10">
          <div className="lg:col-span-4 lg:col-start-9">
            <SplitLines as="p" on="load" delay={0.45} stagger={0.05} className="text-lg leading-relaxed text-ink/80 md:text-xl">
              {hero.lede}
            </SplitLines>
            <div className="fade-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: "0.9s" }}>
              <Button href={hero.primary.href}>{hero.primary.label}</Button>
              <a href={hero.secondary.href} className="link-u text-[0.875rem] font-medium text-navy">
                {hero.secondary.label}
              </a>
            </div>
          </div>
          <div className="label flex items-end justify-between lg:col-span-12 lg:row-start-2">
            <span className="flex items-center gap-3">
              <span aria-hidden className="relative h-8 w-px overflow-hidden bg-navy/15">
                <span data-cue className="absolute inset-0 bg-navy" />
              </span>
              {ui.scroll}
            </span>
            <LocalClock label={ui.localTime} />
          </div>
        </div>
      </div>
    </section>
  );
}
