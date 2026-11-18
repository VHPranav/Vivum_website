# VIVUM Group — sitemap & navigation (v1, for review)

Follows *VIVUM Website Master Implementation Brief v2.0* (7 Nov 2026), §3–§5. English is live at clean URLs; Montenegrin is planned under `/me/…`.

## Main navigation

`Home | Wellbeing | Education | Workforce | Consulting | About | Contact` with an `EN | ME` language switch. ME is shown as a disabled placeholder until translations are approved.

## Pages

| URL | Page | Status in v1 | Main conversion |
| --- | --- | --- | --- |
| `/` | Home: hero, 4 equal division cards, Why VIVUM, How We Work, Expertise & International Network, Selected Partners, Meet Our Team, Select Your Service / Contact | **Built** | Division card click · general enquiry |
| `/consulting` | Business Transformation & Executive Advisory: the six categories, pricing, Dr Sandra Kordić, FAQ, consultation form | **Built (sample division page)** | Book Business Consultation |
| `/wellbeing` | Division overview + selector for AYUSH London / AYUSH Montenegro / VIVUM Programmes | Structured stub | Request appointment · programme enquiry |
| `/wellbeing/ayush-london` | AYUSH London clinic: address, practitioners, treatments, **GBP** prices, booking, UK terms | Planned | Request appointment (until a calendar is integrated) |
| `/wellbeing/ayush-montenegro` | AYUSH Montenegro clinic: address, practitioners, treatments, **EUR** prices, booking, ME terms | Planned | Request appointment |
| `/wellbeing/programmes` | VIVUM programmes, separate from clinical menus (six proposed categories) | Planned | Programme enquiry |
| `/education` | Study in Montenegro: University Mediteran cooperation, programmes, admission steps, fees | Structured stub | Apply / enquire |
| `/workforce` | International Workforce for Montenegrin employers: Kinster partnership, eight content sections | Structured stub | Request employer quotation |
| `/about` | Company, team, partners, `#network` Our Roots & International Network (India lives here) | Structured stub | — |
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
