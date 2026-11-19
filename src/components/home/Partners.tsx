import type { Content } from "@/content";
import { Rise } from "@/components/motion/Rise";
import { SplitLines } from "@/components/motion/Text";

/** Partners & experience: logo wall, projects and testimonials, filled only with approved items. */
export function Partners({ partners }: { partners: Content["home"]["partners"] }) {
  return (
    <section aria-labelledby="partners-title" className="py-24 md:py-36">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
              {partners.label}
            </p>
            <SplitLines as="h2" id="partners-title" className="display-m mt-5 text-navy">
              {partners.title}
            </SplitLines>
          </div>
          <div className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-[0.9375rem] leading-relaxed text-muted">{partners.note}</p>

          </div>
        </div>
        <Rise as="ul" className="mt-14 grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: partners.slots }, (_, i) => (
            <li key={i} data-rise className="flex aspect-[4/3] items-center justify-center border-r border-b border-line p-6 text-center text-xs text-muted/70">
              Partner logo
            </li>
          ))}
        </Rise>
        <Rise className="mt-6 grid gap-4 md:grid-cols-2">
          {[0, 1].map((k) => (
            <figure key={k} data-rise className="rounded-[1.75rem] bg-mist/70 p-8 md:p-10">
              <span aria-hidden className="font-serif text-6xl leading-none text-green/40">
                “
              </span>
              <blockquote className="mt-2 font-serif text-xl leading-snug text-navy/50 md:text-2xl">{partners.testimonial}</blockquote>
              <figcaption className="label mt-6">Client name · Organisation</figcaption>
            </figure>
          ))}
        </Rise>
      </div>
    </section>
  );
}
