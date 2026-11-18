import Image from "next/image";

export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${tone === "light" ? "text-white" : "text-navy"}`}>
      <Image
        src="/brand/vivum-mark.png"
        alt=""
        width={48}
        height={48}
        className="h-10 w-10 object-contain md:h-12 md:w-12"
        priority
      />
      <span className="font-[Georgia,Times_New_Roman,serif] text-[1.375rem] leading-none font-normal tracking-[0.12em] md:text-[1.5rem]">VIVUM</span>
      <span className="sr-only">Group</span>
    </span>
  );
}
