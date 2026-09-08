import Link from "next/link";

export default function NotFound() { return <main id="main" className="not-found"><p className="eyebrow">404 — Signal lost</p><h1>THIS PAGE<br />WASN&apos;T <span>BUILT.</span></h1><p>Let&apos;s build something better.</p><Link className="button" href="/">Back home <span>→</span></Link></main>; }
