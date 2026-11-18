import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { ApprovalFlag, Button, Eyebrow, SectionHead } from "@/components/ui/Kit";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Waves } from "@/components/ui/Waves";
import { Steps } from "@/components/home/Steps";
import { Faq, PriceTabs, ProblemMatcher, ServiceExplorer } from "@/components/consulting/Interactive";
import { ContactSection } from "@/components/forms/ContactSection";

export async function generateMetadata({ params }: PageProps<"/[lang]/consulting">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { consulting } = getContent(lang);
  return { title: consulting.meta.title, description: consulting.meta.description, alternates: { canonical: localePath(lang, "/consulting") } };
}

// Section order follows the universal landing-page system (brief §5):
// Hero → Who we help → Services & packages → Benefits → How it works → Pricing → People → FAQ → Contact.
export default async function ConsultingPage({ params }: PageProps<"/[lang]/consulting">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const k = c.consulting;

  return (
    <>
      {/* 01 Hero */}
      <section className="relative overflow-hidden bg-navy-ink pt-32 pb-28 text-white md:pt-44 md:pb-40">
        <div aria-hidden className="absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-azure/30 blur-3xl" />
        <div aria-hidden className="absolute bottom-0 -left-32 h-[24rem] w-[24rem] rounded-full bg-lime/10 blur-3xl" />
        <div className="container-page relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow tone="light" className="fade-rise">
              {k.hero.eyebrow}
            </Eyebrow>
            <h1 className="mt-6 overflow-hidden pb-[0.08em]">
              <span className="rise-line heading-display block max-w-4xl" style={{ animationDelay: "0.15s" }}>
                {k.hero.title}
              </span>
            </h1>
            <p className="fade-rise mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl" style={{ animationDelay: "0.4s" }}>
              {k.hero.value}
            </p>
            <p className="fade-rise mt-3 max-w-2xl text-sm text-white/60 md:text-base" style={{ animationDelay: "0.5s" }}>
              {k.hero.audience}
            </p>
            <div className="fade-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.6s" }}>
              <Button href={k.hero.primary.href} variant="white">
                {k.hero.primary.label}
              </Button>
              <Button href={k.hero.secondary.href} variant="outline-light">
                {k.hero.secondary.label}
              </Button>
            </div>
          </div>
          <dl className="fade-rise grid content-end gap-px self-end overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1" style={{ animationDelay: "0.75s" }}>
            {k.hero.facts.map((f) => (
              <div key={f.k} className="bg-navy-ink/80 px-5 py-4 backdrop-blur">
                <dt className="eyebrow text-white/50">{f.k}</dt>
                <dd className="mt-1.5 font-serif text-lg text-white">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Waves variant="dark" className="absolute inset-x-0 -bottom-6 h-32 w-[200%] md:h-44" />
      </section>

      {/* 02 Who we help */}
      <section aria-labelledby="who-title" className="py-20 md:py-32">
        <div className="container-page">
          <SectionHead eyebrow={k.who.eyebrow} title={<span id="who-title">{k.who.title}</span>} lede={k.who.lede} />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {k.who.audiences.map((a, i) => (
              <li key={a.title}>
                <Reveal delay={i * 0.06} className="h-full rounded-3xl border border-line bg-white p-6 md:p-7">
                  <h3 className="font-serif text-xl text-navy">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-14 md:mt-20">
            <ProblemMatcher problems={k.who.problems} categories={k.services.categories} />
          </div>
        </div>
      </section>

      {/* 03 Services & packages */}
      <section id="services" aria-labelledby="services-title" className="scroll-mt-24 bg-mist/60 py-20 md:py-32">
        <div className="container-page">
          <SectionHead eyebrow={k.services.eyebrow} title={<span id="services-title">{k.services.title}</span>} lede={k.services.lede} />
          <div className="mt-10 md:mt-14">
            <ServiceExplorer categories={k.services.categories} ctaLabel={k.form.submit} />
          </div>
        </div>
      </section>

      {/* 04 Benefits & deliverables */}
      <section aria-labelledby="benefits-title" className="py-20 md:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={k.benefits.eyebrow} title={<span id="benefits-title">{k.benefits.title}</span>} />
            <Reveal className="mt-8 border-l-2 border-gold pl-5 text-[0.9375rem] leading-relaxed text-ink/80">{k.benefits.principle}</Reveal>
          </div>
          <div className="lg:col-span-7">
            {/* Workshop photograph — wide crop, ~58% of the container on desktop. */}
            <Media
              need="Working session or workshop with a client team (approved, not stock implying real clients)"
              tone="navy"
              sizes="(min-width: 1440px) 760px, (min-width: 1024px) 55vw, 92vw"
              className="aspect-[16/9] rounded-3xl"
            />
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {k.benefits.items.map((b, i) => (
                <li key={b.title}>
                  <Reveal delay={i * 0.06}>
                    <h3 className="font-serif text-xl text-navy">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 How it works + roles */}
      <section aria-labelledby="process-title" className="bg-cream/60 py-20 md:py-32">
        <div className="container-page">
          <SectionHead eyebrow={k.process.eyebrow} title={<span id="process-title">{k.process.title}</span>} />
          <div className="mt-14">
            <Steps steps={k.process.steps} />
          </div>
          <Reveal className="mt-16 rounded-3xl border border-line bg-white p-6 md:mt-20 md:p-10">
            <h3 className="font-serif text-2xl text-navy">{k.process.roles.title}</h3>
            <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
              {[k.process.roles.vivum, k.process.roles.partners].map((r, i) => (
                <div key={r.label}>
                  <p className={`eyebrow ${i === 0 ? "text-navy" : "text-green-deep"}`}>{r.label}</p>
                  <ul className="mt-4 space-y-3">
                    {r.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink/85">
                        <span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? "bg-navy" : "bg-green"}`} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06 Pricing */}
      <section aria-labelledby="pricing-title" className="relative overflow-hidden bg-navy py-20 text-white md:py-32">
        <div className="container-page relative grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-4">
            <SectionHead tone="light" eyebrow={k.pricing.eyebrow} title={<span id="pricing-title">{k.pricing.title}</span>} lede={k.pricing.lede} />
            <ApprovalFlag className="mt-6">{k.pricing.approval}</ApprovalFlag>
            <ul className="mt-8 space-y-2 text-sm text-white/70">
              {k.pricing.terms.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-soft" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <PriceTabs tables={k.pricing.tables} />
          </div>
        </div>
      </section>

      {/* 07 People / partners */}
      <section aria-labelledby="people-title" className="py-20 md:py-32">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Portrait crop: 4:5, ~a third of the container on desktop. */}
          <Media
            need="Approved portrait of Dr Sandra Kordić"
            tone="navy"
            sizes="(min-width: 1440px) 420px, (min-width: 1024px) 30vw, (min-width: 640px) 60vw, 92vw"
            className="aspect-[4/5] max-w-md rounded-3xl lg:col-span-4"
          />
          <div className="lg:col-span-8">
            <Eyebrow>{k.people.eyebrow}</Eyebrow>
            <h2 id="people-title" className="heading-section mt-5 text-navy">
              {k.people.name}
            </h2>
            <p className="mt-2 text-green-deep">{k.people.role}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/85 md:text-lg">{k.people.bio}</p>
            <ApprovalFlag className="mt-4">{k.people.approval}</ApprovalFlag>
            <ul className="mt-8 flex flex-wrap gap-2">
              {k.people.focus.map((f) => (
                <li key={f} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs text-ink">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-3xl bg-mist p-6 md:p-8">
              <h3 className="font-serif text-xl text-navy">{k.people.independence.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{k.people.independence.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-line py-20 md:py-32">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow={k.faq.eyebrow} title={<span id="faq-title">{k.faq.title}</span>} />
          </div>
          <div className="lg:col-span-8">
            <Faq items={k.faq.items} />
          </div>
        </div>
      </section>

      {/* 09 Dedicated contact */}
      <div className="bg-mist/60">
        <ContactSection c={c} locale={lang} kind="consulting" head={k.form} submitLabel={k.form.submit} />
      </div>
    </>
  );
}
