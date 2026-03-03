"use client";

import Link from "next/link";
import React from 'react';

export default function AdminCategoriesPage() {
    const categories = [
        { id: '1', name: 'Wellness', slug: 'wellness', _count: { posts: 10 } },
        { id: '2', name: 'Health Awareness', slug: 'health-awareness', _count: { posts: 5 } },
    ];

    return (
        <div className="admin-categories">
            <header className="page-header">
                <div>
                    <h1>Blog Categories</h1>
                    <p>Organize medical articles by topic</p>
                </div>
                <Link href="/admin/categories/new" className="btn btn-primary">
                    Add New Category
                </Link>
            </header>

            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Slug</th>
                            <th>Posts Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(c => (
                            <tr key={c.id}>
                                <td className="font-bold">{c.name}</td>
                                <td>{c.slug}</td>
                                <td>{c._count.posts}</td>
                                <td className="actions">
                                    <Link href={`/admin/categories/${c.id}/edit`} className="edit-link">Edit</Link>
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
