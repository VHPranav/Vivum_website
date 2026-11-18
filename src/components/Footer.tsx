import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Content } from "@/content";
import { contactRoutes, displayEmail, legalName, whatsappNumber } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { Waves } from "./ui/Waves";
import { ApprovalFlag } from "./ui/Kit";

export function Footer({ locale, footer }: { locale: Locale; footer: Content["footer"] }) {
  const general = contactRoutes.general;
  return (
    <footer className="relative overflow-hidden bg-navy-ink text-white">
      <Waves variant="dark" className="absolute inset-x-0 -top-10 h-40 w-[200%] opacity-70" />
      <div className="container-page relative pt-28 pb-10 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{footer.statement}</p>
            <div className="mt-6 space-y-2 text-sm">
              <p>
                <span className="text-white/50">Email · </span>
                <span className="text-white/90">{displayEmail("general") ?? "address to be confirmed"}</span>
              </p>
              <p>
                <span className="text-white/50">WhatsApp · </span>
                <span className="text-white/90">{whatsappNumber ?? "number to be confirmed"}</span>
              </p>
              {!general.verified && <ApprovalFlag className="mt-1">mailbox and WhatsApp number</ApprovalFlag>}
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {footer.groups.map((g) => (
            <div key={g.title}>
              <p className="eyebrow text-white/50">{g.title}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={localePath(locale, l.href)} className="text-white/80 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {legalName}. All rights reserved.
          </p>
          <p>English · Crnogorski (in preparation)</p>
        </div>
      </div>
    </footer>
  );
}
