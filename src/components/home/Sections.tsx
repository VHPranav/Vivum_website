import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { ApprovalFlag, Arrow, SectionHead } from "@/components/ui/Kit";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Waves } from "@/components/ui/Waves";
import { Steps } from "./Steps";

type H = Content["home"];

export function WhyVivum({ why }: { why: H["why"] }) {
  return (
    <section aria-labelledby="why-title" className="py-20 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead eyebrow={why.eyebrow} title={<span id="why-title">{why.title}</span>} lede={why.lede} />
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
          {why.points.map((p, i) => (
            <li key={p.title} className="bg-white p-6 md:p-8">
              <Reveal delay={i * 0.06}>
                <span className="font-serif text-sm text-gold" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-[1.375rem] leading-snug font-normal text-navy">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowWeWork({ how }: { how: H["how"] }) {
  return (
    <section aria-labelledby="how-title" className="relative overflow-hidden bg-navy-ink py-20 text-white md:py-32">
      <Waves variant="dark" drift={false} className="absolute inset-x-0 -bottom-10 h-48 w-[200%] opacity-60" />
      <div className="container-page relative">
        <SectionHead tone="light" eyebrow={how.eyebrow} title={<span id="how-title">{how.title}</span>} />
        <div className="mt-14 md:mt-20">
          <Steps steps={how.steps} tone="dark" />
        </div>
      </div>
    </section>
  );
}

export function Network({ locale, network }: { locale: Locale; network: H["network"] }) {
  return (
    <section aria-labelledby="network-title" className="bg-mist/60 py-20 md:py-32">
      <div className="container-page">
        <SectionHead eyebrow={network.eyebrow} title={<span id="network-title">{network.title}</span>} lede={network.lede} />
        <ul className="mt-12 border-t border-navy/10 md:mt-16">
          {network.items.map((n, i) => (
            <li key={n.division} className="border-b border-navy/10">
              <Reveal delay={i * 0.05} className="grid gap-3 py-7 md:grid-cols-12 md:gap-8 md:py-9">
                <h3 className="font-serif text-xl font-normal text-navy md:col-span-4 md:text-2xl">{n.division}</h3>
                <div className="md:col-span-8">
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink/80">{n.body}</p>
                  <ApprovalFlag className="mt-3">{n.approval}</ApprovalFlag>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-col gap-4 rounded-3xl bg-white p-6 sm:flex-row sm:items-center sm:justify-between md:p-8" >
          <div>
            <p className="font-serif text-xl text-navy">{network.roots.title}</p>
            <p className="mt-1 text-sm text-muted">{network.roots.body}</p>
          </div>
          <Link href={localePath(locale, network.roots.link.href)} className="group inline-flex shrink-0 items-center gap-2 text-[0.8125rem] font-medium text-navy">
            {network.roots.link.label}
            <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function Partners({ partners }: { partners: H["partners"] }) {
  return (
    <section aria-labelledby="partners-title" className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead eyebrow={partners.eyebrow} title={<span id="partners-title">{partners.title}</span>} />
          <p className="max-w-sm text-sm text-muted">{partners.note}</p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: partners.slots }, (_, i) => (
            <li key={i} className="flex aspect-[3/2] items-center justify-center rounded-2xl border border-dashed border-navy/20 bg-white text-center text-xs text-muted">
              Partner logo
              <br />
              pending approval
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Team({ team }: { team: H["team"] }) {
  return (
    <section aria-labelledby="team-title" className="bg-cream/60 py-20 md:py-32">
      <div className="container-page">
        <SectionHead eyebrow={team.eyebrow} title={<span id="team-title">{team.title}</span>} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.members.map((m, i) => (
            <li key={m.role}>
              <Reveal delay={i * 0.06} className="flex h-full flex-col">
                {/* Portrait crop: 4:5, about a quarter of the container on desktop. */}
                <Media
                  need={m.name ? `Approved portrait of ${m.name}` : "Approved portrait"}
                  tone={i === 0 ? "navy" : "azure"}
                  sizes="(min-width: 1440px) 320px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                  className="aspect-[4/5] rounded-3xl"
                />
                <h3 className="mt-5 font-serif text-xl font-normal text-navy">{m.name ?? "Team member"}</h3>
                <p className="mt-1 text-sm text-green-deep">{m.role}</p>
                {m.bio && <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>}
                <ApprovalFlag className="mt-3 self-start">{m.approval}</ApprovalFlag>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
