import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import type { DivisionId } from "@/content/en/common";
import { Arrow } from "@/components/ui/Kit";
import { Media, type Tone } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";

const tone: Record<DivisionId, Tone> = { wellbeing: "green", education: "gold", workforce: "azure", consulting: "navy" };

/** Four equal, equally prominent division cards — directly below the hero (brief §4). */
export function DivisionCards({ locale, divisions, intro }: { locale: Locale; divisions: Content["divisions"]; intro: Content["home"]["divisions"] }) {
  return (
    <section id="divisions" aria-labelledby="divisions-title" className="relative -mt-24 scroll-mt-24 pb-20 md:-mt-32 md:pb-28">
      <div className="container-page">
        <h2 id="divisions-title" className="sr-only">
          {intro.title}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {divisions.map((d, i) => (
            <li key={d.id} className="h-full">
              <Reveal delay={i * 0.08} className="h-full">
                <Link
                  href={localePath(locale, d.href)}
                  className="group flex h-full flex-row overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(13,59,122,0.04),0_12px_40px_-18px_rgba(13,59,122,0.18)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-calm)] hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(13,59,122,0.05),0_24px_60px_-24px_rgba(13,59,122,0.3)] sm:flex-col sm:rounded-3xl"
                >
                  {/* Card crop: phone 7rem square; tablet ~half width; desktop ~quarter of the container. */}
                  <Media
                    need={d.imageNeed}
                    tone={tone[d.id]}
                    sizes="(min-width: 1440px) 320px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 112px"
                    className="w-28 shrink-0 sm:aspect-[4/3] sm:w-full [&_span]:hidden sm:[&_span]:block"
                  >
                    <span className="absolute right-3 bottom-3 font-serif text-sm text-white/90 sm:text-base" aria-hidden>
                      {d.n}
                    </span>
                  </Media>
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <h3 className="font-serif text-xl leading-tight font-normal text-navy sm:text-[1.5rem]">{d.name}</h3>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted sm:mt-3 sm:text-sm">{d.description}</p>
                    {d.id === "wellbeing" && (
                      <p className="mt-3 hidden text-xs leading-relaxed text-green-deep sm:block">Includes AYUSH, our specialist Ayurveda clinics in London and Montenegro.</p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.8125rem] font-medium text-navy sm:pt-6">
                      {d.cta}
                      <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
