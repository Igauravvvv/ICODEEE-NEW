import type { Project } from "@/lib/types";

export const navItems = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["Process", "/process"],
  ["About", "/about"],
  ["Resources", "/resources"],
] as const;

export const projectFallback: Project[] = [
  {
    id: "slugsera",
    slug: "slugsera",
    name: "Slugsera",
    category: "Digital experience",
    short_description: "An ecommerce experience for an independent streetwear brand.",
    description: "Explore the Slugsera storefront, from its collections to its brand story.",
    cover_image: null,
    gallery: [], video: null, services: [], technologies: [], live_url: "https://www.slugsera.com",
    case_study_content: {}, published: true, order: 1,
  },
  {
    id: "rupali-construction",
    slug: "rupali-construction",
    name: "Rupali Construction",
    category: "Web platform",
    short_description: "A digital presence for a construction business, connecting services, projects and enquiries.",
    description: "Explore Rupali Construction’s services and portfolio on the live website.",
    cover_image: null,
    gallery: [], video: null, services: [], technologies: [], live_url: "https://rupaliconstruction.com",
    case_study_content: {}, published: true, order: 2,
  },
];

export const services = [
  { number: "01", slug: "website-development", name: "Website Development", line: "Fast, responsive websites designed around business goals.", items: ["Marketing websites", "Custom web applications", "Performance & SEO"] },
  { number: "02", slug: "ecommerce-setup", name: "Ecommerce Setup", line: "A complete storefront built to make buying simple.", items: ["Store setup & catalog", "Payments & checkout", "Analytics & integrations"] },
  { number: "03", slug: "ui-ux-design", name: "UI / UX Design", line: "Useful digital experiences that feel clear from the first click.", items: ["User journeys", "Wireframes & prototypes", "Interface design systems"] },
  { number: "04", slug: "content-strategy", name: "Content Strategy", line: "A sharper message and a practical plan for what to say next.", items: ["Brand voice & messaging", "Content planning", "Conversion copy"] },
  { number: "05", slug: "graphic-design", name: "Graphic Design", line: "Distinctive visual work across every place your brand appears.", items: ["Logos & identity", "Clothing & packaging", "Campaigns & AI mockups"] },
];
