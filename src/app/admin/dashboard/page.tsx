import React from 'react';
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const hospitalCount = await prisma.hospital.count();
  const blogCount = await prisma.blogPost.count();
  const cityCount = await prisma.city.count();
  const specialtyCount = await prisma.specialty.count();

  const recentHospitals = await prisma.hospital.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, createdAt: true }
  });

  const recentPosts = await prisma.blogPost.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, createdAt: true }
  });

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Manage your medical information portal</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{hospitalCount}</div>
          <div className="stat-label">Total Hospitals</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{blogCount}</div>
          <div className="stat-label">Blog Posts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{cityCount}</div>
          <div className="stat-label">Cities Covered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{specialtyCount}</div>
          <div className="stat-label">Specialties</div>
        </div>
      </div>

      <div className="recent-grid">
        <section className="recent-section">
          <h2>Recent Hospital Listings</h2>
          <div className="list-card">
            {recentHospitals.length > 0 ? (
              <ul>
                {recentHospitals.map(h => (
                  <li key={h.id}>
                    <span className="item-name">{h.name}</span>
                    <span className="item-date">{new Date(h.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">No hospitals added yet.</p>
            )}
          </div>
        </section>

        <section className="recent-section">
          <h2>Recent Blog Posts</h2>
          <div className="list-card">
            {recentPosts.length > 0 ? (
              <ul>
                {recentPosts.map(p => (
                  <li key={p.id}>
                    <span className="item-name">{p.title}</span>
                    <span className="item-date">{new Date(p.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">No blog posts added yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
