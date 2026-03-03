"use client";

import React from 'react';

export default function DashboardPage() {
  const hospitalCount = 12;
  const blogCount = 8;
  const cityCount = 5;

  const recentHospitals = [
    { id: '1', name: 'Apollo Hospital Delhi', createdAt: new Date() },
    { id: '2', name: 'Max Hospital Saket', createdAt: new Date() },
  ];

  const recentPosts = [
    { id: 'a', title: 'Top 10 Health Tips', createdAt: new Date() },
    { id: 'b', title: 'Understanding Fever', createdAt: new Date() },
  ];

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

      <style jsx>{`
        .dashboard-header {
          margin-bottom: 2rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: var(--shadow);
          text-align: center;
        }
        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
        }
        .stat-label {
          color: var(--text-muted);
          font-weight: 600;
          margin-top: 0.5rem;
        }
        .recent-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .recent-section h2 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .list-card {
          background: white;
          border-radius: 8px;
          box-shadow: var(--shadow);
          padding: 1rem;
        }
        .list-card ul {
          list-style: none;
        }
        .list-card li {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .list-card li:last-child {
          border-bottom: none;
        }
        .item-name {
          font-weight: 500;
          color: var(--foreground);
        }
        .item-date {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .no-data {
          color: var(--text-muted);
          text-align: center;
          padding: 2rem 0;
        }
        @media (max-width: 1024px) {
          .recent-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
