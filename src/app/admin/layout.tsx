"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="admin-layout">
      {!isLoginPage && (
        <aside className="admin-sidebar">
          <div className="admin-logo">
            <span className="logo-med">Medi</span>Portal <span className="admin-tag">Admin</span>
          </div>
          <nav className="admin-nav">
            <Link href="/admin/dashboard">Dashboard</Link>
            <div className="nav-group">
              <span className="nav-label">Healthcare</span>
              <Link href="/admin/hospitals">Manage Hospitals</Link>
              <Link href="/admin/cities">Manage Cities</Link>
              <Link href="/admin/specialties">Manage Specialties</Link>
            </div>
            <div className="nav-group">
              <span className="nav-label">Content</span>
              <Link href="/admin/blog">Manage Blog</Link>
              <Link href="/admin/categories">Blog Categories</Link>
            </div>
            <div className="nav-group">
              <span className="nav-label">System</span>
              <Link href="/admin/settings">Settings</Link>
              <form action={logout}>
                <button type="submit" className="logout-btn">Logout</button>
              </form>
            </div>
          </nav>
        </aside>
      )}
      <main className="admin-main">
        {children}
      </main>

    </div>
  );
}
