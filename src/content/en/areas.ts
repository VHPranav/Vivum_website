// Area pages — one structure for all four areas, after the Tresmares Capital "Financial Solutions"
// pages: symbol hero + facts row → scattered gallery with sticky text → grey table → other areas.
// Facts are descriptive only (no invented figures, dates, partners or prices). Consulting rows come
// from Sandra's source documents (see consulting.ts). Client approval required before launch.

import { consulting } from "./consulting";

export type AreaFact = { k: string; v: string };
export type AreaTableGroup = { name: string; rows: string[][] };
export type AreaPage = {
  /** Title split over two lines, as in the reference. */
  title: [string, string];
  lede: string;
  facts: AreaFact[];
  gallery: { heading: string; text: string; images: string[] };
  table: { heading: [string, string]; intro: string; columns: string[]; groups: AreaTableGroup[]; note?: string };
  cta: { label: string; href: string };
  approval: string;
};

export const areaPages = {
  wellbeing: {
    title: ["Wellbeing &", "Longevity"],
    lede: "Ayurveda treatments and wellbeing programmes in Montenegro, shaped around each person and always starting with a personal consultation.",
    facts: [
      { k: "Location", v: "Montenegro" },
      { k: "Focus", v: "Ayurveda · Wellbeing · Longevity" },
      { k: "Format", v: "Treatments & programmes" },
      { k: "Accommodation", v: "With partner hotels" },
      { k: "First step", v: "Personal consultation" },
      { k: "Languages", v: "English · Montenegrin" },
    ],
    gallery: {
      heading: "Personal care rooted in Ayurveda tradition",
      text: "Every programme begins by listening: your goals, your health history and your time with us shape the treatments we recommend.",
      images: ["/images/vivum-wellbeing.webp", "/images/wheel-01.webp", "/images/wheel-02.webp", "/images/wheel-03.webp"],
    },
    table: {
      heading: ["Treatments &", "Programmes"],
      intro: "Our offer centres on treatments and programmes. Where partner hotels are involved, accommodation is arranged with the hotel and described separately.",
      columns: ["Offer", "What it is", "Format", "Delivered with"],
      groups: [
        { name: "Consultation", rows: [["Personal consultation", "One-to-one", "VIVUM"]] },
        { name: "Treatments", rows: [["Ayurveda treatments", "Individual sessions", "Qualified practitioners"]] },
        {
          name: "Programmes",
          rows: [
            ["Wellbeing programmes", "Multi-day", "Partner hotels"],
            ["Longevity-related programmes", "Multi-day", "Partner hotels"],
          ],
        },
      ],
      note: "Health-related wording will be reviewed before publishing.",
    },
    cta: { label: "Book a consultation", href: "#enquiry" },
    approval: "treatment list, practitioners and partner hotels",
  },
  consulting: {
    title: ["Business", "Consulting"],
    lede: consulting.hero.value,
    facts: [
      { k: "Led by", v: "Dr Sandra Kordić" },
      { k: "Service areas", v: "5" },
      { k: "For", v: "Owners, CEOs & management teams" },
      { k: "Sectors", v: "Growing & regulated companies" },
      { k: "Commercial basis", v: "Fixed fee, quote or retainer" },
      { k: "Digital delivery", v: "With technology partners" },
    ],
    gallery: {
      heading: "Clear direction and measurable results",
      text: "We start with how your company really works today, then agree outcome, duration and fee before any work begins.",
      images: ["/images/vivum-consulting.webp", "/images/wheel-04.webp", "/images/wheel-05.webp", "/images/wheel-07.webp"],
    },
    table: {
      heading: ["Service", "Overview"],
      intro: "Five service areas, one consistent way of working. Each can be contracted on its own; most clients start with a short, well-defined engagement.",
      columns: ["Service area", "Typical duration", "", "Commercial basis"],
      groups: consulting.services.categories.map((c) => ({
        name: c.name,
        rows: c.duration.split(" · ").map((d, i) => [d, "", i === 0 ? c.pricingBasis : ""]),
      })),
    },
    cta: { label: "Discuss your business needs", href: "#enquiry" },
    approval: "service descriptions and commercial basis (from Sandra’s documents)",
  },
  workforce: {
    title: ["International", "Workforce"],
    lede: "We help employers in Montenegro define the people they need and coordinate with recruitment partners on sourcing and selection, with each party’s responsibilities stated clearly.",
    facts: [
      { k: "For", v: "Employers in Montenegro" },
      { k: "Talent", v: "International candidates" },
      { k: "Sourcing", v: "With recruitment partners" },
      { k: "Admin support", v: "With specialist providers" },
      { k: "First step", v: "Staffing needs call" },
      { k: "Languages", v: "English · Montenegrin" },
    ],
    gallery: {
      heading: "The right people for growing employers",
      text: "One partner to coordinate the process: from understanding your staffing needs to the people who start work with you.",
      images: ["/images/vivum-workforce.webp", "/images/wheel-09.webp", "/images/wheel-10.webp", "/images/wheel-06.webp"],
    },
    table: {
      heading: ["How it", "works"],
      intro: "Main stages for employers, and what candidates can expect. Responsibilities follow the signed agreements and applicable law.",
      columns: ["Path", "Stage", "", "Step"],
      groups: [
        {
          name: "For employers",
          rows: [
            ["Tell us the roles, number of people, location and timing", "", "01"],
            ["We define the required profiles together", "", "02"],
            ["Recruitment partners source and pre-select candidates", "", "03"],
            ["You interview and choose", "", "04"],
            ["Responsible parties complete the employment steps", "", "05"],
          ],
        },
        {
          name: "For candidates",
          rows: [
            ["How positions are sourced through our recruitment partners", "", "01"],
            ["Which roles and sectors are currently open", "", "02"],
            ["What the selection process involves", "", "03"],
          ],
        },
      ],
      note: "No placement or permit outcome is guaranteed.",
    },
    cta: { label: "Submit your staffing requirements", href: "#enquiry" },
    approval: "recruitment partners and open roles",
  },
  education: {
    title: ["Education &", "Opportunities"],
    lede: "We present programmes from institutions we are authorised to represent and help prospective international students understand requirements and organise their application documents.",
    facts: [
      { k: "For", v: "International students" },
      { k: "Institutions", v: "Authorised partners only" },
      { k: "Support", v: "Requirements & documents" },
      { k: "Decision", v: "By the university" },
      { k: "First step", v: "Enquiry & conversation" },
      { k: "Languages", v: "English · Montenegrin" },
    ],
    gallery: {
      heading: "Your path to study, step by step",
      text: "From the first question to a complete application: clear guidance on programmes, requirements and documents.",
      images: ["/images/vivum-education.webp", "/images/wheel-11.webp", "/images/wheel-12.webp", "/images/wheel-08.webp"],
    },
    table: {
      heading: ["Application", "Journey"],
      intro: "The application journey, step by step. Admission and academic decisions always remain with the university.",
      columns: ["Journey", "Step", "", "Led by"],
      groups: [
        {
          name: "Before you apply",
          rows: [
            ["Enquiry and first conversation", "", "VIVUM"],
            ["Choosing a programme", "", "Student, with VIVUM"],
            ["Understanding requirements", "", "VIVUM"],
          ],
        },
        {
          name: "Application",
          rows: [
            ["Organising application documents", "", "Student, with VIVUM"],
            ["Application submitted to the university", "", "Student, with VIVUM"],
            ["Independent admission decision", "", "University"],
          ],
        },
      ],
      note: "VIVUM does not guarantee admission, visas or residence permits.",
    },
    cta: { label: "Enquire about study programmes", href: "#enquiry" },
    approval: "authorised institutions and programme list",
  },
} satisfies Record<string, AreaPage>;
