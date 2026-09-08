export type Project = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  short_description: string | null;
  cover_image: string | null;
  gallery: string[];
  video: string | null;
  services: string[];
  technologies: string[];
  live_url: string | null;
  case_study_content: Record<string, string>;
  published: boolean;
  order: number;
};

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED" | "ARCHIVED";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  project_type: string | null;
  budget: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
};
