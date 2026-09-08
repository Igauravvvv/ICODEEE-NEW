import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { services } from "@/lib/site";
export const metadata: Metadata = { title: "Services", description: "Website development, ecommerce, UI/UX, content strategy and graphic design from iCodeee." };
export default function Services() { return <main id="main" className="page-main"><PageHero eyebrow="Capability, connected" title="ONE PARTNER. THE WHOLE SYSTEM.">Strategy, content, design and development move faster and stay sharper when they are built together.</PageHero><section className="content-section"><div className="card-grid">{services.map((service) => <article className="info-card" id={service.slug} key={service.name}><p className="eyebrow">{service.number}</p><h3>{service.name}</h3><p>{service.line}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section></main>; }
