"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Content } from "@/content";
import { Button } from "@/components/ui/Kit";
import { Waves } from "@/components/ui/Waves";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Homepage opening: headline rises on first paint (CSS); GSAP eases the copy out as you scroll. */
export function Hero({ hero }: { hero: Content["home"]["hero"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to("[data-hero-copy]", {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-glow]", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-paper pt-32 pb-36 md:pt-44 md:pb-48 lg:min-h-[88svh]">
      {/* Soft blue-green light, echoing the identity sheet's wave motif */}
      <div data-hero-glow aria-hidden className="absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[38rem] w-[38rem] rounded-full bg-sky blur-3xl" />
        <div className="absolute top-1/3 -left-48 h-[30rem] w-[30rem] rounded-full bg-mist blur-3xl" />
      </div>

      <div data-hero-copy className="container-page relative">
        <h1 className="max-w-5xl text-navy">
          <span className="fade-rise eyebrow mb-6 flex items-center gap-3 text-green-deep" style={{ animationDelay: "0.1s" }}>
            <span className="gold-rule" aria-hidden />
            {hero.h1Lead.replace(/\s*—\s*$/, "")}
            <span className="sr-only"> — </span>
          </span>
          {hero.h1.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span className="rise-line heading-display block" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
                {line}
              </span>{" "}
            </span>
          ))}
        </h1>
        <p className="fade-rise mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg" style={{ animationDelay: "0.55s" }}>
          {hero.lede}
        </p>
        <div className="fade-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.7s" }}>
          <Button href={hero.primary.href}>{hero.primary.label}</Button>
          <Button href={hero.secondary.href} variant="outline">
            {hero.secondary.label}
          </Button>
        </div>
      </div>

      <Waves className="absolute inset-x-0 bottom-0 h-40 w-[200%] md:h-56" />
    </section>
  );
}
