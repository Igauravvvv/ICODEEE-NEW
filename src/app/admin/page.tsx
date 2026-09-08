import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { requireAdmin } from "@/lib/admin";
export const dynamic = "force-dynamic";
export default async function AdminPage() { if (!(await requireAdmin())) redirect("/admin/login"); return <main className="admin-page"><AdminDashboard /></main>; }
