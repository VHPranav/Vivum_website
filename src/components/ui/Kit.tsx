import Link from "next/link";
import { reviewMode } from "@/lib/site";
import { Reveal } from "./Reveal";

type Variant = "navy" | "green" | "outline" | "outline-light" | "white";

const variants: Record<Variant, string> = {
  navy: "bg-navy text-white hover:bg-navy-deep",
  green: "bg-green-deep text-white hover:bg-green",
  white: "bg-white text-navy hover:bg-cream",
  outline: "border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-white",
  "outline-light": "border border-white/50 text-white hover:border-white hover:bg-white/10",
};

export function Button({
  href,
  variant = "navy",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 10"
      aria-hidden
      className={`h-2.5 w-5 shrink-0 transition-transform duration-500 ease-[var(--ease-calm)] group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
    >
      <path d="M0 5h19M14.5 0.5 19 5l-4.5 4.5" />
    </svg>
  );
}

export function Eyebrow({ children, tone = "dark", className = "" }: { children: React.ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-white/80" : "text-green-deep"} ${className}`}>
      <span className="gold-rule" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal className={className}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className={`heading-section mt-5 max-w-3xl ${tone === "light" ? "text-white" : "text-navy"}`}>{title}</h2>
      {lede && <p className={`mt-5 max-w-2xl text-base leading-relaxed md:text-[1.0625rem] ${tone === "light" ? "text-white/75" : "text-muted"}`}>{lede}</p>}
    </Reveal>
  );
}

/** "Client approval required" marker — visible only in the review build. */
export function ApprovalFlag({ children, className = "", tone = "gold" }: { children?: React.ReactNode; className?: string; tone?: "gold" | "navy" }) {
  if (!reviewMode) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] leading-tight font-medium ${tone === "navy" ? "border-navy/15 bg-white text-navy/70" : "border-gold/60 bg-[#f7efd6] text-[#6b5413]"} ${className}`}
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx="6" cy="6" r="5" />
        <path d="M6 3.2v3.3M6 8.4v.4" />
      </svg>
      <span>
        Client approval required{children ? <>: {children}</> : null}
      </span>
    </span>
  );
}
