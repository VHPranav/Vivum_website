// About page — structure mirrors the Tresmares Capital About page section for section:
// journey (giant numerals + tabs) → values (pinned, dark, image per value) → partner
// (title + tall image, small image + text, filled statement) → pinned background statements.
// No dates or history are invented: the "journey" runs through VIVUM's four areas until VIVUM
// supplies real milestones. Images are AI-generated in Google Flow (client approval required).

export const about = {
  meta: {
    title: "About VIVUM Group",
    description: "VIVUM Group is an international group rooted in Montenegro, connecting expertise, people and opportunities across four areas of activity.",
  },
  // Same opening as the homepage (landscape + live clouds), with its own landscape and copy.
  hero: {
    h1: "Rooted in Montenegro. Open to the world.",
    lines: [
      { text: "Rooted in Montenegro." },
      { text: "Open to the world." },
    ],
    lede: "An international group bringing specialist expertise, trusted partners and people together.",
    primary: { label: "Meet our team", href: "#team" },
  },
  heroImage: "/images/about-hero.webp",
  intro: {
    label: "Who we are",
    statement: "VIVUM Group is one company with four specialist teams, connecting clients with the right people, institutions and partners.",
    link: { label: "Meet our people", href: "/about#team" },
  },
  factsIntro: "One point of contact connects you with our four areas of activity. Employers and candidates have distinct enquiry paths, and business clients can explore five consulting service areas.",
  journey: {
    label: "Our four areas",
    title: "One group, four areas",
    steps: [
      {
        n: "01",
        tab: "Wellbeing",
        name: "Wellbeing & Longevity",
        image: "/images/vivum-wellbeing.webp",
        href: "/wellbeing",
        points: ["Ayurveda treatments and wellbeing programmes in Montenegro.", "Delivered with partner hotels, with accommodation described separately."],
      },
      {
        n: "02",
        tab: "Consulting",
        name: "Business Consulting & Digital Solutions",
        image: "/images/vivum-consulting.webp",
        href: "/consulting",
        points: ["Strategy, performance, processes and responsible AI for companies.", "Digital solutions delivered alongside technology partners."],
      },
      {
        n: "03",
        tab: "Workforce",
        name: "International Workforce Solutions",
        image: "/images/vivum-workforce.webp",
        href: "/workforce",
        points: ["International talent for employers in Montenegro.", "Sourcing and selection coordinated with recruitment partners."],
      },
      {
        n: "04",
        tab: "Education",
        name: "Education & International Opportunities",
        image: "/images/vivum-education.webp",
        href: "/education",
        points: ["Study programmes at authorised institutions.", "Support with requirements and application documents."],
      },
    ],
    approval: "company history and milestones (shown as the four areas until real dates are supplied)",
  },
  values: {
    label: "Our values",
    items: [
      {
        name: "Expertise",
        body: "Experienced specialists lead each area and stay involved from the first conversation to the result.",
        note: "*The olive tree takes decades to mature and keeps giving for centuries: expertise built slowly and shared generously.",
        src: "/images/value-01.webp",
      },
      {
        name: "Care",
        body: "We listen first and shape the work around each client’s situation, never a standard package.",
        note: "*A single drop changes the whole surface of the bay: small attentions shape the whole experience.",
        src: "/images/value-02.webp",
      },
      {
        name: "Partnership",
        body: "We work with trusted universities, recruitment, technology and hotel partners, each with a clearly stated role.",
        note: "*Dry-stone walls stand for centuries because every stone carries its share of the weight.",
        src: "/images/value-03.webp",
      },
      {
        name: "Clarity",
        body: "Scope, responsibilities and fees are agreed in writing before any work begins.",
        note: "*Morning dew shows every needle clearly: nothing hidden, everything in its place.",
        src: "/images/value-04.webp",
      },
      {
        name: "Commitment",
        body: "We stay with our clients until the work is done, with practical support at every step.",
        note: "*Mountain flowers open slowly in thin air and hold on through every season.",
        src: "/images/value-05.webp",
      },
    ],
  },
  partner: {
    title: "Your partner in Montenegro",
    lede: "VIVUM brings specialist expertise and trusted partners together under one name, so every client has a single, accountable point of contact.",
    image: "/images/vivum-hero.webp",
    smallImage: "/images/wheel-02.webp",
    body: [
      "Each area has its own specialists and partners, and its own clear next step. We start by understanding what you need, then propose a scope, the people involved and how fees are set.",
      "Our support goes beyond a single service. We stay involved, coordinate partners and keep you informed until the work is complete.",
    ],
    statement: "We work with a service mindset, guided by clear values and one point of contact for every client.",
  },
  scroll: {
    statements: [
      { text: "VIVUM is one group with four specialist teams", src: "/media/about-01-poster.webp", video: "/media/about-01.mp4" },
      { text: "We connect clients with the right people, institutions and partners", src: "/media/about-02-poster.webp", video: "/media/about-02.mp4" },
      { text: "Every engagement has a clear scope, owner and next step", src: "/images/vivum-consulting.webp", video: "" },
    ],
    // Background for the closing points step. Videos are AI-generated in Google Flow.
    pointsBg: { src: "/media/about-04-poster.webp", video: "/media/about-04.mp4" },
    intro: "Our way of working combines hands-on experience - specialists, partners, one point of contact - with an international network, enabling us to:",
    points: [
      "Understand each client’s situation before proposing anything.",
      "Bring in the right specialists and partners, with roles stated up front.",
      "Stay involved until the work is done, in English or Montenegrin.",
    ],
  },
};
