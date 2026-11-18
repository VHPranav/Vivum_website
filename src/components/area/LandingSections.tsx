import Link from "next/link";
import type { LandingContent } from "@/content/en/landing";
import { localePath, type Locale } from "@/i18n/config";
import { ApprovalFlag } from "@/components/ui/Kit";

export function LandingSections({ content, workforce, locale }: { content: LandingContent; workforce: boolean; locale: Locale }) {
  return (
    <>
      {workforce && (
        <section aria-label="Choose your workforce path" className="container-page grid gap-6 py-16 md:grid-cols-2 md:py-24">
          <div id="employers" className="scroll-mt-24 bg-navy p-6 text-white md:p-10">
            <h2 className="text-2xl leading-tight">For employers</h2>
            <p className="mt-4 leading-relaxed text-white/80">Define the roles, headcount, location and timing you need. We help clarify profiles and coordinate with recruitment partners.</p>
            <a href="#enquiry" className="link-u mt-6 inline-block text-sm font-medium">Submit your staffing requirements</a>
          </div>
          <div id="candidates" className="scroll-mt-24 border border-navy/15 p-6 md:p-10">
            <h2 className="text-2xl leading-tight text-navy">For candidates</h2>
            <p className="mt-4 leading-relaxed text-navy/70">Ask about recruitment partners, confirmed openings and the selection process. This is an enquiry route; it is not an application for a specific job.</p>
            <Link href={localePath(locale, "/contact?area=general")} className="link-u mt-6 inline-block text-sm font-medium text-navy">Ask about candidate opportunities</Link>
          </div>
        </section>
      )}
      <section aria-labelledby="process-title" className="bg-white py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label">How it works</p>
            <h2 id="process-title" className="heading-section mt-4 text-navy">A clear next step, at every stage.</h2>
            <p className="mt-5 leading-relaxed text-navy/70">{content.audience}</p>
          </div>
          <ol className="border-t border-navy/15 lg:col-span-7 lg:col-start-6">
            {content.process.map((step, i) => (
              <li key={step.title} className="flex gap-4 border-b border-navy/15 py-6 md:gap-6">
                <span aria-hidden className="pt-1 text-sm text-navy">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <h3 className="text-xl leading-tight text-navy md:text-2xl">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-navy/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-labelledby="responsibilities-title" className="container-page py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="label">Roles and responsibilities</p>
            <h2 id="responsibilities-title" className="heading-section mt-4 text-navy">Who does what.</h2>
          </div>
          <div className="lg:col-span-8">
            <div className={`grid gap-8 ${content.responsibilities.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {content.responsibilities.map((item, index) => (
                <div key={item.title} className="min-w-0 border-t border-navy/20 pt-5 md:pt-6">
                  <span aria-hidden className="text-xs tabular-nums text-navy/40">0{index + 1}</span>
                  <h3 className="mt-5 text-2xl leading-tight tracking-[-0.025em] text-navy">{item.title}</h3>
                  <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-navy/70">{item.body}</p>
                </div>
              ))}
            </div>
            <ApprovalFlag tone="navy" className="mt-10 !items-start !rounded-none !border-0 !px-0 !py-0 !text-xs !font-normal [&>svg]:mt-0.5">{content.evidenceNeeded}</ApprovalFlag>
          </div>
        </div>
      </section>
      <section aria-labelledby="faq-title" className="bg-[#f1f0ec] py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label">Frequently asked questions</p>
            <h2 id="faq-title" className="heading-section mt-4 text-navy">Before you enquire.</h2>
          </div>
          <div className="border-t border-navy/15 lg:col-span-7 lg:col-start-6">
            {content.faq.map((item) => (
              <details key={item.q} className="group border-b border-navy/15">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-6 text-lg leading-snug text-navy [&::-webkit-details-marker]:hidden">
                  {item.q}<span aria-hidden className="shrink-0 text-2xl font-light group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 leading-relaxed text-navy/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
