"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";

/** Endless marquee that also nudges with scroll (Prime Exits contact line). */
export function Marquee({ text, className = "" }: { text: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to("[data-track]", { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      gsap.fromTo("[data-shift]", { xPercent: 4 }, { xPercent: -8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: root },
  );

  const run = (
    <span className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em]">
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className="flex items-center gap-[0.35em] whitespace-nowrap">
          {text}
          <span aria-hidden className="inline-block h-[0.14em] w-[0.14em] rounded-full bg-gradient-to-br from-green to-lime" />
        </span>
      ))}
    </span>
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`} aria-label={text} role="marquee">
      <div data-shift>
        <div data-track className="flex w-max" aria-hidden>
          {run}
          {run}
        </div>
      </div>
    </div>
  );
}

/** Live local time in Podgorica (Prime Exits shows its office time in the hero). */
export function LocalClock({ label }: { label: string }) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Podgorica", hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums">
      {label} <span aria-hidden>·</span> {time ?? "--:--"}
    </span>
  );
}

/**
 * First-visit intro (once per browser session): the wordmark rises, then five columns slide away
 * to reveal the page (Prime Exits preloader). Hidden by CSS unless the head script flagged it.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.dataset.intro) return;
      const done = () => {
        delete html.dataset.intro;
        try {
          sessionStorage.setItem("vivum-intro", "1");
        } catch {}
        window.dispatchEvent(new Event("vivum:intro-done"));
      };
      // Safety net: never leave the overlay up (e.g. if animation frames are throttled).
      const fallback = window.setTimeout(() => html.dataset.intro && done(), 4500);
      gsap
        .timeline({ onComplete: done })
        .from("[data-letter]", { yPercent: 110, duration: 0.7, stagger: 0.05, ease: "expo.out" }, 0.1)
        .from("[data-sub]", { opacity: 0, y: 8, duration: 0.5 }, 0.45)
        .to(["[data-letter]", "[data-sub]"], { yPercent: -110, opacity: 0, duration: 0.5, stagger: 0.03, ease: "power3.in" }, 1.0)
        .to("[data-col]", { yPercent: 100, duration: 1.05, stagger: -0.08, ease: "expo.inOut" }, 1.15);
      return () => window.clearTimeout(fallback);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="intro pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <div className="absolute inset-0 grid grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} data-col className="block h-full bg-navy-ink" style={{ marginLeft: i ? -1 : 0 }} />
        ))}
      </div>
      <div className="relative m-auto text-center text-white">
        <div className="flex overflow-hidden font-serif text-5xl tracking-[0.32em] md:text-7xl">
          {"VIVUM".split("").map((l, i) => (
            <span key={i} data-letter className="inline-block">
              {l}
            </span>
          ))}
        </div>
        <div className="overflow-hidden">
          <p data-sub className="mt-3 text-[0.6875rem] tracking-[0.5em] text-lime">
            GROUP
          </p>
        </div>
      </div>
    </div>
  );
}
