import type { Project } from "@/lib/types";

const visuals: Record<string, { image: string; alt: string; gallery: string[]; caption: string }> = {
  slugsera: {
    image: "/work/slugsera-campaign.webp",
    alt: "Slugsera campaign featuring the Let The Moment Play graphic T-shirt against a red backdrop",
    gallery: ["/work/slugsera-blue.webp", "/work/slugsera-green.webp", "/work/slugsera-outdoors.webp"],
    caption: "Streetwear with a point of view.",
  },
  "rupali-construction": {
    image: "/work/rupali-villa.jpg",
    alt: "Duplex Luxury Villa featured in Rupali Construction’s project portfolio",
    gallery: ["/work/rupali-interior.png", "/work/rupali-villa.jpg"],
    caption: "A stronger presence. From the ground up.",
  },
};

export function getProjectVisual(project: Project) {
  const visual = visuals[project.slug];
  return { image: project.cover_image || visual?.image, alt: visual?.alt || project.name, gallery: project.gallery.length ? project.gallery : visual?.gallery || [], caption: visual?.caption || project.short_description || project.name };
}
