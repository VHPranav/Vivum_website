import type { ReactNode } from "react";

/** Bold geometric marks for the four areas (dropdown tiles), one accent each — gold on wellbeing. */
export function AreaSymbol({ id, className = "", mono = false }: { id: string; className?: string; mono?: boolean }) {
  const shapes: Record<string, ReactNode> = {
    // rising sun over water: half-disc above two stacked bars
    wellbeing: (
      <>
        <path d="M8 30a22 22 0 0 1 44 0Z" className={mono ? undefined : "fill-gold group-hover:fill-white"} />
        <rect x="8" y="36" width="44" height="7" />
        <rect x="16" y="48" width="28" height="7" />
      </>
    ),
    // growth steps
    consulting: (
      <>
        <rect x="6" y="38" width="14" height="18" />
        <rect x="23" y="24" width="14" height="32" />
        <rect x="40" y="6" width="14" height="50" />
      </>
    ),
    // two linked circles: people across borders
    workforce: (
      <>
        <circle cx="22" cy="30" r="16" />
        <circle cx="38" cy="30" r="16" fillOpacity={0.55} />
      </>
    ),
    // open book / chevron stack
    education: (
      <>
        <path d="M30 6 56 20 30 34 4 20Z" />
        <path d="M12 30v12l18 10 18-10V30L30 40Z" />
      </>
    ),
  };
  return (
    <svg data-symbol viewBox="0 0 60 60" aria-hidden className={className} fill="currentColor">
      {shapes[id]}
    </svg>
  );
}
