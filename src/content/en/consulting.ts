// Business Transformation & Executive Advisory — source: VIVUM 1 documents by Dr Sandra Kordić
// (Problems We Solve, One-page offers, Price List 2026, Service areas 01/02/04) structured into the
// six categories required by master brief v2.0 §9 / §19.5.

export type ConsultingCategory = {
  id: string;
  name: string;
  summary: string;
  whoNeedsIt: string;
  problem: string;
  approach: string[];
  deliverables: string[];
  duration: string;
  clientInputs: string;
  pricingBasis: string;
  offers: string[];
};

export const consulting = {
  meta: {
    title: "Business Transformation & Executive Advisory",
    description:
      "Strategy, performance, operational excellence, digital transformation, AI governance, executive advisory and corporate training — led by Dr Sandra Kordić.",
  },
  hero: {
    eyebrow: "Business Consulting · VIVUM Group",
    title: "Business Transformation & Executive Advisory",
    audience: "For owners, CEOs and boards of growing and regulated companies in Montenegro and the region.",
    value:
      "Clear direction, better processes and responsible AI, with every service scoped by deliverables, duration and fee before work begins.",
    primary: { label: "Book Business Consultation", href: "#consultation" },
    secondary: { label: "See the six services", href: "#services" },
    facts: [
      { k: "Led by", v: "Dr Sandra Kordić" },
      { k: "Six service areas", v: "Strategy to AI governance" },
      { k: "Commercial basis", v: "Fixed fee, quote or retainer" },
    ],
  },

  who: {
    eyebrow: "Who we help",
    title: "If your problem is…",
    lede: "Pick the situation that sounds most familiar. Each one points to the service that fits it.",
    audiences: [
      { title: "Owners & CEOs", body: "Growing companies where the organisation no longer keeps pace and too many decisions land on your desk." },
      { title: "Management teams & process owners", body: "Teams where work stalls between departments, errors recur and improvements fade." },
      {
        title: "Boards in regulated industries",
        body: "Insurance, telecoms, energy, healthcare, tourism, logistics and public enterprises adopting AI under EU and national rules.",
      },
    ],
    problems: [
      { problem: "Too many ideas, unclear direction, plans not delivered", service: "Strategy and Strategic Planning", category: "strategy" },
      { problem: "Goals do not reach teams; results and accountability are unclear", service: "Performance Management System", category: "strategy" },
      { problem: "Costs grow faster than revenue and you do not know where to start", service: "Business Process Scan and Growth Recommendations", category: "operations" },
      { problem: "One key process is slow, costly or error-prone", service: "Process Improvement (DMAIC)", category: "operations" },
      { problem: "Work falls between teams; no one owns the result", service: "Business Process Management (BPM)", category: "operations" },
      { problem: "You want to digitalise, but the process is not yet in order", service: "Digitalisation, automation and AI agents", category: "digital" },
      { problem: "You want AI, but have no priorities, rules or proof of value", service: "Responsible Use of AI", category: "ai" },
      { problem: "A regulated company needs Board-level AI and compliance leadership", service: "Fractional Chief AI & Transformation Officer", category: "executive" },
      { problem: "You make almost every decision and constantly coordinate your people", service: "Support for owners and CEOs", category: "executive" },
      { problem: "The same problems keep coming back", service: "Problem Solving training", category: "training" },
      { problem: "Projects run late, over budget or without clear roles", service: "Project Management in Practice", category: "training" },
      { problem: "Problems are spotted too late; meetings end without decisions", service: "Visual Management", category: "training" },
    ],
  },

  services: {
    eyebrow: "Services & packages",
    title: "Six service areas, one consistent way of working.",
    lede: "Each area can be contracted on its own. Most clients start with a short, well-defined engagement and continue once value is confirmed.",
    categories: [
      {
        id: "strategy",
        name: "Strategy & Performance",
        summary: "From a clear direction to measurable results: a strategy that becomes the everyday work of your teams.",
        whoNeedsIt: "Owners, CEOs and management teams of growing companies.",
        problem: "Goals exist but are not translated into expectations for teams; results are tracked in disconnected reports and deviations are spotted late.",
        approach: ["Diagnose where you are today", "Decide on strategic options", "Plan goals, owners and resources", "Track with a regular review rhythm"],
        deliverables: [
          "Strategic priorities, goals and a resource framework",
          "Operating plan with owners and deadlines",
          "Performance Management Policy and Rulebook",
          "KPI Register: definition, formula, source, target and owner",
        ],
        duration: "Strategy 4–8 weeks · Performance Management System 4–6 weeks",
        clientInputs: "Strategy documents, reports and KPI data; workshops with management; a pilot team for the test run.",
        pricingBasis: "Fixed fee for the agreed scope.",
        offers: ["Strategy and strategic planning", "Strategy in the work of teams", "Performance Management System", "Organisation and delegation"],
      },
      {
        id: "operations",
        name: "Operational Excellence",
        summary: "Less waiting, fewer errors and less rework, so growth does not mean costs growing at the same pace.",
        whoNeedsIt: "Companies where work stalls, cases bounce back and the same problems keep recurring.",
        problem: "Accountability is lost in hand-offs, processes depend on individuals and improvements fade over time.",
        approach: ["Scan key processes and rank T1 priorities", "Measure a baseline", "Find root causes and pilot the TO BE process", "Control: owner, KPIs and control plan"],
        deliverables: [
          "Process map and ranked list of T1 priority processes",
          "Root causes confirmed with data",
          "TO BE process, RACI, SLAs, procedures and controls",
          "Pilot results compared with the baseline",
        ],
        duration: "Process scan 2–4 weeks · DMAIC 6–10 weeks per process · continuous improvement first 90 days",
        clientInputs: "Access to process owners, documents and operational data; a cross-functional team for each improvement project.",
        pricingBasis: "Diagnostic for a fixed fee; improvement work quoted per process or wave.",
        offers: ["Business Process Scan and Growth Recommendations", "Process Improvement (DMAIC) and process governance", "Continuous improvement (Kaizen)"],
      },
      {
        id: "digital",
        name: "Digital Transformation",
        summary: "Technology chosen by business value and process readiness: digitalisation, automation or AI support.",
        whoNeedsIt: "Companies planning digitalisation, automation or AI agents for processes that are already in order.",
        problem: "Tools are bought before the process is clear, so the same delays and errors simply move into software.",
        approach: ["Record and track the flow", "Automate repetitive steps with clear rules", "Use AI support where content and sources vary", "Specify, then coordinate with your IT team or partner"],
        deliverables: ["Transformation roadmap", "Functional requirements and integration plan", "Acceptance criteria", "Support in vendor selection"],
        duration: "Per specification, after a process assessment.",
        clientInputs: "Process documentation, current systems overview and a contact in your IT team or technology partner.",
        pricingBasis: "Assessment or project quotation. Technical development and licences are shown separately.",
        offers: ["Digitalisation roadmap", "Workflow automation specification", "AI support and AI agents specification"],
      },
      {
        id: "ai",
        name: "AI Governance",
        summary: "Use AI where it pays off, with clear rules, ownership and checked results.",
        whoNeedsIt: "Small and medium companies starting or organising AI use; larger companies preparing for the EU AI Act.",
        problem: "Employees already use AI tools, but there are no priorities, rules or budget, and nobody knows where AI adds value or what the risks are.",
        approach: ["Assess maturity, readiness and opportunities", "Govern: policy, rules and registers", "Prepare a redesigned process and pilot", "Pilot, measure and decide"],
        deliverables: [
          "AI readiness report and roadmap",
          "AI policy, risk classification and AI system register",
          "Redesigned process and pilot plan",
          "Pilot results: scale, refine or stop",
        ],
        duration: "Modular · 2–8 weeks per module",
        clientInputs: "An overview of current AI use, a process owner for the pilot and access to relevant data owners.",
        pricingBasis: "Scope-based offer, with a fixed fee per module.",
        offers: ["Mini assessment of one process", "AI maturity and readiness assessment", "AI governance system (ISO/IEC 42001 as framework)", "Responsible AI pilot"],
      },
      {
        id: "executive",
        name: "Executive Advisory",
        summary: "Leadership and transformation support at Board and CEO level, without a full-time hire.",
        whoNeedsIt: "Owners and CEOs who need a sparring partner, and regulated companies that need Board-level AI and transformation leadership.",
        problem: "The Board needs decisions, not another report, and there is no one in-house to lead AI and regulatory transformation.",
        approach: ["Readiness scan and priorities", "Rules, roles and controls", "Processes and controlled pilots", "Board reporting and decisions"],
        deliverables: [
          "AI readiness and risk map for the Board",
          "Board AI governance and oversight model",
          "Regular results reviews and decision preparation",
          "Pilot decisions: scale, adjust, hold or stop",
        ],
        duration: "Monthly support for owners and CEOs · Fractional CAITO mandate, minimum 6 months",
        clientInputs: "Agreed access to the Board and management, and a named internal counterpart.",
        pricingBasis: "Day rate or monthly retainer, agreed in writing.",
        offers: ["Support for owners and CEOs", "Fractional Chief AI & Transformation Officer (CAITO)", "Board AI Governance & Oversight"],
      },
      {
        id: "training",
        name: "Corporate Training",
        summary: "Hands-on training built on real situations from your company, not textbook cases.",
        whoNeedsIt: "Managers, process owners and teams who need practical methods they can apply the next day.",
        problem: "Training is forgotten because it is not tied to real work, and the same problems return.",
        approach: ["Agree the real case to work on", "Train with a practical method", "Apply it during the session", "Follow up on actions"],
        deliverables: ["At least one real problem or process worked through", "Templates your team keeps using", "Follow-up session"],
        duration: "1–2 days per training, plus follow-up · in-house, up to 15 participants",
        clientInputs: "A real process, project or problem to work on, and participants’ availability.",
        pricingBasis: "Session or programme fee, including materials and follow-up.",
        offers: [
          "Business Process Management (BPM)",
          "Project Management in Practice",
          "Customer Journey Mapping",
          "Design Thinking",
          "Problem Solving",
          "KAIZEN: Continuous Improvement",
          "Visual Management",
          "Change Management",
        ],
      },
    ] satisfies ConsultingCategory[],
  },

  benefits: {
    eyebrow: "Benefits & deliverables",
    title: "What changes for your organisation.",
    items: [
      { title: "A clear direction", body: "Time and money focused on the priorities that contribute most to the business." },
      { title: "Visible accountability", body: "Every goal has activities, an owner, a deadline and a measure of success." },
      { title: "A view you can act on", body: "A small set of relevant KPIs and regular reviews, so deviations are corrected early." },
      { title: "A more self-reliant team", body: "Clear roles and authority, easier delegation and faster decisions." },
    ],
    principle:
      "Before we start, we agree what needs to change and how we will verify it. Results are compared against the baseline; financial benefits are confirmed by your finance team.",
  },

  process: {
    eyebrow: "How it works",
    title: "A limited, well-defined start, then the next step.",
    steps: [
      { title: "Introductory conversation", body: "We discuss the two or three challenges that matter most to you now." },
      { title: "Written proposal", body: "Scope, results, timeline and fee, as a project or as monthly support." },
      { title: "Diagnostic", body: "A paid, fixed-scope diagnostic sets priorities and a baseline before larger work." },
      { title: "Delivery & verification", body: "Workshops, documents and pilots, with results checked against the baseline." },
      { title: "Handover", body: "Your internal team takes over the system, routines and documents." },
    ],
    roles: {
      title: "Who does what",
      vivum: {
        label: "VIVUM · Dr Sandra Kordić",
        items: ["Leads the advisory work and reports to management or the Board", "Diagnoses, designs processes and specifies requirements", "Coordinates partners and checks results"],
      },
      partners: {
        label: "Specialist partners",
        items: [
          "Legal experts confirm regulatory applicability and provide legal opinions",
          "Technology partners build, integrate and license software",
          "Their fees are shown separately and disclosed in advance",
        ],
      },
    },
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Indicative fees.",
    lede: "In EUR, excluding VAT. The final fee is confirmed in a written proposal after the introductory conversation, based on scope and company size.",
    approval: "Indicative ranges from the VIVUM Price List 2026. Approve before publishing.",
    tables: [
      {
        id: "consulting",
        label: "Consulting",
        note: "Fixed fee for the agreed scope.",
        cols: ["Duration", "Small & medium", "Large companies"],
        rows: [
          ["Business process scan & growth recommendations", "2–4 weeks", "3,500–6,000", "6,000–10,000"],
          ["Strategy and strategic planning", "4–8 weeks", "4,500–8,000", "8,000–15,000"],
          ["Performance Management System", "4–6 weeks", "5,000–8,000", "9,000–15,000"],
          ["DMAIC and process governance", "6–10 weeks per process", "4,000–7,000", "6,000–10,000"],
          ["Continuous improvement", "First 90 days, monthly", "1,500–2,500", "2,500–4,000"],
          ["Support for owners and CEOs", "Monthly, 8–16 hours", "1,200–2,200", "2,500–3,500"],
        ],
      },
      {
        id: "ai",
        label: "AI Governance",
        note: "For small and medium companies.",
        cols: ["Duration", "Fee"],
        rows: [
          ["Mini assessment: one process", "2 weeks", "1,500"],
          ["AI maturity and readiness assessment", "2–4 weeks", "2,500–4,000"],
          ["AI governance system", "4–6 weeks", "3,500–6,000"],
          ["Process redesign & AI pilot preparation", "3–4 weeks", "3,000–4,500"],
          ["Running the AI pilot", "6–8 weeks", "5,000–8,000"],
        ],
      },
      {
        id: "executive",
        label: "Executive Advisory",
        note: "For large and regulated companies. Fractional CAITO mandate: monthly, minimum 6 months.",
        cols: ["Duration", "Montenegro", "Region / complex"],
        rows: [
          ["Executive AI Readiness Scan", "4–6 weeks", "6,000–10,000", "10,000–15,000"],
          ["AI Governance Foundation", "8–12 weeks", "12,000–22,000", "22,000–35,000"],
          ["Regulation-to-Digital Process", "3–5 months per area", "20,000–40,000", "40,000–70,000"],
          ["Responsible AI Pilot", "3–6 months", "18,000–35,000", "35,000–60,000"],
          ["Board AI Governance", "Workshop to annual mandate", "3,000–12,000", "5,000–20,000"],
          ["CAITO mandate: Advisory", "Up to 2 days / month", "2,500–3,500", "—"],
          ["CAITO mandate: Core", "4 days / month", "4,500–6,500", "—"],
          ["CAITO mandate: Transformation", "6–8 days / month", "7,000–10,000", "—"],
          ["CAITO mandate: Regional", "Multiple markets", "—", "9,000–14,000"],
        ],
      },
      {
        id: "training",
        label: "Corporate Training",
        note: "In-house, up to 15 participants, including materials and follow-up.",
        cols: ["Duration", "Small & medium", "Large companies"],
        rows: [
          ["Business Process Management", "2 days", "2,400–3,200", "3,500–4,500"],
          ["Project Management", "2 days", "2,200–3,000", "3,200–4,200"],
          ["Customer Journey Mapping", "1 day + journey map", "1,500–2,200", "2,200–3,000"],
          ["Design Thinking", "2 days", "2,400–3,200", "3,500–4,500"],
          ["Problem Solving", "1–2 days", "1,500–2,800", "2,200–3,800"],
          ["KAIZEN", "2 days + Kaizen event", "2,800–3,800", "4,000–5,500"],
          ["Visual Management", "1 day + pilot-team board", "1,800–2,600", "2,600–3,500"],
        ],
      },
    ],
    terms: [
      "Projects: 40% on signing, 40% on key deliverables, 20% on completion.",
      "Monthly engagements are paid in advance; additional days are billed separately.",
      "Additional work: EUR 100 per hour, with prior written approval.",
      "Shown separately: software, licences, external experts, legal opinions and travel.",
    ],
  },

  people: {
    eyebrow: "People & independence",
    name: "Dr Sandra Kordić",
    role: "Lead, Business Transformation & Executive Advisory",
    bio: "PhD in process management. Experience in executive leadership, banking and international business, including Société Générale in Paris, as well as leading organisations through business change.",
    approval: "Approved biography, verified credentials and portrait",
    focus: ["Banking leadership", "International transformation", "Business processes", "Strategy & performance", "Governance", "Responsible AI"],
    independence: {
      title: "Independence and transparency",
      body: "Services are not provided to banks. Every engagement with an insurance or financial company goes through a prior conflict-of-interest check. Applicability of EU and local regulation is confirmed for each client by an engaged legal expert; legal opinions and certification are contracted separately.",
    },
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions clients ask.",
    items: [
      {
        q: "Where do we start if we are not sure which service we need?",
        a: "Start with an introductory conversation. If priorities are unclear, a short fixed-scope diagnostic, such as the Business Process Scan or an AI readiness assessment, gives you an evidence-based starting point.",
      },
      {
        q: "Is the introductory conversation the same as a diagnostic?",
        a: "No. The introductory conversation is used to understand your needs and agree whether and how to work together. A diagnostic is a paid, scoped piece of work with defined deliverables.",
      },
      {
        q: "Do you build software or implement AI tools yourselves?",
        a: "No. VIVUM advises, designs the process and specifies requirements. Development, integration and licences are delivered by your IT team or a technology partner, and are shown separately.",
      },
      {
        q: "Do you provide legal advice on the EU AI Act or GDPR?",
        a: "We prepare your organisation for these requirements. Applicability is confirmed by an engaged legal expert, and legal opinions or certification are contracted separately.",
      },
      {
        q: "How are fees agreed?",
        a: "Diagnostics and projects have a fixed fee for an agreed scope; ongoing support is a monthly retainer or day rate. You receive the fee in a written proposal before any work begins.",
      },
      {
        q: "Can training be built around our own cases?",
        a: "Yes. In-house training uses a real process, project or problem from your company, and includes follow-up so actions are closed.",
      },
      {
        q: "Do you work with banks?",
        a: "No. Services are not provided to banks, and engagements with insurance or financial companies go through a prior conflict-of-interest check.",
      },
    ],
  },

  form: {
    eyebrow: "Book business consultation",
    title: "Tell us about your organisation.",
    lede: "Share a little context and the challenge you want to address. We reply with a suggested next step: an introductory conversation and, where useful, a scoped proposal.",
    submit: "Book Business Consultation",
    fields: {
      organisation: "Organisation",
      role: "Your role",
      size: "Company size",
      sizes: ["Small or medium company", "Large company", "Regulated company (insurance, telecoms, energy, healthcare…)", "Public enterprise"],
      category: "Area of interest",
      challenge: "Your main challenge",
      challengeHint: "Two or three sentences are enough.",
      timing: "Preferred timing",
      timings: ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "Just exploring"],
    },
  },
};
