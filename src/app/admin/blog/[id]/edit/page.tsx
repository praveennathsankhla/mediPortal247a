"use client";

import React, { use } from 'react';
import BlogForm from "@/components/admin/BlogForm";

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    // Mocked blog post data
    const post = {
        id: id,
        title: 'Top 10 Health Tips',
        slug: 'top-10-health-tips',
        content: 'Long form content here...',
        faqs: '[]',
        author: 'Dr. Sharma',
        publishDate: new Date(),
        categoryId: '1',
    };

    const categories = [
        { id: '1', name: 'Wellness', slug: 'wellness' },
    ];

    return (
        <div className="admin-page">
            <header className="page-header">
                <h1>Edit Blog Post</h1>
                <p>Update your article: {post.title}</p>
            </header>

            <BlogForm initialData={post} categories={categories} />

            <style jsx>{`
        .page-header {
          margin-bottom: 2rem;
        }
      `}</style>
        </div>
    );
}
