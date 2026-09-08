import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = { title: "Let’s Talk", description: "Tell iCodeee what you’re building." };
export default function Contact() { return <main id="main" className="contact-page"><section className="contact-intro"><p className="eyebrow">Start a conversation</p><h1>BUILD SOMETHING<br /><span>WORTH NOTICING.</span></h1><p>Give us the useful version. The goal, the challenge, and where you want it to go.</p></section><section className="contact-shell"><ContactForm /></section></main>; }
