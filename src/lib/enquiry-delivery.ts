/** Server-side integration. Private keys must never use NEXT_PUBLIC_ names. */
type Enquiry = {
  area: string;
  locale: string;
  email: string;
  summary: { label: string; value: string }[];
};

type Delivery = { status: "preview" } | { status: "received"; reference: string };

export async function deliverEnquiry(enquiry: Enquiry, review: boolean): Promise<Delivery> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    if (review) return { status: "preview" };
    throw new Error("Enquiry storage is not configured");
  }

  const reference = crypto.randomUUID();
  const endpoint = `${url.replace(/\/$/, "")}/rest/v1/enquiries`;
  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const stored = await fetch(endpoint, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({ id: reference, area: enquiry.area, locale: enquiry.locale, email: enquiry.email, fields: enquiry.summary, consent_at: new Date().toISOString(), notification_status: "pending" }),
    signal: AbortSignal.timeout(10000),
    cache: "no-store",
  });
  if (!stored.ok) throw new Error("Enquiry storage failed");

  // Storage is the source of truth. An email outage must not lose an accepted enquiry or
  // encourage the visitor to submit it again. Pending/failed notifications remain in the inbox.
  const token = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env[`ENQUIRY_TO_${enquiry.area.toUpperCase()}`];
  if (token && from && to) {
    let notificationStatus = "failed";
    try {
      const email = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Idempotency-Key": `enquiry/${reference}` },
        body: JSON.stringify({ from, to: [to], reply_to: enquiry.email, subject: `VIVUM ${enquiry.area} enquiry · ${reference}`, text: `Reference: ${reference}\n\n${enquiry.summary.map((f) => `${f.label}: ${f.value}`).join("\n\n")}` }),
        signal: AbortSignal.timeout(10000),
        cache: "no-store",
      });
      notificationStatus = email.ok ? "sent" : "failed";
    } catch {
      // The enquiry is already safely stored; the team can follow it up from the inbox.
    }
    try {
      const updated = await fetch(`${endpoint}?id=eq.${reference}`, {
        method: "PATCH", headers, body: JSON.stringify({ notification_status: notificationStatus }), signal: AbortSignal.timeout(10000), cache: "no-store",
      });
      if (!updated.ok) console.error("Enquiry notification status could not be updated", reference);
    } catch {
      console.error("Enquiry notification status could not be updated", reference);
    }
  }
  return { status: "received", reference };
}
