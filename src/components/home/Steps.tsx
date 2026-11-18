"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Numbered process steps; a gold line draws across (or down, on phones) as the row scrolls into view. */
export function Steps({ steps, tone = "light" }: { steps: { title: string; body: string }[]; tone?: "light" | "dark" }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-line]", { scaleX: 0, scaleY: 0 }, {
        scaleX: 1,
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 55%", scrub: true },
      });
      gsap.from("[data-step]", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
    },
    { scope: root },
  );

  const dark = tone === "dark";
  const cols = steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <ol ref={root} className={`relative grid gap-10 md:grid-cols-2 md:gap-x-8 lg:gap-6 ${cols}`}>
      <span aria-hidden className={`absolute top-0 bottom-0 left-[1.1875rem] w-px md:hidden ${dark ? "bg-white/15" : "bg-line"}`}>
        <span data-line className="block h-full w-full origin-top bg-gradient-to-b from-gold to-gold-soft" />
      </span>
      <span aria-hidden className={`absolute top-[1.1875rem] right-0 left-0 hidden h-px lg:block ${dark ? "bg-white/15" : "bg-line"}`}>
        <span data-line className="block h-full w-full origin-left bg-gradient-to-r from-gold to-gold-soft" />
      </span>
      {steps.map((s, i) => (
        <li key={s.title} data-step className="relative pl-14 md:pl-0">
          <span
            className={`absolute top-0 left-0 flex h-[2.375rem] w-[2.375rem] items-center justify-center rounded-full border font-serif text-sm md:relative ${
              dark ? "border-white/30 bg-navy-ink text-white" : "border-line bg-paper text-navy"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={`font-serif text-xl font-normal md:mt-6 ${dark ? "text-white" : "text-navy"}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
