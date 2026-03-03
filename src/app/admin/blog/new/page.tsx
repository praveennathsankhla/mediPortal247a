"use client";

import React from 'react';
import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  const categories = [
    { id: '1', name: 'Wellness', slug: 'wellness' },
    { id: '2', name: 'Health Awareness', slug: 'health-awareness' },
  ];

  return (
    <div className="admin-page">
      <header className="page-header">
        <h1>Create New Blog Post</h1>
        <p>Write an SEO-optimized medical awareness article</p>
      </header>

      <BlogForm categories={categories} />

      <style jsx>{`
        .page-header {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
