import Image from "next/image";
import { reviewMode } from "@/lib/site";

export type Photo = { src: string; alt: string };
export type Tone = "navy" | "green" | "azure" | "gold";

const tones: Record<Tone, string> = {
  navy: "from-[#0d3b7a] via-[#2f6fb3] to-[#9cc3e4]",
  green: "from-[#4c7314] via-[#8bc34a] to-[#e3efd6]",
  azure: "from-[#2f6fb3] via-[#7fb0d8] to-[#dcecc6]",
  gold: "from-[#08285a] via-[#3e6aa0] to-[#e7d49a]",
};

/**
 * Image slot. With a self-hosted `photo` it renders next/image using the caller's `sizes`
 * (which must describe the rendered crop width, not the viewport). Without one it renders a
 * soft gradient panel and, in the review build, a label naming the photograph still needed.
 */
export function Media({
  photo,
  sizes,
  need,
  tone = "navy",
  preload = false,
  className = "",
  labelClass = "top-3 left-3",
  children,
}: {
  photo?: Photo;
  sizes: string;
  need: string;
  tone?: Tone;
  preload?: boolean;
  className?: string;
  /** Where the review-build placeholder label sits, so it does not collide with overlaid text. */
  labelClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {photo ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} quality={75} preload={preload} className="object-cover" />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${tones[tone]}`}>
          <svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 w-full">
            <path d="M0 170C80 130 150 210 230 175S350 120 400 150V300H0Z" fill="#fff" fillOpacity=".14" />
            <path d="M0 220C90 185 170 250 250 215S360 175 400 200V300H0Z" fill="#fff" fillOpacity=".16" />
            <path d="M0 262C100 240 180 285 270 258S370 240 400 250V300H0Z" fill="#fff" fillOpacity=".2" />
          </svg>
          {reviewMode && (
            <span className={`absolute ${labelClass} z-[1] max-w-[85%] rounded-md bg-white/85 px-2.5 py-1.5 text-[0.6875rem] leading-snug text-navy-ink backdrop-blur`}>
              <strong className="font-medium">Image placeholder</strong> · {need}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
