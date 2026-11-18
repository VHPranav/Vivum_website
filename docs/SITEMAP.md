# VIVUM Group — sitemap & navigation (v1, for review)

Follows Sandra Kordić's direction of 12 Nov 2026 ("Vivum website — answer on WhatsApp proposals") for navigation, area names and calls to action, and the *Master Implementation Brief v2.0* (7 Nov 2026) for content rules (no invented prices, partners or claims). English is live at clean URLs; Montenegrin is planned under `/me/…`.

## Main navigation

`Home | About | Our Services ▾ | Partners | Contact`, with an `EN | ME` language switch and a "Get in touch" button. Our Services opens a menu with all four areas and their audience paths (e.g. Workforce → For employers / For candidates). ME is a disabled placeholder until translations are approved.

## Reference sites → where they are used

| Reference | Used for |
| --- | --- |
| Tresmares Capital (main structure) | Full-text hero layout, centred statements whose letters fill in on scroll, facts row, pinned full-screen showcase of the four areas with anchor tabs, rise-in "magnet" items, underline-run links, hide-on-scroll header |
| Prime Exits (benefits, next steps) | Masked line reveals, first-visit intro wipe, live local clock (Podgorica), pinned horizontal benefits row, process list with a filling progress line, auto-rotating tabs with wipe-revealed images, giant contact marquee |
| Sphere Digital Recruitment (audience routing) | "Find your path" audience selector, audience paths in the services menu, For employers / For candidates split, rounded image tiles |

## Pages

| URL | Page | Status in v1 | Main conversion |
| --- | --- | --- | --- |
| `/` | Home: opening, 4 area cards, About VIVUM, Our services (pinned showcase), Why work with us, How we work, Find your path, Partners & experience, Contact | **Built** | Area card click · routed enquiry |
| `/consulting` | Business Consulting & Digital Solutions: client needs, five service areas, benefits, process, fees, Dr Sandra Kordić, FAQ, tailored form | **Built (sample landing page)** | Discuss your business needs |
| `/wellbeing` | Wellbeing & Longevity landing page (treatments & programmes) | Structured stub + tailored form | Book a consultation |
| `/wellbeing/ayush-london` | AYUSH London clinic: address, practitioners, treatments, **GBP** prices, booking, UK terms | Planned | Request appointment (until a calendar is integrated) |
| `/wellbeing/ayush-montenegro` | AYUSH Montenegro clinic: address, practitioners, treatments, **EUR** prices, booking, ME terms | Planned | Request appointment |
| `/wellbeing/programmes` | VIVUM programmes, separate from clinical menus (six proposed categories) | Planned | Programme enquiry |
| `/education` | Education & International Opportunities: institutions, requirements, application journey | Structured stub + tailored form | Enquire about study programmes |
| `/workforce` | International Workforce Solutions, with `#employers` and `#candidates` paths | Structured stub + employer form (roles, headcount, location, timing) | Submit your staffing requirements |
| `/about` | Company, expertise, international connections, team | Structured stub | — |
| `/partners` | Approved partners, projects and testimonials | Structured stub | — |
| `/contact` | Service-choice contact with separate routes per division | **Built** | Routed enquiry |
| `/privacy`, `/terms`, `/cookies` | Legal pages (`noindex` until approved text exists) | Placeholder | — |

AYUSH London and AYUSH Montenegro stay separate pages with no shared price list or booking form (§19.2). India is not a top-level destination (§1).

## Footer

All four divisions · About · Our Roots & International Network · Contact · Privacy · Terms · Cookies · general email and WhatsApp (both still to be confirmed).

## Redirects (old → new)

| Old | New | Type |
| --- | --- | --- |
| `/en/*` | `/*` | 308 (English lives at clean URLs) |
| `/vivum` | `/` | 307 until the domain strategy is approved |
| `/vivum/consulting` | `/consulting` | 307 |
| `/vivum/recruitment` | `/workforce` | 307 |

The `/vivum/*` routes lived on the AYUSH site. The same redirects must also go on that domain, pointing at the final VIVUM domain.

## Language variants

- `en`: live, clean URLs (`/consulting`).
- `me`: planned at `/me/consulting` etc. To enable it, add `"me"` to `locales` in `src/i18n/config.ts` and `LOCALES` in `src/proxy.ts`, then add `src/content/me/` with the same shape as `src/content/en/`. Translations need human review before publishing (§12).

## Audience journeys

| Audience | Path | Conversion |
| --- | --- | --- |
| Wellbeing guest | Home → Wellbeing → AYUSH London / AYUSH Montenegro / VIVUM Programmes | Request appointment (clinic) or programme enquiry |
| International student | Home → Education | Student guidance request (name, email, country, study level, programme, intake) |
| Montenegrin employer | Home → Workforce | Employer quotation (company, industry, roles, worker count, timing) |
| Business leader | Home → Consulting → problem matcher → service area | Book Business Consultation (organisation, size, area, challenge, timing) |

## Enquiry routing (proposed aliases, not yet live)

| Route | Proposed inbox |
| --- | --- |
| General | info@vivumgroup.com |
| Wellbeing | wellbeing@vivumgroup.com |
| Education | education@vivumgroup.com |
| Workforce | workforce@vivumgroup.com |
| Consulting | consulting@vivumgroup.com |
| AYUSH London | contact@ayushuk.com (verify ownership) |
| AYUSH Montenegro | ayush.montenegro@vivumgroup.com |

These addresses are configured in `src/lib/site.ts`. Each one is shown only in the review build until it is marked `verified: true`. Forms validate on the server (required fields, email format, allowed options, consent, honeypot and minimum fill time). Delivery is not connected yet; see `src/lib/enquiry.ts`.
