"use client";

import { useRef, type ElementType } from "react";
import { EXPO_OUT, gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Every descendant marked `data-rise` lifts, scales and fades in as it enters the viewport,
 * staggered by its horizontal position so rows sweep left to right (Tresmares "magnet" items).
 */
export function Rise({ as: Tag = "div", children, className, id }: { as?: ElementType; children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-rise]");
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1 });
        return;
      }
      items.forEach((item) => {
        gsap.set(item, { y: 60, scale: 0.96, opacity: 0 });
        ScrollTrigger.create({
          trigger: item,
          start: "top 94%",
          once: true,
          onEnter: () =>
            gsap.to(item, { y: 0, scale: 1, opacity: 1, ease: EXPO_OUT, duration: 1.2, delay: item.getBoundingClientRect().left * 0.00025 }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
