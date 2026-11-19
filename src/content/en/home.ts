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
    lede: "Wellbeing, business consulting, international workforce and education, under one name.",
    primary: { label: "Our services", href: "#services" },
    secondary: { label: "Get in touch", href: "/contact" },
  },
  areas: {
    label: "Four areas of activity",
  },
  about: {
    label: "About VIVUM",
    statement: "An international group rooted in Montenegro, bringing specialist expertise, trusted partners and people together.",
    link: { label: "More about VIVUM", href: "/about" },
  },
  facts: {
    body: "We combine hands-on experience with an international network of partners. Every engagement starts with understanding what you need, and continues with practical support until the work is done.",
    link: { label: "More about VIVUM", href: "/about" },
    items: [
      { k: "1", v: "Point of contact for every enquiry" },
      { k: "2", v: "Paths: employers and candidates" },
      { k: "3", v: "Enquiry steps: area, details and message" },
      { k: "4", v: "Areas of activity" },
      { k: "5", v: "Consulting service areas" },
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
  network: {
    label: "Our network",
    title: ["Connecting Montenegro with ", "specialists, institutions and partners", " across four areas"],
    body: "From our base in Montenegro, VIVUM works with specialists, universities, recruitment and technology partners and partner hotels, each with a clear role, so every client has one point of contact.",
    // Images are AI-generated in Google Flow (client approval required).
    items: [
      { name: "Ayurveda treatments", src: "/images/wheel-01.webp" },
      { name: "Wellbeing programmes", src: "/images/wheel-02.webp" },
      { name: "Partner hotels", src: "/images/wheel-03.webp" },
      { name: "Strategy & performance", src: "/images/wheel-04.webp" },
      { name: "Process improvement", src: "/images/wheel-05.webp" },
      { name: "Change & training", src: "/images/wheel-06.webp" },
      { name: "AI readiness", src: "/images/wheel-07.webp" },
      { name: "Digital solutions", src: "/images/wheel-08.webp" },
      { name: "Employers", src: "/images/wheel-09.webp" },
      { name: "International talent", src: "/images/wheel-10.webp" },
      { name: "Study programmes", src: "/images/wheel-11.webp" },
      { name: "Application support", src: "/images/wheel-12.webp" },
    ],
    // Marker positions come from scripts/build-dot-map.mjs (same projection as the dot map).
    locations: [
      { name: "Montenegro", title: "VIVUM Group", text: "Our base in Podgorica, serving clients across all four areas.", left: "54.23%", top: "79.3%" },
      { name: "London", title: "AYUSH London", text: "Specialist Ayurveda clinic within our wellbeing network.", left: "40.5%", top: "56.54%" },
    ],
    approval: "network wording, office locations and the AYUSH London relationship",
  },
  people: {
    statement: "A team of specialists in wellbeing, business, workforce and education, working with trusted partners across borders.",
    // Mock portraits (AI-generated in Google Flow) of fictional people, for layout only.
    // Replace with approved photos, names and roles before launch.
    members: [
      { name: "Dr (full name to be confirmed)", role: "Medical Director", src: "/images/team-01.webp" },
      { name: "Maya", role: "Director", src: "/images/team-02.webp" },
      { name: "Dr Sandra Kordić", role: "Consultant", src: "/images/team-03.webp" },
    ],
    approval: "mock portraits of fictional people; replace with approved team photos, names and roles",
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
