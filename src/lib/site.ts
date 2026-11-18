// Site-wide settings. Contact routes follow master brief §11: the aliases are PROPOSED and
// must not be published as working contacts until VIVUM confirms the mailboxes exist.

/** Review build: shows "Client approval required" markers. Set NEXT_PUBLIC_REVIEW_MODE=off for launch. */
export const reviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE !== "off";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vivumgroup.com"; // domain to be confirmed

export type RouteId = "general" | "wellbeing" | "education" | "workforce" | "consulting" | "ayushLondon" | "ayushMontenegro";

export const contactRoutes: Record<RouteId, { team: string; email: string; verified: boolean; conversion: string }> = {
  general: { team: "VIVUM Group", email: "info@vivumgroup.com", verified: false, conversion: "General enquiry" },
  wellbeing: { team: "VIVUM Wellbeing", email: "wellbeing@vivumgroup.com", verified: false, conversion: "Programme enquiry" },
  education: { team: "International Education", email: "education@vivumgroup.com", verified: false, conversion: "Student guidance request" },
  workforce: { team: "International Workforce", email: "workforce@vivumgroup.com", verified: false, conversion: "Employer quotation" },
  consulting: { team: "Business Consulting", email: "consulting@vivumgroup.com", verified: false, conversion: "Consultation request" },
  ayushLondon: { team: "AYUSH London", email: "contact@ayushuk.com", verified: false, conversion: "Clinic booking / enquiry" },
  ayushMontenegro: { team: "AYUSH Montenegro", email: "ayush.montenegro@vivumgroup.com", verified: false, conversion: "Clinic booking / enquiry" },
};

/** WhatsApp business number — not yet supplied. Rendered as a placeholder while null. */
export const whatsappNumber: string | null = null;

export const legalName = "VIVUM Group d.o.o.";

/** Email to display for a route: verified addresses always; proposed ones only in the review build. */
export function displayEmail(id: RouteId): string | null {
  const r = contactRoutes[id];
  return r.verified || reviewMode ? r.email : null;
}
