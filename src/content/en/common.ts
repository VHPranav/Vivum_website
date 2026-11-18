// Shared English copy: navigation, the four business areas, footer and form wording.
// Area names, navigation and calls to action follow Sandra Kordić's direction of 12 Nov 2026
// ("Vivum website — answer on WhatsApp proposals"), which supersedes the 7 Nov master brief on these points.

export type DivisionId = "wellbeing" | "consulting" | "workforce" | "education";

export type Division = {
  id: DivisionId;
  n: string;
  name: string;
  /** Short label for tabs and anchors. */
  short: string;
  description: string;
  /** Link label on cards. */
  cardCta: string;
  /** The page's one primary action. */
  pageCta: string;
  href: string;
  audience: string;
  highlights: string[];
  /** Sub-paths shown in the services menu. */
  paths: { label: string; href: string }[];
  imageNeed: string;
};

export const divisions: Division[] = [
  {
    id: "wellbeing",
    n: "01",
    name: "Wellbeing & Longevity",
    short: "Wellbeing",
    description: "Ayurveda treatments and wellbeing programmes in Montenegro, shaped around each person.",
    cardCta: "Explore wellbeing",
    pageCta: "Book a consultation",
    href: "/wellbeing",
    audience: "Individuals and guests looking for treatments and programmes",
    highlights: ["Ayurveda treatments", "Wellbeing & longevity programmes", "Partner hotels in Montenegro"],
    paths: [
      { label: "Treatments & programmes", href: "/wellbeing" },
      { label: "Book a consultation", href: "/wellbeing#enquiry" },
    ],
    imageNeed: "Calm treatment or programme setting in Montenegro (genuine photography; warm tone)",
  },
  {
    id: "consulting",
    n: "02",
    name: "Business Consulting & Digital Solutions",
    short: "Consulting",
    description: "Strategy, performance, process improvement and responsible AI, with digital solutions delivered alongside technology partners.",
    cardCta: "Explore consulting",
    pageCta: "Discuss your business needs",
    href: "/consulting",
    audience: "Owners, CEOs and management teams",
    highlights: ["Strategy & performance", "Process improvement", "AI readiness & governance"],
    paths: [
      { label: "Services", href: "/consulting#services" },
      { label: "Discuss your business needs", href: "/consulting#enquiry" },
    ],
    imageNeed: "Workshop or working session with a management team",
  },
  {
    id: "workforce",
    n: "03",
    name: "International Workforce Solutions",
    short: "Workforce",
    description: "Helping employers find suitable international talent, in cooperation with recruitment partners.",
    cardCta: "Explore workforce",
    pageCta: "Submit your staffing requirements",
    href: "/workforce",
    audience: "Employers in Montenegro, and international candidates",
    highlights: ["Staffing needs & profiles", "Recruitment partner coordination", "Clear responsibilities"],
    paths: [
      { label: "For employers", href: "/workforce#employers" },
      { label: "For candidates", href: "/workforce#candidates" },
    ],
    imageNeed: "Hospitality or construction team at work (confirmed sectors only)",
  },
  {
    id: "education",
    n: "04",
    name: "Education & International Opportunities",
    short: "Education",
    description: "Study programmes at authorised institutions, with support through the application journey.",
    cardCta: "Explore education",
    pageCta: "Enquire about study programmes",
    href: "/education",
    audience: "Prospective international students",
    highlights: ["Authorised institutions & programmes", "Application document support", "Clear application journey"],
    paths: [
      { label: "Study programmes", href: "/education" },
      { label: "Enquire about study programmes", href: "/education#enquiry" },
    ],
    imageNeed: "Students in a Montenegrin campus or city setting (with permission)",
  },
];

export const nav = {
  home: { label: "Home", href: "/" },
  about: { label: "About", href: "/about" },
  services: { label: "Our Services", href: "/#services" },
  partners: { label: "Partners", href: "/partners" },
  contact: { label: "Contact", href: "/contact" },
};

export const ui = {
  skipToContent: "Skip to content",
  menu: "Menu",
  close: "Close",
  languageSoon: "Montenegrin version in preparation",
  contactCta: "Get in touch",
  approvalRequired: "Client approval required",
  imagePlaceholder: "Image placeholder",
  scroll: "Scroll",
  localTime: "Podgorica",
};

export const footer = {
  statement: "Every next step starts with a conversation.",
  cta: "Contact us",
  groups: [
    { title: "Our services", links: divisions.map((d) => ({ label: d.name, href: d.href })) },
    {
      title: "Company",
      links: [
        { label: "About VIVUM", href: "/about" },
        { label: "Partners", href: "/partners" },
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
  successBody: "The right person will reply by email. A copy of your request is shown below for reference.",
  previewNote:
    "Review build: the form validates on the server, but delivery to a mailbox is not connected until VIVUM confirms the recipient address.",
  errorSummary: "Please check the highlighted fields.",
  routedTo: "Goes to",
};
