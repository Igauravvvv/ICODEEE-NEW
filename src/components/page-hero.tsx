import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  const words = title.split(" ");
  return <section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{words.slice(0, -2).join(" ")} <span>{words.slice(-2).join(" ")}</span></h1>{children && <div className="page-hero-copy">{children}</div>}<div className="hero-rule" /></section>;
}
