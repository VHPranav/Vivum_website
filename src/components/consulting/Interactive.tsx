"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Content } from "@/content";
import { useLenis } from "@/components/SmoothScroll";
import { Arrow } from "@/components/ui/Kit";

type K = Content["consulting"];
const ease = [0.22, 1, 0.36, 1] as const;
const EVENT = "vivum:select-service";

/** "If your problem is… choose…" — each problem points to a service and can open it below. */
export function ProblemMatcher({ problems, categories }: { problems: K["who"]["problems"]; categories: K["services"]["categories"] }) {
  const [i, setI] = useState(0);
  const lenis = useLenis();
  const p = problems[i];
  const cat = categories.find((c) => c.id === p.category)!;

  const open = () => {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: cat.id }));
    const target = document.getElementById("services");
    if (lenis && target) lenis.scrollTo(target, { offset: -88 });
    else target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <ol className="lg:col-span-7" aria-label="Common problems">
        {problems.map((x, k) => {
          const active = k === i;
          return (
            <li key={x.problem}>
              <button
                type="button"
                onClick={() => setI(k)}
                onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setI(k)}
                aria-pressed={active}
                className={`grid w-full grid-cols-[2.25rem_1fr] items-baseline gap-3 border-b py-3.5 text-left transition-colors duration-300 ${
                  active ? "border-navy text-navy" : "border-line text-muted hover:text-navy"
                }`}
              >
                <span className={`font-serif text-sm ${active ? "text-gold" : "text-navy/30"}`}>{String(k + 1).padStart(2, "0")}</span>
                <span className="text-[0.9375rem] leading-snug md:text-base">{x.problem}</span>
              </button>
              {/* Phones: the answer opens inline under the tapped problem. */}
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden lg:hidden"
                  >
                    <div className="my-3 rounded-2xl bg-navy p-5 text-white">
                      <p className="eyebrow text-lime">Choose</p>
                      <p className="mt-2 font-serif text-xl leading-snug font-light">{x.service}</p>
                      <button type="button" onClick={open} className="group mt-4 inline-flex min-h-11 items-center gap-3 rounded-full bg-white px-4 py-2 text-[0.8125rem] font-medium text-navy">
                        View {cat.name}
                        <Arrow />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
      <div className="hidden lg:col-span-5 lg:block">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-navy p-7 text-white lg:sticky lg:top-28 md:p-10" aria-live="polite">
          <div aria-hidden className="absolute -right-20 -bottom-24 h-64 w-64 rounded-full bg-lime/20 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease }} className="relative">
              <p className="eyebrow text-white/60">If your problem is</p>
              <p className="mt-3 text-base leading-relaxed text-white/85">“{p.problem}”</p>
              <p className="eyebrow mt-8 text-lime">Choose</p>
              <p className="mt-3 font-serif text-[1.75rem] leading-tight font-light md:text-[2.1rem]">{p.service}</p>
              <p className="mt-2 text-sm text-white/60">Part of {cat.name}</p>
              <button type="button" onClick={open} className="group mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-white px-5 py-2.5 text-[0.8125rem] font-medium text-navy hover:bg-cream">
                View {cat.name}
                <Arrow />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** The six service categories as tabs (scrollable chips on phones) with a full detail panel. */
export function ServiceExplorer({ categories, ctaLabel }: { categories: K["services"]["categories"]; ctaLabel: string }) {
  const [active, setActive] = useState(categories[0].id);
  const base = useId();
  const c = categories.find((x) => x.id === active)!;

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<string>).detail);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (idx + (e.key === "ArrowRight" ? 1 : -1) + categories.length) % categories.length;
    setActive(categories[next].id);
    document.getElementById(`${base}-tab-${categories[next].id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Service areas" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0" data-lenis-prevent-touch>
        {categories.map((x, idx) => {
          const on = x.id === active;
          return (
            <button
              key={x.id}
              id={`${base}-tab-${x.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${base}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(x.id)}
              onKeyDown={(e) => onKey(e, idx)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-[0.8125rem] whitespace-nowrap transition-colors ${
                on ? "border-navy bg-navy text-white" : "border-line bg-white text-ink/75 hover:border-navy/40 hover:text-navy"
              }`}
            >
              <span className={`mr-2 font-serif ${on ? "text-gold-soft" : "text-navy/40"}`}>{String(idx + 1).padStart(2, "0")}</span>
              {x.name}
            </button>
          );
        })}
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${c.id}`} className="mt-6 overflow-hidden rounded-[1.75rem] border border-line bg-white">
        <AnimatePresence mode="wait">
          <motion.div key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} className="grid lg:grid-cols-12">
            <div className="p-6 md:p-10 lg:col-span-7">
              <h3 className="font-serif text-[2rem] leading-tight font-light text-navy md:text-[2.5rem]">{c.name}</h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80 md:text-[1.0625rem]">{c.summary}</p>

              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="label !text-green-deep">Who needs it</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{c.whoNeedsIt}</dd>
                </div>
                <div>
                  <dt className="label !text-green-deep">Problem addressed</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{c.problem}</dd>
                </div>
              </dl>

              <h4 className="label mt-10 !text-green-deep">Approach</h4>
              <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                {c.approach.map((a, k) => (
                  <li key={a} className="flex gap-3 rounded-2xl bg-paper px-4 py-3 text-sm text-ink">
                    <span className="font-serif text-gold">{k + 1}</span>
                    {a}
                  </li>
                ))}
              </ol>

              <h4 className="label mt-10 !text-green-deep">Deliverables</h4>
              <ul className="mt-4 space-y-2.5">
                {c.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-[0.9375rem] text-ink">
                    <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-green" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                      <path d="m3 8.5 3 3 7-7" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="border-t border-line bg-mist/50 p-6 md:p-10 lg:col-span-5 lg:border-t-0 lg:border-l">
              <dl className="space-y-6">
                {[
                  ["Duration", c.duration],
                  ["What we need from you", c.clientInputs],
                  ["Fee basis", c.pricingBasis],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label">{k}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="label mt-8">Services in this area</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.offers.map((o) => (
                  <li key={o} className="rounded-full border border-navy/15 bg-white px-3 py-1.5 text-xs text-ink">
                    {o}
                  </li>
                ))}
              </ul>
              <a href="#enquiry" className="group mt-10 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-navy px-6 py-3 text-[0.8125rem] font-medium text-white hover:bg-navy-deep sm:w-auto">
                {ctaLabel}
                <Arrow />
              </a>
            </aside>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Indicative fee tables, one tab per service group. */
export function PriceTabs({ tables }: { tables: K["pricing"]["tables"] }) {
  const [id, setId] = useState(tables[0].id);
  const t = tables.find((x) => x.id === id)!;
  return (
    <div>
      <div role="tablist" aria-label="Fee tables" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:px-0" data-lenis-prevent-touch>
        {tables.map((x) => (
          <button
            key={x.id}
            role="tab"
            type="button"
            aria-selected={x.id === id}
            onClick={() => setId(x.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-[0.8125rem] whitespace-nowrap transition-colors ${x.id === id ? "bg-white text-navy" : "text-white/75 hover:text-white"}`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={t.id} role="tabpanel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-6">
          <p className="text-sm text-white/70">{t.note}</p>
          {/* Stacked rows on phones, a table from md up. */}
          <table className="mt-5 w-full text-left text-sm">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-white/20 text-white/60">
                <th scope="col" className="py-3 pr-4 font-normal">
                  Service
                </th>
                {t.cols.map((col, k) => (
                  <th key={col} scope="col" className={`py-3 pr-4 font-normal last:pr-0 ${k === 0 ? "text-left" : "text-right"}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((r) => (
                <tr key={r[0]} className="block border-b border-white/10 py-4 md:table-row md:py-0">
                  <th scope="row" className="block pr-4 font-normal text-white md:table-cell md:py-4">
                    {r[0]}
                  </th>
                  {r.slice(1).map((v, k) => (
                    <td key={k} className={`mt-1 flex justify-between gap-4 pr-0 text-white/80 md:table-cell md:py-4 md:pr-4 md:last:pr-0 ${k === 0 ? "md:text-left" : "md:text-right"}`}>
                      <span className="text-white/50 md:hidden">{t.cols[k]}</span>
                      <span>{v}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Accessible accordion for the FAQ. */
export function Faq({ items }: { items: K["faq"]["items"] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <ul className="border-t border-line">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <li key={it.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${base}-q-${i}`}
                aria-expanded={on}
                aria-controls={`${base}-a-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left font-serif text-lg leading-snug text-navy md:py-6 md:text-xl"
              >
                {it.q}
                <span aria-hidden className={`mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy/20 transition-transform duration-300 ${on ? "rotate-45" : ""}`}>
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" stroke="currentColor" strokeWidth={1.3}>
                    <path d="M5 0v10M0 5h10" />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${base}-a-${i}`}
                  role="region"
                  aria-labelledby={`${base}-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 text-[0.9375rem] leading-relaxed text-muted">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
