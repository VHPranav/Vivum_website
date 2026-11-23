import Link from "next/link";
import { SplitLines } from "@/components/motion/Text";
import { localePath, type Locale } from "@/i18n/config";
import { Arrow } from "@/components/ui/Kit";

const previewEvents = [
  {
    category: "Wellbeing",
    title: "An introduction to Ayurveda & wellbeing",
    description: "A sample session exploring a personal approach to wellbeing, with time for questions and conversation.",
  },
  {
    category: "Business & connections",
    title: "Meet VIVUM: business in Montenegro",
    description: "A sample networking event bringing together people interested in business, partnerships and opportunities in Montenegro.",
  },
];

export function UpcomingEvents({ locale }: { locale: Locale }) {
  return (
    <section id="events" aria-labelledby="events-title" className="bg-[#f1f0ec] py-16 md:py-24">
      <div className="container-page">
        <p className="label flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" />
          Upcoming events
        </p>
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <SplitLines as="h2" id="events-title" className="display-m max-w-[16ch] text-navy lg:col-span-6">
            Stay connected with VIVUM.
          </SplitLines>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-xs font-medium tracking-[0.12em] text-navy uppercase">Event preview</p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink md:text-lg">
              A preview of how future VIVUM events could look. These are sample events; dates, venues and programmes are not confirmed.
            </p>
            <Link href={localePath(locale, "/contact")} className="link-u mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-navy">
              Enquire about events
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
          {previewEvents.map((event, index) => (
            <article key={event.title} aria-labelledby={`event-${index}-title`} className="border-t border-navy/20 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-navy">
                <span>{event.category}</span>
                <span className="text-muted">Sample event · Date TBC</span>
              </div>
              <h3 id={`event-${index}-title`} className="mt-6 max-w-[25ch] text-2xl leading-tight tracking-[-0.02em] text-navy md:text-3xl">
                {event.title}
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">{event.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
