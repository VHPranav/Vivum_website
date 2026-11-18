// Homepage copy. Order follows Sandra's 12 Nov direction (opening → four areas → About →
// Why work with us → Partners & experience → Contact), staged with the reference sites' patterns:
// Tresmares (structure, statement blocks, pinned area showcase), Prime Exits (benefits, process,
// clear next steps) and Sphere (audience routing).

export const home = {
  meta: {
    title: "VIVUM Group — Connecting expertise, people and opportunities",
    description:
      "VIVUM Group brings together wellbeing, business consulting, international workforce and education services under one name, with a clear next step for every visitor.",
  },
  hero: {
    label: "VIVUM Group",
    h1: "Connecting expertise, people and opportunities.",
    lede: "VIVUM brings four areas of expertise together under one name: wellbeing, business consulting, international workforce and education.",
    primary: { label: "Explore our services", href: "#areas" },
    secondary: { label: "Get in touch", href: "#contact" },
  },
  areas: {
    label: "Four areas of activity",
  },
  about: {
    label: "About VIVUM",
    statement: "An international group rooted in Montenegro, bringing specialist expertise, trusted partners and people together.",
    body: "We combine hands-on experience with an international network of partners. Every engagement starts with understanding what you need, and continues with practical support until the work is done.",
    link: { label: "More about VIVUM", href: "/about" },
    facts: [
      { k: "4", v: "areas of activity under one name" },
      { k: "1", v: "point of contact for every enquiry" },
      { k: "EN · ME", v: "English and Montenegrin" },
    ],
  },
  services: {
    label: "Our services",
    statement: "Four areas, each with its own specialists, partners and clear next step.",
  },
  why: {
    label: "Why work with us",
    title: "What we bring to every engagement.",
    items: [
      { title: "Experienced leadership", body: "Senior people lead each area and stay involved, from the first conversation to the result." },
      { title: "Understanding of client needs", body: "We start by listening, then shape the work around your situation rather than a standard package." },
      { title: "Access to relevant partners", body: "Universities, recruitment and technology partners, with their role and responsibilities stated clearly." },
      { title: "Practical support throughout", body: "Clear next steps, regular contact and help with the details until the engagement is complete." },
      { title: "Transparent scope and fees", body: "You know what is included, who does what and how fees are set before any work begins." },
    ],
  },
  how: {
    label: "How we work",
    title: "From first message to the right specialist.",
    steps: [
      { title: "Tell us what you need", body: "Choose the relevant area and send a short enquiry, by form, email or WhatsApp." },
      { title: "Talk to the right person", body: "Your message goes straight to the team for that area, which replies with next steps." },
      { title: "Receive a clear proposal", body: "Scope, responsibilities, timeline and fees or the quotation method, in writing." },
      { title: "Work together", body: "VIVUM coordinates the work; partners deliver their part as agreed, with regular updates." },
    ],
  },
  paths: {
    label: "Find your path",
    title: "Who are you?",
    items: [
      { who: "I’m looking for wellbeing support", area: "wellbeing", body: "Treatments and programmes in Montenegro, starting with a consultation.", cta: "Book a consultation", href: "/wellbeing#enquiry" },
      { who: "I lead a business", area: "consulting", body: "Strategy, processes, organisation and responsible AI, with clear outcomes.", cta: "Discuss your business needs", href: "/consulting#enquiry" },
      { who: "I’m an employer", area: "workforce", body: "Tell us the roles, numbers, location and timing you need.", cta: "Submit your staffing requirements", href: "/workforce#employers" },
      { who: "I’m looking for work", area: "workforce", body: "How international candidates are recruited through our partners.", cta: "Information for candidates", href: "/workforce#candidates" },
      { who: "I want to study", area: "education", body: "Programmes at authorised institutions and help with your application.", cta: "Enquire about study programmes", href: "/education#enquiry" },
    ],
  },
  partners: {
    label: "Partners & experience",
    title: "Partners, projects and testimonials.",
    note: "Partner logos, projects and testimonials appear here once each has been confirmed for publication.",
    slots: 6,
    testimonial: "Verified client testimonials will be shown here once approved.",
  },
  contact: {
    marquee: "Let’s start a conversation",
    label: "Contact",
    title: "How can we help?",
    lede: "Choose the area you are interested in so your message reaches the right person.",
  },
};
