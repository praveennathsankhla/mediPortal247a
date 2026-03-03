import Link from "next/link";

export default function Header() {
  return (
    <header className="main-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <span className="logo-med">mediportal</span>247
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
