import type { Locale } from "@/i18n/config";
import type { Content } from "@/content";
import type { StubPage as StubData } from "@/content/en/pages";
import type { FormKind } from "@/lib/forms";
import { reviewMode } from "@/lib/site";
import { Button } from "@/components/ui/Kit";
import { Waves } from "@/components/ui/Waves";
import { Rise } from "@/components/motion/Rise";
import { SplitLines } from "@/components/motion/Text";
import { ContactSection } from "@/components/forms/ContactSection";

/**
 * Area page "in preparation": opening section, audience paths (where relevant), the journey,
 * the planned structure and the area's own tailored enquiry form, so the URL works on its own.
 */
export function StubPage({
  c,
  locale,
  page,
  kind = "general",
  cta,
}: {
  c: Content;
  locale: Locale;
  page: StubData;
  kind?: FormKind;
  /** Primary action label for this area (also the form's submit label). */
  cta?: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-paper pt-32 pb-24 md:pt-44 md:pb-32">
        <div aria-hidden className="absolute -top-40 -right-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,#d6e6f4,transparent)]" />
        <div className="container-page relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label fade-rise flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
              {page.label}
            </p>
            <SplitLines as="h1" on="load" delay={0.1} className="display-l mt-6 max-w-[18ch] text-navy">
              {page.title}
            </SplitLines>
          </div>
          <div className="self-end lg:col-span-4">
            <SplitLines as="p" on="load" delay={0.35} stagger={0.05} className="text-lg leading-relaxed text-ink/80">
              {page.lede}
            </SplitLines>
            <div className="fade-rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.8s" }}>
              {cta && <Button href={kind === "general" ? "#contact" : "#enquiry"}>{cta}</Button>}
              <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-3.5 py-2 text-xs text-navy">
                <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
                Full page in preparation
              </span>
            </div>
          </div>
        </div>
        <Waves className="absolute inset-x-0 bottom-0 h-24 w-[200%] md:h-36" />
      </section>

      {page.paths && (
        <section className="py-16 md:py-24">
          <Rise className="container-page grid gap-4 md:grid-cols-2">
            {page.paths.map((p, i) => (
              <article key={p.id} id={p.id} data-rise className={`scroll-mt-24 rounded-[1.75rem] p-7 md:p-10 ${i === 0 ? "bg-navy text-white" : "border border-line bg-white"}`}>
                <p className={`label ${i === 0 ? "!text-white/60" : ""}`}>{String(i + 1).padStart(2, "0")}</p>
                <h2 className={`display-m mt-4 ${i === 0 ? "text-white" : "text-navy"}`}>{p.title}</h2>
                <p className={`mt-3 text-[0.9375rem] leading-relaxed ${i === 0 ? "text-white/75" : "text-muted"}`}>{p.body}</p>
                <ul className={`mt-6 divide-y ${i === 0 ? "divide-white/15 border-white/15" : "divide-line border-line"} border-y`}>
                  {p.points.map((pt) => (
                    <li key={pt} className="py-3 text-[0.9375rem]">
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Rise>
        </section>
      )}

      <section className={`pb-16 md:pb-24 ${page.paths ? "" : "pt-16 md:pt-24"}`}>
        <div className="container-page grid gap-12 lg:grid-cols-12">
          {page.steps && (
            <div className="lg:col-span-6">
              <h2 className="display-m text-navy">{page.stepsTitle}</h2>
              <Rise as="ol" className="mt-8 border-t border-line">
                {page.steps.map((s, i) => (
                  <li key={s} data-rise className="flex gap-5 border-b border-line py-5 text-[1.0625rem] text-ink">
                    <span className="font-serif text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </li>
                ))}
              </Rise>
            </div>
          )}
          <div className="lg:col-span-5 lg:col-start-8">
            {page.sections.length > 0 && (
              <>
                <h2 className="label">This landing page will include</h2>
                <ul className="mt-4 grid gap-2">
                  {page.sections.map((s) => (
                    <li key={s} className="flex gap-3 rounded-xl bg-white px-4 py-3 text-sm text-ink ring-1 ring-line">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/40" />
                      {s}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {page.note && reviewMode && <p className="mt-6 rounded-2xl bg-[#f7efd6] px-5 py-4 text-sm leading-relaxed text-[#6b5413]">{page.note}</p>}
          </div>
        </div>
      </section>

      <div className="bg-mist/60">
        <ContactSection
          c={c}
          locale={locale}
          kind={kind}
          head={{ label: cta ?? "Contact", title: "Tell us what you need.", lede: "Your enquiry goes directly to the right person for this area." }}
          submitLabel={cta}
        />
      </div>
    </>
  );
}
