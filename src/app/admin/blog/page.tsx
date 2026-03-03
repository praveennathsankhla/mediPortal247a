"use client";

import Link from "next/link";
import React from 'react';

export default function AdminBlogPage() {
  const posts = [
    {
      id: 'a',
      title: 'Top 10 Health Tips',
      category: { name: 'Wellness' },
      publishDate: new Date(),
      lastUpdated: new Date(),
    },
    {
      id: 'b',
      title: 'Understanding Fever',
      category: { name: 'Health Awareness' },
      publishDate: new Date(),
      lastUpdated: new Date(),
    }
  ];

  return (
    <div className="admin-blog">
      <header className="page-header">
        <div>
          <h1>Blog Posts</h1>
          <p>Manage medical awareness articles and health tips</p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-primary">
          Create New Post
        </Link>
      </header>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Published</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map(p => (
                <tr key={p.id}>
                  <td className="font-bold">{p.title}</td>
                  <td>{p.category?.name || 'Uncategorized'}</td>
                  <td>{new Date(p.publishDate).toLocaleDateString()}</td>
                  <td>{new Date(p.lastUpdated).toLocaleDateString()}</td>
                  <td className="actions">
                    <Link href={`/admin/blog/${p.id}/edit`} className="edit-link">Edit</Link>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8">No blog posts found. Write your first article!</td>
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
