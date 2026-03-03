"use client";

import Link from "next/link";
import { logout } from "@/lib/actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
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
      <main className="admin-main">
        {children}
      </main>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
        }
        .admin-sidebar {
          width: 260px;
          background: #1a202c;
          color: white;
          padding: 2rem 0;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }
        .admin-logo {
          padding: 0 1.5rem 2rem;
          font-size: 1.25rem;
          font-weight: 700;
          border-bottom: 1px solid #2d3748;
          margin-bottom: 1rem;
        }
        .logo-med { color: var(--secondary); }
        .admin-tag {
          font-size: 0.65rem;
          background: var(--primary);
          padding: 2px 5px;
          border-radius: 4px;
          margin-left: 5px;
          text-transform: uppercase;
        }
        .admin-nav {
          display: flex;
          flex-direction: column;
        }
        .admin-nav a, .logout-btn {
          padding: 0.75rem 1.5rem;
          color: #a0aec0;
          text-decoration: none;
          transition: all 0.2s;
          display: block;
          width: 100%;
          text-align: left;
          border: none;
          background: none;
          font-size: 0.95rem;
          cursor: pointer;
        }
        .admin-nav a:hover, .logout-btn:hover {
          background: #2d3748;
          color: white;
        }
        .nav-group {
          margin-top: 1.5rem;
        }
        .nav-label {
          padding: 0.5rem 1.5rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #718096;
          font-weight: 600;
        }
        .admin-main {
          flex: 1;
          background: #f7fafc;
          padding: 2rem;
          overflow-y: auto;
        }
        .logout-btn {
          color: #fc8181;
        }
      `}</style>
    </div>
  );
}
