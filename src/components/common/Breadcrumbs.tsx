import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          {items.map((item, index) => (
            <li key={index}>
              <span className="separator">/</span>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span className="current">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
