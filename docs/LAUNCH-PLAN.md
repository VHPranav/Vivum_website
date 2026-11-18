# VIVUM completion plan

## Implemented in the current local changes

- Retain the original Our services showcase; omit the additional four-card block per the latest request.
- Primary buttons linked to each area's own enquiry section; workforce wording matches the PDF.
- A tailored form on each of the four landing pages.
- Contact-page fields change with the selected business area.
- Process steps, FAQs, and a description of responsibilities on all four landing pages.
- Distinct employer and candidate paths. Candidate enquiries use the general route; no unsupported job listings or application upload.
- Server-side validation, required consent and explicit preview-only confirmation when delivery is unconfigured.
- Supabase enquiry-storage and Resend notification adapters; a private enquiry-table migration.

New non-consulting FAQ and process copy is draft, based on the brief. VIVUM must check service details before launch. Existing consulting copy is reused. No qualifications, partner endorsements, job openings or testimonials have been invented.

## Recommended services

- Sanity Studio for approved service, programme, partner and bilingual editorial content: https://www.sanity.io/docs/studio/schemas-and-forms
- Supabase for private enquiry records and new / in progress / closed status: https://supabase.com/docs/guides/database/overview
- Resend for notification emails from a verified sender domain: https://resend.com/docs/api-reference/emails/send-email

Sanity is a recommendation, not installed or connected in this change. Content remains in the repository. Supabase and Resend adapters are prepared but not live until the following setup is completed.

## Connect enquiries

1. Create the Supabase project in the agreed region. Apply `supabase/migrations/202611190001_enquiries.sql` and ensure this table is exposed to the server-side Data API. Browser roles have no table access.
2. Configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as private Vercel environment variables. Never expose the service-role key in client code.
3. Set up Resend, verify the sender domain, and add `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL`.
4. Confirm each recipient mailbox with VIVUM and configure `ENQUIRY_TO_GENERAL`, `ENQUIRY_TO_WELLBEING`, `ENQUIRY_TO_CONSULTING`, `ENQUIRY_TO_WORKFORCE`, and `ENQUIRY_TO_EDUCATION`.
5. Redeploy and test all five routes using approved test addresses. Check storage, consent timestamp, email content, visitor reply address and failure behaviour.
6. Assign an enquiry-inbox owner. The Supabase table is the initial internal inbox, not a custom CRM UI. Failed or missing email notifications remain visible as failed/pending records. There is no automatic retry worker in this change; add scheduled retry and alerting before depending on email alone.

Storage is the source of truth. Storage failure shows an error. A stored enquiry is received even if notification fails; it must be followed up from the inbox. With no storage configuration, review mode shows a clearly labelled preview. Launch mode refuses to report success. Review mode is not a data sandbox: with storage configured, submissions are stored.

## CMS and Montenegrin implementation

1. Create Sanity project/dataset and define service, FAQ, process, practitioner, programme, partner and site-settings schemas with language and publication-approval fields.
2. Import existing English copy as drafts, connect published content to the Next.js pages and add preview/revalidation.
3. Add Montenegrin drafts, obtain native-language review, then enable `/me` routes, the language switch and language-specific metadata/sitemap entries. Do not enable a switch that serves English under a Montenegrin label.
4. Give VIVUM editors accounts and verify their publish workflow. No CMS accounts, project or editor permissions have been created yet.

## Content and launch dependencies

VIVUM must supply or confirm:

- Approved treatments/programmes, practitioners and qualifications, locations and hotel arrangements.
- Authorised universities/programmes, requirements, intakes and contact details.
- Recruitment/technology partner names, responsibilities and publication approvals.
- Approved biographies, genuine team photographs and any testimonials with permission to publish.
- Confirmed public email addresses and WhatsApp business number.
- Privacy controller/contact details, purposes, lawful basis, retention, processors/transfers and the applicable approved privacy/terms/cookie text. The legal pages remain placeholders; do not present them as completed legal documents.

After the content and integrations are approved: replace review markers, enable only confirmed contacts, test keyboard/mobile/desktop flows, set the final canonical domain and disable review-mode indexing restrictions. Consent UI already exists; this does not replace the final privacy information.
