import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const base = process.env.NEXT_PUBLIC_SITE_URL || "https://icodeee.com"; const staticRoutes = ["", "/work", "/services", "/process", "/about", "/resources", "/contact"]; const projects = await getProjects(); return [...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })), ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, lastModified: new Date() }))]; }
