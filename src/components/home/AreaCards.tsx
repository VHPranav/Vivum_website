import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import type { DivisionId } from "@/content/en/common";
import { Arrow } from "@/components/ui/Kit";
import { Media, type Tone } from "@/components/ui/Media";
import { Rise } from "@/components/motion/Rise";

export const areaTone: Record<DivisionId, Tone> = { wellbeing: "green", consulting: "navy", workforce: "azure", education: "gold" };

/**
 * The four areas, directly under the opening section (Sandra: discoverable without scrolling
 * through a long introduction). Rounded image tiles as on Sphere; rise in left to right.
 */
export function AreaCards({ locale, divisions, label }: { locale: Locale; divisions: Content["divisions"]; label: string }) {
  return (
    <section id="areas" aria-labelledby="areas-title" className="scroll-mt-20 pt-6 pb-20 md:pb-28">
      <div className="container-page">
        <div className="mb-6 flex items-center justify-between border-t border-line pt-5">
          <h2 id="areas-title" className="label flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
            {label}
          </h2>
          <span className="label tabular-nums">01 — 04</span>
        </div>
        <Rise as="ul" className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {divisions.map((d) => (
            <li key={d.id} data-rise>
              <Link href={localePath(locale, d.href)} className="group relative block overflow-hidden rounded-[1.75rem] bg-navy-ink text-white">
                {/* Tile crop: 5:4 on phones, 3:4 from tablet; a quarter of the page width on desktop. */}
                <Media
                  need={d.imageNeed}
                  photo={d.photo}
                  tone={areaTone[d.id]}
                  sizes="(min-width: 1920px) 470px, (min-width: 1024px) 24vw, (min-width: 640px) 48vw, 94vw"
                  labelClass="top-16 left-5 hidden sm:block"
                  className="aspect-[5/4] transition-transform duration-[1.4s] ease-[var(--ease-calm)] group-hover:scale-[1.04] sm:aspect-[3/4]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-ink/85 via-navy-ink/25 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="font-serif text-sm text-white/80">{d.n}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors duration-500 group-hover:bg-white group-hover:text-navy">
                    <Arrow className="h-2 w-4" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="font-serif text-[1.5rem] leading-[1.1] font-normal md:text-[1.75rem]">{d.name}</h3>
                  <p className="mt-2 max-w-[34ch] text-[0.8125rem] leading-relaxed text-white/80 md:text-sm">{d.description}</p>
                  <span className="mt-4 inline-flex text-[0.8125rem] font-medium">
                    <span className="link-u">{d.cardCta}</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </Rise>
      </div>
    </section>
  );
}
