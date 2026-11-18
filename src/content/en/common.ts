// Shared English copy: navigation, divisions, footer and form wording.
// Division names, card text and CTAs follow master brief v2.0 §4 exactly.

export const nav = [
  { label: "Home", href: "/" },
  { label: "Wellbeing", href: "/wellbeing" },
  { label: "Education", href: "/education" },
  { label: "Workforce", href: "/workforce" },
  { label: "Consulting", href: "/consulting" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type DivisionId = "wellbeing" | "education" | "workforce" | "consulting";

export type Division = {
  id: DivisionId;
  n: string;
  name: string;
  /** Full division title used on its landing page. */
  title: string;
  description: string;
  cta: string;
  href: string;
  /** What a visitor does at the end of this journey (brief §14 Gate C). */
  conversion: string;
  /** Imagery still needed for this card. */
  imageNeed: string;
};

export const divisions: Division[] = [
  {
    id: "wellbeing",
    n: "01",
    name: "Longevity & Wellbeing",
    title: "Longevity & Wellbeing",
    description: "Personalised wellbeing programmes, Ayurveda treatments and longevity-focused services.",
    cta: "Explore Wellbeing",
    href: "/wellbeing",
    conversion: "Request appointment · programme enquiry",
    imageNeed: "Calm treatment or programme setting in Montenegro (genuine VIVUM/AYUSH photography, not stock clinics).",
  },
  {
    id: "education",
    n: "02",
    name: "International Education",
    title: "Study in Montenegro — International Education Guidance",
    description: "Study opportunities in Montenegro and tailored support for international applicants.",
    cta: "Study in Montenegro",
    href: "/education",
    conversion: "Apply / enquire",
    imageNeed: "Students on a Montenegrin campus or city setting (rights-cleared; university imagery only with permission).",
  },
  {
    id: "workforce",
    n: "03",
    name: "International Workforce",
    title: "International Workforce Solutions for Montenegrin Employers",
    description: "Connecting Montenegrin employers with international talent through specialist partners.",
    cta: "Find Talent",
    href: "/workforce",
    conversion: "Request a quote",
    imageNeed: "Hospitality or construction team at work in Montenegro (confirmed sectors only).",
  },
  {
    id: "consulting",
    n: "04",
    name: "Business Consulting",
    title: "Business Transformation & Executive Advisory",
    description: "Strategy, performance, operational excellence and responsible AI transformation.",
    cta: "Explore Consulting",
    href: "/consulting",
    conversion: "Schedule a consultation",
    imageNeed: "Workshop or board-room working session; portrait of Dr Sandra Kordić (approved).",
  },
];

export const ui = {
  skipToContent: "Skip to content",
  menu: "Menu",
  close: "Close",
  languageSoon: "Montenegrin version in preparation",
  contactCta: "Contact VIVUM Group",
  approvalRequired: "Client approval required",
  imagePlaceholder: "Image placeholder",
};

export const footer = {
  statement:
    "VIVUM Group connects expertise, people and opportunities across four divisions: wellbeing, international education, international workforce and business transformation.",
  groups: [
    { title: "Divisions", links: divisions.map((d) => ({ label: d.name, href: d.href })) },
    {
      title: "Company",
      links: [
        { label: "About VIVUM", href: "/about" },
        { label: "Our Roots & International Network", href: "/about#network" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ],
};

export const formCopy = {
  required: "Required",
  optional: "optional",
  name: "Full name",
  email: "Email",
  phone: "Phone or WhatsApp",
  country: "Country",
  message: "Message",
  consent:
    "I agree that VIVUM Group may use these details to respond to my enquiry, as described in the Privacy notice. Please do not include health information or identity documents in this form.",
  privacyLink: "Privacy notice",
  sending: "Sending…",
  successTitle: "Thank you — your enquiry has been received.",
  successBody: "The right team will reply by email. A copy of your request is shown below for reference.",
  previewNote:
    "Review build: the form validates on the server, but delivery to a mailbox is not connected until VIVUM confirms the recipient address.",
  errorSummary: "Please check the highlighted fields.",
  routedTo: "Goes to",
};
