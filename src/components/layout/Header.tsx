import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="main-header">
      <div className="container header-inner">
        <Link href="/" className="logo flex items-center gap-2">
          <Image src="/logo.png" alt="mediportal247" width={40} height={40} className="rounded-md" />
          <span className="logo-text hidden md:inline"><span className="logo-med">mediportal</span>247</span>
        </Link>

        <nav className="main-nav">
          <Link href="/hospitals">Hospitals</Link>
          <Link href="/cities">Cities</Link>
          <Link href="/blog">Medical Blog</Link>
        </nav>
      </div>
    </header>
  );
}
