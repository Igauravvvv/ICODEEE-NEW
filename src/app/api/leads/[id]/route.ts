import { NextResponse } from "next/server";
import { z } from "zod";
import { adminClient, requireAdmin } from "@/lib/admin";
const schema = z.object({ status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "ARCHIVED"]) });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Invalid status" }, { status: 400 }); const supabase = adminClient(); if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 }); const { error } = await supabase.from("leads").update(parsed.data).eq("id", (await params).id); return error ? NextResponse.json({ error: "Unable to update lead" }, { status: 500 }) : NextResponse.json({ ok: true }); }
