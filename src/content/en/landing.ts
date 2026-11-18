import { consulting } from "./consulting";
import type { DivisionId } from "./common";

// Draft answers use only the supplied brief and existing service copy. VIVUM should review
// service details before launch; approved names, qualifications and testimonials are separate.
export type LandingContent = {
  audience: string;
  process: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  responsibilities: { title: string; body: string }[];
  evidenceNeeded: string;
};

export const landingContent: Record<DivisionId, LandingContent> = {
  wellbeing: {
    audience: "For people exploring Ayurveda treatments and wellbeing programmes in Montenegro.",
    process: [
      { title: "Tell us your interests", body: "Choose a consultation, treatments or a programme and share your preferred dates. Please keep medical details out of the enquiry form." },
      { title: "Start with a consultation", body: "Discuss your goals and suitability with the practitioner before deciding on treatments." },
      { title: "Agree your programme", body: "Confirm the proposed treatments, delivery location, dates and fees before booking." },
      { title: "Confirm any accommodation separately", body: "Where a partner hotel is involved, treatment services and accommodation are explained separately." },
    ],
    faq: [
      { q: "Where do I start?", a: "Request a personal consultation. Tell us your area of interest and preferred dates so we can discuss the next step." },
      { q: "Is accommodation included?", a: "Our offer centres on treatments and programmes. Accommodation with a partner hotel is described and arranged separately; confirm the inclusions before booking." },
      { q: "Can I choose a treatment before the consultation?", a: "You can tell us what interests you. The practitioner will discuss suitability and recommendations during your consultation." },
      { q: "Should I send my medical history with the enquiry?", a: "Please do not include health information in this form. Discuss relevant medical details directly with the practitioner during the consultation." },
    ],
    responsibilities: [
      { title: "Practitioners", body: "Discuss individual needs and suitability for treatments. Ask for the relevant practitioner's qualifications before booking." },
      { title: "Partner hotels", body: "Provide accommodation under the hotel's own booking arrangements. Treatment and accommodation inclusions should be confirmed separately." },
    ],
    evidenceNeeded: "approved treatment and programme details, practitioner names and verified qualifications, delivery locations and partner hotels",
  },
  consulting: {
    audience: "For business owners, leaders and management teams seeking clearer direction and practical improvements.",
    process: consulting.process.steps,
    faq: consulting.faq.items,
    responsibilities: [
      { title: "VIVUM advisory", body: "Leads the advisory work, diagnoses needs, designs processes and specifies requirements. Coordinates partners and checks agreed results." },
      { title: "Technology and legal partners", body: "Technology partners deliver development, integration and licences. Engaged legal experts confirm legal applicability and provide legal opinions. Their scope and fees are agreed separately." },
    ],
    evidenceNeeded: "approved biography, verified qualifications and portrait for Dr Sandra Kordić, and any authorised partner or client references",
  },
  workforce: {
    audience: "For employers defining their staffing requirements and international candidates exploring the recruitment process.",
    process: [
      { title: "Submit your staffing requirements", body: "Tell us your company, roles, number of employees, work location and expected timing." },
      { title: "Define the profiles", body: "Agree the experience and skills needed for each role and clarify the scope of support." },
      { title: "Source and select", body: "Recruitment partners coordinate sourcing and pre-selection. Employers interview and make their selection." },
      { title: "Coordinate the next steps", body: "Agree responsibilities for employment and any specialist administrative support before proceeding." },
    ],
    faq: [
      { q: "What should an employer include in an enquiry?", a: "Include the company name, roles, number of employees required, work location and expected start. The employer form below includes dedicated fields for each." },
      { q: "Who sources candidates and who selects them?", a: "VIVUM coordinates with recruitment partners on sourcing and pre-selection. The employer interviews and chooses candidates. Responsibilities are confirmed in the engagement arrangements." },
      { q: "I am a candidate. Is this an application for a specific job?", a: "No. The candidate route is for questions about recruitment partners and the selection process. Ask about confirmed openings and the appropriate application route before sending documents." },
      { q: "Who handles additional administrative support?", a: "Specialist providers may support administrative steps where needed. The responsible parties and scope must be clarified before proceeding." },
      { q: "Are placement or permit outcomes guaranteed?", a: "No placement or permit outcome is guaranteed. Responsibilities follow the signed agreements and applicable requirements." },
    ],
    responsibilities: [
      { title: "VIVUM", body: "Understands employer requirements, helps define profiles and coordinates with recruitment partners and specialist providers." },
      { title: "Recruitment partners", body: "Coordinate candidate sourcing and pre-selection under the agreed recruitment arrangements." },
      { title: "Employers", body: "Define staffing needs, interview and select candidates, and fulfil the employer responsibilities agreed for the engagement." },
    ],
    evidenceNeeded: "confirmed recruitment partners, authorised references, open roles and sector details",
  },
  education: {
    audience: "For prospective international students exploring programmes and preparing an application.",
    process: [
      { title: "Share your study interests", body: "Tell us your country, intended study level, programme interests and preferred intake." },
      { title: "Discuss suitable options", body: "Review programmes from institutions VIVUM is authorised to present and clarify the entry requirements." },
      { title: "Prepare your application", body: "Understand the required documents and organise your application with guidance on the relevant next steps." },
      { title: "Receive the university's decision", body: "The university considers the application and makes its own admission and academic decisions." },
    ],
    faq: [
      { q: "Which universities and programmes can I enquire about?", a: "VIVUM presents only institutions and programmes it is authorised to represent. Ask for the confirmed programme list and relevant intake details." },
      { q: "What information should I provide first?", a: "Share your country, intended study level, programme interests and preferred intake. Please do not upload identity documents through this enquiry form." },
      { q: "What support does VIVUM provide?", a: "Support includes understanding programme requirements and organising application documents. The scope and relevant contacts should be confirmed for your chosen programme." },
      { q: "Does VIVUM decide whether I am admitted?", a: "No. Admission and academic decisions remain with the university. VIVUM does not guarantee admission, visas or residence permits." },
    ],
    responsibilities: [
      { title: "VIVUM", body: "Presents authorised opportunities and helps students understand requirements and organise application documents." },
      { title: "Students and universities", body: "Students provide application information and documents. Universities set programme requirements and make admission and academic decisions." },
    ],
    evidenceNeeded: "authorised institution names, programme details, intake dates, partner approvals and relevant contacts",
  },
};
