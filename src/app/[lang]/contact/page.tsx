import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getContent } from "@/content";
import {
  contactRoutes,
  displayEmail,
  legalName,
  reviewMode,
  whatsappNumber,
  type RouteId,
} from "@/lib/site";
import { ApprovalFlag } from "@/components/ui/Kit";
import { SplitLines } from "@/components/motion/Text";
import { StepForm } from "@/components/forms/StepForm";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { contactPage } = getContent(lang);
  return {
    title: contactPage.title,
    description: contactPage.lede,
    alternates: { canonical: localePath(lang, "/contact") },
  };
}

const areaRoutes: RouteId[] = [
  "wellbeing",
  "consulting",
  "workforce",
  "education",
];

// After the Tresmares Capital contact page: big title, contact columns, photo cut by diagonal
// bands — followed by the routed enquiry form. Mailboxes are proposed until VIVUM confirms them.
export default async function ContactPage({
  params,
  searchParams,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const sp = await searchParams;
  const area =
    typeof sp.area === "string" && areaRoutes.includes(sp.area as RouteId)
      ? sp.area
      : undefined;

  return (
    <>
      {/* Hero: title + contact columns over a light ground, photo with diagonal cuts */}
      <section
        aria-labelledby="contact-title"
        className="relative overflow-hidden bg-[#f2f2f0] pt-[4.5rem]"
      >
        <div className="relative grid min-h-[calc(100svh-4.5rem)] lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-between gap-16 px-5 pt-[8vw] pb-[6vw] md:px-6 lg:pt-[5vw]">
            <div>
              <SplitLines
                as="h1"
                id="contact-title"
                on="load"
                delay={0.1}
                className="max-w-[11ch] text-[clamp(3rem,1rem+5.4vw,7rem)] leading-[0.92] font-medium tracking-[-0.035em] text-navy"
              >
                Contact VIVUM Group
              </SplitLines>
              <SplitLines
                as="p"
                on="load"
                delay={0.35}
                className="mt-8 max-w-[24rem] text-[1.125rem] leading-[1.3] font-medium text-ink"
              >
                {c.contactPage.lede}
              </SplitLines>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
                <div className="col-span-2 md:col-span-1">
                  <h2 className="border-b border-ink/15 pb-2 text-[1.35rem] font-medium tracking-[-0.01em] text-ink">
                    {contactRoutes.general.team}
                  </h2>
                  <ul className="mt-3 space-y-1.5 text-[0.75rem] text-ink/80">
                    <li>{legalName}</li>
                    <li>Montenegro</li>
                    <li>
                      {displayEmail("general") ?? "Address to be confirmed"}
                    </li>
                    <li>
                      WhatsApp: {whatsappNumber ?? "number to be confirmed"}
                    </li>
                  </ul>
                </div>
                {areaRoutes.map((rid) => (
                  <div key={rid}>
                    <h2 className="border-b border-ink/15 pb-2 text-[1.05rem] font-medium tracking-[-0.01em] text-ink">
                      {
                        c.divisions
                          .find((d) => d.id === rid)
                          ?.name.split(" & ")[0]
                      }
                    </h2>
                    <ul className="mt-3 space-y-1.5 text-[0.75rem] text-ink/80">
                      <li>{contactRoutes[rid].team}</li>
                      <li>{displayEmail(rid) ?? "Address to be confirmed"}</li>
                    </ul>
                  </div>
                ))}
              </div>
              <ApprovalFlag className="mt-6">
                mailboxes, WhatsApp number and office address
              </ApprovalFlag>
            </div>
          </div>

          <div aria-hidden className="relative min-h-[60svh] lg:min-h-0">
            <Image
              src="/images/about-hero.webp"
              alt=""
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={90}
              className="object-cover grayscale-[30%]"
            />
            {/* diagonal bands in the page colour, as in the reference */}
            <div className="absolute inset-0 bg-[#f2f2f0] [clip-path:polygon(0_0,38%_0,0_62%)]" />
            <div className="absolute inset-0 bg-[#f2f2f0] [clip-path:polygon(0_100%,0_70%,55%_100%)]" />
            <div className="absolute inset-0 bg-[#f2f2f0]/90 [clip-path:polygon(62%_0,100%_0,100%_14%,74%_46%)]" />
            <div className="absolute inset-0 bg-[#f2f2f0]/80 [clip-path:polygon(0_44%,100%_38%,100%_41%,0_48%)]" />
          </div>
        </div>
      </section>

      {/* Form */}
      <section
        id="contact"
        aria-labelledby="form-title"
        className="scroll-mt-20 bg-white px-5 py-[10vw] md:px-6 md:py-[7vw]"
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SplitLines
                as="h2"
                id="form-title"
                className="max-w-[12ch] text-[clamp(2.5rem,1rem+3.6vw,4.75rem)] leading-[0.95] font-medium tracking-[-0.03em] text-navy"
              >
                Send us a message
              </SplitLines>
              <p className="mt-6 max-w-[22rem] text-[1.05rem] leading-[1.35] text-ink/80">
                Three short steps: choose an area, tell us who you are, then
                what you need. Your message goes straight to the right team, and
                we reply in English or Montenegrin.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <StepForm
              locale={lang}
              areas={c.divisions.map((d) => ({ id: d.id, name: d.name, description: d.description }))}
              copy={c.formCopy}
              routes={contactRoutes}
              reviewMode={reviewMode}
              defaultArea={area}
            />
          </div>
        </div>
      </section>
    </>
  );
}
