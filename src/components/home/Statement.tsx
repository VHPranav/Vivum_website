import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { FillText } from "@/components/motion/Text";
import { Rise } from "@/components/motion/Rise";

/** Centred label + statement whose letters fill in with scroll (Tresmares "text block large"). */
export function Statement({
  locale,
  id,
  label,
  statement,
  body,
  link,
  facts,
}: {
  locale: Locale;
  id: string;
  label: string;
  statement: string;
  body?: string;
  link?: { label: string; href: string };
  facts?: { k: string; v: string }[];
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="scroll-mt-20 py-24 md:py-40">
      <div className="container-page">
        <div className="mx-auto max-w-5xl text-center">
          <h2 id={`${id}-label`} className="label">
            {label}
          </h2>
          <FillText className="mx-auto mt-6 max-w-[24ch] font-serif text-[clamp(2rem,1rem+2.9vw,3.6rem)] leading-[1.05] font-light tracking-[-0.02em] text-navy">{statement}</FillText>
          {body && <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{body}</p>}
          {link && (
            <Link href={localePath(locale, link.href)} className="link-u mt-8 inline-block text-[0.875rem] font-medium text-navy">
              {link.label}
            </Link>
          )}
        </div>
        {facts && (
          <Rise as="dl" className="mx-auto mt-20 grid max-w-6xl gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-3 md:mt-28">
            {facts.map((f) => (
              <div key={f.v} data-rise className="bg-paper px-6 py-8 text-center md:py-12">
                <dt className="display-l text-green-deep">{f.k}</dt>
                <dd className="mt-3 text-sm text-muted">{f.v}</dd>
              </div>
            ))}
          </Rise>
        )}
      </div>
    </section>
  );
}
