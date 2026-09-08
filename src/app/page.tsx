import { ConversionHome } from "@/components/conversion-home";
import { getProjects } from "@/lib/data";

export default async function Home() { return <ConversionHome projects={await getProjects()} />; }
