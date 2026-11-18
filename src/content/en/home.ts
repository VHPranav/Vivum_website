// Homepage copy — section order follows master brief v2.0 §4:
// Hero → four division cards → Why VIVUM → How We Work → Our Expertise & International Network
// → Selected Partners → Meet Our Team → Select Your Service / Contact.

export const home = {
  meta: {
    title: "VIVUM Group — Connecting Expertise, People and Opportunities",
    description:
      "VIVUM Group offers integrated international services in wellbeing, education, workforce development and business transformation.",
  },
  hero: {
    eyebrow: "VIVUM Group",
    h1Lead: "VIVUM Group —",
    h1: ["Connecting Expertise,", "People and Opportunities"],
    lede: "Integrated international services in wellbeing, education, workforce development and business transformation.",
    primary: { label: "Explore Our Services", href: "#divisions" },
    secondary: { label: "Contact VIVUM Group", href: "#contact" },
  },
  divisions: {
    eyebrow: "Four divisions",
    title: "Choose where you would like to start.",
  },
  why: {
    eyebrow: "Why VIVUM",
    title: "One group. Four specialist teams. Clear responsibilities.",
    lede: "VIVUM brings separate areas of expertise together under one corporate brand, so you deal with a single, accountable partner and always know who does what.",
    points: [
      {
        title: "Equal focus on every division",
        body: "Wellbeing, education, workforce and consulting each have their own team, service details and enquiry route.",
      },
      {
        title: "Roles stated up front",
        body: "We explain what VIVUM does and what our partners do. Universities, recruitment and technology partners keep their own responsibilities.",
      },
      {
        title: "Transparent scope and fees",
        body: "Services are described with their scope, duration and pricing basis, or how a quotation is prepared, before you commit.",
      },
      {
        title: "Privacy by design",
        body: "We ask only for what is needed to answer your enquiry and never collect health histories or identity documents through general forms.",
      },
    ],
  },
  how: {
    eyebrow: "How we work",
    title: "From first message to the right team.",
    steps: [
      { title: "Choose a service", body: "Select the division that fits your need and send a short enquiry." },
      { title: "Speak with the right team", body: "Your enquiry goes to that division’s team, which replies with next steps." },
      { title: "Receive a clear proposal", body: "Scope, responsibilities, timeline and fees or the quotation method, in writing." },
      { title: "Work with the right partners", body: "VIVUM coordinates; specialist partners deliver their part as agreed in contract." },
    ],
  },
  network: {
    eyebrow: "Our expertise & international network",
    title: "Specialist knowledge, connected across borders.",
    lede: "Each division works with established partners. Their names, roles and logos appear here once each relationship and its wording are approved.",
    items: [
      {
        division: "Longevity & Wellbeing",
        body: "AYUSH is our specialist Ayurveda and healthcare brand, with separate clinic journeys in London and Montenegro. VIVUM programmes are offered separately from AYUSH clinical treatments.",
        approval: "AYUSH relationship and ownership wording",
      },
      {
        division: "International Education",
        body: "Cooperation with University Mediteran in Montenegro. VIVUM supports guidance and application organisation; the university makes all admission decisions.",
        approval: "University Mediteran cooperation wording",
      },
      {
        division: "International Workforce",
        body: "VIVUM connects Montenegrin employers with Kinster, a specialist international sourcing partner. Responsibilities follow the executed agreement and applicable law.",
        approval: "Kinster responsibility matrix",
      },
      {
        division: "Business Consulting",
        body: "Led by Dr Sandra Kordić, working with legal and technology specialists where an engagement requires it, with their fees disclosed in advance.",
        approval: "Approved biography",
      },
    ],
    roots: {
      title: "Our roots",
      body: "VIVUM’s heritage and partnerships in India are presented under About, in Our Roots & International Network.",
      link: { label: "Read about our roots", href: "/about#network" },
    },
  },
  partners: {
    eyebrow: "Selected partners",
    title: "Partners we work with.",
    note: "Partner logos are shown only with each partner’s written permission.",
    slots: 6,
  },
  team: {
    eyebrow: "Meet our team",
    title: "The people behind each division.",
    members: [
      {
        name: "Dr Sandra Kordić",
        role: "Lead, Business Transformation & Executive Advisory",
        bio: "PhD in process management. Experience in executive leadership, banking and international business, including Société Générale in Paris.",
        approval: "Approved biography and portrait",
      },
      { name: null, role: "Lead, Longevity & Wellbeing", bio: null, approval: "Name, role and portrait" },
      { name: null, role: "Lead, International Education", bio: null, approval: "Name, role and portrait" },
      { name: null, role: "Lead, International Workforce", bio: null, approval: "Name, role and portrait" },
    ],
  },
  contact: {
    eyebrow: "Select your service",
    title: "How can we help?",
    lede: "Choose a division so your message reaches the right team directly.",
  },
};
