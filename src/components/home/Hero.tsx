"use client";

import Link from "next/link";
import { useRef } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { FillText, SplitLines } from "@/components/motion/Text";
import { Clouds, Ridges } from "./Clouds";

/**
 * Opening + About, staged as on Tresmares: a landscape with WebGL clouds drifting in front and a
 * giant headline. Scrolling raises the cloud bank until it fills the screen with white, and the
 * About statement fills in letter by letter on that white.
 * The background stays pinned (sticky) across both sections.
 */
export function Hero({ locale, hero, about, ui }: { locale: Locale; hero: Content["home"]["hero"]; about: Content["home"]["about"]; ui: Content["ui"] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: wrap.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => (progress.current = self.progress),
      });
      if (prefersReducedMotion()) return;
      gsap.to("[data-ridges]", { scale: 1.16, yPercent: -4, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top top", end: "bottom bottom", scrub: true } });
      gsap.to("[data-hero-copy]", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom 15%", scrub: true } });
      gsap.fromTo("[data-cue]", { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 1.2, ease: "expo.inOut", repeat: -1, repeatDelay: 0.6, yoyo: true });
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className="relative">
      {/* Pinned background: landscape (photo stand-in) + clouds */}
      <div aria-hidden className="sticky top-0 h-svh overflow-hidden bg-paper">
        <div data-ridges className="absolute inset-0 origin-[50%_80%]">
          <Ridges />
        </div>
        <Clouds progressRef={progress} className="peer absolute inset-0 [&[data-fallback]]:hidden" />
        {/* No WebGL: a soft static cloud bank instead. */}
        <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-paper via-paper/80 to-transparent peer-data-[fallback]:block" />
      </div>

      {/* Opening */}
      <section data-hero aria-labelledby="hero-title" className="relative z-10 -mt-[100svh] h-svh">
        <div data-hero-copy className="container-page relative h-full">
          <SplitLines as="h1" id="hero-title" on="load" delay={0.15} className="display-xl absolute top-[19svh] left-5 max-w-[12ch] text-navy md:left-10 lg:top-[22svh] lg:left-[8.3%]">
            {hero.h1}
          </SplitLines>
          <div className="absolute right-5 bottom-[12svh] left-5 md:right-auto md:left-[50%] md:max-w-sm lg:left-[66.6%] lg:max-w-[20rem]">
            <SplitLines as="p" on="load" delay={0.5} stagger={0.05} className="text-[1.25rem] leading-[1.2] tracking-[-0.01em] text-navy-ink md:text-[1.5rem]">
              {hero.lede}
            </SplitLines>
            <a href={hero.primary.href} className="link-u fade-rise mt-6 inline-block text-[0.875rem] font-medium text-navy-ink" style={{ animationDelay: "1s" }}>
              {hero.primary.label}
            </a>
          </div>
          <span className="label absolute bottom-[12svh] left-5 hidden items-center gap-3 md:left-10 md:flex">
            <span aria-hidden className="relative h-8 w-px overflow-hidden bg-navy/15">
              <span data-cue className="absolute inset-0 bg-navy" />
            </span>
            {ui.scroll}
          </span>
        </div>
      </section>

      {/* About — centred statement over the white the clouds leave behind */}
      <section id="about" aria-labelledby="about-label" className="relative z-10 flex min-h-[130svh] items-center justify-center pt-[30svh] pb-[20svh]">
        <div className="container-page text-center">
          <h2 id="about-label" className="label">
            {about.label}
          </h2>
          <FillText className="mx-auto mt-6 max-w-[22ch] font-serif text-[clamp(2rem,1rem+2.9vw,3.6rem)] leading-[1.05] font-light tracking-[-0.025em] text-navy">
            {about.statement}
          </FillText>
          <Link href={localePath(locale, about.link.href)} className="link-u mt-10 inline-block text-[0.875rem] font-medium text-navy-ink">
            {about.link.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
