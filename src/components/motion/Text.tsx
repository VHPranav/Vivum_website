"use client";

import { useRef, type ElementType } from "react";
import { EXPO_OUT, gsap, introDelay, prefersReducedMotion, SplitText, useGSAP } from "./gsap";

type Props = {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/**
 * Lines rise out of a mask (Prime Exits hero / Tresmares titles).
 * `on="load"` plays on first paint (after the intro, if it runs); `on="scroll"` when it enters view.
 */
export function SplitLines({ as: Tag = "div", children, className, id, on = "scroll", delay = 0, stagger = 0.08 }: Props & { on?: "load" | "scroll"; delay?: number; stagger?: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line",
        onSplit(self) {
          gsap.set(el, { visibility: "visible" });
          // Masks are cut to the line box, which clips descenders (g, p, y) at tight leading.
          // Give them room above and below without changing the layout.
          gsap.set(self.masks, { paddingTop: "0.1em", paddingBottom: "0.25em", marginTop: "-0.1em", marginBottom: "-0.25em" });
          return gsap.from(self.lines, {
            yPercent: 140,
            duration: 1.25,
            ease: EXPO_OUT,
            stagger,
            delay: delay + (on === "load" ? introDelay() : 0),
            scrollTrigger: on === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-split="" className={className}>
      {children}
    </Tag>
  );
}

/** Letters fill from faint to solid as you scroll through the statement (Tresmares "--fill" titles). */
export function FillText({ as: Tag = "p", children, className, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      SplitText.create(el, {
        type: "words,chars",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: "visible" });
          return gsap.fromTo(
            self.chars,
            { opacity: 0.14 },
            { opacity: 1, ease: "none", stagger: 0.02, scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 55%", scrub: true } },
          );
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-split="" className={className}>
      {children}
    </Tag>
  );
}
