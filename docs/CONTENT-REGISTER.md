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

## Decisions to confirm

| Item | Status |
| --- | --- |
| Navigation and area names follow Sandra's 12 Nov email, not the 7 Nov master brief (which used Home / Wellbeing / Education / Workforce / Consulting / About / Contact and "Business Transformation & Executive Advisory") | Approval required |
| Consulting grouped into Sandra's five areas (the master brief asked for six fixed categories) | Approval required |
| Homepage follows Tresmares 1:1: the four area cards no longer sit directly under the opening (Sandra asked for them there); the areas appear in the pinned showcase after the About and figures sections | Approval required |
| Homepage contact form moved to /contact; the footer is the homepage's closing call to action | Approval required |

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

## AI-generated images in use (Google Flow, Nano Banana 2.1) — client approval required

`public/images/vivum-hero.webp` (mountains above clouds), `vivum-wellbeing.webp`, `vivum-consulting.webp`, `vivum-workforce.webp`, `vivum-education.webp`, each 2446×1376 (Flow 2K upscale, cropped to remove the Gemini mark). They are illustrative, not photos of real VIVUM venues, clients, partner hotels or universities; replace with genuine photography where it would otherwise imply a real place or person.

## Imagery needed (no stock implying real clinics, people or partner sites)

| Hero landscape | full-bleed, 16:9 and portrait crops | A Montenegrin mountain or coastal landscape (the painted ridges are a stand-in; clouds are rendered live on top) |

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
