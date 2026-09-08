import { NextResponse } from "next/server";
import { adminClient, requireAdmin } from "@/lib/admin";
import { leadSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = leadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  if (parsed.data.company_site) return NextResponse.json({ ok: true });
  const supabase = adminClient();
  if (!supabase) return NextResponse.json({ error: "Contact service is not configured yet." }, { status: 503 });
  const { company_site: _honeypot, ...lead } = parsed.data;
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { data: duplicate } = await supabase.from("leads").select("id").eq("email", lead.email).gte("created_at", since).maybeSingle();
  if (duplicate) return NextResponse.json({ error: "We already received a message from this email recently." }, { status: 429 });
  const { error } = await supabase.from("leads").insert({ ...lead, status: "NEW" });
  if (error) return NextResponse.json({ error: "We couldn’t save your message. Please try again." }, { status: 500 });
  await sendNotifications(lead);
  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = adminClient(); if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  return error ? NextResponse.json({ error: "Unable to load leads" }, { status: 500 }) : NextResponse.json(data);
}

async function sendNotifications(lead: Record<string, string>) {
  const key = process.env.RESEND_API_KEY; const from = process.env.LEADS_FROM_EMAIL; const to = process.env.LEADS_TO_EMAIL;
  if (!key || !from || !to) return;
  const subject = `New iCodeee lead — ${lead.name}`;
  const html = `<h1>${subject}</h1><p><b>Email:</b> ${lead.email}</p><p><b>Company:</b> ${lead.company || "—"}</p><p><b>Focus:</b> ${lead.project_type || "—"}</p><p>${lead.message.replace(/\n/g, "<br>")}</p>`;
  await Promise.allSettled([
    fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject, html }) }),
    fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [lead.email], subject: "We received your iCodeee brief", html: `<p>Hi ${lead.name},</p><p>Thanks for getting in touch with iCodeee. We’ve received your brief and will get back to you shortly.</p>` }) }),
  ]);
}
