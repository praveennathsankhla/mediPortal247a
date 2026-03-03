"use client";

import Link from "next/link";
import React from 'react';

export default function AdminCitiesPage() {
    const cities = [
        { id: '1', name: 'Delhi', slug: 'delhi', _count: { hospitals: 15 } },
        { id: '2', name: 'Mumbai', slug: 'mumbai', _count: { hospitals: 12 } },
    ];

    return (
        <div className="admin-cities">
            <header className="page-header">
                <div>
                    <h1>Manage Cities</h1>
                    <p>Organize hospitals by location</p>
                </div>
                <Link href="/admin/cities/new" className="btn btn-primary">
                    Add New City
                </Link>
            </header>

            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>City Name</th>
                            <th>Slug</th>
                            <th>Hospitals Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map(c => (
                            <tr key={c.id}>
                                <td className="font-bold">{c.name}</td>
                                <td>{c.slug}</td>
                                <td>{c._count.hospitals}</td>
                                <td className="actions">
                                    <Link href={`/admin/cities/${c.id}/edit`} className="edit-link">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .data-table-container {
          background: white;
          border-radius: 8px;
          box-shadow: var(--shadow);
          overflow: hidden;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        .data-table th, .data-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          text-align: left;
        }
        .data-table th {
          background: #f8fafc;
          font-weight: 600;
          color: #4a5568;
          font-size: 0.85rem;
          text-transform: uppercase;
        }
        .font-bold { font-weight: 600; color: var(--primary); }
        .edit-link { color: var(--primary); font-weight: 500; text-decoration: none; }
      `}</style>
        </div>
    );
}
