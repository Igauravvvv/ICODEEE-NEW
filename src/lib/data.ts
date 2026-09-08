import { projectFallback } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  if (!supabase) return projectFallback;
  const { data, error } = await supabase.from("projects").select("*").eq("published", true).order("order");
  return error || !data?.length ? projectFallback : data as Project[];
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
