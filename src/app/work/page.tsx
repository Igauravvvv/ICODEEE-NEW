import type { Metadata } from "next";
import { ProjectCollection } from "@/components/project-showcase";
import { PageHero } from "@/components/page-hero";
import { getProjects } from "@/lib/data";
export const metadata: Metadata = { title: "Work", description: "Selected iCodeee projects and case studies." };
export default async function Work() { const projects = await getProjects(); return <main id="main" className="page-main"><PageHero eyebrow="Selected work" title="BUILT TO BE REMEMBERED.">Real brands, distinctive worlds and websites you can explore for yourself.</PageHero><section className="content-section"><ProjectCollection projects={projects} /></section></main>; }
