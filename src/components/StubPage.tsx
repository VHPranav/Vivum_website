import type { Locale } from "@/i18n/config";
import type { Content } from "@/content";
import type { StubPage as StubData } from "@/content/en/pages";
import { reviewMode } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Kit";
import { Reveal } from "@/components/ui/Reveal";
import { Waves } from "@/components/ui/Waves";
import { ContactSection } from "@/components/forms/ContactSection";

/** Structured "in preparation" page: shows the agreed template outline so navigation and review work now. */
export function StubPage({
  c,
  locale,
  page,
  service,
  submitLabel,
}: {
  c: Content;
  locale: Locale;
  page: StubData;
  service?: string;
  submitLabel?: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-paper pt-32 pb-28 md:pt-44 md:pb-36">
        <div aria-hidden className="absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-sky blur-3xl" />
        <div className="container-page relative">
          <Eyebrow className="fade-rise">{page.eyebrow}</Eyebrow>
          <h1 className="mt-6 overflow-hidden pb-[0.08em]">
            <span className="rise-line heading-display block max-w-4xl text-navy" style={{ animationDelay: "0.15s" }}>
              {page.title}
            </span>
          </h1>
          <p className="fade-rise mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg" style={{ animationDelay: "0.4s" }}>
            {page.lede}
          </p>
          <p className="fade-rise mt-8 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-xs text-navy" style={{ animationDelay: "0.5s" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
            Full page in preparation
          </p>
        </div>
        <Waves className="absolute inset-x-0 bottom-0 h-28 w-[200%] md:h-40" />
      </section>

      {page.cards && (
        <section className="py-16 md:py-24">
          <div className="container-page">
            <h2 className="heading-section text-navy">{page.cardsTitle}</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {page.cards.map((card, i) => (
                <li key={card.title}>
                  <Reveal delay={i * 0.06} className="h-full rounded-3xl border border-line bg-white p-6 md:p-8">
                    {card.tag && <p className="eyebrow text-green-deep">{card.tag}</p>}
                    <h3 className="mt-3 font-serif text-2xl text-navy">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="network" className={`scroll-mt-24 ${page.cards ? "pt-0" : "pt-16 md:pt-24"} pb-16 md:pb-24`}>
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          {page.steps && (
            <div>
              <h2 className="font-serif text-2xl text-navy md:text-3xl">{page.stepsTitle}</h2>
              <ol className="mt-6 border-t border-line">
                {page.steps.map((s, i) => (
                  <li key={s} className="flex gap-4 border-b border-line py-4 text-[0.9375rem] text-ink">
                    <span className="font-serif text-gold">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div>
            <h2 className="font-serif text-2xl text-navy md:text-3xl">This page will include</h2>
            <ul className="mt-6 grid gap-2">
              {page.sections.map((s) => (
                <li key={s} className="flex gap-3 rounded-xl bg-white px-4 py-3 text-sm text-ink ring-1 ring-line">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/40" />
                  {s}
                </li>
              ))}
            </ul>
            {page.note && reviewMode && <p className="mt-6 rounded-2xl bg-[#f7efd6] px-5 py-4 text-sm leading-relaxed text-[#6b5413]">{page.note}</p>}
          </div>
        </div>
      </section>

      <div className="bg-mist/60">
        <ContactSection
          c={c}
          locale={locale}
          head={{ eyebrow: "Enquiry", title: "Get in touch now.", lede: "While this page is being prepared, you can already send an enquiry to the right team." }}
          defaultService={service}
          submitLabel={submitLabel}
        />
      </div>
    </>
  );
}
