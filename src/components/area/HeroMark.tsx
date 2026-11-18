import type { ReactNode } from "react";

/**
 * Wide hero compositions for the four area pages (after the large brand marks on the Tresmares
 * solution pages). Each child shape animates in on its own ([data-symbol] > *).
 */
export function HeroMark({ id, className = "" }: { id: string; className?: string }) {
  const marks: Record<string, ReactNode> = {
    // sun rising over the bay: gold half-disc, three wave bands
    wellbeing: (
      <>
        <path d="M150 120a110 110 0 0 1 220 0Z" className="fill-gold" />
        <path d="M0 138c65-22 130-22 195 0s130 22 195 0 85-22 130-14v22c-45-8-65 14-130 14s-130-22-195 0-130 22-195 0Z" />
        <path d="M40 176c55-18 110-18 165 0s110 18 165 0 100-14 150-6v20c-50-8-85 6-150 6s-110-18-165 0-110 18-165 0Z" fillOpacity={0.6} />
        <path d="M110 208c45-14 90-14 135 0s90 14 135 0v18c-45 14-90 14-135 0s-90-14-135 0Z" fillOpacity={0.3} />
      </>
    ),
    // three ascending slanted bands: direction and growth
    consulting: (
      <>
        <path d="M0 230 120 230 200 150 80 150Z" fillOpacity={0.3} />
        <path d="M120 230 260 230 400 90 260 90Z" fillOpacity={0.6} />
        <path d="M260 230 400 230 520 10 380 10Z" />
        <path d="M430 10h90v90Z" className="fill-gold" />
      </>
    ),
    // people across borders: a row of overlapping circles, one highlighted
    workforce: (
      <>
        <circle cx="90" cy="125" r="90" fillOpacity={0.25} />
        <circle cx="200" cy="125" r="90" fillOpacity={0.45} />
        <circle cx="310" cy="125" r="90" className="fill-gold" />
        <circle cx="420" cy="125" r="90" fillOpacity={0.85} />
      </>
    ),
    // open book with a rising arc of opportunity
    education: (
      <>
        <path d="M260 230C210 190 120 180 40 200V90c80-20 170-10 220 30Z" fillOpacity={0.7} />
        <path d="M260 230c50-40 140-50 220-30V90c-80-20-170-10-220 30Z" />
        <path d="M150 70a110 70 0 0 1 220 0h-28a82 46 0 0 0-164 0Z" className="fill-gold" />
        <circle cx="260" cy="20" r="16" />
      </>
    ),
  };
  return (
    <svg data-symbol viewBox="0 0 520 240" aria-hidden className={className} fill="currentColor">
      {marks[id]}
    </svg>
  );
}
