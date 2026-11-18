"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Extra delay for load animations while the first-visit intro is playing. */
export const introDelay = () => (typeof document !== "undefined" && document.documentElement.dataset.intro ? 1.65 : 0);

export const EXPO_OUT = "expo.out";
