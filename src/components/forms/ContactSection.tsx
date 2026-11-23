import type { Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { contactRoutes, displayEmail, reviewMode, whatsappNumber, type RouteId } from "@/lib/site";
import { formFields, type FormKind } from "@/lib/forms";
import { Marquee } from "@/components/motion/Bits";
import { SplitLines } from "@/components/motion/Text";
import { EnquiryForm } from "./EnquiryForm";

const directRoutes: RouteId[] = ["wellbeing", "consulting", "workforce", "education", "general"];

/**
 * Contact block: optional giant marquee (Prime Exits), then the heading and direct routes on the
 * left and the routed enquiry form on the right. `kind` picks the tailored form for an area.
 */
export function ContactSection({
  c,
  locale,
  head,
  kind = "general",
  submitLabel,
  defaultService,
  marquee,
  as = "h2",
}: {
  c: Content;
  locale: Locale;
  head: { label: string; title: string; lede: string };
  kind?: FormKind;
  submitLabel?: string;
  defaultService?: string;
  marquee?: string;
  as?: "h1" | "h2";
}) {
  const id = kind === "general" ? "contact" : "enquiry";
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className="scroll-mt-20 pb-24 md:pb-36">
      {marquee ? (
        <Marquee text={marquee} className="display-xl border-y border-line py-6 whitespace-nowrap text-navy md:py-10" />
      ) : (
        <div className="pt-24 md:pt-36" />
      )}
      <div className={`container-page grid gap-12 lg:grid-cols-12 lg:gap-16 ${marquee ? "pt-16 md:pt-24" : ""}`}>
        <div className="lg:col-span-4">
          <p className="label flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-navy" aria-hidden />
            {head.label}
          </p>
          <SplitLines as={as} id={titleId} className={`${as === "h1" ? "display-l" : "display-m"} mt-5 text-navy`}>
            {head.title}
          </SplitLines>
          <p className="mt-5 text-base leading-relaxed text-muted">{head.lede}</p>

          {kind === "general" && (
            <>
              <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
                {directRoutes.map((rid) => (
                  <div key={rid} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                    <dt className="text-ink">{contactRoutes[rid].team}</dt>
                    <dd className="text-muted">{displayEmail(rid) ?? "Address to be confirmed"}</dd>
                  </div>
                ))}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                  <dt className="text-ink">WhatsApp</dt>
                  <dd className="text-muted">{whatsappNumber ?? "Number to be confirmed"}</dd>
                </div>
              </dl>

            </>
          )}
        </div>
        <div className="min-w-0 lg:col-span-6 lg:col-start-7">
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
