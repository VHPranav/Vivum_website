"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import type { Partner } from "@/content/en/partners";
import { ApprovalFlag } from "@/components/ui/Kit";
import { SplitLines } from "@/components/motion/Text";
import { useLenis } from "@/components/SmoothScroll";

const ease = [0.22, 1, 0.36, 1] as const;

/** Partners — after the Tresmares Capital Portfolio page: title, filters, tile grid, side panel. */
export function PartnersPage({ p, divisions, locale }: { p: Content["partnersPage"]; divisions: Content["divisions"]; locale: Locale }) {
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [active, setActive] = useState<Partner | null>(null);
  const lenis = useLenis();
  const areaName = (id: string) => divisions.find((d) => d.id === id)?.name ?? id;
  const types = useMemo(() => [...new Set(p.items.map((i) => i.type))], [p.items]);
  const shown = p.items.filter((i) => (!area || i.area === area) && (!type || i.type === type));

  useEffect(() => {
    if (active) lenis?.stop();
    else lenis?.start();
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, lenis]);

  return (
    <>
      <section aria-labelledby="partners-title" className="bg-white px-5 pt-[calc(4.5rem+10vw)] md:px-6 md:pt-[calc(4.5rem+7vw)]">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="order-2 flex flex-col justify-end md:order-1">
            <SplitLines as="p" on="load" delay={0.3} className="max-w-[17rem] text-[1.125rem] leading-[1.25] font-medium text-ink">
              {p.lede}
            </SplitLines>
          </div>
          <h1 id="partners-title" className="order-1 text-[clamp(3rem,1rem+6vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.035em] text-ink md:order-2">
            <SplitLines as="span" on="load" delay={0.1} className="block">
              {p.title[0]}
            </SplitLines>
            <SplitLines as="span" on="load" delay={0.2} className="block">
              {p.title[1]}
            </SplitLines>
          </h1>
        </div>

        <div className="mt-[4vw] pb-6">
          <p className="text-[0.675rem] text-ink/50">{p.filterLabel}</p>
          <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-3 md:w-1/2">
            <Select label={p.filters.area} value={area} onChange={setArea} all={p.all} options={divisions.map((d) => ({ v: d.id, l: d.name }))} />
            <Select label={p.filters.type} value={type} onChange={setType} all={p.all} options={types.map((t) => ({ v: t, l: t }))} />
          </div>
        </div>
      </section>

      <section aria-label={p.title.join(" ")} className="bg-white">
        <ul className="grid grid-cols-2 border-t border-l border-ink/10 md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="border-r border-b border-ink/10"
              >
                <button type="button" onClick={() => setActive(item)} className="group relative flex aspect-[5/4] w-full items-center justify-center overflow-hidden bg-white px-6 text-center">
                  <Image
                    src={item.photo}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    quality={85}
                    className="scale-105 object-cover opacity-0 grayscale transition-[opacity,transform] duration-700 ease-[var(--ease-calm)] group-hover:scale-100 group-hover:opacity-100"
                  />
                  <span className="relative transition-opacity duration-500 group-hover:opacity-0">
                    <span className="block text-[1.05rem] leading-tight font-semibold tracking-[0.04em] text-ink uppercase">{item.name}</span>
                    <span className="mt-1.5 block text-[0.65rem] text-ink/45">{p.placeholder}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div className="px-5 py-8 md:px-6">
          <ApprovalFlag>{p.approval}</ApprovalFlag>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ duration: 0.7 }} data-lenis-prevent>
            <motion.button
              type="button"
              aria-label={p.close}
              onClick={() => setActive(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-black/40"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="partner-name"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease }}
              className="absolute inset-y-0 right-0 flex w-full bg-[#f2f2f2] md:w-[80vw]"
            >
              <motion.div
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                transition={{ duration: 1, ease, delay: 0.15 }}
                className="relative hidden w-[45%] md:block"
              >
                <Image src={active.photo} alt="" fill sizes="36vw" quality={90} className="object-cover" />
              </motion.div>
              <div className="relative flex-1 overflow-y-auto px-6 py-16 md:px-[4vw] md:py-12">
                <button type="button" onClick={() => setActive(null)} aria-label={p.close} className="absolute top-5 right-5 flex h-6 w-6 items-center justify-center border border-ink/20 text-[0.8rem] text-ink">
                  ×
                </button>
                <h2 id="partner-name" className="text-[clamp(2rem,1rem+2.4vw,3rem)] leading-none font-medium tracking-[-0.02em] text-ink">
                  {active.name}
                </h2>
                <p className="mt-2 text-[0.75rem] text-ink/50">{p.placeholder}</p>
                <dl className="mt-10 max-w-sm">
                  {(
                    [
                      [p.rows.area, areaName(active.area)],
                      [p.rows.type, active.type],
                      [p.rows.location, active.location],
                      [p.rows.role, active.role],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-2.5">
                      <dt className="text-[0.625rem] font-bold tracking-[0.02em] text-ink uppercase">{k}</dt>
                      <dd className="text-right text-[0.7rem] text-ink/80">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-10 max-w-sm text-[0.95rem] leading-snug text-ink">{active.body}</p>
                <Link href={localePath(locale, `/contact?area=${active.area}`)} className="link-u mt-6 inline-block text-[0.8rem] font-medium text-ink">
                  {p.contact}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Select({ label, value, onChange, all, options }: { label: string; value: string; onChange: (v: string) => void; all: string; options: { v: string; l: string }[] }) {
  return (
    <label className="relative block border-b border-ink/20">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full cursor-pointer appearance-none bg-transparent py-2 pr-6 text-[0.95rem] text-ink outline-none">
        <option value="">{value ? all : label}</option>
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 8 12" aria-hidden className="pointer-events-none absolute top-1/2 right-0 h-3 w-2 -translate-y-1/2 text-ink" fill="currentColor">
        <path d="M4 0 8 4.5H0ZM4 12 0 7.5h8Z" />
      </svg>
    </label>
  );
}
