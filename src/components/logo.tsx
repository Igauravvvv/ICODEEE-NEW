import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" aria-label="home" className="logo-mark" style={{ width: 'auto', gap: 0 }}>
      <Image
        src={dark ? "/brand/White_full.png" : "/brand/Blue_Full.png"}
        alt="Logo"
        width={140}
        height={35}
        priority
        style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
      />
    </Link>
  );
}
