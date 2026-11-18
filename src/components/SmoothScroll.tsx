"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  // Every page opens at the top: stop the browser restoring the old position on reload/back.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      autoRaf: false,
      anchors: { offset: -88 },
      lerp: 0.08,
      smoothWheel: true,
      // Phones: smooth touch scrolling too, not only the wheel.
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchInertiaExponent: 1.7,
      gestureOrientation: "vertical",
    });

    // Hold scrolling while the first-visit intro plays.
    const resume = () => instance.start();
    if (document.documentElement.dataset.intro) instance.stop();
    window.addEventListener("vivum:intro-done", resume);

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- expose the instance once it exists
    setLenis(instance);

    return () => {
      window.removeEventListener("vivum:intro-done", resume);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // On every route change, jump (not glide) to the top — Lenis keeps its own position.
  useEffect(() => {
    if (window.location.hash) return; // in-page anchor links keep their target
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
