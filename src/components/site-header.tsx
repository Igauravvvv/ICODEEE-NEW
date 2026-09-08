"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/logo";
import { navItems } from "@/lib/site";

const darkSurfaceSelector = [
  ".dark-scene",
  ".method-scene",
  ".contact-page",
  ".case-intro",
  ".content-section.dark",
  ".footer",
].join(", ");

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const reduced = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const update = () => {
      const header = document.querySelector<HTMLElement>(".site-header");
      const sampleY = Math.min((header?.getBoundingClientRect().bottom ?? 72) + 1, window.innerHeight - 1);
      const surface = document.elementsFromPoint(window.innerWidth / 2, sampleY)
        .find((element) => !element.closest(".site-header, .mobile-menu") && element.closest("main, footer"));

      setDark(Boolean(surface?.closest(darkSurfaceSelector)));
    };

    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = Array.from(document.querySelectorAll<HTMLElement>(".site-header, main, footer, .skip-link"));
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>("a[href],button");
      if (!focusable?.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const resize = () => { if (window.innerWidth > 900) setOpen(false); };
    document.addEventListener("keydown", keydown);
    window.addEventListener("resize", resize);
    const trigger = triggerRef.current;
    return () => { cancelAnimationFrame(frame); document.body.style.overflow = previousOverflow; background.forEach((element, index) => { element.inert = previousInert[index]; }); document.removeEventListener("keydown", keydown); window.removeEventListener("resize", resize); trigger?.focus(); };
  }, [open]);

  return <>
    <header className={`site-header ${dark ? "header-dark" : ""}`}>
      <Logo dark={dark} />
      <nav aria-label="Main navigation" className="desktop-nav">
        {navItems.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link href="/contact" className="talk-link">Let&apos;s Talk <span>↗</span></Link>
        <button ref={triggerRef} className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation"><Menu size={21} /></button>
      </div>
    </header>
    <AnimatePresence>
      {open && <motion.div ref={menuRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Site navigation" className="mobile-menu" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }} initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: reduced ? 0 : .55, ease: [0.76, 0, .24, 1] }}>
        <div className="mobile-menu-top"><Logo dark /><button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
        <nav>{navItems.map(([label, href], index) => <motion.div key={href} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + index * .06 }}><Link href={href}>{label}<span>0{index + 1}</span></Link></motion.div>)}<Link className="mobile-talk" href="/contact">Let&apos;s build <span>↗</span></Link></nav>
      </motion.div>}
    </AnimatePresence>
  </>;
}
