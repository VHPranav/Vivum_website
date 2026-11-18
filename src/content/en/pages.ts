// Area pages still "in preparation". Each shows its audience, structure and real enquiry form now,
// so the URL can already be shared (Sandra, 12 Nov: each landing page must work on its own).

export type StubPage = {
  label: string;
  title: string;
  lede: string;
  /** Audience paths (Sphere-style routing), e.g. For employers / For candidates. */
  paths?: { id: string; title: string; body: string; points: string[] }[];
  stepsTitle?: string;
  steps?: string[];
  sections: string[];
  note?: string;
};

const landing = [
  "A headline addressing this audience",
  "Client needs and how we help",
  "Services or programmes",
  "How the process works",
  "Verified credentials, partners or testimonials",
  "Frequently asked questions",
  "One primary call to action and a tailored enquiry form",
];

export const pages = {
  wellbeing: {
    label: "Wellbeing & Longevity",
    title: "Treatments and programmes for lasting wellbeing.",
    lede: "Ayurveda, wellbeing and longevity-related treatments and programmes in Montenegro, starting with a personal consultation.",
    stepsTitle: "What this page will explain",
    steps: [
      "Who the services are designed for",
      "Available treatments and programmes",
      "What you can expect from the experience",
      "Practitioners and their verified qualifications",
      "Where services are delivered",
      "How to enquire or book a consultation",
    ],
    sections: landing,
    note: "Our offer centres on treatments and programmes. Where partner hotels are involved, accommodation is arranged with the hotel and described separately. Health-related wording will be reviewed before publishing.",
  },
  workforce: {
    label: "International Workforce Solutions",
    title: "International talent for employers in Montenegro.",
    lede: "We help employers define the people they need and coordinate with recruitment partners on sourcing and selection, with each party’s responsibilities stated clearly.",
    paths: [
      {
        id: "employers",
        title: "For employers",
        body: "You need reliable staff and want one partner to coordinate the process.",
        points: [
          "Understanding your staffing needs",
          "Defining the required profiles",
          "Coordination with recruitment partners on sourcing and selection",
          "Coordination with specialist providers for administrative support",
        ],
      },
      {
        id: "candidates",
        title: "For candidates",
        body: "You are looking for work in Montenegro through a recruitment partner.",
        points: [
          "How positions are sourced through our recruitment partners",
          "Which roles and sectors are currently open",
          "What the selection process involves",
          "Who to contact with questions",
        ],
      },
    ],
    stepsTitle: "Main stages for employers",
    steps: [
      "Tell us the roles, number of people, location and timing",
      "We define the required profiles together",
      "Recruitment partners source and pre-select candidates",
      "You interview and choose",
      "Responsible parties complete the employment steps",
    ],
    sections: landing,
    note: "Responsibilities of VIVUM, recruitment partners and employers follow the signed agreements and applicable law. No placement or permit outcome is guaranteed.",
  },
  education: {
    label: "Education & International Opportunities",
    title: "Study opportunities, with support from first question to application.",
    lede: "We present programmes from institutions we are authorised to represent and help prospective international students understand requirements and organise their application documents.",
    stepsTitle: "The application journey",
    steps: [
      "Enquiry and first conversation",
      "Choosing a programme",
      "Understanding requirements",
      "Organising application documents",
      "Application submitted to the university",
      "The university’s independent decision",
    ],
    sections: landing,
    note: "Admission and academic decisions remain with the university. VIVUM does not guarantee admission, visas or residence permits.",
  },
  about: {
    label: "About",
    title: "About VIVUM Group",
    lede: "An international group rooted in Montenegro, connecting expertise, people and opportunities across four areas of activity.",
    stepsTitle: "This page will introduce",
    steps: ["Our company and story", "Our expertise", "International connections", "Our hands-on approach", "The people behind each area"],
    sections: [],
    note: "Company history, legal identity and team profiles require VIVUM approval.",
  },
  partners: {
    label: "Partners",
    title: "Partners and experience",
    lede: "The universities, recruitment partners, technology partners and partner hotels we work with, and the projects we have delivered together.",
    stepsTitle: "This page will show",
    steps: ["Approved partner logos and descriptions", "The role of each partner", "Relevant projects", "Verified testimonials"],
    sections: [],
    note: "Only partners, projects and testimonials confirmed for publication will be shown.",
  },
} satisfies Record<string, StubPage>;

export const legalPages = {
  privacy: { title: "Privacy notice", body: "The privacy notice will describe how VIVUM Group processes enquiry data for each area of activity." },
  terms: { title: "Terms", body: "General terms of use, plus service-specific terms where needed." },
  cookies: { title: "Cookies", body: "Cookie information matching the analytics and consent set-up chosen for launch." },
};

export const contactPage = {
  label: "Contact",
  title: "Contact VIVUM Group",
  lede: "Choose the area you are interested in so your message reaches the right person. You can also reach us by email or WhatsApp.",
};
