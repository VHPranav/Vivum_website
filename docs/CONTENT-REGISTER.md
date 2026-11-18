# Content approval register (starter, v1)

Everything below is still **missing or needs client approval** before publishing (brief §14 Gate D, §16). In the review build these items carry a gold "Client approval required" marker on the page. Set `NEXT_PUBLIC_REVIEW_MODE=off` for launch, which hides the markers, unverified email addresses and image-placeholder labels.

Status values: Missing · Draft · Submitted · Approved.

## Brand & corporate

| Item | Where | Status |
| --- | --- | --- |
| Approved VIVUM logo (vector: SVG/PDF, plus a light version for dark backgrounds) | Header, footer, favicon. A typographic stand-in is used for now (`src/components/Wordmark.tsx`) | Missing |
| Confirm palette & fonts (navy `#0d3b7a`, greens `#6a9a1f`–`#8bc34a`, gold `#c9a23a`; Source Serif 4 standing in for "Late Serif", Poppins) | Whole site | Draft |
| Exact legal identity ("VIVUM Group d.o.o.") and AYUSH relationship/ownership wording | Footer, Network section | Draft |
| Final domain | `NEXT_PUBLIC_SITE_URL`, canonicals, sitemap | Missing |

## Homepage

| Item | Status |
| --- | --- |
| Hero H1, supporting line, CTAs (taken verbatim from brief §4) | Draft |
| Division card texts and CTAs (from brief §4) | Draft |
| Why VIVUM / How We Work copy (written by Outrift from the brief) | Draft |
| Network wording for AYUSH, University Mediteran, Kinster, consulting partners | Draft (approval required) |
| Partner logos plus written permission for each | Missing |
| Team: names, roles, bios, portraits for the Wellbeing, Education and Workforce leads | Missing |
| Dr Sandra Kordić: approved biography and portrait | Draft (text from her documents) |

## Consulting (`/consulting`)

| Item | Status |
| --- | --- |
| Six-category structure (brief §9 / §19.5) and service descriptions (from the VIVUM 1 documents) | Draft |
| Indicative fee tables (from *VIVUM Price List 2026*): approve publishing, or switch to quotation wording only | Approval required |
| Payment terms (40/40/20, €100/h additional work) | Approval required |
| Independence statement (no services to banks; conflict-of-interest check) | Draft |
| Whether the introductory conversation is free or paid (the site currently does not say "free") | Missing |
| FAQ answers | Draft |

## Wellbeing / Education / Workforce (stubs)

| Item | Status |
| --- | --- |
| AYUSH London: address, hours, practitioners, treatments, GBP prices, booking flow, UK terms | Missing |
| AYUSH Montenegro: address, hours, practitioners, treatments, EUR prices, booking flow, ME terms | Missing |
| VIVUM programmes: which of the six categories are approved, durations (5/7/14/21/28 days), packages, EUR prices, clinical wording review | Missing |
| Education: University Mediteran programme list, English-taught courses, intakes, tuition, VIVUM service fees, approved cooperation wording | Missing |
| Workforce: Kinster responsibility matrix, confirmed sectors, process with responsible parties, employer fee model | Missing (sources in `VIVUM 2` still to be reviewed) |

## Contact & operations

| Item | Status |
| --- | --- |
| Verified mailboxes for each route (see `docs/SITEMAP.md`) | Missing |
| WhatsApp business number | Missing |
| Email provider and lead store (forms validate but do not deliver yet) | Missing |
| Privacy notice, terms and cookie policy text | Missing |
| Analytics / consent choice | Missing |

## Imagery needed (no stock implying real clinics, people or partner sites)

Every image slot is a soft gradient placeholder labelled with the photograph it needs. Images should be self-hosted in `/public/images`; each slot already sets crop-aware `sizes`.

| Slot | Crop | Needed |
| --- | --- | --- |
| Wellbeing card | 4:3 (desktop), square (phone) | Calm treatment or programme setting in Montenegro, genuine VIVUM/AYUSH photography |
| Education card | 4:3 | Students in a Montenegrin campus or city setting (university imagery only with permission) |
| Workforce card | 4:3 | Hospitality or construction team at work (confirmed sectors only) |
| Consulting card | 4:3 | Workshop or board-room working session |
| Team portraits ×4 | 4:5 | Approved portraits of the division leads |
| Consulting benefits | 16:9 | Working session with a client team (approved) |
| Dr Sandra Kordić | 4:5 | Approved professional portrait |
