"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

export type CarouselItem = { src: string; caption: string; href: string };

/**
 * Footer image carousel (Tresmares footer): an endless row of large square photos that drifts
 * slowly on its own and is pushed along — in either direction — by scrolling.
 */
export function FooterCarousel({ items }: { items: CarouselItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const loop = gsap.to(track.current, { xPercent: -50, duration: 80, ease: "none", repeat: -1 });
      let boost = gsap.to({}, {});
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity() / 120; // scroll speed → playback speed
          boost.kill();
          const target = gsap.utils.clamp(-12, 12, v || 1);
          loop.timeScale(target === 0 ? 1 : target);
          boost = gsap.to(loop, { timeScale: target < 0 ? -1 : 1, duration: 1.2, ease: "power2.out", delay: 0.05 });
        },
      });
    },
    { scope: root },
  );

  const row = (copy: number) =>
    items.map((it, k) => (
      <li key={`${copy}-${k}`} className="shrink-0 pr-[4vw]" aria-hidden={copy === 1}>
        <Link href={it.href} tabIndex={copy === 1 ? -1 : 0} className="group block w-[clamp(13rem,22vw,26rem)]">
          <div className="relative aspect-square overflow-hidden bg-mist">
            <Image
              src={it.src}
              alt={copy === 1 ? "" : it.caption}
              fill
              sizes="(min-width: 1024px) 22vw, 13rem"
              quality={90}
              className="object-cover grayscale-[25%] transition-[transform,filter] duration-[1.2s] ease-[var(--ease-calm)] group-hover:scale-[1.04] group-hover:grayscale-0"
            />
          </div>
          <p className="mt-4 text-sm text-ink/70 transition-colors group-hover:text-navy">{it.caption}</p>
        </Link>
      </li>
    ));

  return (
    <div ref={root} className="overflow-hidden" data-lenis-prevent-touch>
      <ul ref={track} className="flex w-max">
        {row(0)}
        {row(1)}
      </ul>
    </div>
  );
}
