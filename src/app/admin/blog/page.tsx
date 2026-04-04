import Link from "next/link";
import React from 'react';
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

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
                    <DeleteButton id={p.id} endpoint="/api/admin/blog" itemName={p.title} />
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

    </div>
  );
}
