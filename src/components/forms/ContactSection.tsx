import type { Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { contactRoutes, displayEmail, reviewMode, whatsappNumber, type RouteId } from "@/lib/site";
import { formFields, type FormKind } from "@/lib/forms";
import { ApprovalFlag, SectionHead } from "@/components/ui/Kit";
import { EnquiryForm } from "./EnquiryForm";

const directRoutes: RouteId[] = ["wellbeing", "education", "workforce", "consulting", "general"];

/** "Select your service" contact block: direct routes on the left, routed enquiry form on the right. */
export function ContactSection({
  c,
  locale,
  head,
  kind = "general",
  submitLabel,
  defaultService,
  as = "h2",
}: {
  c: Content;
  locale: Locale;
  head: { eyebrow: string; title: string; lede: string };
  kind?: FormKind;
  submitLabel?: string;
  defaultService?: string;
  as?: "h1" | "h2";
}) {
  return (
    <section id={kind === "consulting" ? "consultation" : "contact"} aria-labelledby={`${kind}-contact-title`} className="scroll-mt-24 py-20 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          {as === "h1" ? (
            <div>
              <p className="eyebrow flex items-center gap-3 text-green-deep">
                <span className="gold-rule" aria-hidden />
                {head.eyebrow}
              </p>
              <h1 id={`${kind}-contact-title`} className="heading-display mt-5 text-navy">
                {head.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted">{head.lede}</p>
            </div>
          ) : (
            <SectionHead eyebrow={head.eyebrow} title={<span id={`${kind}-contact-title`}>{head.title}</span>} lede={head.lede} />
          )}

          {kind === "general" && (
            <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
              {directRoutes.map((id) => {
                const r = contactRoutes[id];
                return (
                  <div key={id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                    <dt className="text-ink">{r.team}</dt>
                    <dd className="text-muted">{displayEmail(id) ?? "Address to be confirmed"}</dd>
                  </div>
                );
              })}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                <dt className="text-ink">WhatsApp</dt>
                <dd className="text-muted">{whatsappNumber ?? "Number to be confirmed"}</dd>
              </div>
            </dl>
          )}
          {kind === "general" && <ApprovalFlag className="mt-4">all addresses are proposed aliases</ApprovalFlag>}
        </div>
        <div className="lg:col-span-8">
          <EnquiryForm
            kind={kind}
            locale={locale}
            fields={formFields(kind, c)}
            copy={c.formCopy}
            submitLabel={submitLabel ?? "Send enquiry"}
            routes={contactRoutes}
            reviewMode={reviewMode}
            defaultService={defaultService}
          />
        </div>
      </div>
    </section>
  );
}
