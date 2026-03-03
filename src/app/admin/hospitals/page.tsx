"use client";

import Link from "next/link";
import React from 'react';

export default function AdminHospitalsPage() {
  const hospitals = [
    {
      id: '1',
      name: 'Apollo Hospital Delhi',
      city: { name: 'Delhi' },
      publishDate: new Date(),
      lastUpdated: new Date(),
    },
    {
      id: '2',
      name: 'Max Hospital Saket',
      city: { name: 'Delhi' },
      publishDate: new Date(),
      lastUpdated: new Date(),
    }
  ];

  return (
    <div className="admin-hospitals">
      <header className="page-header">
        <div>
          <h1>Hospital Listings</h1>
          <p>Manage all hospital profiles on the platform</p>
        </div>
        <Link href="/admin/hospitals/new" className="btn btn-primary">
          Add New Hospital
        </Link>
      </header>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>City</th>
              <th>Published Date</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.length > 0 ? (
              hospitals.map(h => (
                <tr key={h.id}>
                  <td className="font-bold">{h.name}</td>
                  <td>{h.city?.name || 'N/A'}</td>
                  <td>{new Date(h.publishDate).toLocaleDateString()}</td>
                  <td>{new Date(h.lastUpdated).toLocaleDateString()}</td>
                  <td className="actions">
                    <Link href={`/admin/hospitals/${h.id}/edit`} className="edit-link">Edit</Link>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8">No hospitals found. Add your first listing!</td>
              </tr>
            )}
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
          text-align: left;
        }
        .data-table th, .data-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        .data-table th {
          background: #f8fafc;
          font-weight: 600;
          color: #4a5568;
          font-size: 0.85rem;
          text-transform: uppercase;
        }
        .font-bold {
          font-weight: 600;
          color: var(--primary);
        }
        .actions {
          display: flex;
          gap: 1rem;
        }
        .edit-link {
          color: var(--primary);
          font-weight: 500;
        }
        .delete-btn {
          color: var(--error);
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }
        .text-center { text-align: center; }
        .py-8 { padding: 2rem 0; }
      `}</style>
    </div>
  );
}
