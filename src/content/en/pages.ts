// Pages that are structured but not yet fully built ("in preparation"). Each lists the sections
// its full template will contain (master brief v2.0 §5–8) so the client can review structure now.

export type StubPage = {
  eyebrow: string;
  title: string;
  lede: string;
  sections: string[];
  /** Optional cards shown on the stub, e.g. the three wellbeing pathways. */
  cards?: { title: string; body: string; tag?: string }[];
  cardsTitle?: string;
  steps?: string[];
  stepsTitle?: string;
  note?: string;
};

const universal = [
  "Hero: service name, audience, value proposition, primary CTA",
  "Who we help",
  "Services & packages",
  "Benefits & deliverables",
  "How it works, including partner responsibilities",
  "Pricing or quotation method",
  "People & partners",
  "FAQ",
  "Dedicated enquiry form",
];

export const pages = {
  wellbeing: {
    eyebrow: "Division 01",
    title: "Longevity & Wellbeing",
    lede: "Personalised wellbeing programmes, Ayurveda treatments and longevity-focused services, with clinical and non-clinical offers kept clearly separate.",
    cardsTitle: "Three separate pathways",
    cards: [
      {
        title: "AYUSH London",
        tag: "Clinic · GBP",
        body: "Specialist Ayurveda clinic with its own address, practitioners, treatment catalogue, GBP prices and appointment flow.",
      },
      {
        title: "AYUSH Montenegro",
        tag: "Clinic · EUR",
        body: "Separate Montenegro clinic journey with local address, practitioners, EUR prices and its own enquiry workflow.",
      },
      {
        title: "VIVUM Programmes",
        tag: "Programmes · EUR",
        body: "Wellbeing programmes offered separately from clinical treatment menus. Accommodation at partner hotels is arranged separately unless included in an approved package.",
      },
    ],
    stepsTitle: "Proposed programme categories (to validate)",
    steps: [
      "Stress Management & Recovery",
      "Longevity & Preventive Wellbeing",
      "Respiratory Wellness",
      "Integrative Physiotherapy & Ayurveda",
      "Long-Stay Wellbeing Programmes",
      "Corporate Wellbeing",
    ],
    sections: universal,
    note: "Programme categories, durations and all health-related wording require clinical and VIVUM approval before publishing.",
  },
  education: {
    eyebrow: "Division 02",
    title: "Study in Montenegro — International Education Guidance",
    lede: "Study opportunities in Montenegro and tailored support for international applicants, in cooperation with University Mediteran.",
    stepsTitle: "How the application journey works",
    steps: [
      "Enquiry",
      "Programme identification",
      "Preliminary document guidance",
      "Complete application submitted to the university",
      "Independent university decision",
      "Post-decision guidance, as agreed",
    ],
    sections: universal,
    note: "University Mediteran retains all admission decisions. VIVUM does not guarantee admission, residence permits, visas or degree recognition.",
  },
  workforce: {
    eyebrow: "Division 03",
    title: "International Workforce Solutions for Montenegrin Employers",
    lede: "Connecting Montenegrin employers with international talent through Kinster, our specialist sourcing partner.",
    stepsTitle: "Employer journey",
    steps: [
      "Outline your workforce challenge and requirements",
      "Select your industry (hospitality, construction or another confirmed sector)",
      "VIVUM evaluates the need and introduces Kinster",
      "Kinster carries out its agreed sourcing work",
      "You review candidates",
      "Responsible parties complete the employment steps",
    ],
    sections: [
      "Employer requirements and workforce challenges",
      "Industries served",
      "VIVUM business development and market connection role",
      "Kinster specialist sourcing role",
      "Recruitment and employment process, with verified responsible parties",
      "Commercial model and employer quotation",
      "Structured employer enquiry form",
      "FAQ",
    ],
    note: "Responsibilities for screening, permits and employment follow the executed agreement and applicable law. No placement or permit outcome is guaranteed.",
  },
  about: {
    eyebrow: "About",
    title: "About VIVUM Group",
    lede: "VIVUM Group d.o.o. is an international group connecting expertise, people and opportunities across four divisions.",
    sections: ["Company", "Team", "Partners", "Our Roots & International Network, including India"],
    note: "Company history, legal identity, team profiles and partner relationships require VIVUM approval.",
  },
} satisfies Record<string, StubPage>;

export const legalPages = {
  privacy: { title: "Privacy notice", body: "The privacy notice will describe how VIVUM Group processes enquiry data for each division." },
  terms: { title: "Terms", body: "General terms of use, plus service-specific terms where needed." },
  cookies: { title: "Cookies", body: "Cookie information matching the analytics and consent set-up chosen for launch." },
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Contact VIVUM Group",
  lede: "Choose the service you are interested in so your message reaches the right team. Each division has its own enquiry route.",
};
