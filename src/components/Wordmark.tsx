/**
 * Logo slot. Typographic stand-in until the approved VIVUM logo files arrive.
 * To swap: put the files in /public/brand and render them here with next/image
 * (keep the same height so the header layout does not shift).
 */
export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className={`flex flex-col leading-none ${tone === "light" ? "text-white" : "text-navy"}`}>
      <span className="font-serif text-[1.375rem] font-normal tracking-[0.32em] md:text-[1.5rem]">VIVUM</span>
      <span className={`mt-1 text-[0.5625rem] font-medium tracking-[0.5em] ${tone === "light" ? "text-white/70" : "text-green-deep"}`}>GROUP</span>
    </span>
  );
}
