"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { useLenis } from "@/components/SmoothScroll";
import { Media } from "@/components/ui/Media";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { areaTone } from "./AreaCards";

/**
 * Pinned, full-screen showcase of the four areas (Tresmares "content scroll center").
 * The section is one viewport tall per area; while it is pinned, scrolling swaps the area:
 * title words slide through a mask in the scroll direction, the image cross-fades and the
 * anchor tabs follow. Phones get a simple stacked version.
 */
export function AreaShowcase({ locale, divisions }: { locale: Locale; divisions: Content["divisions"] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const count = divisions.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-item]");
        const images = gsap.utils.toArray<HTMLElement>("[data-image]");
        const words = items.map((it) => it.querySelectorAll<HTMLElement>("[data-word]"));
        const fades = items.map((it) => it.querySelectorAll<HTMLElement>("[data-fade]"));
        const reduced = prefersReducedMotion();

        gsap.set(images, { opacity: 0 });
        gsap.set(images[0], { opacity: 1 });
        items.forEach((_, i) => {
          if (i === 0) return;
          gsap.set(words[i], { yPercent: 100 });
          gsap.set(fades[i], { opacity: 0 });
        });

        // Images drift up into place as the section arrives.
        if (!reduced) {
          gsap.fromTo("[data-images]", { yPercent: -12 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true } });
        }

        let current = 0;
        const go = (next: number, dir: number) => {
          if (next === current) return;
          const prev = current;
          current = next;
          setActive(next);
          const d = reduced ? 0 : 0.6;
          gsap.killTweensOf([words[prev], words[next], fades[prev], fades[next], images[prev], images[next]]);
          gsap.to(words[prev], { yPercent: dir > 0 ? -100 : 100, duration: d, ease: "power2.out", stagger: 0.015 });
          gsap.to(fades[prev], { opacity: 0, duration: d * 0.6 });
          gsap.to(images[prev], { opacity: 0, duration: d, delay: d * 0.6, ease: "power2.out" });
          gsap.fromTo(words[next], { yPercent: dir > 0 ? 100 : -100 }, { yPercent: 0, duration: d, ease: "power2.out", stagger: 0.015, delay: d * 0.25 });
          gsap.to(fades[next], { opacity: 1, duration: d, delay: d * 0.6 });
          gsap.to(images[next], { opacity: 1, duration: d, ease: "power2.out" });
        };

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => go(Math.min(count - 1, Math.floor(self.progress * count)), self.direction),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const jump = (i: number) => {
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const target = top + (el.offsetHeight - window.innerHeight) * ((i + 0.5) / count);
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: pinned showcase */}
      <section ref={root} aria-label="Our four areas" className="relative hidden bg-navy-ink text-white lg:block" style={{ height: `${count * 100}svh` }}>
        <div className="sticky top-0 h-svh overflow-hidden">
          <div data-images className="absolute inset-0">
            {divisions.map((d) => (
              <div key={d.id} data-image className="absolute inset-0">
                {/* Full-bleed crop at viewport size. */}
                <Media need={d.imageNeed} tone={areaTone[d.id]} sizes="100vw" labelClass="top-28 left-10" className="h-full w-full" />
              </div>
            ))}
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,29,58,0.15),rgba(11,29,58,0.7))]" />
          </div>

          <ul className="absolute inset-x-0 top-24 z-10 flex justify-center gap-2" aria-label="Areas">
            {divisions.map((d, i) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active === i ? "true" : undefined}
                  className={`rounded-full px-4 py-2 text-[0.8125rem] transition-colors duration-500 ${active === i ? "bg-white text-navy" : "text-white/70 hover:text-white"}`}
                >
                  {d.short}
                </button>
              </li>
            ))}
          </ul>

          {divisions.map((d, i) => (
            <div key={d.id} data-item className={`absolute inset-0 ${active === i ? "" : "pointer-events-none"}`} aria-hidden={active !== i}>
              <Link href={localePath(locale, d.href)} tabIndex={active === i ? 0 : -1} className="absolute inset-0 z-0" aria-label={`${d.name}: ${d.cardCta}`} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-10">
                <h3 className="display-xl max-w-[14ch] text-center">
                  {d.name.split(" ").map((w, k) => (
                    <span key={k} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                      <span data-word className="inline-block">
                        {w}&nbsp;
                      </span>
                    </span>
                  ))}
                </h3>
              </div>
              <div data-fade className="pointer-events-none absolute bottom-10 left-10 max-w-xs">
                <p className="font-serif text-sm text-white/60">{d.n} / 0{count}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/85">{d.description}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-medium">
                  <span className="link-u">{d.cardCta}</span>
                </p>
              </div>
              <dl data-fade className="pointer-events-none absolute right-10 bottom-10 w-60 space-y-5 text-[0.8125rem]">
                <div>
                  <dt className="text-white/50">For</dt>
                  <dd className="mt-1 text-white/90">{d.audience}</dd>
                </div>
                <div>
                  <dt className="text-white/50">Focus</dt>
                  <dd className="mt-1 space-y-0.5 text-white/90">
                    {d.highlights.map((h) => (
                      <span key={h} className="block">
                        {h}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50">Next step</dt>
                  <dd className="mt-1 text-lime">{d.pageCta}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Phones & tablets: stacked */}
      <section aria-label="Our four areas" className="bg-navy-ink py-16 text-white lg:hidden">
        <ul className="container-page grid gap-10 md:grid-cols-2">
          {divisions.map((d) => (
            <li key={d.id}>
              <Link href={localePath(locale, d.href)} className="group block">
                <Media need={d.imageNeed} tone={areaTone[d.id]} sizes="(min-width: 768px) 46vw, 92vw" className="aspect-[4/3] rounded-[1.5rem]" />
                <p className="mt-5 font-serif text-sm text-white/60">{d.n}</p>
                <h3 className="mt-1 font-serif text-3xl leading-tight font-light">{d.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{d.description}</p>
                <p className="mt-3 text-[0.8125rem] text-white/60">{d.highlights.join(" · ")}</p>
                <span className="mt-4 inline-flex text-[0.8125rem] font-medium">
                  <span className="link-u">{d.pageCta}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
