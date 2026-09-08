"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function MagneticLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const reduced = useReducedMotion();
  const springX = useSpring(x, { stiffness: 190, damping: 14 }); const springY = useSpring(y, { stiffness: 190, damping: 14 });
  return <motion.div style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }} onMouseMove={(e) => { if (reduced) return; const rect = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - rect.left - rect.width / 2) * .15); y.set((e.clientY - rect.top - rect.height / 2) * .15); }} onMouseLeave={() => { x.set(0); y.set(0); }}>
    <Link href={href} className={`button ${secondary ? "button-secondary" : ""}`}>{children}<span>→</span></Link>
  </motion.div>;
}
