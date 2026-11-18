// Partners page — after the Tresmares Capital Portfolio page (title + intro + filters → logo grid
// with photo on hover → side panel). No partner is named until VIVUM confirms it for publication:
// each tile is a typed placeholder. Client approval required.

import type { DivisionId } from "./common";

export type Partner = {
  id: string;
  name: string;
  area: DivisionId;
  type: string;
  location: string;
  role: string;
  body: string;
  photo: string;
};

export const partnersPage = {
  title: ["VIVUM", "Partners"] as [string, string],
  lede: "We work with trusted universities, recruitment, technology and hotel partners, each with a clearly stated role.",
  filterLabel: "Filter by",
  filters: { area: "Area", type: "Partner type" },
  all: "All",
  rows: { area: "Area", type: "Partner type", location: "Location", role: "Role" },
  contact: "Ask about this partnership",
  close: "Close",
  placeholder: "Name to be confirmed",
  approval: "partner names, logos, descriptions and permission to publish",
  items: [
    { id: "hotel-1", name: "Partner hotel", area: "wellbeing", type: "Hotel", location: "Montenegro", role: "Accommodation for programme guests", body: "Accommodation for guests on wellbeing programmes, arranged with the hotel and described separately from treatments.", photo: "/images/wheel-03.webp" },
    { id: "practice-1", name: "Ayurveda practice", area: "wellbeing", type: "Practitioners", location: "Montenegro", role: "Treatments by qualified practitioners", body: "Ayurveda treatments delivered by practitioners whose qualifications are verified before publication.", photo: "/images/wheel-01.webp" },
    { id: "tech-1", name: "Technology partner", area: "consulting", type: "Technology", location: "To be confirmed", role: "Software development", body: "Builds the digital solutions VIVUM specifies, after a process assessment. Development and licences are shown separately.", photo: "/images/wheel-08.webp" },
    { id: "tech-2", name: "AI & data partner", area: "consulting", type: "Technology", location: "To be confirmed", role: "AI and data delivery", body: "Delivers AI and data work within the governance and priorities agreed with VIVUM and the client.", photo: "/images/wheel-07.webp" },
    { id: "recruit-1", name: "Recruitment partner", area: "workforce", type: "Recruitment", location: "To be confirmed", role: "Sourcing and pre-selection", body: "Sources and pre-selects international candidates for employers in Montenegro, under the signed agreements.", photo: "/images/wheel-10.webp" },
    { id: "admin-1", name: "Administrative provider", area: "workforce", type: "Specialist provider", location: "Montenegro", role: "Administrative support", body: "Supports the employment steps that the responsible parties must complete under applicable law.", photo: "/images/wheel-09.webp" },
    { id: "uni-1", name: "University partner", area: "education", type: "University", location: "To be confirmed", role: "Study programmes", body: "Programmes from an institution VIVUM is authorised to represent. Admission decisions remain with the university.", photo: "/images/wheel-11.webp" },
    { id: "uni-2", name: "Study programme partner", area: "education", type: "University", location: "To be confirmed", role: "Study programmes", body: "Further programmes from an authorised institution, with support on requirements and application documents.", photo: "/images/wheel-12.webp" },
  ] satisfies Partner[],
};
