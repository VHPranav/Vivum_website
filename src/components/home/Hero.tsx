"use client";

import Link from "next/link";
import { useRef } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { FillText, SplitLines } from "@/components/motion/Text";
import Image from "next/image";
import { Clouds } from "./Clouds";

/**
 * Opening + About, staged as on Tresmares: a landscape with WebGL clouds drifting in front and a
 * giant headline. Scrolling raises the cloud bank until it fills the screen with white, and the
 * About statement fills in letter by letter on that white.
 * The background stays pinned (sticky) across both sections.
 */
type HeroCopy = { h1: React.ReactNode; lede: string; primary: { label: string; href: string } };
type StatementCopy = { label: string; statement: string; link: { label: string; href: string } };

export function Hero({
  locale,
  hero,
  about,
  ui,
  image = "/images/vivum-hero.webp",
  statementId = "about",
  wash = false,
}: {
  locale: Locale;
  hero: HeroCopy;
  about: StatementCopy;
  ui: Content["ui"];
  /** Landscape behind the clouds (self-hosted). */
  image?: string;
  statementId?: string;
  /** Soft page-white fade behind the headline, for landscapes with dark rock on the left. */
  wash?: boolean;
}) {
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
    <div ref={wrap} className="relative overflow-x-clip">
      {/* Pinned background: landscape (photo stand-in) + clouds */}
      <div aria-hidden className="sticky top-0 h-svh overflow-hidden bg-paper">
        <div data-ridges className="absolute inset-0 origin-[50%_80%]">
          {/* AI-generated in Google Flow (client approval required); full-bleed crop. */}
          <Image src={image} alt="" fill preload quality={90} sizes="100vw" className="object-cover object-[60%_center]" />
        </div>
        {wash && <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-paper/85 via-paper/55 to-transparent" />}
        <Clouds progressRef={progress} className="peer absolute inset-0 [&[data-fallback]]:hidden" />
        {/* No WebGL: a soft static cloud bank instead. */}
        <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-paper via-paper/80 to-transparent peer-data-[fallback]:block" />
      </div>

      {/* Opening */}
      <section data-hero aria-labelledby="hero-title" className="relative z-10 -mt-[100svh] min-h-[max(100svh,40rem)] md:h-svh md:min-h-0">
        <div data-hero-copy className="container-page relative flex min-h-[inherit] flex-col justify-between gap-10 pt-[max(7rem,19svh)] pb-[8svh] md:block md:h-full md:min-h-0 md:py-0">
          <SplitLines as="h1" id="hero-title" on="load" delay={0.15} className="max-w-[13ch] font-serif text-[clamp(2.25rem,10vw,3rem)] leading-[1.02] font-medium tracking-[-0.02em] text-navy md:absolute md:top-[19svh] md:left-10 md:text-[clamp(3rem,0.8rem+5.8vw,8rem)] md:leading-[0.96] lg:top-[22svh] lg:left-[8.3%]">
            {hero.h1}
          </SplitLines>
          <div className="isolate relative md:absolute md:bottom-[12svh] md:right-auto md:left-[50%] md:max-w-sm lg:left-[66.6%] lg:max-w-[20rem]">
            {/* soft cloud bank behind the lede so it always reads over the ridge */}
            <div aria-hidden className="pointer-events-none absolute -inset-x-[45%] -inset-y-[70%] -z-10 rounded-[50%] bg-[radial-gradient(closest-side,rgba(251,250,246,0.95),rgba(251,250,246,0.75)_45%,rgba(251,250,246,0)_100%)] blur-2xl" />
            <SplitLines as="p" on="load" delay={0.5} stagger={0.05} className="text-[1.25rem] leading-[1.25] font-medium tracking-[-0.01em] text-navy-ink md:text-[1.5rem]">
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
      <section id={statementId} aria-labelledby={`${statementId}-label`} className="relative z-10 flex min-h-[130svh] items-center justify-center pt-[30svh] pb-[20svh]">
        <div className="container-page text-center">
          <h2 id={`${statementId}-label`} className="label">
            {about.label}
          </h2>
          <FillText className="mx-auto mt-6 max-w-[22ch] font-serif text-[clamp(2rem,1rem+2.9vw,3.6rem)] leading-[1.05] font-light tracking-[-0.02em] text-navy">
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
