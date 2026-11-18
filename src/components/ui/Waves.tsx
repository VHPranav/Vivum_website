"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// One period of a soft wave, 1440 wide; drawn twice so it can loop seamlessly.
const wave = (amp: number, base: number, phase = 0) => {
  const seg = (x0: number) =>
    `C${x0 + 240},${base - amp + phase} ${x0 + 480},${base + amp - phase} ${x0 + 720},${base} ` +
    `S${x0 + 1200},${base - amp} ${x0 + 1440},${base}`;
  return `M0,${base} ${seg(0)} ${seg(1440)} L2880,400 L0,400 Z`;
};

type Props = { className?: string; variant?: "light" | "dark"; drift?: boolean };

/** The brand's soft blue-green wave motif. Layers drift slowly (GSAP) and part with scroll. */
export function Waves({ className = "", variant = "light", drift = true }: Props) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const layers = gsap.utils.toArray<SVGGElement>("[data-wave]");
      if (drift) {
        layers.forEach((layer, i) => {
          gsap.fromTo(layer, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38 + i * 14, ease: "none", repeat: -1 });
        });
      }
      layers.forEach((layer, i) => {
        gsap.to(layer, {
          y: (i + 1) * -14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  const dark = variant === "dark";
  const id = `w-${variant}`;
  return (
    <svg ref={root} viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden className={`pointer-events-none overflow-visible ${className}`}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" x2="1">
          <stop offset="0" stopColor={dark ? "#2f6fb3" : "#cfe1f1"} stopOpacity={dark ? 0.35 : 0.9} />
          <stop offset="1" stopColor={dark ? "#8bc34a" : "#dcecc6"} stopOpacity={dark ? 0.25 : 0.9} />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0" x2="1">
          <stop offset="0" stopColor={dark ? "#8bc34a" : "#e3efd6"} stopOpacity={dark ? 0.22 : 0.85} />
          <stop offset="1" stopColor={dark ? "#2f6fb3" : "#d6e6f4"} stopOpacity={dark ? 0.3 : 0.85} />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="0" x2="1">
          <stop offset="0" stopColor={dark ? "#ffffff" : "#ffffff"} stopOpacity={dark ? 0.06 : 0.7} />
          <stop offset="1" stopColor={dark ? "#c9a23a" : "#f3ead0"} stopOpacity={dark ? 0.18 : 0.6} />
        </linearGradient>
      </defs>
      <g data-wave>
        <path d={wave(46, 210, 10)} fill={`url(#${id}-a)`} />
      </g>
      <g data-wave>
        <path d={wave(38, 262, -8)} fill={`url(#${id}-b)`} />
      </g>
      <g data-wave>
        <path d={wave(22, 318, 4)} fill={`url(#${id}-c)`} />
      </g>
    </svg>
  );
}
