import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import { ApprovalFlag, Button } from "@/components/ui/Kit";
import { Media } from "@/components/ui/Media";
import { Waves } from "@/components/ui/Waves";
import { Rise } from "@/components/motion/Rise";
import { FillText, SplitLines } from "@/components/motion/Text";
import { BenefitsScroller, ProcessFlow } from "@/components/home/Scroll";
import { Faq, PriceTabs, ProblemMatcher, ServiceExplorer } from "@/components/consulting/Interactive";
import { ContactSection } from "@/components/forms/ContactSection";

export async function generateMetadata({ params }: PageProps<"/[lang]/consulting">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { consulting } = getContent(lang);
  return { title: consulting.meta.title, description: consulting.meta.description, alternates: { canonical: localePath(lang, "/consulting") } };
}

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`label flex items-center gap-2 ${light ? "!text-white/60" : ""}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
      {children}
    </p>
  );
}

// Landing page: headline for its audience → client needs → services → benefits → how it works →
// fees → credentials → FAQ → one primary action with a tailored form (Sandra, 12 Nov).
export default async function ConsultingPage({ params }: PageProps<"/[lang]/consulting">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const k = c.consulting;

  return (
    <>
      {/* Opening */}
      <section className="relative overflow-hidden bg-paper pt-32 pb-24 md:pt-44 md:pb-32">
        <div aria-hidden className="absolute -top-48 -right-40 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,#d6e6f4,transparent)]" />
        <div aria-hidden className="absolute bottom-0 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,#e3efd6,transparent)]" />
        <div className="container-page relative">
          <div className="fade-rise">
            <Label>{k.hero.eyebrow}</Label>
          </div>
          <SplitLines as="h1" on="load" delay={0.1} className="display-xl mt-6 max-w-[19ch] text-navy !text-[clamp(2.5rem,0.9rem+4.4vw,6.25rem)]">
            {k.hero.title}
          </SplitLines>
          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
            <dl className="fade-rise grid grid-cols-1 gap-px self-end overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-3 lg:col-span-7" style={{ animationDelay: "0.7s" }}>
              {k.hero.facts.map((f) => (
                <div key={f.k} className="bg-paper px-5 py-4">
                  <dt className="label">{f.k}</dt>
                  <dd className="mt-1 font-serif text-lg text-navy">{f.v}</dd>
                </div>
              ))}
            </dl>
            <div className="lg:col-span-4 lg:col-start-9">
              <SplitLines as="p" on="load" delay={0.35} stagger={0.04} className="text-lg leading-relaxed text-ink/85">
                {k.hero.value}
              </SplitLines>
              <p className="fade-rise mt-3 text-sm text-muted" style={{ animationDelay: "0.6s" }}>
                {k.hero.audience}
              </p>
              <div className="fade-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: "0.8s" }}>
                <Button href={k.hero.primary.href}>{k.hero.primary.label}</Button>
                <a href={k.hero.secondary.href} className="link-u text-[0.875rem] font-medium text-navy">
                  {k.hero.secondary.label}
                </a>
              </div>
            </div>
          </div>
        </div>
        <Waves className="absolute inset-x-0 bottom-0 h-24 w-[200%] md:h-32" />
      </section>

      {/* Client needs */}
      <section aria-labelledby="who-title" className="py-24 md:py-36">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Label>{k.who.eyebrow}</Label>
              <SplitLines as="h2" id="who-title" className="display-m mt-5 text-navy">
                {k.who.title}
              </SplitLines>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">{k.who.lede}</p>
            </div>
            <Rise as="ul" className="grid gap-px self-end overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-3 lg:col-span-8">
              {k.who.audiences.map((a, i) => (
                <li key={a.title} data-rise className="bg-white p-6 md:p-7">
                  <span className="font-serif text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-serif text-xl text-navy">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
                </li>
              ))}
            </Rise>
          </div>
          <div className="mt-16 md:mt-24">
            <ProblemMatcher problems={k.who.problems} categories={k.services.categories} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" aria-labelledby="services-title" className="scroll-mt-20 bg-mist/60 py-24 md:py-36">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Label>{k.services.eyebrow}</Label>
              <SplitLines as="h2" id="services-title" className="display-m mt-5 text-navy">
                {k.services.title}
              </SplitLines>
            </div>
            <p className="self-end text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-9">{k.services.lede}</p>
          </div>
          <div className="mt-12 md:mt-16">
            <ServiceExplorer categories={k.services.categories} ctaLabel={k.form.submit} />
          </div>
        </div>
      </section>

      {/* Benefits — pinned horizontal row */}
      <BenefitsScroller label={k.benefits.eyebrow} title={k.benefits.title} items={k.benefits.items} />
      <section className="pb-24 md:pb-36">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          {/* Workshop photograph — wide crop, ~half the page on desktop. */}
          <Media
            need="Working session with a client team (approved; not stock implying real clients)"
            tone="navy"
            sizes="(min-width: 1920px) 900px, (min-width: 1024px) 48vw, 94vw"
            className="aspect-[16/10] rounded-[1.75rem] lg:col-span-6"
          />
          <div className="self-center lg:col-span-5 lg:col-start-8">
            <FillText className="font-serif text-[1.6rem] leading-snug font-light text-navy md:text-[2.1rem]">{k.benefits.principle}</FillText>
          </div>
        </div>
      </section>

      {/* How it works */}
      <ProcessFlow label={k.process.eyebrow} title={k.process.title} steps={k.process.steps} />
      <section className="pb-24 md:pb-36">
        <Rise className="container-page grid gap-4 md:grid-cols-2">
          {[k.process.roles.vivum, k.process.roles.partners].map((r, i) => (
            <div key={r.label} data-rise className={`rounded-[1.75rem] p-7 md:p-10 ${i === 0 ? "bg-navy text-white" : "border border-line bg-white"}`}>
              <p className={`label ${i === 0 ? "!text-white/60" : ""}`}>{i === 0 ? k.process.roles.title : " "}</p>
              <h3 className={`mt-3 font-serif text-2xl ${i === 0 ? "text-white" : "text-navy"}`}>{r.label}</h3>
              <ul className="mt-6 space-y-3">
                {r.items.map((it) => (
                  <li key={it} className={`flex gap-3 text-[0.9375rem] leading-relaxed ${i === 0 ? "text-white/85" : "text-ink/85"}`}>
                    <span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? "bg-lime" : "bg-green"}`} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Rise>
      </section>

      {/* Fees */}
      <section aria-labelledby="pricing-title" className="bg-navy-ink py-24 text-white md:py-36">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-4">
            <Label light>{k.pricing.eyebrow}</Label>
            <SplitLines as="h2" id="pricing-title" className="display-m mt-5 text-white">
              {k.pricing.title}
            </SplitLines>
            <p className="mt-5 text-base leading-relaxed text-white/70">{k.pricing.lede}</p>
            <ApprovalFlag className="mt-6">{k.pricing.approval}</ApprovalFlag>
            <ul className="mt-8 space-y-2 text-sm text-white/65">
              {k.pricing.terms.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime" />
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

      {/* Credentials */}
      <section aria-labelledby="people-title" className="py-24 md:py-36">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Portrait crop: 4:5, ~a third of the page on desktop. */}
          <Media
            need="Approved portrait of Dr Sandra Kordić"
            tone="navy"
            sizes="(min-width: 1920px) 600px, (min-width: 1024px) 31vw, (min-width: 640px) 60vw, 94vw"
            className="aspect-[4/5] max-w-md rounded-[1.75rem] lg:col-span-4 lg:max-w-none"
          />
          <div className="lg:col-span-7 lg:col-start-6">
            <Label>{k.people.eyebrow}</Label>
            <SplitLines as="h2" id="people-title" className="display-l mt-5 text-navy">
              {k.people.name}
            </SplitLines>
            <p className="mt-2 text-green-deep">{k.people.role}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">{k.people.bio}</p>
            <ApprovalFlag className="mt-4">{k.people.approval}</ApprovalFlag>
            <ul className="mt-8 flex flex-wrap gap-2">
              {k.people.focus.map((f) => (
                <li key={f} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs text-ink">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-[1.75rem] bg-mist p-6 md:p-8">
              <h3 className="font-serif text-xl text-navy">{k.people.independence.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{k.people.independence.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-line py-24 md:py-36">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label>{k.faq.eyebrow}</Label>
            <SplitLines as="h2" id="faq-title" className="display-m mt-5 text-navy">
              {k.faq.title}
            </SplitLines>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={k.faq.items} />
          </div>
        </div>
      </section>

      {/* One primary action + tailored form */}
      <div className="bg-mist/60">
        <ContactSection c={c} locale={lang} kind="consulting" head={{ label: k.form.eyebrow, title: k.form.title, lede: k.form.lede }} submitLabel={k.form.submit} marquee={k.form.submit} />
      </div>
    </>
  );
}
